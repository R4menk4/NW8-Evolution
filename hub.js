(()=>{'use strict';
function update(){try{
 const certificate=JSON.parse(localStorage.getItem('evolution-selbststaendig-v1-abschluss')||'null');
 const state=JSON.parse(localStorage.getItem('evolution-selbststaendig-v1')||'null');
 document.querySelector('#chapter-state').textContent=certificate?.name?'Abgeschlossen · Wiederholen möglich':state&&Object.values(state.checked||{}).some(Boolean)?'Bereits begonnen':'Ohne Arbeitsblatt bearbeitbar';
 document.querySelector('#open-text').textContent=certificate?.name?'Zum Lernprogramm':state&&Object.values(state.checked||{}).some(Boolean)?'Weiterlernen':'Lernprogramm öffnen';
const stepCert=JSON.parse(localStorage.getItem('evolution-schrittweise-v1-abschluss')||'null');const step=JSON.parse(localStorage.getItem('evolution-schrittweise-v1')||'null');document.querySelector('#step-state').textContent=stepCert?.name?'Abgeschlossen · Wiederholen möglich':step&&Object.values(step.checked||{}).some(Boolean)?'Bereits begonnen':'Ohne Arbeitsblatt bearbeitbar';document.querySelector('#step-open').textContent=stepCert?.name?'Zum Lernprogramm':step&&Object.values(step.checked||{}).some(Boolean)?'Weiterlernen':'Lernprogramm öffnen';
}catch{/* The program remains accessible when browser storage is unavailable. */}}
update();window.addEventListener('pageshow',update);window.addEventListener('storage',update);
})();
