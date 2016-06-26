var OptionsRefresh = Vue.extend({
  props: ['storage'],
  template: `
    <tr>
      <td class="c" colspan="2">{{title}}</td>
    </tr>
    <tr>
      <th>Refresh type:</th>
      <th>
        <select v-model="localStorage.RefreshType"
                @change="storageUpdated"
                style="text-align: center;">
          <option value="off">Off</option>
          <option value="normal">Normal</option>
          <option value="random">Random</option>
        </select>
      </th>
    </tr>
    <tr>
      <th>Check fleets & alarm:</th>
      <th>
        <select name="extension-refresh-fleets-active" style="text-align: center;">
          <option value="off">Off</option>
          <option value="on">On</option>
        </select>
      </th>
    </tr>
    <tr>
      <th>Normal time period (seconds)</th>
      <th>
        <input  v-model="localStorage.RefreshTime"
                @change="storageUpdated"
                type="text"
                maxlength="5"
                size="5"
                style="text-align: center;">
      </th>
    </tr>
    <tr>
      <th>Random time period (seconds)</th>
      <td style="text-align: center;">
        from
        <input  v-model="localStorage.RefreshPeriodStart"
                @change="storageUpdated"
                type="text"
                maxlength="5" 
                size="5"
                style="text-align: center;"> 
        to
        <input  v-model="localStorage.RefreshPeriodEnd"
                @change="storageUpdated"
                type="text"
                maxlength="5" 
                size="5"
                style="text-align: center;"> 
      </td>
    </tr>
  `,
  data: function() {
    return {
      title: 'Automatic refresh',
      localStorage: {
        'RefreshType': 'off',
        'RefreshTime': '',
        'RefreshPeriodStart': '',
        'RefreshPeriodEnd': ''
      }
    };
  },
  methods: {
    storageUpdated: function() {
      $.extend(true, this.storage, this.localStorage);
    }
  },
  init: function() {
    OE.Storage.ready(() => {
      this.localStorage.RefreshType = OE.Storage.get('RefreshType') || this.localStorage.RefreshType;
      this.localStorage.RefreshTime = OE.Storage.get('RefreshTime') || this.localStorage.RefreshTime;
      this.localStorage.RefreshPeriodStart = OE.Storage.get('RefreshPeriodStart') || this.localStorage.RefreshPeriodStart;
      this.localStorage.RefreshPeriodEnd = OE.Storage.get('RefreshPeriodEnd') || this.localStorage.RefreshPeriodEnd;
    });
  }
});

Vue.component('options-refresh', OptionsRefresh);