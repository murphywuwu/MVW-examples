(function(root) {
  class Controller {
    constructor() {
      this.view = new View();
      this.model = new Model();

      this.view.bind('addItem', this.addItem.bind(this));
      this.view.bind('editItem', this.editItem.bind(this));
      this.view.bind('removeItem', this.removeItem.bind(this))
      
      this.model.on('add', (todo) => {
        let unCompletedTodos = this.model.find({ completed: false });
      
        this.view.addItem(todo);
        this.view.renderItemCounter(unCompletedTodos.length);
      });
      this.model.on('update', (id, completed) => {
        let unCompletedTodos = this.model.find({ completed: false });


        this.view.editItem(id, completed);
        this.view.renderItemCounter(unCompletedTodos.length);
      });
      this.model.on('remove', (id) => {
        let unCompletedTodos = this.model.find({ completed: false });

        this.view.removeItem(id);
        this.view.renderItemCounter(unCompletedTodos.length);
      });
    }

    addItem(e) {
      if (e.keyCode === 13) {
        let value = e.target.value;
        let completed = false;

        if (!value.trim()) return;

        let todo = { title: value, completed, id: new Date().getTime() };

        this.model.add(todo);
      }
    }

    editItem(e) {
      let target = e.target;
      if (target.tagName.toLowerCase() === 'label') {
        let li = target.parentElement;
        let id = li.dataset.id;
        let completed = li.className ? true : false;
        
        this.model.update(id, { completed: !completed });
      }
    }

    removeItem(e) {
      let target = e.target;

      if (target.className === 'del') {
        let li = target.parentElement;
        let id = li.dataset.id;
        
        this.model.remove(id);
      }
    }
  }

  root.Controller = Controller;
})(window)