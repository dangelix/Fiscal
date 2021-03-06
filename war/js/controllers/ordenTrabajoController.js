function showAlert(mensaje, window){
	var x = document.getElementById("snackbar")
    x.className = "show";
	x.textContent=mensaje;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
 //   setTimeout(function(){ window.location.reload(); }, 3000);
}

app.service("ordenTrabajoservice",['$http', '$q', function($http, $q){
	this.data=function(data){
		var dataClient={};
	}; 
	
	this.loadCliente = function(id) {
		var d = $q.defer();
	
		$http.get("clientes/find/"+id).then(function(response) {
				d.resolve(response.data);
			});
		return d.promise;
	}
	
	this.loadBrocker=function(id){
		var d = $q.defer();
		$http.get("/brockers/buscarID/"+id).then(function(response) {
			d.resolve(response.data);
		}, function(response) {
			if(response.status==403){
				alert("No tiene permiso de realizar esta acción");
			}
		});
		return d.promise;
	}
	
	this.eliminarPago=function(id){
		var d = $q.defer();
		$http.post("/pagos/eliminar/",id).then(function(response) {
			d.resolve(response.data);
		}, function(response) {
			if(response.status==403){
				alert("No tiene permiso de realizar esta acción");
			}
		});
		return d.promise;
	}
	
	this.consultarClientesTodos = function() {
		var d = $q.defer();
		$http.get("/clientes/getPagina/1").then(function(response) {
			d.resolve(response.data);
		}, function(response) {
			if(response.status==403){
				alert("No tiene permiso de realizar esta acción");
				//$location.path("/login");
			}
		});
		return d.promise;
	}
	
	this.buscarClientes = function(buscar) {
		var d = $q.defer();
		$http.get("/clientes/buscar/"+buscar).then(function(response) {
			d.resolve(response.data);
		}, function(response) {
			if(response.status==403){
				alert("No tiene permiso de realizar esta acción");
				//$location.path("/login");
			}
		});
		return d.promise;
	}
	this.buscarBroker = function(buscar) {
		var d = $q.defer();
		$http.get("/brockers/buscar/"+buscar).then(function(response) {
			d.resolve(response.data);
		}, function(response) {
			if(response.status==403){
				alert("No tiene permiso de realizar esta acción");
				//$location.path("/login");
			}
		});
		return d.promise;
	}
	this.searchEmpresa = function(buscar) {
		var d = $q.defer();
		$http.get("/empresa/buscar/"+buscar).then(function(response) {
			d.resolve(response.data);
		}, function(response) {
			if(response.status==403){
				alert("No tiene permiso de realizar esta acción");
				//$location.path("/login");
			}
		});
		return d.promise;
	}
	
	this.loadPendientes = function(page) {
		var d = $q.defer();
		$http.get("/movimientos/load/"+page).then(
			function(response) {
				d.resolve(response.data);
			});
		return d.promise;
	}
	
	this.getPaginasPendientes = function(page) {
		var d = $q.defer();
		$http.get("/movimientos/paginas").then(
			function(response) {
				d.resolve(response.data);
			});
		return d.promise;
	}
	
	this.consultarCuentasPorBanco = function(banco){
		var d = $q.defer();
		$http.get("/cuentas/getTipo/"+banco).then(
			function(response) {
				d.resolve(response.data);
			});
		return d.promise;		
	}
	
	this.loadot = function(id) {
		var d = $q.defer();
	
		$http.get("/ots/find/"+id).then(
			function(response) {
				d.resolve(response.data);
			});
		return d.promise;
	}
	this.loadotPend = function(id) {
		var d = $q.defer();
	
		$http.get("/movimientos/find/"+id).then(
			function(response) {
				d.resolve(response.data);
			});
		return d.promise;
	}
	this.addot=function(ot){
		var d = $q.defer();
		$http.post("ots/add/",ot).then(
			function(response) {
				console.log("guarda ot");
				d.resolve(response.data);
			});
		return d.promise;
	}
	
	this.addMov=function(movimientosvo){
		var d = $q.defer();
		$http.post("ots/addMovimiento/",movimientosvo).then(
			function(response) {
				console.log("add mov");
				d.resolve(response.data);
			});
		return d.promise;
	}
	
	this.updateot=function(mov){
		var d = $q.defer();
		$http.post("movimientos/update/",mov).then(
			function(response) {
				console.log("update mov");
				d.resolve(response.data);
			});
		return d.promise;
	}
	
	this.cerrarOt=function(ot){
		var d = $q.defer();
		$http.post("ots/update/",ot).then(
			function(response) {
//				console.log("update mov");
				d.resolve(response.data);
			});
		return d.promise;
	}
	
	this.cancelaMov= function(mov){
		var d = $q.defer();
		$http.post("movimientos/cancelar/",mov).then(
			function(response) {
				console.log("update mov");
				d.resolve(response.data);
			});
		return d.promise;
	}
	
	this.guardaBrocker=function(brocker){
		var d = $q.defer();
		$http.post("clientes/update/",brocker).then(
			function(response) {
				d.resolve(response.data);
			});
		return d.promise;
	}
	
	this.guardaCliente=function(clientes){
		var d = $q.defer();
		$http.post("clientes/update/",clientes).then(
			function(response) {
				d.resolve(response.data);
			});
		return d.promise;
	}
	
}]);

app.service("operacionesMovimientosService",['$http', '$q', function($http, $q){
	objetos= {otvo:null, c:null, b:null};
	this.addOper= function(operacion, operaciones, otVO, bndResguardo,cliente, brockerCliente,brokerSel){
		var moneda= otVO.pagos[0].moneda;
		if(operaciones.tipo == 'Cheque'){
			if(operaciones.fEmision && operaciones.tipo != null && operaciones.descripcion != null && operaciones.monto != null){
				var renglon= {tipo: operaciones.tipo, descripcion: operaciones.descripcion , monto: operaciones.monto, estatus:operaciones.estatus, 
								montoLetra: operaciones.montoLetra, fEmision:operaciones.fEmision, pagarA:operaciones.pagarA}
			}else{
				alert("Faltan campos por llenar");
			}
		}else{
			if(bndResguardo){
				
				var renglon= {tipo: operaciones.tipo, descripcion: operaciones.descripcion , monto: operaciones.monto, estatus:"AUTORIZADO",resguardo:true}
			
			}else{
				if(operaciones.tipo != null && operaciones.descripcion != null && operaciones.monto != null){
					var renglon= {tipo: operaciones.tipo, descripcion: operaciones.descripcion , monto:operaciones.monto, estatus:operaciones.estatus}
				}else{
					alert("Faltan campos por llenar");
				}
			}
		}
		if(operacion=="OPC"){
			renglon.idCliente=cliente.id;
		}else{
			renglon.idCliente= operaciones.idCliente;
		}
	
		if(operacion=='OPC'){
			if(bndResguardo && otVO.ot){
				if(moneda=='MXN'){
					cliente.saldo = cliente.saldo + operaciones.monto;
				}else{
					if(!cliente.saldoUSD){
						cliente.saldoUSD=0;
					}
					cliente.saldoUSD= cliente.saldoUSD + operaciones.monto;
				}
			}
			otVO.movimientos.push(renglon);
		}else{
			if(bndResguardo && otVO.ot){
				if(brokerSel){
					brokerSel.saldo= brokerSel.saldo + operaciones.monto;
				}else{
					brockerCliente.saldo = brockerCliente.saldo + operaciones.monto;
				}
			}
			otVO.comisiones.push(renglon);
		}
		objetos.otvo=otVO;
		objetos.c= cliente;
		objetos.b= brockerCliente;
		objetos.broker= brokerSel;
		return objetos;
	} 
	
	this.isResguardo=function(operacion, operaciones,bndResguardo, datos, SldBk){
		objetos={op: null,datos: null, resguardo:null}
		if(operaciones.tipo=='Resguardo'){
			var mensaje = confirm("Esta opci\u00F3n mueve el saldo actual a la cuenta de resguardo.. Deseas continuar?");
			if (mensaje) {
				bndResguardo = true;
				if(operacion=='OPC'){
					datos.saldoMov= datos.saldoMov * 1;					
					if(datos.saldoMov > 0){
						operaciones.monto= datos.saldoMov;
						operaciones.descripcion= "Se va saldo a cuenta de resguardo";
						datos.saldoMov= 0;
					}else{
						alert("No se tiene saldo acumulado");
						bndResguardo = false;
						operaciones.descripcion ="";
					}
				}else{
					SldBk= SldBk * 1;	
					if(SldBk > 0){
						operaciones.monto= SldBk;
						operaciones.descripcion= "Se va saldo a cuenta de resguardo";
						datos.saldoCom= datos.saldoCom - SldBk;
					}else{
						alert("No se tiene saldo acumulado");
						bndResguardo = false;
						operaciones.descripcion ="";
					}
				}
			}
		}else{
			operaciones.descripcion ="";
			bndResguardo = false;
		}
		objetos.op= operaciones;
		objetos.datos= datos;
		objetos.resguardo= bndResguardo;
		return objetos;
	}
	
	this.detalleCheque=function(index, operacion, otVO, cheque){
		if(operacion == 'OPC'){
			cheque.fEmision=otVO.movimientos[index].fEmision;
			cheque.pagarA=otVO.movimientos[index].pagarA;
			cheque.monto=otVO.movimientos[index].monto;
			cheque.montoLetra=otVO.movimientos[index].montoLetra;
		}
		if(operacion == 'OPA'){
			cheque.fEmision=otVO.comisiones[index].fEmision;
			cheque.pagarA=otVO.comisiones[index].pagarA;
			cheque.monto=otVO.comisiones[index].monto;
			cheque.montoLetra=otVO.comisiones[index].montoLetra;
		}
		return cheque;
	}
	
	this.verificarSaldo=function(operacion,otvo, ot,operaciones,monto,suma,tipoOP,totalOP,montorest,OPCSaldo){
		objetos={ error: null, saldo:null};
		var cantidad = 0;
		var btndisble="false";
		var montoOp=0;
		if(operaciones.monto){
			montoOp=operaciones.monto;
		}
		
		if(operacion== 'OPC'){
			if(otvo.movimientos.length != 0){
				if(tipoOP=="total"){
					cantidad= calcularSaldo(montoOp,tipoOP,otvo.movimientos,monto,ot.importe,totalOP-montorest);
				}else{
					var totalrest= totalOP-montorest;
					cantidad= calcularSaldo(montoOp,tipoOP,otvo.movimientos,monto,ot.importe,totalOP,totalrest);
				}
			}else{
				
				if(tipoOP=="base"){
//				cantidad= ((parseFloat(monto) + parseFloat(ot.importe)) - montoOp).toFixed(2);
					cantidad= (parseFloat(totalOP) - montorest).toFixed(2);
					if(operaciones.monto){
						cantidad= ((parseFloat(totalOP) - montorest)-operaciones.monto).toFixed(2);
						
					}
				}else 
					if( !operaciones.monto!=0){
					cantidad= (parseFloat(totalOP) - montorest).toFixed(2);
				}else
				{
					cantidad= (parseFloat(OPCSaldo) - montoOp).toFixed(2);
				}
			}
		}else{
			if(otvo.comisiones.length != 0){
				cantidad=calcularSaldo(montoOp,tipoOP,otvo.comisiones,suma,0,totalOP);
			}else{
				cantidad= (parseFloat(suma) - parseFloat(montoOp)).toFixed(2);
			}
			
		}
		if(cantidad >= 0 ){
			objetos.saldo= cantidad;
			objetos.error= " ";
			btndisble=false;
			
		}else{
			objetos.error="* ERROR: EL monto sobrepasa el saldo establecido *"; 
			btndisble=true;
//			console.log(btndisble);
		}
		
		return objetos;
	}
	this.verificarSaldoOP=function(operacion,tipoOP,otvo, ot,operaciones,monto,suma,montoComi){
		objetos={ error: null, saldo:null};
		var cantidad = 0;
		var btndisble="false";
		
		if(operacion== 'OPC'){
			if(otvo.movimientos.length != 0){
				if(tipoOP=="total"){
					cantidad= calcularSaldoOP(operacion,operaciones.monto,otvo.movimientos,monto,ot.importe,ot.total,tipoOP,montoComi,suma);
				}else{
					cantidad= calcularSaldoOP(operacion,operaciones.monto,otvo.movimientos,monto,ot.importe,ot.total,tipoOP,montoComi,suma);
				}
			}else{
				
				if(tipoOP=="base"){
				cantidad= ((parseFloat(monto) + parseFloat(ot.importe)) - operaciones.monto).toFixed(2);
				}else 
					if( !operaciones.monto!=0){
					cantidad= (parseFloat(totalOP) - montorest).toFixed(2);
				}else
				{
					cantidad= (parseFloat(OPCSaldo) - operaciones.monto).toFixed(2);
				}
			}
		}else{
			if(otvo.comisiones.length != 0){
				cantidad=calcularSaldoOP(operacion,operaciones.monto,otvo.movimientos,monto,ot.importe,ot.total,tipoOP,montoComi,suma,otvo.comisiones,ot.montoBrok);
			}else{
				cantidad= (parseFloat(suma) - parseFloat(operaciones.monto)).toFixed(2);
			}
			
		}
		if(cantidad >= 0 ){
			objetos.saldo= cantidad;
			objetos.error= " ";
			btndisble=false;
			
		}else{
			objetos.error="* ERROR: EL monto sobrepasa el saldo establecido *"; 
			btndisble=true;
//			console.log(btndisble);
		}
		
		return objetos;
	}
	
	
	
}]);

