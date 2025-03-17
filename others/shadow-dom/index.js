const app = document.querySelector('#app')

const shadow = app.attachShadow({ mode: 'open'})

shadow.innerHTML = `
  <article>
    <h2>hello shadow dom</h2>
     <section>
      <button id="btn"> click me </button>
     </section>
  </article>
`

const sdBtn = shadow.querySelector('#btn')

sdBtn.addEventListener('click', (event) => {
  console.log('shadow dom btn clicked listener', {
    'event.target': event.target,
    'event.currentTarget': event.currentTarget,
  })
})

app.addEventListener('click', (event) => {
  console.log('shadow host clicked listener', {
    'event.target': event.target,
    'event.currentTarget': event.currentTarget,
  })
})
