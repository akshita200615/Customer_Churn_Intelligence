
import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import './App.css';

const API_URL = 'https://customer-churn-api-fhzx.onrender.com';

const fields = [
  { name: 'gender', label: 'Gender', options: ['Female', 'Male'] },
  { name: 'SeniorCitizen', label: 'Senior Citizen', options: ['0', '1'] },
  { name: 'Partner', label: 'Partner', options: ['Yes', 'No'] },
  { name: 'Dependents', label: 'Dependents', options: ['Yes', 'No'] },
  { name: 'tenure', label: 'Tenure (months)', type: 'number' },
  { name: 'PhoneService', label: 'Phone Service', options: ['Yes', 'No'] },
  {
    name: 'MultipleLines',
    label: 'Multiple Lines',
    options: ['No', 'Yes', 'No phone service']
  },
  {
    name: 'InternetService',
    label: 'Internet Service',
    options: ['DSL', 'Fiber optic', 'No']
  },
  {
    name: 'OnlineSecurity',
    label: 'Online Security',
    options: ['Yes', 'No', 'No internet service']
  },
  {
    name: 'OnlineBackup',
    label: 'Online Backup',
    options: ['Yes', 'No', 'No internet service']
  },
  {
    name: 'DeviceProtection',
    label: 'Device Protection',
    options: ['Yes', 'No', 'No internet service']
  },
  {
    name: 'TechSupport',
    label: 'Tech Support',
    options: ['Yes', 'No', 'No internet service']
  },
  {
    name: 'StreamingTV',
    label: 'Streaming TV',
    options: ['Yes', 'No', 'No internet service']
  },
  {
    name: 'StreamingMovies',
    label: 'Streaming Movies',
    options: ['Yes', 'No', 'No internet service']
  },
  {
    name: 'Contract',
    label: 'Contract',
    options: ['Month-to-month', 'One year', 'Two year']
  },
  {
    name: 'PaperlessBilling',
    label: 'Paperless Billing',
    options: ['Yes', 'No']
  },
  {
    name: 'PaymentMethod',
    label: 'Payment Method',
    options: [
      'Electronic check',
      'Mailed check',
      'Bank transfer (automatic)',
      'Credit card (automatic)'
    ]
  },
  { name: 'MonthlyCharges', label: 'Monthly Charges', type: 'number' },
  { name: 'TotalCharges', label: 'Total Charges', type: 'number' }
];

const initialForm = {
  gender: 'Female',
  SeniorCitizen: '0',
  Partner: 'Yes',
  Dependents: 'No',
  tenure: '12',
  PhoneService: 'Yes',
  MultipleLines: 'No',
  InternetService: 'DSL',
  OnlineSecurity: 'No',
  OnlineBackup: 'Yes',
  DeviceProtection: 'No',
  TechSupport: 'No',
  StreamingTV: 'No',
  StreamingMovies: 'No',
  Contract: 'Month-to-month',
  PaperlessBilling: 'Yes',
  PaymentMethod: 'Electronic check',
  MonthlyCharges: '70',
  TotalCharges: '840'
};

const chartColors = ['#2563eb', '#f97316'];

