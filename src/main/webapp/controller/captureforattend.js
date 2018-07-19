var app = angular.module('app', ['ui.router','ngMaterial','ngMdIcons', 
                                 'ngSanitize', 'ngAnimate',
                                 'treasure-overlay-spinner','ct.ui.router.extras.future', 'ngLoad'
                                 ,'ngTable', 'ngMessages','camera','ab-base64','mwl.calendar','ui.bootstrap']);

var $stateProviderRef = null;
app.directive('integer', function(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl){
            ctrl.$parsers.unshift(function(viewValue){
                return parseInt(viewValue, 10);
            });
        }
    };
});

app.directive('lowercase', function () {
    return {
        require: 'ngModel',
        link: function ($scope, elem, attrs, ngModelCtrl) {
            var lowercase = function (inputValue) {
                if(inputValue == undefined) inputValue = '';

                var lowercased = inputValue.toLowerCase();

                if(lowercased !== inputValue) {
                    ngModelCtrl.$setViewValue(lowercased);
                    ngModelCtrl.$render();
                }

                return lowercased;
            }

            ngModelCtrl.$parsers.unshift(lowercase);
            lowercase($scope[attrs.ngModel]);
        }
    };
});
app.factory("httpService",["$http","$window","$rootScope","$q","$mdToast","$state",function($http,$window,$rootScope,$q,$mdToast,$state)
	{
		
		var config1 = {
				   headers: {
				    'Content-Type': 'application/json'
				   }
				  }
	
		function getFillteredList(id){
			var deferred = $q.defer();
			 $http.get($rootScope.apiurl +"/user/list", config1)
			   .then(function(result) 
					   {	
				  
				   
				   if(result.data.length == 0){
					   			//("masuk ke sini")
							 	 $window.sessionStorage.removeItem("userEdited");
							}else{
								//("malah masuk ke sini")
								  y=result.data;
								   userInfo = JSON.stringify(result);
								   userInfo = JSON.parse(userInfo)
								   //(userInfo.data.length);
								   var userfiltered="";
								  
								   for (var i = 0; i <= userInfo.data.length; i++) 
								   {
									   if(i == userInfo.data.length)
									   {
										   if(userfiltered=="")
										   {
											   deferred.reject(userfiltered);
										   }else
										   {
											   //("malah masuk ke sini")
											   userfiltered+="{}]";
											   var userEdited = userfiltered.replace(",{}]","]");
											   $window.sessionStorage["userEdited"] = userEdited;
										   }
									   }
									   else
									   {
										   if(userfiltered=="")
										   {
										     if(userInfo.data[i].userID == id)
										     {
											   //("sama")
											   userfiltered += '['+JSON.stringify(userInfo.data[i])+',';
										   
										     }
									   }
									   else 
										   if(i<userInfo.data.length)
										   {
											   if(userInfo.data[i].userID == id)
											   {
												   //("sama")
												   userfiltered += JSON.stringify(userInfo.data[i])+',';
											   
											   }
										   }	
									 }
									   
								   }
							}
				   //(userEdited)
				   deferred.resolve(userEdited);
				   }
		 
		   );
			 return deferred.promise;
		}
	
		function getAttendanceList()
		{
			var deferred = $q.defer();
			var objectAttendanceList;
			var AttendanceList;
			 
			
			
			
			$http.get($rootScope.apiurl +"/user/list", config1)
				   .then(function(result) 
						   {									
					   			objectAttendanceList = result.data;				   			
							  	AttendanceList = JSON.stringify(objectAttendanceList);						  	
							  	deferred.resolve(AttendanceList);
							  	
					   			
							  
							},
							   function(error)
							   			{
								   			//('Get Data Error -> ' + JSON.stringify(error));
								   				deferred.reject(error);
							  
							   			}
							   );
			return deferred.promise;
		}
		
	
		function absenPost(data,status)
		{
			$http.post($rootScope.apiurl +"add/absen"+status, data, config1)
			.then
				(
					function(result)
						{				
						//("test")
								$mdToast.show
									(
											$mdToast.simple()
												.textContent("Check "+status+" Success !")
												.position('top right')
												.hideDelay(4000)
									);
								console.log(result)
								$state.go('home')
						},
					function(error)
						{
							$mdToast.simple()
							.textContent("Check "+status+" Fail !")
							.position('top right')
							.hideDelay(4000)
							  deferred.reject(error);
							
						}
			
				)
		}
		function absenPut(data,status)
		{
			$http.put($rootScope.apiurl +"add/absen"+status, data, config1)
			.then
				(
					function(result)
						{				
								$mdToast.show
									(
											$mdToast.simple()
												.textContent("Check "+status+" Success !")
												.position('top right')
												.hideDelay(4000)
												
									);
								$state.go('home')
						},
					function(error)
						{
							
							$mdToast.simple()
							.textContent("Check "+status+" Fail !")
							.position('top right')
							.hideDelay(4000)
							  deferred.reject(error);
							
						}
			
				)
		}
		return{
			getFillteredList:getFillteredList,
			getAttendanceList:getAttendanceList,
			absenPost:absenPost,
			absenPut:absenPut
		}
}])
app.factory("captureValidation",["$window","$rootScope","$http",
								 "getTime","httpService","$q",
								 function($window,$rootScope,$http,
										  getTime,httpService,$q){
	var deferred = $q.defer();
	function check(data){
		if(data == null){
			var status = 'IN';
		}
		else{
			var status = 'OUT';
		}
		this.status = status;
	}
///////// buat ngecek kalo uda absen atau belum
	function CheckINandOUT()
	{
		
	}
//////// buat ngecek kalau uda absen masuk
	function getCheckedINUser(user)
	{
		var deferred = $q.defer();
		//run service
			getData = httpService.getAttendanceList();
			getTime.getCurrentDateTime();
		//
		var userInfo = user;	
		var date = getTime.getDateOnly;
		var attendanceList ;
		var userAbsen;
		getData.then
		(
				function(response)
				{
					attendanceList = JSON.parse(response);
					//(attendanceList.length)
					for (var i = 0; i < attendanceList.length; i++) 
					{						
					
							if(userInfo.userID == attendanceList[i].userID  && attendanceList[i].userDateIN == date )
							{
								userAbsen = JSON.stringify(attendanceList[i]);
								//("a")
								$window.sessionStorage["userAbsen"] = JSON.stringify(attendanceList[i]);
									
								
								
							}
							
							
						
					}
					if(userAbsen == null){
						deferred.reject(userAbsen); 
					}else{deferred.resolve(userAbsen)}
					
				},function(error){
					
					//("nodata")
					
				}
		)
		return deferred.promise;
	}

	return{
		CheckINandOUT:CheckINandOUT,
		check:check,
		getCheckedINUser:getCheckedINUser
	};
}]);
app.factory("redirectSvc",["$window","$rootScope","$state",function($window,$rootScope,$state){
	
	function onepage(user,page)
	{
		
		if(user == null){
			
			$state.go(page);
			
		}
	}
	function adminCheck(role){
		if(role=="User"){
			$state.go('home');
		}
	}
	function twopage(user,page,pages)
	{
		if(user == null){
			//(user + page + pages)
			$state.go(page);
		}else{
			//("kalo ga")
			$state.go(pages)
		}
	}
	return{
		adminCheck:adminCheck,
		onepage:onepage,
		twopage:twopage
	}
}])
app.factory("getTime",["$window","$rootScope",function($window,$rootScope){
	
	function getCurrentDateTime(){
		var date = new Date();
		//(JSON.stringify(date))
		var datetime = date.getFullYear() + '-' +
		    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
		    ('00' + date.getDate()).slice(-2) + ' ' + 
		    ('00' + date.getHours()).slice(-2) + ':' + 
		    ('00' + date.getMinutes()).slice(-2) + ':' + 
		    ('00' + date.getSeconds()).slice(-2);
		
		var dateOnly = date.getFullYear() + '-' +
	    	  ('00' + (date.getMonth()+1)).slice(-2) + '-' +
	    	  ('00' + date.getDate()).slice(-2);
		
		var getDateTime ;
		var getDateOnly ;
		//("dari factory : "+datetime);
		this.getDateOnly = dateOnly;
		this.getDateTime = datetime;
	}
	
	return{
		//date:date,
		getCurrentDateTime:getCurrentDateTime
	}
}])
app.factory("authenticationSvc", ["$http", "$q", "$window","$rootScope", function($http, $q, $window, $rootScope) {
	 var userInfo;
	 function login(usermail, password) {
	  //('Login <- U=' + usermail+' & P='+password);
	  var deferred = $q.defer();
	  var config1 = {
	   headers: {
	    'Content-Type': 'application/json'
	   }
	  }
	  var mydata = JSON.stringify({email:usermail, password: password});
	  
	  $http.post($rootScope.apiurl +"/user/login", mydata, config1)
	   .then(function(result) {
		   
		   //('Login Success -> ' + JSON.stringify(result));
		  
	    var userinf =  result.data;
	    //(result);
	    //(userinf);
	    //var userMenu = result.data.lSUserRolesPage;
	    //('Login Success -> ' + JSON.stringify(userinf));
	    userInfo = {userID:userinf.userID,
	    		name:userinf.name,
	    		email:userinf.email,
	    		phone:userinf.phone,
	    		Address:userinf.address,
	    		company:userinf.company,
	    		userRole:userinf.userRole
	    		};
	    $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
	    //('buat liat');
	    //(userInfo);
	    deferred.resolve('hello' +userInfo);
	    
	   }, function(error) {
	    //('Login Error -> ' + JSON.stringify(error));
	   deferred.reject(error);
	  
	   });
	  return deferred.promise;
	 }
	 
	 function logout(accessToken) {
	  var deferred = $q.defer();
	  var config1 = {
	    headers: {
	     'Content-Type': 'application/x-www-form-urlencoded'
	    }
	   }
	  userInfo = null
	  $window.sessionStorage["userInfo"] = null;
	  deferred.resolve(userInfo);
	  return deferred.promise;
	 }
	 
	 function getUserInfo() {
	  ////('getUserInfo -> '+JSON.stringify(userInfo));
	  return userInfo;
	 }
	 
	 function init() {
	  if ($window.sessionStorage["userInfo"]) {
		  userInfo = JSON.parse($window.sessionStorage["userInfo"]);
		  $rootScope.menuView = userInfo.uMenu;
		  ////("ROOT "+JSON.stringify($rootScope.menuView));	  
	  }
	 }
	 init();
	 return {
	  login: login,
	  logout: logout,
	  getUserInfo: getUserInfo
	 };
}]);


