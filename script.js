document.addEventListener("DOMContentLoaded", function() {
    var todo = Object.create(null);

    todo.newTodo = function(evt) {
        evt.preventDefault();
        var newTodo = document.getElementById("todo-item").value;
        var ul = document.getElementById("todo-view");
        var li = document.createElement("li");
        li.innerHTML = newTodo + '<span>x</span>';

        //using tertnary operator to add items to top of list if other items already exist
        (ul.childElementCount == 0) ? ul.appendChild(li): ul.insertBefore(li, ul.firstChild);

        document.getElementById('todo-item').value = "";

        var span = li.getElementsByTagName("span");

        span[0].addEventListener("click", todo.deleteTodo, false);
    }

    var todoCache = [];

    todo.deleteTodo = function() {
        todoCache.push(this.parentNode);

        this.parentNode.parentNode.removeChild(this.parentNode);

        return todoCache;
    }

    todo.undoDelete = function() {
        var ul = document.getElementById("todo-view");

        if (todoCache.length > 0) {
            var lastTodo = todoCache.length - 1;

            ul.appendChild(todoCache[lastTodo]);

            todoCache.pop();
        }
    }

    var todoSub = document.getElementById("submit-item");

    todoSub.addEventListener("click", todo.newTodo, false);

    var undo = document.getElementById('undo');

    undo.addEventListener("click", todo.undoDelete, false);
});