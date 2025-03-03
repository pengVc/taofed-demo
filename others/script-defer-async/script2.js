// script2.js
console.log('Script 2 loaded and executed');

oDiv = document.createElement('div')
oDiv.innerText = 'Script 2 executed'

document.getElementById('app').appendChild(oDiv)

setTimeout(() => {
  console.log('Timeout from script2 triggered');
}, 0);


Promise.resolve().then(() => {
  console.log('Promise from script2 resolved');
});
