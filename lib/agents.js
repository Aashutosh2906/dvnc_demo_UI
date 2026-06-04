const MASTER_SYSTEM_PROMPT = `CRITICAL FORMATTING RULE: Your entire response must be a single raw JSON object. Do NOT wrap it in markdown code fences (\`\`\`json or \`\`\`). Do NOT write any text before or after the JSON. Start your response with { and end it with }.

You are DVNC.AI — a discovery intelligence built on Leonardo da Vinci's cognitive architecture as described by Ahmed and Poulter. You think through every significant question using ten simultaneous cognitive lenses drawn directly from Leonardo's documented practice, then synthesise them into a single novel, actionable answer.

THE TEN COGNITIVE LENSES — all active simultaneously on every query:

1. THE GEOMETER: Geometry and the Mathematical Structure of Reality.
Leonardo held that geometrical proportion and mathematical structure are not descriptions of reality but ARE reality itself. Look for the underlying structural/mathematical pattern that IS the problem — the ratio, symmetry, or constraint that defines the solution space. Do not apply math as a tool; find the math that IS the phenomenon. (Contemporary exemplar: TongGeometry — treating molecules as geometric objects in 3D space, not symbolic graphs.)

2. THE ANALOGIST: The Unity of Human and Natural Systems.
Leonardo refused to separate human, biological, and engineered systems. He recognised that branching in bronchial passages, trees, and river deltas reflects the same universal optimisation principle — not analogy but structural identity. Find the deep structural isomorphism: where does the governing rule of this problem already exist in another domain or scale? (Contemporary exemplar: Shinkansen 500 nose redesigned on kingfisher bill — tunnel shock = air-water transition, structurally identical.)

3. THE STEWARD: The Earth as Living Body.
The Earth is not backdrop or resource but a living, self-regulating body with finite tolerance thresholds. Consider: what systemic or planetary boundaries does this question touch? What happens when this scales? What cannot be forced against its nature without ultimate failure? (Contemporary exemplar: Planetary Boundaries framework — Rockström et al., 2009.)

4. THE PROBABILIST: Chaos, Predictability, and Natural Systems.
Unpredictability is a property of certain phenomena, not a failure of understanding. Resist single-point answers where probability distributions are more honest. Identify: is this system deterministic, probabilistic, or chaotic? Apply appropriate epistemic humility. (Contemporary exemplar: ECMWF ensemble forecasting — no single deterministic forecast is honest for chaotic systems.)

5. THE DIALECTICIAN: The Dialectic of Theory and Experience.
Deep understanding requires sustained alternation of theoretical abstraction and experiential verification — neither privileged over the other. Identify where in the theory-experience dialectic this question sits. What evidence exists that theory cannot yet receive? What theory is needed to make existing anomalies legible? (Contemporary exemplar: Semmelweis — evidence generating decisive knowledge that theoretical frameworks were not equipped to receive.)

6. THE INTUITIONIST: Structural Intuitions: Art and Science.
The deepest acts of understanding originate in structural intuition — recognising that something significant is occurring before articulating why. Aesthetic and analytical perception are one act, not two. What does the shape or form of this problem reveal before calculation confirms it? What feels structurally right before proof? (Contemporary exemplar: Calatrava's Alamillo Bridge — structural intuition preceded and generated the formal solution.)

7. THE RESPECTER: Scale, Power, and Respect for Natural Force.
Forces manageable at human scale become destructive when amplified. The planet's tolerance does not grow proportionally with ambition. Assess consequences not just at the intervention scale but at all larger scales. Distinguish: what is being redirected vs. truly resolved? (Contemporary exemplar: Three Gorges Dam — 100 TWh generated; also mass sedimentation, geological instability, 1.3M displaced. The force was redirected, not resolved.)

8. THE COLLABORATOR: Working with Nature Rather Than Against It.
When water (or any natural system) is coerced, it ultimately defeats human intention. When properly understood, it enables vision. Nothing comes from nothing — thermodynamic limits are not negotiable. Find the path that works WITH the natural logic of the system. (Contemporary exemplar: Dutch Room for the River — not higher dykes but lower floodplains; accommodation, not resistance.)

9. THE PERCEPTUALIST: Vision, Perception, and the Limits of Knowledge.
The eye does not passively receive the world but actively constructs it — with biases and blind spots. The visual system generates predictions and updates only on discrepancies. What prior model is the observer bringing that may be distorting what they can see? What anomaly has been dismissed as error? What cannot be detected because no framework yet names it? (Contemporary exemplar: Predictive coding framework — Rao & Ballard, 1999; Friston, 2010.)

10. THE QUESTIONER: The Unknown Unknowns.
Beyond unknown knowns lie phenomena whose existence cannot yet be formulated as questions. The most consequential instruments consistently disclose unknown unknowns — not because designed to, but because genuine encounters with the natural world produce results for which existing frameworks have no name. What question lies beneath the asked question? What configuration of reality has not been looked for because no one has formulated it? (Contemporary exemplar: JWST deep field — massive mature galaxies 600M years after Big Bang; not an unanswered question but a question no framework had yet enabled anyone to ask.)

INTEGRATION NOTE: These ten lenses are not a menu or a sequence. They are simultaneous cognitive filters. Breakthroughs of the deepest order arise when most or all models are active together. Your response must synthesise all ten into one novel, surprising answer — not a committee report listing ten opinions.

RESPONSE FORMAT — raw JSON object only, starting with { and ending with }:

{
  "type": "deep",
  Continuing the `index.html` from where it cut off — starting from the textPath line:

```html
        <textPath href="#tarc" startOffset="9%">Leonardo's Intelligence. Reimagined for the 21st Century.</textPath>
      </text>
    </svg>
  </div>
  <div class="chat-area" id="chatArea">
    <div class="landing" id="landingScreen">
      <div style="display:flex;flex-direction:column;align-items:center;gap:9px">
        <div class="landing-title">DVNC.AI</div>
        <div class="landing-tag">Leonardo's Intelligence. Reimagined for the 21st Century.</div>
      </div>
      <div class="pill-row">
        <button class="ex-pill" onclick="fillQ('How could self-assembling conductive biomaterials improve cardiac tissue regeneration?')">Cardiac tissue regeneration</button>
        <button class="ex-pill" onclick="fillQ('What are potential synthetic lethal targets in KRAS G12D lung cancer?')">KRAS G12D synthetic lethality</button>
        <button class="ex-pill" onclick="fillQ('Design a validation experiment for piezoelectric scaffold cardiac repair')">Piezoelectric scaffold validation</button>
        <button class="ex-pill" onclick="fillQ('How can peptide self-assembly guide immune modulation in myocardial infarct?')">Peptide mesh immune modulation</button>
      </div>
    </div>
    <div class="thread" id="thread" style="display:none;flex-direction:column"></div>
  </div>
  <div class="bar-wrap">
    <div class="bar">
      <textarea class="bar-input" id="chatInput" placeholder="Ask DVNC.AI anything…" rows="1"
        onkeydown="handleKey(event)" oninput="autoResize(this)"></textarea>
      <button class="icon-btn new-chat" id="newChatBtn" style="display:none" onclick="newConversation()" title="New conversation">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
      </button>
      <button class="icon-btn" title="Upload PDF">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </button>
      <div style="position:relative">
        <button class="mpill-btn" id="mpBtn" onclick="toggleMDrop()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:11px;height:11px"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          <span id="mpLabel">DVNC Sovereign</span>
          <svg class="mchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="mdrop" id="mDrop">
          <div class="moption active" onclick="selModel('DVNC Sovereign')">
            <div class="m-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
            <div class="mmeta"><h5>DVNC Sovereign</h5><span class="mtag">Flagship</span><small>Maximum depth orchestration for frontier discovery</small></div>
            <svg class="mchk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="15" height="15"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="moption" onclick="selModel('DVNC Atlas')">
            <div class="m-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg></div>
            <div class="mmeta"><h5>DVNC Atlas</h5><span class="mtag">Research</span><small>Balanced reasoning, graph traversal, and synthesis</small></div>
            <svg class="mchk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="15" height="15"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="moption" onclick="selModel('DVNC Curie')">
            <div class="m-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg></div>
            <div class="mmeta"><h5>DVNC Curie</h5><span class="mtag">Lab</span><small>Experimental hypothesis generation for anomalous signals</small></div>
            <svg class="mchk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="15" height="15"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        </div>
      </div>
      <button class="send-btn" id="sendBtn" onclick="submitQ()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
        </svg>
      </button>
    </div>
  </div>
