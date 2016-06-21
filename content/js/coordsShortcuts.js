OE.coordsShortcuts = (function() {
  const __dictionary = {
    tableCoords: "#content center center tbody tr:nth-last-child(2)"
  };

  let __players = [];

  function __addShortcutsButtons() {
    let $table = $(__dictionary.tableCoords);
    let markup = '';
    let odd = false;
    __players.forEach(player => {
      markup = `<tr height="20"><td colspan="2" class="c">${player.name}'s planets</td></tr>`;
      player.planets.forEach(({name, galaxy, system, planet}) => {
        odd = !odd;
        if(odd) {
          markup += `<tr height="20">`;
        }
        markup += `<th><a href="javascript:setTarget(${galaxy},${system},${planet},1); shortInfo()">${name} ${galaxy}:${system}:${planet}</a></th>`;
        if(!odd) {
          markup += `</tr>`;
        }
      });
      if(odd) {
        markup += `<th></th></tr>`;
      }
      $table.after(markup);
      $table = $(__dictionary.tableCoords);
      odd = false;
    });
  }

  function __init() {
    console.log('a');
    OE.Storage.ready(() => {
      __players = OE.Storage.get('CoordsShortcutPlayers') || __players;
      __addShortcutsButtons();
    });
  }

  $( document ).ready( __init );
})();
