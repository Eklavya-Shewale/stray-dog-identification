import numpy as np
from PIL import Image

import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from torchvision.models import MobileNet_V2_Weights

# -------------------------------
# MODEL SETUP
# -------------------------------
model = models.mobilenet_v2(
    weights=MobileNet_V2_Weights.DEFAULT
)

model.classifier = nn.Identity()
model.eval()

# -------------------------------
# IMAGE TRANSFORM
# -------------------------------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

# -------------------------------
# FEATURE EXTRACTION
# -------------------------------
def extract_features(image):
    try:
        img = image.convert("RGB")
        img = transform(img)
        img = img.unsqueeze(0)

        with torch.no_grad():
            features = model(img)

        return features.numpy().flatten()

    except Exception as e:
        print("Error:", e)
        return None