var OptionsAutologin = Vue.extend({
  props: ['storage'],
  template: `
    <tr>
      <td class="c" colspan="2">{{translate.title}}</td>
    </tr>
    <tr>
      <th>{{translate.active}}:</th>
      <th>
        <select v-model="localStorage.AutologinActive"
                @change="storageUpdated"
                name="extension-active">
          <option value="false">{{translate.off}}</option>
          <option value="true">{{translate.on}}</option>
        </select>
      </th>
    </tr>
    <tr>
      <th>{{translate.username}}:</th>
      <th>
        <input  v-model="localStorage.AutologinLogin"
                @change="storageUpdated"
                type="text">
      </th>
    </tr>
    <tr>
      <th>{{translate.password}}:</th>
      <th>
        <input  v-model="localStorage.AutologinPassword"
                @change="storageUpdated"
                type="password">
      </th>
    </tr>
  `,
  data: function() {
    return {
      localStorage: {
        AutologinActive: 'false',
        AutologinLogin: '',
        AutologinPassword: ''
      },
      dictionary: {
        "en": {
          title: 'Autologin settings',
          active: 'Autologin active',
          off: 'off',
          on: 'on',
          username: 'Username',
          password: 'Password'
        },
        "pl": {
          title: 'Ustawienia automatycznego logowania',
          active: 'Automatyczne logowanie aktywne',
          off: 'wyłączone',
          on: 'włączone',
          username: 'Użytkownik',
          password: 'Hasło'
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
      this.localStorage.AutologinActive = OE.Storage.get('AutologinActive') || this.localStorage.AutologinActive;
      this.localStorage.AutologinLogin = OE.Storage.get('AutologinLogin') || this.localStorage.AutologinLogin;
      this.localStorage.AutologinPassword = OE.Storage.get('AutologinPassword') || this.localStorage.AutologinPassword;
    });
  }
});

Vue.component('options-autologin', OptionsAutologin);