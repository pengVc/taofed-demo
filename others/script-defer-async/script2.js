// script2.js
console.log('Script 2：loaded and executed');

oDiv = document.createElement('div')
oDiv.innerText = 'Script 2 executed'

document.getElementById('app').appendChild(oDiv)

setTimeout(() => {
  console.log('script2：Timeout triggered');
}, 0);


Promise.resolve().then(() => {
  console.log('script2：Promise resolved');
});
