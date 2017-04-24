var db = require('../config/mongo-database-connect.js');

exports.projectList = function(req, res){

	var data = {};
	if(req.session_state.username){

		db.projectModel.find(function(err, success){

			if(success){

				data.status = 201;
				data.projects = success;
				res.json(data);
			}
			else{
				data.status = 403;
				res.json(data);
			}
		});		
	}
	else{

		console.log('user logged out');
		data.status = 401;
		res.json(data);
	}
};

exports.addProject = function(req, res){

	var data = {};
	if(req.session_state.username){  // Authorized users can access the database data

		console.log(req.body);
		var project_name = req.body.project_name;
		var description = req.body.description;
		var owner = req.body.owner;
		var role = req.body.role;
		var user = req.body.user;
		var project = new db.projectModel();
		project.project_name = project_name;
		project.description = description;
		project.owner = owner;
		project.role = role;
		project.user = user;

		project.save(function(err, success){

			if(err){

				console.log(err);
				data.status = 403;
				res.json(data);
			}	
			else{

				console.log("success");
				console.log(success);
				data.id = success._id;
				data.status = 201;
				res.json(data);
			}
		});		
	}
	else{

			data.status = 401;
			res.json(data);// Unauthorized users
	}
};

exports.myProjectList = function(req, res){

	var data = {};
	if(req.session_state.username){
		
		var username = req.session_state.username;
		console.log(username);
		db.projectModel.find(function(err, success){

			var myProject = [];
			if(success){

				db.userModel.findOne({'email':username}, function(err1, success1){

					if(success1.is_admin === true){
						
						console.log(success1);
						for(var i=0;i<success.length;i++){

							if(success[i]['owner'] === username){

								myProject.push(success[i]);
							}
						}
					}
					else{
						
						console.log("Normal user");
						console.log(success);

						for(var i=0;i<success.length;i++)
						{
				
							if(success[i]['user'].indexOf(username)>=0){

								myProject.push(success[i]);
							}
						}						
					}
					data.status = 201;
					data.projectlist = myProject;
					res.json(data);
				});
				
			}
			else{

				data.status = 403;
				res.json(data);
			}
		});		
	}
	else{

		data.status = 401;
		res.json(data);
	}
};

exports.addSprint = function(req, res){

	var data = {};
	if(req.session_state.username){

		console.log(req.body);
		var sprint_name = req.body.sprint_name;
		var capacity = parseInt(req.body.capacity, 10);
		var start_date = req.body.start_date;
		var end_date = req.body.end_date;
		var project_id = req.body.project_id;

		var mySprint = new db.sprintModel();

		mySprint.sprint_name = sprint_name;
		mySprint.capacity = capacity;
		mySprint.start_date = start_date;
		mySprint.end_date = end_date;
		mySprint.project_id = project_id;
		console.log(mySprint);
		mySprint.save(function(err, success){

			console.log(success);
			if(success){

				console.log(success);
				data.status = 201;
				data.sprint = success;
				res.json(data);
			}
			else{

				data.status = 403;
				res.json(data);
			}
		});
	}
	else{

		data.status = 401;	
		res.json(data);
	}
};

exports.sprintsList = function(req, res){

	var data = {};
	if(req.session_state.username){

		var project_id = req.params.id;
		console.log("A project with Id"+project_id+" Requested for sprints data");
		db.sprintModel.find({'project_id': project_id}, function(err, success){

			if(success){

				console.log(success);
				data.status = 201;
				data.sprints = success;
				res.json(data);
			}
			else{
				data.status = 403;
				res.json(data);
			}
		});
	}
	else{

		data.status = 401;
		res.json(data);
	}
};

