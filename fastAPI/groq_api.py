import os
import groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def check_with_groq(prediction):
    """Checks if the predicted object is food-related using Groq API."""
    client = groq.Client(api_key=GROQ_API_KEY)
    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": "Determine if the given object is food-related. It can be a hamper, plate, grocery store item. Respond with 'Yes' if it is food, otherwise 'No'."},
            {"role": "user", "content": f"Is '{prediction}' related to food?"}
        ]
    )
    return response.choices[0].message.content.strip()
