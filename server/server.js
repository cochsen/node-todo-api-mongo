var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/_id/1234321
app.get('/todos/:id', (req, res) => {
    // res.send(req.params);
    var id = req.params.id;

    // Valid id using isValid
        // 404 - send back empty {}
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    // findById
        // success
            // if todo - send back 200 with todo
            // if not todo - send back 404 with empty body      
    Todo.findById(id)  
        .then((todo) => {
            if (!todo) {
                return res.status(404).send('Todo not found');
            }

            res.status(200).send({todo});
        // error
            // 400 - and send empty body back            
        }).catch((e) => {
            res.status(400).send();
        });
});

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};
// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo');
// });

// var myTodo = new Todo({
//     text: 'Grill steak'
// });

// myTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo');
// });

// User model
// email - required, trimmed, type: String, minlength: 1

// Create a user with/without email
// var su = new User({
//     email: null
// });

// var user = new User({
//     email: 'cochsen@lycos.com'
// });

// su.save().then((rec) => {
//     console.log('Saved user', rec);
// }, (e) => {
//     console.log('Unable to save user: ', e);
// });

// user.save().then((rec) => {
//     console.log('Saved user', rec);
// }, (e) => {
//     console.log('Unable to save user: ', e);
// });