/* Rendering, events and actions */
/* ---------- render ---------- */
const KEY='lostfound-db-v7';const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){}};
let DIR='';
function render(top){persist();const c=cur();const bd=$('#phone .bd'),st=bd&&!top?bd.scrollTop:0;
 const keep=top?null:[...document.querySelectorAll('#phone .scr input,#phone .scr select,#phone .scr textarea')].map(x=>[x.id,x.name,x.type,x.value,x.checked]);
 $('#phone').innerHTML=`<div class="scr ${DIR}">${V[c.s]()}${nav()}</div>`+M(S.modal);DIR='';const nb=$('#phone .bd');if(nb)nb.scrollTop=st;
 if(keep)keep.forEach(([id,nm,ty,v,ch])=>{if(ty==='radio'||ty==='checkbox'){const x=nm&&document.querySelector(`#phone .scr input[name="${nm}"][value="${CSS.escape(v)}"]`);if(x)x.checked=ch}else if(id&&ty!=='file'){const x=document.getElementById(id);if(x&&x.closest('.scr')){x.value=v;const b=document.querySelector(`[data-a=cal][data-t="${id}"] span`);if(b&&v)b.textContent=thLong(v)}}});
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
 if(t.id==='cOk'){S.f.cok=t.checked;t.closest('.consent')?.classList.remove('err');return}
 if(t.id==='iOk'){t.closest('.consent')?.classList.remove('err');return}
 if(t.id==='iImg'&&t.files[0]){shrink(t.files[0],d=>{S.f.img=d;refreshPhoto()});t.value='';return}
 if(t.id==='cImg'&&t.files.length){const fs=[...t.files].slice(0,3-(S.f.cimgs||[]).length);fs.forEach(f=>shrink(f,d=>{S.f.cimgs=(S.f.cimgs||[]).concat(d).slice(0,3);$('#cStrip').innerHTML=claimStrip(S.f.cimgs)}));t.value='';return}
 if(t.name==='sc'){S.f.c=t.value;$('#res').innerHTML=searchResults();return}
 if(t.name==='qc'||t.name==='qp'){S.f[t.name]=t.value;t.closest('.q')?.classList.remove('err');return}
 if(t.name==='qf'){S.f.qf=$$('input[name=qf]:checked').map(x=>x.value);t.closest('.q')?.classList.remove('err');return}
 if(t.id==='qr'){S.f.qr=t.value;t.closest('.q')?.classList.remove('err');return}
 if(t.id==='rm'){S.f.m=t.value;render()} if(t.id==='ry'){S.f.y=t.value;render()}
 if(t.dataset.role){const u=user(t.dataset.role),r=t.value;modal({kind:'confirm',title:'เปลี่ยนบทบาท?',icon:'b',msg:`เปลี่ยน ${esc(u.name)} เป็น “${r==='staff'?'เจ้าหน้าที่':'ผู้ใช้ทั่วไป'}”`,btn:'เปลี่ยนบทบาท',act:'doRole'});S.modal.uid=u.id;S.modal.role=r}});
