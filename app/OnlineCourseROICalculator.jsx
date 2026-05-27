"use client"

import { useState } from "react"

function fmt(n) { return "$" + Math.round(Math.abs(n)).toLocaleString("en-US") }
function fmtSigned(n) { return (n >= 0 ? "+" : "−") + "$" + Math.round(Math.abs(n)).toLocaleString("en-US") }

function getVerdict(roi, paybackMonths, completionMonths) {
  const totalDelay = completionMonths + paybackMonths
  if (roi >= 200 && totalDelay <= 18) return { key: "strong", title: "Strong investment", msg: "High return and fast payback make this a compelling use of money and time. The numbers support moving forward." }
  if (roi >= 100 && totalDelay <= 36) return { key: "good",   title: "Solid investment",  msg: "A meaningful return within a reasonable timeframe. Worth pursuing if the income increase estimate is realistic." }
  if (roi >= 0  && totalDelay <= 60) return { key: "weak",   title: "Marginal return",   msg: "This course breaks even but doesn't generate strong returns. Consider whether the income increase estimate is achievable before committing." }
  return { key: "poor", title: "Low or negative ROI", msg: "Based on these numbers, this course may cost more than it returns. Review the income increase estimate or look for a lower-cost alternative." }
}

export default function OnlineCourseROICalculator() {
  const [cost,     setCost]     = useState("1000")
  const [complete, setComplete] = useState("3")
  const [increase, setIncrease] = useState("500")
  const [duration, setDuration] = useState("24")
  const [timeValue, setTimeValue] = useState("25")

  const c  = parseFloat(cost)     || 0
  const cm = parseFloat(complete) || 0
  const inc = parseFloat(increase) || 0
  const d  = parseFloat(duration) || 0
  const tv = parseFloat(timeValue) || 0

  const totalGain    = inc * d
  const profit       = totalGain - c
  const roi          = c > 0 ? (profit / c) * 100 : 0
  const payback      = inc > 0 ? c / inc : Infinity
  const timeInvested = cm * 40
  const oppCost      = (cm * tv * 4 * 10)
  const totalCost    = c + oppCost
  const adjustedROI  = totalCost > 0 ? ((totalGain - totalCost) / totalCost) * 100 : 0

  const conservative = { gain: inc * 0.5 * d, roi: ((inc * 0.5 * d - c) / c * 100) }
  const optimistic   = { gain: inc * 1.5 * d, roi: ((inc * 1.5 * d - c) / c * 100) }

  const verdict = c > 0 && inc > 0 ? getVerdict(roi, payback, cm) : null
  const totalMonths = cm + d
  const gainLeft = totalMonths > 0 ? (cm / totalMonths) * 100 : 0
  const gainW    = totalMonths > 0 ? (d / totalMonths) * 100 : 0

  return (
    <div className="roi-card">
      <div className="roi-field-row">
        <div className="roi-field-block">
          <label className="roi-field-label" htmlFor="cost">Course cost</label>
          <div className="roi-input-wrap">
            <span className="roi-prefix">$</span>
            <input id="cost" className="roi-input" type="number" min="0" placeholder="1000"
              value={cost} onChange={e => setCost(e.target.value)} />
          </div>
        </div>
        <div className="roi-field-block">
          <label className="roi-field-label" htmlFor="complete">Time to complete</label>
          <div className="roi-input-wrap">
            <input id="complete" className="roi-input no-prefix" type="number" min="0" placeholder="3"
              value={complete} onChange={e => setComplete(e.target.value)} />
            <span className="roi-suffix">mo</span>
          </div>
          <p className="roi-field-hint">Months before the new skill begins generating income</p>
        </div>
      </div>

      <div className="roi-field-row">
        <div className="roi-field-block">
          <label className="roi-field-label" htmlFor="increase">Expected monthly income increase</label>
          <div className="roi-input-wrap">
            <span className="roi-prefix">$</span>
            <input id="increase" className="roi-input" type="number" min="0" placeholder="500"
              value={increase} onChange={e => setIncrease(e.target.value)} />
          </div>
          <p className="roi-field-hint">Raise, freelance income, new clients, or salary at a new job</p>
        </div>
        <div className="roi-field-block">
          <label className="roi-field-label" htmlFor="duration">Duration of income benefit</label>
          <div className="roi-input-wrap">
            <input id="duration" className="roi-input no-prefix" type="number" min="0" placeholder="24"
              value={duration} onChange={e => setDuration(e.target.value)} />
            <span className="roi-suffix">mo</span>
          </div>
          <p className="roi-field-hint">How long the skill remains relevant and generates higher income</p>
        </div>
      </div>

      <div className="roi-field-row" style={{ marginBottom: "1.5rem" }}>
        <div className="roi-field-block">
          <label className="roi-field-label" htmlFor="timeval">Your time value (hourly rate)</label>
          <div className="roi-input-wrap">
            <span className="roi-prefix">$</span>
            <input id="timeval" className="roi-input" type="number" min="0" placeholder="25"
              value={timeValue} onChange={e => setTimeValue(e.target.value)} />
            <span className="roi-suffix">/hr</span>
          </div>
          <p className="roi-field-hint">Used to estimate opportunity cost of study time</p>
        </div>
      </div>

      {c > 0 && inc > 0 && d > 0 && (
        <>
          {verdict && (
            <div className={"roi-verdict " + verdict.key}>
              <p className="roi-verdict-title">{verdict.title}</p>
              <p className="roi-verdict-sub">{verdict.msg}</p>
            </div>
          )}

          <div className="roi-result-grid">
            <div className="roi-result-cell">
              <p className="roi-result-label">Total income gain</p>
              <p className="roi-result-val green">{fmt(totalGain)}</p>
            </div>
            <div className="roi-result-cell">
              <p className="roi-result-label">Net profit</p>
              <p className={"roi-result-val " + (profit >= 0 ? "green" : "red")}>{fmtSigned(profit)}</p>
            </div>
            <div className="roi-result-cell">
              <p className="roi-result-label">ROI</p>
              <p className={"roi-result-val " + (roi >= 100 ? "green" : roi >= 0 ? "amber" : "red")}>
                {roi >= 0 ? "+" : ""}{roi.toFixed(0)}%
              </p>
            </div>
            <div className="roi-result-cell">
              <p className="roi-result-label">Payback period</p>
              <p className={"roi-result-val " + (payback <= 12 ? "green" : payback <= 24 ? "amber" : "red")}>
                {isFinite(payback) ? payback.toFixed(1) + " mo" : "∞"}
              </p>
            </div>
          </div>

          <div className="roi-timeline">
            <div className="roi-timeline-label">
              <span>Income timeline</span>
              <span>{(cm + d)} months total window</span>
            </div>
            <div className="roi-timeline-track">
              <div className="roi-timeline-cost" style={{ width: Math.min((cm / totalMonths) * 100, 100) + "%" }}>
                <span className="roi-timeline-label-inner">Study: {cm}mo</span>
              </div>
              <div className="roi-timeline-gain" style={{ left: gainLeft + "%", width: gainW + "%" }} />
            </div>
            <div className="roi-timeline-legend">
              <span><span className="roi-legend-dot" style={{ background: "#b91c1c", opacity: .7 }} />Study period ({cm} mo)</span>
              <span><span className="roi-legend-dot" style={{ background: "#166534", opacity: .7 }} />Income benefit ({d} mo)</span>
              {isFinite(payback) && <span>Payback after: {(cm + payback).toFixed(1)} months total</span>}
            </div>
          </div>

          <div className="roi-scenario-section">
            <p className="roi-scenario-title">Scenario analysis — what if the income increase varies?</p>
            <div className="roi-scenario-grid">
              <div className="roi-scenario-cell">
                <p className="roi-scenario-cell-label">Conservative (50%)</p>
                <p className="roi-scenario-cell-val conservative">{fmt(conservative.gain)}</p>
                <p style={{ fontSize: "11px", color: conservative.roi >= 0 ? "#888" : "#b91c1c", marginTop: ".2rem" }}>
                  ROI: {conservative.roi.toFixed(0)}%
                </p>
              </div>
              <div className="roi-scenario-cell">
                <p className="roi-scenario-cell-label">Base case</p>
                <p className="roi-scenario-cell-val base">{fmt(totalGain)}</p>
                <p style={{ fontSize: "11px", color: "#92400e", marginTop: ".2rem" }}>ROI: {roi.toFixed(0)}%</p>
              </div>
              <div className="roi-scenario-cell">
                <p className="roi-scenario-cell-label">Optimistic (150%)</p>
                <p className="roi-scenario-cell-val optimistic">{fmt(optimistic.gain)}</p>
                <p style={{ fontSize: "11px", color: "#166534", marginTop: ".2rem" }}>ROI: {optimistic.roi.toFixed(0)}%</p>
              </div>
            </div>
            <p className="roi-scenario-note">Conservative assumes you achieve 50% of your expected income increase; optimistic assumes 150%. Most people slightly overestimate near-term income gains — the conservative scenario is a useful sanity check.</p>
          </div>

          <div className="roi-opp-cost">
            At an hourly rate of ${timeValue}/hr, completing this course in {cm} months represents roughly <span>{fmt(oppCost)}</span> in opportunity cost. Accounting for both the course fee and your time, the adjusted ROI is <span>{adjustedROI.toFixed(0)}%</span>. This is a stricter measure — useful if you could apply study time directly to billable work.
          </div>
        </>
      )}
    </div>
  )
}