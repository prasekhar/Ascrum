angular.module('ascrumApp')
	.factory('UserAccountFactory', function($http, $q){

		var factory = {};
		factory.login = function(user){

			return $http.post('/login', user)
						.then(function(response){

							console.log('data arrived to factory');
	                        if(typeof response.data === 'object'){

	                            return response.data;
	                        } else {

	                            // Invalid response
	                            return $q.reject(response.data);
	                        }
	                    },  function(response){
	                        
		                        // Something went wrong sending request
		                        return $q.reject(response.data);
	                	});
		};
		factory.logout = function(){

			return $http.get('/logout').then(function(response){

				console.log("Data arrived to the factory,..");
				if(typeof response.data === 'object'){

					return response.data;
				} else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		};
		factory.register = function(user){

			return $http.post('/register', user);
		};
		return factory;
	})
	.factory('ManageProjectFactory', function($http, $q){

		var factory = {};
		factory.projectList = function(){

			return $http.get('/projectlist').then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		};
		factory.addProject = function(project){

			return $http.post('/addproject', project).then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		}
		factory.getUsersList = function(){

			return $http.get('/getUsersList').then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return response.data;
			});
		};
		factory.myProjectList = function(){

			return $http.get('/myProjectList').then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		};
		factory.sprintsList = function(id){

			return $http.get('/sprintsList/' + id).then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		};
		factory.addSprint = function(sprint){

			return $http.post('/addSprint', sprint).then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		};
		factory.addProductBacklog = function(productbacklog){

			return $http.post('/addProductBacklog', productbacklog).then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		};
		factory.getProductBacklogList = function(projectId){

			return $http.get('/getProductBacklogList/' + projectId).then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		};
		factory.getProjectTeamDevelopers = function(projectId){

			return $http.get('/getProjectTeamDevelopers/' + projectId).then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		};
		factory.addNewTask = function(newTask){

			return $http.post('/addNewTask', newTask).then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		};
		factory.getTaskList = function(projectId, sprintId){

			return $http.get('/getTaskList/'+ projectId +"/"+sprintId).then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		};
		return factory;		
	})
	.factory('AddUserFactory', function($http, $q){

		var factory = {};
		factory.addNewUsers = function(newUser){

			console.log(newUser.firstname);
			console.log("im in new user Factory");
			return $http.post('/register',newUser).then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		};
		factory.manageUsersList = function(){

			return $http.get('/manageUsersList').then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return response.data;
			});
		};		
		factory.remove = function(id){

			console.log('Hurry! You placed a delete request');
			return $http.delete('/removeUser/'+id).then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		};
		return factory;
	})
	.factory('CurrentProjectsFactory', function($http, $q){

		var factory = {};
		factory.getCurrentProjects = function(){

			return $http.get('/currentproject').then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		};
		return factory;
	});