const refreshForm = Vue.extend({
  template: `
    <div class="col-md-12">
      <form @submit.prevent="refreshFormSubmit" class="ogame-extension-settings-form">
        <div class="panel panel-primary">

          <div class="panel-heading clearfix">
            <h4 class="panel-title pull-left" style="line-height: 30px;">Refresh page</h4>
            <select v-model="refreshType"
                    @change="onRefreshTypeChange"
                    class="form-control input-sm pull-right"
                    style="width: auto;"
                    name="ogame-extension-active">
              <option value="off">Off</option>
              <option value="normal">Normal</option>
              <option value="random">Random</option>
            </select>
          </div>

          <div class="panel-body">
            <div class="form-group" v-if="refreshType == 'normal'">
              <label for="ogame-extension-refresh-timeout-value">Time period</label>
              <input v-model="refreshTime" type="number" class="form-control" name="ogame-extension-refresh-timeout-value">
            </div>

            <div class="form-group" v-if="refreshType == 'random'">
              <div class="text-center">
                <label>Random time period (seconds)</label>
              </div>
              <div class="row">
                <div class="col-xs-6">
                  <div class="text-left">
                    <label for="ogame-extension-refresh-period-start-value">from</label>
                  </div>
                  <input v-model="refreshPeriodStart" type="number" class="form-control" name="ogame-extension-refresh-period-start-value">
                </div>
                <div class="col-xs-6">
                  <div class="text-right">
                    <label for="ogame-extension-refresh-period-end-value">to</label>
                  </div>
                  <input v-model="refreshPeriodEnd" type="number" class="form-control" name="ogame-extension-refresh-period-end-value">
                </div>
              </div>
            </div>

            <button v-if="refreshType !== 'off'"
                    type="submit" class="btn btn-default col-xs-12"
                    name="ogame-extension-settings-form-submit">
              Submit
            </button>
          </div>

        </div>
      </form>
    </div>
  `,
  data: function() {
    return {
      title: "Ogame extension",
      refreshType: 'off',
      refreshTime: 10,
      refreshPeriodStart: 0,
      refreshPeriodEnd: 0
    };
  },
  methods: {
    onRefreshTypeChange: function(event) {
      OE.Storage.set({'RefreshType': event.target.value});
    },
    refreshFormSubmit: function() {
      OE.Storage.set({
        'RefreshTime': this.refreshTime,
        'RefreshPeriodStart': this.refreshPeriodStart,
        'RefreshPeriodEnd': this.refreshPeriodEnd
      });
    }
  },
  ready: function() {
    OE.Storage.ready(() => {
      this.refreshType = OE.Storage.get('RefreshType') || this.refreshType;
      this.refreshTime = OE.Storage.get('RefreshTime') || this.refreshTime;
      this.refreshPeriodStart = OE.Storage.get('RefreshPeriodStart') || this.refreshPeriodStart;
      this.refreshPeriodEnd = OE.Storage.get('RefreshPeriodEnd') || this.refreshPeriodEnd;
    });
  }
});

Vue.component('refresh-form', refreshForm);