/* App screens (S01–S19) */
/* ---------- screens ---------- */
const V={};
V.login=()=>`<div class="lg2"><div class="lgtopw"><img class="lgtop" src="${LGCLEAN}" alt="ระบบศูนย์กลางแจ้งของหาย"><div class="wel"><h1>ยินดีต้อนรับ!</h1><p>ระบบศูนย์กลางรับฝากและติดตามของหาย มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ</p></div><div class="lang" role="group" aria-label="Language"><button type="button" data-a="lang" data-v="th" class="${LANG==='th'?'on':''}" aria-pressed="${LANG==='th'}">ไทย</button><button type="button" data-a="lang" data-v="en" class="${LANG==='en'?'on':''}" aria-pressed="${LANG==='en'}">EN</button></div></div>
 <form id="fLogin" novalidate>
  <div class="lcard">
   <label class="lrow2"><span class="lic">${I.user}</span><input id="lu" autocomplete="username" placeholder="รหัสนักศึกษา / บุคลากร" aria-label="รหัสนักศึกษา / บุคลากร" value="${esc(S.f.lu||'')}"></label>
   <label class="lrow2"><span class="lic">${I.lockf}</span><input id="lp" type="password" autocomplete="current-password" placeholder="รหัสผ่าน" aria-label="รหัสผ่าน" value="${esc(S.f.lp||'')}"><button type="button" class="eye" data-a="togglePw" aria-label="แสดงรหัสผ่าน">${I.eyeoff}</button></label>
  </div>
  <button class="lbtn" type="submit"><span>เข้าสู่ระบบ</span>${I.chev}</button>
 </form>
 
 <img class="lgbot" src="${LGBOT}" alt=""></div>`;
const NAVS={user:[['home','หน้าหลัก','box'],['search','ค้นหา','search'],['track','ติดตาม','track'],['mine','รายการ','list']],
 staff:[['shome','หน้าหลัก','box'],['pending','ตรวจสอบ','verify','verify'],['report','รายงาน','report','report'],['manage','จัดการ','manage','manage']]};
const nav=()=>{if(!S.me)return'';const L=NAVS[S.me.role].filter(x=>!x[3]||db.perms[x[3]]);const c=cur().s;if(S.stack.length>2||!L.some(x=>x[0]===c))return'';
 const bd={track:db.claims.filter(x=>x.by===S.me.id&&x.status==='pending').length,pending:db.claims.filter(x=>x.status==='pending').length};
 return `<nav class="nav" aria-label="เมนูหลัก">${L.map(([k,t,ic])=>`<button type="button" data-a="tab" data-v="${k}" class="${k===c?'on':''}"${k===c?' aria-current="page"':''}><span class="ni">${I[ic]}</span>${t}${bd[k]?`<span class="bdg">${bd[k]}</span>`:''}</button>`).join('')}</nav>`};
const homeHd=(sub)=>`<div class="hd home"><div class="row1"><img class="appic" src="${APPIC}" alt=""><span class="sp"></span>${signout}</div><div class="hi"><small>${sub}</small><b>สวัสดี, ${esc(S.me.name.split(' ')[0]==='เจ้าหน้าที่'?S.me.name:S.me.name.split(' ')[0])}</b></div></div>`;
const hello=()=>`<div class="hello"><div class="av">${S.me.role==='staff'?I.verify:I.users}</div><div><b>สวัสดี ${esc(S.me.name)}</b><small>${S.me.role==='staff'?'เจ้าหน้าที่':'ผู้ใช้ทั่วไป'} · ${S.me.id}</small></div></div>`;
const tile=(go,ic,t,d,badge,wide)=>`<button class="tile${wide?' wide':''}" type="button" data-go="${go}"><span class="ic" data-c="${ic}">${I[ic]}</span><span class="tx"><b>${t}</b><br><small>${d}</small></span>${badge?`<span class="badge">${badge}</span>`:''}</button>`;
V.home=()=>{const my=db.claims.filter(c=>c.by===S.me.id&&c.status==='pending').length;
 return homeHd('ศูนย์รับฝากของหาย · '+S.me.id)+`<div class="bd home"><button class="qs2" type="button" data-go="search"><span class="qt"><span class="ic">${I.search}</span><span><b>ทำของหายใช่ไหม?</b><small>ค้นหาของที่มีคนเก็บได้ แล้วยื่นขอรับคืน</small></span></span><span class="sfake">${I.search}<span>ค้นหาชื่อสิ่งของ หรือสถานที่</span><i>ค้นหา</i></span></button>
 <div class="sec"><span>บริการ</span></div>
 <div class="tiles">${tile('lost','lost','แจ้งของหาย','บันทึกของที่คุณทำหาย')}${tile('found','found','บันทึกของที่พบ','แจ้งของที่คุณเก็บได้')}
 ${tile('track','track','ติดตามสถานะ','ผลคำขอรับคืนของคุณ',my)}${tile('mine','list','รายการบันทึก','ดูและแก้ไขรายการที่แจ้ง')}</div></div>`};
