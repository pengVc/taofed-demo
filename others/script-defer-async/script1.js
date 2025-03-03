// script1.js
console.log('Script 1 loaded and executed');
document.getElementById('app').innerText = 'Script 1 executed';

Promise.resolve().then(() => {
  console.log('Promise from script1 resolved');
});
