const coordsShortcutForm = Vue.extend({
  template: `
    <div class="col-md-12">
      <div class="panel panel-primary">

        <div class="panel-heading clearfix">
          <h4 class="panel-title" style="line-height: 30px;">
            Coordinates shortcuts
            <a v-link="{ path: '/' }" class="pull-right">
              <i class="fa fa-chevron-left" aria-hidden="true" style="margin: 8px 1px 7px 0"></i>
            </a>
          </h4>
        </div>

        <div class="panel-body" style="padding-bottom: 0;">

          <div class="panel-group" id="accordion" role="tablist">
            <div class="panel panel-default" v-for="player in players">
              <div class="panel-heading" role="tab" id="coordsShortcutForm-{{name}}">
                <div class="row" style="margin-bottom: -10px;">
                  <div class="col-xs-10">
                    <h4 class="panel-title">
                      <a role="button" data-toggle="collapse" data-parent="#accordion" href="#coordsShortcutForm-{{player.name}}">
                        {{player.name}}
                      </a>
                    </h4>
                  </div>
                  <div class="col-xs-2 form-group">
                    <a @click="removePlayer(player.name)" class="pull-right">
                      <i class="fa fa-trash" aria-hidden="true" style="margin-top: 3px; margin-right: 3px; cursor: pointer;"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div id="coordsShortcutForm-{{player.name}}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                <div class="panel-body" style="padding-bottom: 0;">
                  <form style="margin-bottom: 0;">
                    <div class="row">
                      <div class="col-xs-4 form-group">
                        <label>Planet name</label>
                      </div>
                      <div class="col-xs-7 form-group text-center">
                        <label>Planet Coordinates</label>
                      </div>
                    </div>
                    <div v-for="planet in player.planets" class="row">
                      <div class="col-xs-4 form-group">
                        <input disabled v-model="planet.name" type="text" class="form-control">
                      </div>
                      <div class="col-xs-2 form-group">
                        <input disabled v-model="planet.galaxy" type="number" class="form-control" style="padding-right: 0;">
                      </div>
                      <div class="col-xs-3 form-group">
                        <input disabled v-model="planet.system" type="number" class="form-control" style="padding-right: 0;">
                      </div>
                      <div class="col-xs-2 form-group">
                        <input disabled v-model="planet.planet" type="number" class="form-control" style="padding-right: 0;">
                      </div>
                      <div class="col-xs-1 form-group">
                        <a @click="removePlanet(player.name, planet.name)" class="pull-right">
                          <i class="fa fa-trash" aria-hidden="true" style="margin-top: 3px; margin-right: 3px; cursor: pointer;"></i>
                        </a>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-4 form-group">
                        <input v-model="newPlanet.name" type="text" class="form-control">
                      </div>
                      <div class="col-xs-2 form-group">
                        <input v-model="newPlanet.galaxy" type="number" class="form-control" style="padding-right: 0;">
                      </div>
                      <div class="col-xs-3 form-group">
                        <input v-model="newPlanet.system" type="number" class="form-control" style="padding-right: 0;">
                      </div>
                      <div class="col-xs-2 form-group">
                        <input v-model="newPlanet.planet" type="number" class="form-control" style="padding-right: 0;">
                      </div>
                      <div class="col-xs-1 form-group">
                        <a @click="addNewPlanet(player.name, newPlanet)" class="pull-right">
                          <i class="fa fa-save" aria-hidden="true" style="margin-top: 8px; margin-right: 3px; cursor: pointer;"></i>
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <div class="row" style="margin-bottom: -15px;">
                  <div class="col-xs-11 form-group">
                    <input v-model="newPlayer.name" type="text" class="form-control">
                  </div>
                  <div class="col-xs-1 form-group">
                    <a @click="addNewPlayer(newPlayer)" class="pull-right">
                      <i class="fa fa-save" aria-hidden="true" style="margin-top: 8px; margin-right: 3px; cursor: pointer;"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return {
      newPlanet: {
        name: '',
        galaxy: '',
        system: '',
        planet: ''
      },
      newPlayer: {
        name: '',
        planets: []
      },
      players: []
    };
  },
  methods: {
    removePlanet: function(playerName, planetName) {
      let playerIndex = this.findIndexByName(this.players, playerName);
      let planetIndex = this.findIndexByName(this.players[playerIndex].planets, planetName);
      this.players[playerIndex].planets.splice(planetIndex, 1);
      this.syncPlayers();
    },
    addNewPlanet: function(playerName, {name, galaxy, system, planet}) {
      let playerIndex = this.findIndexByName(this.players, playerName);
      this.players[playerIndex].planets.push({ name, galaxy, system, planet });
      this.syncPlayers();
      this.newPlanet = {
        name: '',
        galaxy: '',
        system: '',
        planet: ''
      };
    },
    removePlayer: function(playerName) {
      let playerIndex = this.findIndexByName(this.players, playerName);
      this.players.splice(playerIndex, 1);
      this.syncPlayers();
    },
    addNewPlayer: function({name}) {
      this.players.push({name, planets: []});
      this.syncPlayers();
      this.newPlayer= {
        name: '',
        planets: []
      };
    },
    syncPlayers: function() {
      OE.Storage.set({'CoordsShortcutPlayers': this.players});
    },
    findIndexByName: function(array, playerName) {
      for(let i = 0; i < this.players.length; i++) {
        if(this.players[i].name === playerName) {
          return i;
        }
      }
    }
  },
  ready: function() {
    OE.Storage.ready(() => {
      this.players = OE.Storage.get('CoordsShortcutPlayers') || this.players;
    });
  }
});

Vue.component('coords-shortcut-form', coordsShortcutForm);
