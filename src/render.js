const render = state => {

let listHTML = "";
listHTML += `<div id='listDiv'>
`;
state.todos.forEach(todo => {
  let text = todo.text;
  let todoHTML = `<p>${text}</p>`;
  listHTML += `  ${todoHTML}
  `;
});
listHTML += `</div>`;

let html = `
<!DOCTYPE html>
<html>
<header>
  <title>TODO</title>
</header>
<body>
  <div id="filterableList">
    <div id="filterDiv"></div>
      ${listHTML}
    </div>
  </div>
</body>
</html>
`

return html;
};

exports.render = render;
