'use strict';
const questions = [
{category:'TU PUNTO DE PARTIDA',title:'¿Te gustaría empezar a vender rebanadas de pastel, aunque no tengas experiencia?',answers:['Sí, pero nunca he preparado pasteles para vender.','Ya preparo para mi familia, pero no sé cómo empezar a vender.','Tengo ganas, pero no sé si podría hacerlo.']},
{category:'EMPEZAR CON LO NECESARIO',title:'¿Qué te preocupa más sobre la inversión inicial?',answers:['Necesitar equipo caro.','Tener poco dinero para comprar ingredientes.','Gastar y no recuperar mi inversión.']},
{category:'UN COMIENZO A TU RITMO',title:'¿Cómo te imaginas acomodando este negocio en tu rutina?',answers:['Empezaría después del trabajo.','Aprovecharía algunas horas mientras me encargo de la casa.','Empezaría los fines de semana.']},
{category:'TU PRIMERA VENTA',title:'¿Cuál sería tu mayor dificultad para conseguir la primera venta?',answers:['No saber a quién ofrecerle.','Sentir pena de promocionar mis productos.','Tener miedo de que nadie compre.']},
{category:'LO QUE TE AYUDARÍA A EMPEZAR',title:'¿Qué te daría más confianza para comenzar?',answers:['Recetas explicadas paso a paso.','Saber cuánto gastar y cuánto cobrar.','Una guía desde la preparación hasta la primera venta.']}
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
