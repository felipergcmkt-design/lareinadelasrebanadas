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
 const titles=['Empieza por una receta, paso a paso.','Empieza con claridad en tus números.','Tu comienzo puede tener un plan.'];
 const intros=['Buscas recetas que te ayuden a sentir más confianza. Te proponemos comenzar con una sola base y repetirla antes de ampliar tu menú.','Quieres saber cuánto necesitas y cómo poner precio. Tu primer paso puede ser calcular una producción pequeña antes de comprar.','Quieres una guía que conecte la preparación con las ventas. Tu primer paso puede ser organizar un recorrido sencillo y realista.'];
 const experience=['Como aún no has preparado para vender, empieza por una prueba antes de tomar pedidos.','Como ya preparas para tu familia, practica porciones uniformes y registra el rendimiento.','Para ganar confianza, elige una tarea pequeña que puedas practicar sin presión.'];
 document.getElementById('result-title').textContent=titles[answers[4]];document.getElementById('result-intro').textContent=intros[answers[4]]+' '+experience[answers[0]];
 const time=['Reserva un bloque después del trabajo y separa la preparación de las entregas.','Distribuye compras, preparación y entregas en los espacios que tengas disponibles.','Organiza una prueba el fin de semana, con tiempo para preparar, enfriar y presentar.'];
 const investment=['Haz una lista de los utensilios que ya tienes y de lo indispensable para tu primera receta.','Calcula ingredientes y empaque para pocas porciones antes de hacer compras.','Estima costos y consulta el interés de posibles clientes antes de producir.'];
 const sales=['Piensa en un pequeño grupo cercano y averigua qué sabores les interesan.','Prepara una foto clara y un mensaje breve para presentar tu primer menú.','Consulta el interés o toma pedidos antes de preparar más de lo necesario.'];
 const plan=document.getElementById('result-plan');plan.replaceChildren();[['01 · Cuida tu inversión',investment[answers[1]]],['02 · Encuentra tu momento',time[answers[2]]],['03 · Acércate a tu primera venta',sales[answers[3]]]].forEach(([heading,copy])=>{const article=document.createElement('article'),h3=document.createElement('h3'),p=document.createElement('p');h3.textContent=heading;p.textContent=copy;article.append(h3,p);plan.append(article);});questionScreen.hidden=true;resultScreen.hidden=false;document.getElementById('result-title').focus();
}
form.addEventListener('submit',event=>event.preventDefault());
back.addEventListener('click',()=>{if(step>0){step--;renderQuestion(true);}});
document.getElementById('restart-button').addEventListener('click',()=>{step=0;answers=Array(questions.length).fill(null);resultScreen.hidden=true;questionScreen.hidden=false;renderQuestion(true);});
renderQuestion();
