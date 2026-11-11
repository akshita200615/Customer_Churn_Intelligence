# ChurnIQ – Customer Churn Intelligence Platform

ChurnIQ is a machine learning-based web application that predicts customer churn and provides analytics to help businesses understand customer behavior and improve customer retention.

## Live Demo

- **Frontend Dashboard:** https://customer-churn-intelligence-6alh.onrender.com
- **Backend API:** https://customer-churn-api-fhzx.onrender.com

## Features

- Customer churn prediction using Machine Learning.
- Churn probability and risk-level classification.
- Customer analytics dashboard.
- Total, churned, and retained customer statistics.
- Contract-wise churn analysis.
- Tenure-wise churn analysis.
- Interactive charts and visualizations.

## Technologies Used

**Frontend:** React.js, Vite, CSS, Recharts

**Backend:** Python, Flask, Flask-CORS

**Machine Learning:** Scikit-learn, Pandas, NumPy

**Deployment:** Render

## Machine Learning

The project compares two machine learning algorithms:

- Logistic Regression
- Random Forest Classifier

The model with the better F1-score is selected and saved for predictions.

### Model Performance

| Metric | Logistic Regression |
|---|---:|
| Accuracy | 74% |
| Precision | 50% |
| Recall | 78% |
| F1-score | 61.36% |

## Project Structure

```text
Customer_Churn_Intelligence/
├── backend/
│   ├── app.py
│   ├── train_model.py
│   ├── inspect_data.py
│   ├── requirements.txt
│   └── churn_model.pkl
├── dataset/
├── frontend/
│   ├── src/
│   └── package.json
├── .gitignore
└── README.md
```

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/akshita200615/Customer_Churn_Intelligence.git
cd Customer_Churn_Intelligence
```

### 2. Backend Setup

```bash
python -m venv venv
venv\Scripts\activate
pip install -r backend/requirements.txt
python backend/app.py
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

### 4. Dataset

Download the IBM Telco Customer Churn dataset and place the CSV file inside the `dataset` folder.

Expected filename:

`WA_Fn-UseC_-Telco-Customer-Churn.csv`

## Project Objective

The objective of ChurnIQ is to identify customers who are likely to leave a service by analyzing customer information and predicting churn risk using machine learning.

---

**Developed as a Customer Churn Prediction and Analytics project.**