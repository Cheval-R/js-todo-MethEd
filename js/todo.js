export const todo = () => {
	const todoForm = document.querySelector('#form-todo');
	const author = document.getElementById('author');
	const post = document.getElementById('post');

	const todoTitle = document.querySelector('todo__title');
	const list = document.querySelector('.todo__list');



	const base = {
		init() {
			this.todo = this.getTodoLS();
		},
		employee: 'Петров Сергей Иванович',
		//? Массив задач
		todo: [],
		//? Методы
		check(id) {
			for (let i = 0; i < this.todo.length; i++) {
				if (this.todo[i].id === id) {
					this.todo[i].ready = true;
				}
			}
			this.setTodoLS();
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
			this.todo.push(todo);
			this.setTodoLS();
			return todo;
		},

		getTodoLS() {
			if (localStorage.getItem('todo')) {
				return JSON.parse(localStorage.getItem('todo'));
			}
			return [];
		},

		setTodoLS() {
			localStorage.setItem('todo', JSON.stringify(this.todo));
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
		base.init();
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
		const post = btn.closest('.post');
		btn.innerHTML = `✗`;
		btn.className = 'post__delete';
		post.classList.add('post_complete');
		const id = btn.dataset.id;
		base.check(id);
	}

	function deleteTodo(btn) {
		const id = btn.dataset.id;

		const post = btn.closest('.todo__list-item');
		const parent = post.parentNode;
		parent.removeChild(post);

		for (let i = 0; i < base.todo.length; i++) {
			const element = base.todo[i];
			if (element.id == id) {
				base.todo.splice(i, 1);
			}
		}
		todoCountChanger();
		base.setTodoLS();
	}

	//! Слушатель событий (этот ждет клик)
	todoForm.addEventListener('submit', addTodo);
	list.addEventListener('click', clickTodo);

	rednderTodo();


}