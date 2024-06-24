import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationMenu'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const buttonSkipToContent = document.querySelector('.skip-link');
  const mainElement = document.querySelector('#mainContent');

  buttonSkipToContent.addEventListener('click', (event) => {
    event.preventDefault();
    mainElement.scrollIntoView();
  });
  buttonSkipToContent.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      mainElement.scrollIntoView();
    }
  });
});