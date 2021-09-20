(function(){
    angular.module('apgApp').controller('apgController',apgController);
    function apgController($scope,$http){
        /*scopes*/
        $scope.form = true;
        $scope.table = false;
        $scope.count = false;
        $scope.titleBtn = "Guardar";
        $scope.empleado = {matricula: "",nombre:"",apellidos:"",sueldo:"",fechaAlta:""};
        $scope.empleados = [];
        const URL = "http://localhost:8080/empleados";
        const CADENAVACIA = "";

        /*Metodos*/
        $scope.agregar = function(){
            /*Validación de campos*/
            for(let empleado in $scope.empleado){
                if($scope.empleado[empleado] == CADENAVACIA && empleado != "fechaAlta"){
                    alert("No deje vacio el campo "+empleado);
                    return false;
                }
            }
            /*envia datos*/
            $http({
                method: "POST",
                url: ($scope.titleBtn == "Guardar") ? URL : URL+"/"+$scope.empleado.matricula,
                data: $scope.empleado
            }).then(function(response){
                $scope.mostrar();
                $scope.titleBtn = "Guardar";        
            }, function(response){
                console.log(response);
            });
        }

        $scope.editar = function(empleado){
            $scope.titleBtn = "Editar";
            $scope.empleado.matricula = empleado.matricula;
            $scope.empleado.nombre = empleado.nombre;
            $scope.empleado.apellidos = empleado.apellidos;
            $scope.empleado.sueldo = empleado.sueldo;
        }

        $scope.mostrar = function(){
            $scope.empleados = [];
            $scope.table = true;
            $http.get(URL)
            .then(function(response){
                console.log(response);
                $scope.empleados = response.data;
                var tamano = response.data.length;
                if(tamano > 0){
                    $scope.count = true;
                }else{
                    $scope.count = false;
                }
            });
        }

        $scope.eliminar = function(matricula){
            /*envia datos*/
            $http({
                method: "DELETE",
                url:URL+"/"+matricula
            }).then(function(response){
                console.log(response);
                $scope.mostrar();
            }, function(response){
                console.log(response);
            });       
        }

        $scope.limpiar = function(){
            $scope.empleado.matricula = CADENAVACIA;
            $scope.empleado.nombre = CADENAVACIA;
            $scope.empleado.apellidos = CADENAVACIA;
            $scope.empleado.sueldo = CADENAVACIA;
            $scope.empleado.fechaAlta = CADENAVACIA;       
        }   
    }
})();