app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	var $stateProviderRef = null;
	
	$urlRouterProvider.otherwise(function($injector, $location){
	      $injector.invoke(['$state', function($state) {
	      $state.go('home');
		  }]);
	  })
	  
	  
	  $stateProvider
			.state('login', {
					url: '/login',
					templateUrl: 'View/Page/Login.html',
					controller:'loginCtrl',
					cache: false
			})
			.state('home', {
					abstract: false,
					url: '/',
					templateUrl: 'View/Page/home.html',
					controller: 'homeCtrl',
					resolve: {
						    auth: function($q, authenticationSvc) {
						     var userInfo = authenticationSvc.getUserInfo();
						     if (userInfo) {
						      return $q.when(userInfo);
						     } else {
						      return $q.reject({
						       authenticated: false
						      });
						     }
						    }
						   }
			})
			.state('admin', {
					abstract: false,
					url: '/admin',
					templateUrl: 'View/Page/admin.html',
					controller: 'adminCtrl'
			})
			.state('regis', {
					abstract: false,
					url: '/regis',
					templateUrl: 'View/Page/regis.html',
					controller: 'regisCtrl'
			})
			.state('update', {
					abstract: false,
					url: '/update/',
					templateUrl: 'View/Page/update.html',
					controller: 'updateCtrl'
			})
			.state('user',{
				abstract:false,
				url:'/user',
				templateUrl:'View/Page/user.html',
				controller:'userCtrl'
			})
			.state('absensiIN',{
				abstract:false,
				url:'/trackIN',
				templateUrl:'View/Page/absensi.in.html',
				controller:'absenCtrlIN'
			})
			.state('absensiOUT',{
				abstract:false,
				url:'/trackOUT',
				templateUrl:'View/Page/absensi.out.html',
				controller:'absenCtrlOUT'
			})
	  $urlRouterProvider.deferIntercept();
	  $stateProviderRef = $stateProvider;
});


