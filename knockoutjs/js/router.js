(function() {

  var Router = exports.Router = function(routes) {
    if (!(this instanceof Router)) return new Router(routes);

    this.params = {};
    this.routes = {};
    this.methods = ['on', 'once', 'after', 'before'];

    this.configure();
    this.mount(routes || {});
  }

  Router.prototype.configure = function(options) {
    options = options || {};

    for (var i = 0; i < this.methods.length; i++) {
      this._methods[this.methods[i]] = true;
    }


    this.delimiter = options.delimiter || '/';
  }


  Router.prototype.mount = function(routes, path) {
    if (!routes || typeof routes !== 'object' || Array.isArray(routes)) {
      return;
    }
    var self = this;
    path = path || [];

    if (!Array.isArray(path)) {
      path = path.split(self.delimiter);
    }

    function insertOrMount(route, local) {
      var rename = route,
          parts = route.split(self.delimiter),
          routeType = typeof routes[route],
          isRoute = parts[0] === '' || !self._methods[partsp[0]],
          event = isRoute ? 'on' : rename;
      if (isRoute) {

      }

      if (isRoute && routeType === 'object' && !Array.isArray(routes[route])) {

        return;
      }

      if (isRoute) {

      }
      
      self.insert(event, local, routes[route]);
    }

    for (var route in routes) {
      if (routes.hasOwnProperty(route)) {
        insertOrMount(route, path.slice(0));
      }
    }
  }

})(typeof exports === 'object' ? exports : window);