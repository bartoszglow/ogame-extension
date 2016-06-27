var OptionsTimeCalculator = Vue.extend({
  props: ['storage'],
  template: `
    <tr>
      <td class="c" colspan="2">{{title}}</td>
    </tr>
    <tr>
      <th>Time calculator active:</th>
      <th>
        <select v-model="localStorage.TimeCalculatorActive"
                @change="storageUpdated">
          <option value="false">Off</option>
          <option value="true">On</option>
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
    };
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