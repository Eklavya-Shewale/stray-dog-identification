from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

try:
    from .cloudinary_utils import upload_image
    from .database import get_dog_records, load_db, match_dog, register_dog
    from .model import extract_features_from_bytes, extract_features_from_url
except ImportError:
    from cloudinary_utils import upload_image
    from database import get_dog_records, load_db, match_dog, register_dog
    from model import extract_features_from_bytes, extract_features_from_url

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DogProfile(BaseModel):
    name: str
    image_url: str
    health_status: str | None = None
    rabies_status: str | None = None
    last_seen: str | None = None
    age: str | None = None
    breed: str | None = None
    location: str | None = None
    notes: str | None = None


class RegisterResponse(BaseModel):
    status: str
    message: str
    dog: DogProfile


class RegisterImageResponse(BaseModel):
    status: str
    message: str
    total_images: int
    dog: DogProfile


class IdentifyMatchResponse(BaseModel):
    status: str = "matched"
    confidence: float = Field(..., ge=0.0, le=1.0)
    dog: DogProfile


class IdentifyUnknownResponse(BaseModel):
    status: str = "unknown"
    message: str
    confidence: float = Field(..., ge=0.0, le=1.0)


class DogsListResponse(BaseModel):
    dogs: dict[str, list[DogProfile]]


def normalize_confidence(score: float) -> float:
    return min(max(float(score), 0.0), 1.0)


@app.post("/register", response_model=RegisterResponse)
async def register(
    name: str = Form(...),
    health_status: str | None = Form(None),
    rabies_status: str | None = Form(None),
    last_seen: str | None = Form(None),
    age: str | None = Form(None),
    breed: str | None = Form(None),
    location: str | None = Form(None),
    notes: str | None = Form(None),
    file: UploadFile = File(...),
):
    contents = await file.read()
    image_url = upload_image(contents, name)
    features = extract_features_from_url(image_url)

    if features is None:
        return {
            "status": "error",
            "message": "Feature extraction failed for uploaded Cloudinary image",
            "dog": {
                "name": name,
                "image_url": image_url,
                "health_status": health_status,
                "rabies_status": rabies_status,
                "last_seen": last_seen,
                "age": age,
                "breed": breed,
                "location": location,
                "notes": notes,
            },
        }

    dog_record = {
        "name": name,
        "image_url": image_url,
        "health_status": health_status,
        "rabies_status": rabies_status,
        "last_seen": last_seen,
        "age": age,
        "breed": breed,
        "location": location,
        "notes": notes,
        "features": features,
    }

    register_dog(dog_record)

    return {
        "status": "success",
        "message": "Dog registered and added to identification gallery",
        "dog": {
            key: value
            for key, value in dog_record.items()
            if key != "features"
        },
    }


@app.post("/register-image", response_model=RegisterImageResponse)
async def register_image(
    name: str = Form(...),
    file: UploadFile = File(...),
):
    existing_records = get_dog_records(name)

    if not existing_records:
        return {
            "status": "error",
            "message": f"No existing dog profile found for '{name}'. Register the dog first using /register.",
            "total_images": 0,
            "dog": {
                "name": name,
                "image_url": "",
                "health_status": None,
                "rabies_status": None,
                "last_seen": None,
                "age": None,
                "breed": None,
                "location": None,
                "notes": None,
            },
        }

    base_record = existing_records[0]
    contents = await file.read()
    image_url = upload_image(contents, name)
    features = extract_features_from_url(image_url)

    if features is None:
        return {
            "status": "error",
            "message": "Feature extraction failed for uploaded Cloudinary image",
            "total_images": len(existing_records),
            "dog": {
                "name": name,
                "image_url": image_url,
                "health_status": base_record.get("health_status"),
                "rabies_status": base_record.get("rabies_status"),
                "last_seen": base_record.get("last_seen"),
                "age": base_record.get("age"),
                "breed": base_record.get("breed"),
                "location": base_record.get("location"),
                "notes": base_record.get("notes"),
            },
        }

    dog_record = {
        "name": name,
        "image_url": image_url,
        "health_status": base_record.get("health_status"),
        "rabies_status": base_record.get("rabies_status"),
        "last_seen": base_record.get("last_seen"),
        "age": base_record.get("age"),
        "breed": base_record.get("breed"),
        "location": base_record.get("location"),
        "notes": base_record.get("notes"),
        "features": features,
    }

    register_dog(dog_record)

    return {
        "status": "success",
        "message": "New gallery image added to existing dog profile",
        "total_images": len(existing_records) + 1,
        "dog": {
            key: value
            for key, value in dog_record.items()
            if key != "features"
        },
    }


@app.post("/identify", response_model=IdentifyMatchResponse | IdentifyUnknownResponse)
async def identify(
    file: UploadFile = File(...),
):
    contents = await file.read()
    features = extract_features_from_bytes(contents)

    if features is None:
        return {
            "status": "unknown",
            "message": "Feature extraction failed",
            "confidence": 0.0,
        }

    matched_record, score = match_dog(features)

    if matched_record is None:
        return {
            "status": "unknown",
            "message": "No such dog found in records",
            "confidence": normalize_confidence(score),
        }

    return {
        "status": "matched",
        "confidence": normalize_confidence(score),
        "dog": {
            key: value
            for key, value in matched_record.items()
            if key != "features"
        },
    }


@app.get("/dogs", response_model=DogsListResponse)
def list_dogs():
    db = load_db()
    result = {}

    for dog, items in db.items():
        result[dog] = [
            {
                key: value
                for key, value in item.items()
                if isinstance(item, dict) and key != "features"
            }
            for item in items
            if isinstance(item, dict) and item.get("image_url")
        ]

    return {"dogs": result}


# -------------------------------
# ROOT
# -------------------------------
@app.get("/")
def home():
    return {
        "message": "Dog Identification API Running",
    }