V.shome=()=>{const p=db.perms,n=db.claims.filter(c=>c.status==='pending').length;
 const t=[];if(p.verify)t.push(tile('pending','verify','ตรวจสอบคำขอ','อนุมัติหรือปฏิเสธคำขอรับคืน',n,true));if(p.report)t.push(tile('report','report','ออกรายงาน','สรุปรายเดือน ส่งออก Excel / PDF'));if(p.manage)t.push(tile('manage','manage','จัดการระบบ','บัญชี สิทธิ์ และการตั้งค่า'));
 return homeHd('สำหรับเจ้าหน้าที่ · '+S.me.id)+`<div class="bd home">
 <div class="tiles">${t.join('')}</div>${(!p.verify||!p.report||!p.manage)?'<div class="note">'+I.info+'<span>บางเมนูถูกซ่อนตามสิทธิ์ที่ตั้งไว้ในหน้าจัดการระบบ</span></div>':''}</div>`};
const photoField=(src,label)=>`<div class="field"><span class="lab">${label}</span><div id="phWrap">${src?`<div class="ph" data-a="pickPhoto" role="button" tabindex="0" aria-label="เปลี่ยนรูป" style="cursor:pointer"><img src="${src}" alt="รูปสิ่งของ"><button class="x" type="button" data-a="rmPhoto" aria-label="ลบรูป">${I.x}</button><span class="cap">แตะเพื่อเปลี่ยน</span></div>`:`<button class="up" type="button" data-a="pickPhoto">${I.cam}<span>แนบรูปภาพ</span></button>`}</div><input type="file" id="iImg" accept="image/*" hidden></div>`;
function itemForm(kind,it={}){const f=kind==='found'||it.type==='found';const img=S.f.img!==undefined?S.f.img:(it.img||(it.id?PIC[it.id]:''))||'';
 return `<div class="panel"><div class="field"><label for="iName">ชื่อสิ่งของ <small>(จำเป็น)</small></label><input class="fld" id="iName" placeholder="${f?'เช่น กระเป๋าสตางค์สีดำ':'เช่น หูฟังไร้สายสีขาว'}" value="${esc(it.name)}"></div>
 <div class="two"><div class="field"><label for="iCat">หมวดหมู่</label><select class="fld" id="iCat">${opts(db.cats,it.cat||db.cats[0])}</select></div>
 <div class="field"><span class="lab" id="iDateL">${f?'วันที่พบ':'วันที่ทำหาย'}</span>${dateBtn('iDate',it.date||'','iDateL')}</div></div>
 <div class="field"><label for="iPlace">${f?'สถานที่ที่เก็บได้':'สถานที่ที่คาดว่าทำหาย'}</label><select class="fld" id="iPlace"><option value="">เลือกสถานที่</option>${opts(db.places,it.place)}</select></div>
 ${photoField(img,f?'รูปสิ่งของที่พบ <small>(แนะนำ)</small>':'รูปสิ่งของ <small>(ถ้ามี)</small>')}
 <div class="field"><label for="iDetail">${f?'รายละเอียดทั่วไป':'รายละเอียดเพิ่มเติม'} <small>(ไม่บังคับ)</small></label><textarea class="fld" id="iDetail" placeholder="${f?'สิ่งที่ทุกคนเห็นได้ เช่น ขนาด ยี่ห้อ':'เช่น ยี่ห้อ ตำหนิ ของที่อยู่ข้างใน'}">${esc(it.detail||'')}</textarea></div>
</div>
 ${f?`<div class="panel secret"><div class="ptitle">${I.lock}ข้อมูลลับสำหรับยืนยันเจ้าของ</div><div class="hint" style="margin-top:-6px">ข้อมูลส่วนนี้ไม่แสดงต่อผู้อื่น ใช้เทียบกับคำตอบของผู้ขอรับคืน</div>
  <div class="field"><span class="lab">สีของสิ่งของ</span>${grid(colorChips('iColor',it.secret?.color),3,'iColorBox')}</div>
  <div class="field"><span class="lab">ลักษณะเด่น <small>(เลือกได้หลายข้อ)</small></span>${grid(FEATS.map(x=>chipC('iF',x,it.secret?.feats?.includes(x))).join(''),2,'iFBox')}</div></div>
 <div class="panel"><div class="ptitle">${I.inbox}การฝากของ</div>
  <div class="field"><label for="iDep">สถานที่ฝาก</label><input class="fld" id="iDep" placeholder="เช่น ห้องกิจการนักศึกษา" value="${esc(it.deposit||'')}"></div>
  <div class="field"><label for="iStaff">เจ้าหน้าที่ที่รับฝาก</label><select class="fld" id="iStaff"><option value="">เลือกเจ้าหน้าที่</option>${db.users.filter(u=>u.role==='staff').map(u=>`<option value="${u.id}"${it.receivedBy===u.id?' selected':''}>${esc(u.name)}</option>`).join('')}</select></div></div>`:''}`}
