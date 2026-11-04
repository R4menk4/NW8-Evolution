(()=>{'use strict';
const KEY='evolution-schrittweise-v1', CERT=KEY+'-abschluss';
const pages=[...document.querySelectorAll('.page')],nav=[...document.querySelectorAll('[data-page]')];
let state={page:0,answers:{},checked:{},orders:{}},certificate=null,storageOK=true,comparison={slots:{},checked:false};
function read(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}}
const initialOrders=new Map([...document.querySelectorAll('.sort')].map(t=>[t.dataset.id,[...t.querySelectorAll('li')].map(li=>li.dataset.key)]));
const old=read(KEY);
if(old&&typeof old==='object'){for(const k of ['answers','checked','orders'])if(old[k]&&typeof old[k]==='object')state[k]=old[k];if(Number.isInteger(old.page))state.page=old.page;}
function readCertificate(){const c=read(CERT);return c&&typeof c.name==='string'&&c.name.trim()&&typeof c.date==='string'&&!isNaN(Date.parse(c.date))?c:null;}
certificate=readCertificate();
function storageWarning(){document.querySelector('#storage').textContent=storageOK?'Lernstand wird auf diesem Gerät gespeichert.':'Speichern nicht möglich. Browser-Speicherung aktivieren und diese Seite erneut laden. Der Abschluss kann erst mit funktionierender Speicherung gesichert werden.';}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=localStorage.getItem(KEY)===JSON.stringify(state)}catch{storageOK=false}storageWarning();return storageOK;}
function quizGood(f){return state.checked[f.dataset.id]===true&&state.answers[f.dataset.id]===f.dataset.answer;}
function sortGood(t){const a=state.orders[t.dataset.id],e=t.dataset.order.split(',');return state.checked[t.dataset.id]===true&&Array.isArray(a)&&a.length===e.length&&a.every((x,i)=>x===e[i]);}
function comparisonGood(){return comparison.checked===true&&comparison.slots&&[...document.querySelectorAll('[data-slot]')].every(c=>comparison.slots[c.dataset.slot]===c.dataset.expected);}
function tasks(p){return [...p.querySelectorAll('form.quiz,.sort,.comparison-task')];}
function good(t){return t.classList.contains('quiz')?quizGood(t):t.classList.contains('sort')?sortGood(t):comparisonGood();}
function completed(i){const ts=tasks(pages[i]);return ts.length>0&&ts.every(good);}
function unlocked(){if(certificate)return pages.length-1;let n=0;while(n<pages.length-1&&completed(n))n++;return n;}
function feedback(el,ok,msg){el.className='feedback '+(ok?'correct':'incorrect');el.textContent=(ok?'✓ ':'↻ ')+msg;}
function renderCertificate(){if(!certificate)return;document.querySelector('#name-entry').hidden=true;document.querySelector('#certificate').hidden=false;document.querySelector('#certificate-name').textContent=certificate.name;document.querySelector('#certificate-date').textContent='Abgeschlossen am '+new Date(certificate.date).toLocaleString('de-DE',{dateStyle:'long',timeStyle:'short'});}
function update(){
 const limit=unlocked();state.page=Math.max(0,Math.min(state.page,limit));
 nav.forEach((b,i)=>{b.disabled=i>limit;b.classList.toggle('done',i<pages.length-1&&completed(i));if(i===state.page)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');b.title=i>limit?'Bearbeite zuerst alle Aufgaben der vorherigen Seite.':'';});
 pages.forEach((p,i)=>{p.hidden=i!==state.page;const locked=completed(i);for(const t of tasks(p))for(const e of t.querySelectorAll('input,button'))e.disabled=locked;});
 document.querySelector('#prev').disabled=state.page===0;
 document.querySelector('#next').disabled=state.page>=limit||state.page===pages.length-1;
 document.querySelector('#position').textContent=`${Math.min(limit,pages.length-1)} / ${pages.length-1} Lernseiten geschafft`;
 document.querySelector('#progressBar').style.width=`${limit/(pages.length-1)*100}%`;
 const ts=tasks(pages[state.page]),count=ts.filter(good).length;
 document.querySelector('#page-status').textContent=state.page===pages.length-1?'Alle Lernseiten abgeschlossen. Sichere hier deinen Abschlussnachweis.':completed(state.page)?'✓ Alle Aufgaben dieser Seite sind richtig gelöst. Du kannst weitergehen.':certificate?`Wiederholung: Richtig gelöst: ${count} von ${ts.length}. Dein gespeicherter Abschluss bleibt erhalten.`:`Richtig gelöst: ${count} von ${ts.length}. Löse alle Aufgaben, um die nächste Seite freizuschalten.`;
 pages.forEach(p=>{const b=p.querySelector('.repeat-page');if(b)b.hidden=!certificate;});
 renderCertificate();save();
}
function show(n){if(!Number.isInteger(n)||n<0||n>unlocked()||n>=pages.length)return;state.page=n;update();document.querySelector('#main').focus();window.scrollTo(0,0);}
nav.forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.page))));
document.querySelector('#prev').onclick=()=>show(state.page-1);document.querySelector('#next').onclick=()=>show(state.page+1);
document.querySelectorAll('.quiz').forEach(f=>{
 const id=f.dataset.id;
 const render=()=>{if(state.checked[id]!==undefined)feedback(f.querySelector('.feedback'),quizGood(f),quizGood(f)?f.dataset.ok:f.dataset.no);};
 for(const input of f.querySelectorAll('input')){input.checked=input.value===state.answers[id];input.addEventListener('change',()=>{if(completed(pages.indexOf(f.closest('.page'))))return;state.answers[id]=input.value;delete state.checked[id];f.querySelector('.feedback').textContent='';update();});}
 f.addEventListener('submit',e=>{e.preventDefault();const pi=pages.indexOf(f.closest('.page'));if(pi>unlocked()||completed(pi))return;const selected=f.querySelector('input:checked');if(!selected){feedback(f.querySelector('.feedback'),false,'Wähle zuerst eine Antwort.');return;}state.answers[id]=selected.value;state.checked[id]=selected.value===f.dataset.answer;render();update();});render();
});
document.querySelectorAll('.sort').forEach(t=>{
 const id=t.dataset.id,list=t.querySelector('ol'),expected=t.dataset.order.split(',');
 const saved=state.orders[id];if(Array.isArray(saved)&&saved.length===expected.length&&new Set(saved).size===expected.length&&saved.every(k=>expected.includes(k)))saved.forEach(k=>{const li=[...list.children].find(x=>x.dataset.key===k);if(li)list.append(li);});
 const render=()=>{if(state.checked[id]!==undefined)feedback(t.querySelector('.feedback'),sortGood(t),sortGood(t)?'Die Reihenfolge stimmt.':'Prüfe die zeitliche Folge mithilfe der Informationen auf dieser Seite.');};
 list.querySelectorAll('button').forEach(b=>b.onclick=()=>{const pi=pages.indexOf(t.closest('.page'));if(completed(pi)||pi>unlocked())return;const li=b.closest('li');if(b.dataset.move==='up'&&li.previousElementSibling)list.insertBefore(li,li.previousElementSibling);if(b.dataset.move==='down'&&li.nextElementSibling)list.insertBefore(li.nextElementSibling,li);state.orders[id]=[...list.children].map(x=>x.dataset.key);delete state.checked[id];t.querySelector('.feedback').textContent='';update();b.focus();});
 t.querySelector('.sortcheck').onclick=()=>{const pi=pages.indexOf(t.closest('.page'));if(completed(pi)||pi>unlocked())return;state.orders[id]=[...list.children].map(x=>x.dataset.key);state.checked[id]=state.orders[id].every((k,i)=>k===expected[i]);render();update();};render();
});
document.addEventListener('comparison-change',e=>{comparison=e.detail;update();});

