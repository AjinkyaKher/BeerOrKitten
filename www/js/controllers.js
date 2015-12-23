angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('HomeCtrl', function($scope, $stateParams, $state, BackendService) {
	$scope.currentUser = BackendService.getCurrentUser();
	$scope.startNewGame = function() {
		$state.go('app.newgame');
	}

	$scope.showHighScores = function() {
		$state.go('app.highscores');
	}

	$scope.showcurrentUserScores = function() {
		$state.go('app.myscores');
	}

	$scope.logout = function() {
		$state.go('app.login');
	}
})

.controller('HighScoresCtrl', function($scope, $stateParams, $state, Users) {
	$scope.users = Users;

	$scope.goBack = function() {
		$state.go('app.home');
	}
})

.controller('MyScoresCtrl', function($scope, $stateParams, $state, BackendService, Users) {
	$scope.currentUser = BackendService.getCurrentUser();
	$scope.users = Users;

	$scope.goBack = function() {
		$state.go('app.home');
	}
})

.controller('LoginCtrl', function($scope, $stateParams, $state, BackendService, Users) {
	$scope.currentSelection = "signup";
	$scope.loginInProgress = false;
	$scope.loginData = {};
	$scope.signUpFailed = false;
	$scope.loginFailed = false;
	$scope.users = Users;
	$scope.dataIncomplete = true;

	$scope.signUp = function() {
		$scope.loginInProgress = true;
		for(var i=0; i<$scope.users.length; i++) {
			if($scope.users[i].username === $scope.loginData.username) {
				$scope.signUpFailed = true;
				$scope.loginInProgress = false;
				return;
			}
		}
		$scope.users.$add({"username": $scope.loginData.username, "password": $scope.loginData.password, "highscore": 0, "scores": []});
		$scope.loginInProgress = false;
		BackendService.setCurrentUser($scope.loginData.username);
		$scope.loginData = {};
		$state.go('app.home');
	}

	$scope.login = function() {
		$scope.loginInProgress = true;
		$scope.loginFailed = false;
		for(var i=0;i<$scope.users.length;i++) {
			if($scope.users[i].username === $scope.loginData.username && $scope.users[i].password === $scope.loginData.password) {
				$scope.loginInProgress = false;
				BackendService.setCurrentUser($scope.loginData.username);
				$scope.loginData = {};
				$state.go('app.home');
				return;
			}
		}
		$scope.loginFailed = true;
		$scope.loginInProgress = false;
	}

	$scope.clearSignUpErrorMessage = function() {
		$scope.signUpFailed = false;
	}

	$scope.clearLoginErrorMessage = function() {
		$scope.loginFailed = false;
	}

	$scope.validateLoginForm = function() {
		if($scope.loginData.username && $scope.loginData.username.length > 0 && 
		   $scope.loginData.password && $scope.loginData.password.length > 0) {
			$scope.dataIncomplete = false;
		}
		else {
			$scope.dataIncomplete = true;
		}
	}
})

.controller('NewGameCtrl', function($scope, $state, $stateParams, $interval, $timeout, $ionicPopup, BackendService, Users) {
	$scope.pageLoaded = false;
	$scope.progressval = 0;
	$scope.currentWord = "";
	$scope.currentScore = 0;

	var startProgressBar = function() {
		$timeout(function() { 
			if($scope.progressval === 100) {
				$scope.pageLoaded = true;
				displayWords();
				return;
			}
			else {
				$scope.progressval = $scope.progressval + 5;
				startProgressBar();
			}
		}, 100);
	}

	startProgressBar();

    $scope.words = BackendService.getTags();;

    $scope.clickEvent = true;
    $scope.nextWordPromise = null;

    var displayWords = function() {

    	//return if no click
    	if(!$scope.clickEvent) {
    		showAlert();
    		return;
    	}

    	var min = 0; 
    	var max = $scope.words.length-1;
    	var randomIndex = Math.floor(Math.random() * (max - min) + min);
    	if($scope.currentIndex === randomIndex) {
    		randomIndex = (randomIndex + 1) % $scope.words.length;
    	}
    	$scope.currentIndex = randomIndex;

    	$scope.currentWord = $scope.words[$scope.currentIndex].tag;
    	$scope.clickEvent = false;
    	console.log($scope.currentWord);
    	$scope.nextWordPromise = $timeout(function() { displayWords();}, 2000);
    }

	$scope.clickBeer = function() {
		$scope.clickEvent = true;
		if($scope.words[$scope.currentIndex].category === "beer") {
			if($scope.nextWordPromise) {
				$timeout.cancel($scope.nextWordPromise);
				displayWords();
			}
			$scope.currentScore++;
		}
		else {
			if($scope.nextWordPromise) {
				$timeout.cancel($scope.nextWordPromise);
				showAlert();
			}
		}
	}

	$scope.clickKitten = function() {
		$scope.clickEvent = true;
		if($scope.words[$scope.currentIndex].category === "cat") {
			if($scope.nextWordPromise) {
				$timeout.cancel($scope.nextWordPromise);
				displayWords();
			}
			$scope.currentScore++;
		}
		else {
			if($scope.nextWordPromise) {
				$timeout.cancel($scope.nextWordPromise);
				showAlert();
			}
		}
	}

	 //An alert dialog
	 var showAlert = function() {
	   //update db
	   var currentUser = BackendService.getCurrentUser();
	   var usersRef = new Firebase("https://popping-inferno-3993.firebaseio.com/users?");
	   for(var i=0; i<Users.length; i++) {
	   		if(Users[i].username === currentUser) {
	   			var currentUserNode = usersRef.child(Users[i].$id);
	   			var tempScores = Users[i].scores;
	   			if(!tempScores) tempScores = [];
	   			// if(tempScores.length === 5) tempScores.splice(0,1);
	   			tempScores.push($scope.currentScore);
	   			var currentMaxScore = Math.max.apply(Math, tempScores);
	   			currentUserNode.update({"scores": tempScores, "highscore": currentMaxScore});
	   			break;
	   		}
	   }

	   //shoe modal	
   	   BackendService.setFinalScore($scope.currentScore);
	   var alertPopup = $ionicPopup.alert({
	     title: 'Game Over',
	     template: '<div ng-controller= "PopupCtrl" class="text-center"> Final Score: {{finalScore}} </div>'
	   });
	   alertPopup.then(function(res) {
	     $state.go('app.home');
	   });
	 };
})

.controller('PopupCtrl', function($scope, BackendService) {
	$scope.finalScore = BackendService.getFinalScore();
});