app.controller('mainCtrl', ['$scope', '$location', '$state', '$rootScope', '$transitions',
    '$mdSidenav','$timeout',function($scope, $location, $state, $rootScope, $transitions, $mdSidenav, $timeout) {
				//("### mainCtrl ###");
				
		$scope.goToState = function(state) {
				//('State: ' + state);
				$state.go(state, {}, {reload: true
				});
			
}
}])

app.run(run);
function run($rootScope, $transitions, $state, $timeout,$window,$http) {
	//("test");
	$rootScope.apiurl = "./api/";
	//$window.sessionStorage["userAbsen"] = null;
	$rootScope.forTime=null;
	$rootScope.forDate=null;
	$rootScope.forDateTime=null;
	$rootScope.restmsg = null;
	$rootScope.updatedUser = null;
	 $http.get($rootScope.apiurl +"run");
	
	//$rootScope.isLoginPage = false;
	$rootScope.menuView = [];
	
	$transitions.onStart({}, function($transition) {
	//("Run ################### ON START ctrl #########  ");
		$rootScope.spinner.on();
		////("Run ## To # ");
		
	 });
	$transitions.onBefore({}, function($transition) {
		////("Run ################### ON START ctrl #########  ");
		$rootScope.spinner.on();
		////("Run ## To # ");
		
	 });
	
	$transitions.onSuccess({}, function($transition) {
		//("Run ################### onSuccess #########  "+$rootScope.restmsg);
		$timeout($rootScope.stoploading, 500);
		//
	 });
	$rootScope.stoploading = function() {
		////("Stop loading ###########");
		$rootScope.spinner.off();
	};
	$transitions.onError({}, function($transition) {
		console.log("Error Run ## To # "+$transition);
		$state.go("login");
	 });
	 $rootScope.spinner = {
		        active: false,
		        on: function () {
		        	////("SPINNER ON");
		         this.active = true;
		        },
		        off: function () {
		       	////("SPINNER OFF");
		          this.active = false;
		        }
		      };
}
app.controller('AppCtrl',function ($scope, $timeout, $mdSidenav,$q,$state,$window,$rootScope) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
      };
    function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      }
    
    var x = sessionStorage.isLoginPage
	    if(x=="true"){
	    	x= true;
	    }else{
	    	x=false;
	    }
    $scope.isLoginPage = x;
    var y = sessionStorage.userInfo;
	    if(y!=null)
	    {
	    	y = JSON.parse(y);
	    	 y = y.userRole;
	    }  
	   
	   
	    if(y=="Admin"){
	    	y= true;
	    }else{
	    	y=false;
	    }
	    
    $scope.isAdmin = y;
    
    $scope.doLogout= function() {	
		  var deferred = $q.defer();
		  $window.sessionStorage.removeItem("userInfo");
		  $window.sessionStorage.removeItem("isRefresh");
		  $window.sessionStorage.removeItem("isLoginPage");
		  $window.sessionStorage.removeItem("updateUser");
		  $window.sessionStorage.removeItem("userAbsen");
		  $window.sessionStorage.removeItem("userEdited");
		  $window.sessionStorage.removeItem("isAdmin");
		  $state.go('login')
		  $window.location.reload();
		  
		 }
    
  });

