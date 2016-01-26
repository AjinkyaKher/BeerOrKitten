angular.module('starter.services', [])

.factory('BackendService', ['$http', function BackendServiceFactory($http) {

	var currentUserData = {};
	var savedFinalScore = 0;
	var savedCurrentLevel = "";
	var savedLevel2Visibility = false;
	var savedLevel3Visibility = false;
	var savedLevel4Visibility = false;

	var baseTags = [
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
			{"tag": "IPA", "category": "beer"},
			{"tag": "Hops", "category": "beer"},
			{"tag": "Lager", "category": "beer"},
			{"tag": "Carbonation", "category": "beer"},
			{"tag": "cat", "category": "cat"},
			{"tag": "cute", "category": "cat"},
			{"tag": "kitten", "category": "cat"},
			{"tag": "fur", "category": "cat"},
			{"tag": "pet", "category": "cat"},
			{"tag": "animal", "category": "cat"},
			{"tag": "domesticated", "category": "cat"},
			{"tag": "whisker", "category": "cat"},
			{"tag": "little", "category": "cat"},
			{"tag": "funny", "category": "cat"},
			{"tag": "mammal", "category": "cat"},
			{"tag": "eyes", "category": "cat"},
			{"tag": "feline", "category": "cat"},
			{"tag": "kitty", "category": "cat"}
			];

	var getTagsLevel1 = function() {
		return baseTags;
	}

	var getTagsLevel2 = function() {
		var additionalTags = [
			{"tag": "tennis", "category": "tennisball"},
			{"tag": "ball", "category": "tennisball"},
			{"tag": "tennis ball", "category": "tennisball"},
			{"tag": "racket", "category": "tennisball"},
			{"tag": "sports", "category": "tennisball"},
			{"tag": "federer", "category": "tennisball"},
			{"tag": "sharapova", "category": "tennisball"},
			{"tag": "wimbledon", "category": "tennisball"},
			{"tag": "grass court", "category": "tennisball"},
			{"tag": "exercise", "category": "tennisball"},
			{"tag": "green", "category": "tennisball"},
			{"tag": "net", "category": "tennisball"},
			{"tag": "lettuce", "category": "burger"},
			{"tag": "sesame", "category": "burger"},
			{"tag": "burger", "category": "burger"},
			{"tag": "bread", "category": "burger"},
			{"tag": "bun", "category": "burger"},
			{"tag": "sandwich", "category": "burger"},
			{"tag": "lunch", "category": "burger"},
			{"tag": "tomato", "category": "burger"},
			{"tag": "fries", "category": "burger"},
			{"tag": "fast food", "category": "burger"},
			{"tag": "patty", "category": "burger"},
			{"tag": "food", "category": "burger"}
		];
		return baseTags.concat(additionalTags);
	}

	var setCurrentUser = function(userData) {
		currentUserData = userData;
	}

	var getCurrentUser = function() {
		//return {"username": "Ajinkya", "level1": {"highscore": 100, "scores": [12, 4, 6, 7, 78, 89, 5, 6, 5, 1]}};
		return currentUserData;
	}

	var setFinalScore = function(finalScore) {
		savedFinalScore = finalScore;
	}

	var getFinalScore = function() {
		return savedFinalScore;
	}

	var setLevel2Visibility = function(bool) {
		savedLevel2Visibility = bool;
	}

	var getLevel2Visibility = function(bool) {
		// return true;
		return savedLevel2Visibility;
	}

	var setLevel3Visibility = function(bool) {
		savedLevel3Visibility = bool;
	}

	var getLevel3Visibility = function(bool) {
		// return true;
		return savedLevel3Visibility;
	}

	var setLevel4Visibility = function(bool) {
		savedLevel4Visibility = bool;
	}

	var getLevel4Visibility = function(bool) {
		// return true;
		return savedLevel4Visibility;
	}

	var setCurrentLevel = function(currentLevel) {
		savedCurrentLevel = currentLevel;
	}

	var getCurrentLevel = function() {
		return savedCurrentLevel;
	}

	//var getCurrentHighScore1

	return {
		getTagsLevel1: getTagsLevel1,
		getTagsLevel2: getTagsLevel2,
		setCurrentUser: setCurrentUser,
		getCurrentUser: getCurrentUser,
		setFinalScore: setFinalScore,
		getFinalScore: getFinalScore,
		setLevel2Visibility: setLevel2Visibility,
		getLevel2Visibility: getLevel2Visibility,
		setLevel3Visibility: setLevel3Visibility,
		getLevel3Visibility: getLevel3Visibility,
		setLevel4Visibility: setLevel4Visibility,
		getLevel4Visibility: getLevel4Visibility,
		setCurrentLevel: setCurrentLevel,
		getCurrentLevel: getCurrentLevel
	};
}])

.factory('Users', ['$firebaseArray', function UsersFactory($firebaseArray) {
  var tempRef = new Firebase("https://popping-inferno-3993.firebaseio.com/UsersList?");
  return $firebaseArray(tempRef);
}]);

// .factory('Users', ['$firebaseArray', function UsersFactory($firebaseArray) {
//   var usersRef = new Firebase("https://popping-inferno-3993.firebaseio.com/users?");
//   return $firebaseArray(usersRef);
// }]);