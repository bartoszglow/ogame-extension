new Vue({
  el: '#content table tbody',
  data: {
    storage: {}
  },
  init: function() {
    let extensionContainer = `
      <options-extension :storage.sync="storage"></options-extension>
      <options-refresh :storage.sync="storage"></options-refresh>
      <options-coordinates :storage.sync="storage"></options-coordinates>
    `;
    $('#content table tbody tr:nth-last-child(2)').after(extensionContainer);
    $('#content table tbody tr:nth-last-child(1) input[type="submit"]').attr('v-on:click', 'onOptionsSave');
  },
  methods: {
    onOptionsSave: function(event, target) {
      OE.Storage.set(this.storage);
      return true;
    }
  }
});