app.controller('homeCtrl',["$http", "$q", "$window","$rootScope",
						   "$scope","$mdDialog","$state","$mdToast",
						   "base64","getTime","captureValidation"
						   ,"redirectSvc","$location",
						   function($http,$q,$window,$rootScope,
								    $scope,$mdDialog,$state,$mdToast,
								    base64,getTime,captureValidation,
								    redirectSvc,$location) {
	
	
	

	var x = sessionStorage.isRefresh;
	//(x)
    if(x==null){
    	$window.sessionStorage["isRefresh"]=true;
    	//("1")
    	$window.location.reload();
    }
	var userAbsen = sessionStorage.userAbsen;  
	var userInfo = JSON.parse(sessionStorage.userInfo);
	$scope.userInfo = userInfo;
	
	$scope.button = function()
	{		
		captureValidation.getCheckedINUser(userInfo).then
			(
					function(result)
					{
						
						var checkedUser = JSON.parse(result);
						
						if(checkedUser.userOUT == null && checkedUser.userCaptureOUT == null)
						{
							$state.go('absensiOUT')
						}
						else
						{
							 $mdDialog.show(
								      $mdDialog.alert()
								        .parent(angular.element(document.querySelector('#popupContainer')))
								        .clickOutsideToClose(true)
								        .title('Your have already Check IN and OUT. ')
								        .textContent('Please LogOut or contact Administrator for further information.')
								        .ariaLabel('Alert Dialog Demo')
								        .ok('OK')
								        
								    );
						}
						//(checkedUser)
						
				
					},
					function(error){
						////("nodata")
						
						$state.go('absensiIN')
					}
			)
			
	}
	
	
		    
		
	

	
	
 }]);

