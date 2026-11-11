import pandas as pd
import glob

# Locate the customer dataset
files = glob.glob("../dataset/*.csv")

if not files:
    print("ERROR: Dataset not found!")
else:
    df = pd.read_csv(files[0])

    print("\n===== CUSTOMER CHURN DATASET =====")

    print("\nDataset loaded successfully!")
    print("Total records and columns:", df.shape)

    print("\nFirst 5 customer records:")
    print(df.head())

    print("\nColumn names:")
    print(df.columns.tolist())

    print("\nMissing values:")
    print(df.isnull().sum())

    print("\nCustomer churn distribution:")
    print(df["Churn"].value_counts())

    print("\nDataset information:")
    print(df.info())
