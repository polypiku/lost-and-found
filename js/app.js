/* Rendering, events and actions */
/* ---------- render ---------- */
const KEY='lostfound-db-v11';const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){}};
let DIR='';
function render(top){persist();const c=cur();const bd=$('#phone .bd'),st=bd&&!top?bd.scrollTop:0;
 const keep=top?null:[...document.querySelectorAll('#phone .scr input,#phone .scr select,#phone .scr textarea')].map(x=>[x.id,x.name,x.type,x.value,x.checked]);
 $('#phone').innerHTML=`<div class="scr ${DIR}">${V[c.s]()}${nav()}</div>`+M(S.modal);DIR='';const nb=$('#phone .bd');if(nb)nb.scrollTop=st;
 if(keep)keep.forEach(([id,nm,ty,v,ch])=>{if(ty==='radio'||ty==='checkbox'){const x=nm&&document.querySelector(`#phone .scr input[name="${nm}"][value="${CSS.escape(v)}"]`);if(x)x.checked=ch}else if(id&&ty!=='file'){const x=document.getElementById(id);if(x&&x.closest('.scr')){x.value=v;const b=document.querySelector(`[data-a=cal][data-t="${id}"] span`);if(b&&v)b.textContent=thLong(v)}}});
 $$('#phone [data-a=pick]').forEach(b=>{const v=$('#'+b.dataset.t)?.value;const sp=b.querySelector('span');if(v){sp.textContent=placeLbl(v);sp.className=''}});
 const f=$('#phone .ov input, #phone .ov .btn.pri, #phone .ov .opt');if(f)f.focus()}
const val=id=>($('#'+id)?.value||'').trim();

const P=$('#phone');
P.addEventListener('submit',e=>{e.preventDefault();if(e.target.id!=='fLogin')return;
 const u=val('lu'),p=val('lp');S.f.lu=u;S.f.lp=p;
 if(S.lockUntil&&Date.now()<S.lockUntil)return modal({title:'ลองใหม่ภายหลัง',icon:'no',msg:'กรอกรหัสผิดหลายครั้ง กรุณารอ '+Math.ceil((S.lockUntil-Date.now())/1000)+' วินาที'});
 if(!u||!p)return modal({title:'เข้าสู่ระบบไม่สำเร็จ',icon:'no',msg:'กรุณากรอกรหัสผู้ใช้และรหัสผ่าน'});
 const x=user(u);if(!x||x.pw!==p){S.fails=(S.fails||0)+1;if(S.fails>=5){S.fails=0;S.lockUntil=Date.now()+30000;return modal({title:'ลองใหม่ภายหลัง',icon:'no',msg:'กรอกรหัสผิด 5 ครั้ง กรุณารอ 30 วินาทีแล้วลองใหม่'})}return modal({title:'เข้าสู่ระบบไม่สำเร็จ',icon:'no',msg:'รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (ลองได้อีก '+(5-S.fails)+' ครั้ง)'})}
 S.fails=0;S.me=x;home()});
P.addEventListener('input',e=>{const t=e.target;
 if(t.id==='sq'){S.f.q=t.value;$('#res').innerHTML=searchResults()}
 if(t.id==='qn')S.f.qn=t.value;
 if(t.classList.contains('err')){t.classList.remove('err')}});
