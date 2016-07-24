OE.messageParser = (function() {
  let __extensionActive = false;

  function readMessages() {
    let messages = $('#content > center > table > tbody > tr > td > table > tbody > tr');

    for (let i = 2; i < messages.length; i++) {
      let $current = $(messages[i]);
      if ($current.find('input[type=checkbox]').length > 0) {
        let messageInfo = parseMessageTitle(messages[i]);
        if (messageInfo.type === 'espionage') {
          parseEspionage(messages[++i]);
        }
      }
    }
    Player.save();
  }

  function parseMessageTitle(messageTitle) {
    return {
      type: $(messageTitle).find('.espionagereport').length > 0 ? 'espionage' : 'message'
    };
  }

  function parseEspionage(message) {
    let groups = $(message).find('table');
    let coordinates = $(groups[0]).find('a[href^=javascript]').text().slice(1, -1).split(':');
    let name = $(groups[0]).find('.c').text();
    let info = {
      name: name.slice(13, name.indexOf('[') - 1),
      galaxy: coordinates[0],
      system: coordinates[1],
      planet: coordinates[2],
    };

    let raport = {};
    for (let i = 0; i < groups.length - 1; i++) {
      if (i == 1)
        i++;
      let group = groups[i];
      let text = group.innerText.split(/[\n,\t]+/);
      if (i == 0) {
        text[0] = "Resources";
        text.pop();
      }
      if (text.length > 1) {
        raport[text[0]] = {}
        for (let j = 1; j < text.length; j++) {
          raport[text[0]][text[j]] = text[++j];
        }
      }
    }

    Object.assign(raport, info);
    Player.new({
      planets: [raport]
    })
  }

  function __init() {
    OE.Storage.ready(() => {
      __extensionActive = OE.Storage.get('Active') || __extensionActive;
      readMessages();
    });
  }

  $(document).ready(__init);
})();
