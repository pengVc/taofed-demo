// script1.js
console.log('Script 1 loaded and executed');

oDiv = document.createElement('div')
oDiv.innerText = 'Script 1 executed'

document.getElementById('app').appendChild(oDiv)

setTimeout(() => {
  console.log('Timeout from script1 triggered');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise from script1 resolved');
});
