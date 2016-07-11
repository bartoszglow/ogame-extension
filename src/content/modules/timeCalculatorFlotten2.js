OE.timeCalculatorFlotten2 = (function() {
  let $arrivalTime;
  let $returnTime;
  let $duration;
  const dateFormat = 'D MMMM YYYY, HH:mm:ss';
  let markup = '';
  const dictionary = {
    en: {
      timeOfArrival: 'Date / Time of arrival',
      timeOfReturn: 'Date / Time of return'
    },
    pl: {
      timeOfArrival: 'Data / czas dolotu',
      timeOfReturn: 'Data / czas powrotu'
    }
  };

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

  function preparePasteCoordsButton() {
    $('select[name="planettype"]').after('&nbsp<a class="pasteCoords" href="">[paste]</a>');

    $('.pasteCoords').click(function(e) {
      e.preventDefault();
      let coords = OE.Storage.get('CoordsCopy');
      $('input[name="galaxy"]').val(coords[0]);
      $('input[name="system"]').val(coords[1]);
      $('input[name="planet"]').val(coords[2])[0].dispatchEvent(new Event('change'));
    });
  }

  function __init() {
    if(OE.Storage.get('Active') === 'true' && OE.Storage.get('TimeCalculatorActive') === 'true') {
      let language = OE.Storage.get('Language') || 'en';
      markup = `
        <tr height="20">
          <th>${dictionary[language].timeOfArrival}</th>
          <th class="arrival-time"></th>
        </tr>
        <tr height="20">
          <th>${dictionary[language].timeOfReturn}</th>
          <th class="return-time"></th>
        </tr>
      `;

      $duration = $('#duration');

      $duration.closest('tr').after(markup);

      $arrivalTime = $('.arrival-time');
      $returnTime = $('.return-time');

      updateTime();
      preparePasteCoordsButton();

      setInterval(updateTime, 1000);
    }
  }

  $( document ).ready( function() {
    OE.Storage.ready(__init);
  });
})();
