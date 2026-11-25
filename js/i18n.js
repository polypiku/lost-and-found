/* Thai / English translation */
const DICT=[
['ระบบศูนย์กลางรับฝากและติดตามของหาย','Lost & Found Center'],['มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ','Huachiew Chalermprakiet University'],
['ยินดีต้อนรับ!','Welcome!'],['รหัสนักศึกษา / บุคลากร','Student / Staff ID'],['รหัสผ่าน','Password'],['แสดงรหัสผ่าน','Show password'],['ซ่อนรหัสผ่าน','Hide password'],['เข้าสู่ระบบไม่สำเร็จ','Sign-in failed'],['เข้าสู่ระบบ','Sign in'],
['ต้องการออกจากระบบใช่หรือไม่','Do you want to sign out?'],['ออกจากระบบ','Sign out'],['ย้อนกลับ','Back'],
['กรุณากรอกรหัสผู้ใช้และรหัสผ่าน','Please enter your ID and password'],['รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง','Incorrect ID or password'],
['ศูนย์รับฝากของหาย','Lost & Found'],['สำหรับเจ้าหน้าที่','Staff'],['สวัสดี,','Hello,'],['สวัสดี','Hello'],
['ดูของที่มีคนเก็บได้ และยื่นขอรับคืน','Browse found items and claim yours'],['ค้นหาของที่พบ','Search found items'],['บริการ','Services'],
['บันทึกของที่คุณทำหาย','Record something you lost'],['แจ้งของที่คุณเก็บได้','Report something you found'],['ผลคำขอรับคืนของคุณ','Your claim results'],['ดูและแก้ไขรายการที่แจ้ง','View and edit your reports'],
['อนุมัติหรือปฏิเสธคำขอรับคืน','Approve or reject claims'],['สรุปรายเดือน ส่งออก Excel / PDF','Monthly summary, export Excel / PDF'],['บัญชี สิทธิ์ และการตั้งค่า','Accounts, permissions, settings'],
['บางเมนูถูกซ่อนตามสิทธิ์ที่ตั้งไว้ในหน้าจัดการระบบ','Some menus are hidden by the permission settings'],
['แตะเพื่อเปลี่ยน','Tap to change'],['เปลี่ยนรูป','Change photo'],['ลบรูปที่','Remove photo'],['ลบรูป','Remove photo'],['แนบรูปภาพ','Attach photo'],['รูปสิ่งของที่พบ','Photo of found item'],['รูปสิ่งของ','Item photo'],
['(จำเป็นเมื่อปฏิเสธ)','(required to reject)'],['(จำเป็น)','(required)'],['(แนะนำ)','(recommended)'],['(ถ้ามี ไม่เกิน 3 รูป)','(optional, up to 3)'],['(ถ้ามี)','(optional)'],['(ไม่บังคับ)','(optional)'],['(เลือกได้หลายข้อ)','(choose any)'],
['เช่น กระเป๋าสตางค์สีดำ','e.g. Black wallet'],['เช่น หูฟังไร้สายสีขาว','e.g. White wireless earbuds'],['เช่น ห้องกิจการนักศึกษา','e.g. Student Affairs Office'],['เช่น 670111','e.g. 670111'],
['สิ่งที่ทุกคนเห็นได้ เช่น ขนาด ยี่ห้อ','Visible details, e.g. size, brand'],['เช่น ยี่ห้อ ตำหนิ ของที่อยู่ข้างใน','e.g. brand, marks, contents'],
['เช่น คำตอบไม่ตรงกับลักษณะของสิ่งของ','e.g. Answers do not match the item'],['เช่น จุดสังเกตอื่นที่มีแต่เจ้าของรู้','e.g. other marks only the owner knows'],
['เช่น รูปเก่าที่เคยถ่ายไว้ หรือรูปที่เห็นสิ่งของชิ้นนี้ ช่วยให้เจ้าหน้าที่ตรวจสอบได้ง่ายขึ้น','e.g. an old photo showing this item. It helps staff verify faster.'],
['ข้อมูลลับสำหรับยืนยันเจ้าของ','Secret details for owner verification'],['ข้อมูลส่วนนี้ไม่แสดงต่อผู้อื่น ใช้เทียบกับคำตอบของผู้ขอรับคืน','Hidden from others; used to check claimants\' answers'],
['ชื่อสิ่งของ สถานที่ หรือรายละเอียด','Item, place or details'],['ชื่อสิ่งของ','Item name'],['หมวดหมู่สิ่งของ','Item categories'],['หมวดหมู่','Category'],
['สถานที่ที่เก็บได้','Place found'],['สถานที่ที่คาดว่าทำหาย','Where you think you lost it'],['สถานที่ที่ทำหาย','Place lost'],['สถานที่ที่พบ','Place found'],['สถานที่และจุดรับฝาก','Places and drop-off points'],['สถานที่ฝาก','Drop-off point'],['เลือกสถานที่','Choose a place'],
['รายละเอียดทั่วไป','General details'],['รายละเอียดเพิ่มเติม','More details'],['รายละเอียดรายการ','Item details'],['รายละเอียดที่ใช้ยืนยันความเป็นเจ้าของ เช่น สีและตำหนิ จะไม่แสดงในหน้านี้','Details used to verify ownership, such as color and marks, are hidden here'],
['สีของสิ่งของ','Item color'],['ลักษณะเด่น','Features'],['การฝากของ','Drop-off'],['เจ้าหน้าที่ที่รับฝาก','Receiving staff'],['เจ้าหน้าที่รับฝาก','Received by'],['เลือกเจ้าหน้าที่','Choose staff'],
['บันทึกการแจ้ง','Submit'],['บันทึกการแก้ไข','Save changes'],['แก้ไขรายละเอียด','Edit details'],['ยกเลิก','Cancel'],
['แตะรายการเพื่อแก้ไข รายการที่คืนแล้วแก้ไขไม่ได้','Tap an item to edit. Returned items cannot be edited.'],['ยังไม่มีรายการที่คุณแจ้งไว้','You have not reported anything yet'],
['ไม่พบรายการที่ตรงกับคำค้นหา','No items match your search'],['ลองเปลี่ยนคำค้นหรือตัวกรอง','Try another keyword or filter'],['ค้นหารายการ','Search'],['คำค้น','Keyword'],['ทุกหมวด','All'],['ทั้งหมด','All'],
['เก็บรักษาถึง','Kept until'],['หากพบสิ่งของนี้ ติดต่อผู้แจ้งได้ที่','If you find this item, contact the owner at'],['หรือนำไปฝากที่ห้องกิจการนักศึกษา','or leave it at the Student Affairs Office'],
['คุณเป็นผู้แจ้งรายการนี้ จึงยื่นขอรับคืนไม่ได้','You reported this item, so you cannot claim it'],['คุณยื่นคำขอรายการนี้แล้วเมื่อ','You already claimed this item on'],['กำลังรอเจ้าหน้าที่ตรวจสอบ','waiting for staff review'],
['ยื่นคำขอรับของคืน','Claim this item'],['ยื่นคำขอรับคืน','Claim item'],['ตอบคำถามเพื่อยืนยันว่าคุณเป็นเจ้าของ','Answer to prove you are the owner'],
['เลือกวันที่คุณคิดว่าทำของหาย ระบบยอมรับคลาดเคลื่อนได้ไม่เกิน 3 วัน','Pick the day you think you lost it (±3 days accepted)'],['วันที่ทำหาย','Date lost'],['วันที่พบ','Date found'],['เลือกวันที่','Choose date'],
['รูปถ่ายสิ่งของของคุณ','Your photos of the item'],['หมายเหตุเพิ่มเติม','Additional note'],['หมายเหตุจากผู้ขอ','Note from claimant'],['ส่งคำขอแล้ว','Claim sent'],['ส่งคำขอ','Send claim'],['รูปที่แนบ','Attached photo'],['เพิ่มรูป','Add photo'],['มีรูปแนบ','has photo'],['แนบรูป','photos'],
['เจ้าหน้าที่กำลังตรวจสอบ','Staff is reviewing'],['เทียบคำตอบของคุณกับข้อมูลในระบบ','Comparing your answers with our records'],['แจ้งผลการตรวจสอบ','Result'],['รอผล','Pending'],['ตรวจสอบแล้ว','Reviewed'],
['ติดต่อรับของได้ที่','Pick it up at'],['พร้อมบัตรนักศึกษาหรือบัตรบุคลากร','with your student or staff ID card'],['เหตุผล:','Reason:'],['เหตุผล','Reason'],
['ยังไม่มีคำขอรับคืน','No claims yet'],['คำขอรอตรวจสอบ','Pending claims'],['ไม่มีคำขอที่รอตรวจสอบ','No pending claims'],['ตรวจสอบคำขอ','Review claims'],
['คำตอบตรงกับข้อมูลในระบบ','Answers matching records'],['ผู้ขอตอบ','Answer'],['ในระบบ','Record'],['คำถาม','Question'],['✓ ตรง','✓ Match'],['✗ ไม่ตรง','✗ No match'],
['เทียบรูปภาพ','Compare photos'],['รูปที่บันทึกตอนรับฝาก','Photo at drop-off'],['รูปจากผู้ขอ','Claimant photo'],['รูปในระบบ','Record photo'],['ไม่มีรูปในระบบ','No photo on record'],['ผู้ขอไม่ได้แนบรูป','No photo attached'],['แตะรูปเพื่อขยาย','Tap a photo to enlarge'],
['ก่อนส่งมอบของ ตรวจบัตรของผู้มารับให้ตรงกับผู้ยื่นคำขอ','Before handing over, check the ID card matches the claimant'],['ปฏิเสธ','Reject'],['อนุมัติ','Approve'],
['รายงานสรุปผล','Summary report'],['รายการในเดือน','Items in '],['ไม่มีรายการในเดือนนี้','No items this month'],['ส่งออกรายงาน','Export report'],['คำขอรับคืน','Claims'],['คืนของแล้ว','Returned'],
['ข้อมูลรายการ','Item record'],['ผู้แจ้ง','Reporter'],['เบอร์ติดต่อ','Phone'],['ยังไม่มีผู้ยื่นคำขอ','No claims yet'],['ข้อมูลติดต่อใช้เพื่อติดตามสิ่งของเท่านั้น','Contact details are used for item tracking only'],
['จัดการบัญชีผู้ใช้','User accounts'],['จัดการบัญชี','Accounts'],['กำหนดบทบาทผู้ใช้','Set user roles'],['สิทธิ์การใช้งาน','Permissions'],['เปิด/ปิดเมนูเจ้าหน้าที่','Turn staff menus on/off'],['ตั้งค่าทั่วไป','General settings'],['สถานที่ หมวดหมู่ ระยะเวลา','Places, categories, retention'],
['บทบาทของ','Role of'],['ผู้ใช้ทั่วไป','User'],['เปลี่ยนบทบาทแล้วมีผลทันที บัญชีที่กำลังใช้งานเปลี่ยนเองไม่ได้','Role changes apply immediately. You cannot change your own role.'],
['เลือกเมนูที่เจ้าหน้าที่ใช้งานได้','Choose the menus staff can use'],['เมนูจัดการระบบปิดไม่ได้ เพื่อไม่ให้เจ้าหน้าที่ล็อกตัวเองออกจากการตั้งค่า','System management cannot be turned off, so staff are never locked out of settings'],
['ยังไม่มีข้อมูล','No data yet'],['ระยะเวลาเก็บรักษาของ (วัน)','Retention period (days)'],['ระยะเวลาเก็บรักษาของ','Retention period'],['ใช้คำนวณวันที่ “เก็บรักษาถึง” ในหน้ารายละเอียดของที่พบ','Used to calculate “Kept until” on found item pages'],
['ก่อนหน้า','Previous'],['ถัดไป','Next'],['วันนี้','Today'],['เลือกรูปแบบไฟล์','choose a format'],['เปิดด้วย Excel หรือ Google Sheets ได้ทันที','Opens in Excel or Google Sheets'],['PDF / พิมพ์','PDF / Print'],['เลือก “บันทึกเป็น PDF” ในหน้าต่างพิมพ์','Choose “Save as PDF” in the print dialog'],['ตกลง','OK'],
['ส่งออกสำเร็จ','Export complete'],['ดาวน์โหลดไฟล์','Downloaded'],['เปิดได้ด้วย Excel หรือ Google Sheets','Opens in Excel or Google Sheets'],['ส่งออกไม่สำเร็จ','Export failed'],['เบราว์เซอร์ไม่อนุญาตให้ดาวน์โหลดไฟล์','The browser blocked the download'],
['รายงานสรุปผลระบบศูนย์กลางรับฝากและติดตามของหาย','Lost & Found Center summary report'],['ประจำเดือน','for '],['ออกรายงานโดย','Generated by'],['สรุปภาพรวม','Overview'],['รายการทั้งหมด','All items'],
['ไฟล์ไม่ถูกต้อง','Invalid file'],['กรุณาเลือกไฟล์รูปภาพ','Please choose an image file'],['ทำรายการไม่ได้','Not available'],['รายการนี้ถูกดำเนินการคืนของแล้ว','This item has already been returned'],['กลับหน้าหลัก','Back to home'],
['ตอบคำถามไม่ครบ','Some answers are missing'],['กรุณาตอบข้อที่มีกรอบสีแดงให้ครบ','Please answer the questions outlined in red'],['กลับไปตอบ','Go back'],['เจ้าหน้าที่จะตรวจสอบคำตอบ','Staff will review your answers'],['และรูปที่แนบ',' and photos'],
['ติดตามผลได้ที่เมนู “ติดตามสถานะ”','Follow the result under “Track status”'],['ไปที่ติดตามสถานะ','Go to Track status'],['อนุมัติคำขอนี้?','Approve this claim?'],
['ระบบจะเปลี่ยนสถานะเป็น “คืนแล้ว” และปฏิเสธคำขออื่นของรายการเดียวกันอัตโนมัติ','The item will be marked “Returned” and other claims for it will be rejected automatically'],
['มีผู้ได้รับอนุมัติรายการนี้แล้ว','Another claim was approved for this item'],['อนุมัติสำเร็จ','Approved'],['แจ้งผลให้ผู้ขอทราบแล้ว','The claimant has been notified'],['กลับไปรายการคำขอ','Back to claims'],
['กรุณากรอกเหตุผลก่อนปฏิเสธ','Enter a reason before rejecting'],['ปฏิเสธคำขอแล้ว','Claim rejected'],['แจ้งเหตุผลให้ผู้ขอทราบแล้ว','The reason has been sent to the claimant'],['บันทึกสิทธิ์การใช้งานแล้ว','Permissions saved'],
['ระยะเวลาต้องมากกว่า 0 วัน','Retention must be more than 0 days'],['บันทึกการตั้งค่าแล้ว','Settings saved'],['มีชื่อนี้อยู่แล้ว','This name already exists'],['บันทึกแล้ว','Saved'],['ลบแล้ว','Deleted'],['ลบแล้วกู้คืนไม่ได้','This cannot be undone'],['ลบไม่ได้','Cannot delete'],
['มีรายการที่ใช้ข้อมูลนี้อยู่ แก้ไขชื่อแทนการลบ','Items use this entry. Rename it instead.'],['เพิ่มสถานที่','Add place'],['เพิ่มหมวดหมู่','Add category'],['แก้ไขสถานที่','Edit place'],['แก้ไขหมวดหมู่','Edit category'],['ชื่อสถานที่','Place name'],['ชื่อหมวดหมู่','Category name'],
['ข้อมูลไม่ครบ','Missing information'],['กรุณากรอกช่องที่มีกรอบสีแดงให้ครบ','Please fill in the fields outlined in red'],['วันที่ต้องไม่เกินวันนี้','The date cannot be in the future'],['กลับไปแก้ไข','Go back'],
['บันทึกการแก้ไขแล้ว','Changes saved'],['ข้อมูลรายการถูกอัปเดตแล้ว','The item has been updated'],['แจ้งของหายสำเร็จ','Lost item reported'],['บันทึกของที่พบสำเร็จ','Found item recorded'],
['ระบบบันทึกการแจ้งของหายแล้ว','Your lost item report is saved'],['ดูหรือแก้ไขได้ที่ “รายการบันทึก”','View or edit it in “My reports”'],['ขอบคุณที่ช่วยเหลือ','Thank you for helping'],['กรุณานำของไปฝากตามสถานที่ที่ระบุ','Please leave the item at the drop-off point'],
['เปลี่ยนบทบาทของ','Changed role of'],['เจ้าหน้าที่ เอ','Staff A'],['เจ้าหน้าที่ บี','Staff B'],
['แจ้งของหาย','Report lost'],['บันทึกของที่พบ','Report found'],['ติดตามสถานะ','Track status'],['รายการบันทึก','My reports'],['ออกรายงาน','Reports'],['จัดการระบบ','System'],
['รอเจ้าของมารับ','Awaiting owner'],['ได้คืนแล้ว','Recovered'],['คืนแล้ว','Returned'],['กำลังตามหา','Searching'],['รอตรวจสอบ','Pending'],['อนุมัติแล้ว','Approved'],['ไม่อนุมัติ','Rejected'],
['ของที่พบ','Found'],['ของหาย','Lost'],['ประเภท','Type'],['สถานที่','Place'],['รายละเอียด','Details'],['เจ้าหน้าที่','Staff'],['ผู้ขอ','Claimant'],
['หน้าหลัก','Home'],['ค้นหา','Search'],['ติดตาม','Track'],['รายการ','Items'],['ตรวจสอบ','Review'],['รายงาน','Reports'],['จัดการ','Manage'],['เมนูหลัก','Main menu'],
['ยื่นเมื่อ','Filed'],['ยื่น','Filed'],['โดย','by'],['พบ','Found'],['ตรง','Match'],['ข้อ','pts'],['รูป','photo(s)'],['วัน','days'],['เดือน','Month'],['ปี','Year'],['บันทึก','Save'],['แก้ไข','Edit'],['ลบ','Delete'],['เพิ่ม','Add'],
['กระเป๋าสตางค์สีดำ','Black wallet'],['โทรศัพท์มือถือ เคสสีฟ้า','Phone with light-blue case'],['ร่มสีน้ำเงิน','Navy umbrella'],['หูฟังไร้สายสีขาว','White wireless earbuds'],['บัตรนักศึกษา','Student ID card'],
['เคสมีสติกเกอร์หัวใจสีชมพู','Case has a pink heart sticker'],['เคสมีสติกเกอร์รูปแมว','Case has a cat sticker'],['คำตอบไม่ตรงกับลักษณะของสิ่งของ','Answers do not match the item'],
['ห้องกิจการนักศึกษา','Student Affairs Office'],['เคาน์เตอร์ห้องสมุด','Library counter'],['โรงอาหารกลาง','Central canteen'],['ห้องสมุด','Library'],['อาคารเรียน','Building'],
['อุปกรณ์ไอที','IT devices'],['บัตรต่างๆ','Cards'],['ของใช้ส่วนตัว','Personal items'],['กระเป๋า','Bags'],
['มีรอยขีดข่วน','Scratches'],['มีพวงกุญแจ','Keychain'],['มีสติกเกอร์','Sticker'],['มีบัตรอยู่ข้างใน','Cards inside'],['ไม่มีจุดเด่น','No marks'],
['สมหญิง รักเรียน','Somying Rakrian'],['สมชาย ใจดี','Somchai Jaidee'],['สมศรี ตั้งใจ','Somsri Tangjai'],['สมหญิง','Somying'],['สมชาย','Somchai'],['สมศรี','Somsri'],
['น้ำเงิน','Navy'],['น้ำตาล','Brown'],['เหลือง','Yellow'],['เขียว','Green'],['ชมพู','Pink'],['ม่วง','Purple'],['ขาว','White'],['แดง','Red'],['ดำ','Black'],['ฟ้า','Light blue'],['ส้ม','Orange'],['เงิน','Silver'],['อื่น ๆ','Other'],['สี','Color']
];

