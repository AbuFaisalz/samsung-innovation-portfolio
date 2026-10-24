'use strict';
const HORIZONS = [
 {id:'H1',name:'Core',amount:823,description:'Improve today’s business',source:'Board amount'},
 {id:'H2',name:'Adjacent',amount:235,description:'New customers and markets',source:'Board amount'},
 {id:'H3',name:'New',amount:142,description:'New business models',source:'Derived remainder'}
];
const INITIATIVES = [
 {id:'01',title:'SmartThings, without friction',horizon:'H1',budget:320,start:2026,end:2028,theme:'Open-home software',description:'Make cross-brand onboarding, troubleshooting and everyday automation reliable enough for mainstream households. Improve what customers already own before asking them to buy more.',outcome:'Successful mixed-brand setup; fewer support interventions; active households.',gate:'Expand only after usability and compatibility pilots show reliable completion.',market:'Existing SmartThings households',borrow:'LG / Homey: partner APIs, developer support and compatibility testing.'},
 {id:'02',title:'Energy savings you can verify',horizon:'H1',budget:280,start:2026,end:2028,theme:'Measured efficiency',description:'Improve appliance energy orchestration around household routines and tariffs. Pair clear controls with measurement that separates real savings from modelled promises.',outcome:'Verified household savings; repeat use; customer trust.',gate:'Independent measurement confirms savings without sacrificing comfort.',market:'Existing appliance customers',borrow:'Samsung energy partnerships: automated demand response and local integration.'},
 {id:'03',title:'The screen for shared moments',horizon:'H1',budget:223,start:2026,end:2028,theme:'Shared-screen experiences',description:'Focus the TV proposition on sports, films and gaming with effortless phone-to-TV continuity. Make shared viewing better rather than competing for every minute of individual attention.',outcome:'Shared-screen engagement; session continuity; customer retention.',gate:'Household tests demonstrate value beyond ordinary TV replacement.',market:'Existing TV and mobile households',borrow:'Apple: coordinated hardware, software and service journeys.'},
 {id:'04',title:'Home energy, locally connected',horizon:'H2',budget:100,start:2028,end:2031,theme:'Utility partnerships',description:'Pilot utility-connected home energy services in selected Asian markets. Adapt to local tariffs, climates, housing budgets and infrastructure instead of imposing a single global model.',outcome:'Verified pilot savings; utility participation; sustained household activation.',gate:'Local partnerships and measurement justify expansion market by market.',market:'Selected Asian utility markets',borrow:'Samsung energy partnerships: regional pilots before full deployment.'},
 {id:'05',title:'A partner ecosystem that works',horizon:'H2',budget:80,start:2028,end:2030,theme:'Cross-brand expansion',description:'Build partner services, compatibility certification and integration support so third-party appliances and services work consistently through SmartThings.',outcome:'Useful partner integrations; mixed-brand activation; lower integration failure.',gate:'Partners demonstrate sustained service quality and household adoption.',market:'Third-party brands and developers',borrow:'LG / Homey: a developer ecosystem with durable integration maintenance.'},
 {id:'06',title:'Shared experiences, local relevance',horizon:'H2',budget:55,start:2029,end:2031,theme:'Entertainment partnerships',description:'Trial local sports, gaming and entertainment partnerships that connect mobile discovery to shared-screen experiences. Validate demand before scaling content commitments.',outcome:'Partner-led shared sessions; retention; incremental service demand.',gate:'Pilot engagement supports a repeatable commercial model.',market:'Selected Asian entertainment markets',borrow:'Xiaomi and Apple: coherent experiences across device and service boundaries.'},
 {id:'07',title:'Home outcomes as a service',horizon:'H3',budget:60,start:2031,end:2036,theme:'Service-model experiment',description:'Test an optional service proposition around coordinated household outcomes, support and measured energy performance. Keep device choice open and test willingness to pay before expansion.',outcome:'Willingness to pay; retention; transparent service economics.',gate:'Evidence of customer value and sustainable unit economics.',market:'Mixed-brand households',borrow:'Group B new-model proposal; no existing revenue stream is asserted.'},
 {id:'08',title:'An open-home services marketplace',horizon:'H3',budget:45,start:2032,end:2036,theme:'Platform-model experiment',description:'Explore a curated marketplace for compatible home services from energy and maintenance partners. Prototype governance, quality assurance and customer recourse before committing to scale.',outcome:'Useful service adoption; partner quality; household satisfaction.',gate:'Customer demand and partner governance pass a controlled pilot.',market:'Home-service partners and households',borrow:'LG / Homey ecosystem learning, extended as a Group B business-model hypothesis.'},
 {id:'09',title:'Care-ready living, by choice',horizon:'H3',budget:37,start:2032,end:2036,theme:'Assisted-living experiment',description:'Explore opt-in, accessible home support for ageing households, with simple controls, transparent permissions and clear service boundaries. Avoid clinical claims and validate with users.',outcome:'Accessibility; sustained use; informed consent; user confidence.',gate:'User research, privacy assessment and partner validation before launch.',market:'Ageing households and service partners',borrow:'M1 ageing-population driver; proposed accessible service model.'}
];
const state = {scale:100,horizon:'all',query:'',sort:'horizon',year:2026};
const totalBase = HORIZONS.reduce((s,h)=>s+h.amount,0);
const money = n => '€'+n.toLocaleString('en-GB',{maximumFractionDigits:2})+'M';
const totalLabel = n => n>=1000 ? '€'+(n/1000).toFixed(2)+'B' : money(n);
const scaled = n => Math.round(n*state.scale)/100;
const pct = n => (n/totalBase*100).toFixed(1)+'%';
const color = h => 'var(--'+h.toLowerCase()+')';
const $ = s => document.querySelector(s);
function filteredInitiatives(){
 const q=state.query.trim().toLowerCase();
 return INITIATIVES.filter(p=>(state.horizon==='all'||p.horizon===state.horizon)&&(!q||[p.title,p.theme,p.description,p.market,p.horizon].join(' ').toLowerCase().includes(q))).sort((a,b)=>state.sort==='budget'?b.budget-a.budget:state.sort==='title'?a.title.localeCompare(b.title):a.id.localeCompare(b.id));
}
function renderPortfolio(){
 const open=new Set([...document.querySelectorAll('.initiative[open]')].map(d=>d.dataset.id));
 const rows=filteredInitiatives();
 $('#results-meta').innerHTML=`<span>${rows.length} of 9 proposed initiatives</span><span>${money(rows.reduce((s,p)=>s+scaled(p.budget),0))} shown · ${state.scale===100?'Board baseline':state.scale+'% funding'}</span>`;
 $('#initiative-list').innerHTML=rows.map(p=>`<details class="initiative" data-id="${p.id}" ${open.has(p.id)?'open':''}><summary><span class="initiative-id">${p.id}</span><span><h3>${p.title}</h3><span class="initiative-sub">${p.theme}</span></span><span class="horizon-chip" style="color:${color(p.horizon)}">${p.horizon} · ${HORIZONS.find(h=>h.id===p.horizon).name}</span><span class="initiative-budget">${money(scaled(p.budget))}</span></summary><div class="initiative-detail"><div><span class="proposed">GROUP B PROPOSAL · NOT A REPORTED SAMSUNG PROJECT</span><p>${p.description}</p><p><strong>What we would measure</strong><br>${p.outcome}</p><p><strong>Decision gate</strong><br>${p.gate}</p></div><dl class="detail-facts"><div><dt>Indicative development window</dt><dd>${p.start}–${p.end}</dd></div><div><dt>Annual planning allocation</dt><dd>${money(scaled(p.budget))}</dd></div><div><dt>Target users / market</dt><dd>${p.market}</dd></div><div><dt>Reference learning</dt><dd>${p.borrow}</dd></div></dl></div></details>`).join('');
 $('#empty').hidden=rows.length!==0;
 document.querySelectorAll('[data-horizon]').forEach(b=>{const on=b.dataset.horizon===state.horizon;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',on)});
}
function renderBudget(){
 const total=scaled(totalBase);
 document.querySelectorAll('[data-total]').forEach(el=>el.textContent=totalLabel(total));
 $('#rail-scenario').textContent=state.scale===100?'Board baseline':state.scale+'% illustrative funding';
 $('#hero-allocation').innerHTML=HORIZONS.map(h=>`<div class="horizon-hero"><div><span class="horizon-title"><b style="color:${color(h.id)}">${h.id}</b>${h.name}</span><strong class="horizon-value">${money(scaled(h.amount))}</strong></div><div class="mini-track"><span style="background:${color(h.id)};width:${h.amount/totalBase*100}%"></span></div><div class="horizon-sub"><span>${h.description}</span><span>${pct(h.amount)}</span></div></div>`).join('');
 $('#budget-bars').innerHTML=HORIZONS.map(h=>`<div class="budget-bar"><div class="budget-bar-label"><span>${h.id} · ${h.name}</span><b>${money(scaled(h.amount))}</b></div><div class="budget-bar-track" role="img" aria-label="${h.id}: ${money(scaled(h.amount))}, ${pct(h.amount)} of portfolio"><span style="background:${color(h.id)};width:${h.amount/totalBase*100}%"></span></div><div class="budget-bar-note">${pct(h.amount)} of total · ${h.source}${state.scale===100?'':' · scaled'}</div></div>`).join('');
 $('#funding-label').textContent=state.scale+'%';$('#funding').value=state.scale;
 $('#rd-share').textContent=(total/23500*100).toFixed(1)+'%';$('#revenue-share').textContent=(total/207600*100).toFixed(2)+'%';
 document.querySelectorAll('[data-scale]').forEach(b=>{const on=Number(b.dataset.scale)===state.scale;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',on)});
}
function renderTimeline(){
 const active=INITIATIVES.filter(p=>p.start<=state.year&&p.end>=state.year);
 $('#year-label').textContent=state.year;$('#year').value=state.year;
 $('#roadmap-summary').textContent=`${state.year} · ${active.length} initiatives within their proposed development windows · ${money(active.reduce((s,p)=>s+scaled(p.budget),0))} annual planning allocation represented`;
 $('#timeline').innerHTML=`<div class="timeline-grid"><div class="timeline-head"><span>Proposed initiative</span><div class="timeline-years">${Array.from({length:11},(_,i)=>`<span>${2026+i}</span>`).join('')}</div></div>${INITIATIVES.map(p=>`<div class="timeline-row ${active.includes(p)?'active':''}"><span class="timeline-name">${p.title}<small>${p.horizon} · ${money(scaled(p.budget))} annual allocation</small></span><div class="timeline-track" role="img" aria-label="${p.title}, proposed ${p.start} to ${p.end}"><span class="timeline-bar" style="grid-column:${p.start-2025}/span ${p.end-p.start+1};background:${color(p.horizon)}"></span><span class="timeline-tick" style="left:${(state.year-2026+.5)/11*100}%"></span></div></div>`).join('')}</div>`;
}
function setFunding(value){const n=Number(value);if(!Number.isFinite(n))return;state.scale=Math.min(140,Math.max(60,Math.round(n/5)*5));renderBudget();renderPortfolio();renderTimeline()}
function resetFilters(){state.horizon='all';state.query='';$('#search').value='';renderPortfolio()}
function selfCheck(){
 if(INITIATIVES.length!==9||new Set(INITIATIVES.map(p=>p.id)).size!==9)throw Error('Portfolio identity mismatch');
 if(totalBase!==1200||INITIATIVES.reduce((s,p)=>s+p.budget,0)!==1200)throw Error('Portfolio does not reconcile');
 for(const h of HORIZONS)if(INITIATIVES.filter(p=>p.horizon===h.id).reduce((s,p)=>s+p.budget,0)!==h.amount)throw Error('Horizon mismatch: '+h.id);
 if(INITIATIVES.some(p=>p.start>p.end||p.start<2026||p.end>2036))throw Error('Invalid planning window');
 return true;
}
selfCheck();
renderBudget();renderPortfolio();renderTimeline();
document.querySelectorAll('[data-horizon]').forEach(b=>b.addEventListener('click',()=>{state.horizon=b.dataset.horizon;renderPortfolio()}));
$('#search').addEventListener('input',e=>{state.query=e.target.value;renderPortfolio()});
$('#sort').addEventListener('change',e=>{state.sort=e.target.value;renderPortfolio()});
$('#clear-filters').addEventListener('click',resetFilters);
document.querySelectorAll('[data-scale]').forEach(b=>b.addEventListener('click',()=>setFunding(b.dataset.scale)));
$('#funding').addEventListener('input',e=>setFunding(e.target.value));$('#reset-budget').addEventListener('click',()=>setFunding(100));
let timer=null;
function stopTimeline(){if(timer!==null)clearInterval(timer);timer=null;$('#play-timeline').textContent='Play timeline';$('#play-timeline').setAttribute('aria-pressed','false')}
$('#year').addEventListener('input',e=>{stopTimeline();state.year=Number(e.target.value);renderTimeline()});
$('#play-timeline').addEventListener('click',()=>{if(timer!==null){stopTimeline();return}if(state.year===2036)state.year=2026;renderTimeline();$('#play-timeline').textContent='Pause timeline';$('#play-timeline').setAttribute('aria-pressed','true');timer=setInterval(()=>{state.year++;renderTimeline();if(state.year>=2036)stopTimeline()},1000)});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopTimeline()});
function applyTheme(theme){document.documentElement.dataset.theme=theme;const dark=theme==='dark';$('#theme-toggle span').textContent=dark?'Day theme':'Night theme';$('#theme-toggle').setAttribute('aria-label',dark?'Switch to day theme':'Switch to night theme');document.querySelector('meta[name="theme-color"]').content=dark?'#050b20':'#f7f9ff'}
try{const saved=localStorage.getItem('samsung-portfolio-theme');if(['dark','light'].includes(saved))applyTheme(saved)}catch{/* Theme still works when storage is unavailable. */}
$('#theme-toggle').addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';applyTheme(theme);try{localStorage.setItem('samsung-portfolio-theme',theme)}catch{/* Session theme remains available. */}});
const navLinks=[...document.querySelectorAll('.rail nav a')];
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);if(!visible.length)return;const id=visible[0].target.id;$("#mobile-nav").value=id;navLinks.forEach(a=>{if(a.hash==='#'+id){a.setAttribute('aria-current','location');$('#section-label').textContent=a.textContent}else a.removeAttribute('aria-current')})},{rootMargin:'-15% 0px -60% 0px',threshold:0});document.querySelectorAll('main>section[id]').forEach(s=>observer.observe(s))}

$("#mobile-nav").addEventListener("change",e=>{location.hash=e.target.value});
