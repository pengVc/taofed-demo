// script1.js
console.log('Script 1：loaded and executed');

oDiv = document.createElement('div')
oDiv.innerText = 'Script 1 executed'

document.getElementById('app').appendChild(oDiv)

setTimeout(() => {
  console.log('script1：Timeout triggered');
}, 0);

Promise.resolve().then(() => {
  console.log('script1：Promise resolved');
});
