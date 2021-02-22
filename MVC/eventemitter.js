(function(root) {
  
  class EventEmitter {
    constructor() {
      // super();
      this.events = {};
    }

    on(evt, handler) {
      if (typeof evt === 'string' && evt) {
        let handlers = this.events[evt];
        
        if (typeof handler === 'function') {
          if (handlers) {
            return this.events[evt].push(handler);
          }
          return this.events[evt] = handler;
        }
      }
    }

    off(evt) {
      let handlers = this.events[evt];

      if (typeof evt === 'string' && evt) {
        delete this.events[evt];
      }
    }

    emit(evt) {

      if (typeof evt === 'string' && evt) {
        let args = [].slice.call(arguments);
        let handlers = this.events[evt];

        if (Array.isArray(handlers)) {
          for (let i = 0; i < handlers.length; i++) {
             let handler = handlers[i];
             if (typeof handler === 'function') {
               handler(...args.slice(1));
             }
          }
        }

        if (typeof handlers === 'function') {
          handlers(...args.slice(1));
        }
      }
    }
  }

  root.EventEmitter = EventEmitter;
})(window)