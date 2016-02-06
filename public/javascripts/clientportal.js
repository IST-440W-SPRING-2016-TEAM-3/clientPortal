(function(angular, undefined){
	angular.module("clientportal", [])

	.controller("main", ['$scope', '$location', function($scope, $location){
		$scope.getLocation = function(){
			return document.cookie;
		};
	}])

	;
})(angular);
