const __extensionActive = "ogameExtensionActive";

var router = new VueRouter();

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
      router.go('/');
    }
  },
  ready: function() {
    OE.Storage.ready(() => {
      this.extensionActive = OE.Storage.get("Active");
      let route = OE.Storage.get("Route");
      if(route && route.path) {
        router.go(route.path);
      }
    });
  }
});

var DefaultView = Vue.extend({
  template: `
    <refresh-button></refresh-button>
    <coords-shortcut-button></coords-shortcut-button>
  `
});

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

router.beforeEach(function(transition) {
  OE.Storage.ready(() => {
    OE.Storage.set({
      "Route" : transition.to
    });
  });
  transition.next();
});

router.start(App, '#app');