// ── CONFIG ── Replace with your Apps Script Web App URL after setup
const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbybesZrKSHmOkXVQ_yAurVs4AA5FAegNwB7z7Mxat-kPRJ88ZhIoJ9bZDQpGdNFa65b/exec';

// ── SUBMIT TO GOOGLE SHEET ──
async function submitEmail(email, source) {
    try {
        await fetch(SHEET_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors', // required for Apps Script CORS
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, source, timestamp: new Date().toISOString() })
        });
    } catch (e) {
        console.log('Submission sent');
    }
}

// ── PARTICLES ──
const canvas = document.getElementById('particle-canvas'), ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas(); window.addEventListener('resize', resizeCanvas);
for (let i = 0; i < 90; i++) { particles.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, size: Math.random() * 1.5 + 0.3, alpha: Math.random() * 0.4 + 0.1, color: Math.random() > 0.6 ? '#e8a020' : Math.random() > 0.5 ? '#ff8c00' : '#f5c842' }); }
function animateParticles() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0; if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill(); }); ctx.globalAlpha = 1; requestAnimationFrame(animateParticles); }
animateParticles();

// ── XP BAR ──
setTimeout(() => { document.getElementById('hero-xp').style.width = '72%'; let i = 0; const iv = setInterval(() => { i = Math.min(i + 2, 72); document.getElementById('xp-pct').textContent = i + '%'; if (i >= 72) clearInterval(iv); }, 20); }, 600);

// ── SCENARIO EXPLORER ──
function switchScenario(id, btn) {
    document.querySelectorAll('.scenario-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.choice-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('sc-' + id).classList.add('active');
    btn.classList.add('active');
    setTimeout(() => { const sc = document.getElementById('sc-' + id); const fill = sc.querySelector('.conf-fill'); const w = fill.style.width; fill.style.width = '0%'; setTimeout(() => { fill.style.width = w; }, 50); }, 50);
}

// ── MOUSE GLOW ON FEATURE CARDS ──
document.querySelectorAll('.feature-card').forEach(card => { card.addEventListener('mousemove', e => { const r = card.getBoundingClientRect(); card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%'); card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%'); }); });

// ── DECISION OVERLAY ──
const decisions = {
    switch: { id: 'SCENARIO_CAREER_001', q: 'CAREER_DECISION', title: 'SWITCH VS. DEEPEN', desc: 'One of the most common career crossroads: bet on breadth and reinvention, or compound on what you already know? Both lead to exceptional outcomes — the difference is timing and self-knowledge.', aTitle: 'Switch Careers', aItems: ['Higher income ceiling in new field', 'Steep learning curve, 8–18 month transition', 'Energizing, but identity disruption is real', 'Best in years 3–8 of career'], bTitle: 'Deepen Expertise', bItems: ['Compound knowledge advantage', 'Faster promotion and recognition', 'Lower risk, lower variance', 'Optimal if already in a high-growth field'] },
    solo: { id: 'SCENARIO_BUSINESS_001', q: 'BUSINESS_DECISION', title: 'SOLO VS. EMPLOYED', desc: 'Employment gives you runway and certainty. Going solo gives you upside and control. The question is whether you have enough validation and financial cushion to make the leap safely.', aTitle: 'Stay Employed', aItems: ['Predictable income and benefits', "Limited ceiling, someone else's vision", 'Use time to validate your idea first', 'Build savings as your launchpad'], bTitle: 'Go Solo', bItems: ['Asymmetric upside potential', 'Need 6–12 month emergency fund', 'Must have early market validation', 'Best done gradually, not cold-turkey'] },
    relocate: { id: 'SCENARIO_LIFESTYLE_001', q: 'LIFESTYLE_DECISION', title: 'STAY VS. RELOCATE', desc: 'Relocation is one of the highest-leverage decisions you can make. A new market can double your income — but comes with hidden costs, social reset, and a 12–24 month adjustment curve.', aTitle: 'Stay Put', aItems: ['Network and support system intact', 'Known cost base and lifestyle', 'Slower income ceiling in some markets', 'Lower disruption risk'], bTitle: 'Relocate', bItems: ['Often 1.5–3x income in new market', 'First-year expenses spike sharply', 'Career ceiling frequently much higher', 'Network rebuild required from scratch'] },
    money: { id: 'SCENARIO_FINANCIAL_001', q: 'FINANCIAL_DECISION', title: 'SPEND NOW VS. INVEST', desc: "Every unit of currency saved early is worth significantly more at 45, due to compounding. But quality of life matters too. The question is whether you're spending on experiences — or just consuming without intention.", aTitle: 'Optimize for Now', aItems: ['Higher quality of life today', 'Experiences compound too (network, confidence)', 'Risk: lifestyle inflation locks you in', 'Best for high-earners with real headroom'], bTitle: 'Invest Aggressively', bItems: ['Compounding advantage is front-loaded', 'Financial optionality unlocks faster', 'Sacrifice now for freedom later', 'Best in first 5–8 working years'] },
    side: { id: 'SCENARIO_GROWTH_001', q: 'GROWTH_DECISION', title: 'SIDE INCOME VS. FULL FOCUS', desc: 'Building a side income can be transformative — but split attention is a real risk. The most successful approach is a time-boxed experiment: 6–12 months of consistent effort before deciding to scale or stop.', aTitle: 'Build Side Income', aItems: ['Income diversification and security', 'Learning a new skill or market', 'Risk: distraction from main job', 'Works best with clear time boundaries'], bTitle: 'Focus 100% on Core', bItems: ['Faster advancement in primary career', 'Deep focus compounds quickly', 'All eggs in one basket risk', 'Optimal if in a rapid-growth phase'] },
    grind: { id: 'SCENARIO_FREEDOM_001', q: 'FREEDOM_DECISION', title: 'GRIND HARD VS. PACE YOURSELF', desc: 'The "10-year sprint" promises financial freedom in exchange for sacrifice. It works — but burnout is real, relationships suffer, and the goalpost often moves. Sustainable pace trades some speed for quality of life.', aTitle: 'Intensive Grind', aItems: ['Faster wealth accumulation', 'Higher risk of burnout and health impact', 'Works if you have a clear exit condition', 'Requires brutally honest self-awareness'], bTitle: 'Sustainable Pace', bItems: ['Health and relationships protected', 'Slower but consistent asset accumulation', 'More resilient over a 10+ year timeline', 'Compounding still works — just steadier'] }
};

