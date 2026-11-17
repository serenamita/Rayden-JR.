(()=>{
const questions=[
 ["¿Rayden es un idiota?",["Sí","Definitivamente sí"]],
 ["¿Quién causa más problemas?",["Rayden","Wade"]],
 ["¿Quién necesita supervisión adulta?",["Wade","También Wade"]],
 ["¿Rayden sobreviviría una semana sin meterse en problemas?",["Sí","Ni de broma"]],
 ["¿Quién tiene la culpa?",["Wade","Siempre Wade"]],
 ["¿Quién es el más dramático?",["Wade","Rayden","Ambos"]]
];
const card=document.getElementById("opinion-card");
if(!card)return;
const step=document.getElementById("opinion-step"),heading=document.getElementById("opinion-question"),options=document.getElementById("opinion-options"),back=document.getElementById("opinion-back"),next=document.getElementById("opinion-next"),progress=document.getElementById("opinion-progress-fill");
const thanks=document.getElementById("opinion-thanks"),taunt=document.getElementById("idiot-modal");
const answers=Array(questions.length).fill(null);
let current=0;
function render(){
 const [question,choices]=questions[current];
 step.textContent="PREGUNTA "+String(current+1).padStart(2,"0")+" / "+String(questions.length).padStart(2,"0");
 heading.textContent=question;options.replaceChildren();
 choices.forEach(choice=>{
  const button=document.createElement("button");
  button.type="button";button.className="btn opinion-option";button.textContent=choice;
  button.setAttribute("aria-pressed",String(answers[current]===choice));
  if(answers[current]===choice)button.classList.add("on");
  button.addEventListener("click",()=>{
   answers[current]=choice;options.querySelectorAll("button").forEach(option=>{
    const selected=option===button;option.classList.toggle("on",selected);option.setAttribute("aria-pressed",String(selected));
   });
   next.disabled=false;
  });
  options.append(button);
 });
 back.disabled=current===0;next.disabled=answers[current]===null;
 next.textContent=current===questions.length-1?"Terminar ▶":"Siguiente ▶";
 progress.style.width=((current+1)/questions.length*100)+"%";
}
back.addEventListener("click",()=>{if(current>0){current--;render()}});
next.addEventListener("click",()=>{
 if(answers[current]===null)return;
 if(current<questions.length-1){current++;render();return}
 card.hidden=true;thanks.hidden=false;
 if(answers[0]==="Sí"||answers[0]==="Definitivamente sí"){
  taunt.hidden=false;document.getElementById("idiot-close").focus();
 }
});
document.getElementById("idiot-close").addEventListener("click",()=>document.getElementById("idiot-modal").hidden=true);
render();
})();
