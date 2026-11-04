(()=>{'use strict';
function update(){try{
 const certificate=JSON.parse(localStorage.getItem('evolution-selbststaendig-v1-abschluss')||'null');
 const state=JSON.parse(localStorage.getItem('evolution-selbststaendig-v1')||'null');
 document.querySelector('#chapter-state').textContent=certificate?.name?'Abgeschlossen · Wiederholen möglich':state&&Object.values(state.checked||{}).some(Boolean)?'Bereits begonnen':'Ohne Arbeitsblatt bearbeitbar';
 document.querySelector('#open-text').textContent=certificate?.name?'Zum Lernprogramm':state&&Object.values(state.checked||{}).some(Boolean)?'Weiterlernen':'Lernprogramm öffnen';
}catch{/* The program remains accessible when browser storage is unavailable. */}}
update();window.addEventListener('pageshow',update);window.addEventListener('storage',update);
})();