V.lost=()=>H('แจ้งของหาย')+`<div class="bd">${itemForm('lost')}</div><div class="ft"><button class="btn" type="button" data-a="back">ยกเลิก</button><button class="btn pri" type="button" data-a="saveItem" data-k="lost">บันทึกการแจ้ง</button></div>`;
V.found=()=>H('บันทึกของที่พบ')+`<div class="bd">${itemForm('found')}</div><div class="ft"><button class="btn" type="button" data-a="back">ยกเลิก</button><button class="btn pri" type="button" data-a="saveItem" data-k="found">บันทึกการแจ้ง</button></div>`;
V.mine=()=>{const L=db.items.filter(i=>i.reporter===S.me.id);
 return H('รายการบันทึก')+`<div class="bd"><div class="note">${I.info}<span>แตะรายการเพื่อแก้ไข รายการที่คืนแล้วแก้ไขไม่ได้</span></div>
 ${L.length?L.map(i=>{const inner=`${thumb(i)}<span class="t"><b>${esc(i.name)}</b><small>${i.type==='lost'?'ของหาย':'ของที่พบ'} · ${thd(i.date)}</small>${pill(stOf(i))}</span>`;return i.status==='returned'?`<div class="item off">${inner}</div>`:`<button class="item" type="button" data-go="edit" data-id="${i.id}">${inner}<span class="chev">${I.pen}</span></button>`}).join(''):empty('list','ยังไม่มีรายการที่คุณแจ้งไว้')}</div>`};
V.edit=()=>{const it=item(cur().id);return H('แก้ไขรายละเอียด')+`<div class="bd">${itemForm(it.type,it)}</div><div class="ft"><button class="btn" type="button" data-a="back">ยกเลิก</button><button class="btn pri" type="button" data-a="saveEdit">บันทึกการแก้ไข</button></div>`};
const searchList=()=>{const q=(S.f.q||'').trim(),t=S.f.t||'found',c=S.f.c||'';
 return db.items.filter(i=>(t==='all'||i.type===t)&&(!c||i.cat===c)&&(!q||(i.name+i.place+i.cat+(i.detail||'')).includes(q)))};
const searchResults=()=>{const L=searchList();return `<div class="sec"><span>พบ ${L.length} รายการ</span></div>`+(L.length?L.map(i=>`<button class="item" type="button" data-go="detail" data-id="${i.id}">${thumb(i)}<span class="t"><b>${esc(i.name)}</b><small>${esc(i.place)} · ${thd(i.date)}</small>${pill(stOf(i))}</span><span class="chev">${I.chev}</span></button>`).join(''):empty('search','ไม่พบรายการที่ตรงกับคำค้นหา<br>ลองเปลี่ยนคำค้นหรือตัวกรอง'))};
V.search=()=>{const t=S.f.t||'found',c=S.f.c||'';
 return H('ค้นหารายการ')+`<div class="bd"><div class="sbox">${I.search}<input class="fld" id="sq" type="search" placeholder="ชื่อสิ่งของ สถานที่ หรือรายละเอียด" value="${esc(S.f.q||'')}" aria-label="คำค้น"></div>
 <div class="seg" role="tablist">${[['found','ของที่พบ'],['lost','ของหาย'],['all','ทั้งหมด']].map(([k,l])=>`<button type="button" role="tab" aria-selected="${t===k}" class="${t===k?'on':''}" data-a="setT" data-v="${k}">${l}</button>`).join('')}</div>
 <label class="catsel"><span>${I.list}หมวดหมู่</span><select class="fld" name="sc" aria-label="หมวดหมู่">${['',...db.cats].map(x=>`<option value="${esc(x)}"${x===c?' selected':''}>${esc(x||'ทุกหมวด')}</option>`).join('')}</select></label>
 <div id="res" style="display:flex;flex-direction:column;gap:10px">${searchResults()}</div></div>`};