function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsError, setAnalyticsError] = useState('');

  // Load analytics from the Flask backend
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${API_URL}/analytics`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Unable to load analytics');
        }

        setAnalytics(data);
      } catch (err) {
        setAnalyticsError(err.message);
      } finally {
        setAnalyticsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });

    setResult(null);
    setError('');
  };

  const handlePredict = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    setError('');

    const payload = {
      ...form,
      SeniorCitizen: Number(form.SeniorCitizen),
      tenure: Number(form.tenure),
      MonthlyCharges: Number(form.MonthlyCharges),
      TotalCharges: Number(form.TotalCharges)
    };

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Prediction failed');
      }

      setResult(data);
    } catch (err) {
      setError(
        'Could not connect to the prediction server. ' + err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const pieData = analytics
    ? [
        {
          name: 'Retained',
          value: analytics.retained_customers
        },
        {
          name: 'Churned',
          value: analytics.churned_customers
        }
      ]
    : [];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>ChurnIQ</h2>

        <p className="menu-title">MENU</p>

        <nav>
          <a className="active" href="#dashboard">▦ Dashboard</a>
          <a href="#analytics">▤ Analytics</a>
          <a href="#prediction">◇ Churn Prediction</a>
        </nav>

        <div className="sidebar-footer">
          Customer Intelligence Platform
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar" id="dashboard">
          <div>
            <h1>Customer Dashboard</h1>
            <p>Monitor customer retention and churn risk.</p>
          </div>

          <span className="admin">Admin ●</span>
        </header>

        <section className="welcome">
          <div>
            <h2>Welcome to ChurnIQ 👋</h2>
            <p>
              Understand customer behavior and predict churn before it happens.
            </p>
          </div>
        </section>

        {/* Dataset Statistics */}

        <section className="stats">
          <div className="stat-card">
            <p>Total Customers</p>
            <h2>
              {analyticsLoading
                ? '...'
                : analytics
                  ? analytics.total_customers.toLocaleString()
                  : '--'}
            </h2>
            <span>Customer records</span>
          </div>

          <div className="stat-card">
            <p>Churned Customers</p>
            <h2>
              {analytics
                ? analytics.churned_customers.toLocaleString()
                : '--'}
            </h2>
            <span>Customers who left</span>
          </div>

          <div className="stat-card">
            <p>Churn Rate</p>
            <h2>
              {analytics ? `${analytics.churn_rate}%` : '--'}
            </h2>
            <span>Historical churn percentage</span>
          </div>

          <div className="stat-card">
            <p>Retained Customers</p>
            <h2>
              {analytics
                ? analytics.retained_customers.toLocaleString()
                : '--'}
            </h2>
            <span>Active customer records</span>
          </div>
        </section>

        {analyticsError && (
          <p style={{ color: '#dc2626', marginBottom: '20px' }}>
            Analytics error: {analyticsError}
          </p>
        )}

        {/* Customer Analytics */}

        <section id="analytics">
          <div style={{ margin: '30px 0 18px' }}>
            <h2>Customer Analytics</h2>
            <p style={{ color: '#64748b', marginTop: '8px' }}>
              Insights generated from the actual Telco customer dataset.
            </p>
          </div>

          {analyticsLoading ? (
            <div className="panel">
              Loading customer analytics...
            </div>
          ) : analytics ? (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '20px',
                  marginBottom: '22px'
                }}
              >
                {/* Retention Pie Chart */}

                <div className="panel">
                  <h3>Customer Retention Overview</h3>
                  <p>Retained versus churned customers</p>

                  <div
                    style={{
                      width: '100%',
                      height: 300,
                      marginTop: 20
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="45%"
                          outerRadius={85}
                          paddingAngle={2}
                          label={false}
                          labelLine={false}
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={entry.name}
                              fill={chartColors[index]}
                            />
                          ))}
                        </Pie>

                        <Tooltip
                          formatter={(value) => [
                            Number(value).toLocaleString(),
                            'Customers'
                          ]}
                        />

                        <Legend
                          verticalAlign="bottom"
                          height={36}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Contract-wise Bar Chart */}

                <div className="panel">
                  <h3>Contract-wise Churn Analysis</h3>
                  <p>Customer status by contract type</p>

                  <div
                    style={{
                      width: '100%',
                      height: 300,
                      marginTop: 20
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={analytics.contract_distribution}
                        margin={{
                          top: 10,
                          right: 15,
                          left: 5,
                          bottom: 20
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                          dataKey="contract"
                          interval={0}
                          angle={-15}
                          textAnchor="end"
                          height={65}
                          tick={{ fontSize: 11 }}
                        />

                        <YAxis
                          tick={{ fontSize: 12 }}
                        />

                        <Tooltip />

                        <Legend
                          verticalAlign="top"
                          height={36}
                        />

                        <Bar
                          dataKey="retained"
                          name="Retained"
                          fill="#2563eb"
                          radius={[4, 4, 0, 0]}
                        />

                        <Bar
                          dataKey="churned"
                          name="Churned"
                          fill="#f97316"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Tenure-wise Bar Chart */}

              <div className="panel" style={{ marginBottom: '25px' }}>
                <h3>Tenure-wise Churn Analysis</h3>
                <p>
                  Customer retention and churn across membership duration.
                </p>

                <div
                  style={{
                    width: '100%',
                    height: 330,
                    marginTop: 20
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analytics.tenure_distribution}
                      margin={{
                        top: 10,
                        right: 20,
                        left: 5,
                        bottom: 10
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis
                        dataKey="tenure"
                        tick={{ fontSize: 12 }}
                      />

                      <YAxis
                        tick={{ fontSize: 12 }}
                      />

                      <Tooltip />

                      <Legend />

                      <Bar
                        dataKey="retained"
                        name="Retained"
                        fill="#2563eb"
                        radius={[4, 4, 0, 0]}
                      />

                      <Bar
                        dataKey="churned"
                        name="Churned"
                        fill="#f97316"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : null}
        </section>

        {/* Customer Churn Prediction */}

        <section className="panel prediction-panel" id="prediction">
          <h3>Customer Churn Prediction</h3>

          <p>
            Enter customer account details to estimate the likelihood of churn.
          </p>

          <form onSubmit={handlePredict}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: '16px',
                marginTop: '24px'
              }}
            >
              {fields.map((field) => (
                <label
                  key={field.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '7px'
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>
                    {field.label}
                  </span>

                  {field.options ? (
                    <select
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="number"
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      min="0"
                      step="any"
                      required
                      style={inputStyle}
                    />
                  )}
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '24px',
                padding: '13px 24px',
                border: 'none',
                borderRadius: '8px',
                background: '#2563eb',
                color: 'white',
                fontWeight: 600,
                cursor: loading ? 'wait' : 'pointer'
              }}
            >
              {loading ? 'Analyzing Customer...' : 'Predict Churn →'}
            </button>
          </form>

          {error && (
            <p style={{ color: '#dc2626', marginTop: '20px' }}>
              {error}
            </p>
          )}

          {result && (
            <div
              style={{
                marginTop: '25px',
                padding: '22px',
                borderRadius: '10px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1'
              }}
            >
              <h3>Prediction Result</h3>

              <h2
                style={{
                  color: result.prediction === 1 ? '#dc2626' : '#15803d',
                  marginTop: '12px'
                }}
              >
                {result.result}
              </h2>

              <p style={{ marginTop: '12px' }}>
                Churn Probability:{' '}
                <strong>{result.churn_probability}%</strong>
              </p>

              <p style={{ marginTop: '10px' }}>
                Risk Level: <strong>{result.risk_level}</strong>
              </p>
            </div>
          )}
        </section>

        <footer>
          ChurnIQ | Customer Churn Prediction & Retention Intelligence
        </footer>
      </main>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '11px',
  border: '1px solid #cbd5e1',
  borderRadius: '7px',
  background: 'white',
  fontSize: '14px'
};

export default App;
