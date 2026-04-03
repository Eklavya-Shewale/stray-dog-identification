import os
import numpy as np

DB_FILE = "dog_db.npy"

# -------------------------------
# LOAD DATABASE
# -------------------------------
def load_db():
    if os.path.exists(DB_FILE):
        return np.load(
            DB_FILE,
            allow_pickle=True
        ).item()

    return {}

# -------------------------------
# SAVE DATABASE
# -------------------------------
def save_db(db):
    np.save(DB_FILE, db)

# -------------------------------
# COSINE SIMILARITY
# -------------------------------
def cosine_similarity(a, b):
    return np.dot(a, b) / (
        np.linalg.norm(a)
        * np.linalg.norm(b)
    )

# -------------------------------
# REGISTER
# -------------------------------
def register_dog(features, dog_name, image_url):
    db = load_db()

    if dog_name not in db:
        db[dog_name] = []

    db[dog_name].append(
        {
            "features": features,
            "image_url": image_url,
        }
    )

    save_db(db)

    return True

# -------------------------------
# MATCH
# -------------------------------
def match_dog(features):
    db = load_db()

    if len(db) == 0:
        return "No dogs registered", 0, None

    best_match = None
    best_score = -1
    best_image = None

    for dog_name, feature_list in db.items():
        for item in feature_list:
            if isinstance(item, dict):
                stored_features = item["features"]
                image_url = item.get("image_url")
            else:
                stored_features = item
                image_url = None

            score = cosine_similarity(
                features,
                stored_features
            )

            if score > best_score:
                best_score = score
                best_match = dog_name
                best_image = image_url

    if best_score > 0.65:
        return best_match, best_score, best_image

    else:
        return "No match", best_score, None
