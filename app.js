const
  // Imports node modules
  http = require('http'),
  fs = require('fs'),
  url = require('url'),
  { createStore } = require('redux'),
  { parse } = require('node-html-parser'),

  // Imports app resources
  { todoApp } = require('./src/reducers'),
  { once } = require('./src/helpers'),
  {
    addTodo,
    toggleTodo,
    setVisibilityFilter,
    VisibilityFilters
  } = require('./src/actions'),
  { render } = require('./src/render'),

  // Sets other constants
  PORT_NUMBER = 8082
;

// Defines the store by passing the root reducer to `createStore`
const store = createStore(todoApp);

// Defines a global history array and pushes the initial state to it
const stateHistory = []; stateHistory.push(store.getState());

// Allows suppressing logs
let suppress; suppress = true;

// Registers a listener for any changes to state (`.subscribe` returns a function for unregistering)
const unsubscribe = store.subscribe( (suppressLogs = suppress) => {
  stateHistory.push(store.getState);
  if(!suppressLogs){ console.log(store.getState()); }
});

// Defines the server for the browser to send requests to
// (See www.c-sharpcorner.com/article/creating-server-and-host-html-page-using-node-js)
const server = http.createServer(handleRequest);
server.listen(PORT_NUMBER);

// Defines how the server will respond to requests from the browser
// Needs to trigger store updates and inform the browser of the new state (for client-side rendering)
//   or built new HTML from the new state and inform it of the new HTML (server-side rendering)
function handleRequest(request, response){
  let path = url.parse(request.url).pathname;
  switch(path){
    case '/favicon.ico': break; // Does nothing
    case '/': path = '/index.html'; // Uses main page
    case '/index.html': // Continues to next case
    case '/HtmlPage1.html': // Tries to read file at `path` and responds accordingly
      fs.readFile(__dirname + path, function(error, data){
        // Calls `serve404` if necessary
        if(error){ serve404(request, response, path, error); }
        // Otherwise, converts file object to a Buffer, and writes it to response
        else{
          response.writeHead(200, { 'Content-Type': 'text/html' });

          // Parsing and manipulating HTML on the server is complicated so
          //   either use jsdom or just build the markup out of JS strings
          response.write(Buffer.from(data)); }
          response.end();
      });
      break;
    default: serve404(request, response, path, "unknown file: " + path);
  }
}

function serve404(req, res, path, err){
  console.log(err);
  fs.readFile(__dirname + '404', function(errorPageError, errorPageData){
    if(errorPageError){
      // In case the 404 page itself is not found
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(errorPageError.toString());
    }
    else{
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(Buffer.from(errorPageData)); }
  });
}

/*
// parse HTML w/ `node-html-parser`, insert dynamic elements, and write the result, something like:
//const parsed = parse(data);       
//console.log(parsed.firstChild.structure);

// This succeeds (is meant to be integrated into the markup read from index.html below
response.write(render(store.getState()));

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