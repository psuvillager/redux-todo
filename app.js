// Imports redux.createStore, reducers.todoApp, and the props from `actions`
const
  http = require('http'),
  fs = require('fs'),
  url = require('url'),
  { createStore } = require('redux'),
  { parse } = require('node-html-parser'),
  { todoApp } = require('./src/reducers'),
  { once } = require('./src/helpers'),
  {
    addTodo,
    toggleTodo,
    setVisibilityFilter,
    VisibilityFilters
  } = require('./src/actions'),
  { render } = require('./src/render');

/*
// Defines the store by passing the root reducer to `createStore`
const portNumber = 8000;
const store = createStore(todoApp);

// Defines a global history array and pushes the initial state to it
const stateHistory = [];
stateHistory.push(store.getState());

// Logs the initial state
console.log(store.getState());

// Every time the state changes
//   - Add it to stateHistory
//   - Log it (unless suppress == true)
// (Note that subscribe() returns a function for unregistering the listener)
let suppress; suppress = true;
const unsubscribe = store.subscribe( (suppressLogs = suppress) => {
  stateHistory.push(store.getState);
  if(!suppressLogs){ console.log(store.getState()); }
});


// Defines the handler for requests from the browser
const handleRequest = (request, response) => {
  var http = require('http');
  var url = require('url');
  var fs = require('fs');
*/  
  var server = http.createServer(function(request, response) {
    var path = url.parse(request.url).pathname;
    switch (path) {
      case '/':
        response.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        response.write("This is Test Message.");
        response.end();
        break;
      case '/HtmlPage1.html':
        fs.readFile(__dirname + path, function(error, data) {
          if (error) {
            console.log(error);
            response.writeHead(404);
            response.write(error.toString());
            response.end();
          }
          else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            console.log(data);
            response.write(Buffer.from(data));
            response.end();
          }
        });
        break;
      case '/HtmlPage2.html':
        fs.readFile(__dirname + path, function(error, data) {
          if (error) {
            console.log(error);
            response.writeHead(404);
            response.write(error.toString());
            response.end();
          }
          else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(Buffer.from(data));
            response.end();
          }
        });
        break;
      default:
        response.writeHead(404);
        response.write("oops this doesn't exist - 404");
        response.end();
        break;
    }
  });
  server.listen(8082);

  /*
  fs.readFile('./index.txt', function(error, data){
    if(error){
      console.log("404");
      response.writeHead(404);
      response.write('404 :(');
    }
    else{
      response.writeHead(200, { 'Content-Type': 'text/html' });
      
      console.log("data:"); console.log(data);

      // parse HTML here? (w/ `node-html-parser`), insert dynamic elements, and write the result
      //const parsed = parse(data);       
      //console.log(parsed.firstChild.structure);

      // This succeeds (is meant to be integrated into the markup read from index.html below
      response.write(render(store.getState()));

      // This succeeds
      response.write('<!DOCTYPE html><div style="color:blue">woo</div>');

      // This fails, not sure why (Happens even if index.html contains markup identical to the above string)
      response.write(data);

      // This writes: {"type":"Buffer","data":[60,33,68,79,67,84,89,80,69,32 ... ]}
      response.write(JSON.stringify(data));

    }
    response.end();
  });
  

};

// Sets up the server
http.createServer(handleRequest).listen(portNumber);
*/


// Dispatches some test actions
/*
store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE));
store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));
*/

// Stops listening to state updates
//unsubscribe();