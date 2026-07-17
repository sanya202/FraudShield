from fastapi import FastAPI
import joblib
import pandas as pd


app = FastAPI()


model = joblib.load("models/fraud_model.pkl")

#GET CODE
@app.get("/")
def home():
    return {
        "message": "FraudShield ML API running"
    }


#POST PREDICT
from pydantic import BaseModel


class Transaction(BaseModel):
    amount: int
    merchantName: int
    transactionType: int
    paymentMethod: int
    deviceType: int
    location: int
    currency: int
    hourOfDay: int
    isWeekend: int



@app.post("/predict")
def predict(transaction: Transaction):

    data = pd.DataFrame([transaction.dict()])


    prediction = model.predict(data)[0]

    probability = model.predict_proba(data)[0][1]


    return {
        "prediction": "Fraud" if prediction == 1 else "Safe",
        "fraudProbability": round(float(probability), 2)
    }

