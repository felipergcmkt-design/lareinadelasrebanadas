document.getElementById('year').textContent = new Date().getFullYear();
const launchDialog = document.getElementById('launch-dialog');
document.querySelector('.launch-button').addEventListener('click', () => launchDialog.showModal());
document.querySelectorAll('.dialog-close, .dialog-dismiss').forEach(button => {
  button.addEventListener('click', () => launchDialog.close());
});
launchDialog.addEventListener('click', event => {
  if (event.target === launchDialog) {
    const bounds = launchDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) launchDialog.close();
  }
});
