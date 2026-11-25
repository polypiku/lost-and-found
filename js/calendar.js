/* Date picker (calendar) */
const dateBtn=(id,v,lab)=>`<button type="button" class="fld dbtn" data-a="cal" data-t="${id}" aria-describedby="${lab}"><span>${v?thLong(v):'เลือกวันที่'}</span>${I.calendar}</button><input type="hidden" id="${id}" value="${esc(v)}">`;
const thLong=v=>{const d=new Date(v+'T00:00');return d.getDate()+' '+MF()[d.getMonth()]+' '+(d.getFullYear()+YO())};
function openCal(t){const inp=$('#'+t),v=inp.value||today();const d=new Date(v+'T00:00');const C={t,y:d.getFullYear(),m:d.getMonth(),sel:inp.value,view:'d'};
 const ov=document.createElement('div');ov.className='ov sheet';ov.innerHTML='<div class="dlg cal" role="dialog" aria-modal="true" aria-label="เลือกวันที่"></div>';P.appendChild(ov);
 const box=ov.firstChild,tdy=today();
 const draw=()=>{let h=`<div class="chd"><button type="button" class="cnav" data-c="prev" aria-label="ก่อนหน้า">${I.back}</button><button type="button" class="ctl" data-c="mview">${MF()[C.m]}</button><button type="button" class="ctl" data-c="yview">${C.y+YO()}</button><button type="button" class="cnav" data-c="next" aria-label="ถัดไป">${I.chev}</button></div>`;
  if(C.view==='d'){h+=`<div class="cgrid wk">${WD().map(x=>`<span>${x}</span>`).join('')}</div><div class="cgrid">`;
   const f=new Date(C.y,C.m,1).getDay(),n=new Date(C.y,C.m+1,0).getDate();for(let k=0;k<f;k++)h+='<span></span>';
   for(let k=1;k<=n;k++){const v=iso(new Date(C.y,C.m,k));h+=`<button type="button" data-c="d" data-v="${v}" class="${v===C.sel?'on':''}${v===tdy?' td':''}"${v>tdy?' disabled':''}>${k}</button>`}h+='</div>'}
  else if(C.view==='m'){h+=`<div class="cgrid c3">${MF().map((x,k)=>`<button type="button" data-c="m" data-v="${k}" class="${k===C.m?'on':''}">${x}</button>`).join('')}</div>`}
  else{const ys=[];for(let y=new Date().getFullYear();y>=new Date().getFullYear()-5;y--)ys.push(y);h+=`<div class="cgrid c3">${ys.map(y=>`<button type="button" data-c="y" data-v="${y}" class="${y===C.y?'on':''}">${y+YO()}</button>`).join('')}</div>`}
  h+=`<div class="acts"><button type="button" class="btn" data-c="close">ยกเลิก</button><button type="button" class="btn" data-c="today">วันนี้</button></div>`;box.innerHTML=h};
 const pick=v=>{inp.value=v;const b=P.querySelector(`[data-a=cal][data-t="${t}"]`);if(b){b.querySelector('span').textContent=thLong(v);b.classList.remove('err')}
  if(t==='qr'){S.f.qr=v;b?.closest('.q')?.classList.remove('err')}ov.remove()};
 ov.addEventListener('click',e=>{e.stopPropagation();if(e.target===ov)return ov.remove();const b=e.target.closest('[data-c]');if(!b||b.disabled)return;const c=b.dataset.c;
  if(c==='prev'){if(C.view==='d'){C.m--;if(C.m<0){C.m=11;C.y--}}else C.y--}
  if(c==='next'){if(C.view==='d'){C.m++;if(C.m>11){C.m=0;C.y++}}else C.y++}
  if(c==='mview')C.view=C.view==='m'?'d':'m';if(c==='yview')C.view=C.view==='y'?'d':'y';
  if(c==='m'){C.m=+b.dataset.v;C.view='d'}if(c==='y'){C.y=+b.dataset.v;C.view='m'}
  if(c==='d')return pick(b.dataset.v);if(c==='today')return pick(tdy);if(c==='close')return ov.remove();draw()});
 draw();box.querySelector('.on,button')?.focus()}
