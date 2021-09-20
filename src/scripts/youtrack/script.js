const stage = document.querySelector('[title^="Stage: "]');
stage.addEventListener('click', () => {

  setTimeout(() => {
    ['Develop', 'Review', 'Functional test'].forEach(
      (stage) => {
        document.querySelector(`[title="${stage}"]`).addEventListener('click', () => {
          const ticketNumber = document.querySelector('.issueId').innerText;
          const ticketTitle = document.querySelector('.issue-summary').innerText;
          parent.postMessage(JSON.stringify({
            date: new Date(),
            ticketNumber,
            ticketTitle
          }), '*');
        });
      }
    );
  }, 500);

})