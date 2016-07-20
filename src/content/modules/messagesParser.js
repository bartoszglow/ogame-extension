OE.messageParser = (function() {
  let __extensionActive = false;
  let __players;

  function readMessages() {
    let messages = $('#content > center > table > tbody > tr > td > table > tbody > tr');

    for(let i = 2; i < messages.length; i++) {
      let $current = $(messages[i]);
      if($current.find('input[type=checkbox]').length > 0) {
        let messageInfo = parseMessageTitle(messages[i]);
        console.log(messageInfo.type);
        if(messageInfo.type === 'espionage') {
          parseEspionage(messages[i + 1]);
        }
        i++;
      }
    }
  }

  function parseMessageTitle(messageTitle) {
    console.log(messageTitle);
    return {
      type: $(messageTitle).find('.espionagereport').length > 0 ? 'espionage' : 'message'
    };
  }

  function parseEspionage(message) {
    let groups = $(message).find('table');
    let coordinates = $(groups[0]).find('a[href^=javascript]').text().slice(1,-1).split(':');
    let name = $(groups[0]).find('.c').text();
    let info = {
      name: name.slice(13, name.indexOf('[') - 1),
      galaxy: coordinates[0],
      system: coordinates[1],
      planet: coordinates[2],
    };
    console.log(info);
  }

  function __init() {
    OE.Storage.ready(() => {
      __extensionActive = OE.Storage.get('Active') || __extensionActive;
      __players = OE.Storage.get('Players') || __players;

      readMessages();

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
      }
    });
  }

  $( document ).ready( __init );
})();
