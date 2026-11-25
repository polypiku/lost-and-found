/* Dialogs, report export (Excel / PDF) and photo handling */
/* ---------- modal ---------- */
function M(m){if(!m)return'';
 if(m.kind==='input')return `<div class="ov"><div class="dlg" role="dialog" aria-modal="true" aria-label="${esc(m.title)}"><h3>${esc(m.title)}</h3><input class="fld" id="mIn" value="${esc(m.val||'')}" placeholder="${esc(m.ph||'')}" aria-label="${esc(m.title)}"><div class="acts"><button class="btn" type="button" data-a="mClose">ยกเลิก</button><button class="btn pri" type="button" data-a="mConfirm">บันทึก</button></div></div></div>`;
 if(m.kind==='confirm')return `<div class="ov"><div class="dlg" role="alertdialog" aria-modal="true" aria-label="${esc(m.title)}"><div class="ico ${m.icon}">${I[m.icon]}</div><h3>${esc(m.title)}</h3><div class="msg">${m.msg}</div><div class="acts"><button class="btn" type="button" data-a="mClose">ยกเลิก</button><button class="btn ${m.cls||'pri'}" type="button" data-a="${m.act}">${m.btn}</button></div></div></div>`;
 if(m.kind==='export'){const r=repData();return `<div class="ov sheet" data-a="ovClose"><div class="dlg" role="dialog" aria-modal="true" aria-label="ส่งออกรายงาน"><h3>ส่งออกรายงาน${MF()[r.m]} ${r.y+YO()}</h3><span class="hint" style="margin-top:-6px">${r.L.length} รายการ · เลือกรูปแบบไฟล์</span>
  <button class="opt" type="button" data-a="expCSV"><span class="ic" style="background:#e3f5ea;color:#1e8a46">${I.xls}</span><span><b>Excel (.csv)</b><small>เปิดด้วย Excel หรือ Google Sheets ได้ทันที</small></span></button>
  <button class="opt" type="button" data-a="expPDF"><span class="ic" style="background:#fde8e5;color:#c93a2b">${I.pdf}</span><span><b>PDF / พิมพ์</b><small>เลือก “บันทึกเป็น PDF” ในหน้าต่างพิมพ์</small></span></button>
  <button class="btn" type="button" data-a="mClose">ยกเลิก</button></div></div>`}
 return `<div class="ov"><div class="dlg" role="alertdialog" aria-modal="true" aria-label="${esc(m.title)}"><div class="ico ${m.icon}">${I[m.icon]}</div><h3>${esc(m.title)}</h3><div class="msg">${m.msg}</div><button class="btn pri" type="button" style="width:100%;flex:none" data-a="${m.act||'mClose'}">${m.btn||'ตกลง'}</button></div></div>`}

/* ---------- export ---------- */
const csvCell=v=>{v=String(v??'');return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
function rowsOf(r){return r.L.map((i,k)=>{const cs=db.claims.filter(c=>c.item===i.id);const ap=cs.find(c=>c.status==='approved');
 return [k+1,i.id,i.type==='lost'?'ของหาย':'ของที่พบ',i.name,i.cat,i.place,thd(i.date),stOf(i)[0],user(i.reporter)?.name||'',i.type==='found'?i.deposit:'-',cs.length,ap?user(ap.by).name:'-']})}
const HEAD=['ลำดับ','รหัส','ประเภท','ชื่อสิ่งของ','หมวดหมู่','สถานที่','วันที่','สถานะ','ผู้แจ้ง','สถานที่ฝาก','จำนวนคำขอ','ผู้รับคืน'];
function expCSV(){const r=repData();const lines=[[`รายงานสรุปผลระบบศูนย์กลางรับฝากและติดตามของหาย เดือน${MF()[r.m]} ${r.y+YO()}`],[`ออกรายงานโดย ${S.me.name} วันที่ ${thd(today())}`],[],
  ['แจ้งของหาย',r.lost],['ของที่พบ',r.found],['คำขอรับคืน',r.claims.length],['คืนของแล้ว',r.ret],[],HEAD,...rowsOf(r)];
 const csv='﻿'+lines.map(l=>l.map(x=>csvCell(trS(String(x??'')))).join(',')).join('\r\n');
 const name=LANG==='en'?`Report_${MEN[r.m]}_${r.y}.csv`:`รายงาน_${MFULL[r.m]}_${r.y+543}.csv`;
 try{const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),4000);
  modal({title:'ส่งออกสำเร็จ',icon:'ok',msg:`ดาวน์โหลดไฟล์ <b>${esc(name)}</b> แล้ว<br>เปิดได้ด้วย Excel หรือ Google Sheets`})}
 catch(e){modal({title:'ส่งออกไม่สำเร็จ',icon:'no',msg:'เบราว์เซอร์ไม่อนุญาตให้ดาวน์โหลดไฟล์'})}}
function expPDF(){const r=repData();
 $('#print').innerHTML=`<h1>รายงานสรุปผลระบบศูนย์กลางรับฝากและติดตามของหาย</h1><div class="meta">ประจำเดือน${MF()[r.m]} ${r.y+YO()} · ออกรายงานโดย ${esc(S.me.name)} · วันที่ ${thd(today())}</div>
 <h2>สรุปภาพรวม</h2><table><tr><th>แจ้งของหาย</th><th>ของที่พบ</th><th>คำขอรับคืน</th><th>คืนของแล้ว</th></tr><tr><td>${r.lost}</td><td>${r.found}</td><td>${r.claims.length}</td><td>${r.ret}</td></tr></table>
 <h2>รายการทั้งหมด</h2><table><tr>${HEAD.filter((h,i)=>i!==1).map(h=>`<th>${h}</th>`).join('')}</tr>${rowsOf(r).map(x=>`<tr>${x.filter((v,i)=>i!==1).map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</table>`;
 trNode($('#print'));S.modal=null;render();setTimeout(()=>window.print(),60)}

/* ---------- photos ---------- */
function shrink(file,cb){const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{let sw=im.width,sh=im.width*4/3;if(sh>im.height){sh=im.height;sw=sh*3/4}const W=Math.min(480,Math.round(sw)),Hh=Math.round(W*4/3),c=document.createElement('canvas');c.width=W;c.height=Hh;c.getContext('2d').drawImage(im,(im.width-sw)/2,(im.height-sh)/2,sw,sh,0,0,W,Hh);cb(c.toDataURL('image/jpeg',.75))};im.onerror=()=>modal({title:'ไฟล์ไม่ถูกต้อง',icon:'no',msg:'กรุณาเลือกไฟล์รูปภาพ'});im.src=fr.result};fr.readAsDataURL(file)}
function refreshPhoto(){const w=$('#phWrap');if(!w)return;const src=S.f.img;w.innerHTML=src?`<div class="ph" data-a="pickPhoto" role="button" tabindex="0" aria-label="เปลี่ยนรูป" style="cursor:pointer"><img src="${src}" alt="รูปสิ่งของ"><button class="x" type="button" data-a="rmPhoto" aria-label="ลบรูป">${I.x}</button><span class="cap">แตะเพื่อเปลี่ยน</span></div>`:`<button class="up" type="button" data-a="pickPhoto">${I.cam}<span>แนบรูปภาพ</span></button>`}
