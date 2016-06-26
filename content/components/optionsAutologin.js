var OptionsAutologin = Vue.extend({
  props: ['storage'],
  template: `
    <tr>
      <td class="c" colspan="2">{{title}}</td>
    </tr>
    <tr>
      <th>Autologin active:</th>
      <th>
        <select v-model="localStorage.AutologinActive"
                @change="storageUpdated"
                name="extension-active">
          <option value="false">Off</option>
          <option value="true">On</option>
        </select>
      </th>
    </tr>
    <tr>
      <th>Login:</th>
      <th>
        <input  v-model="localStorage.AutologinLogin"
                @change="storageUpdated"
                type="text">
      </th>
    </tr>
    <tr>
      <th>Password:</th>
      <th>
        <input  v-model="localStorage.AutologinPassword"
                @change="storageUpdated"
                type="password">
      </th>
    </tr>
  `,
  data: function() {
    return {
      title: 'Autologin settings',
      localStorage: {
        AutologinActive: 'false',
        AutologinLogin: '',
        AutologinPassword: ''
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
      this.localStorage.AutologinActive = OE.Storage.get('AutologinActive') || this.localStorage.AutologinActive;
      this.localStorage.AutologinLogin = OE.Storage.get('AutologinLogin') || this.localStorage.AutologinLogin;
      this.localStorage.AutologinPassword = OE.Storage.get('AutologinPassword') || this.localStorage.AutologinPassword;
    });
  }
});

Vue.component('options-autologin', OptionsAutologin);