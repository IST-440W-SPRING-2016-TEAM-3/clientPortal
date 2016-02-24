(function(angular, undefined){
	angular.module("clientportal", [])

	.controller("main", ['$scope', '$http', function($scope, $http){
		$scope.getLocation = function(){
			return document.cookie;
		};

		// $scope.userdata = {};
		// $http({
		// 	method: 'GET',
		// 	url: 'http://127.0.0.1:8000/api/users',
		// 	headers: {'Content-Type': 'application/json'}
		// })
		// .then(function successCallback(response) {
		// 	$scope.data = response.data[0];
		// }, function errorCallback(response) {
		// });
	}])

	;
})(angular);
