import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LinearRegression
import joblib

data = pd.read_csv("pricedata.csv")

encoder = LabelEncoder()
data['variant_encoded'] = encoder.fit_transform(data['variant'])

X = data[['year', 'variant_encoded']]
y = data['price']

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, "price_model.pkl")
joblib.dump(encoder, "variant_encoder.pkl")

print("✅ Price Model Trained & Saved")
