"use client"

import { useState } from "react"

export default function Page() {
  const [courseCost, setCourseCost] = useState(1000)
  const [timeMonths, setTimeMonths] = useState(6)
  const [incomeIncrease, setIncomeIncrease] = useState(500)
  const [durationMonths, setDurationMonths] = useState(24)

  const totalGain = incomeIncrease * durationMonths
  const profit = totalGain - courseCost
  const roi = (profit / courseCost) * 100
  const paybackMonths = courseCost / incomeIncrease

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem",
        background: "#f4f6fb",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}
    >
      {/* TOOL */}
      <div
        style={{
          background: "#ffffff",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "1.5rem"
        }}
      >
        <h1>Online Course ROI Calculator</h1>

        <p>
          Estimate whether an online course is worth the investment by calculating
          total return, profit, and payback time based on expected income gains.
        </p>

        <div style={{ marginTop: "1.5rem" }}>
          <label>Course Cost ($)</label>
          <input
            type="number"
            value={courseCost}
            onChange={(e) => setCourseCost(Number(e.target.value))}
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />

          <label>Time to Complete (months)</label>
          <input
            type="number"
            value={timeMonths}
            onChange={(e) => setTimeMonths(Number(e.target.value))}
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />

          <label>Expected Monthly Income Increase ($)</label>
          <input
            type="number"
            value={incomeIncrease}
            onChange={(e) => setIncomeIncrease(Number(e.target.value))}
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />

          <label>How Long Increased Income Lasts (months)</label>
          <input
            type="number"
            value={durationMonths}
            onChange={(e) => setDurationMonths(Number(e.target.value))}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <p><strong>Total Expected Gain:</strong> ${totalGain.toFixed(0)}</p>
          <p><strong>Net Profit:</strong> ${profit.toFixed(0)}</p>
          <p><strong>ROI:</strong> {roi.toFixed(1)}%</p>
          <p><strong>Payback Period:</strong> {paybackMonths.toFixed(1)} months</p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div
        style={{
          background: "#ffffff",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "1.5rem"
        }}
      >
        <h2>How This Works</h2>
        <p>
          This calculator estimates your return by comparing the cost of a course
          against expected increases in income over time. ROI is calculated as
          profit divided by cost.
        </p>
      </div>

      {/* RELATED TOOLS */}
      <div
        style={{
          background: "#ffffff",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "1.5rem"
        }}
      >
        <h2>Related Tools</h2>
        <ul>
          <li onClick={() => window.location.href = "https://creditcarddebtpayoffcalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
            Credit Card Debt Payoff Calculator
          </li>
          <li onClick={() => window.location.href = "https://debtreducingcalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
            Debt Reducing Calculator
          </li>
          <li onClick={() => window.location.href = "https://sidehustletaxestimator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
            Side Hustle Tax Estimator
          </li>
          <li onClick={() => window.location.href = "https://highyieldsavingscalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
            High Yield Savings Calculator
          </li>
          <li onClick={() => window.location.href = "https://retirementsavingsgap.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
            Retirement Savings Gap Calculator
          </li>
          <li onClick={() => window.location.href = "https://lifeinsurancecoveragecalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
            Life Insurance Coverage Calculator
          </li>
          <li onClick={() => window.location.href = "https://mysubscriptioncost.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
            Subscription Cost Calculator
          </li>
          <li onClick={() => window.location.href = "https://emailattachmentsize.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
            Email Attachment Size Checker
          </li>
          <li onClick={() => window.location.href = "https://gpacalculator.site"} style={{ cursor: "pointer", textDecoration: "underline" }}>
            GPA Calculator
          </li>
        </ul>
      </div>

      {/* DISCLAIMER + FOOTER */}
      <div style={{ fontSize: "0.9rem", color: "#555", marginBottom: "1rem" }}>
        This tool provides estimates for informational purposes only and does not guarantee income outcomes.
      </div>

      <div style={{ fontSize: "0.9rem" }}>
        <span
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => window.location.href = "/privacy"}
        >
          Privacy Policy
        </span>
        {" | "}
        <span
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => window.location.href = "/terms"}
        >
          Terms of Service
        </span>
      </div>
    </main>
  )
}