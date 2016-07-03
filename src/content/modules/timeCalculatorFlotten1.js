OE.timeCalculatorFlotten1 = (function() {
  let $flottenTable;
  let $flottenRecall;
  const dateFormat = 'D MMMM YYYY, HH:mm:ss';
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

  function updateReturnTimes() {
    if($flottenReturn.length > 0) {
      $.each($flottenReturn, function(index, element) {
        let $return = $(element);
        let departure = moment($return.parent().find('th:nth-child(5)').text());
        let arrival = moment($return.parent().find('th:nth-child(7)').text());
        let returnTime = moment(arrival).add(arrival.diff(departure) / 1000, 'seconds');
        $return.html(returnTime.format(dateFormat));
      });
    }
  }

  function updateRecallTimes() {
    if($flottenRecall.length > 0) {
      $.each($flottenRecall, function(index, element) {
        let $recall = $(element);
        if($recall.prev().find('form').length > 0) {
          let departure = moment($recall.parent().find('th:nth-child(5)').text());
          let recallTime = moment().add(moment().diff(departure) / 1000, 'seconds');
          $recall.html(recallTime.format(dateFormat));
        }
      });
    }
  }

  function __init() {
    if(OE.Storage.get('Active') === 'true' && OE.Storage.get('TimeCalculatorActive') === 'true') {
      let language = OE.Storage.get('Language') || 'en';

      $flottenTable = $('#content > center > center > table > tbody');

      $flottenTable.find('> tr:nth-child(1) td').attr('colspan', 10);

      $flottenTableHeader = $flottenTable.find('> tr:nth-child(2)');

      $flottenTableHeader.find('th:nth-last-child(2)').after('<th>Return Time</th>');

      $flottenTableHeader.find('th:nth-last-child(1)').after('<th>Recall Time</th>');

      $flottenTable.find('> tr:nth-child(n + 3)').find('th:nth-last-child(2)').after('<th class="return"></th>');

      $flottenTable.find('> tr:nth-child(n + 3)').find('th:nth-last-child(1)').after('<th class="recall"></th>');

      $flottenReturn = $flottenTable.find('.return');

      $flottenRecall = $flottenTable.find('.recall');

      updateReturnTimes();

      setInterval(updateRecallTimes, 1000);
    }
  }

  $( document ).ready( function() {
    OE.Storage.ready(__init);
  });
})();
