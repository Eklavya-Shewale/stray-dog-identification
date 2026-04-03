import os
from PIL import Image

from model import extract_features
from database import register_dog
from cloudinary_utils import upload_image


# -------------------------------
# FIXED PATH
# -------------------------------

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

DATASET_DIR = os.path.join(
    BASE_DIR,
    "..",
    "dataset"
)


def register_all():

    print("Dataset path:", DATASET_DIR)

    for dog_name in os.listdir(DATASET_DIR):

        dog_path = os.path.join(
            DATASET_DIR,
            dog_name
        )

        if not os.path.isdir(dog_path):
            continue

        print(f"\nProcessing {dog_name}")

        for image_name in os.listdir(dog_path):

            image_path = os.path.join(
                dog_path,
                image_name
            )

            try:

                with open(
                    image_path,
                    "rb"
                ) as f:

                    image_bytes = f.read()

                # Upload to Cloudinary
                image_url = upload_image(
                    image_bytes,
                    dog_name
                )

                # Extract features
                image = Image.open(
                    image_path
                )

                features = extract_features(
                    image
                )

                if features is not None:

                    register_dog(
                        features,
                        dog_name,
                        image_url
                    )

                    print(
                        f"Saved {image_name}"
                    )

            except Exception as e:

                print(
                    "Error:",
                    image_name,
                    e
                )


if __name__ == "__main__":
    register_all()