app.controller('userCtrl',["$http", "$q", "$window","$rootScope",
						   "$scope","$mdDialog","$state","$mdToast",
						   "base64", "httpService","redirectSvc",
						   function($http,$q,$window,$rootScope,$scope,$mdDialog,$state,$mdToast,base64,httpService,redirectSvc) 
						   {
								redirectSvc.onepage(sessionStorage.userInfo,"login")
								var userInfo = JSON.parse(sessionStorage.userInfo);
								var isClick = false;
								redirectSvc.adminCheck(userInfo.userRole);
								var isLate;
								var updateUser;
								var isAbsen="";
								var userEdited;
								var data=JSON.parse(sessionStorage.updateUser);
								var id = data.userID;
								//(id)
								 var parsed;
								
								var config1 = 
								{
									headers: 
									{
										    'Content-Type': 'application/json'
									}
								}
								
								
								$scope.seeUser = JSON.parse(sessionStorage.updateUser);
								
								var result =httpService.getFillteredList(id);
								result.then(function(respond){
									
										var test = JSON.parse(respond);
										var klik;
										$scope.klik=function(stat){
											
											if(isClick == false){
												
												isClick=true;
												
												$scope.sorthasil="userTime"+stat;
												
											}
											else{
												isClick=false;
												
												
												$scope.sorthasil ="-userTime"+stat;
												
												
											}
											
										
										}
										
										
										////////////////////
										
										$scope.isLate = function(timein,timeout){
											var datetime = new Date(timein);
											
											var islate;
											var isearly;
											if(datetime.getHours() >= 8)
											{
											
												
												if(datetime.getMinutes()>0)
												{
													
													islate = true;
													
												}
												else{
													islate =false;
												}
											}
											else
											{
												islate = false;
											}
											
											

											if(timeout != null){
												var datetim = new Date(timeout);
												if(datetim.getHours() >= 17)
												{
													
													isearly = false;
												}
												else
													{
													
														isearly = true;
													}
											}
											else{
												
												isearly = null;
												
											}
										 
											
											
											if((islate == true) || (islate == false && isearly==true))
											{
												return 'red';
											}
											else if(isearly == null)
												{
													return 'yellow';
												}
											else {return 'none'}
											
											
										}
									
										$scope.isNull = function(time){
											
										}
											
											
										
									//$scope.isLate=JSON.parse(isAbsen);
									//console.log($scope.isLate)
									$scope.parsed = test;
									console.log(test.length)
									var number = test.length;
									$scope.pageNumber = number*2;
								    $scope.filteredTodos = []
									  ,$scope.currentPage = 1
									  ,$scope.numPerPage = 5
									  ,$scope.maxSize = 3;
								    $scope.$watch('currentPage + numPerPage', function() {
								        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
								        var end = begin + $scope.numPerPage;
								        
								        $scope.filteredTodos = $scope.parsed.slice(begin, end);
								      });
								   
									//janganlupa
								},function(error){
									////('Failed: ' + error);
									
									$mdToast.show
									(
											$mdToast.simple()
											.textContent("No Data Found!")
											.position('top right')
											.hideDelay(4000)
									);
								}
								
								)			 
								/////////////////////////////////////////
								 $scope.showPhoto = function(id,status) 
								 { 
									 
									 	//(status)
									    var forid;
									 	$rootScope.forstatus=status;
									    $rootScope.forid =id;
									    //($rootScope.forid)
									    $mdDialog.show
									    (
									    		{
											      controller: 'seeThePhoto',
											      templateUrl: 'View/PopupPage/photo.html',
											      parent: angular.element(document.body),
											      
											      clickOutsideToClose:true,
											      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
									    		}
									    )
									    
								  };
								  $scope.link = function(id,status) 
									 { 
										 
										 	//(status)
										    var forid;
										 	$rootScope.forstatus=status;
										    $rootScope.forid =id;
										    //($rootScope.forid)
										    $mdDialog.show
										    (
										    		{
												      controller: 'seeThePhoto',
												      templateUrl: 'View/PopupPage/photo.html',
												      parent: angular.element(document.body),
												      
												      clickOutsideToClose:true,
												      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
										    		}
										    )
										    
									  };
								  $scope.back = function(){
										$state.go('admin');
									}
		    }]);
 

    
app.controller('seeThePhoto',["$http", "$q", "$window","$rootScope","$scope","$mdDialog","$state","$mdToast","base64", function($http,$q,$window,$rootScope,$scope,$mdDialog,$state,$mdToast,base64){
	
	//("uda masuk")
	var forid= $rootScope.forid;
	var forstatus= $rootScope.forstatus;
	var test;
	
	var userFile = JSON.parse(sessionStorage.userEdited);
	//("test")
	//(userFile)
	//(forid)
	if(forstatus=="IN"){
	$scope.test =('src', "data:image/jpg;base64," + userFile[forid].userCaptureIN);
	}else{
		if(userFile[forid].userCaptureOUT==null)
		{
			$scope.test="./assets/picture/empty.png";
			
		}else
		{
		$scope.test =('src', "data:image/jpg;base64," + userFile[forid].userCaptureOUT)
		}
		}
}]);

