/* Icons, sample photos and sample data */
const COLORS=[['ดำ','#222'],['ขาว','#fff'],['แดง','#d93b30'],['น้ำตาล','#8b5a2b'],['น้ำเงิน','#1f4fa3'],['ฟ้า','#6ec1f0'],['ชมพู','#f59ac0'],['ม่วง','#8e5bd0'],['เขียว','#3a9d4a'],['เหลือง','#f5c400'],['ส้ม','#f28c28'],['เทา','#8a8f98'],['ครีม / เบจ','#e8d8b8'],['กรมท่า','#1b2a4a'],['เงิน','linear-gradient(135deg,#eee,#9aa0a6)'],['ทอง','linear-gradient(135deg,#f7e08a,#c79a2a)'],['ใส / โปร่งใส','repeating-linear-gradient(45deg,#fff 0 3px,#dfe6ee 3px 6px)'],['ลายผสม','linear-gradient(90deg,#222 0 33%,#fff 33% 66%,#d93b30 66%)'],['อื่น ๆ','conic-gradient(#f5c400,#e41d30,#1f4fa3,#3a9d4a,#f5c400)']];
const CNAMES=COLORS.map(c=>c[0]);
const FEATS=['มีรอยขีดข่วน','มีพวงกุญแจ','มีสติกเกอร์','มีบัตรอยู่ข้างใน','ไม่มีจุดเด่น'];
const RANGES=(()=>{const r=[];for(const m of [7,8,9,10,11]){const last=new Date(2026,m+1,0).getDate();for(const[a,b]of[[1,7],[8,15],[16,23],[24,last]])r.push({a:new Date(2026,m,a),b:new Date(2026,m,b),t:`${a}–${b} ${MTH[m]} 69`})}return r})();
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const I={
 back:sv('<path d="M15 5l-7 7 7 7"/>'),chev:sv('<path d="M9 5l7 7-7 7"/>'),out:sv('<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10"/>'),
 lost:sv('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3M11 8.5v3M11 14h.01"/>'),
 found:sv('<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>'),
 search:sv('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>'),
 track:sv('<path d="M9 4h6M8 4a2 2 0 0 0-2 2v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a2 2 0 0 0-2-2"/><path d="M9 11l2 2 4-4M9 16h6"/>'),
 list:sv('<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>'),
 verify:sv('<path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>'),
 report:sv('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
 manage:sv('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
 users:sv('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>'),
 key:sv('<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>'),
 photo:sv('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-9 8"/>'),
 cam:sv('<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/>'),
 x:sv('<path d="M6 6l12 12M18 6L6 18"/>'),ok:sv('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),no:sv('<path d="M7 7l10 10M17 7L7 17"/>'),wait:sv('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
 user:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><circle cx="12" cy="7.5" r="4.5"/><path d="M3.5 21a8.5 7 0 0 1 17 0z"/></svg>',lockf:'<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M7 10V7.5a5 5 0 0 1 10 0V10h-2.4V7.5a2.6 2.6 0 0 0-5.2 0V10z"/><rect x="4.5" y="10" width="15" height="11.5" rx="2.5"/><circle cx="12" cy="15" r="1.7" fill="#fff"/><path d="M11.2 15.5h1.6v2.6h-1.6z" fill="#fff"/></svg>',eyeoff:sv('<path d="M3 3l18 18M10.6 6.1A10.5 10.5 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.9M6.6 7.6A16.6 16.6 0 0 0 2 12s3.5 6 10 6a9.7 9.7 0 0 0 4.4-1M9.9 9.9a3 3 0 0 0 4.2 4.2"/>'),
 calendar:sv('<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
 info:sv('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),lock:sv('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
 eye:sv('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
 pen:sv('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'),bin:sv('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>'),
 plus:sv('<path d="M12 5v14M5 12h14"/>'),xls:sv('<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 12l5 5M14 12l-5 5"/>'),
 pdf:sv('<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M8.5 13h7M8.5 16.5h5"/>'),
 box:sv('<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>'),inbox:sv('<path d="M3 13l3-8h12l3 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M3 13h5l1.5 2.5h5L16 13h5"/>'),
 pin:sv('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
 clock:sv('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),spark:sv('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>')
};
const svgURI=x=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -113 320 427">'+x+'</svg>');
const BG=c=>`<rect y="-113" width="320" height="427" fill="${c}"/><ellipse cx="160" cy="178" rx="120" ry="10" fill="#000" opacity=".08"/>`;
const PIC={I7:'images/item-earbuds.jpg?v=202611271014',I1:'images/item-wallet.jpg?v=202611271014',I2:'images/item-phone.jpg?v=202611271014',I3:'images/item-umbrella.jpg?v=202611271014',I4:'images/item-earbuds.jpg?v=202611271014',I5:'images/item-idcard.jpg?v=202611271014',C1:'images/claim-phone.jpg?v=202611271014'};
const LGCLEAN='images/login-top.jpg?v=202611271014';
const LGBOT='images/login-bottom.jpg?v=202611271014';
const LOGO='images/logo.jpg?v=202611271014',APPIC='images/app-icon.jpg?v=202611271014';
const imgOf=it=>it.img||PIC[it.id]||'';
const dueOf=it=>addDays(it.date,db.retention);
const dueState=it=>{if(it.type!=='found'||it.status==='returned')return'';const d=(new Date(dueOf(it)+'T00:00')-new Date(today()+'T00:00'))/864e5;return d<0?'over':d<=14?'near':''};
const matchesFor=it=>it.type!=='lost'||it.status==='returned'?[]:db.items.filter(x=>x.type==='found'&&x.status!=='returned'&&x.cat===it.cat&&x.reporter!==it.reporter&&x.date>=addDays(it.date,-3));
const pendingOther=it=>db.claims.find(c=>c.item===it.id&&c.status==='pending'&&c.by!==S.me.id);
const CLR=c=>(COLORS.find(x=>x[0]===c)||[0,'#ccc'])[1];

let S,db;
function seed(){
 db={users:[
   {id:'670111',pw:'1234',name:'สมหญิง รักเรียน',role:'user',phone:'081-234-5678'},
   {id:'670222',pw:'1234',name:'สมชาย ใจดี',role:'user',phone:'089-765-4321'},
   {id:'670333',pw:'1234',name:'สมศรี ตั้งใจ',role:'user',phone:'086-555-1234'},
   {id:'staff01',pw:'1234',name:'เจ้าหน้าที่ เอ',role:'staff',phone:'02-312-6300'},
   {id:'staff02',pw:'1234',name:'เจ้าหน้าที่ บี',role:'staff',phone:'02-312-6301'}],
  perms:{verify:true,report:true,manage:true},
  cats:['กระเป๋า','เงิน / ของมีค่า','โทรศัพท์มือถือ','อุปกรณ์ไอที','บัตรต่างๆ','กุญแจ','เอกสาร / หนังสือ','เสื้อผ้า / เครื่องแต่งกาย','เครื่องประดับ / นาฬิกา','แว่นตา','ขวดน้ำ / กระติก','ร่ม','เครื่องเขียน','อุปกรณ์กีฬา','ของใช้ส่วนตัว','อื่น ๆ'],
  places:['โรงอาหารกลาง','ห้องสมุด','อาคารเรียน 2'],
  retention:90,
  items:[
   {id:'I1',type:'found',name:'กระเป๋าสตางค์สีดำ',cat:'กระเป๋า',place:'โรงอาหารกลาง',date:'2026-09-10',secret:{color:'ดำ',feats:['มีรอยขีดข่วน','มีบัตรอยู่ข้างใน']},deposit:'ห้องกิจการนักศึกษา',receivedBy:'staff01',reporter:'670222',status:'waiting'},
   {id:'I2',type:'found',name:'โทรศัพท์มือถือ เคสสีฟ้า',cat:'โทรศัพท์มือถือ',place:'ห้องสมุด',date:'2026-09-12',secret:{color:'ฟ้า',feats:['มีสติกเกอร์']},deposit:'เคาน์เตอร์ห้องสมุด',receivedBy:'staff02',reporter:'670222',status:'waiting'},
   {id:'I3',type:'found',name:'ร่มสีน้ำเงิน',cat:'ร่ม',place:'อาคารเรียน 2',date:'2026-09-03',secret:{color:'น้ำเงิน',feats:['ไม่มีจุดเด่น']},deposit:'ห้องกิจการนักศึกษา',receivedBy:'staff01',reporter:'670222',status:'returned'},
   {id:'I4',type:'lost',name:'หูฟังไร้สายสีขาว',cat:'อุปกรณ์ไอที',place:'ห้องสมุด',date:'2026-09-05',detail:'เคสมีสติกเกอร์หัวใจสีชมพู',reporter:'670111',status:'waiting'},
   {id:'I5',type:'lost',name:'บัตรนักศึกษา',cat:'บัตรต่างๆ',place:'โรงอาหารกลาง',date:'2026-09-18',detail:'',reporter:'670222',status:'waiting'},
   {id:'I6',type:'found',name:'กุญแจรถจักรยานยนต์',cat:'กุญแจ',place:'อาคารเรียน 2',date:'2026-08-01',secret:{color:'เงิน',feats:['มีพวงกุญแจ']},deposit:'ห้องกิจการนักศึกษา',receivedBy:'staff01',reporter:'670333',status:'waiting'},
   {id:'I7',type:'found',name:'หูฟังไร้สาย เคสสีขาว',cat:'อุปกรณ์ไอที',place:'ห้องสมุด',date:'2026-09-08',secret:{color:'ขาว',feats:['มีสติกเกอร์']},deposit:'เคาน์เตอร์ห้องสมุด',receivedBy:'staff02',reporter:'670333',status:'waiting'}],
  claims:[
   {id:'C1',item:'I2',by:'670111',date:'2026-09-14',ans:{color:'ฟ้า',feats:['มีสติกเกอร์'],place:'ห้องสมุด',date:'2026-09-12'},note:'เคสมีสติกเกอร์รูปแมว',imgs:[PIC.C1],status:'pending'},
   {id:'C2',item:'I3',by:'670111',date:'2026-09-05',ans:{color:'น้ำเงิน',feats:['ไม่มีจุดเด่น'],place:'อาคารเรียน 2',date:'2026-09-03'},note:'',imgs:[],status:'approved',verifiedBy:'staff01'},
   {id:'C3',item:'I1',by:'670222',date:'2026-09-11',ans:{color:'น้ำตาล',feats:['มีพวงกุญแจ'],place:'ห้องสมุด',date:'2026-09-20'},note:'',imgs:[],status:'rejected',verifiedBy:'staff02',reason:'คำตอบไม่ตรงกับลักษณะของสิ่งของ'}],
  seq:8};
 S={me:null,stack:[{s:'login'}],modal:null,f:{}};
}
const user=id=>db.users.find(u=>u.id===id);
const item=id=>db.items.find(i=>i.id===id);
const cur=()=>S.stack[S.stack.length-1];
function go(s,p={}){S.stack.push({s,...p});S.f={};S.modal=null;DIR='fwd';render(true)}
function back(){if(S.stack.length>1)S.stack.pop();S.f={};S.modal=null;DIR='bwd';render(true)}
function home(){S.stack=[{s:S.me.role==='staff'?'shome':'home'}];S.f={};S.modal=null;DIR='fade';render(true)}
function modal(m){S.modal=m;render()}
function toast(t){const p=$('#phone'),d=document.createElement('div');d.className='toast';d.textContent=t;p.appendChild(d);setTimeout(()=>d.remove(),2200)}
function match(c){const it=item(c.item),a=c.ans,r=RANGES.find(x=>x.t===a.range),d=new Date(it.date+'T00:00');
 const set=x=>[...x].sort().join('|');
 const res=[['สี',a.color,it.secret.color,a.color===it.secret.color],
  ['ลักษณะเด่น',a.feats.join(', ')||'-',it.secret.feats.join(', '),set(a.feats)===set(it.secret.feats)],
  ['สถานที่',a.place,it.place,a.place===it.place],
  ['วันที่ทำหาย',a.date?thd(a.date):a.range,thd(it.date),a.date?Math.abs((new Date(a.date+'T00:00')-d)/864e5)<=3:(!!r&&d>=r.a&&d<=r.b)]];
 return {res,score:res.filter(x=>x[3]).length}}
const ITEMSTAT={waiting:['รอเจ้าของมารับ','p-wait'],returned:['คืนแล้ว','p-ok']};
const LOSTSTAT={waiting:['กำลังตามหา','p-b'],returned:['ได้คืนแล้ว','p-ok']};
const stOf=i=>(i.type==='lost'?LOSTSTAT:ITEMSTAT)[i.status];
const CLSTAT={pending:['รอตรวจสอบ','p-wait'],approved:['อนุมัติแล้ว','p-ok'],rejected:['ไม่อนุมัติ','p-bad']};
const pill=([t,c])=>`<span class="pill ${c}">${t}</span>`;
const H=(t,{back=true,right=''}={})=>{if(S.me&&S.stack.length===2&&NAVS[S.me.role].some(x=>x[0]===cur().s))back=false;return `<div class="hd">${back?`<button class="ib" type="button" data-a="back" aria-label="ย้อนกลับ">${I.back}</button>`:''}<h2>${t}</h2>${right}${S.me?signout:''}</div>`};
const signout=`<button class="so" type="button" data-a="signout">${I.out}<span>ออกจากระบบ</span></button>`;
const opts=(arr,sel)=>arr.map(x=>`<option${x===sel?' selected':''}>${esc(x)}</option>`).join('');
const hideImg=it=>it.type==='found'&&S.me&&S.me.role!=='staff'&&it.reporter!==S.me.id;
const thumb=it=>imgOf(it)?`<img class="thumb${hideImg(it)?' blurimg':''}" src="${imgOf(it)}" alt="">`:`<span class="thumb">${I.photo}</span>`;
const ILL=k=>`<svg class="ill" viewBox="0 0 160 110" aria-hidden="true"><ellipse cx="80" cy="100" rx="58" ry="7" fill="var(--track)"/>
 <path d="M40 46l38-16 38 16v38l-38 16-38-16z" fill="var(--brandsoft)" stroke="var(--brand)" stroke-width="2.5" stroke-linejoin="round"/><path d="M40 46l38 16 38-16M78 62v38" stroke="var(--brand)" stroke-width="2.5" fill="none"/><path d="M58 38l38 16v10" stroke="var(--brand)" stroke-width="2.5" fill="none" opacity=".5"/>
 ${k==='search'?'<circle cx="118" cy="36" r="16" fill="var(--paper)" stroke="var(--ink)" stroke-width="3"/><path d="M129.5 47.5l12 12" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M112 31l12 10M124 31l-12 10" stroke="var(--bad)" stroke-width="3" stroke-linecap="round"/>'
 :k==='track'?'<rect x="104" y="14" width="30" height="38" rx="5" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5"/><path d="M111 26h16M111 33h16M111 40h10" stroke="var(--muted)" stroke-width="2.5" stroke-linecap="round"/>'
 :k==='verify'?'<circle cx="120" cy="34" r="16" fill="var(--ok)"/><path d="M112 34l6 6 11-12" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
 :'<path d="M110 22l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill="#f5b400"/><circle cx="132" cy="44" r="3" fill="#f5b400"/><circle cx="34" cy="30" r="3" fill="#f5b400"/>'}</svg>`;
const empty=(ic,t)=>`<div class="empty">${ILL(ic)}<span>${t}</span></div>`;
const chipR=(name,v,on,extra='',lab)=>`<label class="opt2"><input type="radio" name="${name}" value="${esc(v)}"${on?' checked':''}><span><i class="mk"></i>${extra}${esc(lab??v)}</span></label>`;
const chipC=(name,v,on)=>`<label class="opt2 sq"><input type="checkbox" name="${name}" value="${esc(v)}"${on?' checked':''}><span><i class="mk"></i>${esc(v)}</span></label>`;
const grid=(html,cols=3,id='')=>`<div class="ogrid c${cols}"${id?` id="${id}"`:''}>${html}</div>`;
const colorChips=(name,sel)=>COLORS.map(([c,h])=>chipR(name,c,c===sel,`<i class="dot" style="background:${h}"></i>`)).join('');
const colorSel=(name,sel,box)=>`<div class="colsel"${box?` id="${box}"`:''}><i class="dot" style="background:${sel?CLR(sel):'#fff'}"></i><select class="fld" name="${name}" id="${name}" aria-label="สีของสิ่งของ"><option value="">— เลือกสี —</option>${COLORS.map(([c])=>`<option value="${esc(c)}"${c===sel?' selected':''}>${esc(c)}</option>`).join('')}</select></div>`;
