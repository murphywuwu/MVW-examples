(function(root) {
  class View {
    constructor() {

      this.newTodo = document.querySelector('.new-todo');
      this.todoList = document.querySelector('.todo-list');
      this.todoCount = document.querySelector('.todo-count');
      this.template = new Template();
    }

    addItem(todo) {
      var template = this.template.getTodoTemplate(todo);

      this.todoList.innerHTML += template;
      this.newTodo.value = '';
    }

    editItem(id, completed) {
      var todo = document.querySelector(`[data-id='${id}']`);
      
      todo.className = completed ? 'completed' : ''; 
    }

    removeItem(id) {
      var todo = document.querySelector(`[data-id='${id}']`);

      this.todoList.removeChild(todo);
    }

    renderItemCounter (len){
      var template = this.template.getTodoCounterTemplate(len);

      this.todoCount.innerHTML = template;
    }

    bind(event, handler) {
      
      if (event === 'addItem') {
        this.newTodo.addEventListener('keydown', handler);
      }
      else if (event === 'editItem') {
        this.todoList.addEventListener('click', handler);
      }
      else if (event === 'removeItem') {
        this.todoList.addEventListener('click', handler);
      }
    }
  }


  root.View = View;
})(window)