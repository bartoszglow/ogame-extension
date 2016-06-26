OE.autologin = (function() {
  
  function __init() {
    OE.Storage.ready(() => {
      let extensionActive = OE.Storage.get('Active');
      let autologinActive = OE.Storage.get('AutologinActive');
      let login = OE.Storage.get('AutologinLogin');
      let password = OE.Storage.get('AutologinPassword');

      if(extensionActive === 'true' && autologinActive === 'true') {
        $('input[name=login]').val(login);
        $('input[name=pass]').val(password);
        $('input[name=Abschicken]').click();
      }
    });
  }

  $( document ).ready( __init );
})();
