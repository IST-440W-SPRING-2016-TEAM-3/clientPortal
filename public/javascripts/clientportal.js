(function(angular, undefined){
	angular.module("clientportal", [])

	.controller("main", ['$scope', '$location', '$http', function($scope, $location, $http){
		$scope.getLocation = function(){
			return document.cookie;
		};
		$http({
			method: 'GET',
			url: 'http://127.0.0.1:8000/api/users',
			headers: {'Content-Type': 'application/json'}
		})
		.then(function successCallback(response) {
			$scope.data = response.data[0];
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}])

	;
})(angular);
