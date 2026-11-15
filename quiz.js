'use strict';
const questions = [
{category:'TU PUNTO DE PARTIDA',title:'¿Qué edad tienes?',answers:['De 18 a 34 años.','35 años o más.']},
{category:'TU DISPONIBILIDAD',title:'¿Cuánto tiempo podrías dedicar cada semana a preparar tus primeras rebanadas?',answers:['De 1 a 3 horas por semana.','4 horas o más por semana.']},
{category:'¿ESTÁS LISTA PARA EMPEZAR?',title:'Si pudieras pasar de principiante a profesional, ¿estarías lista para comenzar?',answers:['Sí, quiero empezar ahora.','Quiero aprender paso a paso antes de comenzar.']}
];
let step=0;let answers=Array(questions.length).fill(null);
const form=document.getElementById('quiz-form'),answerList=document.getElementById('answers'),back=document.getElementById('back-button'),title=document.getElementById('question-title'),questionScreen=document.getElementById('question-screen'),resultScreen=document.getElementById('result-screen');
// Keep attribution parameters; individual responses stay only in this page's memory.
document.getElementById('offer-link').href='/oferta'+window.location.search;
function renderQuestion(focus=false){
 const q=questions[step];document.getElementById('step-category').textContent=q.category;document.getElementById('step-count').textContent=`${step+1} de ${questions.length}`;document.getElementById('progress-fill').style.width=`${(step+1)/questions.length*100}%`;document.querySelector('.quiz-progress').setAttribute('aria-valuenow',String(step+1));title.textContent=q.title;answerList.replaceChildren();
 q.answers.forEach((text,index)=>{
  const button=document.createElement('button');button.type='button';button.className='answer-option';
  button.setAttribute('aria-label',text);
  if(answers[step]===index){button.classList.add('previous-answer');button.setAttribute('aria-describedby','step-count');}
  const span=document.createElement('span');span.textContent=text;
  const arrow=document.createElement('span');arrow.className='answer-arrow';arrow.textContent='→';arrow.setAttribute('aria-hidden','true');
  button.append(span,arrow);
  button.addEventListener('click',()=>{
   answers[step]=index;
   if(step<questions.length-1){step++;renderQuestion(true);}else showResult();
  });answerList.append(button);
 });
 back.disabled=step===0;if(focus)title.focus();
}
function showResult(){
 questionScreen.hidden=true;
 resultScreen.hidden=false;
 document.body.classList.add('quiz-complete');
 document.getElementById('result-title').focus();
}
form.addEventListener('submit',event=>event.preventDefault());
back.addEventListener('click',()=>{if(step>0){step--;renderQuestion(true);}});
renderQuestion();
