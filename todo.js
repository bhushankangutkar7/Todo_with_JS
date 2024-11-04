const input = document.querySelector(".input");
const addBtn = document.querySelector(".add-Btn");
const repeatedMsg = document.querySelector(".repeated-Msg");
const todoContainer = document.querySelector(".todo-Container");
let todoList = JSON.parse(localStorage.getItem("todoL")) || [];

// function uuid() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
//   .replace(/[xy]/g, function (c) {
//       const r = Math.random() * 16 | 0, 
//           v = c == 'x' ? r : (r & 0x3 | 0x8);
//       return v.toString(16);
//   });
// }

const updateLocalStorage = (todoList) => {
  localStorage.setItem("todoL", JSON.stringify(todoList))
};

// Adds value upon clicking enter
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && input.value !== "") {
    if (todoList.some(todo => todo.value === input.value)) {
      repeatedMsg.classList.remove("none-D");
    } else {
      todoList.push({ id: crypto.randomUUID(), value: input.value, isCompleted: false });
      repeatedMsg.classList.add("none-D");
      renderTodoList(todoList);
      input.value="";
      updateLocalStorage(todoList);
    }
  }
});

// Adds value upon clicking Add Button
addBtn.addEventListener("click", (event) => {
  if (input.value !== "") {
    if (todoList.some(todo => todo.value === input.value)) {
      repeatedMsg.classList.remove("none-D");
    } else {
      todoList.push({ id: crypto.randomUUID(), value: input.value, isCompleted: false });
      repeatedMsg.classList.add("none-D");
      renderTodoList(todoList);
      input.value="";
      updateLocalStorage(todoList);
    }
  }
});

// TodoList Render Function
const renderTodoList = (todoList) => {
  todoContainer.innerHTML = "";
  todoList.map((todo) => {
    const newTodo = document.createElement("DIV");
    newTodo.classList.add("todo");
    newTodo.innerHTML = 
    `<input type="checkbox"  class="check-Box" data-key=${todo.id}.${todo.value} ${todo.isCompleted ? "checked": ""} />
    <label class="todoLabel ${todo.isCompleted ? "textStrikeThrough" : ""}" data-key=${todo.id}.${todo.value}>${todo.value}</label>
    <button class="delete-Btn" data-id=${todo.id}>
      <span class="material-symbols-outlined" data-id=${todo.id}>
        delete
      </span>
    </button>`;
    todoContainer.appendChild(newTodo);
  });
};

// This ensures any sample is shown to the user
renderTodoList(todoList); 


// EventListener on todoContainer for checkbox, strikethrough and delete functionality
todoContainer.addEventListener("click", (event)=>{

  // For deletion
  if(event.target.dataset.id) {
    todoList = todoList.filter((todo) => todo.id !== event.target.dataset.id);
  };

  // For checkbox
  if (event.target.dataset.key) {
    let eventKey = event.target.dataset.key;
    let [id] = eventKey.split("."); //Split require as eventKey doesn't captures words after spaces

    todoList = todoList.map((todo) => {
      // Toggles the completed state
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted }; // Update isCompleted based on checkbox state
      } 
      else {
        return todo;
      }
    });
  }

  updateLocalStorage(todoList);
  renderTodoList(todoList);

});

