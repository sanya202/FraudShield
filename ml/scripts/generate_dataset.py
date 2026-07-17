import pandas as pd
import random
from faker import Faker

fake = Faker("en_IN")

def generate_transaction():
    transaction = {
        "amount": random.randint(100, 50000),

        "merchantName": random.choice([
            "Amazon India",
            "Flipkart",
            "Swiggy",
            "Zomato",
            "Myntra",
            "Reliance Digital"
        ]),

        "transactionType": random.choice([
            "Purchase",
            "Transfer",
            "Withdrawal",
            "Deposit"
        ]),

        "paymentMethod": random.choice([
            "UPI",
            "Credit Card",
            "Debit Card",
            "Wallet",
            "Net Banking"
        ]),

        "deviceType": random.choice([
            "Mobile",
            "Desktop",
            "Tablet"
        ]),

        "location": random.choice([
            "Delhi",
            "Mumbai",
            "Bangalore",
            "Chennai",
            "Hyderabad"
        ]),

        "currency": "INR",

        "hourOfDay": random.randint(0, 23),

        "isWeekend": random.choice([0, 1])
    }

    return transaction


def calculate_fraud(transaction):

    risk_score = 0

    if transaction["amount"] > 30000:
        risk_score += 0.35

    if transaction["hourOfDay"] < 5:
        risk_score += 0.25

    if transaction["transactionType"] == "Transfer":
        risk_score += 0.25

    if transaction["paymentMethod"] == "Credit Card":
        risk_score += 0.15

    if transaction["deviceType"] == "Desktop":
        risk_score += 0.10

    if transaction["isWeekend"] == 1:
        risk_score += 0.10


    # add natural randomness
    risk_score += random.uniform(-0.25, 0.25)

    return 1 if risk_score > 0.5 else 0


if __name__ == "__main__":

    transactions = []

    for _ in range(50000):
        transaction = generate_transaction()

        fraud = calculate_fraud(transaction)

        transaction["fraud"] = fraud

        transactions.append(transaction)

    df = pd.DataFrame(transactions)

    df.to_csv("dataset/transactions.csv", index=False)

    print("Dataset generated successfully!")
    print(df.head())
    print(df["fraud"].value_counts())