OE.timeCalculator = (function() {
  let $arrivalTime;
  let $returnTime;
  let $duration;
  let dateFormat = 'D MMMM YYYY, HH:mm:ss';
  let markup = `
    <tr height="20">
      <th>Date / Time of arrival</th>
      <th class="arrival-time"></th>
    </tr>
    <tr height="20">
      <th>Date / Time of return</th>
      <th class="return-time"></th>
    </tr>
  `;

  function addTime(time, timeString) {
    return time.add(timeString[0], 'hours').add(timeString[1], 'minutes').add(timeString[2], 'seconds');
  }

  function updateTime() {
    let timeString = $duration.html().slice(0, -2).split(':');
    let arrivalTime = addTime(moment(), timeString);
    let returnTime = addTime(moment(arrivalTime), timeString);
    $arrivalTime.html(arrivalTime.format(dateFormat));
    $returnTime.html(returnTime.format(dateFormat));
  }

  function __init() {
    if(OE.Storage.get('Active') === 'true' && OE.Storage.get('TimeCalculatorActive') === 'true') {
      $duration = $('#duration');

      $duration.closest('tr').after(markup);

      $arrivalTime = $('.arrival-time');
      $returnTime = $('.return-time');

      updateTime();

      setInterval(updateTime, 1000);
    }
  }

  $( document ).ready( __init );
})();
