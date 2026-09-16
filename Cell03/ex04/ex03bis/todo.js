$(document).ready(function() {
    const $ftList = $('#ft_list');
    const $newBtn = $('#new_btn');

    loadTodos();

    $newBtn.click(function() {
        const todoText = prompt('Enter a new TO DO:');

        if (todoText && todoText.trim() !== '') {
            addTodo(todoText.trim());
            saveTodos();
        }
    });

    function addTodo(text) {
        const $todoDiv = $('<div></div>').text(text);

        $todoDiv.click(function() {
            if (confirm('Do you want to remove this to-do item?')) {
                $(this).remove();
                saveTodos();
            }
        });

        $ftList.prepend($todoDiv);
    }

    function saveTodos() {
        const todos = [];
        $ftList.children().each(function() {
            todos.push($(this).text());
        });
 
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
                        addTodo(todos[i]);
                    }
                }
            } catch (e) {
                console.error("Error parsing todo cookie:", e);
            }
        }
    }
});