V.detail=()=>{const it=item(cur().id),f=it.type==='found',mine=it.reporter===S.me.id;const canClaim=S.me.role==='user'&&f&&!mine&&it.status!=='returned';
 const pend=db.claims.find(c=>c.item===it.id&&c.by===S.me.id&&c.status==='pending');
 return H('รายละเอียดรายการ')+`<div class="bd">${imgOf(it)?(hideImg(it)?`<div class="herow"><img class="hero blurimg" src="${imgOf(it)}" alt=""><span class="blurnote">${I.lock}รูปถูกเบลอเพื่อป้องกันการแอบอ้าง<br>เจ้าหน้าที่จะเทียบรูปจริงให้ตอนตรวจสอบ</span></div>`:`<img class="hero" src="${imgOf(it)}" alt="${esc(it.name)}">`):''}
 <div><div style="font-weight:600;font-size:18px">${esc(it.name)}</div><div style="margin-top:6px">${pill(stOf(it))}</div></div>
 <div class="kv"><div><span>ประเภท</span><span>${f?'ของที่พบ':'ของหาย'}</span></div><div><span>หมวดหมู่</span><span>${esc(it.cat)}</span></div>
 <div><span>${f?'สถานที่ที่พบ':'สถานที่ที่ทำหาย'}</span><span>${esc(it.place)}</span></div><div><span>${f?'วันที่พบ':'วันที่ทำหาย'}</span><span>${thd(it.date)}</span></div>
 ${f?`<div><span>สถานที่ฝาก</span><span>${esc(it.deposit)}</span></div><div><span>เจ้าหน้าที่รับฝาก</span><span>${esc(user(it.receivedBy)?.name||'-')}</span></div>${it.status!=='returned'?`<div><span>เก็บรักษาถึง</span><span>${thd(addDays(it.date,db.retention))}</span></div>`:''}`:''}
 ${it.detail&&!f?`<div><span>รายละเอียด</span><span>${esc(it.detail)}</span></div>`:''}</div>
 ${f?`<div class="note">${I.lock}<span>รายละเอียดที่ใช้ยืนยันความเป็นเจ้าของ เช่น สีและตำหนิ จะไม่แสดงในหน้านี้</span></div>`:''}
 ${!f?`<div class="note">${I.info}<span>หากพบสิ่งของนี้ ติดต่อผู้แจ้งได้ที่ ${esc(user(it.reporter)?.phone||'-')} หรือนำไปฝากที่ห้องกิจการนักศึกษา</span></div>`:''}
 ${mine&&f?`<div class="note">${I.info}<span>คุณเป็นผู้แจ้งรายการนี้ จึงยื่นขอรับคืนไม่ได้</span></div>`:''}
 ${pend?`<div class="note ok">${I.wait}<span>คุณยื่นคำขอรายการนี้แล้วเมื่อ ${thd(pend.date)} กำลังรอเจ้าหน้าที่ตรวจสอบ</span></div>`:''}</div>
 ${canClaim&&!pend?`<div class="ft"><button class="btn pri" type="button" data-a="toClaim">ยื่นคำขอรับของคืน</button></div>`:''}`};
