OE.coordsCopy = (function() {
  let __extensionActive = false;
  let __coordsShortcutActive = false;

  function __init() {
    OE.Storage.ready(() => {
      __extensionActive = OE.Storage.get('Active') || __extensionActive;
      __coordsShortcutActive = OE.Storage.get('CoordsShortcutActive') || __coordsShortcutActive;
      if(__extensionActive === 'true' && __coordsShortcutActive === 'true') {
        $.each($('a'), function( index ) {
          let value = $(this).html();
          if(value.indexOf('[') === 0) {
            $(this).after('&nbsp<a class="copyCoords" href="">[copy]</a>')
            return true;
          }
        });

        $('.copyCoords').click(function(e) {
          e.preventDefault();
          let coords = $(this).prev().html().slice(1, -1).split(':');
          OE.Storage.set({
            'CoordsCopy': coords
          });
        });
      }
    });
  }

  $( document ).ready( __init );
})();
