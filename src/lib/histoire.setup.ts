import 'bulma/css/bulma.css'


const webComponentScript = () => {
  const scriptSrc = {
    development: 'http://localhost:5173/dist/main.js'
  }

  const script = document.createElement('script');
  script.src = scriptSrc[process.env?.NODE_ENV as string || 'development']

  document.head.appendChild(script)
}

export function setupVue3({ app }) {
  
  webComponentScript();

  app.provide('test', 'hello')
  // app.use(...)
}
