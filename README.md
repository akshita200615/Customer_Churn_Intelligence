# Customer Churn Intelligence Platform (ChurnIQ)

A machine learning-based web application that predicts customer churn and provides interactive analytics to help businesses understand customer retention.

## Features

- **Customer Churn Prediction:** Predicts whether a customer is likely to leave.
- **Churn Probability:** Displays the probability of customer churn.
- **Risk Classification:** Classifies customers into risk levels.
- **Customer Analytics:** Displays total, churned, and retained customers.
- **Interactive Visualizations:** Includes charts for churn distribution, contract types, and customer tenure.
- **Machine Learning:** Uses Logistic Regression and Random Forest models.

## Technologies Used

**Frontend**
- React.js
- Vite
- Recharts
- CSS

**Backend**
- Python
- Flask
- Flask-CORS
- Scikit-learn
- Pandas
- NumPy

## Project Structure

```text
Customer_Churn_Intelligence/
├── backend/
│   ├── app.py
│   ├── train_model.py
│   ├── inspect_data.py
│   ├── churn_model.pkl
│   └── requirements.txt
├── dataset/
│   └── WA_Fn-UseC_-Telco-Customer-Churn.csv
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── .gitignore
└── README.md
```

## Dataset

This project uses the IBM Telco Customer Churn dataset.

The dataset CSV is not included in this repository. Download the dataset and place it inside the `dataset` folder using this filename:

`WA_Fn-UseC_-Telco-Customer-Churn.csv`

## Machine Learning Model

Two machine learning algorithms are evaluated:

1. Logistic Regression
2. Random Forest Classifier

The models are evaluated using accuracy, precision, recall, and F1-score. Logistic Regression was selected based on its F1-score.

### Model Performance

| Metric | Logistic Regression |
|---|---:|
| Accuracy | 74% |
| Precision | 50% |
| Recall | 78% |
| F1-score | 61.36% |

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/akshita200615/Customer_Churn_Intelligence.git
cd Customer_Churn_Intelligence
```

### 2. Set up the Python backend

```bash
python -m venv venv
venv\Scripts\activate
pip install -r backend/requirements.txt
```

Make sure the dataset is placed in the `dataset` folder.

### 3. Start the Flask backend

From the project root directory:

```bash
python backend/app.py
```

Backend URL: `http://127.0.0.1:5000`

### 4. Set up the React frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5174`

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/health` | GET | Checks backend status |
| `/predict` | POST | Predicts customer churn |
| `/analytics` | GET | Provides customer analytics |

## Project Objective

The objective of this project is to help businesses identify customers who may leave their services by using machine learning predictions and interactive data visualizations.

## Author

**Akshita Neha**

GitHub: [akshita200615](https://github.com/akshita200615)