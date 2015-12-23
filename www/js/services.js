angular.module('starter.services', [])

.factory('BackendService', ['$http', function BackendServiceFactory($http) {

	var currentUser = "";
	var savedFinalScore = 0;

	var getTags = function() {
		return [
			{"tag": "beer", "category": "beer"}, 
			{"tag": "pint", "category": "beer"}, 
			{"tag": "foam", "category": "beer"},
			{"tag": "lager", "category": "beer"},
			{"tag": "mug", "category": "beer"},
			{"tag": "glass", "category": "beer"},
			{"tag": "ale", "category": "beer"},
			{"tag": "brewery", "category": "beer"},
			{"tag": "alcohol", "category": "beer"},
			{"tag": "drink", "category": "beer"},
			{"tag": "brew", "category": "beer"},
			{"tag": "refreshment", "category": "beer"},
			{"tag": "pub", "category": "beer"},
			{"tag": "bar", "category": "beer"},
			{"tag": "suds", "category": "beer"},
			{"tag": "draft", "category": "beer"},
			{"tag": "cat", "category": "cat"},
			{"tag": "cute", "category": "cat"},
			{"tag": "kitten", "category": "cat"},
			{"tag": "fur", "category": "cat"},
			{"tag": "pet", "category": "cat"},
			{"tag": "animal", "category": "cat"},
			{"tag": "domestic", "category": "cat"},
			{"tag": "whisker", "category": "cat"},
			{"tag": "little", "category": "cat"},
			{"tag": "funny", "category": "cat"},
			{"tag": "mammal", "category": "cat"},
			{"tag": "eyes", "category": "cat"},
			{"tag": "feline", "category": "cat"},
			{"tag": "kitty", "category": "cat"},
			]
	}

	var setCurrentUser = function(username) {
		currentUser = username;
	}

	var getCurrentUser = function() {
		return currentUser;
	}

	var setFinalScore = function(finalScore) {
		savedFinalScore = finalScore;
	}

	var getFinalScore = function() {
		return savedFinalScore;
	}

	return {
		getTags: getTags,
		setCurrentUser: setCurrentUser,
		getCurrentUser: getCurrentUser,
		setFinalScore: setFinalScore,
		getFinalScore: getFinalScore
	};
}])

.factory('Users', ['$firebaseArray', function UsersFactory($firebaseArray) {
  var usersRef = new Firebase("https://popping-inferno-3993.firebaseio.com/users?");
  return $firebaseArray(usersRef);
}]);