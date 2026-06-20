from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from PIL import Image
import io
import torch
from torch import nn
from torchvision import transforms
import uvicorn
import os


device = torch.device("cpu")
print("Current Directory:", os.getcwd())
print("Model Path:", os.path.abspath("best_catdog_model.pth"))
print("Using Device:", device)



class CatDogCNN(nn.Module):
    def __init__(self):
        super().__init__()

        self.features = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(32, 64, 3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(64, 128, 3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(128, 256, 3, padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(256, 512, 3, padding=1),
            nn.BatchNorm2d(512),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.AdaptiveAvgPool2d(1)
        )

        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Dropout(0.5),
            nn.Linear(512, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 2)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x




model = CatDogCNN().to(device)

checkpoint = torch.load(
    "best_catdog_model.pth",
    map_location=device
)

print("Checkpoint Keys:", checkpoint.keys())
print("Epoch:", checkpoint["epoch"])
print("Val Acc:", checkpoint["val_acc"])

model.load_state_dict(
    checkpoint["model_state_dict"]
)

model.eval()

print("Model Loaded Successfully")

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

app = FastAPI(
    title="Cats vs Dogs Classifier",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Cats vs Dogs API Running"
    }



@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    try:

        image_bytes = await file.read()

        print("\n========== NEW REQUEST ==========")
        print("Filename:", file.filename)
        print("Content Type:", file.content_type)
        print("Bytes Received:", len(image_bytes))

        image = Image.open(
            io.BytesIO(image_bytes)
        ).convert("RGB")

        print("Image Size:", image.size)

        image_tensor = transform(image)

        print(
            "Tensor Stats:",
            image_tensor.min().item(),
            image_tensor.max().item(),
            image_tensor.mean().item()
        )

        image_tensor = image_tensor.unsqueeze(0).to(device)

        with torch.inference_mode():

            logits = model(image_tensor)

            probs = torch.softmax(
                logits,
                dim=1
            )

        print("Raw Logits:", logits)
        print("Probabilities:", probs)

        cat_prob = probs[0][0].item()
        dog_prob = probs[0][1].item()

        prediction = (
            "Cat"
            if cat_prob > dog_prob
            else "Dog"
        )

        confidence = max(
            cat_prob,
            dog_prob
        )

        print(f"Cat Probability: {cat_prob:.4f}")
        print(f"Dog Probability: {dog_prob:.4f}")
        print(f"Prediction: {prediction}")

        return {
            "prediction": prediction,
            "probability": confidence,
            "cat_probability": cat_prob,
            "dog_probability": dog_prob
        }

    except Exception as e:

        print("ERROR:", str(e))

        return {
            "error": str(e)
        }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)