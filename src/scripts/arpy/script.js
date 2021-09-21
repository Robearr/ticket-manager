window.addEventListener('message', (evt) => {
  console.log('got the message boss', evt);
});

window.addEventListener('load', () => {
  const textarea = document.querySelector('textarea');

  parent.postMessage(JSON.stringify({}), '*');
  console.log('sent json');
});

