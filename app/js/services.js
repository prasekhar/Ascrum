angular.module('ascrumApp').service('RestfulServices', function(){

	// No Items Found module for Every list displaying
	this.noItemsLength = function(length){

		if(length<=0){
			return true;
		}
		else{
			return false;
		}
	};

	this.splitEmail = function(text){

        var splitter = text.split('\(');
        var myName = splitter[1].slice(0,(splitter[1].length)-2);
        return myName;		
	};
});