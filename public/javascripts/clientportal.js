(function(angular, undefined) {

	function dynamicSort(property) {
		var sortOrder = 1;
		if (property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function(a, b) {
			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		};
	}

	angular.module("clientportal", [
			'ui.bootstrap'
		])
		.directive("medicationCards", ["$http", "$filter", function($http, $filter) {
			return {
				restrict: "E",
				link: function(scope, el, attrs) {
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
									p = angular.element('<p></p>'),
									span = angular.element('<span class="flaticon-medical-1"></span>'),
									actualIcon = angular.element('<span class="flaticon-medical-1 displayIcon medicines"></span>'),
									information = angular.element('<div class="information"></div>'),
									name = angular.element('<div class="name medicines">Medication</div>'),
									h1 = angular.element('<h1>' + response[key].name + '</h1>'),
									h20 = angular.element('<h2>Dosage: ' + response[key].dosage + '</h2>'),
									h21 = angular.element('<h2>Frequency: ' + response[key].frequency + '</h2>'),
									h22 = angular.element('<h2>Date Start: ' + $filter('date')(response[key].datestart, "mediumDate") + '</h2>'),
									h23 = angular.element('<h2>Date End: ' + $filter('date')(response[key].dateend, "mediumDate") + '</h2>'),
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
								p.append(span);
								displayIcon.append(p);
								displayContainer.append(displayTop);
								displayContainer.append(displayIcon);
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

	.directive("immunizationCards", ["$http", "$filter", function($http, $filter) {
		return {
			restrict: "E",
			link: function(scope, el, attrs) {
				$http({
						method: 'GET',
						url: 'http://127.0.0.1:8000/api/userimmunization',
						headers: {
							'Content-Type': 'application/json'
						}
					})
					.success(function successCallback(response) {
						for (var key in response) {
							var outer = angular.element('<div></div>'),
								colsize = angular.element('<div class="col-sm-3"></div>'),
								displayCard = angular.element('<div class="displayCard"></div>'),
								displayContainer = angular.element('<div class="displayContainer immunizations"></div>'),
								displayTop = angular.element('<div class="displayTop immunizations"></div>'),
								displayIcon = angular.element('<div class="displayIcon immunizations"></div>'),
								p = angular.element('<p></p>'),
								span = angular.element('<span class="flaticon-medical"></span>'),
								information = angular.element('<div class="information"></div>'),
								name = angular.element('<div class="name immunizations">Immunization</div>'),
								h1 = angular.element('<h1>' + response[key].name + '</h1>'),
								h21 = angular.element('<h2>Date Immunized: ' + $filter('date')(response[key].dateimmunized, "mediumDate") + '</h2>'),
								h22 = angular.element('<h2>Description: ' + response[key].description + '</h2>'),
								displayDescription = angular.element('<div class="displayDescription"></div>');

							displayDescription.append(h1);
							displayDescription.append(h21);
							displayDescription.append(h22);
							information.append(name);
							information.append(displayDescription);
							p.append(span);
							displayIcon.append(p);
							displayContainer.append(displayTop);
							displayContainer.append(displayIcon);
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

	.directive("allergyCards", ["$http", "$filter", function($http, $filter) {
		return {
			restrict: "E",
			link: function(scope, el, attrs) {
				$http({
						method: 'GET',
						url: 'http://127.0.0.1:8000/api/userallergies',
						headers: {
							'Content-Type': 'application/json'
						}
					})
					.success(function successCallback(response) {
						for (var key in response) {
							var outer = angular.element('<div></div>'),
								colsize = angular.element('<div class="col-sm-3"></div>'),
								displayCard = angular.element('<div class="displayCard"></div>'),
								displayContainer = angular.element('<div class="displayContainer allergies"></div>'),
								displayTop = angular.element('<div class="displayTop allergies"></div>'),
								displayIcon = angular.element('<div class="displayIcon allergies"></div>'),
								p = angular.element('<p></p>'),
								span = angular.element('<span class="flaticon-medical-2"></span>'),
								actualIcon = angular.element('<span class="flaticon-medical-2 displayIcon allergies"></span>'),
								information = angular.element('<div class="information"></div>'),
								name = angular.element('<div class="name allergies">Allergy</div>'),
								h1 = angular.element('<h1>' + response[key].name + '</h1>'),
								h20 = angular.element('<h2>Date Start: ' + $filter('date')(response[key].startdate, "mediumDate") + '</h2>'),
								h21 = angular.element('<h2>Date End: ' + $filter('date')(response[key].enddate, "mediumDate") + '</h2>'),
								h22 = angular.element('<h2>Description: ' + response[key].description + '</h2>'),
								displayDescription = angular.element('<div class="displayDescription"></div>');

							displayDescription.append(h1);
							displayDescription.append(h20);
							displayDescription.append(h21);
							displayDescription.append(h22);
							information.append(name);
							information.append(displayDescription);
							p.append(span);
							displayIcon.append(p);
							displayContainer.append(displayTop);
							displayContainer.append(displayIcon);
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

	.directive("testResultCards", ["$http", "$filter", function($http, $filter) {
		return {
			restrict: "E",
			link: function(scope, el, attrs) {
				$http({
						method: 'GET',
						url: 'http://127.0.0.1:8000/api/usertestresult',
						headers: {
							'Content-Type': 'application/json'
						}
					})
					.success(function successCallback(response) {
						for (var key in response) {
							var outer = angular.element('<div></div>'),
								colsize = angular.element('<div class="col-sm-3"></div>'),
								displayCard = angular.element('<div class="displayCard"></div>'),
								displayContainer = angular.element('<div class="displayContainer test-results"></div>'),
								displayTop = angular.element('<div class="displayTop test-results"></div>'),
								displayIcon = angular.element('<div class="displayIcon test-results"></div>'),
								p = angular.element('<p></p>'),
								span = angular.element('<span class="flaticon-medical-4"></span>'),
								information = angular.element('<div class="information"></div>'),
								name = angular.element('<div class="name test-results">Test Result</div>'),
								h1 = angular.element('<h1>' + response[key].testtype + '</h1>');

								if(response[key].testtype === "urine"){
									h20 = angular.element('<h2>ph Level: ' + response[key].phlevel + '</h2>');
									h21 = angular.element('<h2>Glucose: ' + response[key].glucoseurine + '</h2>');
									h22 = angular.element('<h2>Ketones: ' + response[key].ketones + '</h2>');
									h23 = angular.element('<h2>Gravity: ' + response[key].gravity + '</h2>');
									h24 = angular.element('<h2>Test Date: ' + $filter('date')(response[key].date, "mediumDate") + '</h2>');
								} else if(response[key].testtype === "blood"){
									h20 = angular.element('<h2>Cholesterol: ' + response[key].cholesterol + '</h2>');
									h21 = angular.element('<h2>Blood Type: ' + response[key].bloodtype + '</h2>');
									h22 = angular.element('<h2>Glucose: ' + response[key].glucoseblood + '</h2>');
									h23 = angular.element('<h2>CPR: ' + response[key].cpr + '</h2>');
									h24 = angular.element('<h2>Test Date: ' + $filter('date')(response[key].date, "mediumDate") + '</h2>');
								} else {
									h20 = angular.element('<h2>Diastolic: ' + response[key].blooddiastolic + '</h2>');
									h21 = angular.element('<h2>Systolix: ' + response[key].bloodsystolic + '</h2>');
									h22 = angular.element('<h2>Respiratory Rate: ' + response[key].respiratoryrate + '</h2>');
									h23 = angular.element('<h2>Heart Rate: ' + response[key].heartrate + '</h2>');
									h24 = angular.element('<h2>Blood Temp: ' + response[key].bodytemperature + '</h2>');
									h25 = angular.element('<h2>Test Date: ' + $filter('date')(response[key].date, "mediumDate") + '</h2>');
								}

								displayDescription = angular.element('<div class="displayDescription"></div>');

							displayDescription.append(h1);
							displayDescription.append(h20);
							displayDescription.append(h21);
							displayDescription.append(h22);
							displayDescription.append(h23);
							displayDescription.append(h24);
							if(response[key].testtype === "vital"){
								displayDescription.append(h25);
							}
							information.append(name);
							information.append(displayDescription);
							p.append(span);
							displayIcon.append(p);
							displayContainer.append(displayTop);
							displayContainer.append(displayIcon);
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

	.controller("main", ['$scope', '$http', function($scope, $http) {
		var routes = {
			"userdata": {
				"url": "http://127.0.0.1:8000/api/userdata",
				"name": "userdata"
			},
			"usertestresult": {
				"url": "http://127.0.0.1:8000/api/usertestresult",
				"name": "usertestresult"
			},
			"userallergies": {
				"url": "http://127.0.0.1:8000/api/userallergies",
				"name": "userallergies"
			},
			"usermedicines": {
				"url": "http://127.0.0.1:8000/api/usermedicines",
				"name": "usermedicines"
			},
			"userappointments": {
				"url": "http://127.0.0.1:8000/api/userappointments",
				"name": "userappointments"
			}
		};
		$http({
			method: 'GET',
			url: routes.userdata.url
		}).then(function successCallback(response) {
			$scope[routes.userdata.name] = response.data;
		});
		// $http({ method: 'GET', url: routes.usertestresult.url}).then(function successCallback(response) { $scope[routes.usertestresult.name] = response.data;});
		// $http({ method: 'GET', url: routes.userallergies.url}).then(function successCallback(response) { $scope[routes.userallergies.name] = response.data;});
		// $http({ method: 'GET', url: routes.usermedicines.url}).then(function successCallback(response) { $scope[routes.usermedicines.name] = response.data;});
		$http({
				method: 'GET',
				url: routes.userappointments.url
			})
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

				for(var users in userAppointments){
					if(userAppointments[users].date === "5/6/2016"){
						console.log("yay");
					}
				}

				userAppointments = userAppointments.sort(dynamicSort("date"));
			});

		$('.clockpicker').clockpicker({
			default: 'now'
		});

		$('.datepicker').datepicker({});

		$scope.getLocation = function() {
			return document.cookie;
		};

		$scope.nameArrayCounter = function() {
			var nameArray = $scope.nameArray;

			if ($scope.nameArray[$scope.medicine.name]) {

			} else {
				nameArray.push($scope.medicine.name);
				$scope.nameArray = nameArray;
			}
		};

		$scope.updateUserDate = function() {
			var updatedUserData = $scope.userdata;
			$http({
					method: 'PUT',
					url: 'http://127.0.0.1:8000/api/userdata',
					data: updatedUserData,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function successCallback(response) {
					if (response.status === 200) {
						alert("Your data has been saved!");
						location.href = "/";
					}
				});
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
