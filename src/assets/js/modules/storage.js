var OE = OE || {};

OE.Storage = (function() {
  const __storageName = "ogameExtension";
  const __storageObject = {};
  const __watchers = {};

  /**
   *  Boolean value that indicates if storage is ready to be used.
   */

  let __ready = false;

  /**
   *  List of callbacks awaiting for data to be ready. Registered by ready function.
   */

  let __awaitings = [];

  /**
   * init - internal function to initialize storage.
   *
   * @return {}
   */

  function __init() {
    console.log('Init storage');
    __getInitialValues();
    __listen();
  }

  __init();

  /**
   * __getInitialValues - internal function to get initial values from chrome storage.
   *
   * @return {}
   */

  function __getInitialValues() {
    chrome.storage.local.get(__storageName, (data, namespace) => {
      __parseChanges(data[__storageName]);
      for(let i = 0; i < __awaitings.length; i++) {
        __awaitings[i]();
      }
      __awaitings = [];
      __ready = true;
    });
  }

  /**
   * __listen - internal function to listen for changes.
   *
   * @return {}
   */

  function __listen() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      let newStorageObject = changes[__storageName].newValue;
      let oldStorageObject = changes[__storageName].oldValue;
      __parseChanges(newStorageObject, oldStorageObject);
    });
  }

  /**
   * __parseChanges - internal function to parse changes from chrome storage.
   *                  Depending on watchers calls callbacks.
   *
   * @param  {object} object with new values
   * @param  {object} object with old values
   * @return {}
   */

  function __parseChanges(newStorageObject, oldStorageObject) {
    for(let key in newStorageObject) {
      if(!oldStorageObject || newStorageObject[key] !== oldStorageObject[key]) {
        console.log(`${oldStorageObject ? 'Changed in' : 'Imported into'} Storage! ${__storageName + key}: ${newStorageObject[key]}`);
        __storageObject[key] = newStorageObject[key];
        let watchers = __watchers[key];
        if(watchers) {
          for(let i = 0; i < watchers.length; i++) {
            watchers[i](newStorageObject[key], oldStorageObject ? oldStorageObject[key] : null);
          }
        }
      }
    }
  }

  /**
   * set - setter function
   *
   * @param  {object} properties defined in key: value way. Eg {key: value, key2: value2} 
   * @return {}
   */

  function set(properties) {
    for(let key in properties) {
      __storageObject[key] = properties[key];
    }
    chrome.storage.local.set({[__storageName]: __storageObject}, () => {
      for(let key in properties) {
        console.log(`Saved in Storage! ${__storageName + key}: ${properties[key]}`);
      }
    });
  }

  /**
   * get - getter function
   *
   * @param  {array} array of keys
   * @return {array} array of values
   */

  function get(keys) {
    let result;
    if(Array.isArray(keys)) {
      result = [];
      for(let i = 0; i < keys.length; i++) {
        result.push(__storageObject[keys[i]]);
        console.log(`Get from Storage! ${__storageName + keys[i]}: ${result}`);
      }
    } else {
      result = __storageObject[keys];
      console.log(`Get from Storage! ${__storageName + keys}: ${result}`);
    }
    return result;
  }

  /**
   * watch - set watcher to changes of property. 
   *
   * @param  {string} key name to be watched
   * @param  {function} callback function to be executed on change of property
   * @return {}
   */

  function watch(key, callback) {
    __watchers[key] = __watchers[key] || [];
    __watchers[key].push(callback);
  }

  /**
   * ready - function to register callbackes that will be executed when 
   *         storage is ready (and has initial values).
   *
   * @param  {function} function to be executed when storage is ready.
   * @return {}
   */

  function ready(callback) {
    if(__ready)
      callback();
    else
      __awaitings.push(callback);
  }

  return {
    set,
    get,
    watch,
    ready
  };
})();
