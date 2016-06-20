OE.checkFleets = (function() {
  const __dictionary = {
    attack: ".flight.attack"
  };

  function __init() {
    setTimeout(() => {
      let $attacks = $(__dictionary.attack);
      $attacks.each(function( index ) {
        let links = $(this).find('a');
        let from = links.eq(2).text();
        let to = links.eq(3).text();
        alert(`Fleet from: ${from} is attacking your planet: ${to}!`);
      });
    }, 1000);
  }

  __init();
})();
