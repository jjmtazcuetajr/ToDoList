const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = express.Router();


const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const Todo = require('./schema/task');
app.use(cors());


const mongoURI = 'mmongodb://localhost/taskdb';
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: false});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Congratulations! Your mongo db connection is successful!');
});

//routes
routes.route('/').get(function(req, res){
  Todo.find(function(err, todos){
    if(err){
      console.log(err);
    }
    else{
      res.json(todos);
    }
  });
});

routes.route('/add').post(function(req, res){
  let todo = new Todo(req.body);
  todo.save()
    .then(todo => {
      res.status(200).json({'todo': 'added'});
    })
    .catch(err => {
      res.status(400).send('failed adding task')
    });
})

routes.route('/delete').delete(function(req, res){
  Todo.deleteOne(req.params._id, function(err){
    if(err){
      res.status(500).send({error: 'Could not delete'});
    }
    else{
      res.status(200).send({message: "Task deleted"});
    }
  })
})

routes.route('/update').post(function(req, res){
  Todo.findById(req.body._id, function(err, todo){
    if(!todo){
      res.status(400).send('id not found');
    }
    else{
      todo.status = req.body.status;

      todo.save()
        .then(todo => {
          res.json('update successful')
        })
        .catch(err => {
          res.status(400).send('update unsuccessful')
        });
    }
  })
})


app.use('/todos', routes);

//PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Listening to port' + PORT);
});