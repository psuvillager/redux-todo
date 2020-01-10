// Imports redux.createStore, reducers.todoApp, and the props from `actions`
const
  http = require('http'),
  { createStore } = require('redux'),
  { todoApp } = require('./src/reducers'),
  {
    addTodo,
    toggleTodo,
    setVisibilityFilter,
    VisibilityFilters
  } = require('./src/actions'),
  { render } = require('./src/render');

// Defines the store by passing the root reducer to `createStore`
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
let suppress; //suppress = true;
const unsubscribe = store.subscribe( (suppressLogs = suppress) => {
  stateHistory.push(store.getState);
  if(!suppressLogs){
    console.log(store.getState());
  }
});


// Defines the handler for requests from the browser
const handleRequest = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  response.write(render(store.getState()));
  //response.write(JSON.stringify(store.getState()));
  response.end();
};

// Sets up the server
http.createServer(handleRequest).listen(8000);

// Dispatches some test actions
store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE));
store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));

// Stops listening to state updates
unsubscribe();