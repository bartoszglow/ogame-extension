OE.playersStorage = (function() {
  let __players = [];

  window.Player = class {
    constructor(assignData) {
      Object.assign(this, assignData);
      this.planets.forEach(planet => Object.assign(planet, {
        player: this
      }));
    }

    findPlanets(target) {
      let _planets = this.planets.filter(planet => {
        let match = true;
        Object.keys(target).forEach(prop => match &= planet[prop] == target[prop]);
        return match;
      })
      _planets = _planets || {};
      return _planets;
    }

    deletePlanet(planetToDelete) {
      let index = this.planets.findIndex(planet => planet = planetToDelete);
      this.planets.splice(index, 1);
    }

    update(data) {
      Object.keys(data).forEach(prop => {
        if (prop != 'planets')
          this[prop] = data[prop]
        else {
          data.planets.forEach(newPlanet => {
            let updatedPlanet;
            let mirrorPlanets = Player.findPlanets({
              galaxy: newPlanet.galaxy,
              system: newPlanet.system,
              planet: newPlanet.planet
            });

            mirrorPlanets.forEach(planet => {
              if (planet.player != this)
                planet.player.deletePlanet(planet);
              else
                updatedPlanet = planet;
            })

            Object.assign(newPlanet, {
              player: this
            });
            updatedPlanet ? Object.assign(updatedPlanet, newPlanet) : this.planets.push(newPlanet);
          })
        }
      })
    }

    static findPlayers(target) {
      let _players = __players.filter(player => {
        let match = true;
        Object.keys(target).forEach(prop => match &= player[prop] === target[prop]);
        return match;
      })
      _players = _players || {};
      return _players;
    }

    static findPlanets(target) {
      let _planets = [];
      __players.forEach(player => {
        let planetFiltered = player.findPlanets(target);
        _planets = _planets.concat(planetFiltered);
      })
      _planets = _planets || {};
      return _planets;
    }

    static new(data) {
      if (data.name != null){
        let lastPlayer = __players.find(player => player.name == data.name);
        lastPlayer ? lastPlayer.update(data) : __players.push(new Player(data));
      } else if (data.planets){
        data.planets.forEach(planet => {
          let mirrorPlanets = Player.findPlanets({
            galaxy: planet.galaxy,
            system: planet.system,
            planet: planet.planet
          });
          if (!mirrorPlanets[0].report || mirrorPlanets[0].report < planet.report) {
            mirrorPlanets[0] ? mirrorPlanets[0].player.update(data) : console.log("PLAYER-STORAGE! CAN NOT FIND PLANET");
          }
        });
      }
    }

    static get(id) {
      let player = __players[id] || {};
      return player;
    }

    static out() {
      console.log("Players list:");
      console.log(__players);
    }

    static fetch() {
      __players = OE.Storage.get('Players') || __players;
      let _transfered = [];
      __players.forEach(player => {
        _transfered.push(new Player(player));
      })
      __players = _transfered;
    }

    static save() {
      OE.Storage.set({
        'Players': __players
      });
    }

    static clear() {
      __players = [];
    }
  }

  function __init() {
    OE.Storage.ready(() => {
      console.log("PLAYER-STORAGE RUN");
      if(!__players.length)
        Player.fetch();
    });
  }

  $(document).ready(__init);
})();
