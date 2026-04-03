import io

from fastapi import FastAPI, File, Form, UploadFile
from PIL import Image

from cloudinary_utils import upload_image
from database import load_db, match_dog, register_dog
from model import extract_features

app = FastAPI()


# -------------------------------
# REGISTER DOG
# -------------------------------
@app.post("/register")
async def register(
    name: str = Form(...),
    file: UploadFile = File(...),
):
    contents = await file.read()

    image_url = upload_image(contents, name)

    image = Image.open(
        io.BytesIO(contents)
    )

    features = extract_features(image)

    if features is None:
        return {"error": "Feature extraction failed"}

    register_dog(
        features,
        name,
        image_url,
    )

    return {
        "status": "success",
        "dog": name,
        "image_url": image_url,
    }


# -------------------------------
# IDENTIFY DOG
# -------------------------------
@app.post("/identify")
async def identify(
    file: UploadFile = File(...),
):
    contents = await file.read()

    image = Image.open(
        io.BytesIO(contents)
    )

    features = extract_features(image)

    if features is None:
        return {"error": "Feature extraction failed"}

    result, score, image_url = match_dog(features)

    return {
        "dog": result,
        "confidence": float(score),
        "matched_image": image_url,
    }


# -------------------------------
# LIST DOGS
# -------------------------------
@app.get("/dogs")
def list_dogs():
    db = load_db()
    result = {}

    for dog, items in db.items():
        result[dog] = [
            item["image_url"]
            for item in items
            if isinstance(item, dict) and item.get("image_url")
        ]

    return result


# -------------------------------
# ROOT
# -------------------------------
@app.get("/")
def home():
    return {
        "message": "Dog Identification API Running",
    }
