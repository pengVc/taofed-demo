const runShadow = (params) => {
  const { hostId, mode = 'open' } = params ?? {}

  const app = document.querySelector(`#${hostId}`)

  const shadow = app.attachShadow({ mode})

  shadow.innerHTML = `
  <article>
    <h2>hello ${mode} shadow dom</h2>
     <section>
      <button id="btn"> click me </button>
     </section>
  </article>
`
  console.log('shadow root', {
    'shadow': shadow,
    'shadow root': app.shadowRoot,
  });

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
      'event.composedPath': event.composedPath(),
      'event.currentTarget': event.currentTarget,
    })
  })


  document.body.addEventListener('click', (event) => {
    console.log('document.body clicked listener', {
      'event.target': event.target,
      'event.composedPath': event.composedPath(),
      'event.currentTarget': event.currentTarget,
    })
  })

}

runShadow({
  hostId: 'open-shadow-host',
  mode: 'open'
})

runShadow({
  hostId: 'closed-shadow-host',
  mode: 'closed'
})
