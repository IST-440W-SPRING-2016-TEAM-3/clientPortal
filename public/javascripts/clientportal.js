(function(angular, undefined) {

	angular.module("clientportal", [
		'ui.bootstrap'
	])

	.run(["$rootScope", "$http", function($rootScope, $http) {
	}])

	.directive("medicationCards", ["$http",function($http){
		return {
			restrict: "E",
			link: function(scope, el, attrs){
				$http({
						method: 'GET',
						url: 'http://127.0.0.1:8000/api/usermedicines',
						headers: {
							'Content-Type': 'application/json'
						}
					})
					.success(function successCallback(response) {
						for (var key in response) {
								var outer = angular.element('<div></div>'),
									colsize = angular.element('<div class="col-sm-3"></div>'),
									displayCard = angular.element('<div class="displayCard"></div>'),
									displayContainer = angular.element('<div class="displayContainer medicines"></div>'),
									displayTop = angular.element('<div class="displayTop medicines"></div>'),
									displayIcon = angular.element('<div class="displayIcon medicines"></div>'),
									actualIcon = angular.element('<span class="flaticon-medical-1 displayIcon medicines"></span>'),
									information = angular.element('<div class="information"></div>'),
									name = angular.element('<div class="name medicines">Medication</div>'),
									h1 = angular.element('<h1>' + response[key].name + '</h1>'),
									h20 = angular.element('<h2>Dosage: ' + response[key].dosage + '</h2>'),
									h21 = angular.element('<h2>Frequency: ' + response[key].frequency + '</h2>'),
									h22 = angular.element('<h2>Date Start: ' + response[key].datestart + '</h2>'),
									h23 = angular.element('<h2>Date End: ' + response[key].dateend + '</h2>'),
									h24 = angular.element('<h2>Description: ' + response[key].description + '</h2>'),
									displayDescription = angular.element('<div class="displayDescription"></div>');

								displayDescription.append(h1);
								displayDescription.append(h20);
								displayDescription.append(h21);
								displayDescription.append(h22);
								displayDescription.append(h23);
								displayDescription.append(h24);
								information.append(name);
								information.append(displayDescription);
								displayContainer.append(displayTop);
								displayContainer.append(actualIcon);
								displayContainer.append(information);
								displayCard.append(displayContainer);
								colsize.append(displayCard);
								outer.append(colsize);

								el.append(outer.html());
						}
						return el;
					});
			}
		};
	}])

	.directive("profileCards", ["$http", function($http) {
		return {
			restrict: "E",
			link: function(scope, el, attrs) {
				var route = attrs.route,
					cardColor = {
						"Overview": "user-profile",
						"User Profile": "user-profile",
						"Test Results": "test-results",
						"Allergies": "allergies",
						"Medicines": "medicines",
						"Appointments": "appointments",
						"Reports": "reports"
					},
					apiRoutes = {
						"Overview": "userdata",
						"User Profile": "userprofile",
						"Test Results": "usertestresult",
						"Allergies": "userallergies",
						"Medicines": "usermedicines",
						"Appointments": "userappointments",
						"Reports": "userreports"
					};
				$http({
						method: 'GET',
						url: 'http://127.0.0.1:8000/api/' + apiRoutes[route],
						headers: {
							'Content-Type': 'application/json'
						}
					})
					.success(function successCallback(response) {
						var ignore = {
							"_id": "_id",
							"__v": "__v",
							"uuid": "uuid"
						};

						var userprofname = {
							"firstname": "First Name",
							"lastname": "Last Name",
							"email": "Email Address",
							"streetaddress": "Street Address",
							"city": "City",
							"state": "State",
							"zip": "Zip Code",
							"country": "Country",
							"phone": "Phone #",
							"dob": "Date Of Birth",
							"gender": "Gender",
							"height": "Height",
							"weight": "Weight",
							"primaryinsurance": "Primary Insurance",
							"primarypharmacy": "Primary Pharmacy",
							"comment": "Comments"
						};

						for (var key in response) {
							if (!ignore[key]) {
								var outer = angular.element('<div></div>'),
									colsize = angular.element('<div class="col-sm-3"></div>'),
									displayCard = angular.element('<div class="displayCard"></div>'),
									displayContainer = angular.element('<div class="displayContainer"></div>'),
									displayTop = angular.element('<div class="displayTop ' + cardColor[route] + '"></div>'),
									information = angular.element('<div class="information"></div>'),
									img = angular.element('<img class="displayIcon ' + cardColor[route] + '" src="../images/icons/web.svg"></img>'),
									name = angular.element('<div class="name ' + cardColor[route] + '">' + userprofname[key] + '</div>'),
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
		var routes = {
			"userdata" : {"url" : "http://127.0.0.1:8000/api/userdata","name": "userdata"},
			"usertestresult" : {"url" : "http://127.0.0.1:8000/api/usertestresult","name": "usertestresult"},
			"userallergies" : {"url" : "http://127.0.0.1:8000/api/userallergies","name": "userallergies"},
			"usermedicines" : {"url" : "http://127.0.0.1:8000/api/usermedicines","name": "usermedicines"},
			"userappointments": {"url":"http://127.0.0.1:8000/api/userappointments","name": "userappointments"
			}
		};
		$http({ method: 'GET', url: routes.userdata.url}).then(function successCallback(response) { $scope[routes.userdata.name] = response.data;});
		// $http({ method: 'GET', url: routes.usertestresult.url}).then(function successCallback(response) { $scope[routes.usertestresult.name] = response.data;});
		// $http({ method: 'GET', url: routes.userallergies.url}).then(function successCallback(response) { $scope[routes.userallergies.name] = response.data;});
		// $http({ method: 'GET', url: routes.usermedicines.url}).then(function successCallback(response) { $scope[routes.usermedicines.name] = response.data;});
		$http({ method: 'GET', url: routes.userappointments.url})
			.then(function successCallback(response) {

				var ignore = {
					"_id": "_id",
					"__v": "__v",
					"uuid": "uuid",
				};

				var userAppointments = [];
				userAppointments = response.data;

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
			});

		$('.clockpicker').clockpicker({
			default: 'now'
		});

		$('.datepicker').datepicker({});

		$scope.getLocation = function() {
			return document.cookie;
		};

		$scope.reqAppt = function(event) {
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
					if (response.status === 200) {
						//We gon do crazy stuff hur
					}
				});
		};
	}]);
})(angular);
