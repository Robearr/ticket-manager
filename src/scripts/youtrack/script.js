const stage = document.querySelector('[title^="Stage: "]');
stage.addEventListener('click', () => {

  setTimeout(() => {

    const doneStages = ['Develop Done', 'Review Done', 'Waiting for Functional test', 'Waiting for Packaging', 'Done (Released)'];

    ['Develop', 'Review', 'Functional test', ...doneStages].forEach(
      (stage) => {
        document.querySelector(`[title="${stage}"]`).addEventListener('click', () => {
          const ticketNumber = document.querySelector('.issueId').innerText;
          const ticketTitle = document.querySelector('.issue-summary').innerText;
          parent.postMessage(JSON.stringify({
            startTime: new Date(),
            ticketNumber,
            ticketTitle,
            isDone: doneStages.includes(stage)
          }), '*');
        });
      }
    );
  }, 500);

})