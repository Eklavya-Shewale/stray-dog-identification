import io
import time

import numpy as np
import requests
import torch
import torch.nn.functional as F
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
from torchvision.models import MobileNet_V2_Weights


weights = MobileNet_V2_Weights.DEFAULT
model = models.mobilenet_v2(weights=weights)
model.eval()

transform = transforms.Compose(
    [
        weights.transforms(),
    ]
)


def preprocess_for_embedding(image: Image.Image) -> torch.Tensor:
    # Force luminance-only input so embeddings depend on structure/shape cues,
    # then expand back to 3 channels for MobileNetV2's expected input format.
    grayscale_image = image.convert("L").convert("RGB")
    return transform(grayscale_image).unsqueeze(0)


def extract_features(image: Image.Image):
    try:
        img = preprocess_for_embedding(image)

        with torch.no_grad():
            feature_map = model.features(img)
            pooled = F.adaptive_avg_pool2d(feature_map, (1, 1))
            features = pooled.flatten(start_dim=1)
            normalized = F.normalize(features, p=2, dim=1)

        return normalized.cpu().numpy().flatten().astype(np.float32)
    except Exception as exc:
        print("Feature extraction error:", exc)
        return None


def extract_features_from_bytes(image_bytes: bytes):
    try:
        image = Image.open(io.BytesIO(image_bytes))
        return extract_features(image)
    except Exception as exc:
        print("Image bytes error:", exc)
        return None


def extract_features_from_url(image_url: str, retries: int = 5, delay: float = 1.0):
    last_error = None

    for attempt in range(retries):
        try:
            response = requests.get(image_url, timeout=15)
            response.raise_for_status()
            return extract_features_from_bytes(response.content)
        except Exception as exc:
            last_error = exc
            if attempt < retries - 1:
                time.sleep(delay)

    print("Cloudinary URL extraction error:", last_error)
    return None
