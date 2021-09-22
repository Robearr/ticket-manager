const select = document.querySelector('#issue_status_id');
const options = document.querySelectorAll('#issue_status_id > option');

console.log('LOADED');

select.addEventListener('change', (evt) => {
  setTimeout(() => {
    const stage = Array.from(options).find((option) => option.value === evt.target.value)?.innerText;
    const doneStages = ['Resolved', 'Closed', 'Rejected'];

    const ticketNumber = document.querySelector('#content > h2')?.innerText?.split('#')[1];
    console.log('🚀 ~ setTimeout ~ ticketNumber', ticketNumber);
    const ticketTitle = document.querySelector('.subject')?.innerText;
    console.log('🚀 ~ setTimeout ~ ticketTitle', ticketTitle);

    parent.postMessage(JSON.stringify({
      startTime: new Date(),
      ticketNumber,
      ticketTitle,
      isDone: doneStages.includes(stage)
    }), '*');

    console.log('sent', {
      startTime: new Date(),
      ticketNumber,
      ticketTitle,
      isDone: doneStages.includes(stage)
    });

  }, 500);

});