</div>

<!-- TAB 2 — UNCHANGED -->
<div id="tab-g" class="tab-panel">
  <div class="gs">
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="gp">
        <h3>Research Discovery</h3>
        <label class="glbl">Research topic / title / DOI / link</label>
        <textarea class="ginput" placeholder="e.g. self-assembling conductive biomaterials for cardiac repair" rows="3"></textarea>
        <label class="glbl">Search mode</label>
        <select class="gselect"><option>topic</option><option>title</option><option>doi</option><option>link</option><option>paper_name</option><option>autonomous_web</option></select>
        <label class="glbl">Sources</label>
        <div class="gchks">
          <label class="cchk on"><input type="checkbox" checked>arxiv</label>
          <label class="cchk on"><input type="checkbox" checked>openalex</label>
          <label class="cchk on"><input type="checkbox" checked>crossref</label>
          <label class="cchk on"><input type="checkbox" checked>semantic_scholar</label>
          <label class="cchk on"><input type="checkbox" checked>europe_pmc</label>
        </div>
        <label class="glbl">Upload PDF</label>
        <div class="dropzone"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><span>Drop PDF here or click to browse</span></div>
        <div class="gbtn-row"><button class="gbtn pri">Discover Papers</button><button class="gbtn sec">Load Example</button></div>
        <div style="margin-top:13px;padding:11px 13px;background:rgba(248,247,244,.8);border-radius:11px;border:1px solid var(--line)"><span style="font-size:.77rem;color:var(--muted);font-family:var(--font-m)">No discovery results yet.</span></div>
      </div>
      <div class="gp">
        <h3>Ingest &amp; Parse</h3>
        <label class="glbl">Select papers to ingest</label>
        <div style="border:1px solid var(--line);border-radius:11px;padding:11px;background:rgba(248,247,244,.5);font-size:.81rem;color:var(--muted)">Run discovery first to populate candidates.</div>
        <label class="glbl" style="margin-top:13px">Parser routing order</label>
        <div class="gchks">
          <label class="cchk on"><input type="checkbox" checked>grobid</label>
          <label class="cchk on"><input type="checkbox" checked>docling</label>
          <label class="cchk on"><input type="checkbox" checked>pymupdf</label>
        </div>
        <div class="gbtn-row"><button class="gbtn sec">Parse PDF</button><button class="gbtn pri">Ingest into Graph</button></div>
      </div>
    </div>
    <div class="gmain">
      <div class="gviz">
        <div class="gviz-hdr">
          <div>
            <p style="font-family:var(--font-m);font-size:.67rem;letter-spacing:.17em;text-transform:uppercase;color:var(--gold);margin-bottom:4px">Learning Graph</p>
            <h3>Self-Learning Knowledge Graph</h3>
          </div>
          <div class="gleg">
            <span><i class="ldot" style="background:#ffd8b3;border:1px solid #de9e58"></i>query</span>
            <span><i class="ldot" style="background:#d7f6f2;border:1px solid #4fb3a5"></i>paper</span>
            <span><i class="ldot" style="background:#e7defe;border:1px solid #8f73d9"></i>uploaded PDF</span>
          </div>
        </div>
        <div class="gstage"><div class="gempty"><h4>No papers mapped yet</h4><p>Search by topic, title, DOI, or link, then select papers before graph ingestion.</p></div></div>
      </div>
      <div class="gp">
        <h3 style="margin-bottom:11px">Journal Quick Search</h3>
        <div class="jgrid">
          <a class="jcard" href="https://www.nature.com/search?q=biomaterials" target="_blank"><div><h4>Nature</h4><p>Flagship multidisciplinary research journal.</p></div><span class="jopen">Open →</span></a>
          <a class="jcard" href="https://www.science.org/search?q=biomaterials" target="_blank"><div><h4>Science</h4><p>High-impact science journal and family.</p></div><span class="jopen">Open →</span></a>
          <a class="jcard" href="https://www.cell.com/search?q=biomaterials" target="_blank"><div><h4>Cell</h4><p>Life sciences and translational biology.</p></div><span class="jopen">Open →</span></a>
          <a class="jcard" href="https://www.thelancet.com/search?q=biomaterials" target="_blank"><div><h4>The Lancet</h4><p>Clinical and medical research.</p></div><span class="jopen">Open →</span></a>
          <a class="jcard" href="https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=biomaterials" target="_blank"><div><h4>IEEE Xplore</h4><p>Engineering, AI, signal processing, and systems.</p></div><span class="jopen">Open →</span></a>
        </div>
      </div>
      <div class="gp"><h3>PDF Parse Status</h3><p style="font-size:.85rem;color:var(--muted)">Awaiting upload.</p></div>
    </div>
  </div>
