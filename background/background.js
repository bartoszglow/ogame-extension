// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   alert(message);
// });

// document.write('DUPA');

// chrome.extension.onConnect.addListener(function(port) {
//   console.log("Connected .....");
//   port.onMessage.addListener(function(msg) {
//         console.log("message recieved: " + msg);
//         port.postMessage("Hi Popup.js");
//   });
// });
// 
// chrome.storage.onChanged.addListener(function(changes, namespace) {
//   for (key in changes) {
//     var storageChange = changes[key];
//     console.log('Storage key "%s" in namespace "%s" changed. ' +
//                 'Old value was "%s", new value is "%s".',
//                 key,
//                 namespace,
//                 storageChange.oldValue,
//                 storageChange.newValue);
//   }
// });
// 

window.addEventListener('load', function() {
  var opt = {
    type: 'list',
    title: 'Primary Title',
    message: 'Primary message to display',
    priority: 1,
    iconUrl: '/assets/planet.png',
    items: [{ title: 'Item1', message: 'This is item 1.'},
            { title: 'Item2', message: 'This is item 2.'},
            { title: 'Item3', message: 'This is item 3.'}]
  };
  chrome.notifications.create('notify1', opt, function() { console.log(chrome.runtime.lastError); });
});