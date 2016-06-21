const __extensionActive = "ogameExtensionActive";

const App = Vue.extend({
  template: `
    <div class="">
      <div class="form-group text-center">
        <label for="ogame-extension-active">
          <img src="/assets/img/planet.png" style="display: inline-block; width: 66px; margin-right: 10px;">
          <h3 style="display: inline-block; margin-top: 30px; margin-right: 10px;">
            {{ title }}
            <span data-bind="text: myMessage"></span>
          </h3>
        </label>
        <select v-model="extensionActive"
                @change="onExtensionActiveChange"
                class="form-control"
                style="display: inline-block; width: auto;"
                name="ogame-extension-active">
          <option value="false">Off</option>
          <option value="true">On</option>
        </select>
      </div>
      <div v-if="extensionActive === 'true'">
        <router-view></router-view>
      </div>
    </div>
  `,
  data: function() {
    return {
      title: "Ogame extension",
      extensionActive: "false"
    };
  },
  methods: {
    onExtensionActiveChange: function(event) {
      OE.Storage.set({"Active": event.target.value});
    }
  },
  ready: function() {
    OE.Storage.ready(() => {
      this.extensionActive = OE.Storage.get("Active");
    });
  }
});

var DefaultView = Vue.extend({
  template: `
    <refresh-button></refresh-button>
    <coords-shortcut-button></coords-shortcut-button>
  `
});

var router = new VueRouter();

router.map({
  '/': {
    component: DefaultView
  },
  '/refresh-form': {
    component: refreshForm
  },
  '/coords-shortcut-form': {
    component: coordsShortcutForm
  }
});

router.start(App, '#app');