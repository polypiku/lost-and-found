/* iPhone frame: home screen, status bar, open/close app */
/* ---------- iPhone shell ---------- */
const SCR=$('#screen'),SPR=$('#spring'),HB=$('#hbar');
let GID=0;
const ic=(bg,inner)=>{const id='g'+(GID++);const fill=bg.length>1?`url(#${id})`:bg[0];
 return `<svg viewBox="0 0 60 60" aria-hidden="true">${bg.length>1?`<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${bg.map((c,k)=>`<stop offset="${k/(bg.length-1)}" stop-color="${c}"/>`).join('')}</linearGradient></defs>`:''}<rect width="60" height="60" fill="${fill}"/>${inner}</svg>`};
const ICONS={
 facetime:['FaceTime',()=>ic(['#5df06c','#16c03a'],'<rect x="12" y="20" width="24" height="20" rx="5" fill="#fff"/><path d="M38 27l10-6v18l-10-6z" fill="#fff"/>')],
 calendar:['Calendar',()=>ic(['#fff'],`<text x="30" y="19" text-anchor="middle" font-size="10" font-weight="700" fill="#f2382c" font-family="Arial">${['SUN','MON','TUE','WED','THU','FRI','SAT'][new Date().getDay()]}</text><text x="30" y="46" text-anchor="middle" font-size="27" font-weight="300" fill="#111" font-family="Arial">${new Date().getDate()}</text>`)],
 photos:['Photos',()=>ic(['#fff'],[['#f9b233',0],['#f6812f',45],['#e9483f',90],['#c94bd1',135],['#5d6cf0',180],['#33b3ea',225],['#3fcf6a',270],['#b4e04d',315]].map(([c,a])=>`<ellipse cx="30" cy="18" rx="6.5" ry="11" fill="${c}" opacity=".85" transform="rotate(${a} 30 30)"/>`).join(''))],
 camera:['Camera',()=>ic(['#d8d8dc','#9c9ca2'],'<rect x="11" y="20" width="38" height="25" rx="5" fill="#2b2b2e"/><rect x="23" y="16" width="14" height="6" rx="2" fill="#2b2b2e"/><circle cx="30" cy="32.5" r="8" fill="#5e5e63" stroke="#d8d8dc" stroke-width="2.5"/>')],
 mail:['Mail',()=>ic(['#2ea8ff','#1271f2'],'<rect x="12" y="18" width="36" height="25" rx="4" fill="#fff"/><path d="M12.5 19.5L30 32l17.5-12.5" stroke="#1d86f6" stroke-width="2.5" fill="none"/>')],
 notes:['Notes',()=>ic(['#fff'],'<rect width="60" height="15" fill="#fcd34d"/><path d="M8 26h44M8 34h44M8 42h44M8 50h30" stroke="#ddd" stroke-width="1.6"/>')],
 reminders:['Reminders',()=>ic(['#fff'],'<circle cx="15" cy="18" r="4" fill="#0a84ff"/><circle cx="15" cy="30" r="4" fill="#f2382c"/><circle cx="15" cy="42" r="4" fill="#ff9f0a"/><path d="M24 18h24M24 30h24M24 42h24" stroke="#c7c7cc" stroke-width="2"/>')],
 clock:['Clock',()=>{const d=new Date(),h=d.getHours()%12,m=d.getMinutes();return ic(['#111'],`<circle cx="30" cy="30" r="23" fill="#fff"/>${[...Array(12)].map((_,k)=>`<path d="M30 9v4" stroke="#111" stroke-width="1.6" transform="rotate(${k*30} 30 30)"/>`).join('')}<path d="M30 30V18" stroke="#111" stroke-width="2.6" stroke-linecap="round" transform="rotate(${h*30+m/2} 30 30)"/><path d="M30 30V12" stroke="#111" stroke-width="1.8" stroke-linecap="round" transform="rotate(${m*6} 30 30)"/><circle cx="30" cy="30" r="2" fill="#f2382c"/>`)}],
 news:['News',()=>ic(['#fff'],'<path d="M14 14h18l14 32H28z" fill="#f2382c"/><path d="M14 14v32h14z" fill="#ff6b5f"/>')],
 tv:['TV',()=>ic(['#1c1c1e','#000'],'<rect x="12" y="17" width="36" height="22" rx="3" fill="none" stroke="#fff" stroke-width="2.6"/><path d="M24 45h12M30 39v6" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>')],
 podcasts:['Podcasts',()=>ic(['#d66cf5','#8a2fcf'],'<circle cx="30" cy="26" r="5" fill="#fff"/><path d="M27 34h6l-1.4 14h-3.2z" fill="#fff"/><path d="M19 34a13 13 0 1 1 22 0M14.5 38a19 19 0 1 1 31 0" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/>')],
 appstore:['App Store',()=>ic(['#36bdf9','#1576f0'],'<path d="M24 16l14 26M36 16L22 42M17 34h26" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/>')],
 maps:['Maps',()=>ic(['#d9f2c9'],'<path d="M0 40L60 18v10L0 50z" fill="#fff"/><path d="M34 0h8v60h-8z" fill="#ffd761" opacity=".8"/><circle cx="22" cy="24" r="8" fill="#f2382c"/><circle cx="22" cy="24" r="3" fill="#fff"/>')],
 weather:['Weather',()=>ic(['#4fb2ff','#1d6fe0'],'<circle cx="24" cy="24" r="8" fill="#ffd60a"/><path d="M20 44h22a7 7 0 0 0 0-14 10 10 0 0 0-19 3 6 6 0 0 0-3 11z" fill="#fff"/>')],
 settings:['Settings',()=>ic(['#aeaeb2','#7c7c80'],'<circle cx="30" cy="30" r="15" fill="none" stroke="#3a3a3c" stroke-width="7" stroke-dasharray="5 3.4"/><circle cx="30" cy="30" r="9" fill="#d1d1d6" stroke="#3a3a3c" stroke-width="3"/>')],
 phone:['Phone',()=>ic(['#5df06c','#16c03a'],'<path d="M21 15c2 0 5 7 4 9l-3 2c1.5 4 6 9 10 11l2-3c2-1 9 2 9 4 0 3-3 7-7 7-11 0-23-12-23-23 0-4 4-7 8-7z" fill="#fff"/>')],
 safari:['Safari',()=>ic(['#fff'],'<circle cx="30" cy="30" r="22" fill="#1e8cf5"/><circle cx="30" cy="30" r="19" fill="none" stroke="#fff" stroke-width=".8" stroke-dasharray="1 3"/><path d="M30 30l11-11-8 14z" fill="#f2382c"/><path d="M30 30L19 41l8-14z" fill="#fff"/>')],
 messages:['Messages',()=>ic(['#5df06c','#16c03a'],'<path d="M30 15c11 0 19 6.5 19 15s-8 15-19 15c-2 0-4-.2-6-.7L15 47l2.5-7C13.5 37 11 33.7 11 30c0-8.5 8-15 19-15z" fill="#fff"/>')],
 music:['Music',()=>ic(['#ff6a83','#f6263d'],'<path d="M25 40V20l17-4v20" stroke="#fff" stroke-width="3" fill="none"/><circle cx="21" cy="41" r="5" fill="#fff"/><circle cx="38" cy="37" r="5" fill="#fff"/>')]
};
const THN={camera:'กล้อง',photos:'รูปภาพ',clock:'นาฬิกา',notes:'โน้ต'};
const appBtn=k=>{const [n0,svg]=ICONS[k];const n=LANG==='en'?n0:(THN[k]||n0);return `<button type="button" class="app" data-app="${k}" aria-label="${n}"><span class="ai">${svg()}</span><span>${n}</span></button>`};
function drawSpring(){const d=new Date(),loc=LANG==='en'?'en-US':'th-TH';GID=0;
 SPR.innerHTML=`<div class="widget"><div class="wg"><small>${d.toLocaleDateString(loc,{weekday:'long'})}</small><b>${d.getDate()}</b><span>${d.toLocaleDateString(loc,{month:'long',year:'numeric'})}</span></div><div class="wg"><small>${LANG==='en'?'Bangkok':'กรุงเทพฯ'}</small><b>31°</b><span>${LANG==='en'?'Partly cloudy':'มีเมฆบางส่วน'}</span></div></div>
 <div class="apps"><button type="button" class="app ours" data-app="lf" aria-label="Lost and Found"><span class="ai"><img src="${APPIC}" alt=""></span><span>${LANG==='en'?'Lost&Found':'แจ้งของหาย'}</span></button>${['camera','photos','clock','notes'].map(appBtn).join('')}</div>
 <div class="sp2"></div><div class="pill2">${I.search}<span>${LANG==='en'?'Search':'ค้นหา'}</span></div>
 <div class="dock">${['phone','safari','messages','music'].map(appBtn).join('')}</div>`}
