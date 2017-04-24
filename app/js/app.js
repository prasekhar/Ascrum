var ascrumApp = angular.module('ascrumApp', ['ngRoute', 'ngCookies']);

ascrumApp.config(function($routeProvider){

    $routeProvider
	    .when('/projectinfo', {
	    	controller: 'CurrentProjectController',
	        templateUrl: 'partials/projectInfo.html'
	    })   
	    .when('/admin', {
	    	templateUrl: 'partials/admin.html'
	    })
	    .when('/admin/projects', {
	    	controller: 'ProjectListController',
	        templateUrl: 'partials/manageproject.html'
	    }) 
	    .when('/admin/users', {
	    	controller: 'addNewUserController',
	        templateUrl: 'partials/manageusers.html'
	    })
	    .when('/admin/projects/new', {
	    	controller: 'SaveProjectController',
	        templateUrl: 'partials/newproject.html'
	    })
	    .when('/projects/:projectId/productbacklog', {
	    	controller: 'ViewProductBacklogController',
	        templateUrl: 'partials/productbacklogdesc.html'
	    })
	    .when('/projects/:projectId/productbacklog/new', {
	    	controller: 'NewProductBacklogController',
	        templateUrl: 'partials/productbacklog.html'
	    })	    
	    .when('/admin/users/new', {
	        templateUrl: 'partials/newuser.html'
	    })
	    .when('/projects/:id/sprints', {
	    	controller: 'ViewSprintController',
	        templateUrl: 'partials/viewsprint.html'
	    })
        .when('/projects/:id/sprints/new', {
        	controller: 'NewSprintController',
	        templateUrl: 'partials/newsprint.html'
	    })	    
	    .when('/projects/:projectId/sprints/:sprintId/tasks', {
	    	controller: 'ViewTaskController',
	    	templateUrl: 'partials/taskdesc.html'
	    })
	    .when('/projects/:projectId/sprints/:sprintId/tasks/new', {
	    	controller: 'NewTaskController',
	    	templateUrl: 'partials/newtask.html'
	    })
	    .when('/projects', {
	    	controller: 'MyProjectListController',
	        templateUrl: 'partials/myprojects.html'
	    })
	    .when('/error', {
	    	templateUrl: '/partials/error.html'
	    });
});