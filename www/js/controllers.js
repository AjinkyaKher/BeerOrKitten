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
	$scope.currentUser = BackendService.getCurrentUser().username;
	$scope.startNewGame = function() {
		$state.go('app.newgamehome');
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

	//Level 1
	var currentHighScores = angular.copy(Users);
	currentHighScores.sort(function(a,b) {
		return b.level1.highscore - a.level1.highscore;
	});

	var tempData1_score = [];
	var tempData1_user = [];
	var i=0;
	$scope.topScorerLevel1 = currentHighScores[0].username;
	for(;i<5;i++) {
		if(i >= currentHighScores.length) break;
		tempData1_score.push(currentHighScores[i].level1.highscore);
		tempData1_user.push(currentHighScores[i].username.substring(0, 10));
	}
	for(;i<5;i++) {
		tempData1_score.push(0);
		tempData1_user.push("");
	}

	//Level 2
	currentHighScores.sort(function(a,b) {
		return b.level2.highscore - a.level2.highscore;
	});
	var tempData2_score = [];
	var tempData2_user = [];
	var i=0;
	$scope.topScorerLevel2 = "";
	if(currentHighScores[0].level2.highscore > 0) {
		$scope.topScorerLevel2 = currentHighScores[0].username;
	}
	for(;i<5;i++) {
		if(i >= currentHighScores.length) break;
		tempData2_score.push(currentHighScores[i].level2.highscore);
		tempData2_user.push(currentHighScores[i].username.substring(0, 10));
	}
	for(;i<5;i++) {
		tempData2_score.push(0);
		tempData2_user.push("");
	}

	//Level 3
	currentHighScores.sort(function(a,b) {
		return b.level3.highscore - a.level3.highscore;
	});
	var tempData3_score = [];
	var tempData3_user = [];
	var i=0;
	$scope.topScorerLevel3 = "";
	if(currentHighScores[0].level3.highscore > 0) {
		$scope.topScorerLevel3 = currentHighScores[0].username;
	}
	for(;i<5;i++) {
		if(i >= currentHighScores.length) break;
		tempData3_score.push(currentHighScores[i].level3.highscore);
		tempData3_user.push(currentHighScores[i].username.substring(0, 10));
	}
	for(;i<5;i++) {
		tempData3_score.push(0);
		tempData3_user.push("");
	}

	$scope.labels1 = tempData1_user;
	$scope.labels2 = tempData2_user;
	$scope.labels3 = tempData3_user;
    $scope.data1 = [tempData1_score];
    $scope.data2 = [tempData2_score];
    $scope.data3 = [tempData3_score];
})

