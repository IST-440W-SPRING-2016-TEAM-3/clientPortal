(function(angular, undefined) {

	function sortArrOfObjectsByParam(arrToSort, strObjParamToSortBy, sortAscending) {
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

	angular.module("clientportal", [
		'ui.bootstrap'
	])

	.directive("profileCards", ["$http",function($http) {
		return {
			restrict: "E",
			link: function(scope, el, attrs) {
				var route = attrs.route;
				$http({
					method: 'GET',
					url: 'http://127.0.0.1:8000/api/userdata',
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.success(function successCallback(response){
					// console.log(response);
					var ignore = {
						"_id": "_id",
						"__v": "__v",
						"uuid": "uuid",
					};

					for(var key in response){
						if(!ignore[key]){
							// console.log(key);
							var outer = angular.element('<div></div>'),
								colsize = angular.element('<div class="col-sm-3"></div>'),
								displayCard = angular.element('<div class="displayCard"></div>'),
								displayContainer = angular.element('<div class="displayContainer"></div>'),
								displayTop = angular.element('<div class="displayTop"></div>'),
								information = angular.element('<div class="information"></div>'),
								img = angular.element('<img class="displayIcon" src="../images/icons/web.svg"></img>'),
								name = angular.element('<div class="name">' + key + '</div>'),
								displayDescription = angular.element('<div class="displayDescription"></div>'),
								p = angular.element('<p>' + response[key] + '</p>');

							displayDescription.append(p);
							information.append(img);
							information.append(name);
							information.append(displayDescription);
							displayContainer.append(displayTop);
							displayContainer.append(information);
							displayCard.append(displayContainer);
							colsize.append(displayCard);
							outer.append(colsize);

							el.append(outer.html());
						}
					}
					return el;
				});
			}
		};
	}])

	.controller("main", ['$scope', '$http', function($scope, $http) {
		$('.clockpicker').clockpicker({
			default: 'now'
		});

		$('.datepicker').datepicker({});

		$scope.getLocation = function() {
			return document.cookie;
		};

		$scope.reqAppt = function(event){
			var reqApptData = $scope.apptReq;
			event.preventDefault();
			$http({
				method: 'POST',
				url: 'http://127.0.0.1:8000/api/requestAppointment',
				data: reqApptData,
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(function successCallback(response) {
				if(response.status === 200){
					//We gon do crazy stuff hur
				}
			});
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
	}])
	;
})(angular);
