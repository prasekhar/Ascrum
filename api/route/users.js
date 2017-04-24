var db = require('../config/mongo-database-connect.js');

exports.register = function(req, res){

	var data = {};
	if(req.session_state.username){
		
		var firstname = req.body.firstname;
		var lastname = req.body.lastname;
		var email = req.body.email;
		var password = req.body.password;
		var is_admin = req.body.is_admin || '';
		
		var user = new db.userModel();
		user.firstname = firstname;
		user.lastname = lastname;
		user.password = password;
		user.email = email;
		user.is_admin = is_admin;

		user.save(function(err, success){

			if(success){

				console.log(success);
				data.status = 201;
				data.user = success;
				res.json(data);
			}	
			else{

				console.log("failure");
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

exports.login = function(req, res){

	console.log("I am login authentication page");
	var email = req.body.email;
	var password = req.body.password;
	var data = {};
	console.log(req.body);
	db.userModel.findOne({email: email, password: password}, function(err, success){

		if(success){

			console.log(success);
			req.session_state.username = success.email;
			data.status = 201;
			success.password = undefined;
			data.user = success;
			res.json(data);
		}
		else{

			data.user = {};
			data.user.is_admin = false;
			data.status = 403;
			res.json(data);
		}
	});
};

exports.logout = function(req, res){

	var data = {};
	if(req.session_state.username){

		console.log(req.session_state.username);
		req.session_state.reset();
		data.status = 201;
		res.json(data);		
	}
	else{

		data.status = 401;
		res.json(data);
	}
};

exports.getUsersList = function(req, res){

	var data = {};

	if(req.session_state.username){
		
		var email = req.session_state.username;
		db.userModel.find(function(err, success){

			if(success){

				for(var i in success){

					success[i]['password']=undefined; // Delete password from the success - we should not send password to the front end
				}
				data.users = success;
				data.status = 201;
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

exports.manageUsersList = function(req, res){

	var data = {};

	if(req.session_state.username){
		
		var email = req.session_state.username;
		console.log("I am in manageUsersList");
		db.userModel.find({email:{$ne:email}},function(err, success){

			if(success){

				for(var i in success){

					success[i]['password']=undefined; // Delete password from the success - we should not send password to the front end
				}
				data.users = success;
				data.status = 201;
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

exports.removeUser = function(req, res){

	var id = req.params.id;
	var userEmail;
	console.log(id);
	var data  = {};
	if(req.session_state.username){

		db.userModel.findOne({_id: id}, function (err, result) {

			if (err) {

				data.status = 403;
				res.json(data);
			}
			if(result){
		    	
		    	console.log(result.email);
		    	userEmail = result.email;
				db.userModel.remove({_id: id}, function (err, result) {

					if (err) {
						
						data.status = 403;
						res.json(data);
					}
					else{
			            
			            console.log('I am going to move a element in an array');
			            console.log(userEmail);
						db.projectModel.update({user:userEmail},{$pull:{user:userEmail}},{multi:true},function (error, success){

							if(success){
		
								data.status = 201;
								data.result = success;
								res.json(data);				
							}
							else{

								data.status = 403;
								res.json(data);
							}
						})
						console.log('I removed a element in the array');
					}
				});
			}
		});		
	}
	else{

		data.status = 401;
		res.json(data);
	}
};