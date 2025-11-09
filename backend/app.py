from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load models
revenue_model = joblib.load("revenue_model.pkl")
price_model = joblib.load("price_model.pkl")
variant_encoder = joblib.load("variant_encoder.pkl")


@app.route("/predict-revenue", methods=["POST"])
def predict_revenue():
    data = request.get_json()

    # Expecting only year and rnd from frontend
    year = data.get("year")
    rnd = data.get("rnd")

    # Convert to DataFrame with correct feature names
    input_df = pd.DataFrame([[year, rnd]], columns=["Fiscal Year", "Global R&D Expense (Crore INR)"])

    prediction = revenue_model.predict(input_df)[0]
    return jsonify({"predictedRevenue": float(prediction)})


@app.route("/predict-price", methods=["POST"])
def predict_price():
    data = request.get_json()

    year = data.get("year")
    variant = data.get("variant")

    variant_encoded = variant_encoder.transform([variant])[0]

    input_df = pd.DataFrame([[year, variant_encoded]], columns=["year", "variant_encoded"])

    prediction = price_model.predict(input_df)[0]

    # Round to nearest ₹100
    return jsonify({"predictedPrice": round(prediction / 100) * 100})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
