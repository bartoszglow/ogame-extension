const __extensionActive = "ogameExtensionActive";

new Vue({
  el: '#app',
  template: `
    <div class="">
      <div class="form-group text-center">
        <label for="ogame-extension-active">
          <img src="/assets/planet.png" style="display: inline-block; width: 66px; margin-right: 10px;">
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
      <refresh-form v-if="extensionActive == 'true'"></refresh-form>
    </div>
  `,
  data: {
    title: "Ogame extension",
    extensionActive: "false"
  },
  methods: {
    onExtensionActiveChange: function(event) {
      OE.Storage.set({"Active": event.target.value});
    }
  },
  init: function() {
    OE.Storage.ready(() => {
      this.extensionActive = OE.Storage.get("Active");
    });
  }
});
