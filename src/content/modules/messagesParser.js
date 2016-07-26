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
    let text = $(groups[0]).text().split(/[\n,\t]+/);
    let data = text[0].slice(text[0].length-14,text[0].length);
    let name = $(groups[0]).find('.c').text();
    let info = {
      name: name.slice(13, name.indexOf('[') - 1),
      report: data,
      galaxy: coordinates[0],
      system: coordinates[1],
      planet: coordinates[2],
    };

    let report = {};
    for (let i = 0; i < groups.length - 1; i++) {
      i = (i == 1 ? 2 : i) ;
      let group = groups[i];
      let text = group.innerText.split(/[\n,\t]+/);
      if (i == 0) {
        text[0] = "Resources";
        text.pop();
      }
      if (text.length > 1) {
        report[text[0]] = {}
        for (let j = 1; j < text.length; j++) {
          report[text[0]][text[j].replace(':','')] = text[++j];
        }
      }
    }

    Object.assign(report, info);
    Player.new({
      planets: [report]
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
