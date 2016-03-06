'use strict';
app.factory('loginService',function($http, $location, sessionService){
	return{
		login:function(data,$scope){
			/*
			var a = {};
			a["key1"] = "value1";
			a["key2"] = "value2";
			$http({ method: 'POST',
					url: 'http://localhost:8080/GP.OBD2/ServerServlet', 
					headers: {'Content-Type': 'application/json'},
					data: data })
					.success(function (data){} );
					console.log(data);
					*/
			var $promise=$http.post('http://localhost:8080/GP.OBD2/ServerServlet',data); //send data to user.php
			$promise.then(function(msg){
				var uid=msg.data;
				if(uid){
					
					//scope.msgtxt='Correct information';
					sessionService.set('uid',uid);
					$location.path('/home');
					console.log(uid);
				}
				else  {
				  $scope.msgtxt='not correct';
				  $location.path('/login');

				}
			});
		},
		logout:function(){
			sessionService.destroy('uid');
			$location.path('/login');
		},
		islogged:function(){
			//var $checkSessionServer=$http.post('data/check_session.php');
			var $checkSessionServer=sessionService.get('uid')
			
			return $checkSessionServer;
			/*
			if(sessionService.get('user')) return true;
			else return false;
			*/
		}
	}

});
