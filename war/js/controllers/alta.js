app.controller("alta",[
	'$scope',
	'$routeParams',
	'$http',
	'$location',
	'$window','sessionService',
	function($scope,$routeParams,$http,$location, $window,sessionService){
		$scope.guardar = function(tipo){
			if(tipo=== undefined){
				 document.getElementById("selected").focus();
				 return;
			}
			if(tipo=="cliente"){
				$http.get('/load/clientes',$scope.send).then(function(response) {
					alert("Operacion Exitosa");
					$scope.send = null
				})
			}
			if(tipo=="cuenta"){
				$http.get('/load/cuentas',$scope.send).then(function(response) {
					alert("Operacion Exitosa");
					$scope.send = null
				})
			}
			if(tipo=="empresa"){
				$http.get('/load/empresas',$scope.send).then(function(response) {
					alert("Operacion Exitosa");
					$scope.send = null
				})
			}
		}
	}]);