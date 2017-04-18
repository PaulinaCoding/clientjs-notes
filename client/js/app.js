function addTodo(content) {
  var list = document.querySelector('ul');
  var text = document.createTextNode(content);
  var item = document.createElement('li');
  item.appendChild(text);
  list.appendChild(item);
}

function setupEventListeners() {
  var button = document.querySelector('button[name=add]');
  button.addEventListener('click', function(event) {
    event.preventDefault();

    var content = document.querySelector('input[name=content]');
    if(content.value !== '') {
      addTodo(content.value);
    }
    content.value = '';
  });
}

document.addEventListener('DOMContentLoaded', function(event) {
  setupEventListeners();
});