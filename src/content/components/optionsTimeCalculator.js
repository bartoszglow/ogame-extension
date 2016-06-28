var OptionsTimeCalculator = Vue.extend({
  props: ['storage'],
  template: `
    <tr>
      <td class="c" colspan="2">{{translate.title}}</td>
    </tr>
    <tr>
      <th>{{translate.active}}:</th>
      <th>
        <select v-model="localStorage.TimeCalculatorActive"
                @change="storageUpdated">
          <option value="false">{{translate.off}}</option>
          <option value="true">{{translate.on}}</option>
        </select>
      </th>
    </tr>
  `,
  data: function() {
    return {
      title: 'Ogame time calculator',
      localStorage: {
        TimeCalculatorActive: 'false'
      },
      dictionary: {
        "en": {
          title: 'Ogame time calculator',
          active: 'Time calculator active',
          off: 'off',
          on: 'on'
        },
        "pl": {
          title: 'Kalkulator czasu Ogame',
          active: 'Kalkulator aktywny',
          off: 'wyłączone',
          on: 'włączone'
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
      this.localStorage.TimeCalculatorActive = OE.Storage.get('TimeCalculatorActive') || this.localStorage.TimeCalculatorActive;
    });
  }
});

Vue.component('options-time-calculator', OptionsTimeCalculator);