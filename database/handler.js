const connection = require('./connection');

const db = {
    getUser: function(username) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE email = ?', username, (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    createUser: function(name, email, password) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    deleteUser: function(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM users WHERE id = ?', id, (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    getTasks: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tasks WHERE user_id = ?', id, (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    addTask: (task, id) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO tasks (title, time_created, user_id) VALUES (?, ?, ?)', [task.title, task.time_created, id], (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    updateTask: (task, id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE tasks SET title = ? WHERE task_id = ? AND user_id = ?', [task.title, task.task_id, id], (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    deleteTask: (task_id, id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM tasks WHERE task_id = ? AND user_id = ?', [task_id, id], (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    changeStatusOfTask: (task_id, id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE tasks SET status = not status WHERE task_id = ? AND user_id = ?', [task_id, id], (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
};

module.exports = db;


/*
getTodosByUser: function(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM todos WHERE user_id = ?', id, (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    addTodoByUser: function(todo) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO todos SET ?', todo, (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    deleteTodoByUser: function(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM todos WHERE id = ?', id, (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    updateTodoByUser: function(id, todo) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE todos SET ? WHERE id = ?', [todo, id], (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    }

getTodos: function() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM todos', (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    addTodo: function(todo) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO todos SET ?', todo, (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    deleteTodo: function(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM todos WHERE id = ?', id, (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    updateTodo: function(id, todo) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE todos SET ? WHERE id = ?', [todo, id], (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    getTodo: function(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM todos WHERE id = ?', id, (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
*/