</div>

</div>
<script>
let curModel = 'DVNC Sovereign';
let busy = false;
let history = [];

const LENS_TRACE = [
  { num:'01', name:'The Geometer' },
  { num:'02', name:'The Naturalist' },
  { num:'03', name:'The Engineer' },
  { num:'04', name:'The Philosopher' },
  { num:'05', name:'The Historian' },
  { num:'06', name:'The Artist' },
  { num:'07', name:'The Mystic' },
  { num:'08', name:'The Economist' },
  { num:'09', name:'The Systems Thinker' },
  { num:'10', name:'The Futurist' },
];

const LENS_INFO = {
  1: 'Finds the mathematical and structural skeleton beneath surface phenomena — symmetry, topology, scaling laws, fractals, and optimization principles.',
  2: 'Grounds insights in biological and ecological reality — evolutionary pressures, emergent behaviors, ecosystem dynamics, and biomimicry opportunities.',
  3: 'Designs solutions through mechanisms, feedback loops, constraints, and failure modes — asking how to build this and where the stress fractures lie.',
  4: 'Interrogates first principles and hidden assumptions — examining ontological categories, ethical implications, and epistemological limits.',
  5: 'Places phenomena in deep time — finding analogous historical moments, tracing genealogies of ideas, and learning from forgotten precedents.',
  6: 'Finds the aesthetic dimension — beauty, tension, negative space, rhythm, and metaphor that reveal what analysis conceals.',
  7: 'Accesses non-linear, contemplative knowing — paradox, liminality, and the ineffable that lies between categories.',
  8: 'Maps flows of value, incentives, and power — who benefits, who bears costs, and what feedback loops drive behavior.',
  9: 'Sees the whole system — feedback loops, emergent properties, tipping points, leverage points, and unintended consequences.',
  10: 'Projects into adjacent possibles and long-range futures — weak signals, technological trajectories, scenario branches, and wild cards.',
};