let LANG='th';try{LANG=localStorage.getItem('lf-lang')==='en'?'en':'th'}catch(e){}
const MEN=['January','February','March','April','May','June','July','August','September','October','November','December'];
const MF=()=>LANG==='en'?MEN:MFULL;const YO=()=>LANG==='en'?0:543;
const WD=()=>LANG==='en'?['Su','Mo','Tu','We','Th','Fr','Sa']:['อา','จ','อ','พ','พฤ','ศ','ส'];
const DSORT=DICT.slice().sort((a,b)=>b[0].length-a[0].length),DMAP=new Map(DICT);
const trS=t=>{if(LANG!=='en'||!t||!/[฀-๿]/.test(t))return t;const k=t.trim();if(DMAP.has(k))return t.replace(k,DMAP.get(k));let r=t;for(const[a,b]of DSORT)if(r.includes(a))r=r.split(a).join(b);return r};
function trNode(root){if(LANG!=='en'||!root)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentNode&&/^(TEXTAREA|SCRIPT|STYLE)$/.test(n.parentNode.nodeName)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
 let n;while(n=w.nextNode()){const v=trS(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v}
 root.querySelectorAll('[placeholder],[aria-label],[title],[alt]').forEach(el=>['placeholder','aria-label','title','alt'].forEach(a=>{const v=el.getAttribute(a);if(v){const t=trS(v);if(t!==v)el.setAttribute(a,t)}}))}
const thd=iso=>{if(!iso)return'-';const d=new Date(iso+'T00:00');return LANG==='en'?d.getDate()+' '+MEN[d.getMonth()].slice(0,3)+' '+d.getFullYear():d.getDate()+' '+MTH[d.getMonth()]+' '+String(d.getFullYear()+543).slice(2)};
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const today=()=>iso(new Date());
const addDays=(s,n)=>{const d=new Date(s+'T00:00');d.setDate(d.getDate()+n);return iso(d)};
