import cloudinary
import cloudinary.uploader

from dotenv import load_dotenv
import os

# Load env
load_dotenv()

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

# Upload function
def upload_image(file_bytes):

    result = cloudinary.uploader.upload(
        file_bytes,
        folder="dogs"
    )

    return result["secure_url"]