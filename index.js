(() => {
  const clock = new Clock();
  window.addEventListener("DOMContentLoaded", (event) => {
    document.body.appendChild(clock.getContainer());
    clock.start();
  });  
})();