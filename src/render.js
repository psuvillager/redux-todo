const VisibilityFilters = require('./actions')


const
  fAppendToKnownParent = parent => 
    newChild => parent.appendChild(newChild),

  fReplaceContentsOfKnownElement = element =>
    replacement => element.innerHTML = replacement.innerHTML,

  appendToContainerDiv = newChild => 
    fAppendToKnownParent(document.getElementById("container")),

  replaceContentsOfListDiv = replacement =>
    fReplaceContentsOfKnownElement(document.getElementById(listDiv)),

  addOrRemoveClass = function(element, className, add){
    if(add === true){ element.classList.add(className); }
    else{ element.classList.remove(className); }
  }
;


const buildShell = function(options){
  // Returns html including header w/title & body w/container
  // Overwrites document if options.renderNow is truthy
  const
    html = document.createElement("html"),
    header = document.createElement("header"),
    title = document.createElement("title"),
    body = document.createElement("body"),
    container = document.createElement("div");
  
  title.innerHTML = options.title ? options.title : "TODO";
  container.id = "container";
  
  header.appendChild(title);
  html.appendChild(header);
  body.appendChild(container);
  html.appendChild(body);

  console.log(html.outerHTML);

  if(options.renderNow){ document.write(html.outerHTML); }
  return html.outerHTML;
}


const buildUiDiv = function(state, callback = (arg => arg)){
  const uiDiv = document.createElement("div");
  uiDiv.id = "uiDiv";
  const visibilityDropdown = document.createElement("select");
  visibilityDropdown.id = "visibilityDropdown";

  const visibilityValues = Object.values(VisibilityFilters);
  for(let val of visibilityValues){
    const option = document.createElement("option");
    option.value = val;
    option.innerHTML = val;
    visibilityDropdown.appendChild(option);
  }
  uiDiv.appendChild(visibilityDropdown);
  return callback(uiDiv);
};


const buildListDiv = function(state, callback = (arg => arg)){
  // Formats todos in a listDiv and returns listDiv
  // A callback can be provided to insert listDiv into DOM
  const listDiv = document.createElement("div");
  listDiv.id = "listDiv";

  state.todos.forEach(todo => {
    // Adds a todoDiv including todo.text (crossed out if .completed)
    const todoDiv = document.createElement("div");
    todoDiv.innerHTML = todo.text;
    addOrRemoveClass(todoDiv, "strikethrough", todo.completed);
    listDiv.appendChild(todoDiv);
  });

  return callback(listDiv);
}


exports.buildShell = buildShell;
exports.buildUiDiv = buildUiDiv;
exports.buildListDiv = buildListDiv;
exports.addOrRemoveClass = addOrRemoveClass;

exports.fAppendToKnownParent = fAppendToKnownParent;
exports.fReplaceContentsOfKnownElement = fReplaceContentsOfKnownElement;
exports.appendToContainerDiv = appendToContainerDiv;
exports.replaceContentsOfListDiv = replaceContentsOfListDiv;
