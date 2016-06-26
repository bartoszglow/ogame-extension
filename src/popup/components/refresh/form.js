const refreshForm = Vue.extend({
  template: `
    <div class="col-md-12">
      <form @submit.prevent="refreshFormSubmit" class="ogame-extension-settings-form">
        <div class="panel panel-primary">

          <div class="panel-heading clearfix">
            <h4 class="panel-title" style="line-height: 30px;">
              Refresh page
              <a v-link="{ path: '/' }" class="pull-right">
                <i class="fa fa-chevron-left" aria-hidden="true" style="margin: 8px 1px 7px 0"></i>
              </a>
            </h4>
          </div>
          
          <div class="panel-body">

            <div class="form-group">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <label for="ogame-extension-refresh-timeout-value">Constant time (s) period (normal mode)</label>
                </div>
                <div class="panel-body">
                  <input v-model="refreshTime" type="number" class="form-control" name="ogame-extension-refresh-timeout-value">
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <label>Random time (s) period (random mode)</label>
                </div>
                <div class="panel-body row">
                  <div class="col-xs-6">
                    <label for="ogame-extension-refresh-period-start-value">from</label>
                    <input v-model="refreshPeriodStart" type="number" class="form-control" name="ogame-extension-refresh-period-start-value">
                  </div>
                  <div class="col-xs-6">
                    <label for="ogame-extension-refresh-period-end-value">to</label>
                    <input v-model="refreshPeriodEnd" type="number" class="form-control" name="ogame-extension-refresh-period-end-value">
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-default col-xs-12"
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
      refreshTime: 10,
      refreshPeriodStart: 0,
      refreshPeriodEnd: 0
    };
  },
  methods: {
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
      this.refreshTime = OE.Storage.get('RefreshTime') || this.refreshTime;
      this.refreshPeriodStart = OE.Storage.get('RefreshPeriodStart') || this.refreshPeriodStart;
      this.refreshPeriodEnd = OE.Storage.get('RefreshPeriodEnd') || this.refreshPeriodEnd;
    });
  }
});

Vue.component('refresh-form', refreshForm);