OE.refresh = (function() {
  let __extensionActive = false;
  let __intervalId = null;
  let __properties = {
    type: 'normal',
    time: 60,
    periodStart: 30,
    periodEnd: 90
  };

  /**
   * init - internal function to initialize refreshing functionality.
   *
   * @return {}
   */

  function __init() {
    OE.Storage.ready(() => {
      __getInitialValues();
      __setWatchers();
      if(__extensionActive === 'true') {
        start();
      }
    });
  }

  __init();

  function __getInitialValues() {
    __extensionActive = OE.Storage.get('Active') || __extensionActive;
    __properties.type = OE.Storage.get('RefreshType') || __properties.type;
    __properties.time = OE.Storage.get('RefreshTime') || __properties.time;
    __properties.periodStart = OE.Storage.get('RefreshPeriodStart') || __properties.periodStart;
    __properties.periodEnd = OE.Storage.get('RefreshPeriodEnd') || __properties.periodEnd;
  }

  function __setWatchers() {
    OE.Storage.watch('Active', (newValue) => {
      __extensionActive = newValue;
      if(__extensionActive + '' === 'false') {
        stop();
      } else {
        // PRZEMYSLEC IF ELSE'a tego
        if(!isActive()) {
          start();
        }
      }
    });

    OE.Storage.watch('RefreshType', (newValue) => {
      __properties.type = newValue;
      if(__properties.type === 'off') {
        stop();
      } else {
        restart();
      }
    });

    OE.Storage.watch('RefreshTime', (newValue) => {
      __properties.time = newValue;
      restart();
    });

    OE.Storage.watch('RefreshPeriodStart', (newValue) => {
      __properties.periodStart = newValue;
      restart();
    });

    OE.Storage.watch('RefreshPeriodEnd', (newValue) => {
      __properties.periodEnd = newValue;
      restart();
    });
  }

  function __getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + parseInt(min);
  }

  function start() {
    switch(__properties.type) {
      case 'normal':
        if(__properties.time) {
          console.log(`Refresh start Normal! Timeout: ${__properties.time} (seconds)`);
          __intervalId = setInterval(refresh, __properties.time * 1000);
          return true;
        }
        break;
      case 'random':
        if(__properties.periodStart && __properties.periodEnd) {
          let timeout = __getRandomInt(__properties.periodStart, __properties.periodEnd);
          console.log(`Refresh start Random! Timeout: ${timeout} (seconds)`);
          __intervalId = setInterval(this.refresh, timeout * 1000);
          return true;
        } else {
          return false;
        }
        break;
    }
    return false;
  }

  function stop() {
    console.log("Refresh stop!");
    clearInterval(__intervalId);
    __intervalId = null;
  }

  function restart() {
    stop();
    start();
  }

  function refresh() {
    location.reload();
  }

  function isActive() {
    return __intervalId ? true : false;
  }

  return {
    start,
    stop,
    refresh,
    isActive
  };
})();
