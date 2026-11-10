(function(root){'use strict';
const counts=animals=>({light:animals.filter(a=>a.color==='light').length,dark:animals.filter(a=>a.color==='dark').length});
const environment=g=>g<=3?'light':g<=6?'polluted':'clean';
function population(light,dark,rng=Math.random){
 const colors=[...Array(light).fill('light'),...Array(dark).fill('dark')];
 for(let i=colors.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[colors[i],colors[j]]=[colors[j],colors[i]]}
 const animals=[];
 colors.forEach((color,id)=>{let best=null,bestDistance=-1;
  for(let attempt=0;attempt<400;attempt++){
   const point={x:1+rng()*87,y:1+rng()*77};
   const distance=animals.length?Math.min(...animals.map(a=>Math.hypot((point.x-a.x)/12,(point.y-a.y)/22))):Infinity;
   if(distance>bestDistance){best=point;bestDistance=distance}
   if(distance>=1.15)break;
  }
  animals.push({id,color,caught:false,...best,angle:Math.round(rng()*150-75)});
 });return animals;
}
function reproduce(animals){const survivors=counts(animals.filter(a=>!a.caught)),total=survivors.light+survivors.dark;const light=total?Math.round(16*survivors.light/total):0;return {survivors,offspring:{light,dark:total?16-light:0}}}
const api={counts,environment,population,reproduce};root.MothEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
