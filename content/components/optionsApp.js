new Vue({
  el: '#content table tbody',
  init: function() {
    let extensionContainer = `
      <options-extension :storage.sync="storage"></options-extension>
      <options-refresh :storage.sync="storage"></options-refresh>
    `;
    let submitButton = `
      <tr>
        <th colspan="2"><input @click="onOptionsSave" type="submit" value="save changes"></th>
      </tr>
    `;
    $('#content table tbody tr:nth-last-child(2)').after(extensionContainer);
    $('#content table tbody tr:nth-last-child(1)').replaceWith(submitButton);
  },
  data: {
    storage: {}
  },
  methods: {
    onOptionsSave: function(event, target) {
      OE.Storage.set(this.storage);
      return true;
    }
  }
});