P.addEventListener('change',e=>{const t=e.target;
 if(t.closest&&t.closest('.colsel')){const d=t.parentNode.querySelector('.dot');if(d)d.style.background=t.value?CLR(t.value):'#fff';t.closest('.colsel').classList.remove('err')}
 if((t.id==='iImg'||t.id==='cImg')&&t.files.length){const bad=[...t.files].find(f=>!/^image\//.test(f.type)||f.size>10*1024*1024);if(bad){t.value='';return modal({title:'ไฟล์ไม่ถูกต้อง',icon:'no',msg:/^image\//.test(bad.type)?'รูปต้องมีขนาดไม่เกิน 10 MB':'กรุณาเลือกไฟล์รูปภาพ (JPG, PNG)'})}}
 if(t.id==='iCat'){S.f.iCat=t.value;render();return}
 if(t.id==='iDep'){const h=$('#iDepH'),d=depotOf(t.value);if(h)h.textContent=d?'เวลาทำการ: '+d.hours:'';}
 if(t.id==='cOk'){S.f.cok=t.checked;t.closest('.consent')?.classList.remove('err');return}
 if(t.id==='iOk'){t.closest('.consent')?.classList.remove('err');return}
 if(t.id==='iImg'&&t.files[0]){shrink(t.files[0],d=>{S.f.img=d;refreshPhoto()});t.value='';return}
 if(t.id==='cImg'&&t.files.length){const fs=[...t.files].slice(0,3-(S.f.cimgs||[]).length);fs.forEach(f=>shrink(f,d=>{S.f.cimgs=(S.f.cimgs||[]).concat(d).slice(0,3);$('#cStrip').innerHTML=claimStrip(S.f.cimgs)}));t.value='';return}
 if(t.name==='sc'){S.f.c=t.value;$('#res').innerHTML=searchResults();return}
 if(t.name==='qc'||t.name==='qp'){S.f[t.name]=t.value;t.closest('.q')?.classList.remove('err');return}
 if(t.name==='qf'){S.f.qf=$$('input[name=qf]:checked').map(x=>x.value);t.closest('.q')?.classList.remove('err');return}
 if(t.id==='qr'){S.f.qr=t.value;t.closest('.q')?.classList.remove('err');return}
 if(t.id==='rm'){S.f.m=t.value;render()} if(t.id==='ry'){S.f.y=t.value;render()}
 if(t.dataset.role){const u=user(t.dataset.role),r=t.value,[ro,gr]=r.split(':');if(u.role==='staff'&&u.group==='admin'&&gr!=='admin'&&db.users.filter(x=>x.role==='staff'&&x.group==='admin').length<2){render();return modal({title:'เปลี่ยนไม่ได้',icon:'no',msg:'ต้องมีหัวหน้างานอย่างน้อย 1 คน'})}modal({kind:'confirm',title:'เปลี่ยนบทบาท?',icon:'b',msg:`เปลี่ยน ${esc(u.name)} เป็น “${ro==='staff'?gName(gr):'ผู้ใช้ทั่วไป'}”`,btn:'เปลี่ยนบทบาท',act:'doRole'});S.modal.uid=u.id;S.modal.role=ro;S.modal.group=gr}});
P.addEventListener('click',e=>{const b=e.target.closest('[data-go],[data-a]');if(!b)return;
 if(b.dataset.a==='ovClose'&&e.target!==b)return;
 if(b.dataset.go){return go(b.dataset.go,{id:b.dataset.id})}
 const a=b.dataset.a;
 const A={
  back,home,toHome:home,
  lang:()=>{LANG=b.dataset.v;try{localStorage.setItem('lf-lang',LANG)}catch(e){}document.documentElement.lang=LANG;S.f.lu=val('lu');S.f.lp=val('lp');render();drawSpring()},
  cal:()=>openCal(b.dataset.t),
  pick:()=>openPick(b),
  clearF:()=>{S.f.sp='';S.f.df='';S.f.dt='';render()},
  readAll:()=>{myNotifs().forEach(n=>{if(!n.readBy.includes(S.me.id))n.readBy.push(S.me.id)});render()},
  openN:()=>{const n=db.notifs.find(x=>x.id===b.dataset.id);if(!n.readBy.includes(S.me.id))n.readBy.push(S.me.id);const g=n.go||{};if(g.s==='verify'&&!db.claims.some(c=>c.id===g.id&&ACTIVE.includes(c.status)))return go('pending');if(g.s==='track'||g.s==='pending'){S.stack=[{s:S.me.role==='staff'?'shome':'home'},{s:g.s}];S.f={};DIR='fwd';return render(true)}if(g.s)return go(g.s,{id:g.id});render()},
  notifyOwner:()=>modal({kind:'owner'}),
  doNotifyOwner:()=>{const id=val('oId'),u=user(id),it=item(cur().id);if(!u){$('#oId').classList.add('err');return toast('ไม่พบบัญชีรหัสนี้')}
   notify(u.id,`มีของที่อาจเป็นของคุณ: “${it.name}” รับได้ที่ ${it.deposit} กรุณายื่นคำขอรับคืนเพื่อยืนยันตัวตน`,{s:'detail',id:it.id});logAct('แจ้งเจ้าของ',`${it.name} (${it.code}) → ${u.name}`);S.modal=null;render();toast('ส่งแจ้งเตือนถึง '+u.name+' แล้ว')},
  dispose:()=>modal({kind:'dispose'}),
  doDispose:()=>{const a=$('input[name=dsp]:checked')?.value;if(!a)return toast('กรุณาเลือกวิธีจัดการ');const it=item(cur().id);it.status='disposed';it.disposal={action:a,note:val('dNote'),by:S.me.id,at:nowStr()};logAct('จัดการของเกินกำหนด',`${it.name} (${it.code}) · ${a}`);S.modal=null;render();toast('บันทึกการจัดการแล้ว')},
  label:()=>printLabel(item(cur().id)),
  handover:()=>{if(!$('#hOk').checked){$('#hOkBox').classList.add('err');return toast('กรุณาตรวจบัตรและติ๊กยืนยันก่อน')}
   if($('#hCnt')&&!$('#hCnt').checked){$('#hCntBox').classList.add('err');return toast('กรุณานับเงินต่อหน้าผู้รับและติ๊กยืนยัน')}
   const c=db.claims.find(x=>x.id===cur().id),it=item(c.item),n=new Date();c.status='collected';c.handedBy=S.me.id;c.handedAt=today()+' '+String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0');c.idChecked=true;it.status='returned';notify(c.by,`รับ “${it.name}” เรียบร้อยแล้ว ขอบคุณที่ใช้บริการ`,{s:'track'});if(isMoney(it))c.counted=true;logAct(isMoney(it)?'ส่งมอบเงิน':'ส่งมอบของ',`${it.name} (${it.code||''})${isMoney(it)?' '+baht(it.secret?.amount):''} ให้ ${user(c.by).name}`);
   S.stack=[{s:'shome'},{s:'pending'}];modal({title:'ส่งมอบเรียบร้อย',icon:'ok',msg:`บันทึกการคืน ${esc(it.name)} (${esc(it.code||'')})<br>ให้ ${esc(user(c.by).name)} แล้ว`,btn:'กลับไปรายการคำขอ'})},
  tab:()=>{const v=b.dataset.v,h=S.me.role==='staff'?'shome':'home';if(cur().s===v)return;S.stack=v===h?[{s:h}]:[{s:h},{s:v}];S.f={};S.modal=null;DIR='fade';render(true)},mClose:()=>{S.modal=null;render()},ovClose:()=>{S.modal=null;render()},
  signout:()=>modal({kind:'confirm',title:'ออกจากระบบ',icon:'b',msg:'ต้องการออกจากระบบใช่หรือไม่',btn:'ออกจากระบบ',act:'doSignout'}),
  doSignout:()=>{S.me=null;S.stack=[{s:'login'}];S.modal=null;S.f={};render(true)},
  togglePw:()=>{const p=$('#lp');p.type=p.type==='password'?'text':'password';b.setAttribute('aria-label',p.type==='password'?'แสดงรหัสผ่าน':'ซ่อนรหัสผ่าน');b.innerHTML=p.type==='password'?I.eyeoff:I.eye},
  fillDemo:()=>{$('#lu').value=b.dataset.u;$('#lp').value='1234'},
  pickPhoto:()=>$('#iImg')?.click(),
  rmPhoto:()=>{S.f.img='';refreshPhoto()},
  pickCImg:()=>$('#cImg')?.click(),
  rmCImg:()=>{S.f.cimgs.splice(+b.dataset.i,1);$('#cStrip').innerHTML=claimStrip(S.f.cimgs)},
  zoom:()=>{const z=document.createElement('div');z.className='zoom';z.innerHTML=`<img src="${b.src}" alt="${esc(b.alt)}">`;z.onclick=()=>z.remove();P.appendChild(z)},
  repF:()=>{S.f.rf=b.dataset.v;render();$('#repList')?.scrollIntoView({block:'start',behavior:'smooth'})},
  setT:()=>{S.f.t=b.dataset.v;const q=S.f.q,c=S.f.c;render();const n=$('#sq');if(n&&q){n.value=q}},
  saveItem:()=>saveItem(b.dataset.k),
  saveEdit:()=>saveItem(null,item(cur().id)),
  toClaim:()=>{const it=item(cur().id);
   if(it.status!=='waiting'||db.claims.some(c=>c.item===it.id&&c.status==='collected'))return modal({title:'ทำรายการไม่ได้',icon:'no',msg:'รายการนี้ถูกดำเนินการคืนของแล้ว',btn:'กลับหน้าหลัก',act:'toHome'});
   if(claimBlock(it))return modal({title:'มีผู้ยื่นคำขอแล้ว',icon:'wait',msg:'รายการนี้กำลังรอเจ้าหน้าที่ตรวจสอบคำขอของผู้อื่น<br>หากคำขอนั้นไม่ได้รับอนุมัติ คุณจะยื่นคำขอได้'});
   go('claim',{id:it.id})},
  submitClaim:()=>{const it=item(cur().id),f=S.f;f.qn=val('qn');f.qr=val('qr');if(isMoney(it))return submitMoney(it,f);
   const err={qc:!f.qc,qf:!(f.qf||[]).length,qp:!f.qp,qr:!f.qr,ok:!$('#cOk')?.checked};f.cok=!err.ok;
   if(pendingOther(it))return modal({title:'มีผู้ยื่นคำขอแล้ว',icon:'wait',msg:'รายการนี้มีคำขอของผู้อื่นรอตรวจสอบอยู่'});
   if(Object.values(err).some(Boolean)){S.f.err=err;render();const first=$('#phone .q.err');first?.scrollIntoView({block:'center'});return modal({title:'ตอบคำถามไม่ครบ',icon:'no',msg:Object.entries(err).every(([k,v])=>k==='ok'||!v)?'กรุณายืนยันและให้ความยินยอมก่อนส่งคำขอ':'กรุณาตอบข้อที่มีกรอบสีแดงให้ครบ',btn:'กลับไปตอบ'})}
   notify('staff',`มีคำขอรับคืนใหม่: “${it.name}” จาก ${S.me.name}`,{s:'verify',id:'C'+db.seq});
   db.claims.push({id:'C'+(db.seq++),item:it.id,by:S.me.id,date:today(),ans:{color:f.qc,feats:f.qf,place:f.qp,date:f.qr},note:f.qn,imgs:f.cimgs||[],status:'pending'});
   S.stack=[{s:'home'}];S.f={};modal({title:'ส่งคำขอแล้ว',icon:'wait',msg:'เจ้าหน้าที่จะตรวจสอบคำตอบ'+((f.cimgs||[]).length?'และรูปที่แนบ':'')+'<br>ติดตามผลได้ที่เมนู “ติดตามสถานะ”',btn:'ไปที่ติดตามสถานะ',act:'toTrack'})},
  toTrack:()=>{S.stack=[{s:'home'},{s:'track'}];S.modal=null;render(true)},
  hold:()=>{const r=val('vr');if(!r){const x=$('#vr');x.classList.add('err');x.focus();x.scrollIntoView({block:'center'});return toast('กรุณาระบุสิ่งที่ต้องตรวจสอบเพิ่มเติม')}
   const c=db.claims.find(x=>x.id===cur().id),it=item(c.item);c.status='review';c.holdReason=r;c.heldBy=S.me.id;notify(c.by,`คำขอรับคืน “${it.name}” ต้องตรวจสอบเพิ่มเติม: ${r}`,{s:'track'});logAct('ขอตรวจสอบเพิ่มเติม',`${it.name} (${it.code||''}) · ${user(c.by).name} · ${r}`);
   S.stack=[{s:'shome'},{s:'pending'}];modal({title:'เปลี่ยนสถานะเป็นรอตรวจสอบเพิ่มเติม',icon:'wait',msg:'แจ้งผู้ขอแล้ว เมื่อได้หลักฐานครบ เปิดคำขอนี้อีกครั้งเพื่ออนุมัติหรือปฏิเสธ',btn:'กลับไปรายการคำขอ'})},
  approve:()=>{const vm=$('#vMulti'),ve=$('#vEvOk');if(vm&&!vm.checked){$('#vMultiBox').classList.add('err');$('#vMultiBox').scrollIntoView({block:'center'});return toast('มีผู้ขอหลายคน กรุณาตรวจสอบเปรียบเทียบก่อน')}
   if(ve&&(!ve.checked||!val('vEv'))){$('#vEvBox').classList.add('err');$('#vEvBox').scrollIntoView({block:'center'});return toast('เงินจำนวนมาก กรุณาเลือกและตรวจหลักฐานก่อนอนุมัติ')}
   S.f.ev=val('vEv');S.f.multi=!!vm;A.approve0()},
  approve0:()=>modal({kind:'confirm',title:'อนุมัติคำขอนี้?',icon:'ok',msg:'ระบบจะแจ้งผู้ขอให้มารับของ สถานะของจะเปลี่ยนเป็น “คืนแล้ว” เมื่อยืนยันส่งมอบ',btn:'อนุมัติ',cls:'ok',act:'doApprove'}),
  doApprove:()=>{const c=db.claims.find(x=>x.id===cur().id);c.status='approved';c.verifiedBy=S.me.id;if(S.f.ev)c.evidence=S.f.ev;if(S.f.multi)c.multiChecked=true;{const it=item(c.item),m=match(c);notify(c.by,`คำขอรับคืน “${it.name}” ได้รับอนุมัติ มารับของได้ที่ ${it.deposit} พร้อมบัตรนักศึกษาหรือบัตรบุคลากร`,{s:'track'});logAct(isMoney(it)?'อนุมัติคำขอรับเงิน':'อนุมัติคำขอ',`${it.name}${it.code?' ('+it.code+')':''} · ${user(c.by).name} · ตรง ${m.score}/${m.total}${c.evidence?' · หลักฐาน: '+c.evidence:''}${c.multiChecked?' · เทียบผู้ขอหลายคนแล้ว':''}`)}
   db.claims.filter(x=>x.item===c.item&&x.id!==c.id&&ACTIVE.includes(x.status)).forEach(x=>{x.status='rejected';x.verifiedBy=S.me.id;x.reason='เจ้าหน้าที่ยืนยันเจ้าของรายการนี้แล้ว';notify(x.by,`คำขอรับคืน “${item(x.item).name}” ไม่ได้รับอนุมัติ เหตุผล: ${x.reason}`,{s:'track'})});
   S.stack=[{s:'shome'},{s:'pending'}];modal({title:'อนุมัติสำเร็จ',icon:'ok',msg:'แจ้งผู้ขอให้มารับของแล้ว<br>เมื่อเจ้าของมารับ กด “ยืนยันส่งมอบ” ในรายการ “รอมารับของ”',btn:'กลับไปรายการคำขอ'})},
  reject:()=>{const r=val('vr');if(!r){const x=$('#vr');x.classList.add('err');x.focus();x.scrollIntoView({block:'center'});return toast('กรุณากรอกเหตุผลก่อนปฏิเสธ')}
   const c=db.claims.find(x=>x.id===cur().id);c.status='rejected';c.verifiedBy=S.me.id;c.reason=r;notify(c.by,`คำขอรับคืน “${item(c.item).name}” ไม่ได้รับอนุมัติ เหตุผล: ${r}`,{s:'track'});logAct('ปฏิเสธคำขอ',`${item(c.item).name} · ${user(c.by).name} · ${r}`);
   S.stack=[{s:'shome'},{s:'pending'}];modal({title:'ปฏิเสธคำขอแล้ว',icon:'no',msg:'แจ้งเหตุผลให้ผู้ขอทราบแล้ว',btn:'กลับไปรายการคำขอ'})},
  export:()=>modal({kind:'export'}),expCSV,expPDF,
  savePerms:()=>{const old=JSON.stringify(db.gperms),ch=[];GROUPS.forEach(([g])=>{const nw=PERMS.map(p=>p[0]).filter(k=>$(`#pm-${g}-${k}`)?.checked||(g==='admin'&&k==='accounts'));const was=db.gperms[g]||[];PERMS.forEach(([k,t])=>{if(was.includes(k)!==nw.includes(k))ch.push(`${gName(g)}: ${t} ${nw.includes(k)?'เปิด':'ปิด'}`)});db.gperms[g]=nw});
   const sep=$('#rl-sep').checked;if(!!db.rules?.sepMoney!==sep)ch.push('แยกผู้อนุมัติกับผู้ส่งมอบเงิน '+(sep?'เปิด':'ปิด'));db.rules={...(db.rules||{}),sepMoney:sep};if(ch.length)logAct('แก้สิทธิ์การใช้งาน',ch.join(', '));back();toast('บันทึกสิทธิ์แล้ว')},
  saveSettings:()=>{{const bg=$('#bigAmt'),bv=parseInt(bg?bg.value:(S.f.big??bigAmt()));if(!(bv>0)){if(bg)bg.classList.add('err');else{S.f.sOpen='big';render()}return toast('เกณฑ์เงินต้องมากกว่า 0 บาท')}if(bigAmt()!==bv)logAct('แก้เกณฑ์เงินจำนวนมาก',baht(bigAmt())+' → '+baht(bv));db.bigAmt=bv}const re=$('#ret'),n=parseInt(re?re.value:(S.f.ret??db.retention));if(!(n>0)){if(re)re.classList.add('err');else{S.f.sOpen='ret';render()}return toast('ระยะเวลาต้องมากกว่า 0 วัน')}if(db.retention!==n)logAct('แก้ระยะเวลาเก็บรักษา',db.retention+' → '+n+' วัน');db.retention=n;back();toast('บันทึกการตั้งค่าแล้ว')},
  sTog:()=>{const k=b.dataset.k;{const g=document.getElementById('bigAmt');if(g)S.f.big=g.value}if(S.f.sOpen==='ret'||k==='ret'){const r=document.getElementById('ret');if(r)S.f.ret=r.value}S.f.sOpen=S.f.sOpen===k?'':k;render()},
 addList:()=>b.dataset.k==='depots'?modal({kind:'input2',title:'เพิ่มจุดรับฝาก',k:'depots',i:-1}):modal({kind:'input',title:b.dataset.k==='places'?'เพิ่มสถานที่':'เพิ่มหมวดหมู่',ph:b.dataset.k==='places'?'ชื่อสถานที่':'ชื่อหมวดหมู่',k:b.dataset.k,i:-1}),
  editList:()=>{const k=b.dataset.k,i=+b.dataset.i;if(k==='depots')return modal({kind:'input2',title:'แก้ไขจุดรับฝาก',k,i,val:db.depots[i].name,val2:db.depots[i].hours});modal({kind:'input',title:k==='places'?'แก้ไขสถานที่':'แก้ไขหมวดหมู่',val:db[k][i],k,i})},
  delList:()=>{const k=b.dataset.k,i=+b.dataset.i;const nm=k==='depots'?db.depots[i].name:db[k][i];const inUse=db.items.some(it=>k==='places'?it.place===nm:k==='depots'?it.deposit===nm:it.cat===nm);
   if(inUse)return modal({title:'ลบไม่ได้',icon:'no',msg:'มีรายการที่ใช้ข้อมูลนี้อยู่ แก้ไขชื่อแทนการลบ'});
   modal({kind:'confirm',title:'ลบ “'+nm+'”?',icon:'no',msg:'ลบแล้วกู้คืนไม่ได้',btn:'ลบ',cls:'no',act:'doDel'});S.modal.k=k;S.modal.i=i},
  doRole:()=>{const m=S.modal,u=user(m.uid);u.role=m.role;if(m.group)u.group=m.group;else delete u.group;logAct('เปลี่ยนบทบาท',`${u.name} → ${m.role==='staff'?gName(m.group):'ผู้ใช้ทั่วไป'}`);S.modal=null;render();toast('เปลี่ยนบทบาทของ '+u.name+' แล้ว')},
  gotBack:()=>modal({kind:'confirm',title:'ได้ของคืนแล้ว?',icon:'ok',msg:'ระบบจะปิดการแจ้งของหายรายการนี้ และเปลี่ยนสถานะเป็น “ได้คืนแล้ว”',btn:'ยืนยัน',cls:'ok',act:'doGotBack'}),
  doGotBack:()=>{item(cur().id).status='returned';S.stack=[{s:'home'},{s:'mine'}];S.modal=null;render(true);toast('ปิดการแจ้งของหายแล้ว')},
  doDel:()=>{const m=S.modal;logAct('ลบข้อมูลตั้งค่า',m.k==='depots'?db.depots[m.i].name:db[m.k][m.i]);db[m.k].splice(m.i,1);S.modal=null;render();toast('ลบแล้ว')},
  mConfirm:()=>{const m=S.modal,v=val('mIn');if(!v){$('#mIn').classList.add('err');return}
   if(m.k==='depots'){const h=val('mIn2')||'-';if(db.depots.some((x,j)=>x.name===v&&j!==m.i)){$('#mIn').classList.add('err');return toast('มีชื่อนี้อยู่แล้ว')}
    logAct(m.i<0?'เพิ่มจุดรับฝาก':'แก้จุดรับฝาก',v+' · '+h);if(m.i<0)db.depots.push({name:v,hours:h});else{const old=db.depots[m.i].name;db.depots[m.i]={name:v,hours:h};db.items.forEach(it=>{if(it.deposit===old)it.deposit=v})}S.modal=null;render();return toast('บันทึกแล้ว')}
   if(db[m.k].some((x,j)=>x===v&&j!==m.i)){$('#mIn').classList.add('err');return toast('มีชื่อนี้อยู่แล้ว')}
   if(m.i<0)db[m.k].push(v);else{const old=db[m.k][m.i];db[m.k][m.i]=v;db.items.forEach(it=>{if(m.k==='places'&&it.place===old)it.place=v;if(m.k==='cats'&&it.cat===old)it.cat=v})}
   logAct(m.i<0?'เพิ่มข้อมูลตั้งค่า':'แก้ข้อมูลตั้งค่า',v);S.modal=null;render();toast('บันทึกแล้ว')}
 };
 A[a]&&A[a]();});
function submitMoney(it,f){const ans={amount:val('qa'),notes:$$('input[name=qnt]:checked').map(x=>x.value),box:val('qb'),place:f.qp||'',date:val('qr'),slot:val('qs')};
 const n=[ans.amount,ans.notes.length,ans.box,ans.place,ans.date,ans.slot].filter(Boolean).length,ok=$('#cOk')?.checked;f.cok=ok;
 if(claimBlock(it))return modal({title:'ทำรายการไม่ได้',icon:'no',msg:'เจ้าหน้าที่ยืนยันเจ้าของรายการนี้แล้ว'});
 if(!n){S.f.err={any:1};$('#phone .q')?.classList.add('err');return modal({title:'ยังไม่ได้ตอบคำถาม',icon:'no',msg:'กรุณาตอบอย่างน้อย 1 ข้อที่จำได้',btn:'กลับไปตอบ'})}
 if(!ok){$('#cOkBox').classList.add('err');return modal({title:'ยังไม่ได้ยืนยัน',icon:'no',msg:'กรุณายืนยันและให้ความยินยอมก่อนส่งคำขอ',btn:'กลับไปแก้ไข'})}
 const id='C'+(db.seq++),others=db.claims.filter(c=>c.item===it.id&&ACTIVE.includes(c.status));
 db.claims.push({id,item:it.id,by:S.me.id,date:today(),ans,note:val('qn'),imgs:f.cimgs||[],status:'pending'});
 notify('staff',`มีคำขอรับเงินคืนใหม่: “${it.name}” (${it.code}) จาก ${S.me.name}`,{s:'verify',id});
 if(others.length)notify('staff',`มีผู้ขอรับ${it.name} (${it.code}) มากกว่า 1 คน ต้องตรวจสอบเปรียบเทียบก่อนอนุมัติ`,{s:'verify',id});
 S.stack=[{s:'home'}];S.f={};modal({title:'ส่งคำขอแล้ว',icon:'wait',msg:'เจ้าหน้าที่จะตรวจสอบคำตอบ'+((f.cimgs||[]).length?'และหลักฐาน':'')+'<br>อาจขอให้นำหลักฐานมาแสดงเพิ่ม ติดตามผลได้ที่ “ติดตามสถานะ”',btn:'ไปที่ติดตามสถานะ',act:'toTrack'})}
function saveItem(kind,it){const found=kind==='found'||it?.type==='found';
 const mo=val('iCat')===MONEY,mon={amount:val('mAmt'),notes:$$('input[name=mN]:checked').map(x=>x.value),box:val('mBox'),slot:val('mSlot')};
 const name=val('iName')||(mo?MONEY:''),date=val('iDate'),color=val('iColor'),feats=$$('input[name=iF]:checked').map(x=>x.value);
 const dep=found?val('iDep'):'',stf=found?val('iStaff'):'';
 const bad=[['iOkBox',!it&&!!$('#iOk')&&!$('#iOk').checked],['iName',!name],['iPlace',!val('iPlace')],['iDate',!date||date>today()]].concat(mo?[['mAmt',!(+mon.amount>0)]]:[]).concat(found?(mo?[]:[['iColorBox',!color],['iFBox',!feats.length]]).concat([['iDep',!dep],['iStaff',!stf]]):[]);
 bad.forEach(([id,b])=>{const el=id==='iDate'?$('[data-t=iDate]'):$('#'+id);el?.classList.toggle('err',b)});
 if(bad.some(x=>x[1])){$('#phone .err')?.scrollIntoView({block:'center'});return modal({title:'ข้อมูลไม่ครบ',icon:'no',msg:'กรุณากรอกช่องที่มีกรอบสีแดงให้ครบ'+(date>today()?'<br>วันที่ต้องไม่เกินวันนี้':'')+(!it&&$('#iOk')&&!$('#iOk').checked?'<br>และกดยินยอมการเก็บข้อมูล':''),btn:'กลับไปแก้ไข'})}
 const data={name,cat:val('iCat'),place:val('iPlace'),date,detail:val('iDetail')};mon.amount=+mon.amount||'';if(!found)data.money=mo?mon:undefined;if(found){data.secret=mo?mon:{color,feats};data.deposit=dep;data.receivedBy=stf;if($('#bName')&&(val('bName')||val('bPhone')))data.bringer={name:val('bName'),phone:val('bPhone')}}
 if(S.f.img!==undefined)data.img=S.f.img;
 if(it){if(data.img==='')delete it.img;Object.assign(it,data);S.stack=[{s:S.me.role==='staff'?'shome':'home'},{s:'mine'}];S.f={};return modal({title:'บันทึกการแก้ไขแล้ว',icon:'ok',msg:'ข้อมูลรายการถูกอัปเดตแล้ว'})}
 const code=newCode(),nit={id:'I'+(db.seq++),code,type:kind,reporter:S.me.id,status:'waiting',...data};db.items.push(nit);
 if(kind==='found'){db.items.filter(x=>x.type==='lost'&&matchesFor(x).includes(nit)).forEach(x=>notify(x.reporter,`อาจพบของที่คุณแจ้งหาย: “${nit.name}” ตรงกับ “${x.name}”`,{s:'detail',id:x.id}));if(S.me.role==='staff')logAct('รับฝากของ',`${nit.name} (${code})`)}
 if(kind==='lost'&&mo){const d=dupMoney(nit);if(d.length){notify('staff',`มีผู้แจ้งเงินหายซ้ำกัน ${d.length+1} รายการ ที่ ${nit.place} วันที่ ${thd(nit.date)} กรุณาตรวจสอบก่อนอนุมัติคำขอรับเงิน`,{s:'rdetail',id:nit.id});logAct('พบการแจ้งเงินหายซ้ำ',`${nit.place} · ${thd(nit.date)} · ${d.length+1} รายการ`)}}
 S.f={};modal({title:kind==='lost'?'แจ้งของหายสำเร็จ':'บันทึกของที่พบสำเร็จ',icon:'ok',msg:kind==='lost'?'ระบบบันทึกการแจ้งของหายแล้ว<br>ดูหรือแก้ไขได้ที่ “รายการบันทึก”':S.me.role==='staff'?`รหัสรายการ <b>${code}</b><br>พิมพ์ป้ายติดของได้ที่หน้ารายงาน → ข้อมูลรายการ`:`รหัสรายการ <b>${code}</b><br>ขอบคุณที่ช่วยเหลือ กรุณานำของไปฝากตามจุดที่เลือก`,btn:'กลับหน้าหลัก',act:'toHome'})}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const cv=$('#phone .ov .cal');if(cv)return cv.closest('.ov').remove();const z=$('.zoom');if(z)return z.remove();if(S.modal){S.modal=null;render()}}
 if((e.key==='Enter'||e.key===' ')&&e.target.matches('img[data-a=zoom]')){e.preventDefault();e.target.click()}});
seed();try{const d=JSON.parse(localStorage.getItem(KEY)||'null');if(d&&d.items)db=d}catch(e){}
render(true);