V.claim=()=>{const it=item(cur().id),e=S.f.err||{},a=S.f;const imgs=a.cimgs||[];
 return H('ยื่นคำขอรับคืน')+`<div class="bd"><div class="item off" style="opacity:1">${thumb(it)}<span class="t"><b>${esc(it.name)}</b><small>ตอบคำถามเพื่อยืนยันว่าคุณเป็นเจ้าของ</small></span></div>
 <fieldset class="q${e.qc?' err':''}"><legend><span class="num">1</span>สีของสิ่งของ</legend>${grid(colorChips('qc',a.qc),3)}</fieldset>
 <fieldset class="q${e.qf?' err':''}"><legend><span class="num">2</span>ลักษณะเด่น <small>(เลือกได้หลายข้อ)</small></legend>${grid(FEATS.map(x=>chipC('qf',x,(a.qf||[]).includes(x))).join(''),2)}</fieldset>
 <fieldset class="q${e.qp?' err':''}"><legend><span class="num">3</span>สถานที่ที่คาดว่าทำหาย</legend>${grid(db.places.concat('อื่น ๆ').map(x=>chipR('qp',x,a.qp===x)).join(''),2)}</fieldset>
 <fieldset class="q${e.qr?' err':''}"><legend><span class="num">4</span>วันที่ทำหาย</legend>${dateBtn('qr',a.qr||'','qrL')}<span class="hint" id="qrL">เลือกวันที่คุณคิดว่าทำของหาย ระบบยอมรับคลาดเคลื่อนได้ไม่เกิน 3 วัน</span></fieldset>
 <fieldset class="q"><legend><span class="num">5</span>รูปถ่ายสิ่งของของคุณ <small>(ถ้ามี ไม่เกิน 3 รูป)</small></legend><div class="hint" style="margin-top:-4px">เช่น รูปเก่าที่เคยถ่ายไว้ หรือรูปที่เห็นสิ่งของชิ้นนี้ ช่วยให้เจ้าหน้าที่ตรวจสอบได้ง่ายขึ้น</div>
  <div class="strip" id="cStrip">${claimStrip(imgs)}</div><input type="file" id="cImg" accept="image/*" multiple hidden></fieldset>
 <div class="field"><label for="qn">หมายเหตุเพิ่มเติม <small>(ไม่บังคับ)</small></label><textarea class="fld" id="qn" placeholder="เช่น จุดสังเกตอื่นที่มีแต่เจ้าของรู้">${esc(a.qn||'')}</textarea></div></div>
 <div class="ft"><button class="btn" type="button" data-a="back">ยกเลิก</button><button class="btn pri" type="button" data-a="submitClaim">ส่งคำขอ</button></div>`};
function claimStrip(imgs){return imgs.map((s,k)=>`<div class="ph"><img src="${s}" alt="รูปที่แนบ ${k+1}"><button class="x" type="button" data-a="rmCImg" data-i="${k}" aria-label="ลบรูปที่ ${k+1}">${I.x}</button></div>`).join('')+(imgs.length<3?`<button class="up" type="button" data-a="pickCImg">${I.cam}<span>เพิ่มรูป</span></button>`:'')}
const ck=I.ok.replace('stroke-width="1.9"','stroke-width="3.4"'),cx=I.no.replace('stroke-width="1.9"','stroke-width="3.4"');
const steps=c=>{const it=item(c.item);const s1=`<div class="st done"><span class="dt">${ck}</span><div><b>ยื่นคำขอรับคืน</b><small>${thd(c.date)}${c.imgs?.length?` · แนบรูป ${c.imgs.length} รูป`:''}</small></div></div>`;
 if(c.status==='pending')return s1+`<div class="st now"><span class="dt"></span><div><b>เจ้าหน้าที่กำลังตรวจสอบ</b><small>เทียบคำตอบของคุณกับข้อมูลในระบบ</small></div></div><div class="st wait"><span class="dt"></span><div><b>แจ้งผลการตรวจสอบ</b><small>รอผล</small></div></div>`;
 const s2=`<div class="st done"><span class="dt">${ck}</span><div><b>ตรวจสอบแล้ว</b><small>โดย ${esc(user(c.verifiedBy)?.name||'เจ้าหน้าที่')}</small></div></div>`;
 return s1+s2+(c.status==='approved'?`<div class="st okd"><span class="dt">${ck}</span><div><b style="color:var(--ok)">อนุมัติแล้ว</b><small>ติดต่อรับของได้ที่ ${esc(it.deposit)} พร้อมบัตรนักศึกษาหรือบัตรบุคลากร</small></div></div>`
  :`<div class="st badd"><span class="dt">${cx}</span><div><b style="color:var(--bad)">ไม่อนุมัติ</b><small>เหตุผล: ${esc(c.reason)}</small></div></div>`)};
