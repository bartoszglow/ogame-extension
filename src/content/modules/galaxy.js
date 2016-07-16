OE.galaxy = (function() {
  let __extensionActive = false;
  let __players;
  let __markup;

  let planetInfo = {
    buildings: ['Metal Mine', 'Crystal Mine', 'Deuterium Synthesizer'],
    defense: ['Rocket Launcher']
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
      if(buttons[0]) {
        preparePlanetInfo(buttons.eq(0));
      }
    });
  }

  function preparePlanetInfo($element) {
    var text = $element.attr('onmouseover');
    let injectPointIndex = text.indexOf('</table>');
    let coordinates = text.slice(text.indexOf('[') + 1, text.indexOf(']')).split(":");

    if(injectPointIndex > -1) {
      let additionalInfo = '';
      let planet = findPlanet(...coordinates);
      if(planet) {
        $element.attr('onmouseover', text.slice(0, injectPointIndex) + preparePlanetInfoMarkup(planet) + text.slice(injectPointIndex, -1));
      }
    } 
  }

  function preparePlanetInfoMarkup(planet) {
    let markup = '';

    Object.keys(planetInfo).forEach(key => {
      if(planet[key]) {
        let temporaryMarkup = '';

        planetInfo[key].forEach(property => {
          var propertyLevel = planet[key][camelize(property)];
          if(propertyLevel) {
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

  function findPlanet(galaxy, system, planetNumber) {
    let planetFound;
    __players.some(player => {
      return player.planets.some(planet => {
        if(planet.galaxy == galaxy && planet.system == system && planet.planet == planetNumber) {
          planetFound = planet;
          return planet;
        }
      });
    });
    return planetFound;
  }

  function __init() {
    OE.Storage.ready(() => {
      __extensionActive = OE.Storage.get('Active') || __extensionActive;
      __players = OE.Storage.get('Players') || __players;

      if(__extensionActive === 'true') {
        OE.Storage.set({
          'Players': [{
            name: "testPlayer",
            alliance: "testAlliance",
            showInShortcuts: true,
            research: {
              weaponsTechnology: 5
            },
            planets: [{
              name: 'Planet Name fdfs',
              galaxy: 4,
              system: 28,
              planet: 6,
              fleet: {
                smallCargo: 4
              },
              defense: {
                rocketLauncher: 4
              },
              buildings: {
                metalMine: 13,
                cps: 13,
                crystalMine: 13
              }
            }]
          }]
        });

        // updatePlayersInfo();
        watchMouseHover();

      }
    });
  }

  $( document ).ready( __init );
})();
