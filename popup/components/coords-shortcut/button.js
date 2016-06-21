const coordsShortcutButton = Vue.extend({
  template: `
    <div class="col-md-12">
      <div class="panel panel-primary">
        <div class="panel-heading clearfix">
          <h4 class="panel-title pull-left" style="line-height: 30px;">Coordinates shortcuts</h4>
          <div class="pull-right" style="margin: 8px 0 8px 14px;">
            <a v-link="{ path: '/coords-shortcut-form' }">
              <i class="fa fa-cog" aria-hidden="true" style="color: white;"></i>
            </a>
          </div>
          <div class="pull-right">
            <select v-model="coordsShortcutActive"
                    @change="onCoordsShortcutActiveChange"
                    class="form-control input-sm"
                    style="width: auto;">
              <option value="off">Off</option>
              <option value="on">on</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return {
      coordsShortcutActive: "off"
    };
  },
  methods: {
    onCoordsShortcutActiveChange: function(event) {
      OE.Storage.set({'CoordsShortcutActive': event.target.value});
    }
  },
  ready: function() {
    OE.Storage.ready(() => {
      this.coordsShortcutActive = OE.Storage.get('CoordsShortcutActive') || this.coordsShortcutActive;
    });
  }
});

Vue.component('coords-shortcut-button', coordsShortcutButton);