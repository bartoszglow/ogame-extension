OE.checkFleets = (function() {
  const dictionary = {
    en: {
      fleetFrom: 'Fleet from:',
      fleetAttacking: 'is attacking your planet'
    },
    pl: {
      fleetFrom: 'Flota z:',
      fleetAttacking: 'atakuje Twoją planetę'
    }
  };

  function __init() {
    if(OE.Storage.get('CheckFleets') === 'true') {
      let language = OE.Storage.get('Language') || 'en';

      let $attacks = $(".flight.attack");
      $attacks.each(function( index ) {
        let links = $(this).find('a');
        let from = links.eq(2).text();
        let to = links.eq(3).text();
        chrome.runtime.sendMessage({
          flightAttack: `${dictionary[language].fleetFrom}: ${from} ${dictionary[language].fleetAttacking}: ${to}!`
        });
      });
    }
  }

  $( document ).ready( function() {
    OE.Storage.ready(__init);
  });
})();
