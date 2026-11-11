
import './App.css'
import React from 'react';

function App() {
  const [activePage, setActivePage] = React.useState("Dashboard");
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>ChurnIQ</h2>

        <p className="menu-title">MENU</p>
        <nav>
          <a className="active">▦ Dashboard</a>
          <a>♙ Customers</a>
          <a href="#prediction">◇ Churn Prediction</a>
          <a>▤ Analytics</a>
          <a>⚙ Settings</a>
        </nav>

        <div className="sidebar-footer">
          Customer Intelligence Platform
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Customer Dashboard</h1>
            <p>Monitor customer retention and churn risk.</p>
          </div>
          <span className="admin">Admin ●</span>
        </header>

        <section className="welcome">
          <div>
            <h2>Welcome to ChurnIQ 👋</h2>
            <p>Understand customer behavior and predict churn before it happens.</p>
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <p>Total Customers</p>
            <h2>7,043</h2>
            <span>Customer records</span>
          </div>

          <div className="stat-card">
            <p>Churned Customers</p>
            <h2>1,869</h2>
            <span>Historical churn records</span>
          </div>

          <div className="stat-card">
            <p>Churn Rate</p>
            <h2>26.54%</h2>
            <span>Historical churn percentage</span>
          </div>

          <div className="stat-card">
            <p>High Risk Customers</p>
            <h2>--</h2>
            <span>Awaiting ML predictions</span>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel">
            <h3>Customer Retention Overview</h3>
            <p>Historical customer distribution</p>

            <div className="chart-placeholder">
              <div className="bar bar1"></div>
              <div className="bar bar2"></div>
              <div className="bar bar3"></div>
              <div className="bar bar4"></div>
              <div className="bar bar5"></div>
              <div className="bar bar6"></div>
            </div>

            <div className="legend">
              <span>● Retained Customers</span>
              <span>● Churned Customers</span>
            </div>
          </div>

          <div className="panel">
            <h3>Churn Analysis</h3>
            <p>Historical customer status</p>

            <div className="donut"></div>

            <div className="analysis-info">
              <p>Retained <strong>73.46%</strong></p>
              <p>Churned <strong>26.54%</strong></p>
            </div>
          </div>
        </section>

        <section className="panel prediction-panel">
          <h3>Machine Learning Prediction</h3>
          <p>
            Our predictive model will identify customers who are likely
            to leave based on their usage and account information.
          </p>

          <button onClick={() => alert('Prediction module will be connected in a later step.')}>
            Explore Churn Prediction →
          </button>
        </section>

        <footer>
          ChurnIQ | Customer Churn Prediction & Retention Intelligence
        </footer>
      </main>
    </div>
  )
}

export default App
