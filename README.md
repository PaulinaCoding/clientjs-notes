# JavaScript for the Client

## The Browser

Browsers are complicated. The Chrome browser has over 5 million lines of code. What does all of that code do? Approximately 800k lines are needed for the V8 JavaScript engine, another 700k lines are needed for the layout engine. That means that approximately 30% of the code needed for the Chrome browser is only for rendering HTML and interpreting/executing JavaScript.

In the same way that the different browsers have different JavaScript implementations, they also have their own layout engine implementations. The browser uses the layout engine to parse HTML and generate a Document Object Model.

Firefox has Gecko, Chrome has Blink, Edge has EdgeHTML and Safari has WebKit. Up until 2013 both Safari and Chrome were using WebKit. In 2013 Google forked WebKit and called it Blink. Just like with JavaScript engines we rely on the companies responsible for these browsers to implement their rendering engines to a specification. This is the easiest path to ensure that our applications look the same across multiple browsers.

There is a comparison fo the differnt layout engines on [Wikipedia](https://en.wikipedia.org/wiki/Comparison_of_layout_engines_(Document_Object_Model)). It's pretty boring, but it does describe the supported features for each version of the DOM in each layout engine.

## The DOM (Document Object Model)

The Document Object Model is a representation of an HTML, XHTML, or XML document. The text that describes the structure is parsed by the layout engine. It is then converted into the DOM. This means that each element, starting at the root, is represented by an object.

A tree structure is used. Each element represents a node in the tree, which is connected to it's parent and children. HTML is simply text. It is the DOM that represents the state of the document in the browser.

> See the clientjs.pdf for diagrams.

## DOM + JS

It is a JavaScript API that allows us to manipulate the DOM and create dynamic HTML.

* JavaScript can add, change, and remove all the HTML elements and attributes in the page.
* JavaScript can change all the CSS styles in the page.
* JavaScript can react to all existing events in the page.
* JavaScript can create new events in the page.

### navigator

The Navigator interface represents the state of the browser. This interface isn't used very often. One useful feature of the navigator object is access to the browsers geolocation functionality. These objects are available in the global scope of JavaScript running the in the browser (these wouldn't be availabe in Node).

```javascript
navigator.geolocation.getCurrentPosition(function(geo) {
  console.log(geo.coords.latitude + ', ' + geo.coords.longitude);
});
```

[MDN Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)

### window

The window interface represents a window containing a DOM document. With modern browsers that support tabs, you can think about each tab having it's own window object. There are a lot of useful properties and methods that exist on the window object. Maybe you are interested in figuring out how large the interior space of the browser window is?

```javascript
console.log(window.innerWidth + 'x' + window.innerHeight)
```

The issue with these methods and properties is that they can be supported in only some browsers. The browser developer is the one providing this object so they could potentially put any information they want. When using these features it is important to test across multiple browsers from different vendors.

[MDN Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)

### document

The document interface represents a web page loaded into a window. This is the entry point into the content of the web application. Since our focus is on DOM manipulation, we will find ourselves using the document object quite a bit.

Let's say that we have the following HTML that has been parsed and now exists as the DOM tree.

```html
<html>
  <head>
    <title>JavaScript for the Client</title>
  </head>
  <body>
    <div id="container">
      <div class="fields">
        <input name="add" />
        <button>Add</button>
      </div>
    </div>
  </body>
</html>
```

The browser vendors provide us with methods that we can use to get certain elements in the DOM. The four main methods are:

```javascript
// returns the specific div element with the id 'container'
document.getElementById('container');

// returns a list of elements that have the class 'fields'
document.getElementsByClassName('fields');

// returns a list of elements that have the name attribute with a value of 'add'
document.getElementsByName('add');

// returns a list of the elements that have the tag 'button'
document.getElementsByTagName('button');
```

If we want to use more general query selectors, we can do that with the general api. Remember that if you are tageting ids or classes you need to use the '#' and '.' characters.

```javascript
// returns the first element that uses the div tag and has a id 'container'
document.querySelector('div#container');

// returns the first element that uses the div tag and has a class 'fields'
document.querySelector('div.fields')

// returns a list all of elements that use the div tag
document.querySelectorAll('div');
```

Now that we are able to select elements in the DOM tree, the real manipulation comes when we can dynamically create new nodes and move them around. The document object provides methdos to do this.

```javascript
var element = document.getElementById('container');
var div = document.createElement('div');

// we have a container div that we want to append our new div to
element.appendChild(div);
```

[MDN Document](https://developer.mozilla.org/en-US/docs/Web/API/Document)


## Events

The browser supports a lot of different events. We use this interface to listen for certain events that happen so we can react to them. Today we will focus on DOM events, but there are many others. You can use events to implement features that rely on drag and drop, clipboard behaviour, and Gamepad support.

Any of these events seem interesting?

* click
* focus, blur
* keyup, keydown
* mouseup, mousedown, mouseover, mousemove
* scroll
* select

We have a button and we want to know when it is clicked. When it is clicked we want to execute some JavaScript.

```javascript
var button = document.querySelector('button');
button.addEventListener('click', function(event) {
  console.log('Button has been clicked ' + event.detail + ' times.');
});
```

There is a lot more information available in the `event` object that is passed to the callback. The details are well documented on [MDN click Event](https://developer.mozilla.org/en-US/docs/Web/Events/click).

Another event that we can use is the 'DOMContentLoaded' event. The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.

```javascript
document.addEventListener('DOMContentLoaded', function(event) {
  console.log('The DOM is loaded!');
});
```

Events are a very important in building complex user interaction in your web applications. It is important to review the documentation and get an overall understanding of the available events. No one expects you to remember them all, especially not the details. It is however important to know what is possible when interacting with the browser.

[MDN Events](https://developer.mozilla.org/en-US/docs/Web/Events)

## Bonus

When we handle events sometimes we want to ensure that they are not handled any further. In the example today we had a button that was part of a form. We only want to handle the click event on the button, and don't want to submit the form.

We can cancel events. Using the `Event.preventDefault()` method we can tell the browser that we are happy to do all the necessary work when the event is triggered.

[MDN Event.preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
