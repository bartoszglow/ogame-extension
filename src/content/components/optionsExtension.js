var OptionsExtension = Vue.extend({
  props: ['storage'],
  template: `
    <tr>
      <td class="c" colspan="2">{{translate.title}}</td>
    </tr>
    <tr>
      <th>{{translate.active}}:</th>
      <th>
        <select v-model="localStorage.Active"
                @change="storageUpdated">
          <option value="false">{{translate.off}}</option>
          <option value="true">{{translate.on}}</option>
        </select>
      </th>
    </tr>
    <tr>
      <th>{{translate.language}}:</th>
      <th>
        <select v-model="localStorage.Language"
                @change="storageUpdated">
          <option value="en">en</option>
          <option value="pl">pl</option>
        </select>
      </th>
    </tr>
  `,
  data: function() {
    return {
      localStorage: {
        Active: 'false',
        Language: 'en'
      },
      dictionary: {
        "en": {
          title: 'Ogame Extension options',
          active: 'Extension active',
          off: 'off',
          on: 'on',
          language: 'Language'
        },
        "pl": {
          title: 'Ustawienia rozszerzenia Ogame',
          active: 'Rozszerzenie aktywne',
          off: 'wyłączone',
          on: 'włączone',
          language: 'Język'
        }
      }
    };
  },
  computed: {
    translate: function() {
      return this.dictionary[this.storage.Language || "en"];
    }
  },
  methods: {
    storageUpdated: function() {
      $.extend(true, this.storage, this.localStorage);
    }
  },
  ready: function() {
    OE.Storage.ready(() => {
      this.localStorage.Active = OE.Storage.get('Active') || this.localStorage.Active;
      this.localStorage.Language = OE.Storage.get('Language') || this.localStorage.Language;
    });
  }
});

Vue.component('options-extension', OptionsExtension);