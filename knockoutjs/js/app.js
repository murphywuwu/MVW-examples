(function() {
  'use strict';

  var ENTER_KEY = 13;
  var ESCAPE_KEY = 27;


  // represent a single todo item
  var Todo = function(title, completed) {
    this.title = ko.observable(title);
    this.completed = ko.observable(completed);
    this.editing = ko.observable(false);
  }

  // our main view model
  var ViewModel = function(todos) {
    // map array of passed in todos to an observableArray of Todo objects
    this.todos = ko.observableArray(todos.map((todo) => {
      return new Todo(todo.title, todo.completed);
    }));

    // store the new todo value being entered
    this.current = ko.observale();

    this.showMode = ko.observable('all');

    this.filteredTodos = ko.computed(function() {
      switch(this.showMode()) {
        case 'active':
          return this.todos().filter((todo) => {
            return !todo.completed();
          });
        case 'completed':
          return this.todos().filter((todo) => {
            return todo.completed();
          });
        default:
          return this.todos();
      }
    }.bind(this));

    // add a new todo, when enter key is pressed
    this.add = function() {
      var current = this.current().trim();
      if (current) {
        this.todos.push(new Todo(current));
        this.current('');
      }
    }.bind(this);

    // remove a single todo
    this.remove = function(todo) {
      this.todos.remove(todo)
    }.bind(this);

    // remove all completed todos
    this.removeCompleted = function() {
      this.todos.remove((todo) => {
        return todo.completed();
      })
    }.bind(this);

    // edit an item
    this.editItem = function(item) {
      item.editing(true);
      item.previousTitle = item.title();
    }.bind(this);

    // stop editing an item. Remove the item, if it is now empty
    this.saveEditing = function(item) {
      item.editing(false);

      var title = item.title();
      var trimmedTitle = title.trim();

      if (title !== trimmedTitle) {
        item.title(trimmedTitle);
      }
      if (!trimmedTitle) {
        this.remove(item)
      }
    }.bind(this);

    this.cancelEditing = function(item) {
      item.editing(false);
      item.title(item.previousTitle);
    }.bind(this);

    // count of all completed todos
    this.completedCount = ko.computed(function() {
      return this.todos().filter(funtion(todo) {
        return todo.completed();
      }).length;
    }.bind(this));

    this.remainingCount = ko.computed(function() {
      return this.todos().length - this.completedCount();
    }.bind(this));

    this.allCompleted = ko.computed({
      // always return true/false based on the done flag of all todos
      read: function() {
        return !this.remainingCount();
      }.bind(this),

      write: function(newValue) {
        this.todos().forEach((todo) => {
          todo.completed(newValue);
        })
      }.bind(this)
    });

    // helper function to keep expressions out of markup
    this.getLable = function(count) {
      return ko.utils.unwrapObservable(count) === 1 ? 'item' : 'items';
    }.bind(this);

    ko.computed(function() {
      localStorage.setItem('todos-knockoutjs', ko.toJSON(this.todos));
    }.bind(this).extend({
      rateLimit: { timeout: 500, method: 'notifyWhenChangesStop' }
    }))
  }

  var todos = ko.util.parseJSON(localStorage.getItem('todos-knockoutjs'));
  var viewModel = new viewModel(todos || []);
  
  ko.applyBindings(viewModel)


  Router({
    '/:filter': viewModel.showMode
  }).init();
})();