function switchTab(id, btn) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + id).classList.add('active');
}
function toggleMDrop() {
  document.getElementById('mDrop').classList.toggle('open');
  document.getElementById('mpBtn').classList.toggle('open');
}
function selModel(n) {
  curModel = n;
  document.getElementById('mpLabel').textContent = n;
  document.querySelectorAll('.moption').forEach(o =>
    o.classList.toggle('active', o.querySelector('h5').textContent === n));
  document.getElementById('mDrop').classList.remove('open');
  document.getElementById('mpBtn').classList.remove('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.mpill-btn') && !e.target.closest('.mdrop')) {
    document.getElementById('mDrop').classList.remove('open');
    document.getElementById('mpBtn').classList.remove('open');
  }
});
function autoResize(el) { el.style.height='auto'; el.style.height=Math.min(el.scrollHeight,120)+'px'; }
function handleKey(e) { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); submitQ(); } }
function fillQ(t) { const i=document.getElementById('chatInput'); i.value=t; autoResize(i); i.focus(); }
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function delay(ms) { return new Promise(r=>setTimeout(r,ms)); }
function scrollC() { const a=document.getElementById('chatArea'); if(a) a.scrollTop=a.scrollHeight; }
function ts() { return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}); }
function aiAv() {
  return `<div class="ai-av"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 17L12 4l7 13"/><path d="M8.5 12.5h7"/><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none"/></svg></div>`;
}

function mdToHtml(text) {
  if (!text) return '';
  let s = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  s = s.replace(/\*\*\*(.+?)\*\*\*/g,'<strong><em>$1</em></strong>')
       .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
       .replace(/\*([^*\n]+?)\*/g,'<em>$1</em>');
  return s.split(/\n\n+/).filter(b=>b.trim()).map(block => {
    const lines = block.trim().split('\n');
    const isList = lines.every(l => /^[-*•] /.test(l.trim()) || /^\d+\. /.test(l.trim()));
    if (isList) {
      return `<ul style="padding-left:20px;margin:6px 0">${lines.filter(l=>l.trim()).map(l=>`<li>${l.replace(/^[-*•] /,'').replace(/^\d+\. /,'')}</li>`).join('')}</ul>`;
    }
    return `<p>${lines.join('<br>')}</p>`;
  }).join('');
}

function newConversation() {
  history = [];
  busy = false;
  document.getElementById('sendBtn').disabled = false;
  document.getElementById('thread').innerHTML = '';
  document.getElementById('thread').style.display = 'none';
  document.getElementById('landingScreen').style.display = '';
  document.getElementById('newChatBtn').style.display = 'none';
  const inp = document.getElementById('chatInput');
  inp.value = ''; inp.style.height = 'auto';
}

async function submitQ() {
  if (busy) return;
  const inp = document.getElementById('chatInput');
  const q = inp.value.trim();
  if (!q) return;
  busy = true;
  inp.value = ''; inp.style.height = 'auto';
  document.getElementById('sendBtn').disabled = true;
  document.getElementById('landingScreen').style.display = 'none';
  const thr = document.getElementById('thread');
  thr.style.display = 'flex';

  const ud = document.createElement('div');
  ud.className = 'msg msg-user';
  ud.innerHTML = `<div class="bub">${esc(q)}</div><span class="msg-ts">${ts()}</span>`;
  thr.appendChild(ud); scrollC();

  const tkEl = document.createElement('div');
  tkEl.className = 'msg msg-ai'; tkEl.id = 'tkEl';
  tkEl.innerHTML = `<div class="ai-row">${aiAv()}<div class="ai-body">
    <div class="ai-name">DVNC ${esc(curModel.split(' ')[1]||'Sovereign')}</div>
    <div class="thinking"><div class="tdots"><span></span><span></span><span></span></div><span>Thinking…</span></div>
  </div></div>`;
  thr.appendChild(tkEl); scrollC();

  let apiData;
  try {
    const resp = await fetch('/api/chat', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ query: q, history })
    });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    apiData = await resp.json();
  } catch (err) {
    apiData = { type:'simple', text:'Network error — please check your connection and try again.' };
  }

  const assistantText = apiData.type==='deep'
    ? ((apiData.data||apiData).synthesis || '')
    : (apiData.text || apiData.message || '');
  history.push({ role:'user', content:q });
  history.push({ role:'assistant', content:assistantText });

  if (apiData.type === 'simple') {
    renderSimple(apiData.text || apiData.message || 'Something went wrong.');
  } else {
    await runLensTrace(apiData.data || apiData);
  }
}

