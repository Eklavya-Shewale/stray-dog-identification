import os
import numpy as np

DB_FILE = "dog_db.npy"
MATCH_THRESHOLD = 0.65

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
    denominator = np.linalg.norm(a) * np.linalg.norm(b)
    if denominator == 0:
        return 0.0
    return float(np.dot(a, b) / denominator)

# -------------------------------
# REGISTER
# -------------------------------
def register_dog(record):
    db = load_db()
    dog_name = record["name"]

    if dog_name not in db:
        db[dog_name] = []

    db[dog_name].append(record)

    save_db(db)

    return True


def get_dog_records(dog_name):
    db = load_db()
    return db.get(dog_name, [])

# -------------------------------
# MATCH
# -------------------------------
def match_dog(features):
    db = load_db()

    if len(db) == 0:
        return None, 0.0

    best_record = None
    best_score = -1.0

    for feature_list in db.values():
        for item in feature_list:
            if not isinstance(item, dict) or "features" not in item:
                continue

            stored_features = np.asarray(item["features"], dtype=np.float32)
            score = cosine_similarity(features, stored_features)

            if score > best_score:
                best_score = score
                best_record = item

    if best_record is None or best_score < MATCH_THRESHOLD:
        return None, best_score

    return best_record, best_score