app.controller('absenCtrlIN',["$http", "$q", "$window","$rootScope","$scope",
							"$mdDialog","$state","$mdToast","base64","getTime",
							"httpService","redirectSvc","captureValidation",
							function($http,$q,$window,$rootScope,$scope,$mdDialog,$state,
									 $mdToast,base64,getTime,httpService,redirectSvc,captureValidation){
	redirectSvc.onepage(sessionStorage.userInfo,'login');
	var currLat;
	var currLong;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (p) {
			//var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
			 currLat = p.coords.latitude;
			 currLong = p.coords.longitude;
			console.log("########## ROT LAT "+currLat);
			console.log("########## ROT LONG "+currLong);
		});
	} else {
		alert('Geo Location feature is not supported in this browser.');
	}
	
	var userInfo = JSON.parse(sessionStorage.userInfo);
	captureValidation.getCheckedINUser(userInfo).then
	(
			
	function(result)
		{
		$state.go('absensiOUT')
		},function(error){
		
			//var x = JSON.parse(result);
			////(x)
		
			
			////(sessionStorage.userAbsen)
			var dataIN;
			var snap;
			Webcam.set({
				  width: 320,
				  height: 240,
				  image_format: 'jpeg',
				  jpeg_quality: 80
				 });
			Webcam.attach( '#my_camera' );		
			
			$scope.snap = function() 
			{	
				Webcam.snap
				 ( 
					function(data) 
						{
							var liat;
							$scope.liat= data;
					 		dataIN=data;
					 	
						}
				 );
				
				 //////////////////time declaration////////////////////////////////////////////////////////
				 getTime.getCurrentDateTime();
				 var date = getTime.getDateTime;
				 var afterLogin = getTime.getDateOnly;
				 var status='IN';
				 dataIN = dataIN.replace(/^data\:image\/\w+\;base64\,/,'');
				 //////////////////////////data to submit////////////////////////////////////////////////////////////////////////////
		 		
						 absenData=
						 {
							"userID": userInfo.userID,
							"userCaptureIN" : dataIN,
							"userIN" : date,
							"afterLogin" : afterLogin,
							"locationin" : currLat+","+currLong
						 }
						
						 var dummy = JSON.stringify(absenData);		
						 console.log(dummy)
						 //		 post check in
							httpService.absenPost(dummy,status);		
				
				 
			}
		
			
		}
	)
}]);
app.controller('absenCtrlOUT',["$http", "$q", "$window","$rootScope","$scope",
				"$mdDialog","$state","$mdToast","base64","getTime",
				"httpService","redirectSvc","captureValidation",
				function($http,$q,$window,$rootScope,$scope,$mdDialog,$state,
						 $mdToast,base64,getTime,httpService,redirectSvc,captureValidation){
			redirectSvc.onepage(sessionStorage.userInfo,'login');
			var userInfo = JSON.parse(sessionStorage.userInfo);
			var currLat;
			var currLong;
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (p) {
					//var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
					currLat = p.coords.latitude;
					currLong = p.coords.longitude;
					console.log("########## ROT LAT "+currLat);
					console.log("########## ROT LONG "+currLong);
				});
			} else {
				alert('Geo Location feature is not supported in this browser.');
			}
	captureValidation.getCheckedINUser(userInfo).then
		(
				
		function(result)
			{
			var x = JSON.parse(result);
			if(x.userOUT==null && x.userCaptureOut==null)
				{
				
				}
			else
				{
					$state.go("home");
				}
		
			
			//var userAbsen = JSON.parse(sessionStorage.userAbsen)
			var dataOUT;
			var snap;
			
			Webcam.set({
				width: 320,
				height: 240,
				image_format: 'jpeg',
				jpeg_quality: 80
				});
			Webcam.attach( '#my_camera' );		
			
			$scope.snap = function() 
			{	
				Webcam.snap
				( 
					function(data) 
					{
						var liat;
						$scope.liat= data;
						dataIN=data;
			
					}
			);
			
			//////////////////time declaration////////////////////////////////////////////////////////
			getTime.getCurrentDateTime();
			var date = getTime.getDateTime;
			//(date)
			var afterLogin = getTime.getDateOnly;
			var status='OUT';
			dataIN = dataIN.replace(/^data\:image\/\w+\;base64\,/,'');
			//////////////////////////data to submit////////////////////////////////////////////////////////////////////////////
			
			absenData=
			{
					"userID": userInfo.userID,
					"userCaptureOUT" : dataIN,
					"userOUT" : date,
					"afterLogin" : afterLogin,
					"locationout" :currLat+","+currLong
			}
			//(absenData)
				var dummy = JSON.stringify(absenData);		 							 
				//		 post check in
			httpService.absenPut(dummy,status);		
			
			
			}
			},function(error){
				$state.go('absensiIN')
			})
}]);
app.controller('adminCtrl', ["$http", "$q", "$window","$rootScope","$scope","$mdDialog",
							 "$state","$mdToast","redirectSvc","httpService",
							 function($http,$q,$window,$rootScope,$scope,$mdDialog,$state,$mdToast,redirectSvc,httpService) {
			
			redirectSvc.onepage(sessionStorage.userInfo,"login")
			
			//(sessionStorage.userInfo)
			var userInfo = JSON.parse(sessionStorage.userInfo);
			redirectSvc.adminCheck(userInfo.userRole);
			
				var x = sessionStorage.isRefresh;
				//(x)
			    if(x==null){
			    	$window.sessionStorage["isRefresh"]=true;
			    	
			    	$window.location.reload();
			    }
				
				$scope.isLoginPage = true;
				
				
						var deferred = $q.defer();
						//("adminCtrl ################################");
							
							 var userInfo;
							 var usrinf;
							 var parsed;
							 var userlist;
							 var y;		  
							  
							  var config1 = 
							  {
									  headers: 
									  	{
										  'Content-Type': 'application/json'
									  	}
							  } 
					
							  
							 $http.get($rootScope.apiurl +"/user", config1)
							   .then(function(result) 
									   {
								   
										   y=result.data;
										   userlist = JSON.stringify(result.data);
										   usrinf = JSON.parse(userlist);
										   //console.log(userlist);					   
										   var number= result.data.length;
										   var getnumber;
										  		  
										  // console.log($scope.search)
										    $scope.parsed = usrinf;
										    $scope.pageNumber = number *2;
										    $scope.filteredTodos = []
											  ,$scope.currentPage = 1
											  ,$scope.numPerPage = 5
											  ,$scope.maxSize = 5;
										    $scope.$watch('currentPage + numPerPage', function() {
										        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
										        var end = begin + $scope.numPerPage;
										        
										        $scope.filteredTodos = $scope.parsed.slice(begin, end);
										      });
							    
									   }, 
							   	function(error) 
							   	{
								   //('Login Error -> ' + JSON.stringify(error));
								   deferred.reject(error);
							  
							   	});
							  
							  
							 
							 //delete
								$scope.doDelete = function(clickedid){
									 var confirm = $mdDialog.confirm()
							          .title('Are you sure want to delete this ID?')
							          .textContent('This action cannot be undone!')
							          .ariaLabel('Lucky day')				          
							          .ok('Yes')
							          .cancel('no');
			
									//(clickedid);
								
									
									$mdDialog.show(confirm)
										.then(
													function() 
														{
															$http.delete($rootScope.apiurl+"delete/"+clickedid)
																.then(
																			function()
																			{
																				//("delete berhasil")
																				//$scope.refresh();
																				$state.reload();
																				$mdToast.show
																				(
																						$mdToast.simple()
																							.textContent("Delete Success!")
																							.position('top right')
																							.hideDelay(4000)
																				);
																			},
																			function()
																				{
																					//('delete error ' + JSON.stringify(error));
																					deferred.reject(error);
																				}
																	   )
														}
													, 
													function() 
														{
															$state.reload();
														}
											);
								
								}
								
								//update
								$scope.doBeforeUpdate = function(id)
								{
									var updateUser;
									for (var i = 0; i < usrinf.length; i++) 
										{								
											if(usrinf[i].userID == id)
											{
												$window.sessionStorage["updateUser"]= JSON.stringify(usrinf[i]);
												
											}
										}
										
										$state.go('update')
									
									
								}
								
								//user
								$scope.seeUser = function(id)
								{
									var updateUser;
									//(id)
									for (var i = 0; i < usrinf.length; i++) 
									{							
										if(usrinf[i].userID == id)
										{
											$window.sessionStorage["updateUser"]= JSON.stringify(usrinf[i]);
											
										}
									}
									$state.go('user');
									//$state.reload();
								}
								//back
								
							 
						
					
		


}]);

