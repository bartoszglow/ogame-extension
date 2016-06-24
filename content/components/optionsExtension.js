var OptionsExtension = Vue.extend({
  props: ['storage'],
  template: `
    <tr>
      <td class="c" colspan="2">{{title}}</td>
    </tr>
    <tr>
      <th>Extension active:</th>
      <th>
        <select v-model="localStorage.Active"
                @change="storageUpdated"
                name="extension-active">
          <option value="false">Off</option>
          <option value="true">On</option>
        </select>
      </th>
    </tr>
  `,
  data: function() {
    return {
      title: 'Ogame Extension options',
      localStorage: {
        Active: ''
      },
    };
  },
  methods: {
    storageUpdated: function() {
      $.extend(true, this.storage, this.localStorage);
    }
  },
  ready: function() {
    OE.Storage.ready(() => {
      this.localStorage.Active = OE.Storage.get('Active') || this.localStorage.Active;
    });
  }
});

Vue.component('options-extension', OptionsExtension);