.controller('MyScoresCtrl', function($scope, $stateParams, $state, BackendService, Users) {
	$scope.currentUser = BackendService.getCurrentUser();
	$scope.users = Users;

	$scope.goBack = function() {
		$state.go('app.home');
	}

	//Level 1
	var tempData1 = [];
	if($scope.currentUser.level1 && $scope.currentUser.level1.scores) {
		var currentScores = angular.copy($scope.currentUser.level1.scores);
		currentScores = currentScores.slice().reverse();
		var i =0;
		for(;i<10;i++) {
			if(i >= currentScores.length) break;
			tempData1.push(currentScores[i]);
		}
		for(;i<10;i++) {
			tempData1.push(0);
		}
	}
	else {
		for(var i=0;i<10;i++) {
			tempData1.push(0);
		}
	}

	//Level 2
	var tempData2 = [];
	if($scope.currentUser.level2 && $scope.currentUser.level2.scores) {
		currentScores = angular.copy($scope.currentUser.level2.scores);
		currentScores = currentScores.slice().reverse();
		var i =0;
		for(;i<10;i++) {
			if(i >= currentScores.length) break;
			tempData2.push(currentScores[i]);
		}
		for(;i<10;i++) {
			tempData2.push(0);
		}
	}
	else {
		for(var i=0;i<10;i++) {
			tempData2.push(0);
		}
	}

	//Level 3
	var tempData3 = [];
	if($scope.currentUser.level3 && $scope.currentUser.level3.scores) {
		currentScores = angular.copy($scope.currentUser.level3.scores);
		currentScores = currentScores.slice().reverse();
		var i =0;
		for(;i<10;i++) {
			if(i >= currentScores.length) break;
			tempData3.push(currentScores[i]);
		}
		for(;i<10;i++) {
			tempData3.push(0);
		}
	}
	else {
		for(var i=0;i<10;i++) {
			tempData3.push(0);
		}
	}

	$scope.labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    $scope.data1 = [tempData1];
    $scope.data2 = [tempData2];
    $scope.data3 = [tempData3];
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
		$scope.users.$add({"username": $scope.loginData.username, "password": $scope.loginData.password, "level1": {"highscore": 0, "scores": []}, "level2": {"highscore": 0, "scores": []}, "level3": {"highscore": 0, "scores": []}, "level4": {"highscore": 0, "scores": []}, "level5": {"highscore": 0, "scores": []}});
		$scope.loginInProgress = false;
		BackendService.setCurrentUser({"username": $scope.loginData.username, "password": $scope.loginData.password, "level1": {"highscore": 0, "scores": []}, "level2": {"highscore": 0, "scores": []}, "level3": {"highscore": 0, "scores": []}, "level4": {"highscore": 0, "scores": []}, "level5": {"highscore": 0, "scores": []}});
		$scope.loginData = {};
		$scope.dataIncomplete = true;
		BackendService.setLevel2Visibility(false);
		BackendService.setLevel3Visibility(false);
		BackendService.setLevel4Visibility(false);
		$state.go('app.home');
	}

	$scope.login = function() {
		$scope.loginInProgress = true;
		$scope.loginFailed = false;
		for(var i=0;i<$scope.users.length;i++) {
			if($scope.users[i].username === $scope.loginData.username && $scope.users[i].password === $scope.loginData.password) {
				$scope.loginInProgress = false;
				BackendService.setCurrentUser($scope.users[i]);
				$scope.loginData = {};
				$scope.dataIncomplete = true;

				//set level visibilities
				BackendService.setLevel2Visibility(false);
				BackendService.setLevel3Visibility(false);
				BackendService.setLevel4Visibility(false);
				if($scope.users[i].level1.highscore >= 100) {
					BackendService.setLevel2Visibility(true);
				}
				if($scope.users[i].level2.highscore >= 100) {
					BackendService.setLevel3Visibility(true);
				}
				if($scope.users[i].level3.highscore >= 100) {
					BackendService.setLevel4Visibility(true);
				}

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

.controller('NewGameHomeCtrl', function($scope, $state, $stateParams, BackendService) {
	$scope.level2Visibility = BackendService.getLevel2Visibility();
	$scope.level3Visibility = BackendService.getLevel3Visibility();
	$scope.level4Visibility = BackendService.getLevel4Visibility();

	if($scope.level2Visibility) {
		$scope.level2LockIcon = "level-unlocked";
		$scope.blurLevel2 = ""
		$scope.level2LockIconIonic = "ion-unlocked";
	}
	else {
		$scope.level2LockIcon = "level-locked";
		$scope.blurLevel2 = "blur"
		$scope.level2LockIconIonic = "ion-locked";
	}

	if($scope.level3Visibility) {
		$scope.level3LockIcon = "level-unlocked";
		$scope.blurLevel3 = ""
		$scope.level3LockIconIonic = "ion-unlocked";
	}
	else {
		$scope.level3LockIcon = "level-locked";
		$scope.blurLevel3 = "blur"
		$scope.level3LockIconIonic = "ion-locked";
	}

	if($scope.level4Visibility) {
		$scope.level4LockIcon = "level-unlocked";
		$scope.blurLevel4 = ""
		$scope.level4LockIconIonic = "ion-unlocked";
	}
	else {
		$scope.level4LockIcon = "level-locked";
		$scope.blurLevel4 = "blur"
		$scope.level4LockIconIonic = "ion-locked";
	}

	var currentUser = BackendService.getCurrentUser();
	$scope.currentUserHighScoreLevel1 = currentUser.level1.highscore;
	$scope.currentUserHighScoreLevel2 = currentUser.level2.highscore;
	$scope.currentUserHighScoreLevel3 = currentUser.level3.highscore;

	$scope.startLevel1 = function() {
		BackendService.setCurrentLevel("level1");
		$state.go('app.newgame1', {'retry': false});
	}

	$scope.startLevel2 = function() {
		BackendService.setCurrentLevel("level2");
		$state.go('app.newgame2', {'retry': false});
	}

	$scope.startLevel3 = function() {
		BackendService.setCurrentLevel("level3");
		$state.go('app.newgame3', {'retry': false});
	}

	$scope.startLevel4 = function() {
		BackendService.setCurrentLevel("level4");
		$state.go('app.newgame4', {'retry': false});
	}
})

.controller('NewGameCtrl', function($scope, $state, $stateParams, $interval, $timeout, $ionicPopup, BackendService, Users) {
	$scope.pageLoaded = false;
	$scope.progressval = 0;
	$scope.currentWord = "";
	$scope.currentScore = 0;

	//disco lights
	var colors = new Array(
	  [62,35,255],
	  [60,255,60],
	  [255,35,98],
	  [45,175,230],
	  [255,0,255],
	  [255,128,0]);

	var step = 0;
	//color table indices for: 
	// current color left
	// next color left
	// current color right
	// next color right
	var colorIndices = [0,1,2,3];

	//transition speed
	var gradientSpeed = 0.002;

	function updateGradient()
	{
	  
	  if ( $===undefined ) return;
	  
	var c0_0 = colors[colorIndices[0]];
	var c0_1 = colors[colorIndices[1]];
	var c1_0 = colors[colorIndices[2]];
	var c1_1 = colors[colorIndices[3]];

	var istep = 1 - step;
	var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
	var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
	var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
	var color1 = "rgb("+r1+","+g1+","+b1+")";

	var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
	var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
	var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
	var color2 = "rgb("+r2+","+g2+","+b2+")";

	 $('#gradient').css({
	   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
	    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
	  
	  step += gradientSpeed;
	  if ( step >= 1 )
	  {
	    step %= 1;
	    colorIndices[0] = colorIndices[1];
	    colorIndices[2] = colorIndices[3];
	    
	    //pick two new target color indices
	    //do not pick the same as the current one
	    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
	    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
	    
	  }
	}

	var currentLevel = BackendService.getCurrentLevel();

	if(currentLevel === "level1" || currentLevel === "level3" || currentLevel === "level4") {
		$scope.words = BackendService.getTagsLevel1();
		if(currentLevel === "level4") {
			setInterval(updateGradient, 0.1);
		}
	}
	else if(currentLevel === "level2") {
		$scope.words = BackendService.getTagsLevel2();
	}

    $scope.clickEvent = true;
    $scope.nextWordPromise = null;

    var displayWords = function() {
    	//no need to hide previous word now, instead display current word
    	$timeout.cancel($scope.fadeWordPromise);
    	$timeout.cancel($scope.hideWordPromise);
    	$scope.hidden = false;
    	$scope.startFade = false;

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
    	
    	//time remaining
    	$scope.timeRemaining = 2000;
    	var decrementTimeRemaining = function() {
    		if($scope.timeRemaining === 0) return;
    		$timeout(function() { 
    			if($scope.timeRemaining === 0) return;
    			$scope.timeRemaining = $scope.timeRemaining - 100;
    			decrementTimeRemaining();
    		}, 100);
    	}
    	decrementTimeRemaining();

    	$scope.nextWordPromise = $timeout(function() { displayWords();}, 2000);

    	//text disappear effect
    	if(currentLevel === "level4") {
    		$scope.fadeWordPromise = $timeout(function() {
    			$scope.startFade = true;
    			$scope.hideWordPromise = $timeout(function() {$scope.hidden = true;}, 1000);
    		}, 500);
    	}
    }

    var startProgressBarBase = function() {
    	if($stateParams.retry === 'true') {
    		$scope.pageLoaded = true;
			displayWords();
			return;
		}
		startProgressBar();
    }

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
	startProgressBarBase();

	$scope.configuration1 = true;

	$scope.clickBeer = function() {
		$scope.clickEvent = true;
		if($scope.words[$scope.currentIndex].category === "beer") {
			if($scope.nextWordPromise) {
				$timeout.cancel($scope.nextWordPromise);
				displayWords();
			}
			$scope.currentScore++;
			if(Math.floor(Math.random() * 2) === 0) $scope.configuration1 = true;
			else $scope.configuration1 = false;
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
			if(Math.floor(Math.random() * 2) === 0) $scope.configuration1 = true;
			else $scope.configuration1 = false;
		}
		else {
			if($scope.nextWordPromise) {
				$timeout.cancel($scope.nextWordPromise);
				showAlert();
			}
		}
	}

	$scope.clickTennisBall = function() {
		$scope.clickEvent = true;
		if($scope.words[$scope.currentIndex].category === "tennisball") {
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

	$scope.clickBurger = function() {
		$scope.clickEvent = true;
		if($scope.words[$scope.currentIndex].category === "burger") {
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
	   var currentUser = BackendService.getCurrentUser().username;
	   var usersRef = new Firebase("https://popping-inferno-3993.firebaseio.com/UsersList?");
	   for(var i=0; i<Users.length; i++) {
	   		if(Users[i].username === currentUser) {
	   			var currentUserNode = usersRef.child(Users[i].$id);
	   			var tempScores = Users[i][currentLevel].scores;
	   			//var tempScores = Users[i].level1.scores;
	   			if(!tempScores) tempScores = [];
	   			tempScores.push($scope.currentScore);
	   			var currentMaxScore = Math.max.apply(Math, tempScores);
	   			if(currentLevel === "level1") {
	   				currentUserNode.update({"level1": {"scores": tempScores, "highscore": currentMaxScore}});
	   			}
	   			else if(currentLevel === "level2") {
	   				currentUserNode.update({"level2": {"scores": tempScores, "highscore": currentMaxScore}});
	   			}
	   			else if(currentLevel === "level3") {
	   				currentUserNode.update({"level3": {"scores": tempScores, "highscore": currentMaxScore}});
	   			}
	   			else if(currentLevel === "level4") {
	   				currentUserNode.update({"level4": {"scores": tempScores, "highscore": currentMaxScore}});
	   			}
	   			BackendService.setCurrentUser(Users[i]);
	   			break;
	   		}
	   }

	   //show modal	
   	   BackendService.setFinalScore($scope.currentScore);
	   var alertPopup = $ionicPopup.alert({
	     title: 'Game Over',
	     template: '<div ng-controller= "PopupCtrl" class="text-center"> Final Score: {{finalScore}} </div>',
	     buttons: [
	     	 { 	text: 'Retry <i class="ion-refresh"></i>',
		     	type: 'button-assertive',
		     	onTap: function(e) {
		     		$state.go($state.current, {'retry': true}, {reload: true});
		     	}
		     },
		     { 	text: 'Go Home',
		     	type: 'button-positive',
		     	onTap: function(e) {
		     		$state.go('app.home');
		     	}
		 	}
		 ]
	   });
	   // alertPopup.then(function(res) {
	   //   $state.go('app.home');
	   // });
	 };
})

.controller('PopupCtrl', function($scope, BackendService) {
	$scope.finalScore = BackendService.getFinalScore();
});


//temp
// console.log("Users: "); console.log(Users);
// console.log("Temp: "); console.log(UsersList);
// $scope.users = Users;
// $scope.temp = UsersList;
// for(var i=0;i<$scope.users.length;i++) {
// 	var scores = [];
// 	if($scope.users[i].scores) {
// 		for(var j=0;j<$scope.users[i].scores.length;j++) {
// 			scores.push($scope.users[i].scores[j]);
// 		}

// 		$scope.temp.$add(
// 			{	"username": $scope.users[i].username, 
// 				"password": $scope.users[i].password, 
// 				"level1": {
// 					"highscore": $scope.users[i].highscore, 
// 					"scores": scores
// 				},
// 				"level2": {
// 					"highscore": 0,
// 					"scores": []
// 				},
// 				"level3": {
// 					"highscore": 0,
// 					"scores": []
// 				}
// 			});
// 	}
// 	else {
// 		console.log("Malformed data"); console.log($scope.users[i]);
// 	}
// }
// console.log("Temp: "); console.log(UsersList);