Power Bi Dashboard 
![dashboard](https://github.com/Raksham30/ADS-Project-/blob/843487df179d694f5ae4ef6258316e4cafd1b311/Screenshot%202025-11-04%20142252.png)

📊 iPhone Sales Analytics & Prediction System

The iPhone Sales Analytics and Prediction System is a web-based platform designed to analyze historical iPhone sales data and forecast future pricing and revenue trends. This application integrates Machine Learning, Flask Backend, React Frontend, and Firebase Authentication to deliver real-time insights through predictive modeling and interactive dashboards.

Home Page
![HomePage](https://github.com/Raksham30/ADS-Project-/blob/843487df179d694f5ae4ef6258316e4cafd1b311/Screenshot%202025-11-11%20145725.png)

🚀 Features

Google Authentication for secure login

Price Prediction based on year and iPhone variant

Global & India Revenue Forecasting using trained ML models

Interactive Dashboard for visual insights and KPI metrics

Comparison Module to compare different iPhone models by price trends

Responsive UI optimized for both desktop and mobile

🛠️ Tech Stack
Layer	Technologies Used
Frontend	React, TypeScript, Tailwind CSS, shadcn-ui, Vite
Backend	Flask (Python), REST API
Machine Learning	Scikit-learn, Pandas, NumPy, Joblib
Authentication	Firebase Authentication (Google Login)
Visualization	Plotly, Charts.js (if applicable)
📂 Project Structure
root/
 ├── frontend/            # React UI
 │   ├── src/components   # UI Components
 │   ├── src/pages        # Page Views (Home, Dashboard, Prediction)
 │   └── ...
 ├── backend/             # Flask Backend
 │   ├── app.py           # API Endpoints
 │   ├── price_model.pkl  # Trained Price Model
 │   ├── revenue_model.pkl# Trained Revenue Model
 │   └── ...
 └── README.md

⚙️ Installation & Setup (Local Development)
1️⃣ Clone the Repository
git clone <YOUR_GIT_REPO_URL>
cd <PROJECT_FOLDER_NAME>

2️⃣ Install Dependencies (Frontend)
cd frontend
npm install
npm run dev

3️⃣ Run Backend
cd backend
pip install -r requirements.txt
python app.py


The application will now be available at:

Frontend: http://localhost:5173
Backend API: http://localhost:5000

📈 Machine Learning Models Used
Model	Purpose	Algorithm	Accuracy (R²)
Price Prediction	Predicts price based on year & variant	Linear Regression	~0.54
Revenue Prediction	Forecasts global & India revenue	Linear Regression	~0.54

Models were trained and exported using Joblib for seamless backend integration.

🔒 Authentication Flow
![flow](https://github.com/Raksham30/ADS-Project-/blob/267865e57255e7706e99438a316507a78f0c8064/Screenshot%202025-11-11%20150451.png)

Users sign in through Continue with Google (Firebase Auth)

Flask maintains session handling to protect private pages (Dashboard & Prediction)

Logout clears the session securely

🌱 Future Enhancements

Predictions
![Predictions](https://github.com/Raksham30/ADS-Project-/blob/843487df179d694f5ae4ef6258316e4cafd1b311/Screenshot%202025-11-11%20145822.png)

Real-time sales data integration via APIs

Competitor comparison (Samsung, OnePlus, Google Pixel)

Sentiment Analysis from X/Twitter & Reddit

AI-driven model recommendation system

✅ Conclusion

This system provides a practical and intuitive platform for analyzing and forecasting iPhone sales performance.
Its integration of machine learning, interactive analytics, and secure user access makes it valuable for market researchers, students, and business analysts alike.