P.addEventListener('click',e=>{const b=e.target.closest('[data-go],[data-a]');if(!b)return;
 if(b.dataset.a==='ovClose'&&e.target!==b)return;
 if(b.dataset.go){return go(b.dataset.go,{id:b.dataset.id})}
 const a=b.dataset.a;
 const A={
  back,home,toHome:home,
  lang:()=>{LANG=b.dataset.v;try{localStorage.setItem('lf-lang',LANG)}catch(e){}document.documentElement.lang=LANG;S.f.lu=val('lu');S.f.lp=val('lp');render();drawSpring()},
  cal:()=>openCal(b.dataset.t),
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
  setT:()=>{S.f.t=b.dataset.v;const q=S.f.q,c=S.f.c;render();const n=$('#sq');if(n&&q){n.value=q}},
  saveItem:()=>saveItem(b.dataset.k),
  saveEdit:()=>saveItem(null,item(cur().id)),
  toClaim:()=>{const it=item(cur().id);
   if(it.status==='returned'||db.claims.some(c=>c.item===it.id&&c.status==='approved'))return modal({title:'ทำรายการไม่ได้',icon:'no',msg:'รายการนี้ถูกดำเนินการคืนของแล้ว',btn:'กลับหน้าหลัก',act:'toHome'});
   if(pendingOther(it))return modal({title:'มีผู้ยื่นคำขอแล้ว',icon:'wait',msg:'รายการนี้กำลังรอเจ้าหน้าที่ตรวจสอบคำขอของผู้อื่น<br>หากคำขอนั้นไม่ได้รับอนุมัติ คุณจะยื่นคำขอได้'});
   go('claim',{id:it.id})},
  submitClaim:()=>{const it=item(cur().id),f=S.f;f.qn=val('qn');f.qr=val('qr');
   const err={qc:!f.qc,qf:!(f.qf||[]).length,qp:!f.qp,qr:!f.qr,ok:!$('#cOk')?.checked};f.cok=!err.ok;
   if(pendingOther(it))return modal({title:'มีผู้ยื่นคำขอแล้ว',icon:'wait',msg:'รายการนี้มีคำขอของผู้อื่นรอตรวจสอบอยู่'});
   if(Object.values(err).some(Boolean)){S.f.err=err;render();const first=$('#phone .q.err');first?.scrollIntoView({block:'center'});return modal({title:'ตอบคำถามไม่ครบ',icon:'no',msg:Object.entries(err).every(([k,v])=>k==='ok'||!v)?'กรุณายืนยันและให้ความยินยอมก่อนส่งคำขอ':'กรุณาตอบข้อที่มีกรอบสีแดงให้ครบ',btn:'กลับไปตอบ'})}
   db.claims.push({id:'C'+(db.seq++),item:it.id,by:S.me.id,date:today(),ans:{color:f.qc,feats:f.qf,place:f.qp,date:f.qr},note:f.qn,imgs:f.cimgs||[],status:'pending'});
   S.stack=[{s:'home'}];S.f={};modal({title:'ส่งคำขอแล้ว',icon:'wait',msg:'เจ้าหน้าที่จะตรวจสอบคำตอบ'+((f.cimgs||[]).length?'และรูปที่แนบ':'')+'<br>ติดตามผลได้ที่เมนู “ติดตามสถานะ”',btn:'ไปที่ติดตามสถานะ',act:'toTrack'})},
  toTrack:()=>{S.stack=[{s:'home'},{s:'track'}];S.modal=null;render(true)},
  approve:()=>modal({kind:'confirm',title:'อนุมัติคำขอนี้?',icon:'ok',msg:'ระบบจะเปลี่ยนสถานะของเป็น “คืนแล้ว” และแจ้งผลให้ผู้ขอทราบ',btn:'อนุมัติ',cls:'ok',act:'doApprove'}),
  doApprove:()=>{const c=db.claims.find(x=>x.id===cur().id);c.status='approved';c.verifiedBy=S.me.id;item(c.item).status='returned';
   db.claims.filter(x=>x.item===c.item&&x.status==='pending').forEach(x=>{x.status='rejected';x.verifiedBy=S.me.id;x.reason='มีผู้ได้รับอนุมัติรายการนี้แล้ว'});
   S.stack=[{s:'shome'},{s:'pending'}];modal({title:'อนุมัติสำเร็จ',icon:'ok',msg:'แจ้งผลให้ผู้ขอทราบแล้ว',btn:'กลับไปรายการคำขอ'})},
  reject:()=>{const r=val('vr');if(!r){const x=$('#vr');x.classList.add('err');x.focus();x.scrollIntoView({block:'center'});return toast('กรุณากรอกเหตุผลก่อนปฏิเสธ')}
   const c=db.claims.find(x=>x.id===cur().id);c.status='rejected';c.verifiedBy=S.me.id;c.reason=r;
   S.stack=[{s:'shome'},{s:'pending'}];modal({title:'ปฏิเสธคำขอแล้ว',icon:'no',msg:'แจ้งเหตุผลให้ผู้ขอทราบแล้ว',btn:'กลับไปรายการคำขอ'})},
  export:()=>modal({kind:'export'}),expCSV,expPDF,
  savePerms:()=>{['verify','report','manage'].forEach(k=>db.perms[k]=$('#pm-'+k).checked);S.stack=[{s:'shome'}];render(true);toast('บันทึกสิทธิ์การใช้งานแล้ว')},
  saveSettings:()=>{const n=parseInt(val('ret'));if(!(n>0)){$('#ret').classList.add('err');return toast('ระยะเวลาต้องมากกว่า 0 วัน')}db.retention=n;back();toast('บันทึกการตั้งค่าแล้ว')},
  addList:()=>modal({kind:'input',title:b.dataset.k==='places'?'เพิ่มสถานที่':'เพิ่มหมวดหมู่',ph:b.dataset.k==='places'?'ชื่อสถานที่':'ชื่อหมวดหมู่',k:b.dataset.k,i:-1}),
  editList:()=>{const k=b.dataset.k,i=+b.dataset.i;modal({kind:'input',title:k==='places'?'แก้ไขสถานที่':'แก้ไขหมวดหมู่',val:db[k][i],k,i})},
  delList:()=>{const k=b.dataset.k,i=+b.dataset.i;const inUse=db.items.some(it=>k==='places'?it.place===db[k][i]:it.cat===db[k][i]);
   if(inUse)return modal({title:'ลบไม่ได้',icon:'no',msg:'มีรายการที่ใช้ข้อมูลนี้อยู่ แก้ไขชื่อแทนการลบ'});
   modal({kind:'confirm',title:'ลบ “'+db[k][i]+'”?',icon:'no',msg:'ลบแล้วกู้คืนไม่ได้',btn:'ลบ',cls:'no',act:'doDel'});S.modal.k=k;S.modal.i=i},
  doRole:()=>{const m=S.modal,u=user(m.uid);u.role=m.role;S.modal=null;render();toast('เปลี่ยนบทบาทของ '+u.name+' แล้ว')},
  gotBack:()=>modal({kind:'confirm',title:'ได้ของคืนแล้ว?',icon:'ok',msg:'ระบบจะปิดการแจ้งของหายรายการนี้ และเปลี่ยนสถานะเป็น “ได้คืนแล้ว”',btn:'ยืนยัน',cls:'ok',act:'doGotBack'}),
  doGotBack:()=>{item(cur().id).status='returned';S.stack=[{s:'home'},{s:'mine'}];S.modal=null;render(true);toast('ปิดการแจ้งของหายแล้ว')},
  doDel:()=>{const m=S.modal;db[m.k].splice(m.i,1);S.modal=null;render();toast('ลบแล้ว')},
  mConfirm:()=>{const m=S.modal,v=val('mIn');if(!v){$('#mIn').classList.add('err');return}
   if(db[m.k].some((x,j)=>x===v&&j!==m.i)){$('#mIn').classList.add('err');return toast('มีชื่อนี้อยู่แล้ว')}
   if(m.i<0)db[m.k].push(v);else{const old=db[m.k][m.i];db[m.k][m.i]=v;db.items.forEach(it=>{if(m.k==='places'&&it.place===old)it.place=v;if(m.k==='cats'&&it.cat===old)it.cat=v})}
   S.modal=null;render();toast('บันทึกแล้ว')}
 };
 A[a]&&A[a]();});
