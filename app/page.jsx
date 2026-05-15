"use client"

import { useState } from "react"
import { RELATED_LINKS as RELATED } from "./lib/links"

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .roi-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .roi-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .roi-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .roi-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .roi-title em { font-style: italic; color: #92400e; }
  .roi-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .roi-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }

  .roi-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .roi-field-block { }
  .roi-field-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .4rem; }
  .roi-field-hint { font-size: 12px; color: #888; margin-top: .3rem; line-height: 1.5; }
  .roi-input-wrap { position: relative; }
  .roi-prefix { position: absolute; left: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .roi-suffix { position: absolute; right: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .roi-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem .4rem 1.2rem; outline: none; transition: border-color .2s; }
  .roi-input.no-prefix { padding-left: 0; }
  .roi-input:focus { border-color: #92400e; }

  .roi-verdict { border-radius: 4px; padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; border-left: 3px solid; }
  .roi-verdict.strong { background: #f0fdf4; border-color: #166534; }
  .roi-verdict.good   { background: #fefce8; border-color: #854d0e; }
  .roi-verdict.weak   { background: #fff7ed; border-color: #c2410c; }
  .roi-verdict.poor   { background: #fef2f2; border-color: #b91c1c; }
  .roi-verdict-title  { font-family: 'DM Serif Display', serif; font-size: 1.1rem; margin-bottom: .3rem; }
  .roi-verdict.strong .roi-verdict-title { color: #166534; }
  .roi-verdict.good   .roi-verdict-title { color: #854d0e; }
  .roi-verdict.weak   .roi-verdict-title { color: #c2410c; }
  .roi-verdict.poor   .roi-verdict-title { color: #b91c1c; }
  .roi-verdict-sub { font-size: 12px; color: #555; line-height: 1.6; }

  .roi-result-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .roi-result-cell { background: #fff; padding: 1rem; }
  .roi-result-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .roi-result-val { font-family: 'DM Serif Display', serif; font-size: 1.3rem; color: #1a1a1a; }
  .roi-result-val.green  { color: #166534; }
  .roi-result-val.amber  { color: #92400e; }
  .roi-result-val.red    { color: #b91c1c; }

  .roi-timeline { margin-bottom: 1.5rem; }
  .roi-timeline-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .6rem; display: flex; justify-content: space-between; }
  .roi-timeline-track { position: relative; height: 28px; background: #f5f3ef; border: 1px solid #e0dbd3; border-radius: 3px; overflow: hidden; margin-bottom: .4rem; }
  .roi-timeline-cost    { position: absolute; left: 0; top: 0; height: 100%; background: #b91c1c; opacity: .7; transition: width .5s; display: flex; align-items: center; padding-left: .5rem; }
  .roi-timeline-payback { position: absolute; top: 0; height: 100%; background: #92400e; opacity: .5; transition: left .5s, width .5s; }
  .roi-timeline-gain    { position: absolute; top: 0; height: 100%; background: #166534; opacity: .4; transition: left .5s, width .5s; }
  .roi-timeline-label-inner { font-size: 10px; color: #fff; font-weight: 500; white-space: nowrap; overflow: hidden; }
  .roi-timeline-legend { display: flex; gap: 1.25rem; font-size: 11px; color: #888; flex-wrap: wrap; }
  .roi-legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: .3rem; vertical-align: middle; }

  .roi-scenario-section { border: 1.5px dashed #fed7aa; border-radius: 4px; padding: 1.25rem; margin-bottom: 1rem; }
  .roi-scenario-title { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #92400e; margin-bottom: .75rem; }
  .roi-scenario-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; }
  .roi-scenario-cell { background: #fff; padding: .75rem; }
  .roi-scenario-cell-label { font-size: 10px; letter-spacing: .06em; text-transform: uppercase; color: #aaa; margin-bottom: .25rem; }
  .roi-scenario-cell-val { font-family: 'DM Serif Display', serif; font-size: 1.1rem; }
  .roi-scenario-cell-val.conservative { color: #888; }
  .roi-scenario-cell-val.base { color: #92400e; font-size: 1.3rem; }
  .roi-scenario-cell-val.optimistic { color: #166534; }
  .roi-scenario-note { font-size: 11px; color: #aaa; margin-top: .6rem; line-height: 1.5; }

  .roi-opp-cost { font-size: 12px; color: #888; padding: .9rem 1rem; background: #fafaf8; border: 1px solid #e0dbd3; border-radius: 3px; line-height: 1.6; }
  .roi-opp-cost span { color: #1a1a1a; }

  .roi-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .roi-info-item { padding: .75rem; border-left: 2px solid #fed7aa; }
  .roi-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .roi-info-body { font-size: 12px; color: #888; line-height: 1.5; }

  .roi-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .roi-prose p:last-child { margin-bottom: 0; }
  .roi-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .roi-prose ul li { margin-bottom: .3rem; }

  .roi-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .roi-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #fed7aa; line-height: 1; margin-bottom: .4rem; }
  .roi-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .roi-tip-body { font-size: 12px; color: #888; line-height: 1.5; }

  .roi-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .roi-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .roi-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .roi-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .roi-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .roi-footer-links a { color: #888; text-decoration: underline; }

  @media (max-width: 600px) {
    .roi-field-row, .roi-info-grid, .roi-tip-grid { grid-template-columns: 1fr; }
    .roi-result-grid, .roi-scenario-grid { grid-template-columns: 1fr 1fr; }
  }
`

import { RELATED_LINKS as RELATED } from "./lib/links"

function fmt(n) { return "$" + Math.round(Math.abs(n)).toLocaleString("en-US") }
function fmtSigned(n) { return (n >= 0 ? "+" : "−") + "$" + Math.round(Math.abs(n)).toLocaleString("en-US") }

function getVerdict(roi, paybackMonths, completionMonths) {
  const totalDelay = completionMonths + paybackMonths
  if (roi >= 200 && totalDelay <= 18) return { key: "strong", title: "Strong investment", msg: "High return and fast payback make this a compelling use of money and time. The numbers support moving forward." }
  if (roi >= 100 && totalDelay <= 36) return { key: "good",   title: "Solid investment",  msg: "A meaningful return within a reasonable timeframe. Worth pursuing if the income increase estimate is realistic." }
  if (roi >= 0  && totalDelay <= 60) return { key: "weak",   title: "Marginal return",   msg: "This course breaks even but doesn't generate strong returns. Consider whether the income increase estimate is achievable before committing." }
  return { key: "poor", title: "Low or negative ROI", msg: "Based on these numbers, this course may cost more than it returns. Review the income increase estimate or look for a lower-cost alternative." }
}

export default function Page() {
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
  const timeInvested = cm * 40 // rough hours in a 3-month course
  const oppCost      = (cm * tv * 4 * 10) // rough opportunity cost: months × hourly × hrs/wk × weeks/mo — simplified
  const totalCost    = c + oppCost
  const adjustedROI  = totalCost > 0 ? ((totalGain - totalCost) / totalCost) * 100 : 0

  // Scenarios: conservative (50% of income increase), base, optimistic (150%)
  const conservative = { gain: inc * 0.5 * d, roi: ((inc * 0.5 * d - c) / c * 100) }
  const optimistic   = { gain: inc * 1.5 * d, roi: ((inc * 1.5 * d - c) / c * 100) }

  const verdict = c > 0 && inc > 0 ? getVerdict(roi, payback, cm) : null

  // Timeline bar widths — normalize to total duration window
  const totalMonths = cm + d
  const costW   = 0  // cost is upfront, no timeline width needed — mark payback instead
  const paybackW = totalMonths > 0 ? Math.min((payback / totalMonths) * 100, 100) : 0
  const gainW    = totalMonths > 0 ? (d / totalMonths) * 100 : 0
  const gainLeft = totalMonths > 0 ? (cm / totalMonths) * 100 : 0

  return (
    <>
      <style>{css}</style>
      <main className="roi-wrap">

        <div className="roi-header">
          <p className="roi-eyebrow">Education &amp; Career</p>
          <h1 className="roi-title">Online Course<br /><em>ROI Calculator</em></h1>
        </div>

        {/* TOOL */}
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
                <div className={`roi-verdict ${verdict.key}`}>
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
                  <p className={`roi-result-val ${profit >= 0 ? "green" : "red"}`}>{fmtSigned(profit)}</p>
                </div>
                <div className="roi-result-cell">
                  <p className="roi-result-label">ROI</p>
                  <p className={`roi-result-val ${roi >= 100 ? "green" : roi >= 0 ? "amber" : "red"}`}>
                    {roi >= 0 ? "+" : ""}{roi.toFixed(0)}%
                  </p>
                </div>
                <div className="roi-result-cell">
                  <p className="roi-result-label">Payback period</p>
                  <p className={`roi-result-val ${payback <= 12 ? "green" : payback <= 24 ? "amber" : "red"}`}>
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

        {/* HOW IT WORKS */}
        <div className="roi-card">
          <p className="roi-section-title">How this calculator works</p>
          <div className="roi-prose">
            <p>The core calculation compares the cost of a course against the income it generates over time. You enter the course fee, how long it takes to complete, the monthly income increase you expect afterward, and how long that benefit lasts. The calculator returns total gain, net profit, ROI percentage, and payback period.</p>
            <p>The scenario section runs three versions of the calculation — conservative (half the expected income gain), base case, and optimistic (1.5×) — because income projections from education investments are inherently uncertain. Seeing the downside scenario before committing is one of the most useful things this tool can show you.</p>
            <p>The opportunity cost field adds a layer most ROI calculators omit: the value of your time. If study time could otherwise be spent on paid work, that time has real economic cost. Entering your effective hourly rate gives you an adjusted ROI that accounts for the full cost of the investment, not just the course fee.</p>
          </div>
          <div className="roi-info-grid">
            <div className="roi-info-item">
              <p className="roi-info-title">What counts as income increase?</p>
              <p className="roi-info-body">A salary raise at your current job, new freelance clients, a career change to a higher-paying field, or a promotion made possible by a new credential. Be specific — vague income assumptions are the most common reason ROI projections disappoint.</p>
            </div>
            <div className="roi-info-item">
              <p className="roi-info-title">Duration of benefit</p>
              <p className="roi-info-body">Skills depreciate. A programming language course might stay relevant for 5–10 years; a course on a specific software tool might be obsolete in 2. Being realistic about how long the income increase will last significantly affects the true ROI.</p>
            </div>
            <div className="roi-info-item">
              <p className="roi-info-title">Payback period</p>
              <p className="roi-info-body">The number of months of higher income needed to recover the course cost. A payback period shorter than 6 months is excellent; 12–18 months is reasonable; beyond 24 months requires a long-term commitment to the income increase materializing.</p>
            </div>
            <div className="roi-info-item">
              <p className="roi-info-title">Non-financial returns</p>
              <p className="roi-info-body">This calculator focuses on income ROI. Some courses deliver value that doesn&apos;t show up as income — job satisfaction, career optionality, credentials that open doors gradually, or skills that support a long-term pivot. These are real but harder to quantify.</p>
            </div>
          </div>
        </div>

        {/* WHEN COURSES ARE WORTH IT */}
        <div className="roi-card">
          <p className="roi-section-title">When online courses are — and aren&apos;t — worth it</p>
          <div className="roi-prose">
            <p>The online education market has grown enormously, and quality varies just as widely as price. A $30 course on a platform like Udemy can deliver more practical value than a $3,000 bootcamp, and vice versa. The course fee is only one input — the quality of the instruction, the specificity of the skills, and whether employers in your field actually value the credential matter more than cost alone.</p>
            <p>Courses tend to deliver strong ROI when they teach a specific, demonstrable skill that employers are actively hiring for, when they come with a credential or portfolio output that can be shown to employers, and when you can apply the skill quickly after completing the course rather than waiting for a formal credential process.</p>
            <p>They tend to deliver poor ROI when the income increase is speculative rather than tied to a specific job change or client, when the skill is broad rather than targeted, or when the same material is freely available and employers don&apos;t distinguish between self-taught and certified knowledge in that area.</p>
          </div>
        </div>

        {/* TIPS */}
        <div className="roi-card">
          <p className="roi-section-title">How to evaluate a course before buying</p>
          <div className="roi-tip-grid">
            <div>
              <p className="roi-tip-num">01</p>
              <p className="roi-tip-title">Start with the job market</p>
              <p className="roi-tip-body">Before enrolling, check job listings in your target role and see what skills and credentials employers are actually asking for. If the course outcome doesn&apos;t map to what hiring managers list, the income increase estimate deserves skepticism.</p>
            </div>
            <div>
              <p className="roi-tip-num">02</p>
              <p className="roi-tip-title">Verify instructor credentials</p>
              <p className="roi-tip-body">The best online instructors have current, active experience in what they teach — not just academic backgrounds. Look for instructors who practice the skill professionally and can speak to what the market currently looks like.</p>
            </div>
            <div>
              <p className="roi-tip-num">03</p>
              <p className="roi-tip-title">Look for portfolio-ready output</p>
              <p className="roi-tip-body">Courses that end with a project you can show an employer — a GitHub repo, a design portfolio, a case study — are more valuable than those that only award a certificate. Demonstrable work beats credentials in most technical fields.</p>
            </div>
            <div>
              <p className="roi-tip-num">04</p>
              <p className="roi-tip-title">Be conservative on timing</p>
              <p className="roi-tip-body">Most people underestimate how long it takes to translate a new skill into income. Add 2–3 months to your expected timeline for job searching, client acquisition, or making the internal case for a raise. The conservative scenario in this calculator models that reality.</p>
            </div>
          </div>
        </div>

       {/* ========== MONEYWISE LINK — START ========== */}
        <div style={{ background: "#fff", border: "1px solid #e0dbd3", borderRadius: "4px", padding: "1rem 1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#888" }}>
            Looking for more free financial tools?{" "}
            <a href="https://moneywisecalculator.com" style={{ color: "#b45309", textDecoration: "underline" }}>
              Visit MoneyWiseCalculator.com
            </a>
          </p>
        </div>
        {/* ========== MONEYWISE LINK — END ========== */}

        {/* RELATED */}
        <div className="dr-card">
          <p className="dr-section-title">Related tools</p>
          <div className="dr-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="dr-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="dr-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial advice. Results assume a fixed interest rate and fixed monthly payment for the full repayment period. This site may use cookies and analytics. By using this site, you agree to our Privacy Policy and Terms of Service.
            <div className="dr-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