let OPEN=false;
function openApp(from){const r=from.getBoundingClientRect(),sr=SCR.getBoundingClientRect();P.style.transformOrigin=`${r.left+r.width/2-sr.left}px ${r.top+r.height/2-sr.top}px`;
 P.classList.remove('closing');P.classList.add('open');OPEN=true;HB.classList.add('dark');
 if(!S.me){const sp=document.createElement('div');sp.className='splash';sp.setAttribute('aria-hidden','true');sp.innerHTML=`<img class="spic" src="${APPIC}" alt=""><b class="spn">${LANG==='en'?'Lost &amp; Found':'แจ้งของหาย'}</b><span class="ld"></span>`;P.appendChild(sp);setTimeout(()=>{sp.classList.add('out');setTimeout(()=>sp.remove(),400)},1100)}}
function closeApp(){if(!OPEN)return;OPEN=false;HB.classList.remove('dark');P.classList.add('closing');setTimeout(()=>P.classList.remove('open','closing'),matchMedia('(prefers-reduced-motion: reduce)').matches?0:300)}
SPR.addEventListener('click',e=>{const b=e.target.closest('.app');if(!b)return;if(b.dataset.app==='lf')return openApp(b);
 b.classList.remove('bounce');void b.offsetWidth;b.classList.add('bounce');const t=document.createElement('div');t.className='stoast';t.textContent=LANG==='en'?'Demo icon — open Lost&Found to try the app':'ไอคอนตัวอย่าง ลองเปิดแอป “แจ้งของหาย”';SCR.appendChild(t);setTimeout(()=>t.remove(),1600)});
HB.addEventListener('click',closeApp);
const tick=()=>{const d=new Date();$('#clk').textContent=d.getHours()+':'+String(d.getMinutes()).padStart(2,'0')};tick();setInterval(tick,15000);
const MOO={childList:true,subtree:true,characterData:true};
const mo=new MutationObserver(()=>{if(LANG!=='en')return;mo.disconnect();trNode(P);mo.observe(P,MOO)});mo.observe(P,MOO);
drawSpring();document.documentElement.lang=LANG;if(LANG==='en')trNode(P);
