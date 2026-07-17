import pandas as pd

df = pd.read_csv("dataset/transactions.csv")

print(df.head())

print("\nDataset shape:")
print(df.shape)

print("\nColumns:")
print(df.columns)

#ENCODING 
from sklearn.preprocessing import LabelEncoder

categorical_columns = [
    "merchantName",
    "transactionType",
    "paymentMethod",
    "deviceType",
    "location",
    "currency"
]


encoders = {}

for column in categorical_columns:
    encoder = LabelEncoder()

    df[column] = encoder.fit_transform(df[column])

    encoders[column] = encoder


print("\nAfter Encoding:")
print(df.head())

#SPLIT DATA FOR TRAINING AND TESTING 
from sklearn.model_selection import train_test_split


X = df.drop("fraud", axis=1)
y = df["fraud"]


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


print("Training data:", X_train.shape)
print("Testing data:", X_test.shape)

#RANDOM FOREST MODEL
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report


model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)


model.fit(X_train, y_train)


y_pred = model.predict(X_test)


accuracy = accuracy_score(y_test, y_pred)


print("Accuracy:", accuracy)

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

import joblib

joblib.dump(model, "models/fraud_model.pkl")

print("Model saved successfully!")