function saveItem(kind,it){const found=kind==='found'||it?.type==='found';
 const name=val('iName'),date=val('iDate'),color=val('iColor'),feats=$$('input[name=iF]:checked').map(x=>x.value);
 const dep=found?val('iDep'):'',stf=found?val('iStaff'):'';
 const bad=[['iOkBox',!it&&!$('#iOk')?.checked],['iName',!name],['iPlace',!val('iPlace')],['iDate',!date||date>today()]].concat(found?[['iColorBox',!color],['iFBox',!feats.length],['iDep',!dep],['iStaff',!stf]]:[]);
 bad.forEach(([id,b])=>{const el=id==='iDate'?$('[data-t=iDate]'):$('#'+id);el?.classList.toggle('err',b)});
 if(bad.some(x=>x[1])){$('#phone .err')?.scrollIntoView({block:'center'});return modal({title:'ข้อมูลไม่ครบ',icon:'no',msg:'กรุณากรอกช่องที่มีกรอบสีแดงให้ครบ'+(date>today()?'<br>วันที่ต้องไม่เกินวันนี้':'')+(!it&&!$('#iOk')?.checked?'<br>และกดยินยอมการเก็บข้อมูล':''),btn:'กลับไปแก้ไข'})}
 const data={name,cat:val('iCat'),place:val('iPlace'),date,detail:val('iDetail')};if(found){data.secret={color,feats};data.deposit=dep;data.receivedBy=stf}
 if(S.f.img!==undefined)data.img=S.f.img;
 if(it){if(data.img==='')delete it.img;Object.assign(it,data);S.stack=[{s:S.me.role==='staff'?'shome':'home'},{s:'mine'}];S.f={};return modal({title:'บันทึกการแก้ไขแล้ว',icon:'ok',msg:'ข้อมูลรายการถูกอัปเดตแล้ว'})}
 db.items.push({id:'I'+(db.seq++),type:kind,reporter:S.me.id,status:'waiting',...data});
 S.f={};modal({title:kind==='lost'?'แจ้งของหายสำเร็จ':'บันทึกของที่พบสำเร็จ',icon:'ok',msg:kind==='lost'?'ระบบบันทึกการแจ้งของหายแล้ว<br>ดูหรือแก้ไขได้ที่ “รายการบันทึก”':'ขอบคุณที่ช่วยเหลือ<br>กรุณานำของไปฝากตามสถานที่ที่ระบุ',btn:'กลับหน้าหลัก',act:'toHome'})}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const cv=$('#phone .ov .cal');if(cv)return cv.closest('.ov').remove();const z=$('.zoom');if(z)return z.remove();if(S.modal){S.modal=null;render()}}
 if((e.key==='Enter'||e.key===' ')&&e.target.matches('img[data-a=zoom]')){e.preventDefault();e.target.click()}});
seed();try{const d=JSON.parse(localStorage.getItem(KEY)||'null');if(d&&d.items)db=d}catch(e){}
render(true);
