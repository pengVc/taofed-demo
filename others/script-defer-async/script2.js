// script2.js
console.log('Script 2 loaded and executed');
document.getElementById('app').innerText += ', Script 2 executed';

setTimeout(() => {
  console.log('Timeout from script2 triggered');
}, 0);
