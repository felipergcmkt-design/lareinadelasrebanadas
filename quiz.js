'use strict';
const questions = [
{category:'TU PUNTO DE PARTIDA',title:'¿Qué edad tienes?',answers:['De 18 a 34 años.','35 años o más.']},
{category:'TU DISPONIBILIDAD',title:'¿Cuánto tiempo podrías dedicar cada semana a preparar tus primeras rebanadas?',answers:['De 1 a 3 horas por semana.','El tiempo que sea necesario.']},
{category:'¿ESTÁS LISTA PARA EMPEZAR?',title:'Si pudieras pasar de principiante a profesional, ¿estarías lista para comenzar?',answers:['Sí, quiero aprender paso a paso y empezar ahora.','Quiero aprender, pero necesito más tiempo para organizarme.']}
];
let step=0;
const form=document.getElementById('quiz-form'),answerList=document.getElementById('answers'),title=document.getElementById('question-title'),questionScreen=document.getElementById('question-screen'),resultScreen=document.getElementById('result-screen');
// Keep attribution parameters; individual responses stay only in this page's memory.
document.getElementById('offer-link').href='/oferta'+window.location.search;
function renderQuestion(focus=false){
 const q=questions[step];title.textContent=q.title;answerList.replaceChildren();
 q.answers.forEach(text=>{
  const button=document.createElement('button');button.type='button';button.className='answer-option';
  button.setAttribute('aria-label',text);
  const span=document.createElement('span');span.textContent=text;
  const arrow=document.createElement('span');arrow.className='answer-arrow';arrow.textContent='→';arrow.setAttribute('aria-hidden','true');
  button.append(span,arrow);
  button.addEventListener('click',()=>{
   if(step<questions.length-1){step++;renderQuestion(true);}else showResult();
  });answerList.append(button);
 });
 if(focus)title.focus();
}
function showResult(){
 questionScreen.hidden=true;
 resultScreen.hidden=false;
 document.body.classList.add('quiz-complete');
 document.getElementById('result-title').focus();
}
form.addEventListener('submit',event=>event.preventDefault());
renderQuestion();
