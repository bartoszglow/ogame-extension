var OptionsRefresh = Vue.extend({
  props: ['storage'],
  template: `
    <tr>
      <td class="c" colspan="2">{{translate.title}}</td>
    </tr>
    <tr>
      <th>{{translate.type}}:</th>
      <th>
        <select v-model="localStorage.RefreshType"
                @change="storageUpdated"
                style="text-align: center;">
          <option value="off">{{translate.off}}</option>
          <option value="normal">{{translate.typeNormal}}</option>
          <option value="random">{{translate.typeRandom}}</option>
        </select>
      </th>
    </tr>
    <tr>
      <th>{{translate.checkFleets}}:</th>
      <th>
        <select v-model="localStorage.CheckFleets"
                @change="storageUpdated"
                style="text-align: center;">
          <option value="false">{{translate.off}}</option>
          <option value="true">{{translate.on}}</option>
        </select>
      </th>
    </tr>
    <tr>
      <th>{{translate.normalTitle}}:</th>
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
      <th>{{translate.randomTitle}}</th>
      <td style="text-align: center;">
        {{translate.randomFrom}}
        <input  v-model="localStorage.RefreshPeriodStart"
                @change="storageUpdated"
                type="text"
                maxlength="5" 
                size="5"
                style="text-align: center;"> 
        {{translate.randomTo}}
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
        'CheckFleets': 'false',
        'RefreshTime': '',
        'RefreshPeriodStart': '',
        'RefreshPeriodEnd': ''
      },
      dictionary: {
        "en": {
          title: 'Automatic refresh',
          active: 'Automatic refresh active',
          checkFleets: 'Check enemy fleets & alarm',
          type: 'Refresh type',
          typeNormal: 'Normal',
          typeRandom: 'Random',
          off: 'off',
          on: 'on',
          normalTitle: 'Normal time period (seconds)',
          randomTitle: 'Random time period (seconds)',
          randomFrom: 'from',
          randomTo: 'to'
        },
        "pl": {
          title: 'Automatyczne odświeżanie',
          active: 'Odświeżanie aktywne',
          checkFleets: 'Sprawdź wrogie floty i alarmuj',
          type: 'Rodzaj odświeżania',
          typeNormal: 'Normalny',
          typeRandom: 'Losowy',
          off: 'wyłączone',
          on: 'włączone',
          normalTitle: 'Normalny czas odświeżania (sekundy)',
          randomTitle: 'Losowy czas odświeżania (sekundy)',
          randomFrom: 'od',
          randomTo: 'do'
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
  init: function() {
    OE.Storage.ready(() => {
      this.localStorage.RefreshType = OE.Storage.get('RefreshType') || this.localStorage.RefreshType;
      this.localStorage.CheckFleets = OE.Storage.get('CheckFleets') || this.localStorage.CheckFleets;
      this.localStorage.RefreshTime = OE.Storage.get('RefreshTime') || this.localStorage.RefreshTime;
      this.localStorage.RefreshPeriodStart = OE.Storage.get('RefreshPeriodStart') || this.localStorage.RefreshPeriodStart;
      this.localStorage.RefreshPeriodEnd = OE.Storage.get('RefreshPeriodEnd') || this.localStorage.RefreshPeriodEnd;
    });
  }
});

Vue.component('options-refresh', OptionsRefresh);