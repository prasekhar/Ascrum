// Loading external modules
var express = require('express');
var bodyParser = require('body-parser');
var clientSessions = require("client-sessions");

// Instantiate express server
var app = express();

// Using modules for app
app.use(express.static('../app')); // Loading static files 
app.use(bodyParser.json()); // Body parser to get the data from ajax calls & form data
app.use(bodyParser.urlencoded()); // Body parser to get the URL GET method data
app.use(clientSessions({

	secret: '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXK' // Secret Key
}));

// Routes to define the call backs
var routes = {};
routes.users = require('./route/users.js');
routes.database = require('./config/mongo-database-connect.js');
routes.projects = require('./route/projects.js');

// Restful API to get the home page
app.get('/', function(req, res){

	res.sendfile('/app/index.html');
});

// Restfull API to login
app.post('/login', routes.users.login);

// Restful API for user registration
app.post('/register', routes.users.register);

// Restfull API to logout the user
app.get('/logout', routes.users.logout);

// Restfull API to get the list of projects
app.get('/projectlist', routes.projects.projectList);

// Restful API to add New Project into the DB
app.post('/addproject', routes.projects.addProject);

// Restful API to get the Users list for Project purpose
app.get('/getUsersList', routes.users.getUsersList);

// Restful API to get the Users list for Project purpose
app.get('/manageUsersList', routes.users.manageUsersList);

// User ProjectLsit 
app.get('/myProjectList', routes.projects.myProjectList);

// Collect all the sprints list for Particular Project Id
app.get('/sprintsList/:id', routes.projects.sprintsList);

// Adding new sprint for Project
app.post('/addSprint', routes.projects.addSprint);

// Adding new product Backlog for Particular project
app.post('/addProductBacklog', routes.projects.addProductBacklog);

// Collect all the product backlogs for project based on ProjectId
app.get('/getProductBacklogList/:projectId', routes.projects.getProductBacklogList);

// Collecting project developer team
app.get('/getProjectTeamDevelopers/:projectId', routes.projects.getProjectTeamDevelopers);

// Adding new Task to the projects
app.post('/addNewTask', routes.projects.addNewTask);

// Collecting task list for project based on projectId and sprintId
app.get('/getTaskList/:projectId/:sprintId', routes.projects.getTaskList);

// Get the curent project info
app.get('/currentproject', routes.projects.getCurrentProjects);

//remove User
app.delete('/removeUser/:id',routes.users.removeUser);

//Server listening port
app.listen(3000);

console.log("Server is running on 3000 port number");