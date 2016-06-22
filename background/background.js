chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if(message.flightAttack) {
    var opt = {
      type: 'basic',
      title: "You're under attack!",
      message: message.flightAttack,
      priority: 1,
      iconUrl: '/assets/img/planet.png'
    };
    chrome.notifications.create('flightAttack', opt, function() { console.log(chrome.runtime.lastError); });

    var myAudio = new Audio();
    myAudio.src = "../assets/sounds/Old-clock-ringing-short.mp3";
    myAudio.play();
  }
});
