// Action types
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

// Othere constants
const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
}

// Action creators
const addTodo = function(text){
  return { type: ADD_TODO, text: text }
}

const toggleTodo = function(index){
  return { type: TOGGLE_TODO, index: index }
}

const setVisibilityFilter = function(filter){
  return { type: SET_VISIBILITY_FILTER, filter: filter }
}

exports.ADD_TODO = ADD_TODO;
exports.TOGGLE_TODO = TOGGLE_TODO;
exports.SET_VISIBILITY_FILTER = SET_VISIBILITY_FILTER;
exports.VisibilityFilters = VisibilityFilters;
exports.addTodo = addTodo;
exports.toggleTodo = toggleTodo;
exports.setVisibilityFilter = setVisibilityFilter;
