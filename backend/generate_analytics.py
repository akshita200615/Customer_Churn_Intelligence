
import pandas as pd
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

dataset_path = os.path.join(
    BASE_DIR, "..", "dataset",
    "WA_Fn-UseC_-Telco-Customer-Churn.csv"
)

df = pd.read_csv(dataset_path)

total = len(df)
churned = int((df["Churn"] == "Yes").sum())
retained = int((df["Churn"] == "No").sum())

churn_rate = round((churned / total) * 100, 2)

contract_data = df.groupby(
    ["Contract", "Churn"]
).size().unstack(fill_value=0)

contract_distribution = []

for contract in contract_data.index:
    contract_distribution.append({
        "contract": contract,
        "churned": int(contract_data.loc[contract].get("Yes", 0)),
        "retained": int(contract_data.loc[contract].get("No", 0))
    })

tenure_groups = pd.cut(
    df["tenure"],
    bins=[-1, 12, 24, 48, 72],
    labels=["0-12", "13-24", "25-48", "49-72"]
)

tenure_data = (
    df.assign(TenureGroup=tenure_groups)
    .groupby(["TenureGroup", "Churn"], observed=False)
    .size()
    .unstack(fill_value=0)
)

tenure_distribution = []

for group in tenure_data.index:
    tenure_distribution.append({
        "tenure": str(group),
        "churned": int(tenure_data.loc[group].get("Yes", 0)),
        "retained": int(tenure_data.loc[group].get("No", 0))
    })

summary = {
    "total_customers": total,
    "churned_customers": churned,
    "retained_customers": retained,
    "churn_rate": churn_rate,
    "contract_distribution": contract_distribution,
    "tenure_distribution": tenure_distribution
}

output_path = os.path.join(BASE_DIR, "analytics_summary.json")

with open(output_path, "w") as file:
    json.dump(summary, file, indent=4)

print("Analytics summary created successfully!")
