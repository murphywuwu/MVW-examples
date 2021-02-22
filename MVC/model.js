(function(root) {
  class Model extends root.EventEmitter {
    constructor() {
      super();
      
      this.todos = [];
    }

    add(todo) {
      this.todos.push(todo);

      this.emit('add', todo);
    }

    remove(id) {
      let index = this.todos.findIndex((todo) => {
        return todo.id == id;
      });

      if (index !== -1) {
        this.todos.splice(index, 1);
      }

      this.emit('remove', id);
    }

    find(query) {
      return this.todos.filter((todo) => {
        for (var q in query) {
          if (query[q] !== todo[q]) {
            return false;
          }
        }

        return true;
      });
    }

    update(id, data) {
      let index= this.todos.findIndex((todo) => {
        return todo.id == id;
      });

      let completed;

      if (index !== -1) {
        for (let key in data) {
          let todo = this.todos[index];
          todo[key] = data[key];
          if (key == 'completed') {
            completed = todo[key];
          }
        }

        this.emit('update', id, completed);
      }
    }
  }

  root.Model = Model;
})(window)