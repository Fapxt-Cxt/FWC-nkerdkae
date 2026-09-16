window.onload = function () {
    const ftList = document.getElementById('ft_list');
    const newBtn = document.getElementById('new_btn');

    loadTodos();

    newBtn.addEventListener('click', function () {
        const todoText = prompt('Enter a new TO DO:');

        if (todoText && todoText.trim() !== '') {
            addTodo(todoText.trim());
            saveTodos();
        }
    });

    function addTodo(text) {
        const todoDiv = document.createElement('div');
        todoDiv.textContent = text;

        todoDiv.addEventListener('click', function () {
            if (confirm('Do you want to remove this to-do item?')) {
                todoDiv.remove();
                saveTodos();
            }
        });

        ftList.insertBefore(todoDiv, ftList.firstChild);
    }

    function saveTodos() {
        const todos = [];
        const items = ftList.children;
        
        for (let i = 0; i < items.length; i++) {
            todos.push(items[i].textContent);
        }
 
        const encodedData = encodeURIComponent(JSON.stringify(todos));
        document.cookie = "ft_todo=" + encodedData + "; path=/; max-age=" + (7 * 24 * 60 * 60);
    }

    function loadTodos() {
        const cookies = document.cookie.split(';');
        let todoCookie = "";

        for (let c of cookies) {
            c = c.trim();
            if (c.startsWith("ft_todo=")) {
                todoCookie = c.substring("ft_todo=".length);
                break;
            }
        }

        if (todoCookie) {
            try {
                const todos = JSON.parse(decodeURIComponent(todoCookie));
                if (Array.isArray(todos)) {
                    for (let i=todos.length - 1; i>=0; i--) {
                        addTodo(text);
                    };
                }
            } catch (e) {
                console.error("Error parsing todo cookie:", e);
            }
        }
    }
};