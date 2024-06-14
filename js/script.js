const todoForm = document.querySelector('#form-todo');
const author = document.getElementById('author');
const post = document.getElementById('post');

const todoTitle = document.querySelector('todo__title');
const list = document.querySelector('.todo__list');



const base = {
	employee: 'Петров Сергей Иванович',
	//? Массив задач
	todo: getTodoLS(),
	//? Методы
	check(id) {
		for (let i = 0; i < base.todo.length; i++) {
			if (base.todo[i].id === id) {
				base.todo[i].ready = true;
			}
		}
	},

	addTodo(author, post) {
		//? Создаём объект с полученными данными
		const todo = {
			id: 'td' + Date.now(),
			author: author,
			post: post,
			ready: false,
		};
		//? Пушим его в массив объектов todo
		base.todo.push(todo);

		return todo;
	}
}

function todoCountChanger() {
	const todoCount = document.querySelector('.todo__count');
	todoCount.textContent = base.todo.length;
}

function addTodo(event) {
	event.preventDefault();

	const authorText = author.value;
	const postText = post.value;

	const objTodo = base.addTodo(authorText, postText);
	const todoLi = createTodo(objTodo);

	todoCountChanger();

	list.append(todoLi);
	setTodoLS();
	todoForm.reset();
}

function createTodo(objTodo) {
	const todoItem = `
	<article class="post ${objTodo.ready ? 'post_complete' : ''}">
		<h3 class="post__author">${objTodo.author}</h3>
		<p class="post__todo">${objTodo.post}</p>
		${!objTodo.ready ?
			`<button 
				class="post__ready" 
				type="button"
				data-id="${objTodo.id}"
				>✔</button>`
			: `<button 
				class="post__delete" 
				type="button"
				data-id="${objTodo.id}"
				>✗</button>`}
	</article>
`;

	const li = document.createElement('li');
	li.classList.add('todo__list-item');
	li.innerHTML = todoItem;

	return li;
}

function rednderTodo() {
	for (let i = 0; i < base.todo.length; i++) {
		const todoLi = createTodo(base.todo[i])
		list.append(todoLi);
	}
	todoCountChanger();
}

function clickTodo(event) {
	const btn = event.target.closest('.post__ready');
	// console.log(btn.className);
	if (btn && btn.className === 'post__ready') {
		checkTodo(btn);
	}
	else {
		const btn = event.target.closest('.post__delete');
		if (btn && btn.className === 'post__delete') {
			deleteTodo(btn);
		}
	}
}

function checkTodo(btn) {
	// Ищет заданный класс в предках
	// const btn = event.target.closest('.post__ready');
	// if (btn) {
	const post = btn.closest('.post');
	btn.innerHTML = `✗`;
	btn.className = 'post__delete';
	post.classList.add('post_complete');
	const id = btn.dataset.id;
	base.check(id);
	setTodoLS();
	// }
}

function deleteTodo(btn) {
	// const btn = event.target.closest('.post__delete');
	const id = btn.dataset.id;
	// console.log(id);
	// console.log(id);
	// console.log(id);
	// if (btn) {
	const post = btn.closest('.todo__list-item');
	const parent = post.parentNode;
	parent.removeChild(post);
	for (let i = 0; i < base.todo.length; i++) {
		const element = base.todo[i];
		if (element.id == id) {
			base.todo.splice(i, 1);
		}
	}
	// base.todo.pop
	todoCountChanger();
	setTodoLS();
	// }
}

function getTodoLS() {
	if (localStorage.getItem('todo')) {
		return JSON.parse(localStorage.getItem('todo'));
	}
	return [];
}
function setTodoLS() {
	localStorage.setItem('todo', JSON.stringify(base.todo));
}


rednderTodo();
//! Слушатель событий (этот ждет клик)
todoForm.addEventListener('submit', addTodo);
list.addEventListener('click', clickTodo);


