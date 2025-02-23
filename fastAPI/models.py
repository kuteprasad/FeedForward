import torch
from torchvision import models, transforms
from PIL import Image
import requests
import io

# Load pre-trained ResNet18 model
def load_model():
    model = models.resnet18(pretrained=True)
    model.eval()
    return model

model = load_model()

# Load ImageNet labels
def load_labels():
    url = "https://raw.githubusercontent.com/pytorch/hub/master/imagenet_classes.txt"
    labels = requests.get(url).text.splitlines()
    return labels

labels = load_labels()

# Define preprocessing function
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def classify_image(image_bytes):
    """Classifies an image using ResNet18 and returns the top predicted label."""
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = transform(image).unsqueeze(0)  # Add batch dimension
    with torch.no_grad():
        output = model(image)
    probabilities = torch.nn.functional.softmax(output[0], dim=0)
    top_class = probabilities.argmax().item()
    return labels[top_class]