exports.addProductBacklog = function(req, res){

	var data = {};
	if(req.session_state.username){

		var data = {};
		console.log(req.body);
		var productbacklog_name = req.body.productbacklog_name;
		var user_story = req.body.user_story;
		var priority = parseInt(req.body.priority);
		var estimation = parseInt(req.body.estimation);
		var project_id = req.body.project_id;

		var productbacklog = new db.productBacklogModel();
		productbacklog.productbacklog_name = productbacklog_name;
		productbacklog.user_story = user_story;
		productbacklog.priority = priority;
		productbacklog.estimation = estimation;
		productbacklog.project_id = project_id;
		
		productbacklog.save(function(err, success){

			if(success){

				console.log(success);
				data.status = 201;
				data.newProductBacklog = success;
				res.json(data);
			}
			else{

				data.status = 403;
				res.json(data);
			}
		});
	}
	else{

		data.status = 401;
		res.json(data);
	}
};

exports.getProductBacklogList = function(req, res){

	var data = {};
	if(req.session_state.username){

		console.log(req.params.projectId);
		db.productBacklogModel.find({'project_id': req.params.projectId}, function(err, success){

			if(success){

				data.status = 201;
				data.productbacklogList = success;
				res.json(data);
			}
			else{

				data.status = 403;
				res.json(data);
			}
		});
	}
	else{

		data.status = 401;
		res.json(data);
	}
};

exports.getProjectTeamDevelopers = function(req, res){

	console.log(" I am collecting developer team ");
	var data = {};
	if(req.session_state.username){

		db.projectModel.findOne({'_id': req.params.projectId}, function(err, success){

			console.log(success);
			if(success){

				data.status = 201;
				console.log(success);
				data.users = success.user;
				res.json(data);
			}
			else{

				data.status = 403;
				res.json(data);
			}
		});		
	}
	else{

		data.status = 401;
		res.json(data);
	}
}

exports.addNewTask = function(req, res){

	var data = {};
	if(req.session_state.username){

		var task_name = req.body.task_name;
		var productbacklog_name = req.body.productbacklog_name;
		var description = req.body.description;
		var estimation = parseInt(req.body.estimation);
		var remaining = parseInt(req.body.remaining);
		var state = req.body.state;
		var assigned_to = req.body.assigned_to;
		var project_id = req.body.project_id;
		var sprint_id = req.body.sprint_id;

		var task = new db.taskModel();
		task.task_name = task_name;
		task.productbacklog_name = productbacklog_name;
		task.description = description;
		task.estimation = estimation;
		task.remaining = remaining;
		task.state = state;
		task.assigned_to = assigned_to;
		task.project_id = project_id;
		task.sprint_id = sprint_id;

		task.save(function(err, success){

			if(success){

				data.status = 201;
				data.newTask = success;
				res.json(data);
			}
			else{

				data.status = 403;
				res.json(data);
			}
		});
	}
	else{

		data.status = 401;
		res.json(data);
	}
}

exports.getTaskList = function(req, res){

	var data = {};
	if(req.session_state.username){

		var projectId = req.params.projectId;
		var sprintId = req.params.sprintId;

		db.taskModel.find({'project_id': projectId, 'sprint_id': sprintId}, function(err, success){

			if(success){

				data.status =  201;
				data.taskList = success;
				res.json(data);
			}
			else{

				data.status = 403;
				res.json(data);
			}
		});
	}
	else{

		data.status = 401;
		res.json(data);
	}
};

exports.getCurrentProjects = function(req, res){

	var data = {};
	if(req.session_state.username){

        console.log(req.session_state.username);
        var email = req.session_state.username;
        /*cheking for user is admin or not
         *if the user is admin fetch fetch all this project sort by latest project 
         *and limit the list by one
         */
        db.userModel.findOne({email: email,is_admin: true}, function (err, success) {

	    	if(success){

	    		console.log('user is a admin');
				db.projectModel.find({},{'user':0},function(err, result){

					console.log(result);
					data.status = 201;
					data.projects = result;
					res.json(data);
				}).sort({_id:-1}).limit(1);	
			}
			else{

				console.log('user is  not a admin');
				db.projectModel.find({user:email},{'user':0},function(err, result){

					console.log(result);
					data.status = 201;
					data.projects = result;
					res.json(data);
				}).sort({_id:-1}).limit(1);	
			}
  		});	
	}
	else{

		data.status = 401;
		res.json(data);
	}
};