V.track=()=>{const L=db.claims.filter(c=>c.by===S.me.id).slice().reverse();
 return H('ติดตามสถานะ')+`<div class="bd">${L.length?L.map(c=>{const it=item(c.item);const done=c.status!=='pending';return `<details class="panel trk"${done?'':' open'}><summary><div style="display:flex;gap:12px;align-items:center">${thumb(it)}<div style="flex:1;min-width:0"><b style="font-weight:500">${esc(it.name)}</b><br><small class="hint">${esc(it.place)} · ยื่น ${thd(c.date)}</small></div><div class="sr">${pill(CLSTAT[c.status])}<span class="tg">${I.chev}</span></div></div></summary>
 <div class="tl">${steps(c)}</div></details>`}).join(''):empty('track','ยังไม่มีคำขอรับคืน')}</div>`};
V.pending=()=>{const L=db.claims.filter(c=>c.status==='pending');
 return H('คำขอรอตรวจสอบ')+`<div class="bd">${L.length?L.map(c=>{const it=item(c.item),m=match(c),u=user(c.by);return `<button class="item" type="button" data-go="verify" data-id="${c.id}">${thumb(it)}<span class="t"><b>${esc(it.name)}</b><small>${esc(u.name)} · ยื่น ${thd(c.date)}${c.imgs?.length?' · มีรูปแนบ':''}</small><span class="pill ${m.score>=3?'p-ok':m.score>=2?'p-wait':'p-bad'}">ตรง ${m.score}/4 ข้อ</span></span><span class="chev">${I.chev}</span></button>`}).join(''):empty('verify','ไม่มีคำขอที่รอตรวจสอบ')}</div>`};
V.verify=()=>{const c=db.claims.find(x=>x.id===cur().id),it=item(c.item),m=match(c),u=user(c.by);const col=m.score>=3?'var(--ok)':m.score>=2?'var(--wait)':'var(--bad)';
 const ci=c.imgs||[];
 return H('ตรวจสอบคำขอ')+`<div class="bd"><div class="item off" style="opacity:1">${thumb(it)}<span class="t"><b>${esc(it.name)}</b><small>ผู้ขอ ${esc(u.name)} (${u.id}) · ยื่น ${thd(c.date)}</small></span></div>
 <div class="meter"><div class="top"><span>คำตอบตรงกับข้อมูลในระบบ</span><b style="color:${col}">${m.score}/4</b></div><div class="bar"><i style="width:${m.score*25}%;background:${col}"></i></div></div>
 <div class="panel" style="padding:8px 12px"><table class="cmp"><thead><tr><th>คำถาม</th><th>ผู้ขอตอบ</th><th>ในระบบ</th><th></th></tr></thead><tbody>
 ${m.res.map(r=>`<tr><td>${r[0]}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td class="${r[3]?'y':'n'}">${r[3]?'✓ ตรง':'✗ ไม่ตรง'}</td></tr>`).join('')}</tbody></table></div>
 <div class="panel"><div class="ptitle">${I.photo}เทียบรูปภาพ</div><div class="cmpimg">
  <figure>${imgOf(it)?`<img src="${imgOf(it)}" alt="รูปในระบบ" data-a="zoom" tabindex="0" role="button">`:'<div class="noimg">ไม่มีรูปในระบบ</div>'}<figcaption>รูปที่บันทึกตอนรับฝาก</figcaption></figure>
  <figure>${ci.length?`<img src="${ci[0]}" alt="รูปจากผู้ขอ" data-a="zoom" tabindex="0" role="button">`:'<div class="noimg">ผู้ขอไม่ได้แนบรูป</div>'}<figcaption>รูปจากผู้ขอ${ci.length>1?` (1/${ci.length})`:''}</figcaption></figure></div>
  ${ci.length>1?`<div class="strip">${ci.slice(1).map(s=>`<div class="ph"><img src="${s}" alt="รูปจากผู้ขอ" data-a="zoom" tabindex="0" role="button"></div>`).join('')}</div>`:''}<span class="hint">แตะรูปเพื่อขยาย</span></div>
 ${c.note?`<div class="panel" style="gap:4px"><span class="hint">หมายเหตุจากผู้ขอ</span><span>${esc(c.note)}</span></div>`:''}
 <div class="field"><label for="vr">เหตุผล <small>(จำเป็นเมื่อปฏิเสธ)</small></label><input class="fld" id="vr" placeholder="เช่น คำตอบไม่ตรงกับลักษณะของสิ่งของ"></div>
 <div class="note">${I.info}<span>ก่อนส่งมอบของ ตรวจบัตรของผู้มารับให้ตรงกับผู้ยื่นคำขอ</span></div></div>
 <div class="ft"><button class="btn no" type="button" data-a="reject">${I.no}ปฏิเสธ</button><button class="btn ok" type="button" data-a="approve">${I.ok}อนุมัติ</button></div>`};
