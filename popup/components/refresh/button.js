const refreshButton = Vue.extend({
  template: `
    <div class="col-md-12">
      <div class="panel panel-primary">
        <div class="panel-heading clearfix">
          <h4 class="panel-title pull-left" style="line-height: 30px;">Refresh page</h4>
          <div class="pull-right" style="margin: 8px 0 8px 14px;">
            <a v-link="{ path: '/refresh-form' }">
              <i class="fa fa-cog" aria-hidden="true" style="color: white;"></i>
            </a>
          </div>
          <div class="pull-right">
            <select v-model="refreshType"
                    @change="onRefreshTypeChange"
                    class="form-control input-sm"
                    style="width: auto;">
              <option value="off">Off</option>
              <option value="normal">normal</option>
              <option value="random">random</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return {
      refreshType: 'off'
    };
  },
  methods: {
    onRefreshTypeChange: function(event) {
      OE.Storage.set({'RefreshType': event.target.value});
    },
  },
  ready: function() {
    OE.Storage.ready(() => {
      this.refreshType = OE.Storage.get('RefreshType') || this.refreshType;
    });
  }
});

Vue.component('refresh-button', refreshButton);