app.controller("OTsAddController",['$rootScope', '$route','$scope','$cookieStore', '$window', '$location', 'ordenTrabajoservice','cuentaservice','operacionesMovimientosService','userFactory','empresaservice','brockerservice', function($rootScope,$route, $scope, $cookieStore, $window, $location, ordenTrabajoservice,cuentaservice,operacionesMovimientosService, userFactory,empresaservice,brockerservice){
	$rootScope.perfilUsuario = userFactory.getUsuarioPerfil();  //obtener perfl de usuario para pintar el menú al qe tiene acceso
	$scope.perfil=$rootScope.perfilUsuario;
	console.log("El Perfil",$scope.perfil);
	$scope.esconderBotones=false;
	empresaservice.load(1).then(function(data) {
		$scope.empresa = data;
		$scope.operaciones.monto=0;
	});
	
	$scope.bancos = catalogoBancos();
	$scope.tablaPagos= false;
	$scope.tablaOper= false;
	$scope.tablaOperAsesor=false;
	$scope.cuentas=null;
	$scope.montoRetorno=null;
	$scope.brokers = [{id:1, nombre: "Broker1", porBrok: null,montoBrok: null }];
	$scope.operacion = {tipo: null, descripcion: null , monto: null, estatus:null};
	$scope.errorSaldo=" ";
	$scope.tipoResguardo = false;
	$scope.tiposOp = TiposOperacion();
	$scope.clienteSeleccionado=false;
	$scope.notificacion=true;
	$scope.idBroker=null;
	$scope.nickBrokker=null;
	$('#alert').change(function () {
		 if ($(this).prop('checked')){
			 $scope.notificacion=true;
			    console.log('Se enviara Notificacion',$scope.notificacion);
			  }else{
				  $scope.notificacion=false;
				  console.log('no se enviara Notificacion',$scope.notificacion); 
			  }
	});
	$scope.$watch('busca',function(){
//		if($scope.busca.length>3){
			$scope.buscar();
//		}
	},true);
	
	$scope.$watch('empresaSearch',function(){
		if($scope.empresaSearch.length>3){
			$scope.zEmpresa();
		}
	},true);
	
	$scope.$watch('buscaBroker',function(){
		if($scope.buscaBroker.length>1){
			$scope.buscarBK();
		}
	},true);
	$scope.dataBroker=[];
	$scope.disabled=true;
	$scope.buscarBK=function(){
		brockerservice.buscarBrockers($scope.buscaBroker).then(function(data){
			
			$scope.encontrados=[];
			for(var i=0; i< data.length; i++){
				$scope.encontrados.push(data[i].nickname);
				
			}
			$scope.bk=data;
			$('#searchBroker').typeahead({

			    source: $scope.encontrados,

			    updater:function (item) {
			    	var ind=$scope.encontrados.indexOf(item);
			    	$scope.brokerSeleccionado=true;
			    	if($scope.brokerSeleccionado==true){
			    		console.log("El Broker se selecciono",$scope.bk[ind]);
			    		$scope.disabled=false;
			    		
			    	}
			    	$scope.dataBroker.id= $scope.bk[ind].id;
			    	$scope.dataBroker.nombre= $scope.bk[ind].nickname;
			    	console.log("datos de brocker ID:",$scope.dataBroker.id,"Nombre: ",$scope.dataBroker.nombre)
			        return item;
			    }
			});
			$('#searchBroker').data('typeahead').source=$scope.encontrados;
		});
	}
	$scope.validaBroker=function(broker){
		
		$scope.disabled=false;
		for( var i in $scope.brokers){
		
			if($scope.brokers[i].nombre == broker){
				alert("Este Broker ya se ha seleccionado");
				$scope.disabled=true;
				
			}else{
				
				$scope.disabled=false;
			}
		}
		
	};
	$scope.tipoOP="base";
	$scope.disablecomi=true;
	$scope.Operacion=function(op){
		if(op=='base'){
			$scope.tipoOP="base";
			$scope.datos.basecomisiones=$scope.datos.importe;
			$scope.datos.basecomisiones=$scope.datos.basecomisiones*1;
			$scope.disablecomi=true;
			$scope.cImporte();
//			console.log("ES Base");
			$scope.tipoad="base";
			$scope.porcentaje("base");
			
		}else{
			$scope.tipoOP="total";
			$scope.datos.basecomisiones=$scope.datos.total;
//			console.log("ES Total");
			$scope.disablecomi=false;
			$scope.cImporte();
			$scope.tipoad="total";
			$scope.porcentaje("total");
		}
		
	};
	$scope.porcentaje=function(data){
//		if(data=="base"){
//			$scope.datos.porciento=(100/$scope.datos.importe)*$scope.datos.basecomisiones;
//		}else{
//			$scope.datos.porcenta=(100/$scope.datos.basecomisiones)*$scope.datos.total;
//		}
	}
	$scope.bk=[];
	brockerservice.consultarBrockersAll().then(function(data){
		$scope.bk=data;
		var index=$scope.bk.length;
		console.log("Lista de Brockers", data)
	});
	$scope.getAsesor=function(){
		
		for (var i = 0; i < $scope.bk.length; i+=1) {
			  if($scope.cliente[0].idBrocker==$scope.bk[i].id){
				  $scope.namebk=$scope.bk[i].nickname;
				  $scope.idbk=$scope.bk[i].id
				  console.log("Match",  $scope.namebk);
			  }
			}
	}
	$scope.tipoad="base";
	$( "#comisiones" ).change(function() {
		$scope.comis();
		$scope.porcentaje($scope.tipoad);
		});
	
	$scope.nombreBroker=function(id){
		for(var i =0; i< $scope.brokers.length; i++){
			if($scope.brokers[i].id == id){
				return $scope.brokers[i].nombre;
			}
		}
		return "";
	}
	
	$scope.insBroker=function(data){
		var x = document.getElementById("slcbk").selectedIndex;
		console.log("Broker Tomado con el index", $scope.brokers[x]);
//		$scope.mxvalue=$scope.brokers[x].montoBrok;
		console.log("Dato Tomado del Select", data);
		$scope.brockerCliente.id =data
		$scope.brokerSelected={};
		var suma= 0;
		var totalb=0;
		$scope.operaciones.idCliente=data;
		for(var i =0; i< $scope.brokers.length; i++){
			if($scope.brokers[i].id == data){
				totalb= $scope.brokers[i].montoBrok;
				break;
			}
		}
		for(var i =0; i < $scope.otVO.comisiones.length; i++){
			if($scope.otVO.comisiones[i].idCliente == data){
				suma+= $scope.otVO.comisiones[i].monto;
			}
		}
		
		$scope.mxvalue= totalb-suma;
	}
	$scope.clearMovAsesor=function(){
		$scope.data.bk=null;
		$scope.mxvalue=null;
	}
	$scope.buscar=function(){
		ordenTrabajoservice.buscarClientes($scope.busca).then(function(data){
			
			$scope.encontrados=[];
			for(var i=0; i< data.length; i++){
				$scope.encontrados.push(data[i].nickname);
				
			}
			$scope.cliente=data;
			
//			$scope.tipos=data.tipos;
			
			$('#searchBox').typeahead({

			    source: $scope.encontrados,

			    updater:function (item) {
			    	var ind=$scope.encontrados.indexOf(item);
			    	$scope.clienteSeleccionado=true;
			    	if($scope.clienteSeleccionado==true){
			    		console.log("El cliente se selecciono",$scope.cliente);
			    		if($scope.cliente[ind].idBrocker==null){
			    			alert("El cliente no tiene Brocker asignado");
			    		}
			    		if($scope.cliente[ind].responsable==null){
			    			alert("El cliente no tiene Responsable asignado");
			    		}
			    	}
			    	$scope.datos.idCliente= $scope.cliente[ind].id;
			    	if(!$scope.idBroker){
			    		$scope.idBroker=[];
			    	}
			    	$scope.idBroker[0]=$scope.cliente[ind].idBrocker;
			        return item;
			    }
			});
			$('#searchBox').data('typeahead').source=$scope.encontrados;
		});
	}

	$scope.datapass=function(operacion){
		if(operacion=='OPC'){
			$scope.OPCSaldo=$scope.datos.saldoMov;
		}else{
			$scope.OPASaldo=$scope.datos.saldoCom
		}
	}
	$scope.montOPC=0.0;
	
	$scope.formatOPC=function(mont){
			$scope.operaciones.monto=mont;
			$scope.montOPC = numeral(mont).format('0,0.00');
			console.log(Num);
			
		
		}
	  
	$scope.zEmpresa=function(){
		ordenTrabajoservice.searchEmpresa($scope.empresaSearch).then(function(data){
			
			$scope.found=[];
			for(var i=0; i< data.length; i++){
				$scope.found.push(data[i].nombre);
				
			}
			$scope.Empresa=data;
//			$scope.tipos=data.tipos;
			
			$('#buscaEmpresa').typeahead({

			    source: $scope.found,

			    updater:function (item) {
			    	var em=$scope.found.indexOf(item);
			    	$scope.datos.idEmpresa= $scope.Empresa[em].id;
			    	$scope.pago.empresa=$scope.Empresa[em].nombre;
			    	$scope.Cuentasban($scope.datos.idEmpresa);
			        return item;
			    }
			
			});
			$('#buscaEmpresa').data('typeahead').source=$scope.found;
		});
	}

	
	$scope.comis = function() {
		if($scope.tipoOP=="base"){
		$scope.datos.comipor= $scope.redondea(($scope.datos.porciento/100)*$scope.datos.basecomisiones);
		$scope.cImporte();
		}else{
			
		$scope.datos.comipor= $scope.redondea(($scope.datos.porciento/100)*$scope.datos.total);
		$scope.cImporte();
		}
		 $scope.calcularComisiones('Todos');
	};


	
	$scope.pago={
			fecha: new Date(),
			moneda:"MXN",
			cuenta:"",
			banco:"",
			monto: null,
	}
	
	$scope.datos={
			estatus: "activo",
			idCliente: null,
			idBrocker: null,
			nombreCliente: null,
			fechaInicio: new Date(),
			iva: null,
			importe: 0.0,
			total: 0.0,
			porLic : 2,
			porDes : 2,
			porBrok: [],
			montoLic : null,
			montoDes : null,
			montoBrok:[],
			retorno: null,
			saldoMov: null,
			saldoCom: null,
			totalComisiones: null,
			tipo: "normal",
			porciento: 16,
			basecomisiones:0.0
	}
	
	$scope.operaciones={
		tipo: null,
		descripcion: null,
		monto: null,
		estatus: "ACTIVO",
		cuenta: null,
		banco:null,
		fecha: new Date(),
		montoLetra: null,
		pagarA: null,
		fEmision: new Date(),
	}
	
	$scope.otVO={
			ot: null,
			pagos:[],
			movimientos:[],	
			comisiones:[],
			cliente: null,
			broker: null,
	
	}
	
	$scope.cheque={
			fEmision: null,
			pagarA:null,
			monto:null,
			montoLetra:null
	}
	
	ordenTrabajoservice.consultarClientesTodos().then(function(data) {
		$scope.cliente = data;
	});
	$scope.setMoneda = function(cuenta,ind){
		for(i in cuenta){
			if(cuenta[i].cuenta==ind)
				$scope.pago.moneda=cuenta[i].moneda;
		}
		//$scope.pago.moneda=moneda;
	}
	$scope.Cuentasban = function(data) {
		 empresaservice.getce(data).then(function(data) {
		  		$scope.cempresa = data;
		  		console.log("Datos Obtenidos de la Empresa ", data)
		  		$scope.listaBancos=[];
		  		for(var i = 0; i< $scope.cempresa.cuentas.length;i++){
		  			var indice= $scope.listaBancos.indexOf($scope.cempresa.cuentas[i].banco);
		  			if(indice<0){
		  				$scope.listaBancos.push($scope.cempresa.cuentas[i].banco);
		  			}
		  		}
		  		$scope.banco=$scope.cempresa.cuentas[0].banco;
//		  		 console.log($scope.cempresa);
		  });
			
	};
	


	$scope.addPago=function(){
//		if($scope.datos.nombreCliente == null){
			datosCliente();
//		}
		var renglon= {empresa:$scope.pago.empresa,cliente:$scope.datos.nombreCliente, fecha:$scope.pago.fecha, banco:$scope.pago.banco, cuenta:$scope.pago.cuenta, monto:$scope.pago.monto, moneda:$scope.pago.moneda, referencia: $scope.pago.referencia}
		$scope.otVO.pagos.push(renglon);
		$scope.tablaPagos=true;
		$scope.limpiaPago();
		$scope.clienteSeleccionado=true;
		$scope.calcularImporte();
		//$scope.calcularMontos('Todos');
		if($scope.otVO.pagos.length == 0){
			$scope.calcularRetorno();
		}
		$scope.getAsesor();
		$scope.brokers = [{id:$scope.idbk, nombre: $scope.namebk, porBrok: null,montoBrok: null }];
		$scope.idBroker=[$scope.idbk];
//		console.log("El id del Brocker es.....",$scope.cliente[0].idBrocker);
	}
	
	function datosCliente(){
		for(var i in $scope.cliente){
			if($scope.cliente[i].id == $scope.datos.idCliente){
				$scope.datosCliente = $scope.cliente[i];
				break;
			}
		}

		$scope.datos.nombreCliente = $scope.datosCliente.nickname;
		$scope.datos.idBrocker = $scope.datosCliente.idBrocker;
		ordenTrabajoservice.loadBrocker($scope.datos.idBrocker).then(function(data){
			 $scope.brockerCliente= data;
		 }); 
	}
	
	$scope.clearaddbk=function(){
		$scope.buscaBroker=null;
		$scope.disabled=true;
	}
	$scope.addBroker = function(){
//		var cont = $scope.brokers.length;
//		cont = cont + 1;
		var cont = $scope.dataBroker.id;
		var nombre =  $scope.dataBroker.nombre;
		var renglon= {id:cont,nombre:nombre, porBrok: null , montoBrok:null}
		var renglon2= $scope.dataBroker.id;
		$scope.idBroker.push(renglon2);
		console.log("Datos Broker a Agregar", renglon);
		$scope.brokers.push(renglon);
		console.log("Brocker Agregados", $scope.brokers);
		$("#myModalBroker").modal("hide");
		$scope.clearaddbk();
	}
	
	
	
	$scope.verificarSaldo=function(operacion){
//		$scope.OPCSaldo=$scope.datos.montoDes + $scope.datos.montoLic
			var objs= operacionesMovimientosService.verificarSaldo(operacion, $scope.otVO, $scope.datos, $scope.operaciones,$scope.montoRetorno,$scope.sumaMontoBrok,$scope.tipoOP,$scope.datos.total,$scope.montorest,$scope.OPCSaldo);
		
		$scope.errorSaldo= objs.error;
		if($scope.errorSaldo==" "){
			$scope.dis=false;
		}else{
			$scope.dis=true;
		}
		if(operacion =='OPC'){
			$scope.datos.saldoMov = objs.saldo;
			
		}else{
			$scope.datos.saldoCom = objs.saldo;
		}
		if($scope.operaciones.tipo=="Cheque"){
			$scope.operaciones.montoLetra= NumeroALetras($scope.operaciones.monto);
			$scope.operaciones.montoLetra= $scope.operaciones.montoLetra.toUpperCase();
		}
		
	}
	
	$scope.redondea=function(valor){
		var aux= valor;
		aux= aux.toFixed(2);
		return aux;
	}
	
	$scope.calcularImporte=function(){
		var sumaMontoPagos = 0;
		for(var i in $scope.otVO.pagos){
			sumaMontoPagos= sumaMontoPagos + $scope.otVO.pagos[i].monto;
		}
		$scope.datos.total= sumaMontoPagos
		var div= ("1." + $scope.datos.porciento)*1;
		$scope.datos.importe = $scope.redondea(sumaMontoPagos / div);
		$scope.datos.basecomisiones= $scope.redondea(sumaMontoPagos / div);
		$scope.datos.basecomisiones=$scope.datos.basecomisiones*1;
		$scope.datos.comipor= $scope.redondea(($scope.datos.porciento/100)*$scope.datos.basecomisiones);
		$scope.datos.iva= $scope.redondea(sumaMontoPagos - $scope.datos.importe);
		$scope.calcularComisiones('Todos');
	}
	$scope.cImporte=function(){
		var sumaMontoPagos = 0;
		for(var i in $scope.otVO.pagos){
			sumaMontoPagos= sumaMontoPagos + $scope.otVO.pagos[i].monto;
		}
		$scope.datos.total= sumaMontoPagos
		var div= ("1." + $scope.datos.porciento)*1;
		$scope.datos.comipor= $scope.redondea(($scope.datos.porciento/100)*$scope.datos.basecomisiones);
		$scope.calcularComisiones('Todos');
	}
	$scope.calcularComisiones=function(param){
		
		if($scope.tablaPagos== true){
			$scope.calcularMontos(param);
			if($scope.datos.porLic != null && $scope.datos.porDes != null){
				for( var i in $scope.brokers){
					if($scope.brokers[i].porBrok == null){
						return;
					}else{
						$scope.calcularRetorno();
					}
				}                         
			}else{
		    	return;
		    }			
		}else{
			alert("No se han registrado pagos.")
			$scope.limpiaComisiones()
		}
		$scope.verificarSaldo('OPA');
		$scope.verificarSaldo('OPC');
		
	}
	
	$scope.calcularMontos=function(modelo){
			switch(modelo) {
		    case 'Lic' :
		    	$scope.datos.montoLic = $scope.redondea(($scope.datos.porLic/100)*$scope.datos.basecomisiones);
		    	$scope.datos.montoLic=$scope.datos.montoLic*1;

		        break;
		    case 'Des':
		    	$scope.datos.montoDes = $scope.redondea(($scope.datos.porDes/100)*$scope.datos.basecomisiones);
		    	$scope.datos.montoDes= $scope.datos.montoDes*1;

		        break;
		    case 'Broke':
		    	for( var i in $scope.brokers){
	    			$scope.brokers[i].montoBrok = $scope.redondea(($scope.brokers[i].porBrok/100)*$scope.datos.basecomisiones);
	    			$scope.brokers[i].montoBrok= $scope.brokers[i].montoBrok*1;

	    		}
		        break;
		    case 'Todos':
		    	$scope.datos.montoLic = $scope.redondea(($scope.datos.porLic/100)*$scope.datos.basecomisiones);
		    	$scope.datos.montoLic=$scope.datos.montoLic*1;
		    	$scope.datos.montoDes = $scope.redondea(($scope.datos.porDes/100)*$scope.datos.basecomisiones);
		    	$scope.datos.montoDes=$scope.datos.montoDes*1;
		    	for( var i in $scope.brokers){
	    			$scope.brokers[i].montoBrok = $scope.redondea(($scope.brokers[i].porBrok/100)*$scope.datos.basecomisiones);
	    			$scope.brokers[i].montoBrok=$scope.brokers[i].montoBrok*1;
	    		}	       
		    	break;
		     default:
		    	 return;
			}	
	}
	
	$scope.calcularRetorno= function(){
		$scope.totalPor=0;
		$scope.retorn="";
		var sumaBrok =0;
		$scope.sumaMontoBrok =0;
		
		for( var i in $scope.brokers){
			sumaBrok= sumaBrok + $scope.brokers[i].porBrok;
			$scope.sumaMontoBrok= $scope.sumaMontoBrok * 1 + $scope.brokers[i].montoBrok * 1;
		}

		var retorno = $scope.datos.porciento-$scope.datos.porLic- $scope.datos.porDes- sumaBrok;
		if(retorno >= 0 ){
			$scope.datos.retorno= $scope.redondea(retorno);
			$scope.montoRetorno=$scope.redondea(($scope.datos.retorno/100)*$scope.datos.basecomisiones);
			 var montosTotal = ($scope.datos.montoLic * 1)+ ($scope.datos.montoDes * 1) + ($scope.sumaMontoBrok * 1) + ($scope.montoRetorno * 1);
			$scope.datos.totalComisiones=$scope.redondea(montosTotal);
			$scope.totalPor=$scope.datos.porLic + $scope.datos.porDes + sumaBrok + $scope.datos.retorno;
			$scope.montorest=($scope.datos.montoLic * 1)+ ($scope.datos.montoDes * 1) + ($scope.sumaMontoBrok * 1)
		}else{
			$scope.datos.retorno= null; 
			$scope.retorn="Valor de retorno debe ser igual o mayor a 0";
		}	
	}	 

	
	$scope.calcularComisionesM=function(param){
		
		if($scope.tablaPagos== true){
			$scope.calcularMontosM(param);
			if($scope.datos.porLic != null && $scope.datos.porDes != null){
				for( var i in $scope.brokers){
					if($scope.brokers[i].porBrok == null){
						return;
					}else{
						$scope.calcularRetorno();
					}
				}                         
			}else{
		    	return;
		    }			
		}else{
			alert("No se han registrado pagos.")
			$scope.limpiaComisiones()
		}
		$scope.verificarSaldo('OPC');
		$scope.verificarSaldo('OPA');
	}
	
	$scope.calcularMontosM=function(modelo){
			switch(modelo) {
		    case 'Lic' :
		    	$scope.datos.porLic=$scope.redondea(($scope.datos.montoLic * 100)/$scope.datos.basecomisiones);
		    	$scope.datos.porLic=$scope.datos.porLic*1
//		    	$scope.datos.montoLic = $scope.redondea(($scope.datos.porLic/100)*$scope.datos.importe);
		    	$("#porLic").val($scope.datos.porLic);
		        break;
		    case 'Des':
		    	$scope.datos.porDes=$scope.redondea(($scope.datos.montoDes * 100)/$scope.datos.basecomisiones);
		    	$scope.datos.porDes=$scope.datos.porDes*1;
//		    	$scope.datos.montoDes = $scope.redondea(($scope.datos.porDes/100)*$scope.datos.importe);
		    	$("#porDes").val($scope.datos.porDes);
		        break;
		    case 'Broke':
		    	for( var i in $scope.brokers){
		    		$scope.brokers[i].porBrok=$scope.redondea(($scope.brokers[i].montoBrok * 100)/ $scope.datos.basecomisiones);
		    		$scope.brokers[i].porBrok=$scope.brokers[i].porBrok*1;
//	    			$scope.brokers[i].montoBrok = $scope.redondea(($scope.brokers[i].porBrok/100)*$scope.datos.importe);
	    			$("#porbroke").val($scope.brokers[i].porBrok);
	    		}
		        break;
		    case 'Todos':
		    	$scope.datos.montoLic = $scope.redondea(($scope.datos.porLic/100)*$scope.datos.basecomisiones);
		    	$scope.datos.montoLic=$scope.datos.montoLic*1;
		    	$scope.datos.montoDes = $scope.redondea(($scope.datos.porDes/100)*$scope.datos.basecomisiones);
		    	$scope.datos.montoDes=$scope.datos.montoDes*1;
		    	for( var i in $scope.brokers){
	    			$scope.brokers[i].montoBrok = $scope.redondea(($scope.brokers[i].porBrok/100)*$scope.datos.basecomisiones);
	    		}	       $scope.brokers[i].montoBrok=$scope.brokers[i].montoBrok*1;
		    	break;
		     default:
		    	 return;
			}	
	}
	
	$scope.eliminarRenglon=function(renglon){
		$scope.otVO.pagos.splice(renglon, 1);
		if($scope.otVO.pagos.length == 0){
			$scope.tablaPagos=false;
			$scope.LimpiarTodo();
		}else{
			$scope.calcularImporte();
			//$scope.calcularMontos('Todos');
		}
	}
	$scope.eliminarRenglonICliente=function(renglon){
		var r= $scope.otVO.movimientos[renglon];
		if(r.tipo=="Resguardo"){
			var moneda= $scope.otVO.pagos[0].moneda;
			if(moneda=="MXN"){
				$scope.cliente[0].saldo = $scope.cliente[0].saldo*1 - r.monto;
				$scope.cliente[0].saldo = $scope.cliente[0].saldo.toFixed(2)*1;
			}else{
				if(!$scope.cliente[0].saldoUSD){
					$scope.cliente[0].saldoUSD=0;
				}
				$scope.cliente.saldoUSD= $scope.cliente.saldoUSD*1 - r.monto;
				$scope.cliente.saldoUSD= $scope.cliente.saldoUSD.toFixed(2)*1;
			}
		}
		$scope.otVO.movimientos.splice(renglon, 1);
		$scope.verificarSaldo('OPC');
		if($scope.otVO.movimientos.length == 0){
			$scope.tablaOper=false;
		}
	}
	$scope.eliminarRenglonAsesor=function(renglon){
		var r= $scope.otVO.comisiones[renglon];
		if(r.tipo=="Resguardo"){
			var moneda= $scope.otVO.pagos[0].moneda;
			if(moneda=="MXN"){
				$scope.brockerCliente.saldo = $scope.brockerCliente.saldo*1 - r.monto;
				$scope.brockerCliente.saldo= $scope.brockerCliente.saldo.toFixed(2)*1
			}else{
				if(!$scope.brockerCliente.saldoUSD){
					$scope.brockerCliente.saldoUSD=0;
				}
				$scope.brockerCliente.saldoUSD= $scope.brockerCliente.saldoUSD*1 - r.monto;
				$scope.brockerCliente.saldoUSD=$scope.brockerCliente.saldoUSD.toFixed(2)*1
			}
		}
		$scope.otVO.comisiones.splice(renglon, 1);
		$scope.verificarSaldo('OPA');
		if($scope.otVO.comisiones.length == 0){
			$scope.tablaOperAsesor=false;
			
		}
	}
	$scope.verificaPorcentajes=function(operacion){
		if($scope.datos.retorno == null && $scope.totalPor != $scope.datos.porciento){
			alert("ERROR: Revisar porcentajes asignados");
			$scope.datos.retorno= null;
		}else{
			if(operacion=='OPC'){
				$("#myModalOper").modal();
			}
			if(operacion=='OPA'){
				$("#myModalOperAsesor").modal();
			}
		
		}
	}

	$scope.addOper= function(operacion){
		var objs=operacionesMovimientosService.addOper(operacion,$scope.operaciones, $scope.otVO, $scope.tipoResguardo,$scope.datosCliente,$scope.brockerCliente);
		$scope.otVO= objs.otvo;
		$scope.datosCliente = objs.c;
		$scope.brockercliente= objs.b;
		if(operacion=='OPC'){
			$scope.tablaOper=true;
		}else{
			$scope.tablaOperAsesor=true;
		}
		$scope.limpiaOperaciones();	
//		$scope.verificarSaldo(operacion);
	} 

	$scope.isResguardo=function(operacion){
		$scope.errorSaldo="";
		var objs= operacionesMovimientosService.isResguardo(operacion, $scope.operaciones,$scope.tipoResguardo, $scope.datos, $scope.mxvalue);
		$scope.operaciones= objs.op;
		$scope.datos= objs.datos;
		$scope.tipoResguardo=objs.resguardo;
		$scope.verificarSaldoOP(operacion);
	}
	
	$scope.detalleCheque=function(index, operacion){
		$scope.cheque =operacionesMovimientosService.detalleCheque(index, operacion, $scope.otVO, $scope.cheque);
	}
	
	$scope.guardarOT=function(){
		$scope.esconderBotones=true;
		if($scope.tablaPagos == true){
			if($scope.datos.porLic != null || $scope.datos.porDes != null || $scope.datos.porBrok.length != 0){
				if($scope.tablaOper == true || $scope.datos.saldoMov == 0){
//					&& $scope.tablaOperAsesor == true
					for(var i in $scope.brokers){
						$scope.datos.porBrok.push($scope.brokers[i].porBrok);
						$scope.datos.montoBrok.push($scope.brokers[i].montoBrok);
					}
					if($scope.datosCliente.saldo != null || $scope.datosCliente.saldo != 0){
						$scope.otVO.cliente = $scope.datosCliente;
					}
					if($scope.brockerCliente.saldo != null || $scope.brockerCliente.saldo != 0){
						$scope.otVO.broker = $scope.brockerCliente;
					}
					$scope.otVO.ot = $scope.datos;
					$scope.otVO.ot.tipoOP=$scope.tipoOP
					$scope.otVO.ot.listaBrockers=$scope.idBroker;
					$scope.otVO.ot.baseComisiones=$scope.datos.basecomisiones;
					$scope.otVO.notificar=$scope.notificacion;
					
//					console.log($scope.otVO);
					
					ordenTrabajoservice.addot($scope.otVO).then(function(data){
						showAlert("Alta de Orden de trabajo Exitosa");
						$location.path("/listaOTs");
//						 window.location.reload();
					});
					
				}else{
					alert("No hay Instrucciones de Operacion Registradas");
					$scope.esconderBotones=false;
				}
			}else{
				alert("No hay Comisiones registradas"); 
				$scope.esconderBotones=false;
			}	
		}else{
			alert("No hay Pagos registrados");
			$scope.esconderBotones=false;
		}
		
	};
	
	$scope.limpiaOperaciones= function(){
		$scope.operaciones.tipo= null;
		$scope.operaciones.descripcion= null;
		$scope.operaciones.monto= null;
		$scope.operaciones.montoLetra= null;
		$scope.operaciones.pagarA= null;
		$scope.operaciones.fEmision= null;
		$scope.errorSaldo=" ";
	}
	
	$scope.limpiaComisiones=function(){
		$scope.datos.porLic = null;
		$scope.datos.porDes =null;
		$scope.datos.montoLic= null;
		$scope.datos.montoDes= null;
		$scope.datos.retorno= null;
		$scope.datos.totalComisiones =  null;
		for( var i in $scope.brokers){
			$scope.brokers[i].porBrok =null;
			$scope.brokers[i].montoBrok =null;
		}	
	}
	$scope.limpiaPago=function(){
		$scope.pago.fecha= new Date();
		$scope.pago.moneda="MXN";
		$scope.pago.cuenta="";
		$scope.pago.banco="";
		$scope.pago.monto= null;
//		$scope.pago.empresa=null;
		$scope.pago.referencia="";
	}
	
	$scope.LimpiarTodo=function(){
		$scope.tablaPagos=false;
		$scope.tablaOper=false;
		$scope.tablaOperAsesor=false;
		$scope.datos.importe= null;
		$scope.datos.total= null;
		$scope.datos.iva = null;
		$scope.datos.retorno =  null;
		$scope.otVO.pagos= [];
		$scope.otVO.movimientos=[];
		$scope.otVO.comisiones=[];
		$scope.limpiaPago();
		$scope.limpiaComisiones();
	}
	
}]);


