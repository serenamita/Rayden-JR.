(()=>{
const form=document.getElementById("access-form");
if(form){
 const levels=document.getElementById("access-levels"),message=document.getElementById("access-message"),close=document.getElementById("access-message-close");
 const formFields=form.querySelectorAll("input"),title=document.getElementById("access-message-title"),copy=document.getElementById("access-message-copy"),image=document.getElementById("access-message-image"),tag=document.getElementById("access-message-tag");
 let denied=false;
 const responses={
  "Amiguito":["¡Bienvenido FREAK!","Deadpoool.jpg"],
  "Cómplice":["Bueno, Ola, lamento que andes aca.","Deadpoool.jpg"],
  "Familia":["Bienvenido a casa. Lamentamos que te haya tocado esta familia.","Deadpoool.jpg"],
  "Un HUmano":["No sabemos cómo terminaste aquí, pero JELOOO!","Deadpoool.jpg"],
  "Persona sospechosa":["Te estaremos vigilando. Disfruta tu estancia.","Deadpoool.jpg"],
  "Enemigo":["NOPE, GO TOUCH GRASS.\n¿TÚ QUIÉN ERES Y QUÉ HACES ACÁ?","DIEE.jpg"]
 };
 form.addEventListener("submit",event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  form.hidden=true;levels.hidden=false;levels.querySelector("button").focus();
 });
 document.getElementById("edit-access").addEventListener("click",()=>{
  levels.hidden=true;form.hidden=false;formFields[0].focus();
 });
 levels.addEventListener("click",event=>{
  const button=event.target.closest("button[data-level]");
  if(!button)return;
  denied=button.dataset.level==="Enemigo";
  const [text,photo]=responses[button.dataset.level];
  tag.textContent=denied?"403 · ACCESO DENEGADO":"ACCESO CONCEDIDO · "+button.dataset.level.toUpperCase();
  title.textContent=denied?"ACCESS DENIED":"¡BIENVENIDO!";
  title.classList.toggle("denied",denied);
  copy.textContent=text;
  image.src="img/poolimages/"+photo;
  image.alt=denied?"Dibujo de Deadpool para el aviso de acceso denegado":"Deadpool te da la bienvenida";
  close.textContent=denied?"Volver":"Cerrar";
  message.hidden=false;close.focus();
 });
 close.addEventListener("click",()=>{
  message.hidden=true;
  if(denied){
   form.reset();levels.hidden=true;form.hidden=false;formFields[0].focus();
  }else location.href="things.html";
 });
}
document.querySelectorAll(".meter-fill[data-value]").forEach(fill=>{
 const target=Number(fill.dataset.value),meter=fill.parentElement;
 const label=meter.previousElementSibling.querySelector("b"),digits=String(target).split(".")[1];
 const start=performance.now(),duration=1100;
 const render=now=>{
  const progress=Math.min((now-start)/duration,1),value=target*progress;
  label.textContent=(digits?value.toFixed(digits.length):Math.round(value))+" %";
  const width=Math.min(Math.abs(value)/2,50);
  fill.style.width=width+"%";
  fill.classList.toggle("negative",target<0);
  if(progress<1)requestAnimationFrame(render);
 };
 requestAnimationFrame(render);
});
})();
