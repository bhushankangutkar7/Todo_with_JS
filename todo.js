const input = document.querySelector(".input");
const addBtn = document.querySelector(".add-Btn");
const repeatedMsg = document.querySelector(".repeated-Msg");
const todoContainer = document.querySelector(".todo-Container");
let id, value, isCompleted;
let todoList = JSON.parse(localStorage.getItem("todoL")) || [
  {id:"Sample1", value:"Sample Todo 1 ", isCompleted:false},
  {id:"Sample2", value:"Sample Todo 2", isCompleted:false},
  {id:"Sample3", value:"Sample Todo 3", isCompleted:false}
];


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

const renderTodoList = (todoList) => {
  todoContainer.innerHTML = "";
  todoList.map((todo) => {
    const newTodo = document.createElement("DIV");
    newTodo.classList.add("todo");
    newTodo.innerHTML = `<input type="checkbox" class="check-Box" data-key=${todo.id}.${todo.value} />
    <label class="todoLabel" data-key=${todo.id}.${todo.value}>${todo.value}</label>
    <button class="delete-Btn" data-id=${todo.id}>Delete</button>`;
    todoContainer.appendChild(newTodo);
  });
};

renderTodoList(todoList); // This ensures any sample is shown to the user

const deleteButtons = document.querySelectorAll(".delete-Btn");
// console.log(deleteButtons);

todoContainer.addEventListener("click", (event)=>{
  if(event.target.dataset.id) {
    todoList = todoList.filter((todo) => todo.id !== event.target.dataset.id);
    renderTodoList(todoList);
    updateLocalStorage(todoList);
  }
  if(event.target.dataset.key) {
    todoList.map((todo)=> `${todo.id}.${todo.value}` === event.target.dataset.key? {...todo, isCompleted:!isCompleted}: todo);
  };
  console.log(todoList);
});