function renderSimple(text) {
  const thr = document.getElementById('thread');
  const tkEl = document.getElementById('tkEl');
  const msg = document.createElement('div');
  msg.className = 'msg msg-ai';
  msg.innerHTML = `<div class="ai-row">${aiAv()}<div class="ai-body">
    <div class="ai-name">${esc(curModel)}</div>
    <div class="simple-bub">${mdToHtml(text)}</div>
    <span class="msg-ts" style="margin-top:4px">${ts()}</span>
  </div></div>`;
  if (tkEl) tkEl.replaceWith(msg); else thr.appendChild(msg);
  document.getElementById('newChatBtn').style.display = 'grid';
  busy = false;
  document.getElementById('sendBtn').disabled = false;
  scrollC();
}

async function runLensTrace(apiData) {
  const thr = document.getElementById('thread');
  const tkEl = document.getElementById('tkEl');

  const chips = LENS_TRACE.map((l,i) =>
    `<div class="lchip pend" id="chip${i}"><span class="cn">${l.num}</span><span>${l.name.replace('The ','')}</span></div>`
  ).join('');

  const traceEl = document.createElement('div');
  traceEl.className = 'msg msg-ai'; traceEl.id = 'actEl';
  traceEl.innerHTML = `<div class="ai-row" style="width:100%">${aiAv()}
    <div class="ai-body" style="flex:1">
      <div class="ai-name">DVNC ${esc(curModel.split(' ')[1]||'Sovereign')} — Running 10 Cognitive Lenses</div>
      <div class="lchips-wrap">
        <div class="lchips-row">${chips}</div>
        <div class="chip-status">
          <div class="tdots"><span></span><span></span><span></span></div>
          <span id="actTxt">Initializing lenses…</span>
        </div>
      </div>
    </div></div>`;

  if (tkEl) tkEl.replaceWith(traceEl); else thr.appendChild(traceEl);
  scrollC();

  const lenses = apiData.lenses || [];
  for (let i = 0; i < LENS_TRACE.length; i++) {
    await delay(180 + i * 155);
    if (i > 0) {
      const prev = document.getElementById('chip'+(i-1));
      if (prev) { prev.classList.remove('active'); prev.classList.add('done'); }
    }
    const chip = document.getElementById('chip'+i);
    if (chip) { chip.classList.remove('pend'); chip.classList.add('active'); }
    const tx = document.getElementById('actTxt');
    if (tx) {
      const contrib = lenses[i] && lenses[i].contribution;
      tx.textContent = contrib
        ? (contrib.split(/[.!?]/)[0].trim().substring(0,72) + '…')
        : (LENS_TRACE[i].name + ' analyzing…');
    }
    scrollC();
  }
  const last = document.getElementById('chip'+(LENS_TRACE.length-1));
  if (last) { last.classList.remove('active'); last.classList.add('done'); }
  await delay(300);
  renderDeep(apiData);
}

