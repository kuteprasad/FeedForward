from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from db import orders_collection
from bson import ObjectId

def get_food_matches(requested_food_name):
    # Fetch all pending orders from MongoDB
    orders = list(orders_collection.find({"status": "PENDING"}))

    # if not orders:
    #     return []

    # Extract food names and order IDs from orders
    food_texts = []
    order_ids = []

    for order in orders:
        for item in order["foodItems"]:
            food_name = item.get("name", "").strip().lower()  # Ensure it's a clean string
            if food_name:  # Only add non-empty names
                food_texts.append(food_name)
                order_ids.append(order["_id"])  # Store as ObjectId, convert later

    if not food_texts:
        return []

    # Convert user input to lowercase for consistency
    requested_food_name = requested_food_name.strip().lower()
    food_texts.append(requested_food_name)

    # TF-IDF Vectorization
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(food_texts)
    similarity_matrix = cosine_similarity(tfidf_matrix)

    # Get similarity scores of input food vs stored foods
    scores = similarity_matrix[-1, :-1]  # Exclude the last row (user input)

    # Sort results by similarity score (descending order)
    sorted_indices = np.argsort(scores)[::-1]

    best_matches = [
        {"order_id": str(order_ids[i]), "similarity": float(scores[i])}  # Convert ObjectId to string
        for i in sorted_indices if scores[i] > 0
    ]

    return best_matches if best_matches else []
