
// Products Table Angular App
angular.module('productsTableApp', [])

// create a controller for the table
.controller('ProductsController', function($scope,$http){
 
  // initialize the array
  $scope.disabled=true;
  $scope.showLoadings={
    state:false,
    response:false,
    error:false,
    afnd:false,
    afd:false
  };
  $scope.comprobarState={
    state:false,
    response:false,
    error:false
  };
  $scope.hilera="";
  var reset =function(){
     $scope.showLoadings={
    state:false,
    response:false,
    error:false,
    afnd:false,
    afd:false
  };
  };
   var resetComprobar =function(){
     $scope.comprobarState={
    state:false,
    response:false,
    error:false
  };
  };

 
   $scope.datosMejores=[
    {"data":[{"es":"A"},{"es":"A,B,C,D"},{"es":"C"}],"acept":false},
    {"data":[{"es":"B"},{"es":"C"},{"es":"B,C"}],"acept":true},
    {"data":[{"es":"C"},{"es":"A"},{"es":"A,B"}],"acept":false},
      {"data":[{"es":"D"},{"es":"A,D"},{"es":"A,B,C"}],"acept":true}
];
  $scope.simbolosMejores=[{"sim":"0"},{"sim":"1"}];

  $scope.resetData=function(){
      $scope.datosMejores=[
    {"data":[{"es":""},{"es":""},{"es":""}],"acept":false}
    ];
    $scope.simbolosMejores=[{"sim":""},{"sim":""}];
    reset();
    resetComprobar();
    $scope.hilera="";
     $scope.disabled=true;
  };
  
  $scope.peticion=function(){
    reset();
    resetComprobar();
     $scope.showLoadings.state=true;
    var req = {
 method: 'POST',
url: 'https://rest-teoria.herokuapp.com/process',
 //url: 'http://localhost:8080/process',
 headers: {
   'Content-Type': 'application/json'
 },
 data: {"datos":$scope.datosMejores,
        "simbolos":$scope.simbolosMejores
       }
};
    //console.log(req.data);
    $http(req).then(function mySucces(response) {
      $scope.disabled=false;
       obj=response;
      console.log(obj);
       $scope.showLoadings.state=false;
       $scope.showLoadings.response=true;
       //console.log("Respuesta ",obj);
      console.log("Correcto");
     $scope.datosMejores=obj.data.datos;
      $scope.simbolosMejores=obj.data.simbolos;
      if(obj.data.automata){
         $scope.showLoadings.afnd=true;
      }else{
         $scope.showLoadings.afd=true;
      }
      // $scope.isPaneShown = false;
      
    }, function myError(response) {
      $scope.showLoadings.state=false;
      $scope.showLoadings.error=true;
        console.log("Error");
    });
   
  };
   $scope.comprobarHilera=function(){
   
    resetComprobar();
     $scope.comprobarState.state=true;
    var req = {
 method: 'POST',
 url: 'https://rest-teoria.herokuapp.com/try',
 //url: 'http://localhost:8080/try',
 headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
 },
 data:  $.param({name: $scope.hilera})
};
    //console.log(req.data);
    $http(req).then(function mySucces(response) {
       obj=response;
      console.log(obj);
      if(obj.data){
      $scope.comprobarState.state=false;
       $scope.comprobarState.response=true;
       //console.log("Respuesta ",obj);
      console.log("Correcto");

      // $scope.isPaneShown = false;
      }else{
         $scope.comprobarState.state=false;
          $scope.comprobarState.error=true;
      }
    }, function myError(response) {
        $scope.comprobarState.state=false;
        $scope.comprobarState.error=true;
        console.log("Error");
    });
  
  };
	// add a column
  $scope.addColumn = function(){
    //you must cycle all the rows and add a column 
    //to each one
    /*$scope.data.forEach(function($row){
      $row.push({"es":""})
    });*/
    $scope.datosMejores.forEach(function($row){
      $row.data.push({"es":""})
    });
    /*$scope.simbol.push([{"simbolo":""}]);*/
    $scope.simbolosMejores.push({"sim":""});
   
    
  };

  // remove the selected column
  $scope.removeColumn = function () {
    // remove the column specified in index
    // you must cycle all the rows and remove the item
    // row by row
  if($scope.simbolosMejores.length>1){
    $scope.simbolosMejores.splice(-1,1);
    $scope.datosMejores.forEach(function (row) {
      row.data.splice(-1,1);
		
      //if no columns left in the row push a blank array
      if (row.data.length === 0) {
        row.data = [];
         $scope.simbolosMejores=[];
      }
    });
  }else{
    
    var myEl = angular.element( document.querySelector( '.remCol' ) );
myEl.addClass('disabled');
  }
  };

  // remove the selected row
  $scope.removeRow = function(index){
    // remove the row specified in index
   /*if($scope.data.length>1){
    $scope.data.splice( index, 1);
    // if no rows left in the array create a blank array
    if ($scope.data.length === 0){
      $scope.data = [];
    }
    }*/
    if($scope.datosMejores.length>1){
    $scope.datosMejores.splice(index, 1);
    // if no rows left in the array create a blank array
    if ($scope.datosMejores.length === 0){
      $scope.datosMejores = [];
    }
    }
  
  
  };

  //add a row in the array
  $scope.addRow = function(){
    // create a blank array
        var newrow={"data":[],"acept":false};
        var newsimb={};
		 
      // if array is blank add a standard item
    
    if ($scope.datosMejores.length === 0) {
        newrow = {"data":[],"acept":false};
          
        newsimb={"sim":""};
        
      } else {
        // else cycle thru the first row's columns
        // and add the same number of items
        $scope.datosMejores[0].data.forEach(function (row) {
          newrow.data.push({"es":""});
        });
      }
    // add the new row at the end of the array 
    $scope.datosMejores.push(newrow);
  };
})
;