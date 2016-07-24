OE.galaxy = (function() {
  let __extensionActive = false;
  let __players;
  let __markup;

  let seassion;

  let planetInfo = {
    Resources: ['Metal:', 'Crystal:', 'Deuterium:', 'Energy:'],
    Buildings: ['Metal Mine', 'Crystal Mine', 'Deuterium Synthesizer'],
    Defense: ['Rocket Launcher']
  };

  /********************** UTILS **********************/
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  }
  /***************************************************/

  function watchMouseHover() {
    let planets = $('#content center > table tbody tr:nth-child(n+3)');
    $.each(planets, function(planet) {
      let $planet = $(this);
      let buttons = $planet.find('a[onmouseover]');
      if (buttons[1]) {
        let playerInfo = {};
        let playerButton;
        for (let i = 0; i < buttons.length; i++) {
          let button = buttons[i];
          if (playerInfo.name)
            playerInfo.alliance = button.innerText;
          if (button.innerText != " " && !playerInfo.name) {
            playerInfo.name = button.innerText;
            playerButton = i;
          }
        }
        preparePlanetInfo(buttons, playerButton, playerInfo);
      }
    });
    Player.save();
  }

  function preparePlanetInfo(buttons, id, playerInfo) {
    let $elementPlanet = buttons.eq(0);
    let $elementPlayer = buttons.eq(id);
    let textPlanet = $elementPlanet.attr('onmouseover');
    let textPlayer = $elementPlayer.attr('onmouseover');
    let injectPointIndex = textPlanet.indexOf('</table>');
    let injectPointIndexPlayer = textPlayer.indexOf('</th>') + 5;
    let coordinates = textPlanet.slice(textPlanet.indexOf('[') + 1, textPlanet.indexOf(']')).split(":");
    let planetName = textPlanet.slice(textPlanet.indexOf('2 >') + 10, textPlanet.indexOf('[') - 1);
    let data = playerInfo;
    Object.assign(data, {
      planets: [{
        name: planetName,
        galaxy: coordinates[0],
        system: coordinates[1],
        planet: coordinates[2]
      }]
    })
    Player.new(data);
    Player.save();
    if (injectPointIndex > -1) {
      let additionalInfo = '';
      let planet = Player.findPlanets({
        galaxy: coordinates[0],
        system: coordinates[1],
        planet: coordinates[2]
      })[0];
      if (planet) {
        $elementPlanet.attr('onmouseover', textPlanet.slice(0, injectPointIndex) + preparePlanetInfoMarkup(planet) + textPlanet.slice(injectPointIndex, -1));
        $elementPlayer.attr('onmouseover', textPlayer.slice(0, injectPointIndexPlayer) + preparePlayerInfoMarkup(planet.player) + textPlayer.slice(injectPointIndexPlayer, -1));
      }
    }
  }

  function preparePlayerInfoMarkup(player) {
    let markup = '';
    let temporaryMarkup = '';
    let key = 'PLANETS';
    player.planets.forEach(planet => {
      let planetName = planet.name;
      let planetCord = '[' + planet.galaxy + ':' + planet.system + ':' + planet.planet + ']';
      let href=`index.php?page=galaxy&galaxy=${planet.galaxy}&system=${planet.system}&position=${planet.planet}&session=${session}`;
      temporaryMarkup += `<tr><td>${planetName}</td><td><a href=${href}>${planetCord}</a></td></tr>`;
    });
    markup += `
          <tr>
            <td class=c > ${key} </td>
          </tr>
          <th>
            <table>
                ${temporaryMarkup}
            </table>
          </th>`;
    return markup.replace(/\s\s+/g, '');
  }

  function preparePlanetInfoMarkup(planet) {
    let markup = '';
    Object.keys(planetInfo).forEach(key => {
      if (planet[key]) {
        let temporaryMarkup = '';
        planetInfo[key].forEach(property => {
          var propertyLevel = planet[key][property];
          if (propertyLevel) {
            temporaryMarkup += `<tr><td>${property}</td><td>${propertyLevel || ''}</td></tr>`;
          }
        });
        markup += `
          <tr>
            <th colspan='2'>
              <table width='240'>
                <tbody>
                  <tr><td class='c' colspan='2'>${capitalizeFirstLetter(key)}</td></tr>
                  ${temporaryMarkup}
                </tbody>
              </table>
            </th>
          </tr>`;
      }
    });
    return markup.replace(/\s\s+/g, '');
  }

  function __init() {
    OE.Storage.ready(() => {
      const url = window.location.search.substring(1);
      let query = url.split(/['&','=']+/);
      session = query[query.indexOf('session') + 1];

      __extensionActive = OE.Storage.get('Active') || __extensionActive;
      if (__extensionActive === 'true') {
        watchMouseHover();
      }
    });
  }

  $(document).ready(__init);
})();
