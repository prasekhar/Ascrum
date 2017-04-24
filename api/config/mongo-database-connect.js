var mongoose = require('mongoose');
var mongodbURL = 'mongodb://localhost/ascrum';
var mongodbOptions = {};

// MongoDB connection
mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {

    if(err){ 

        console.log('Connection refused to ' + mongodbURL);
        console.log(err);
    }else{

        console.log('Connection successful to: ' + mongodbURL);
    }
});

// Instantiate Schema 
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
// User schema
var User = new Schema({
    email: { type: String, unique: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false }
});   

var Project = new Schema({
    project_name: { type: String, unique: true, required: true },
    description: { type: String},
    owner: { type: String, required: true },
    role:{ type:String, required: true },
    user: { type: Array }
});

var Sprint = new Schema({
    sprint_name: {type: String, required: true},
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    capacity: { type:Number,required: true },
    project_id: { type: ObjectId, required: true }
});

var ProductBacklog = new Schema({
    productbacklog_name:{ type:String, required: true},
    user_story: { type:String, required: true },
    priority: {type: Number, required: true },
    estimation: { type: Number, required: true },
    project_id: { type: ObjectId, required: true }
});

var Task = new Schema({
    task_name: { type: String, required: true },
    productbacklog_name: { type: String, required: true },
    description: { type: String, required: true },
    estimation: { type: Number, required: true },
    remaining: { type: Number, required: true },
    state: { type: String, required: true },
    assigned_to: { type: String, required: true },
    project_id: { type: ObjectId, required: true },
    sprint_id: { type: ObjectId, required: true }
});

// Define Models
var userModel = mongoose.model('User', User);
var projectModel = mongoose.model('Project', Project);
var sprintModel = mongoose.model('Sprint', Sprint);
var productBacklogModel = mongoose.model('ProductBacklog', ProductBacklog);
var taskModel = mongoose.model('Task', Task);

// Export Models
exports.userModel = userModel;
exports.projectModel = projectModel;
exports.sprintModel = sprintModel;
exports.productBacklogModel = productBacklogModel;
exports.taskModel = taskModel;