const repData=()=>{const m=+(S.f.m??8),y=+(S.f.y??2026);const inM=d=>{const x=new Date(d+'T00:00');return x.getMonth()===m&&x.getFullYear()===y};
 const L=db.items.filter(i=>inM(i.date)).sort((a,b)=>a.date.localeCompare(b.date));
 return {m,y,L,lost:L.filter(i=>i.type==='lost').length,found:L.filter(i=>i.type==='found').length,
  claims:db.claims.filter(c=>inM(item(c.item).date)),ret:L.filter(i=>i.status==='returned').length}};
V.report=()=>{const r=repData();
 return H('รายงานสรุปผล')+`<div class="bd"><div class="two"><select class="fld" id="rm" aria-label="เดือน">${MF().map((t,i)=>`<option value="${i}"${i===r.m?' selected':''}>${t}</option>`).join('')}</select><select class="fld" id="ry" aria-label="ปี">${[2025,2026].map(v=>`<option value="${v}"${v===r.y?' selected':''}>${v+YO()}</option>`).join('')}</select></div>
 <div class="stats"><div class="stat"><small>แจ้งของหาย</small><b>${r.lost}</b></div><div class="stat"><small>ของที่พบ</small><b>${r.found}</b></div><div class="stat"><small>คำขอรับคืน</small><b>${r.claims.length}</b></div><div class="stat"><small>คืนของแล้ว</small><b style="color:var(--ok)">${r.ret}</b></div></div>
 <div class="sec"><span>รายการในเดือน${MF()[r.m]}</span></div>${r.L.length?r.L.map(i=>`<button class="item" type="button" data-go="rdetail" data-id="${i.id}">${thumb(i)}<span class="t"><b>${esc(i.name)}</b><small>${i.type==='lost'?'ของหาย':'ของที่พบ'} · ${thd(i.date)}</small>${pill(stOf(i))}</span><span class="chev">${I.chev}</span></button>`).join(''):empty('report','ไม่มีรายการในเดือนนี้')}</div>
 <div class="ft"><button class="btn pri" type="button" data-a="export"${r.L.length?'':' disabled style="opacity:.5;cursor:not-allowed"'}>${I.xls}ส่งออกรายงาน</button></div>`};
V.rdetail=()=>{const it=item(cur().id),rep=user(it.reporter),rec=user(it.receivedBy);const cs=db.claims.filter(x=>x.item===it.id);
 return H('ข้อมูลรายการ')+`<div class="bd"><div class="item off" style="opacity:1">${thumb(it)}<span class="t"><b>${esc(it.name)}</b><small>${it.type==='lost'?'ของหาย':'ของที่พบ'} · ${esc(it.cat)} · ${thd(it.date)}</small>${pill(stOf(it))}</span></div>
 <div class="kv"><div><span>ผู้แจ้ง</span><span>${esc(rep.name)} (${rep.id})</span></div><div><span>เบอร์ติดต่อ</span><span>${esc(rep.phone)}</span></div><div><span>สถานที่</span><span>${esc(it.place)}</span></div>
 ${it.type==='found'?`<div><span>สถานที่ฝาก</span><span>${esc(it.deposit)}</span></div><div><span>เจ้าหน้าที่รับฝาก</span><span>${esc(rec?.name||'-')}</span></div>`:''}</div>
 <div class="sec"><span>คำขอรับคืน (${cs.length})</span></div>${cs.length?cs.map(c=>`<div class="panel" style="gap:4px"><div style="display:flex;justify-content:space-between;gap:8px"><b style="font-weight:500">${esc(user(c.by).name)}</b>${pill(CLSTAT[c.status])}</div><span class="hint">ยื่น ${thd(c.date)} · ตรง ${match(c).score}/4 ข้อ${c.verifiedBy?' · โดย '+esc(user(c.verifiedBy).name):''}</span></div>`).join(''):'<div class="hint">ยังไม่มีผู้ยื่นคำขอ</div>'}
 <div class="hint">ข้อมูลติดต่อใช้เพื่อติดตามสิ่งของเท่านั้น</div></div>`};
