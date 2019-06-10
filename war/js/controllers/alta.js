app.controller("alta",[
	'$scope',
	'$routeParams',
	'$http',
	'$location',
	'$window','sessionService',
	function($scope,$routeParams,$http,$location, $window,sessionService){
		$scope.btndis=false;
		$scope.guardar = function(tipo){
			$scope.btndis=true;
			if(tipo=== undefined){
				 document.getElementById("selected").focus();
				 $scope.btndis=false;
				 return;
			}
			if(tipo=="cliente"){
				$http.post('/load/clientes',$scope.send).then(function(response) {
					alert("Operacion Exitosa");
					$scope.send = null
				},
	            function (response) {
	                if (response.status === 500) {
	                   alert("["+response.status+"] "+response.statusText);
	                }
	            })
			}
			if(tipo=="cuenta"){
				$http.post('/load/cuentas',$scope.send).then(function(response) {
					alert("Operacion Exitosa");
					$scope.send = null
				},
	            function (response) {
	                if (response.status === 500) {
	                	alert("["+response.status+"] "+response.statusText);
	                }
	            })
			}
			if(tipo=="empresa"){
				$http.post('/load/empresas',$scope.send).then(function(response) {
					alert("Operacion Exitosa");
					$scope.send = null
				},
	            function (response) {
	                if (response.status === 500) {
	                	alert("["+response.status+"] "+response.statusText);
	                }
	            })
			}
			$scope.btndis=false;
		}
	}]);