function renderDeep(data) {
  const thr = document.getElementById('thread');
  const actEl = document.getElementById('actEl');

  const graphSVG = buildDynamicGraph(data.graph&&data.graph.nodes ? data.graph.nodes : [],
                                      data.graph&&data.graph.edges ? data.graph.edges : []);
  const lensGrid  = buildLensGrid(data.lenses || []);
  const synthHTML = mdToHtml(data.synthesis || '');
  const metHTML   = buildMetrics(data.metrics || {});
  const expHTML   = buildExpOutline(data.experimental_outline || []);

  const msg = document.createElement('div');
  msg.className = 'msg msg-ai';
  msg.innerHTML = `<div class="ai-row" style="width:100%">${aiAv()}
    <div class="ai-body" style="flex:1">
      <div class="ai-name">${esc(curModel)} · <span style="color:var(--teal)">Discovery Complete</span></div>

      <div class="sec-card">
        <span class="eyebrow">Interdisciplinary Knowledge Graph</span>
        <div style="font-family:var(--font-d);font-size:1.05rem;font-weight:600;color:var(--navy);margin-bottom:4px">Discovery Connectome</div>
        <div class="c-box">${graphSVG}</div>
        <div class="c-legend">
          <span><i class="ldot" style="background:#ff7a1a;border:1px solid #c85000"></i>Hypothesis</span>
          <span><i class="ldot" style="background:#17b8a6;border:1px solid #0d9489"></i>Domain</span>
          <span><i class="ldot" style="background:#cce4ff;border:1px solid #4a7fcc"></i>Concept</span>
          <span><i class="ldot" style="background:#e9d9ff;border:1px solid #7a57cc"></i>Analogy</span>
        </div>
      </div>

      <div class="sec-card" style="margin-top:10px">
        <div class="contrib-hdr">
          <span class="eyebrow" style="margin:0">10 Cognitive Lens Contributions</span>
          <span class="contrib-hint">Click ⓘ to see what each lens does in principle</span>
        </div>
        <div class="lc-grid">${lensGrid}</div>
      </div>

      <div class="innov-card">
        <div class="innov-hdr">
          <div class="innov-hdr-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <div>
            <div class="innov-title">Leonardian Synthesis</div>
            <div class="innov-sub">Cross-disciplinary discovery informed by all 10 cognitive lenses</div>
          </div>
        </div>
        <div class="innov-body"><div class="synth-text">${synthHTML}</div></div>
        ${metHTML ? `<div class="innov-metrics">${metHTML}</div>` : ''}
        ${expHTML ? `<div class="innov-exp"><span class="eyebrow">Experimental Outline</span><div class="exp-steps">${expHTML}</div></div>` : ''}
      </div>

      <span class="msg-ts" style="margin-top:6px">${ts()}</span>
    </div></div>`;

  if (actEl) actEl.replaceWith(msg); else thr.appendChild(msg);
  document.getElementById('newChatBtn').style.display = 'grid';
  busy = false;
  document.getElementById('sendBtn').disabled = false;
  scrollC();
}

function buildLensGrid(lenses) {
  if (!lenses.length) return '<p style="font-size:.83rem;color:var(--muted);grid-column:1/-1;padding:8px 0">Lens data unavailable.</p>';
  return lenses.map(l => {
    const info = LENS_INFO[l.id] || '';
    return `<div class="lc-card" id="lccard${l.id}">
      <div class="lc-head">
        <div class="lc-num">${String(l.id||'').padStart(2,'0')}</div>
        <span class="lc-name">${esc(l.name||'')}</span>
        ${info ? `<button class="lc-ibtn" onclick="toggleLcAbout(${l.id})">ⓘ</button>` : ''}
      </div>
      ${info ? `<div class="lc-about" id="lcabout${l.id}">${esc(info)}</div>` : ''}
      <div class="lc-contrib">${esc(l.contribution||'')}</div>
    </div>`;
  }).join('');
}

function toggleLcAbout(id) {
  const c = document.getElementById('lccard'+id);
  if (c) c.classList.toggle('aopen');
}

function buildMetrics(m) {
  return [
    { val: m.interdisciplinary_score || m.cross_domain_distance, lbl: 'Interdisciplinary' },
    { val: m.novelty_index           || m.novelty,               lbl: 'Novelty' },
    { val: m.synthesis_depth         || m.mechanistic_clarity,   lbl: 'Depth' },
    { val: m.practical_applicability || m.tractability,          lbl: 'Applicability' },
  ].map(i => `<div class="mpill">
    <span class="mval">${i.val != null ? esc(String(i.val)) : '—'}</span>
    <span class="mlbl">${esc(i.lbl)}</span>
  </div>`).join('');
}

function buildExpOutline(steps) {
  if (!steps || steps.length === 0) return '';
  if (typeof steps === 'string') return `<div class="exp-step"><div class="exp-copy"><p>${esc(steps)}</p></div></div>`;
  return steps.map(s => `<div class="exp-step">
    <div class="exp-num">${esc(String(s.step||''))}</div>
    <div class="exp-copy"><h5>${esc(s.title||'')}</h5><p>${esc(s.detail||'')}</p></div>
  </div>`).join('');
}

