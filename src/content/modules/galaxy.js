OE.galaxy = (function() {
  let __extensionActive = false;
  let __players;
  let __markup;
  let session;

  let planetInfo = {
    Resources: ['Metal', 'Crystal', 'Deuterium'],
    Buildings: ['Metal Mine', 'Crystal Mine', 'Deuterium Synthesizer'],
    Defense: ['Rocket Launcher', 'Light Laser', 'Heavy Laser', 'Gauss Cannon', 'Ion Cannon', 'Plasma Turret']
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

  function getSession() {
    const url = window.location.search.substring(1);
    let query = url.split(/['&','=']+/);
    return query[query.indexOf('session') + 1];
  }
  /***************************************************/

  function watchMouseHover() {
    let planets = $('#content center > table tbody tr:nth-child(n+3)');
    let system = [];
    $.each(planets, function(planet) {
      let $planet = $(this);
      let buttons = $planet.find('a[onmouseover]');
      if (buttons[1]) {
        system.push(preparePlanetInfo(buttons));
      }
    });
    system.forEach(planetInfo => appendPlanetInfo(planetInfo));
    Player.save();
  }

  function preparePlanetInfo(buttons) {
    let playerInfo = {};
    let playerindex;
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      if (playerInfo.name)
        playerInfo.alliance = button.innerText;
      if (button.innerText != " " && !playerInfo.name) {
        playerInfo.name = button.innerText;
        playerIndex = i;
      }
    }

    const $elementPlanet = buttons.eq(0);
    const $elementPlayer = buttons.eq(playerIndex);

    let decoder = {
      elementPlanet: $elementPlanet,
      elementPlayer: $elementPlayer,
      textPlanet: $elementPlanet.attr('onmouseover'),
      textPlayer: $elementPlayer.attr('onmouseover'),
      player: playerInfo
    }

    const coordinates = decoder.textPlanet.slice(decoder.textPlanet.indexOf('[') + 1, decoder.textPlanet.indexOf(']')).split(":");
    const planetName = decoder.textPlanet.slice(decoder.textPlanet.indexOf('2 >') + 10, decoder.textPlanet.indexOf('[') - 1);

    Object.assign(decoder.player, {
      planets: [{
        name: planetName,
        galaxy: coordinates[0],
        system: coordinates[1],
        planet: coordinates[2]
      }]
    })

    Player.new(decoder.player);
    return decoder;
  }

  function appendPlanetInfo(el) {
    const injectPointIndexPlanet = el.textPlanet.indexOf('</table>');
    const injectPointIndexPlayer = el.textPlayer.indexOf('</th>') + 5;

    if (injectPointIndexPlanet > -1) {
      const _planet = el.player.planets[0];
      const planet = Player.findPlanets({
        galaxy: _planet.galaxy,
        system: _planet.system,
        planet: _planet.planet
      })[0];
      if (planet) {
        el.elementPlanet.attr('onmouseover', el.textPlanet.slice(0, injectPointIndexPlanet) + preparePlanetInfoMarkup(planet) + el.textPlanet.slice(injectPointIndexPlanet, -1));
        el.elementPlayer.attr('onmouseover', el.textPlayer.slice(0, injectPointIndexPlayer) + preparePlayerInfoMarkup(planet.player) + el.textPlayer.slice(injectPointIndexPlayer, -1));
      }
    }
  }

  function preparePlayerInfoMarkup(player) {
    let markup = '';
    let temporaryMarkup = '';
    let key = 'Planets';
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
        if (key == 'Resources')
          key += ' at ' + planet.report;
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
      __extensionActive = OE.Storage.get('Active') || __extensionActive;
      if (__extensionActive === 'true') {
        session = getSession();
        watchMouseHover();
      }
    });
  }

  $(document).ready(__init);
})();
