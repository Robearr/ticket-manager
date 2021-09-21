function maybeConvertToTwoDigits(number) {
  return number < 10 ? `0${number}` : number;
}

// TODO meg lehessen adni dátumot
window.addEventListener('message', (evt) => {
  const textarea = document.querySelector('textarea');
  const tickets = JSON.parse(evt.data || '[]');
  const today = new Date();

  const unfinishedTickets = (tickets || []).filter((ticket) => !ticket.hours);
  const finishedTickets = (tickets || []).filter((ticket) => ticket.hours);

  const text = finishedTickets.map(
    (ticket) => `${maybeConvertToTwoDigits(today.getMonth() + 1)}-${maybeConvertToTwoDigits(today.getDate())} ${ticket.hours} ${ticket.ticketNumber} ${ticket.ticketTitle}`
  );

  const workedHours = finishedTickets.reduce((prev, cur) => prev += cur.hours, 0);
  const dividedRemainingHours = Math.floor((8 - workedHours) / unfinishedTickets.length);

  unfinishedTickets.forEach(
    (ticket) => {
      text.push(`
        ${maybeConvertToTwoDigits(today.getMonth() + 1)}-${maybeConvertToTwoDigits(today.getDate())} ${dividedRemainingHours} ${ticket.ticketNumber} ${ticket.ticketTitle}
      `.trim());
    }
  )

  textarea.value = text.join('\n');
});

window.addEventListener('load', () => {
  parent.postMessage(JSON.stringify({}), '*');
});