function buildDynamicGraph(rawNodes, rawEdges) {
  if (!rawNodes || rawNodes.length === 0) {
    return `<svg viewBox="0 0 760 100" style="width:100%;height:70px"><text x="380" y="55" text-anchor="middle" font-family="Instrument Sans,sans-serif" font-size="12" fill="#5a5f7a">Graph data unavailable.</text></svg>`;
  }

  // Deduplicate nodes by label
  const seenL = new Set();
  const nodes = rawNodes.filter(n => {
    const k = (n.label||'').toLowerCase().trim();
    if (seenL.has(k)) return false;
    seenL.add(k); return true;
  });
  const validIds = new Set(nodes.map(n => n.id));
  const edges = (rawEdges||[]).filter(e => validIds.has(e.from) && validIds.has(e.to) && e.from !== e.to);

  const W = 840, H = 360, N = nodes.length;
  const hypI = nodes.findIndex(n => n.type === 'hypothesis');

  // Initialize positions: hypothesis at center, others in circle
  const pos = nodes.map((n, i) => {
    if (n.type === 'hypothesis') return { x: W/2, y: H/2 };
    const angle = (2*Math.PI * i / N) - Math.PI/2;
    const r = Math.min(W,H) * 0.31;
    return { x: W/2 + r*Math.cos(angle), y: H/2 + r*Math.sin(angle) };
  });

  const idxMap = {};
  nodes.forEach((n,i) => idxMap[n.id] = i);

  // Fruchterman-Reingold layout
  const k = Math.sqrt(W * H / N) * 0.82;
  for (let it = 0; it < 160; it++) {
    const cool = Math.max(0.05, 1 - it/160);
    const disp = nodes.map(() => ({ x:0, y:0 }));

    for (let i = 0; i < N; i++) {
      for (let j = i+1; j < N; j++) {
        const dx = (pos[i].x - pos[j].x) || 0.1;
        const dy = (pos[i].y - pos[j].y) || 0.1;
        const d = Math.sqrt(dx*dx+dy*dy) || 0.1;
        const f = k*k / d;
        disp[i].x += dx/d*f; disp[i].y += dy/d*f;
        disp[j].x -= dx/d*f; disp[j].y -= dy/d*f;
      }
    }

    edges.forEach(e => {
      const a = idxMap[e.from], b = idxMap[e.to];
      if (a==null||b==null) return;
      const dx = (pos[b].x-pos[a].x)||0.1;
      const dy = (pos[b].y-pos[a].y)||0.1;
      const d = Math.sqrt(dx*dx+dy*dy)||0.1;
      const f = d*d/k * 0.45;
      disp[a].x += dx/d*f; disp[a].y += dy/d*f;
      disp[b].x -= dx/d*f; disp[b].y -= dy/d*f;
    });

    const maxD = 28*cool;
    for (let i = 0; i < N; i++) {
      if (i===hypI && it>15) continue;
      const d = Math.sqrt(disp[i].x*disp[i].x+disp[i].y*disp[i].y)||1;
      const sc = Math.min(maxD,d)/d;
      pos[i].x = Math.max(60, Math.min(W-60, pos[i].x + disp[i].x*sc));
      pos[i].y = Math.max(34, Math.min(H-34, pos[i].y + disp[i].y*sc));
    }
    if (it < 80) {
      for (let i = 0; i < N; i++) {
        if (i===hypI) continue;
        pos[i].x += (W/2-pos[i].x)*0.007;
        pos[i].y += (H/2-pos[i].y)*0.007;
      }
    }
  }

  const ts_ = {
    hypothesis: { fill:'#ff7a1a', stroke:'#c85000', r:21, tf:'#0f1230' },
    domain:     { fill:'#17b8a6', stroke:'#0d9489', r:15, tf:'#083830' },
    concept:    { fill:'#cce4ff', stroke:'#4a7fcc', r:12, tf:'#1a3060' },
    analogy:    { fill:'#e9d9ff', stroke:'#7a57cc', r:12, tf:'#2e1466' },
  };

  const pmap = {};
  nodes.forEach((n,i) => pmap[n.id] = { ...n, px:pos[i].x, py:pos[i].y });

  let svg = '';

  edges.forEach(e => {
    const a=pmap[e.from], b=pmap[e.to];
    if (!a||!b) return;
    svg += `<line x1="${a.px.toFixed(1)}" y1="${a.py.toFixed(1)}" x2="${b.px.toFixed(1)}" y2="${b.py.toFixed(1)}" stroke="rgba(26,31,78,.13)" stroke-width="1.4"/>`;
  });

  Object.values(pmap).forEach(n => {
    const st = ts_[n.type] || ts_.concept;
    const isH = n.type==='hypothesis';
    if (isH) {
      svg += `<circle cx="${n.px.toFixed(1)}" cy="${n.py.toFixed(1)}" r="${st.r+15}" fill="none" stroke="rgba(255,122,26,.08)" stroke-width="11"/>`;
      svg += `<circle cx="${n.px.toFixed(1)}" cy="${n.py.toFixed(1)}" r="${st.r+7}" fill="none" stroke="rgba(255,122,26,.06)" stroke-width="6"/>`;
    }
    svg += `<circle cx="${n.px.toFixed(1)}" cy="${n.py.toFixed(1)}" r="${st.r}" fill="${st.fill}" stroke="${st.stroke}" stroke-width="1.8"/>`;

    const lbl = (n.label||'').length>20 ? (n.label||'').slice(0,18)+'…' : (n.label||'');
    const fw = isH ? '700' : '500';
    const fs = isH ? 11 : 10;
    const estW = Math.max(lbl.length*(isH?6.1:5.3)+12, 36);
    const yB = n.py + st.r + 5;
    const yA = n.py - st.r - 18;
    const ly = (yB+16 > H-4) ? yA : yB;

    svg += `<rect x="${(n.px-estW/2).toFixed(1)}" y="${(ly-12).toFixed(1)}" width="${estW.toFixed(1)}" height="15" rx="3" fill="rgba(248,247,244,.94)"/>`;
    svg += `<text x="${n.px.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" fill="${st.tf}" font-size="${fs}" font-weight="${fw}" font-family="Instrument Sans,sans-serif">${esc(lbl)}</text>`;
  });

  return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:260px">${svg}</svg>`;
}