app.controller('updateCtrl', ["$http", "$q", "$window","$rootScope","$scope","$mdDialog","$state","$mdToast","redirectSvc", function($http,$q,$window,$rootScope,$scope,$mdDialog,$state,$mdToast,redirectSvc) {
	//("updateCtrl ################################");
	//("masuk")
				$scope.states = ('Admin User').split(' ').map(function(state) {
		        return {abbrev: state};
		      });
				
				redirectSvc.onepage(sessionStorage.userInfo,"login")
				var userInfo = JSON.parse(sessionStorage.userInfo);
				redirectSvc.adminCheck(userInfo.userRole);
				var updateUser;
				var updatedUserData;
				var config1 = {
						   headers: {
						    'Content-Type': 'application/json'
						   }
						  }
				//(sessionStorage.updateUser)
				var data=JSON.parse(sessionStorage.updateUser);
				$scope.updateUser = JSON.parse(sessionStorage.updateUser);
				var id = data.userID;
			//	var userrole = $scope.userrole;
			//	//($scope.userrole)
				$scope.doUpdate = function() {
					
					updatedUserData ={
							"userID" : $scope.updateUser.userID,
							"name" : $scope.updateUser.name,
							"email" : $scope.updateUser.email,
							"password" : $scope.updateUser.password,
							"company" : $scope.updateUser.company,
							"userRole" : $scope.modelrole,
							"phone" : $scope.updateUser.phone,
							"address" : $scope.updateUser.address
						}
						//(updatedUserData)
						
						$http.put($rootScope.apiurl +"/update/"+id, updatedUserData, config1)
						.then(function(result){
							//("kelar mzz"+result)
							$mdToast.show(
									$mdToast.simple()
									    .textContent("Update Success!")
									    .position('top right')
									    .hideDelay(4000)
									);
							//blm di nullin
							$state.go('admin');
							
						},function(error){
							$mdToast.show(
									$mdToast.simple()
									    .textContent("Update Fail!")
									    .position('top right')
									    .hideDelay(4000)
									);
							
						}						
						)
				
				
				}
				
				$scope.Print = function(){
			        alert($scope.modelrole);
			}
				

}]);

