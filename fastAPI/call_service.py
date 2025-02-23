from twilio.rest import Client
import os
# Twilio setup
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER")
TWILIO_TO_NUMBER = os.getenv("TWILIO_TO_NUMBER")
twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

def generate_call_script(donor_data):
    return f"""Hello, we are calling from the Surplus Food Donation platform.
    A new donation is available. Donor {donor_data['donorId']} has donated {donor_data['foodItems'][0]['quantity']} {donor_data['foodItems'][0]['quantityType']} of {donor_data['foodItems'][0]['name']} in {donor_data['location']['address']}. 
    The food expires on {donor_data['foodItems'][0]['expiryDate']}. Please check the website and arrange pickup as soon as possible. Thank you!"""

def make_call(script):
    call = twilio_client.calls.create(
        twiml=f"<Response><Say>{script}</Say></Response>",  
        to=TWILIO_TO_NUMBER,
        from_=TWILIO_FROM_NUMBER,
    )
    return call.sid