app.controller("ordenTrabajoController",['$rootScope', '$scope','$window', '$location', '$cookieStore','ordenTrabajoservice','usuarioservice','operacionesMovimientosService','notificacionesService','userFactory','empresaservice','brockerservice',
                                         function($rootScope, $scope, $window, $location, $cookieStore, ordenTrabajoservice,usuarioservice,operacionesMovimientosService,notificacionesService,userFactory,empresaservice,brockerservice){
	$scope.pago={
			fecha: new Date(),
			moneda:"MXN",
			cuenta:"",
			banco:"",
			monto: null,
	}
	$scope.redondea=function(valor){
		var aux= valor;
		aux= aux.toFixed(2);
		return aux;
	}
	$scope.ver=function(data,index){
		$scope.epago=data;
		$scope.indexEpago=index;
		console.log(data);
	}
	$scope.clearPago=function(){
		
		$scope.pago={
				fecha: new Date(),
				moneda:"MXN",
				cuenta:"",
				banco:"",
				monto: null,
		}
		
		$scope.empresaSearch=null;
		
	}
	$scope.agregarPago=function(){
		console.log("Pruba de obtencion de datos", $scope.otvo.pagos[$scope.indexEpago])
		
		if($scope.newpago.monto!=null){
			$scope.otvo.pagos[$scope.indexEpago].monto=$scope.newpago.monto;
		}
		if($scope.newpago.fecha!=null){
			$scope.otvo.pagos[$scope.indexEpago].fecha=$scope.newpago.fecha;
		}
		$scope.newpago=[];
	}
	$scope.addPago = function(){
		$scope.pago.ot=$scope.otvo.ot.id;
		$scope.otvo.pagos.push($scope.pago)
		$scope.tipoOperacion($scope.otvo.ot.tipoOP);
		$scope.clearPago();
		$scope.calcular();
		
		
		$scope.calcularComisiones("Todos");
		
		
		
		
			$scope.otvo.ot.listaBrockers=$scope.getIdBk;
		
	}
	$scope.guardarPago = function (){
//		$scope.calcularMontos("Todos");
//		$scope.calcularComisiones("Todos");
//		$scope.calcularMontos("Todos");
		setTimeout(function(){ ordenTrabajoservice.cerrarOt($scope.otvo).then(function(data){
			$window.location.reload();
		}); }, 1000);
		
	}
	$scope.eliminarPago = function(pago,ind){
		var tot = $scope.otvo.ot.total;
		$scope.otvo.ot.total = $scope.otvo.ot.total - pago.monto;
		$scope.otvo.ot.iva= ($scope.otvo.ot.total * 16) / 100;
		$scope.iva=$scope.otvo.ot.iva;
		$scope.otvo.ot.importe=  $scope.otvo.ot.total - $scope.otvo.ot.iva;
		if($scope.otvo.ot.tipoOP=='base'){
			$scope.tipoOP="base";
			$scope.otvo.ot.tipoOP=$scope.tipoOP;
			$scope.otvo.ot.baseComisiones=($scope.otvo.ot.importe );
			$scope.otvo.ot.baseComisiones=$scope.otvo.ot.baseComisiones*1;
			
			$scope.calcularComisiones("Todos");
			
		}else{
			$scope.tipoOP="total";
			$scope.otvo.ot.tipoOP=$scope.tipoOP;
			$scope.otvo.ot.baseComisiones=($scope.otvo.ot.total );
		
			$scope.calcularComisiones("Todos");
		}
		console.log("total 1", tot, "todal 2", $scope.otvo.ot.total, 	"Esto se va a Eliminar", pago);
			setTimeout(function(){ordenTrabajoservice.eliminarPago(pago.id).then(function(data){
//				$window.location.reload();
				$scope.otvo.ot.listaBrockers=$scope.getIdBk;
				$scope.otvo.pagos.splice(ind , 1);
				$scope.tipoOperacion($scope.otvo.ot.tipoOP);
				$scope.calcular();
				$scope.calcularComisiones("Todos");
				$scope.guardarPago();
		});}, 1000);
	}
	$scope.calcular = function(){
		$scope.otvo.ot.total=0;
		for(var i in $scope.otvo.pagos){
			$scope.otvo.ot.total += $scope.otvo.pagos[i].monto;
			console.log("La Suma ", $scope.otvo.ot.total)
		}
	//		otvo.ot.total
		
		
		var div= ("1." + $scope.otvo.ot.porciento)*1;
		$scope.otvo.ot.importe = $scope.redondea($scope.otvo.ot.total / div);
		$scope.otvo.ot.basecomisiones= $scope.redondea($scope.otvo.ot.total / div);
		$scope.otvo.ot.basecomisiones=$scope.otvo.ot.basecomisiones*1;
		$scope.otvo.ot.comipor= $scope.redondea(($scope.otvo.ot.porciento/100)*$scope.otvo.ot.basecomisiones);
		$scope.otvo.ot.iva= $scope.redondea($scope.otvo.ot.total - $scope.otvo.ot.importe);
		
		$scope.calcularMontos("Todos");
		
//		$scope.otvo.ot.iva= ($scope.otvo.ot.total * 16) / 100;
//		$scope.iva=$scope.otvo.ot.iva;
//		$scope.otvo.ot.importe=  $scope.otvo.ot.total - $scope.otvo.ot.iva;
		
//		$scope.guardarPago();
		
	}
	
	$scope.calcularRetorno= function(){
		$scope.totalPor=0;
		$scope.retorn="";
		var sumaBrok =0;
		$scope.sumaMontoBrok =0;
		
		for( var i in $scope.brokers){
			sumaBrok= sumaBrok + $scope.brokers[i].porBrok;
			$scope.sumaMontoBrok= $scope.sumaMontoBrok * 1 + $scope.brokers[i].montoBrok * 1;
		}

		var retorno = $scope.otvo.ot.porciento-$scope.otvo.ot.porLic- $scope.otvo.ot.porDes- sumaBrok;
		if(retorno >= 0 ){
			$scope.otvo.ot.retorno= $scope.redondea(retorno);
			$scope.montoRetorno=$scope.redondea(($scope.otvo.ot.retorno/100)*$scope.otvo.ot.baseComisiones);
			 var montosTotal = ($scope.otvo.ot.montoLic * 1)+ ($scope.otvo.ot.montoDes * 1) + ($scope.sumaMontoBrok * 1) + ($scope.montoRetorno * 1);
			 $scope.otvo.ot.totalComisiones=$scope.redondea(montosTotal);
			$scope.totalPor=$scope.otvo.ot.porLic + $scope.otvo.ot.porDes + sumaBrok + $scope.otvo.ot.retorno;
			$scope.montorest=($scope.otvo.ot.montoLic * 1)+ ($scope.otvo.ot.montoDes * 1) + ($scope.sumaMontoBrok * 1)
		}else{
			$scope.otvo.ot.retorno= null; 
			$scope.retorn="Valor de retorno debe ser igual o mayor a 0";
		}	
	}
$scope.calcularComisiones=function(param){
		
		
			$scope.calcularMontos(param);
			if($scope.otvo.ot.porLic != null && $scope.otvo.ot.porDes != null){
				for( var i in $scope.brokers){
					if($scope.brokers[i].porBrok == null){
						return;
					}else{
						$scope.calcularRetorno();
					}
				}                         
			}else{
		    	return;
		    }	
		$scope.calcularSaldoOP();
//		$scope.verificarSaldo('OPC');
		
		
	}
	$scope.tipoOperacion=function(op){
		if(op=='base'){
			$scope.tipoOP="base";
			$scope.otvo.ot.tipoOP=$scope.tipoOP;
//			$scope.otvo.ot.baseComisiones=($scope.otvo.ot.importe * $scope.otvo.ot.porciento) / 100;
			$scope.otvo.ot.baseComisiones=($scope.otvo.ot.importe );
			$scope.otvo.ot.baseComisiones=$scope.otvo.ot.baseComisiones*1;
//			$scope.disablecomi=true;
			$scope.calcular();
			$scope.calcularComisiones("Todos");
			
		}else{
			$scope.tipoOP="total";
			$scope.otvo.ot.tipoOP=$scope.tipoOP;
//			$scope.otvo.ot.baseComisiones=($scope.otvo.ot.total * $scope.otvo.ot.porciento) / 100;
			$scope.otvo.ot.baseComisiones=($scope.otvo.ot.total );
			$scope.calcular();
			$scope.calcularComisiones("Todos");
		}
//		$scope.verificarSaldo('OPA');
//		$scope.verificarSaldo('OPC');
	};
	$scope.calcularSaldoOP=function(){
		$scope.otvo.ot.saldoMov=($scope.otvo.ot.total - $scope.otvo.ot.montoLic - $scope.otvo.ot.montoDes - $scope.sumaMontoBrok);
		console.log("El nuevo saldo Client es: ",$scope.otvo.ot.saldoMov)
		$scope.otvo.ot.saldoCom= $scope.sumaMontoBrok;
		var suma = 0;
		var suma2= 0;
		
		if($scope.otvo.movimientos!=null){
				for(i in $scope.otvo.movimientos){
					if($scope.otvo.movimientos[i].estatus!="CANCELADO"){
						suma += $scope.otvo.movimientos[i].monto;
					}
				}
				$scope.otvo.ot.saldoMov=$scope.otvo.ot.saldoMov - suma;
				
				
		}
		
			if($scope.otvo.ot.saldoCom!=null){
				for(i in $scope.otvo.comisiones){
					if($scope.otvo.comisiones[i].estatus!="CANCELADO"){
						suma2 += $scope.otvo.comisiones[i].monto;
					}
					
				}
				$scope.otvo.ot.saldoCom= $scope.otvo.ot.saldoCom - suma2;
				
			}
		
	}
	$scope.guardSaldo = function(){
		$scope.msjCliente = false;
		$scope.msjAsesor = false;
		if($scope.otvo.ot.saldoMov < 0){
			$scope.msjCliente = true
			
		}
		if($scope.otvo.ot.saldoCom < 0){
			$scope.msjAsesor = true;
			
		}
	}
	$scope.verificaMontos=function(tipo){
		var saldo = 0;
		$scope.calcularSaldoOP();
		if(tipo=="OPC"){
			if($scope.operaciones.monto){
			$scope.otvo.ot.saldoMov= $scope.otvo.ot.saldoMov - $scope.operaciones.monto;
		}
		}
		if(tipo=="OPA"){
			if($scope.operaciones.monto){
			$scope.otvo.ot.saldoCom = $scope.otvo.ot.saldoCom - $scope.operaciones.monto
		}
		}
	}
	
	$scope.calcularMontos=function(modelo){
		switch(modelo) {
	    case 'Lic' :
	    	$scope.otvo.ot.montoLic = $scope.redondea(($scope.otvo.ot.porLic/100)*$scope.otvo.ot.baseComisiones);
	    	$scope.otvo.ot.montoLic = $scope.otvo.ot.montoLic * 1;

	        break;
	    case 'Des':
	    	$scope.otvo.ot.montoDes = $scope.redondea(($scope.otvo.ot.porDes/100)*$scope.otvo.ot.baseComisiones);
	    	$scope.otvo.ot.montoDes= $scope.otvo.ot.montoDes * 1;

	        break;
	    case 'Broke':
	    	for( var i in $scope.brokers){
    			$scope.brokers[i].montoBrok = $scope.redondea(($scope.brokers[i].porBrok/100)* $scope.otvo.ot.baseComisiones);
    			$scope.brokers[i].montoBrok= $scope.brokers[i].montoBrok*1;
    			$scope.otvo.ot.montoBrok[i]=$scope.brokers[i].montoBrok;
    			$scope.otvo.ot.porBrok[i]=$scope.brokers[i].porBrok;

    		}
	        break;
	    case 'Todos':
	    	$scope.otvo.ot.montoLic = $scope.redondea(($scope.otvo.ot.porLic/100)*$scope.otvo.ot.baseComisiones);
	    	$scope.otvo.ot.montoLic = $scope.otvo.ot.montoLic * 1;
	    	$scope.otvo.ot.montoDes = $scope.redondea(($scope.otvo.ot.porDes/100)*$scope.otvo.ot.baseComisiones);
	    	$scope.otvo.ot.montoDes= $scope.otvo.ot.montoDes * 1;
	    	for( var i in $scope.brokers){
    			$scope.brokers[i].montoBrok = $scope.redondea(($scope.brokers[i].porBrok/100)* $scope.otvo.ot.baseComisiones);
    			$scope.brokers[i].montoBrok=$scope.brokers[i].montoBrok*1;
    			$scope.otvo.ot.montoBrok[i]=$scope.brokers[i].montoBrok;
    			$scope.otvo.ot.porBrok[i]=$scope.brokers[i].porBrok;
    		}	       
	    	break;
	     default:
	    	 return;
		}	
}
	$scope.calcularMontosM=function(modelo){
		switch(modelo) {
	    case 'Lic' :
	    	$scope.otvo.ot.porLic=$scope.redondea(($scope.otvo.ot.montoLic * 100)/$scope.datos.basecomisiones);
	    	$scope.otvo.ot.porLic=$scope.otvo.ot.porLic*1
//	    	$scope.datos.montoLic = $scope.redondea(($scope.datos.porLic/100)*$scope.datos.importe);
	    	$("#porLic").val($scope.otvo.ot.porLic);
	        break;
	    case 'Des':
	    	$scope.otvo.ot.porDes=$scope.redondea(($scope.otvo.ot.montoDes * 100)/$scope.datos.basecomisiones);
	    	$scope.otvo.ot.porDes=$scope.otvo.ot.montoDes * 1;
//	    	$scope.datos.montoDes = $scope.redondea(($scope.datos.porDes/100)*$scope.datos.importe);
	    	$("#porDes").val($scope.otvo.ot.porDes);
	        break;
	    case 'Broke':
	    	for( var i in $scope.brokers){
	    		$scope.brokers[i].porBrok=$scope.redondea(($scope.brokers[i].montoBrok * 100)/ $scope.datos.basecomisiones);
	    		$scope.brokers[i].porBrok=$scope.brokers[i].porBrok*1;
//    			$scope.brokers[i].montoBrok = $scope.redondea(($scope.brokers[i].porBrok/100)*$scope.datos.importe);
    			$("#porbroke").val($scope.brokers[i].porBrok);
    		}
	        break;
	    case 'Todos':
	    	$scope.otvo.ot.porLic=$scope.redondea(($scope.otvo.ot.montoLic * 100)/$scope.datos.basecomisiones);
	    	$scope.otvo.ot.porLic=$scope.otvo.ot.porLic*1
	    	$scope.otvo.ot.porDes=$scope.redondea(($scope.otvo.ot.montoDes * 100)/$scope.datos.basecomisiones);
	    	$scope.otvo.ot.porDes=$scope.otvo.ot.montoDes * 1;
	    	for( var i in $scope.brokers){
    			$scope.brokers[i].montoBrok = $scope.redondea(($scope.brokers[i].porBrok/100)*$scope.datos.basecomisiones);
    		}	       $scope.brokers[i].montoBrok=$scope.brokers[i].montoBrok*1;
	    	break;
	     default:
	    	 return;
		}	
}

	
	$scope.bk=[];
	brockerservice.consultarBrockersAll().then(function(data){
		$scope.bk=data;
		var index=$scope.bk.length;
		console.log("Lista de Brockers", data)
	});
	$scope.permiso=true; 
	var indice = null;
	var tipoOperacion= null;
	$scope.tiposOp = TiposOperacion();
	$scope.bancos = catalogoBancos();
	$scope.errorSaldo=" ";
	$scope.tipoResguardo= false;
	$scope.cheque={fEmision: new Date(),pagarA:null,monto:null,montoLetra:null}
	$scope.operaciones={tipo: null, descripcion: null, monto: null, estatus: "ACTIVO", cuenta: null, banco:null,fecha: new Date(),montoLetra: null,pagarA: null,fEmision: new Date()}
	$scope.mov={tipo: null,monto: null,descripcion: null,banco: null,cuenta: null,empresa: null,numTransaccion:null,fecha:new Date(),estatus: null,montoLetra: null,pagarA: null,fEmision: new Date()}
	$scope.movimientosVO={movimiento:null,idOt:null,bndMovimiento:null,saldo:null}
	empresaservice.load(1).then(function(data) {
		$scope.empresa = data;
	})
	$scope.insBroker=function(){
		var x = document.getElementById("slcbk").selectedIndex;
		console.log("Broker Tomado con el index", $scope.brokers[x]);
		var idBrok=$scope.getbroker[x].id;
//		$scope.mxvalue=$scope.brokers[x].montoBrok;
		console.log("Dato Tomado del Select", idBrok);
		$scope.brockerCliente={id :idBrok}
		$scope.brokerSelected={};
		$scope.operaciones.idCliente= idBrok;
		var suma= 0;
		var totalb=0;
		for(var i =0; i< $scope.brokers.length; i++){
			if($scope.getbroker[i].id == idBrok){
				$scope.brokerSelected= $scope.brokers[i];
				totalb= $scope.brokers[i].montoBrok;
				break;
			}
		}
		for(var i =0; i < $scope.otvo.comisiones.length; i++){
			if($scope.otvo.comisiones[i].idCliente == idBrok && $scope.otvo.comisiones[i].estatus!="CANCELADO"){
				suma+= $scope.otvo.comisiones[i].monto;
			}
		}
		
		$scope.mxvalue= totalb-suma;
	}
	$scope.idBrockerRest=[];
	$scope.otvo=[];
	$scope.getIdBk=[];
	ordenTrabajoservice.loadot($cookieStore.get("idOt")).then(function(data){
		$scope.otvo= data;
		$scope.recovery=data;
		console.log("toda la ot ", $scope.otvo.ot)
		$scope.mont=$scope.otvo.pagos.monto;
		$scope.tipoOP=$scope.otvo.ot.tipoOP;
//		$scope.tipoOperacion($scope.otvo.ot.tipoOP);
		$scope.getIdbk=$scope.otvo.ot.listaBrockers;
		
		$scope.getbroker=$scope.otvo.brokers;
		for(var i in $scope.getIdbks){
			var infd= $scope.getIdbks[i];
			$scope.idBrockerRest.push(infd);
		}
//		console.log("linea 1261",$scope.getIdbk[0] );
		console.log(data);	
		crearListaDeCheques();
//		$scope.closeOrder();
		var sumaMontoPagos =0;
		 $scope.sumaMontoBrok =0;
		for(var i in $scope.otvo.pagos){
			var sumaMontoPagos= sumaMontoPagos + $scope.otvo.pagos[i].monto;
		}
		if($scope.otvo.ot.tipo !="ca"){
			$scope.tipoOT="general";
			$scope.iva= (sumaMontoPagos - $scope.otvo.ot.importe).toFixed(2);
			$scope.brokers = [];
			
				
			for(var o in $scope.getIdbk){
				for (var i = 0; i < $scope.bk.length; i+=1) {
					  if($scope.getIdbk[o]==$scope.bk[i].id){
						  $scope.getIdBk.push($scope.getIdbk[o]);
						  console.log("Id de los bk", $scope.getIdBk);
						  $scope.getIdbk[o]=$scope.bk[i].nickname;
//						  $scope.idbk=$scope.bk[i].id
						  var renglon= {nombre:$scope.getIdbk[o], porBrok:$scope.otvo.ot.porBrok[o], montoBrok: $scope.otvo.ot.montoBrok[o]};
							$scope.brokers.push(renglon);
						  console.log("Match",   $scope.getIdbk[o]);
					  }
					}
				}
					
				
			
			for(var i=0; i<$scope.otvo.ot.montoBrok.length; i++){
				$scope.sumaMontoBrok= ($scope.sumaMontoBrok) + ($scope.otvo.ot.montoBrok[i]);
			}
			var sumaMovimientos=0;
			for(var i=0; i<$scope.otvo.movimientos.length; i++){
				if($scope.otvo.movimientos[i].estatus!="CANCELADO"){
					sumaMovimientos= (sumaMovimientos) + ($scope.otvo.movimientos[i].monto);
				}
			}
			$scope.montoRetorno=(($scope.otvo.ot.retorno/100)*$scope.otvo.ot.importe).toFixed(2);
			$scope.montosTotal = parseInt($scope.otvo.ot.montoLic)+ parseInt($scope.otvo.ot.montoDes) + parseInt($scope.sumaMontoBrok) + parseInt($scope.montoRetorno);
			$scope.montoComi = ($scope.otvo.ot.montoLic)+ ($scope.otvo.ot.montoDes) + ($scope.sumaMontoBrok);
			
			$scope.otvo.ot.saldoMov = sumaMontoPagos - $scope.montoComi - sumaMovimientos;
			
		}else{
			$scope.tipoOT="ca";
		}
		
		if($scope.otvo.ot.estatus=="Cerrada"){
			$scope.ordenCerrada= true;
		}else{
			$scope.ordenCerrada=false;
		};
		$scope.limpiaOperaciones= function(){
			$scope.operaciones.tipo= null;
			$scope.operaciones.descripcion= null;
			$scope.operaciones.monto= null;
			$scope.operaciones.montoLetra= null;
			$scope.operaciones.pagarA= null;
			$scope.operaciones.fEmision= null;
			$scope.errorSaldo=" ";
			$scope.data=[];
		}
		$scope.cancelarOp = function(index,	operacion){
			var movVO={idOt:$scope.otvo.ot.id}
			if(operacion=="OPC"){
				$scope.otvo.movimientos[index].estatus="CANCELADO";
				$scope.otvo.ot.saldoMov=$scope.otvo.ot.saldoMov + $scope.otvo.movimientos[index].monto;
				movVO.movimiento=$scope.otvo.movimientos[index];
				movVO.saldo=$scope.otvo.ot.saldoMov;
//				if($scope.otvo.movimientos[index].tipo=="Resguardo"){
//					var moneda= $scope.otvo.pagos[0].moneda;
//					var cliente= $scope.otvo.cliente;
//					if(moneda=="MXN"){
//						cliente.saldo = cliente.saldo - $scope.otvo.movimientos[index].monto;
//					}else{
//						if(!cliente.saldoUSD){
//							cliente.saldoUSD=0;
//						}
//						cliente.saldoUSD= cliente.saldoUSD - $scope.otvo.movimientos[index].monto;
//					}
//					ordenTrabajoservice.guardaCliente(cliente);
//				}
			}
			if(operacion=="OPA"){
				$scope.otvo.comisiones[index].estatus="CANCELADO";
				$scope.otvo.ot.saldoCom=$scope.otvo.ot.saldoCom + $scope.otvo.comisiones[index].monto; 
				movVO.movimiento=$scope.otvo.comisiones[index];
				movVO.saldo=$scope.otvo.ot.saldoCom;
//				if($scope.otvo.movimientos[index].tipo=="Resguardo"){
//					var moneda= $scope.otvo.pagos[0].moneda;
//					var cliente= $scope.otvo.broker;
//					if(moneda=="MXN"){
//						cliente.saldo = cliente.saldo - $scope.otvo.comisiones[index].monto;
//					}else{
//						if(!cliente.saldoUSD){
//							cliente.saldoUSD=0;
//						}
//						cliente.saldoUSD= cliente.saldoUSD - $scope.otvo.comisiones[index].monto;
//					}
//					ordenTrabajoservice.guardaCliente(cliente);
//				}
			}
			if(cerrarOrden()){
				ordenTrabajoservice.cerrarOt($scope.otvo).then(function(data){
					if(tipoOperacion=='OPC'){
						ordenTrabajoservice.updateot($scope.otvo.movimientos[index]).then(function(data){
							$window.location.reload();
						});
					}else{
						ordenTrabajoservice.updateot($scope.otvo.comisiones[index]).then(function(data){
							$window.location.reload();
						});
					}
				});
			}else{
				if(operacion=='OPC'){
					movVO.bndMovimiento="cliente";
					ordenTrabajoservice.cancelaMov(movVO).then(function(data){
						$window.location.reload();
					});
				}else{
					movVO.bndMovimiento="asesor";
					ordenTrabajoservice.cancelaMov(movVO).then(function(data){
						$window.location.reload();
					});
				}
			}
		}
		$rootScope.perfilUsuario = userFactory.getUsuarioPerfil();  //obtener perfl de usuario para pintar el menú al qe tiene acceso
		$scope.perfil=$rootScope.perfilUsuario;
		console.log("el perfil", $scope.perfil);
		$scope.closeOrder();
	});	

	
	$scope.zEmpresa=function(){
		ordenTrabajoservice.searchEmpresa($scope.empresaSearch).then(function(data){
			
			$scope.found=[];
			for(var i=0; i< data.length; i++){
				$scope.found.push(data[i].nombre);
				
			}
			$scope.Empresa=data;
//			$scope.tipos=data.tipos;
			
			$('#buscaEmpresa').typeahead({

			    source: $scope.found,

			    updater:function (item) {
			    	var em=$scope.found.indexOf(item);
			    	$scope.empresa.id= $scope.Empresa[em].id;
			    	$scope.mov.empresa=$scope.Empresa[em].nombre;
			    	$scope.pago.empresa=$scope.Empresa[em].nombre;
			    	$scope.Cuentasban($scope.empresa.id);
			        return item;
			    }
			
			});
			$('#buscaEmpresa').data('typeahead').source=$scope.found;
		});
	}
	$scope.nEmpresa=function(){
		ordenTrabajoservice.searchEmpresa($scope.empresaSearch2).then(function(data){
			
			$scope.found=[];
			for(var i=0; i< data.length; i++){
				$scope.found.push(data[i].nombre);
				
			}
			$scope.Empresa=data;
//			$scope.tipos=data.tipos;
			
			$('#buscaEmpresa2').typeahead({

			    source: $scope.found,

			    updater:function (item) {
			    	var em=$scope.found.indexOf(item);
			    	$scope.empresa.id= $scope.Empresa[em].id;
			    	$scope.mov.empresa=$scope.Empresa[em].nombre;
			    	$scope.pago.empresa=$scope.Empresa[em].nombre;
			    	$scope.Cuentasban($scope.empresa.id);
			        return item;
			    }
			
			});
			$('#buscaEmpresa2').data('typeahead').source=$scope.found;
		});
	}
	$scope.Cuentasban = function(data) {
		 empresaservice.getce(data).then(function(data) {
		  		$scope.cempresa = data;
		  		$scope.listaBancos=[];
		  		for(var i = 0; i< $scope.cempresa.cuentas.length;i++){
		  			var indice= $scope.listaBancos.indexOf($scope.cempresa.cuentas[i].banco);
		  			if(indice<0){
		  				$scope.listaBancos.push($scope.cempresa.cuentas[i].banco);
		  			}
		  		}
		  		$scope.banco=$scope.cempresa.cuentas[0].banco;
//		  		 console.log($scope.cempresa);
		  });
			
	};
	$scope.$watch('empresaSearch',function(){
		if($scope.empresaSearch){
		if($scope.empresaSearch.length>3){
			$scope.zEmpresa();
		}
	}},true);
	$scope.$watch('empresaSearch2',function(){
		if($scope.empresaSearch2){
		if($scope.empresaSearch2.length>3){
			$scope.nEmpresa();
		}
	}},true);
	function cerrarOrden(){
		var contM=0, contC=0;
		for(var i in $scope.otvo.movimientos){
			if($scope.otvo.movimientos[i].estatus=='VALIDADO' || $scope.otvo.movimientos[i].estatus=='CANCELADO'){
				contM++;
			}
		}
		for(var i in $scope.otvo.comisiones){
			if($scope.otvo.comisiones[i].estatus=='VALIDADO' || $scope.otvo.comisiones[i].estatus=='CANCELADO'){
				contC++;
			}
		}
		if($scope.otvo.movimientos.length == contM && $scope.otvo.comisiones.length==contC){
			if($scope.otvo.ot.saldoMov==0 || $scope.otvo.ot.saldoMov<0 && $scope.otvo.ot.saldoCom==0 || $scope.otvo.ot.saldoMov<0){
				$scope.otvo.ot.estatus="Cerrada"
				notificacionesService.eliminaNotificaciones($scope.otvo.ot.id);
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
	
	//prepara listado de cheques para impresion
	function crearListaDeCheques(){
		$scope.listaChequesCliente = "";
		$scope.listaChequesAsesor = "";
		for(var i in $scope.otvo.movimientos){
			if($scope.otvo.movimientos[i].tipo == "Cheque"){
				if($scope.listaChequesCliente == ""){
					$scope.listaChequesCliente= $scope.otvo.movimientos[i].id;
				}else{
					$scope.listaChequesCliente= $scope.listaChequesCliente + ',' + $scope.otvo.movimientos[i].id;
				}
			}
		}
		for(var i in $scope.otvo.comisiones){
			if($scope.otvo.comisiones[i].tipo == "Cheque"){
				if($scope.listaChequesAsesor == ""){
					$scope.listaChequesAsesor= $scope.otvo.comisiones[i].id;
				}else{
					$scope.listaChequesAsesor= $scope.listaChequesAsesor + ',' + $scope.otvo.comisiones[i].id;
				}
			}
		}
//		console.log($scope.listaChequesCliente);
//		console.log($scope.listaChequesAsesor);
	}
	
	//icon editar
	$scope.cargarMov=function(index, operacion){
		if(operacion=="OPC"){
			$scope.mov.tipo=$scope.otvo.movimientos[index].tipo;
			$scope.mov.monto=$scope.otvo.movimientos[index].monto;
			$scope.mov.descripcion=$scope.otvo.movimientos[index].descripcion;
			$scope.mov.banco=$scope.otvo.movimientos[index].banco;
			$scope.mov.cuenta=$scope.otvo.movimientos[index].cuenta;
			$scope.mov.empresa=$scope.otvo.movimientos[index].empresa;
			$scope.mov.idCliente=$scope.otvo.movimientos[index].idCliente
		}else{
			$scope.mov.tipo=$scope.otvo.comisiones[index].tipo;
			$scope.mov.monto=$scope.otvo.comisiones[index].monto;
			$scope.mov.descripcion=$scope.otvo.comisiones[index].descripcion;
			$scope.mov.banco=$scope.otvo.comisiones[index].banco;
			$scope.mov.cuenta=$scope.otvo.comisiones[index].cuenta;
			$scope.mov.empresa=$scope.otvo.comisiones[index].empresa;
			$scope.mov.idCliente=$scope.otvo.comisiones[index].idCliente;
		}
		indice=index;
		tipoOperacion=operacion;
	}

	$scope.Cuentas = function() {
		 ordenTrabajoservice.consultarCuentasPorBanco($scope.mov.banco).then(function(data){
			 $scope.cuentas= data;
		 }); 
	}
	
	//boton guardar del modal de editar movimiento
	$scope.updateMov=function(){
		if(tipoOperacion=='OPC'){
			$scope.otvo.movimientos[indice].banco=$scope.mov.banco;
			$scope.otvo.movimientos[indice].cuenta=$scope.mov.cuenta;
			$scope.otvo.movimientos[indice].empresa=$scope.mov.empresa;
			$scope.otvo.movimientos[indice].estatus="AUTORIZADO";
			ordenTrabajoservice.updateot($scope.otvo.movimientos[indice]).then(function(data){
				notificacionesService.notificaMovEditado($scope.otvo);
				$window.location.reload();
			});
		}else{
			$scope.otvo.comisiones[indice].banco=$scope.mov.banco;
			$scope.otvo.comisiones[indice].cuenta=$scope.mov.cuenta;
			$scope.otvo.comisiones[indice].empresa=$scope.mov.empresa;
			$scope.otvo.comisiones[indice].estatus="AUTORIZADO";
			ordenTrabajoservice.updateot($scope.otvo.comisiones[indice]).then(function(data){
				notificacionesService.notificaMovEditado($scope.otvo);
				$window.location.reload();
			});
		}
		$scope.limpiarMov();
	}
	
	
	//icon validar
	$scope.validMov=function(){
		if(tipoOperacion=='OPC'){
			$scope.otvo.movimientos[indice].numTransaccion=$scope.mov.numTransaccion;
			$scope.otvo.movimientos[indice].fecha=$scope.mov.fecha;
			$scope.otvo.movimientos[indice].estatus="VALIDADO";
		}else{
			$scope.otvo.comisiones[indice].numTransaccion=$scope.mov.numTransaccion;
			$scope.otvo.comisiones[indice].fecha=$scope.mov.fecha;
			$scope.otvo.comisiones[indice].estatus="VALIDADO";
		}
		if(cerrarOrden()){
			$scope.otvo.ot.listaBrockers=$scope.getIdBk;
			ordenTrabajoservice.cerrarOt($scope.otvo).then(function(data){
				if(tipoOperacion=='OPC'){
					$scope.resguardorest(tipoOperacion);
					ordenTrabajoservice.updateot($scope.otvo.movimientos[indice]).then(function(data){
						$window.location.reload();
					});
				}else{
					ordenTrabajoservice.updateot($scope.otvo.comisiones[indice]).then(function(data){
						$window.location.reload();
					});
				}
			});
		}else{
			if(tipoOperacion=='OPC'){
				$scope.resguardorest(tipoOperacion);
				ordenTrabajoservice.updateot($scope.otvo.movimientos[indice]).then(function(data){
					notificacionesService.notificaMovValidado($scope.otvo);
						$window.location.reload();
				});
			}else{
				ordenTrabajoservice.updateot($scope.otvo.comisiones[indice]).then(function(data){
					notificacionesService.notificaMovValidado($scope.otvo);
						$window.location.reload();
				});
			}
		}
	}
	$scope.closeOrder=function(){
	if($scope.brokers){
	if($scope.otvo.ot.estatus!="Cerrada"){	
		if(cerrarOrden()){
			$scope.otvo.ot.listaBrockers=$scope.getIdBk;
			ordenTrabajoservice.cerrarOt($scope.otvo).then(function(data){
				$window.location.reload();
			});
			
		}
	}
	}else{
		$window.location.reload();
	}
	}
	$scope.validaMov=function(){
		if(tipoOperacion=='OPC'){
			$scope.resguardorest(tipoOperacion);
		}else{
			$scope.resguardorest(tipoOperacion);}
		if(tipoOperacion=='OPC'){
			$scope.otvo.movimientos[indice].numTransaccion=0;
			$scope.otvo.movimientos[indice].fecha=$scope.mov.fecha;
			$scope.otvo.movimientos[indice].estatus="VALIDADO";
		}else{
			$scope.otvo.comisiones[indice].numTransaccion=0;
			$scope.otvo.comisiones[indice].fecha=$scope.mov.fecha;
			$scope.otvo.comisiones[indice].estatus="VALIDADO";
		}
		if(cerrarOrden()){
			ordenTrabajoservice.cerrarOt($scope.otvo).then(function(data){
				if(tipoOperacion=='OPC'){
					ordenTrabajoservice.updateot($scope.otvo.movimientos[indice]).then(function(data){
						$window.location.reload();
					});
				}else{
					ordenTrabajoservice.updateot($scope.otvo.comisiones[indice]).then(function(data){
						$window.location.reload();
					});
				}
			});
		}else{
			if(tipoOperacion=='OPC'){
				ordenTrabajoservice.updateot($scope.otvo.movimientos[indice]).then(function(data){
					notificacionesService.notificaMovValidado($scope.otvo);
						$window.location.reload();
				});
			}else{
				ordenTrabajoservice.updateot($scope.otvo.comisiones[indice]).then(function(data){
					notificacionesService.notificaMovValidado($scope.otvo);
						$window.location.reload();
				});
			}
		}
	}
	$scope.resguardorest=function(operacion){
		$scope.operaciones.tipo=$scope.mov.tipo;
		$scope.operaciones.monto=$scope.mov.monto;
		$scope.operaciones.descripcion=$scope.mov.descripcion;
		$scope.tipoResguardo=true;
		var broker=$scope.otvo.broker;
		for(var i in $scope.brokers){
			if($scope.getbroker[i].id== $scope.mov.idCliente){
				broker= $scope.getbroker[i];
				break;
			}
		}
		var objs=operacionesMovimientosService.addOper(operacion,$scope.operaciones, $scope.otvo, $scope.tipoResguardo,$scope.otvo.cliente,broker);

		if(operacion=="OPC"){
				ordenTrabajoservice.guardaCliente(objs.c);

		}else{
				ordenTrabajoservice.guardaCliente(objs.b);
		}
	}
	//Agregar movimientos
	$scope.addOper= function(operacion){
		var objs=operacionesMovimientosService.addOper(operacion,$scope.operaciones, $scope.otvo, $scope.tipoResguardo,$scope.otvo.cliente,$scope.otvo.broker);
		
		$scope.otvo = objs.otvo;
//		$scope.movimientosVO.movimiento=$scope.operaciones;
		if(operacion=="OPC"){
			if(!$scope.otvo.movimientos[$scope.otvo.movimientos.length-1].resguardo){
				$scope.otvo.movimientos[$scope.otvo.movimientos.length-1].resguardo=false;
			}
			$scope.otvo.movimientos[$scope.otvo.movimientos.length-1].idOrden=$scope.otvo.ot.id
			$scope.otvo.movimientos[$scope.otvo.movimientos.length-1].estatus="ACTIVO";
			$scope.otvo.movimientos[$scope.otvo.movimientos.length-1].fechaCreacion= new Date();
			$scope.movimientosVO.movimiento=$scope.otvo.movimientos[$scope.otvo.movimientos.length-1];
		}else{
			if(!$scope.otvo.comisiones[$scope.otvo.comisiones.length-1].resguardo){
				$scope.otvo.comisiones[$scope.otvo.comisiones.length-1].resguardo=false;
			}
			$scope.otvo.comisiones[$scope.otvo.comisiones.length-1].fechaCreacion= new Date();
			$scope.otvo.comisiones[$scope.otvo.comisiones.length-1].estatus="ACTIVO";
			$scope.movimientosVO.movimiento=$scope.otvo.comisiones[$scope.otvo.comisiones.length-1];
		}
		$scope.movimientosVO.movimiento.fecha=$scope.operaciones.fecha;
		$scope.movimientosVO.movimiento.fechaCreacion=$scope.operaciones.fechaCreacion;
		$scope.movimientosVO.idOt=$scope.otvo.ot.id;
		var moneda= $scope.otvo.pagos[0].moneda;
		if(operacion=="OPC"){
			if($scope.tipoResguardo){
				ordenTrabajoservice.guardaCliente(objs.c);
		}
			$scope.movimientosVO.bndMovimiento="cliente";
			$scope.movimientosVO.saldo=$scope.otvo.ot.saldoMov;
			ordenTrabajoservice.addMov($scope.movimientosVO).then(function(data){
				$window.location.reload();
			});
		}else{
			if($scope.tipoResguardo){
				ordenTrabajoservice.guardaCliente(objs.b);
			}
			$scope.movimientosVO.bndMovimiento="asesor";
			$scope.movimientosVO.saldo=$scope.otvo.ot.saldoCom;
			ordenTrabajoservice.addMov($scope.movimientosVO).then(function(data){
				$window.location.reload();
			});
	}
		$scope.operaciones=[];
		$scope.data=[];
	} 
	
	
	//Verifica si el tipo de operacion es de Resguardo
	$scope.isResguardo=function(operacion){
		$scope.errorSaldo="";
		var objs= operacionesMovimientosService.isResguardo(operacion, $scope.operaciones,$scope.tipoResguardo, $scope.otvo.ot,$scope.mxvalue);
		$scope.mov= objs.op;
		$scope.otvo.ot= objs.datos;
		$scope.tipoResguardo=objs.resguardo;
	}
	
	//Carga campos de detalle Cheque
	$scope.detalleCheque=function(index, operacion){
		$scope.cheque =operacionesMovimientosService.detalleCheque(index, operacion, $scope.otvo,$scope.cheque);
	}
	
	$scope.verificarSaldo=function(operacion){
		var objs= operacionesMovimientosService.verificarSaldoOP(operacion,$scope.tipoOP, $scope.otvo,$scope.otvo.ot, $scope.operaciones,$scope.montoRetorno,$scope.sumaMontoBrok,$scope.montoComi);
		$scope.errorSaldo= objs.error;
		if($scope.mxvalue<=$scope.operaciones.monto && operacion=="OPA"){
			$scope.errorSaldo="* ERROR: El monto supera el saldo establecido **"
		}
		
		
		if($scope.errorSaldo==" "){
			$scope.dis=false;
		}else{
			$scope.dis=true;
		}
		if(operacion == 'OPC'){
			$scope.otvo.ot.saldoMov = objs.saldo;
			
		}else{
			$scope.otvo.ot.saldoCom= objs.saldo;
		}
		if($scope.operaciones.tipo=="Cheque"){
			$scope.operaciones.montoLetra= NumeroALetras($scope.operaciones.monto);
			$scope.operaciones.montoLetra= $scope.operaciones.montoLetra.toUpperCase();
		}
	}

	$scope.limpiarMov=function(){
		$scope.mov.tipo= null;
		$scope.mov.monto= null;
		$scope.mov.descripcion= null;
		$scope.mov.banco= null;
		$scope.mov.cuenta= null;
		$scope.mov.fecha= null;
		$scope.mov.numTransaccion= null;	
		$scope.mov.fecha=new Date();
		$scope.mov.estatus= null;
		$scope.mov.montoLetra= null;
		$scope.mov.pagarA= null;
		$scope.mov.fEmision= new Date();
	}
	
	$scope.regresar=function(){
			$location.path("/listaOTs");
//			$window.location.reload();
	}
	$scope.nombreBroker=function(id){
		for(var i =0; i< $scope.getbroker.length; i++){
			if($scope.getbroker[i].id == id){
				return $scope.getbroker[i].nickname;
			}
		}
		return "";
	}
}]);	

app.controller("ordenTrabajo",['$rootScope', '$scope','$window', '$location', '$cookieStore','ordenTrabajoservice','usuarioservice','operacionesMovimientosService','notificacionesService','userFactory','empresaservice','brockerservice',
    function($rootScope, $scope, $window, $location, $cookieStore, ordenTrabajoservice,usuarioservice,operacionesMovimientosService,notificacionesService,userFactory,empresaservice,brockerservice){
	
	$scope.bk=[]
	brockerservice.consultarBrockersAll().then(function(data){
		$scope.bk=data;
		var index=$scope.bk.length;
		console.log("Lista de Brockers", data)
	});
	
	function crearListaDeCheques(){
		$scope.listaChequesCliente = "";
		$scope.listaChequesAsesor = "";
		for(var i in $scope.otvo.movimientos){
			if($scope.otvo.movimientos[i].tipo == "Cheque"){
				if($scope.listaChequesCliente == ""){
					$scope.listaChequesCliente= $scope.otvo.movimientos[i].id;
				}else{
					$scope.listaChequesCliente= $scope.listaChequesCliente + ',' + $scope.otvo.movimientos[i].id;
				}
			}
		}
		for(var i in $scope.otvo.comisiones){
			if($scope.otvo.comisiones[i].tipo == "Cheque"){
				if($scope.listaChequesAsesor == ""){
					$scope.listaChequesAsesor= $scope.otvo.comisiones[i].id;
				}else{
					$scope.listaChequesAsesor= $scope.listaChequesAsesor + ',' + $scope.otvo.comisiones[i].id;
				}
			}
		}
	}
	
	
	
//	CARGAR ORDEN DE TRABAJO
	ordenTrabajoservice.loadot($cookieStore.get("idOt")).then(function(data){
		$scope.otvo= data;
		$scope.recovery=data;
		console.log("toda la ot ", $scope.otvo.ot)
		$scope.mont=$scope.otvo.pagos.monto;
		$scope.tipoOP=$scope.otvo.ot.tipoOP;
//		$scope.tipoOperacion($scope.otvo.ot.tipoOP);
		$scope.getIdbk=$scope.otvo.ot.listaBrockers;
		
		$scope.getbroker=$scope.otvo.brokers;
		for(var i in $scope.getIdbks){
			var infd= $scope.getIdbks[i];
			$scope.idBrockerRest.push(infd);
		}
//		console.log("linea 1261",$scope.getIdbk[0] );
		console.log(data);	
		crearListaDeCheques();
		
		var sumaMontoPagos =0;
		 $scope.sumaMontoBrok =0;
		for(var i in $scope.otvo.pagos){
			var sumaMontoPagos= sumaMontoPagos + $scope.otvo.pagos[i].monto;
		}
		if($scope.otvo.ot.tipo !="ca"){
			$scope.tipoOT="general";
			$scope.iva= (sumaMontoPagos - $scope.otvo.ot.importe).toFixed(2);
			$scope.brokers = [];
			
				
			for(var o in $scope.getIdbk){
				for (var i = 0; i < $scope.bk.length; i+=1) {
					  if($scope.getIdbk[o]==$scope.bk[i].id){
						  $scope.getIdBk.push($scope.getIdbk[o]);
						  console.log("Id de los bk", $scope.getIdBk);
						  $scope.getIdbk[o]=$scope.bk[i].nickname;
//						  $scope.idbk=$scope.bk[i].id
						  var renglon= {nombre:$scope.getIdbk[o], porBrok:$scope.otvo.ot.porBrok[o], montoBrok: $scope.otvo.ot.montoBrok[o]};
							$scope.brokers.push(renglon);
						  console.log("Match",   $scope.getIdbk[o]);
					  }
					}
				}
					
				
			
			for(var i=0; i<$scope.otvo.ot.montoBrok.length; i++){
				$scope.sumaMontoBrok= ($scope.sumaMontoBrok) + ($scope.otvo.ot.montoBrok[i]);
			}
			var sumaMovimientos=0;
			for(var i=0; i<$scope.otvo.movimientos.length; i++){
				if($scope.otvo.movimientos[i].estatus!="CANCELADO"){
					sumaMovimientos= (sumaMovimientos) + ($scope.otvo.movimientos[i].monto);
				}
			}
			$scope.montoRetorno=(($scope.otvo.ot.retorno/100)*$scope.otvo.ot.importe).toFixed(2);
			$scope.montosTotal = parseInt($scope.otvo.ot.montoLic)+ parseInt($scope.otvo.ot.montoDes) + parseInt($scope.sumaMontoBrok) + parseInt($scope.montoRetorno);
			$scope.montoComi = ($scope.otvo.ot.montoLic)+ ($scope.otvo.ot.montoDes) + ($scope.sumaMontoBrok);
			
			$scope.otvo.ot.saldoMov = sumaMontoPagos - $scope.montoComi - sumaMovimientos;
			
		}else{
			$scope.tipoOT="ca";
		}
		
		if($scope.otvo.ot.estatus=="Cerrada"){
			$scope.ordenCerrada= true;
		}else{
			$scope.ordenCerrada=false;
		};
		$scope.limpiaOperaciones= function(){
			$scope.operaciones.tipo= null;
			$scope.operaciones.descripcion= null;
			$scope.operaciones.monto= null;
			$scope.operaciones.montoLetra= null;
			$scope.operaciones.pagarA= null;
			$scope.operaciones.fEmision= null;
			$scope.errorSaldo=" ";
			$scope.data=[];
		}
		$scope.cancelarOp = function(index,	operacion){
			var movVO={idOt:$scope.otvo.ot.id}
			if(operacion=="OPC"){
				$scope.otvo.movimientos[index].estatus="CANCELADO";
				$scope.otvo.ot.saldoMov=$scope.otvo.ot.saldoMov + $scope.otvo.movimientos[index].monto;
				movVO.movimiento=$scope.otvo.movimientos[index];
				movVO.saldo=$scope.otvo.ot.saldoMov;

			}
			if(operacion=="OPA"){
				$scope.otvo.comisiones[index].estatus="CANCELADO";
				$scope.otvo.ot.saldoCom=$scope.otvo.ot.saldoCom + $scope.otvo.comisiones[index].monto; 
				movVO.movimiento=$scope.otvo.comisiones[index];
				movVO.saldo=$scope.otvo.ot.saldoCom;

			}
			if(cerrarOrden()){
				ordenTrabajoservice.cerrarOt($scope.otvo).then(function(data){
					if(tipoOperacion=='OPC'){
						ordenTrabajoservice.updateot($scope.otvo.movimientos[index]).then(function(data){
							$window.location.reload();
						});
					}else{
						ordenTrabajoservice.updateot($scope.otvo.comisiones[index]).then(function(data){
							$window.location.reload();
						});
					}
				});
			}else{
				if(operacion=='OPC'){
					movVO.bndMovimiento="cliente";
					ordenTrabajoservice.cancelaMov(movVO).then(function(data){
						$window.location.reload();
					});
				}else{
					movVO.bndMovimiento="asesor";
					ordenTrabajoservice.cancelaMov(movVO).then(function(data){
						$window.location.reload();
					});
				}
			}
		}
		$rootScope.perfilUsuario = userFactory.getUsuarioPerfil();  //obtener perfl de usuario para pintar el menú al qe tiene acceso
		$scope.perfil=$rootScope.perfilUsuario;
		console.log("el perfil", $scope.perfil);
	});
	
}]);