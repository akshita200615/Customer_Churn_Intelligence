
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# =====================================
# 1. LOAD TRAINED MACHINE LEARNING MODEL
# =====================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "churn_model.pkl")
model = joblib.load(model_path)

# Dataset path
dataset_path = os.path.join(
    BASE_DIR,
    "..",
    "dataset",
    "WA_Fn-UseC_-Telco-Customer-Churn.csv"
)

# Features used during model training
FEATURES = [
    "gender",
    "SeniorCitizen",
    "Partner",
    "Dependents",
    "tenure",
    "PhoneService",
    "MultipleLines",
    "InternetService",
    "OnlineSecurity",
    "OnlineBackup",
    "DeviceProtection",
    "TechSupport",
    "StreamingTV",
    "StreamingMovies",
    "Contract",
    "PaperlessBilling",
    "PaymentMethod",
    "MonthlyCharges",
    "TotalCharges"
]


# =====================================
# 2. HEALTH CHECK API
# =====================================

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "message": "ChurnIQ backend is running"
    })


# =====================================
# 3. CUSTOMER CHURN PREDICTION API
# =====================================

@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.get_json()

        if not isinstance(data, dict):
            return jsonify({
                "error": "Please provide valid JSON data"
            }), 400

        # Check missing features
        missing = [
            feature for feature in FEATURES
            if feature not in data
        ]

        if missing:
            return jsonify({
                "error": "Missing required fields",
                "missing_fields": missing
            }), 400

        # Prepare customer data
        input_df = pd.DataFrame(
            [[data[feature] for feature in FEATURES]],
            columns=FEATURES
        )

        # Convert numerical columns
        numeric_columns = [
            "SeniorCitizen",
            "tenure",
            "MonthlyCharges",
            "TotalCharges"
        ]

        for column in numeric_columns:
            input_df[column] = pd.to_numeric(
                input_df[column],
                errors="raise"
            )

        # Validate numerical values
        if (
            input_df[numeric_columns].isna().any().any()
            or (input_df[numeric_columns] < 0).any().any()
        ):
            return jsonify({
                "error": "Numeric values must be valid and non-negative"
            }), 400

        if input_df["SeniorCitizen"].iloc[0] not in [0, 1]:
            return jsonify({
                "error": "SeniorCitizen must be 0 or 1"
            }), 400

        # Predict churn
        prediction = int(model.predict(input_df)[0])

        # Calculate probability
        probabilities = model.predict_proba(input_df)[0]
        churn_probability = float(probabilities[1]) * 100

        # Determine risk
        if churn_probability >= 70:
            risk = "High"
        elif churn_probability >= 40:
            risk = "Medium"
        else:
            risk = "Low"

        return jsonify({
            "prediction": prediction,
            "result": (
                "Customer likely to churn"
                if prediction == 1
                else "Customer likely to stay"
            ),
            "churn_probability": round(
                churn_probability, 2
            ),
            "risk_level": risk
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400


# =====================================
# 4. CUSTOMER ANALYTICS API
# =====================================

@app.route("/analytics", methods=["GET"])
def analytics():

    try:
        # Load actual customer dataset
        df = pd.read_csv(dataset_path)

        # Basic customer statistics
        total = len(df)

        churned = int(
            (df["Churn"] == "Yes").sum()
        )

        retained = int(
            (df["Churn"] == "No").sum()
        )

        churn_rate = round(
            (churned / total) * 100, 2
        ) if total else 0

        # Contract-wise churn analysis
        contract_data = df.groupby(
            ["Contract", "Churn"]
        ).size().unstack(fill_value=0)

        contract_distribution = []

        for contract in contract_data.index:

            contract_distribution.append({
                "contract": contract,
                "churned": int(
                    contract_data.loc[contract].get("Yes", 0)
                ),
                "retained": int(
                    contract_data.loc[contract].get("No", 0)
                )
            })

        # Tenure-wise churn analysis
        tenure_groups = pd.cut(
            df["tenure"],
            bins=[-1, 12, 24, 48, 72],
            labels=["0-12", "13-24", "25-48", "49-72"]
        )

        tenure_counts = (
            df.assign(TenureGroup=tenure_groups)
            .groupby(
                ["TenureGroup", "Churn"],
                observed=False
            )
            .size()
            .unstack(fill_value=0)
        )

        tenure_distribution = []

        for group in tenure_counts.index:

            tenure_distribution.append({
                "tenure": str(group),
                "churned": int(
                    tenure_counts.loc[group].get("Yes", 0)
                ),
                "retained": int(
                    tenure_counts.loc[group].get("No", 0)
                )
            })

        # Return analytics
        return jsonify({
            "total_customers": total,
            "churned_customers": churned,
            "retained_customers": retained,
            "churn_rate": churn_rate,
            "contract_distribution": contract_distribution,
            "tenure_distribution": tenure_distribution
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


# =====================================
# 5. RUN FLASK APPLICATION
# =====================================

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
