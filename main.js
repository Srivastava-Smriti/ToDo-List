const list = document.querySelector(".todo-list");
const addBtn = document.querySelector(".add");
const modeBtn = document.querySelector("#btn-mode");

// Add todo
const addTodo = (val)=>{
    let item = document.createElement("li");
    item.classList.add("item");
    item.innerHTML = val;
    let buttons = document.createElement("div");
    let editBtn = document.createElement("button");
    editBtn.classList.add("fa-solid","fa-pen","btn");
    editBtn.addEventListener("click",function(){editTodo(item)});
    let rmvBtn = document.createElement("button");
    rmvBtn.classList.add("fa-solid", "fa-check", "btn");
    // rmvBtn.onclick=()=>{rmvItem(item)};                            ----- correct
    rmvBtn.addEventListener("click",function(){rmvItem(item)});
    buttons.appendChild(editBtn);
    buttons.appendChild(rmvBtn);
    item.appendChild(buttons);
    list.appendChild(item);
}

// Update the todo list
const updateList = () => {
    let value = document.querySelector(".inp").value;
    if (value) {
        document.querySelector(".inp").value= "";
        addTodo(value);
        } else {
            alert('Please enter a task!');
    };
    saveData();
}

// Remove todo
const rmvItem = (item)=> {
    list.removeChild(item);
    saveData();
}

// Edit todo 
const editTodo = (item) =>{
    let val = item.innerText;
    document.querySelector(".inp").value = val;
    list.removeChild(item);
    saveData();
}

// Add btn listener
addBtn.addEventListener("click",function(){
    updateList();
})

// Switch Modes 
modeBtn.addEventListener("click",function(){changeMode()})

const changeMode = ()=>{
    document.body.classList.toggle("dark");
    modeBtn.classList.toggle("fa-moon");
    modeBtn.classList.toggle("fa-sun");
}

// Local Storage
const saveData = ()=>{
    const data = Array.from(list.children).map((item) => item.innerText);
    localStorage.setItem("data", JSON.stringify(data));
}   
const display = ()=>{
    const storedData = localStorage.getItem("data");
    if (storedData) {
      const data = JSON.parse(storedData);
      data.forEach((task) => addTodo(task));
    }    
}
display();
// localStorage.removeItem("data");