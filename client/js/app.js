function addTodo(content) {
  var list = document.querySelector('ul');
  var text = document.createTextNode(content);
  var item = document.createElement('li');
  item.appendChild(text);
  list.appendChild(item);
}

function setupEventListeners() {
  var button = document.querySelector('button[name=add]');
  //selecting specific button by name - add is a name
  button.addEventListener('click', function(event) {
    //test with console.log('test') but this shown for only a milisecond and ther reload this is a defualt behaviour
    event.preventDefault();
    // we stop this default reload with this line

    var content = document.querySelector('input[name=content]');
    if(content.value !== '') {
      addTodo(content.value);
      
      //content is the input we are grabing data from
      //querySelector works more like jqury. more specific than document.get element
      // console.log(content.value); to check it
      //value was one of the DOM objects/imputs
      //you will be using this while building react apps to not to build entire library of the jqury
      //not to use jquery 
    }
    content.value = '';
  });
}

document.addEventListener('DOMContentLoaded', function(event) {
  setupEventListeners();
  //the way to keep the js in the head
});
