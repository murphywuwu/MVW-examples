(function(root) {
  class Template {
    getTodoTemplate(todo) {
      let template = '<li data-id="{{id}}" class="{{completed}}">' 
          + '<label>{{value}}</label>' 
          + '<button class="del">x</button>'
        '</li>';
      template = template.replace('{{id}}', todo.id);
      template = template.replace('{{value}}', todo.title);
      template = template.replace('{{completed}}', todo.completed ? 'completed' : '');

      return template;
    }
    getTodoCounterTemplate(len) {
      return '待办事项还剩' + '<strong>'  + len + '</strong>' + ' 件';
    }
  }

  root.Template = Template;
})(window)