from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId
from db import orders_collection
from models import classify_image
from groq_api import check_with_groq
from call_service import generate_call_script, make_call
from food_matching import get_food_matches
import requests
from PIL import Image
from io import BytesIO

router = APIRouter()

@router.post("/predict")
async def predict(url: str):
    try:
        response = requests.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to download image")

        image = Image.open(BytesIO(response.content)).convert("RGB")
        img_buffer = BytesIO()
        image.save(img_buffer, format="JPEG")
        image_bytes = img_buffer.getvalue()

        label = classify_image(image_bytes)
        result = check_with_groq(label)

        return {"is_food": result.lower() == "yes"}
    except Exception as e:
        return {"error": str(e)}

@router.get("/call/{order_id}")
def call_donor(order_id: str):
    try:
        order = orders_collection.find_one({"_id": ObjectId(order_id)})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        script = generate_call_script(order)
        call_sid = make_call(script)
        return {"message": "Call initiated", "call_sid": call_sid}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/search_orders")
def search_orders(food_name: str = Query(...)):
    try:
        matches = get_food_matches(food_name)

        if not matches:
            return {"message": "No similar food found"}

        # Fetch full order details
        order_details = []
        for match in matches:
            order = orders_collection.find_one({"_id": ObjectId(match["order_id"])})  # Convert string ID to ObjectId
            if order:
                order_details.append({
                    "orderId": str(order["_id"]),  # Convert ObjectId to string
                    "donorId": str(order["donorId"]) if isinstance(order["donorId"], ObjectId) else order["donorId"],
                    "location": order["location"],
                    "foodItems": order["foodItems"],
                    "similarity": match["similarity"]
                })

        return order_details

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))