pages.slice(0,-1).forEach((p,i)=>{
 const button=document.createElement('button');button.type='button';button.className='repeat-page secondary';button.hidden=true;button.textContent='Diese Seite erneut bearbeiten';
 button.addEventListener('click',()=>{
  if(!certificate||i===pages.length-1)return;
  for(const t of tasks(p)){
   const id=t.dataset.id;delete state.answers[id];delete state.checked[id];delete state.orders[id];
   for(const input of t.querySelectorAll('input'))input.checked=false;
   for(const out of t.querySelectorAll('.feedback')){out.textContent='';out.className='feedback';}
   if(t.classList.contains('sort')){const list=t.querySelector('ol');for(const k of initialOrders.get(id)){const li=[...list.children].find(x=>x.dataset.key===k);if(li)list.append(li);}}
   if(t.classList.contains('comparison-task'))document.dispatchEvent(new Event('comparison-repeat'));
  }
  update();p.querySelector('h1')?.scrollIntoView({block:'start'});
 });
 p.append(button);
});

const form=document.querySelector('#completion-form');
async function seal(){
 certificate=readCertificate();if(certificate){renderCertificate();update();return;}
 if(unlocked()!==pages.length-1){document.querySelector('#name-feedback').textContent='Bearbeite zuerst alle Lernseiten vollständig.';return;}
 const name=document.querySelector('#student-name').value.trim().replace(/\s+/g,' ');
 if(name.length<3||!name.includes(' ')||!document.querySelector('#name-confirm').checked){document.querySelector('#name-feedback').textContent='Trage deinen Vor- und Nachnamen ein und bestätige den Hinweis.';return;}
 if(!confirm(`Soll der Name „${name}“ endgültig gespeichert werden? Danach kannst du ihn im Programm nicht mehr ändern.`))return;
 const existing=readCertificate();if(existing){certificate=existing;update();return;}
 const record={name,date:new Date().toISOString()};
 try{localStorage.setItem(CERT,JSON.stringify(record));const check=readCertificate();if(!check||check.name!==name)throw Error('Speichern fehlgeschlagen');certificate=check;storageOK=true;update();document.querySelector('#certificate').scrollIntoView({block:'center'});}
 catch{storageOK=false;storageWarning();document.querySelector('#name-feedback').textContent='Der Abschluss konnte nicht dauerhaft gespeichert werden. Aktiviere die Browser-Speicherung und versuche es erneut.';}
}
form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const button=form.querySelector('button');button.disabled=true;try{if(navigator.locks)await navigator.locks.request(CERT,seal);else await seal();}finally{button.disabled=Boolean(certificate);}});
window.addEventListener('storage',e=>{if(e.key===CERT){const saved=readCertificate();if(saved){certificate=saved;state.page=pages.length-1;update();}}});
if(certificate&&!old)state.page=pages.length-1;
comparison=read('evolution-vergleich-schrittweise-v1')||comparison;
state.page=Math.min(state.page,unlocked());update();
})();
