angular.module('ascrumApp')
    .run(function($rootScope, $cookieStore, $window){

        $rootScope.accountLogout = function(){

            $cookieStore.remove('myAccount');
            $window.location.href = '/';
        };
        $rootScope.isActive = function(loc){

            if($window.location.href.indexOf(loc) > -1){

                return true;
            }
            else{     
                
                return false;
            }
        };
    })
	.controller('UserAccountController', function($scope, $http, $window, $route, $cookieStore, UserAccountFactory){

        $scope.show = ''; // Modal popup display status
        $scope.myAccount = false; // User account status If true "user logged in" else "not logged in"

        $scope.user = '';

        // Callback to open the modal popup
        $scope.toggleOpen = function() {

            console.log("enter to toggle open");
            // $scope.show=!$scope.show;
            $scope.show = 'cstAscrumAngularModal';
        };

        // Callback to hide the modal popup
        $scope.cancelModal = function(){

            console.log("close");
            $scope.show = 'cstAscrumAngularModal';
            $window.location.href = "/";
        } ;

        //Call back for cookie getter
        function cookieVerify(){

            var data = $cookieStore.get('userAccount');
            if(data){

                if(data.status==201){
                
                    // $scope.admin = data.is_admin;
                    $scope.admin = data.user.is_admin;
                    console.log($scope.admin);   
                    $scope.myAccount = true;
                    //$scope.me = data.token; // logged in user name property "ME"
                    $scope.me = data.user.firstname + " " + data.user.lastname;
                }
            }
            else{

                $scope.admin = false; // Admin status if "true" user is "Admin" else user is "normal user"
                $scope.myAccount = false;
                $scope.me = '';
            }        
        }

        //To verify the user is logged in or not
        cookieVerify();

        //User Login callback
        $scope.signin = function(){
            
            UserAccountFactory.login($scope.user).then(function(data){

                $scope.admin = data.user.is_admin;
                if(data.status == 201 && data.user.is_admin === true){

                    $scope.show = '';
                    $scope.me = data.user.firstname + " " + data.user.lastname;
                    $scope.myAccount = true;
                    $cookieStore.put('userAccount', data);
                } 
                else if(data.status == 201 && data.user.is_admin == false) {

                    $scope.show = '';
                    $scope.me = data.user.firstname + " " + data.user.lastname;
                    $scope.myAccount = true;
                    $cookieStore.put('userAccount', data);                    
                }
                else{

                    console.log("Login failed, Please try again");
                    $scope.user = '';
                    $scope.ctsDangerAlert = true;
                } 
                $route.reload();                
            }, function(error){

                console.log(error);
            });
        };

        $scope.closeDangerAlert = function(){

            $scope.ctsDangerAlert = !$scope.ctsDangerAlert;
        };

        //User logout callback
        $scope.logout = function(){

            UserAccountFactory.logout().then(function(data){
                
                if(data.status == 201){

                    $cookieStore.remove('userAccount');
                    cookieVerify();
                    $window.location.href= "/";
                    console.log(data);  
                }
                else{

                    console.log("Please login, to be logged out from your account..");
                }

            }, function(error){

                console.log(error);
            });
        };		
	})
    .controller('ProjectListController', function($scope, $window, $rootScope, ManageProjectFactory, RestfulServices){

        console.log("I am in ProjectListController");
        $scope.project = '';
        // $scope.locationPath = 'locationPath';
        // console.log("Location path::::" + $window.location.href);
        // $rootScope.myUrlPath($window.location.href);
        // console.log($rootScope.myNavtab);
        $scope.noItemsLength = function(length){

            return RestfulServices.noItemsLength(length);
        };
        projectList();
        function projectList(){

            ManageProjectFactory.projectList().then(function(data){

                console.log(data);
                if(data.status == 201){

                    $scope.projects = data.projects;
                    if($rootScope.projectId){

                        $scope.projectId = $rootScope.projectId;
                        $rootScope.projectId = undefined;
                    }
                }
                else if(data.status == 403){

                    $scope.projects = '';
                    console.log("collecting projects got an exception,...");
                }
                else if(401){

                    console.log("I am accountlogout method");
                    $rootScope.accountLogout();
                }         
            }, function(error){

                console.log(error);
            });
        }

        $scope.saveProjectClose = function(){

            $scope.projectId = undefined;
        };
        
        
    })
    .controller('SaveProjectController', function($scope, $window, $rootScope, ManageProjectFactory, RestfulServices){

        $scope.admins = [];
        $scope.users = [];
        $scope.developers = [];
        $scope.project = {};
        var count = 0;
        $scope.userselection = true;  // users should be added in new project page 
        $scope.userArray = function(){

            console.log($scope.project.user);
            var myName = RestfulServices.splitEmail($scope.project.user);
            $scope.project.user = '';
            if($scope.developers.indexOf(myName)>=0){

                $scope.userExist = true;
            }
            else{

                $scope.developers.push(myName);
                $scope.userExist = false;
            }
            $scope.userselection = false;
        };
        $scope.saveProject = function(){

            var myName = RestfulServices.splitEmail($scope.project.owner);
            $scope.project.owner = myName;
            $scope.project.user = $scope.developers;
            console.log($scope.project);

            ManageProjectFactory.addProject($scope.project).then(function(data){

                console.log(data);
                if(data){

                    if(data.status == 201){

                        $scope.project = '';
                        $rootScope.projectId = data.id;
                        $window.location.href="#/admin/projects";
                    }
                    else if(data.status == 403){

                        console.log("Adding new project raised error, plese try again");
                    }
                    else{

                        $rootScope.accountLogout();
                    }
                }        
            }, function(error){

                console.log(error);
            });
        };

        function getUsersList(){

            console.log("I am collecting users list");
            ManageProjectFactory.getUsersList().then(function(data){

                console.log(data);
                if(data){

                    if(data.status == 201){

                        angular.forEach(data.users, function(users){

                            if(users.is_admin === true){

                                $scope.admins.push(users);
                            }
                            else{

                                $scope.users.push(users);
                            }
                        });
                    }
                    else if(data.status == 403){

                        console.log("Collecting users list from the database, raised an exception...");
                    }
                    else{

                        $rootScope.accountLogout();
                    }                       
                }        
            }, function(error){

                console.log(error);
            });
        }

        getUsersList();

    })
    .controller('MyProjectListController', function($scope, ManageProjectFactory, $rootScope, RestfulServices){

        console.log("I am in MyProjectListController");
        $scope.noItemsLength = function(length){

            return RestfulServices.noItemsLength(length);
        };
        ManageProjectFactory.myProjectList().then(function(data){

            if(data.status == 201){

                $scope.projectlist = data.projectlist;
            }
            else if(data.status == 403){

                console.log("Collecting list of projects frm the database got an exception..");
            }
            else{

                $rootScope.accountLogout();
            }            
        }, function(error){

            console.log(error);
        });
    })
    .controller('ViewSprintController', function($scope, $routeParams, $rootScope, ManageProjectFactory, RestfulServices){

        $scope.id = $routeParams.id;
        console.log($routeParams.id);
        console.log($rootScope.newSprintId);
        if($rootScope.newSprintId !== ''){

            $scope.newSprintId = $rootScope.newSprintId;
            $rootScope.newSprintId = undefined;
        }
        $scope.noItemsLength = function(length){

            return RestfulServices.noItemsLength(length);
        };
        $scope.removeSuccessSprint = function(){

            $scope.newSprintId = undefined;
        };
        function sprintsList(){

            ManageProjectFactory.sprintsList($scope.id).then(function(data){
                
                console.log(data);
                if(data.status == 201){

                    $scope.sprints = data.sprints;
                }
                else if(data.status == 403){

                    console.log("collecting list of sprints got an exception,,..");
                }
                else{

                    $rootScope.accountLogout();
                }                
            }, function(error){

                console.log(error);
            });
        }
        sprintsList();
    })
    .controller('NewSprintController', function($scope, $routeParams, $window, $rootScope, ManageProjectFactory){

        $scope.id = $routeParams.id;
        $scope.addSprint = function(id){

            $scope.sprint.project_id = id;
            console.log($scope.sprint);
            ManageProjectFactory.addSprint($scope.sprint).then(function(data){

                console.log("New sprint added successfully...");
                if(data.status==201){

                    console.log(data);
                    $scope.sprint = '';
                    $rootScope.newSprintId = data.sprint._id;
                    $window.location.href = '#/projects/'+$scope.id+'/sprints';
                }
                else if(data.status == 403){

                    console.log("Adding new sprint got an exception, please try again...");
                }
                else{
                    
                    $rootScope.accountLogout();
                }

            }, function(error){

                console.log(error);
            });
        };
    })
    .controller('ViewTaskController', function($scope, $routeParams, $rootScope, ManageProjectFactory, RestfulServices){

        $scope.project_id = $routeParams.projectId;
        $scope.sprint_id = $routeParams.sprintId;
        console.log($rootScope.newTaskId);
        if($rootScope.newTaskId!==''){

            $scope.newTaskId = $rootScope.newTaskId;
            $rootScope.newTaskId = undefined;
        }
        $scope.noItemsLength = function(length){

            return RestfulServices.noItemsLength(length);
        };
        $scope.removeNewTaskId = function(){

            $scope.newTaskId = undefined;
        }
        ManageProjectFactory.getTaskList($scope.project_id, $scope.sprint_id).then(function(data){

            if(data.status == 201){

                console.log(data);
                $scope.taskList = data.taskList;
            }
            else if(data.status == 403){

                console.log("Viewing task list got an exception,....");
            }
            else{

                $rootScope.accountLogout();
            }            
        }, function(error){

            console.log(error);
        });
    })
    .controller('NewTaskController', function($scope, $routeParams, $rootScope, $window, ManageProjectFactory){

        $scope.project_id = $routeParams.projectId;
        $scope.sprint_id = $routeParams.sprintId;
        function getProductBacklogList(){

            ManageProjectFactory.getProductBacklogList($scope.project_id).then(function(data){

                console.log(data);
                if(data.status == 201){

                    $scope.productbacklogList = data.productbacklogList;
                }
                else if(data.status == 403){

                    console.log("Adding new task got an exception, please try again,....");
                }
                else{
                    
                    $rootScope.accountLogout();
                }

            }, function(error){

                console.log(error);
            });
        }
        getProductBacklogList();    

        function getProjectTeamDevelopers(){

            ManageProjectFactory.getProjectTeamDevelopers($scope.project_id).then(function(data){

                if(data.status == 201){

                    console.log(data.users);
                    $scope.users = data.users;
                }
                else if(data.status == 403){

                    console.log("Colecting developers list failed");
                }
                else{
                
                    $rootScope.accountLogout();
                }                
            }, function(error){

                console.log(error);
            });
        }

        getProjectTeamDevelopers();
                       
        $scope.addNewTask = function(){

            $scope.newTask.project_id = $scope.project_id;
            $scope.newTask.sprint_id = $scope.sprint_id;
            ManageProjectFactory.addNewTask($scope.newTask).then(function(data){

                if(data.status == 201){

                    console.log(data);
                    $scope.newTask = '';
                    $rootScope.newTaskId = data.newTask._id;
                    $window.location.href = '#/projects/'+$routeParams.projectId+'/sprints/'+$routeParams.sprintId+'/tasks';
                }
                else if(data.status == 403){

                    console.log("Adding new task got an exception,...");
                }
                else{
                    
                    $rootScope.accountLogout();
                }                
            }, function(error){

                console.log(error);
            });
        };
    })
    .controller('ViewProductBacklogController', function($scope, $routeParams, ManageProjectFactory, RestfulServices){

        $scope.project_id = $routeParams.projectId;
        $scope.removeNewProductBacklog = function(){

            $scope.newProductBacklog = undefined;
        };
        
        $scope.noItemsLength = function(len){
        
            return RestfulServices.noItemsLength(len);
        }
        function getProductBacklogList(){

            ManageProjectFactory.getProductBacklogList($scope.project_id).then(function(data){

                console.log(data);
                if(data.status == 201){

                    $scope.productbacklogList = data.productbacklogList;
                }
                else if(data.status == 403){

                    console.log("colelcting productbacklog list failed");
                }
                else{

                    $rootScope.accountLogout();
                }                
            }, function(error){

                console.log(error);
            });
        }
        getProductBacklogList();
    })
    .controller('NewProductBacklogController', function($scope, $routeParams, $window,$rootScope, ManageProjectFactory){

        $scope.project_id = $routeParams.projectId;
        $scope.addProductBacklog = function(projectId){

            $scope.productbacklog.project_id = $routeParams.projectId;
            console.log($scope.productbacklog);
            ManageProjectFactory.addProductBacklog($scope.productbacklog).then(function(data){

                 if(data.status == 201){

                    console.log("Productbacklog added successfully");
                    $scope.productbacklog = '';     
                    $rootScope.newProductBacklog = data.newProductBacklog._id;
                    $window.location.href = '#/projects/'+ $routeParams.projectId +'/productbacklog'
                }
                else if(data.status == 403){

                    console.log("Adding new backlog got an exception,...");
                }
                else{

                    $rootScope.accountLogout();
                }
               
            }, function(error){

                console.log(error);
            });
        };
    })
    .controller('addNewUserController', function($scope, $route, $window, $rootScope, $http, AddUserFactory, RestfulServices){
        
         $scope.matchPassword = function(){

            $scope.visible = "";
             
             $scope.fpwd = $scope.newUser.password;
             $scope.spwd = $scope.password2;
             var fpassword = $scope.fpwd;
             var spassword = $scope.spwd;

             if(fpassword == spassword){
                 $scope.visible = false;
                 console.log($scope.visible);
             }
             else
             { 
                  $scope.visible = true;
                   console.log('"password didnt match');
             }
               
         };
        $scope.getUser = function(){
            
            console.log("im in add new user controller");
            $scope.noItemsLength = function(length){

                return RestfulServices.noItemsLength(length);
            };
            AddUserFactory.manageUsersList().then(function(data){

                if(data.status == 201){

                    $scope.userdata = data.users;
                    console.log($scope.userdata);   
                }
                else if(data.status == 403){

                    console.log("Collecting get user got an exception,...");
                }
                else{

                    //$rootScope.accountLogout();
                }                
            }, function(error){

                console.log(error);
            });
        };
        $scope.closeDangerAlert = function(){

            $scope.userExist = !$scope.userExist;
        }
        $scope.addNewUser = function(){

            console.log("im in add user controller");
            AddUserFactory.addNewUsers($scope.newUser).then(function(data){

                if(data.status == 201){

                    $scope.getUser();
                    console.log(data);
                    $scope.newUser = '';
                    $window.location.href="#/admin/users";                    
                }
                else if(data.status==403){

                    $scope.userExist = true;
                    $scope.newUser = '';
                    console.log("Adding new user got an exception,...");
                }
                else{

                    $rootScope.accountLogout();
                    console.log(data);
                }                
            }, function(error){

                console.log(error);
            });
        };
        $scope.remove = function(id){

            console.log(id);

            AddUserFactory.remove(id).then(function(data){

                $route.reload();  
            }, function(error){

                console.log(error);
            });
        }
        $scope.getUser();
    })
    .controller('CurrentProjectController', function($scope, $rootScope, CurrentProjectsFactory, RestfulServices){

        $scope.noItemsLength = function(length){

            return RestfulServices.noItemsLength(length);
        };
        CurrentProjectsFactory.getCurrentProjects().then(function(data){

            if(data.status == 201){

                $scope.projects = data.projects;
            }
            else{

                //$rootScope.accountLogout();
            }
        }, function(error){

            console.log(error);
        });
    });




	