function openDecision(key) {
    const d = decisions[key];
    document.getElementById('ov-id').textContent = '// ' + d.id;
    document.getElementById('ov-q').textContent = d.q;
    document.getElementById('ov-title').textContent = d.title;
    document.getElementById('ov-desc').textContent = d.desc;
    document.getElementById('ov-a-title').textContent = d.aTitle;
    document.getElementById('ov-b-title').textContent = d.bTitle;
    document.getElementById('ov-a-list').innerHTML = d.aItems.map(i => `<li>${i}</li>`).join('');
    document.getElementById('ov-b-list').innerHTML = d.bItems.map(i => `<li>${i}</li>`).join('');
    document.getElementById('decisionOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeDecision() { document.getElementById('decisionOverlay').classList.remove('active'); document.body.style.overflow = ''; }
document.getElementById('decisionOverlay').addEventListener('click', function (e) { if (e.target === this) closeDecision(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDecision(); });

// ── HERO FORM ──
async function heroSubmit() {
    const email = document.getElementById('heroEmail').value.trim();
    if (!email || !email.includes('@')) {
        document.getElementById('heroEmail').style.borderColor = '#ff4444';
        setTimeout(() => document.getElementById('heroEmail').style.borderColor = '', 1500);
        return;
    }
    document.getElementById('heroFormWrap').style.display = 'none';
    document.getElementById('heroSuccess').style.display = 'block';
    const n = parseInt(document.getElementById('count-num').textContent.replace(',', ''));
    document.getElementById('count-num').textContent = (n + 1).toLocaleString();
    await submitEmail(email, 'hero_cta');
}
document.getElementById('heroEmail').addEventListener('keydown', e => { if (e.key === 'Enter') heroSubmit(); });

// ── WAITLIST ──
async function waitlistSubmit() {
    const email = document.getElementById('wEmail').value.trim();
    if (!email || !email.includes('@')) {
        document.getElementById('wEmail').style.borderColor = '#ff4444';
        setTimeout(() => document.getElementById('wEmail').style.borderColor = '', 1500);
        return;
    }
    document.getElementById('waitlistContent').style.display = 'none';
    document.getElementById('waitlistSuccess').style.display = 'block';
    await submitEmail(email, 'waitlist_section');
}
document.getElementById('wEmail').addEventListener('keydown', e => { if (e.key === 'Enter') waitlistSubmit(); });

// ── COUNTDOWN ──
function updateCountdown() {
    const target = new Date(); target.setDate(target.getDate() + 21); target.setHours(0, 0, 0, 0);
    const diff = target - new Date(); if (diff <= 0) return;
    document.getElementById('cd-days').textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
}
updateCountdown(); setInterval(updateCountdown, 1000);

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => { entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); observer.unobserve(e.target); } }); }, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));