document.querySelectorAll('.cchk').forEach(c => c.addEventListener('click', ()=>c.classList.toggle('on')));
</script>
</body>
</html>
```

---

## `lib/agents.js` — synthesis instruction changes only

Find and replace the `"synthesis"` line in the JSON schema from:
```
"synthesis": "A rich 3-5 paragraph synthesis weaving all lenses together...
```
To:
```
"synthesis": "A rich 5-8 paragraph synthesis weaving all lenses together. Write like a polymath — move fluidly between disciplines, name real researchers and specific mechanisms. The LAST 2 paragraphs must be explicitly actionable: give concrete next steps, specific experiments, testable hypotheses, or research directions a practitioner could pursue immediately. Do NOT summarize what was said — synthesize it into something new.",
```

---

## `api/chat.js` — one line change

Find:
```javascript
        maxTokens: 2500,
```
Change to:
```javascript
        maxTokens: 3500,
```
  "lenses": [
    {
      "id": 1,
      "name": "The Geometer",
      "contribution": "1-3 sentences: what THIS specific lens concretely revealed or contributed to the synthesis. Be specific to the question asked, not generic."
    },
    { "id": 2, "name": "The Analogist", "contribution": "..." },
    { "id": 3, "name": "The Steward", "contribution": "..." },
    { "id": 4, "name": "The Probabilist", "contribution": "..." },
    { "id": 5, "name": "The Dialectician", "contribution": "..." },
    { "id": 6, "name": "The Intuitionist", "contribution": "..." },
    { "id": 7, "name": "The Respecter", "contribution": "..." },
    { "id": 8, "name": "The Collaborator", "contribution": "..." },
    { "id": 9, "name": "The Perceptualist", "contribution": "..." },
    { "id": 10, "name": "The Questioner", "contribution": "..." }
  ],
  "graph": {
    "nodes": [
      {"id": "n1", "label": "Short Label", "type": "hypothesis"},
      {"id": "n2", "label": "Domain Label", "type": "domain"},
      {"id": "n3", "label": "Concept Label", "type": "concept"},
      {"id": "n4", "label": "Analogy Label", "type": "analogy"}
    ],
    "edges": [
      {"from": "n1", "to": "n2", "label": "relationship type"}
    ]
  },
  "experimental_outline": [
    {"step": 1, "title": "Step title", "detail": "1-2 sentence description."}
  ],
    "metrics": {
    "novelty": 80,
    "mechanistic_clarity": 85,
    "tractability": 70,
    "cross_domain_distance": 88
  },
}

GRAPH INSTRUCTIONS:
- Generate 8-12 nodes representing the ACTUAL intellectual terrain traversed to reach the synthesis
- Node types: "hypothesis" (the core novel claim, 1-2 nodes max), "domain" (fields of knowledge activated), "concept" (specific mechanisms or ideas), "analogy" (cross-domain bridges found by The Analogist)
- Nodes MUST span at least 3 different disciplines
- Edges label the relationship type concisely
- Node labels must be short (2-4 words maximum)

METRICS: novelty = how surprising vs consensus (0-100); tractability = how feasible to pursue (0-100); cross_domain_distance = how far apart are the domains bridged (0-100); mechanistic_clarity = how clearly the mechanism is articulated (0-100).

EXPERIMENTAL OUTLINE: Only include if the question calls for it. Empty array [] if not applicable.`;

const CLASSIFIER_PROMPT = `You are a query classifier for DVNC.AI, a scientific and intellectual discovery engine.

Classify the following user message. Respond with ONLY the single word "simple" or "deep".

"simple" = the message is: a greeting, thanks, small talk, a request to clarify or expand on something already said in the conversation, a follow-up like "can you explain that more?", "what do you mean by X?", or any message that does NOT require original multi-disciplinary synthesis.

"deep" = the message is: a substantive question about science, technology, medicine, engineering, philosophy, society, or any domain that would genuinely benefit from interdisciplinary synthesis, novel hypothesis generation, cross-domain analogy, or Leonardo-style divergent thinking.

When in doubt about short questions like "why?" or "how?", check the conversation history — if they're following up on a deep topic, classify as "simple" (it's a clarification). Only classify as "deep" if the message ITSELF contains a substantial new question.

User message: `;

module.exports = { MASTER_SYSTEM_PROMPT, CLASSIFIER_PROMPT };
