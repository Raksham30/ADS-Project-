import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Load data
data = pd.read_csv("revdata.csv")

# Train global revenue model
X_global = data[["Fiscal Year", "Global R&D Expense (Crore INR)"]]
y_global = data["Global iPhone Revenue (Crore INR)"]

global_model = LinearRegression()
global_model.fit(X_global, y_global)

joblib.dump(global_model, "revenue_model_global.pkl")


# Train india revenue model
X_india = data[["Fiscal Year", "Global R&D Expense (Crore INR)"]]
y_india = data["Estimated India Revenue (Crore INR)"]

india_model = LinearRegression()
india_model.fit(X_india, y_india)

joblib.dump(india_model, "revenue_model_india.pkl")

print("✅ Trained and saved both revenue models successfully!")
