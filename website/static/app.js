//const todoInput = document.querySelector('.todo-input')
//const todoBtn = document.querySelector('.todo-btn')
//const todoList = document.querySelector('.todo-list')
const alert = document.querySelector('.alert')
const dismissAlert = document.querySelector('.close-alert')

    dismissAlert.addEventListener('click', function(){
        alert.classList.add('d-none')
    })
//    todoBtn.addEventListener('click', addTodo)
//    todoList.addEventListener('click', deleteCheck)
//
//    function addTodo(event) {
//        event.preventDefault()
//
//        // create div
//        const todoDiv = document.createElement('div')
//        todoDiv.classList.add('todo')
//        // create li
//        const newTodo = document.createElement('li')
//        newTodo.innerText = todoInput.value
//        newTodo.classList.add('todo-item')
//        todoDiv.appendChild(newTodo)
//
//        const completedBtn = document.createElement('button')
//        completedBtn.classList.add('completed-btn')
//        completedBtn.innerHTML = '&check;'
//        todoDiv.appendChild(completedBtn)
//
//        const deleteBtn = document.createElement('button')
//        deleteBtn.classList.add('delete-btn')
//        deleteBtn.innerHTML = '&times;'
//        todoDiv.appendChild(deleteBtn)
//
//        todoList.appendChild(todoDiv)
//
//        todoInput.value = ''
//    }
//    function deleteCheck(e) {
//        const item = e.target
//        if(item.classList[0] === 'delete-btn'){
//            const todo = item.parentElement
//            todo.classList.add('fall')
//            todo.addEventListener('transitionend', function() {
//                todo.remove()
//            })
//        }
//        if(item.classList[0] === 'completed-btn'){
//            const todo = item.parentElement
//            todo.classList.toggle('completed')
//        }
//    }
    function deleteNote(noteId){
        fetch ('/delete-note',{
        method: 'POST',
        body: JSON.stringify({ noteId: noteId })
        }).then((_res) => {
            window.location.href = '/'
        })
    }
    // DOMContentLoaded and event of after the page has loaded