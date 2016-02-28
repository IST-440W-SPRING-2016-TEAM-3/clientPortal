(function(angular, undefined) {
	
	function sortArrOfObjectsByParam(arrToSort , strObjParamToSortBy, sortAscending) {
		if (sortAscending === undefined) sortAscending = true;

		if (sortAscending) {
			arrToSort.sort(function(a, b) {
				return a[strObjParamToSortBy] > b[strObjParamToSortBy];
			});
		} else {
			arrToSort.sort(function(a, b) {
				return a[strObjParamToSortBy] < b[strObjParamToSortBy];
			});
		}
	}

	angular.module("clientportal", [])

	.controller("main", ['$scope', '$http', function($scope, $http) {
		$scope.getLocation = function() {
			return document.cookie;
		};

		$http({
				method: 'GET',
				url: 'http://127.0.0.1:8000/api/appointments',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(function successCallback(response) {
				//Keys to ignore when generating HTML for grid
				var ignore = {
					"_id": "_id",
					"__v": "__v",
					"uuid": "uuid",
				};

				var userAppointments = [];
				userAppointments = response.data;

				sortArrOfObjectsByParam(userAppointments, "date", false);

				$scope.userAppointments = [];

				// Extracts user data from response of GET reuest and stores in userAppointments $scope variable.
				// Also using our ignore object to make sure any data that is not supposed to be seen isn't shown
				// on the scope.
				for (var r = 0; r < response.data.length; r++) {
					$scope.userAppointments[r] = {};
					for (var keyss in userAppointments[r]) {
						if (!ignore[keyss]) {
							$scope.userAppointments[r][keyss] = userAppointments[r][keyss];
						}
					}
				}
			}, function errorCallback(response) {});
	}]);
})(angular);
