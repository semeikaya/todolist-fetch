const addButton = document.querySelector("#button1");
const input = document.querySelector("#input");
const todoArray = [];

const todoRender = (Array) => {
    const ul = document.querySelector("#list");
    ul.innerHTML = "";
    for (let i = 0; i < Array.length; i++) {
        const li = document.createElement("li");
        const del = document.createElement("input");
        const complete = document.createElement("input");
        li.textContent = Array[i].title;
        li.className = "marker";
        li.style.color = "white";
        del.type = "button";
        del.classList.add("deleteBtn");

        complete.type = "checkbox";
        complete.classList.add("custom-checkbox");
        complete.checked = Array[i].completed;

        complete.checked ? (li.style.backgroundColor = "#98FB98") : null;

        li.prepend(complete);
        li.append(del);
        ul.prepend(li);

        input.value = "";
        del.addEventListener("click", () => {
            delTodo(i);
        });
        complete.addEventListener("click", () => {
            checkToDo(i);
        });
    }
};

fetch("https://jsonplaceholder.typicode.com/todos")
    .then((resp) => resp.json())
    .then((data) => {
        for (const ar of data) {
            todoArray.push(ar);
        }
        todoRender(todoArray);
    });

const addTodo = (text) => {
    if (text === "") {
        alert("Необходимо ввести текст");
    } else {
        const newPost = {
            title: text,
            completed: false,
        };
        const paramsAdd = {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                "Content-type": "application/json",
            },
        };
        fetch("https://jsonplaceholder.typicode.com/todos", paramsAdd)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Добавлена задача");
            });
        todoArray.push(newPost);
    }
    todoRender(todoArray);
};

const delTodo = (i) => {
    const paramDel = {
        method: "DELETE",
    };
    fetch(`https://jsonplaceholder.typicode.com/todos/${i + 1}`, paramDel)
        .then((resp) => {
            console.log(`Пользователь с id ${i + 1} успешно удален`);
            console.log(resp.status);
        })
        .catch((err) => {
            console.log(err);
        });
    todoArray.splice(i, 1);
    todoRender(todoArray);
};

const checkToDo = (i) => {
    const newDo = todoArray.map((item, index) => {
        if (i === index) {
            item.completed = !item.completed;
            return item;
        }
        return item;
    });
    todoRender(newDo);
};

addButton.addEventListener("click", () => {
    addTodo(input.value);
    input.value = "";
});
