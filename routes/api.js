var express = require('express');
const app = require('../app');
const db = require('../database/handler');
var router = express.Router();

/* get api for authenticated users */
router.get('/tasks', function(_req, res, _next) {
    db.getTasksForUser()
        .then((results) => {
            res.status(200).send(results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error getting tasks');
        });
});

router.post('/tasks/create', function(req, res, _next) {
    console.log(req.body);
    db.addTaskForUser(req.body)
        .then((_results) => {
            res.status(201).send('Task created');
        })
        .catch((err) => {
            res.status(500).send('Error creating task');
        });
});

router.put('/tasks/update', function(req, res, _next) {
    db.updateTaskForUser(req.body)
        .then((_results) => {
            res.status(200).send('Task updated');
        })
        .catch((err) => {
            res.status(500).send('Error updating task');
        });
});

router.post('/tasks/updateStatus', function(req, res, _next) {
    db.changeStatusOfTaskForUser(req.body.task_id, req.body.status)
        .then((_results) => {
            res.status(200).send('Task status updated');
        })
        .catch((err) => {
            res.status(500).send('Error updating task status');
        });
});

router.delete('/tasks/delete', function(req, res, _next) {
    console.log(req.body);
    db.deleteTaskForUser(req.body.task_id)
        .then((_results) => {
            console.log(_results);
            res.status(200).send('Task deleted');
        })
        .catch((err) => {
            res.status(500).send('Error deleting task');
        });
});

module.exports = router;
