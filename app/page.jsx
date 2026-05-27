import OnlineCourseROICalculator from "./OnlineCourseROICalculator"
import { RELATED_LINKS as RELATED } from "./lib/links"

const staticCss = `
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
  .roi-faq-item { border-bottom: 1px solid #e0dbd3; padding: 1rem 0; }
  .roi-faq-item:last-child { border-bottom: none; padding-bottom: 0; }
  .roi-faq-q { font-size: 13px; font-weight: 500; color: #1a1a1a; margin-bottom: .4rem; }
  .roi-faq-a { font-size: 13px; color: #555; line-height: 1.7; }
  .roi-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .roi-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #fed7aa; line-height: 1; margin-bottom: .4rem; }
  .roi-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .roi-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .sub-nav { font-size: 12px; margin-bottom: 1.5rem; }
  .sub-nav a { color: #92400e; text-decoration: none; }
  .sub-nav a:hover { text-decoration: underline; }
  .roi-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .roi-related-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .75rem; }
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

const FAQ = [
  {
    q: "What's a good ROI for an online course?",
    a: "A good ROI depends on the investment size and your alternatives. For a $500–$2,000 course, an ROI of 100–200% (meaning you earn back double what you paid) over 2–3 years is solid. For a $50 course, you might expect an ROI of 500%+ because the downside is minimal. The verdict section in this calculator (Strong/Solid/Marginal/Poor) provides a qualitative assessment based on both ROI and payback speed — a fast payback (under 6 months) is often more valuable than a high ROI with a multi-year wait."
  },
  {
    q: "How do I estimate the income increase from a course?",
    a: "Start by researching job postings or freelance rates in the skill the course teaches. If you're using it to get a promotion, ask what percentage raise is typical at your company for the new role. If you're pivoting careers, look at entry-level salaries in that field vs your current salary. Be specific — 'I'll earn more' is not an estimate. The conservative scenario (50% of your estimate) in the calculator is often closer to reality than the base case, especially for career transitions."
  },
  {
    q: "What is opportunity cost and why does it matter?",
    a: "Opportunity cost is the income you could have earned with the time spent studying. If you spend 10 hours per week for 3 months on a course instead of freelancing at $50/hour, that's roughly $6,000 in foregone income. The calculator adds this to the course cost to show an adjusted ROI that accounts for your time. This matters most for people who could otherwise turn study hours into paid work — freelancers, consultants, or anyone with a side income stream."
  },
  {
    q: "How do I know how long the income benefit will last?",
    a: "Skills depreciate. A course on a specific software version might be obsolete in 2 years. A programming language course might stay relevant for 5-10 years. A business or leadership course could last your whole career. Be honest with yourself — most people overestimate duration because they want the numbers to look better. For a first estimate, use 12-24 months unless you have clear evidence otherwise."
  },
  {
    q: "Should I include non-financial benefits in my decision?",
    a: "This calculator focuses on income ROI, but courses also deliver non-financial value: job satisfaction, career optionality, networking, credentials that open doors gradually, or skills that support a long-term career pivot. These are real but harder to quantify. A course that breaks even financially might still be worth it if it moves you into a field you enjoy more. Just be clear with yourself about whether that's the primary motivation rather than the income estimate."
  },
  {
    q: "What if I don't finish the course?",
    a: "The calculator assumes you complete it. If you have a history of not finishing online courses, adjust your completion time upward or add 20-30% to the effective cost (since you might need to retake or buy supplementary materials). The most common ROI mistake is assuming completion when the actual probability is lower — be honest with yourself about your track record before committing."
  }
]

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: staticCss }} />
      <main className="roi-wrap">

        <p className="sub-nav"><a href="https://moneywisecalculator.com">← More free tools at MoneyWise Calculator</a></p>

        <div className="roi-header">
          <p className="roi-eyebrow">Education &amp; Career</p>
          <h1 className="roi-title">Online Course<br /><em>ROI Calculator</em></h1>
        </div>

        <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7", marginBottom: "1.5rem" }}>
          Free tool to calculate the return on investment (ROI) of an online course. Enter cost, completion time, expected income increase, and benefit duration to see total gain, ROI percentage, payback period, and scenario analysis.
        </p>

        <OnlineCourseROICalculator />

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
              <p className="roi-info-body">This calculator focuses on income ROI. Some courses deliver value that doesn't show up as income — job satisfaction, career optionality, credentials that open doors gradually, or skills that support a long-term pivot. These are real but harder to quantify.</p>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="roi-card">
          <p className="roi-section-title">Why calculating ROI before buying matters</p>
          <div className="roi-prose">
            <p>The online education market has exploded, and with it, the range of quality and value. A $30 course on a platform like Udemy can deliver more practical value than a $3,000 bootcamp, and vice versa. The course fee is only one input — the quality of the instruction, the specificity of the skills, and whether employers in your field actually value the credential matter more than cost alone.</p>
            <p>Courses tend to deliver strong ROI when they teach a specific, demonstrable skill that employers are actively hiring for, when they come with a credential or portfolio output that can be shown to employers, and when you can apply the skill quickly after completing the course rather than waiting for a formal credential process.</p>
            <p>They tend to deliver poor ROI when the income increase is speculative rather than tied to a specific job change or client, when the skill is broad rather than targeted, or when the same material is freely available and employers don't distinguish between self-taught and certified knowledge in that area.</p>
          </div>
        </div>

        {/* REAL-WORLD EXAMPLE */}
        <div className="roi-card">
          <p className="roi-section-title">Real-world example: Two courses, very different outcomes</p>
          <div className="roi-prose">
            <p><strong>Meet Sarah and Mike.</strong> Both spent $1,500 on online courses. Sarah bought a course on data analytics; Mike bought a general business course.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ background: "#f0fdf4", padding: "1rem", borderRadius: "4px", border: "1px solid #b7d9c8" }}>
              <p style={{ fontSize: "12px", fontWeight: "500", color: "#166534", marginBottom: ".5rem" }}>📊 Sarah — Data analytics course</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}>3 months to complete · $500/month income increase · 24 months benefit</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>Total gain:</strong> $12,000 · <strong>ROI:</strong> 700%</p>
              <p style={{ fontSize: "13px", color: "#166534", fontWeight: "500", marginTop: ".5rem" }}>Payback in 3 months · Excellent investment</p>
            </div>
            
            <div style={{ background: "#fff1f2", padding: "1rem", borderRadius: "4px", border: "1px solid #fcd4d4" }}>
              <p style={{ fontSize: "12px", fontWeight: "500", color: "#b91c1c", marginBottom: ".5rem" }}>💼 Mike — General business course</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}>6 months to complete · $100/month income increase · 12 months benefit</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>Total gain:</strong> $1,200 · <strong>ROI:</strong> -20% (loss)</p>
              <p style={{ fontSize: "13px", color: "#b91c1c", fontWeight: "500", marginTop: ".5rem" }}>Never breaks even before the skill becomes less relevant</p>
            </div>
          </div>
          
          <div style={{ marginTop: "1rem", padding: "1rem", background: "#f5f3ef", borderRadius: "4px" }}>
            <p style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: "500", marginBottom: ".25rem" }}>The bottom line:</p>
            <p style={{ fontSize: "13px", color: "#444" }}>The same $1,500 produced a $10,500 difference in outcomes. The difference wasn't the price — it was specificity (data analytics vs general business), income increase potential ($500/mo vs $100/mo), and benefit duration (24 months vs 12 months). Run the numbers before you buy, not after.</p>
          </div>
        </div>

        {/* TIPS */}
        <div className="roi-card">
          <p className="roi-section-title">How to evaluate a course before buying</p>
          <div className="roi-tip-grid">
            <div>
              <p className="roi-tip-num">01</p>
              <p className="roi-tip-title">Start with the job market</p>
              <p className="roi-tip-body">Before enrolling, check job listings in your target role and see what skills and credentials employers are actually asking for. If the course outcome doesn't map to what hiring managers list, the income increase estimate deserves skepticism.</p>
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

        {/* FAQ */}
        <div className="roi-card">
          <p className="roi-section-title">Frequently asked questions</p>
          {FAQ.map((item, i) => (
            <div className="roi-faq-item" key={i}>
              <p className="roi-faq-q">{item.q}</p>
              <p className="roi-faq-a">{item.a}</p>
            </div>
          ))}
        </div>

        {/* RELATED TOOLS */}
        <div className="roi-card">
          <p className="roi-section-title">Related tools</p>
          <p className="roi-related-label">More free tools from the MoneyWise Calculator network</p>
          <div className="roi-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="roi-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="roi-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial advice. Results assume a fixed interest rate and fixed monthly payment for the full repayment period. This site uses cookies and analytics. By using this site, you agree to our{" "}
            <a href="/privacy" style={{ color: "#888" }}>Privacy Policy</a> and{" "}
            <a href="/terms" style={{ color: "#888" }}>Terms of Service</a>.
            <div className="roi-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="https://moneywisecalculator.com">MoneyWise Calculator</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}