V.manage=()=>H('จัดการระบบ')+`<div class="bd"><div class="tiles">${tile('accounts','users','จัดการบัญชี','กำหนดบทบาทผู้ใช้')}${tile('perms','key','สิทธิ์การใช้งาน','เปิด/ปิดเมนูเจ้าหน้าที่')}${tile('settings','manage','ตั้งค่าทั่วไป','สถานที่ หมวดหมู่ ระยะเวลา','',true)}</div></div>`;
V.accounts=()=>{const g=r=>db.users.filter(u=>u.role===r).map(u=>`<div class="lrow"><div class="av" style="width:36px;height:36px">${u.role==='staff'?I.verify:I.users}</div><div class="t"><b style="font-weight:500">${esc(u.name)}</b><br><small class="hint">${u.id}</small></div><select class="rsel" data-role="${u.id}" aria-label="บทบาทของ ${esc(u.name)}"${u.id===S.me.id?' disabled':''}><option value="staff"${u.role==='staff'?' selected':''}>เจ้าหน้าที่</option><option value="user"${u.role==='user'?' selected':''}>ผู้ใช้ทั่วไป</option></select></div>`).join('');
 return H('จัดการบัญชีผู้ใช้')+`<div class="bd"><div class="sec"><span>เจ้าหน้าที่</span></div><div class="panel" style="padding:4px 14px;gap:0">${g('staff')}</div><div class="sec"><span>ผู้ใช้ทั่วไป</span></div><div class="panel" style="padding:4px 14px;gap:0">${g('user')}</div><div class="hint">เปลี่ยนบทบาทแล้วมีผลทันที บัญชีที่กำลังใช้งานเปลี่ยนเองไม่ได้</div></div>`};
V.perms=()=>H('สิทธิ์การใช้งาน')+`<div class="bd"><div class="hint">เลือกเมนูที่เจ้าหน้าที่ใช้งานได้</div><div class="panel" style="padding:4px 14px;gap:0">
 ${[['verify','ตรวจสอบคำขอ'],['report','ออกรายงาน'],['manage','จัดการระบบ']].map(([k,t])=>`<label class="lrow" for="pm-${k}"><span class="t">${t}</span><span class="switch"><input type="checkbox" id="pm-${k}"${db.perms[k]?' checked':''}${k==='manage'?' disabled':''}><i></i></span></label>`).join('')}</div>
 <div class="hint">เมนูจัดการระบบปิดไม่ได้ เพื่อไม่ให้เจ้าหน้าที่ล็อกตัวเองออกจากการตั้งค่า</div></div>
 <div class="ft"><button class="btn" type="button" data-a="back">ยกเลิก</button><button class="btn pri" type="button" data-a="savePerms">บันทึก</button></div>`;
V.settings=()=>{const tb=(k,arr,h)=>`<div class="panel" style="padding:4px 14px;gap:0">${arr.map((x,i)=>`<div class="lrow"><span class="t">${esc(x)}</span><button class="icb" type="button" data-a="editList" data-k="${k}" data-i="${i}" aria-label="แก้ไข ${esc(x)}">${I.pen}</button><button class="icb del" type="button" data-a="delList" data-k="${k}" data-i="${i}" aria-label="ลบ ${esc(x)}">${I.bin}</button></div>`).join('')||'<div class="hint" style="padding:10px 0">ยังไม่มีข้อมูล</div>'}</div>`;
 return H('ตั้งค่าทั่วไป')+`<div class="bd"><div class="sec"><span>สถานที่และจุดรับฝาก</span><button class="btn sm" type="button" data-a="addList" data-k="places">${I.plus}เพิ่ม</button></div>${tb('places',db.places)}
 <div class="sec"><span>หมวดหมู่สิ่งของ</span><button class="btn sm" type="button" data-a="addList" data-k="cats">${I.plus}เพิ่ม</button></div>${tb('cats',db.cats)}
 <div class="sec"><span>ระยะเวลาเก็บรักษาของ</span></div><div class="unit"><input class="fld" id="ret" type="number" min="1" value="${db.retention}" aria-label="ระยะเวลาเก็บรักษาของ (วัน)"><span>วัน</span></div><div class="hint" style="margin-top:-4px">ใช้คำนวณวันที่ “เก็บรักษาถึง” ในหน้ารายละเอียดของที่พบ</div></div>
 <div class="ft"><button class="btn" type="button" data-a="back">ยกเลิก</button><button class="btn pri" type="button" data-a="saveSettings">บันทึก</button></div>`};
