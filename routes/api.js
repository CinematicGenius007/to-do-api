var express = require('express');
const app = require('../app');
const utilities = require('../utilities/authenticationMiddlewares');
const db = require('../database/handler');
var router = express.Router();

/* get api for authenticated users */
router.get('/tasks', function(req, res, _next) {
    utilities.verifyToken(req.headers.authorization.split(' ')[1])
        .then((decoded) => {
            db.getTasks(decoded.id)
                .then((results) => {
                    res.status(200).send(results);
                })
                .catch((err) => {
                    res.status(500).send('Error getting tasks');
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(401).send('Unauthorized');
        });
});

router.post('/tasks/create', function(req, res, _next) {
    utilities.verifyToken(req.headers.authorization.split(' ')[1])
        .then((decoded) => {
            db.addTask(req.body, decoded.id)
                .then((_results) => {
                    res.status(201).send('Task created');
                })
                .catch((_err) => {
                    console.log(_err);
                    res.status(500).send('Error creating task');
                });
        })
        .catch((_err) => {
            res.status(401).send('Unauthorized');
        });
    
});

router.put('/tasks/update', function(req, res, _next) {
    utilities.verifyToken(req.headers.authorization.split(' ')[1])
        .then((decoded) => {
            db.updateTask(req.body, decoded.id)
                .then((_results) => {
                    res.status(200).send('Task updated');
                })
                .catch((err) => {
                    res.status(500).send('Error updating task');
                });
        })
        .catch((err) => {
            res.status(401).send('Unauthorized');
        });
});

router.post('/tasks/updateStatus', function(req, res, _next) {
    utilities.verifyToken(req.headers.authorization.split(' ')[1])
        .then((decoded) => {
            db.changeStatusOfTask(req.body.task_id, decoded.id)
                .then((_results) => {
                    res.status(200).send('Task status updated');
                })
                .catch((err) => {
                    res.status(500).send('Error updating task status');
                });
        })
        .catch((err) => {
            res.status(401).send('Unauthorized');
        });
});

router.delete('/tasks/delete', function(req, res, _next) {
    utilities.verifyToken(req.headers.authorization.split(' ')[1])
        .then((decoded) => {
            db.deleteTask(req.body.task_id, decoded.id)
                .then((_results) => {
                    res.status(200).send('Task deleted');
                })
                .catch((err) => {
                    res.status(500).send('Error deleting task');
                });
        })
        .catch((err) => {
            res.status(401).send('Unauthorized');
        });
});

module.exports = router;