app.controller('loginCtrl', ['$scope', '$location', '$state', '$rootScope', '$transitions',
    '$mdSidenav','$timeout','$mdToast','$window','$stateParams','authenticationSvc','$location',function($scope, $location, $state, $rootScope,
    		$transitions, $mdSidenav, $timeout, $mdToast, $window, $stateParams,authenticationSvc,$location) {
	var x = sessionStorage.isLoginPage
	    if(x=="true"){
	    	x= true;
	    }else{
	    	x=false;
	    }
	 if(x==true){
		 $state.go("home")
	 }
	
		
				
				$scope.usermail;
				$scope.userpwd;
				var page = $stateParams.page;
				//("# LOGIN TO "+page);
				
				
				$scope.doLogin = function() 
				{
					
					//("################# "+$scope.usermail);
					var mydata = JSON.stringify({email:$scope.usermail, password:$scope.userpwd});
					var resultStr = authenticationSvc.login($scope.usermail, $scope.userpwd);					
					resultStr.then(function(greeting) 
							{
																	
								$rootScope.menuView=greeting.uMenu;
							    $rootScope.spinner.off();
							    $window.sessionStorage["isLoginPage"]=true;
								$rootScope.isLoginPage=true;
								
								var usrinfo = JSON.parse(sessionStorage.userInfo);
								
								//(usrinfo);
								if(usrinfo.userRole == "Admin")
									{
										$state.go("admin")
										
									}
								else
									{
										$state.go("home");
										
									}
								
							}, 
								function(reason) 
								{
									//('Failed: ' + reason);
									$rootScope.isLoginPage=true;
									$rootScope.spinner.off();
									$mdToast.show
									(
											$mdToast.simple()
											.textContent("User name and password is unrecognized!")
											.position('top right')
											.hideDelay(4000)
									);
								}
							)
				



}
}]);


app.controller('regisCtrl', ['$scope', '$location', '$state', '$rootScope', '$transitions',
    '$mdSidenav','$timeout','$mdToast','$window','$stateParams','$http','$q',"redirectSvc",function($scope, $location, $state, $rootScope,
    		$transitions, $mdSidenav, $timeout, $mdToast, $window, $stateParams,$http,$q,redirectSvc) {
				$scope.states = ('Admin User').split(' ').map(function(state) {
		        return {abbrev: state};
		      });
				redirectSvc.onepage(sessionStorage.userInfo,"login")
				var userInfo = JSON.parse(sessionStorage.userInfo);
				
				redirectSvc.adminCheck(userInfo.userRole);	
				//("regisCtrl ################################");
				$rootScope.isLoginPage = true;
				$scope.username;
				$scope.userpassword;
				$scope.userID;
				$scope.usermail;
				$scope.useraddress;
				$scope.userrole;
				$scope.userphone;
				$scope.usercompany;
				var page = $stateParams.page;
			$scope.doRegis = function() {
				var deferred = $q.defer();
				var config1 = 
					{
						   headers: 
						   {
							    'Content-Type': 'application/json'
						   }
					}
				//("################# "+$scope.userID);
				var mydata = JSON.stringify({userID:$scope.userID,name:$scope.username,password:$scope.userpassword,email:$scope.usermail,phone:$scope.userphone,company:$scope.usercompany,userRole:$scope.userrole,address:$scope.useraddress});
				//(mydata) 
				$http.post($rootScope.apiurl +"add", mydata, config1)
				   .then(function(result) {
					   $mdToast.show
						(
								$mdToast.simple()
								.textContent("Register Success!")
								.position('top right')
								.hideDelay(4000)
						);
					   $state.go('admin')
				   }, function(error) {
					   $mdToast.show
						(
								$mdToast.simple()
								.textContent("Register Failed!")
								.position('top right')
								.hideDelay(4000)
						);
				   deferred.reject(error);
				  
				   });
				  return deferred.promise;
				 }
				//var resultStr = authenticationSvc.login($scope.username, $scope.userpwd);
			
				




}]);


