var fotos=[];

var nombresFotos=[];



function onDeviceReady() {

	pictureSource = navigator.camera.PictureSourceType;

	destinationType = navigator.camera.DestinationType;


}


$(document).ready(function (){

    obtenerNivel3();

    obtenerSitios();



    document.getElementById("edificio").selectedIndex = "1";

    obtenerCategoria($('#edificio').val(),2);
    document.getElementById("categoria").selectedIndex = "1";



    

});

function checkConnection() {
      
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';

      if(states[networkState]=='No network connection'){
        return false;
      }

      else{
        return true;
      }

}



    
$('#cancel').click(function() { 

	parent.history.back();


});



$('#TakePicture').click(function() { 

	capturePhoto();


});



function sendData(imageData){

  fotos.push(imageData);

  nombresFotos.push(imageData.substr(imageData.lastIndexOf('/')+1));

  var htmlDinamico="";
	
  for(var i=0;i<fotos.length;i++){

    htmlDinamico+="<img style='width:90%;height:250px;margin-left: 10px;'src='"+fotos[i]+"'/> <br><br><br>";


  }


  $("#imagenes").html(htmlDinamico);

}

function concatenarNombres(){

  var idUsuario = window.localStorage.getItem("idUsuario");

  var acumulador="";

  for(var i = 0; i < nombresFotos.length;i++){
    
      acumulador+=idUsuario+'_'+nombresFotos[i]+'|';
    
  }

  return acumulador;
}

function showLevel3(json){

  var jsonObject = eval(json);

 for (var n = 0; n < jsonObject.length; n++) {

     $('#nivel3').append($('<option>', { 
          value: jsonObject[n].idNivel3,
          text : jsonObject[n].glosa
      }));
 }

}

function obtenerNivel3(){

	var urlGetLevel3 =window.localStorage.getItem("URL")+"/api/Nivel3/"+ 1;

  var nivel3 = window.localStorage.getItem("Nivel3");

  if(nivel3==null){

    $.ajax({
            url: urlGetLevel3,
            type: "GET",
            dataType: "json",
            success: function(json) {

                window.localStorage.setItem("Nivel3",JSON.stringify(json));

                showLevel3(json);

                 
                             
        
              
            },
            error:function (xhr, ajaxOptions, thrownError) {
               alert(JSON.stringify(thrownError));
            }
      });
  }

  else{
    showLevel3(JSON.parse(nivel3));
  }
}


function guardaTicket(sitio,categoria,tipo,descripcion,urgente,idNivel3){
	
	var token = localStorage.getItem("token");

	var idNivel1 = getUrlVars()["idNivel1"];

	var idNivel2 = getUrlVars()["idNivel2"];

  var photoNames = concatenarNombres();

	
  var datos = {"descripcion": descripcion, "urgente": urgente, "token": token, "idSitio":sitio  ,"idSubsitio": categoria,"idTipo":tipo,"idNivel1":idNivel1,"idNivel2":idNivel2,"idNivel3":idNivel3,"documentosCarga": photoNames};

        	$.ajax({
                  url: window.localStorage.getItem("URL")+"/api/Ticket",
                  type: "POST",
                  data: datos,
                  async: false,                  
                 
                  success: function (result) {
                      showAlert("Se ha creado un ticket número: " + result);
                      location.href="index.html"
                  },
                 
                  error: function (xhr,status,p3,p4) {
                               
                      alert(JSON.stringify(xhr));
                  }
          });
    }






function uploadPhoto(imageURI) {

	var idUsuario = window.localStorage.getItem("idUsuario");

	var nombreArchivo = imageURI.substr(imageURI.lastIndexOf('/')+1);

  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName= idUsuario+"_"+nombreArchivo;
  options.mimeType="image/jpeg";

  
  
  var params = new Object();

  params = {"descripcion": "Soy descripcion", "urgente":"Soy urgente" , "token": "Soy el token", "idSitio":"Soy el sitio"  ,"idSubsitio": "Soy el Subsitio","idTipo":"Soy el tipo","idNivel1":"Soy el nivel 1","idNivel2":"Soy el nivel 2","idNivel3":"Soy el nivel 3"};

  options.params = params;

  var estaConectado=checkConnection();

  var ft = new FileTransfer();

  if(estaConectado){
    ft.upload(imageURI, encodeURI(window.localStorage.getItem("URL")+"/api/Documento"), win, fail, options);
  }



    
}


function win(r) {

  alert(JSON.stringify(r));
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    
}



function capturePhoto() {



	navigator.camera.getPicture(sendData,
        function(message) { alert('Fallo la captura de la foto'); },
        { quality: 30, 
            destinationType: navigator.camera.DestinationType.FILE_URI
         }  
        );

}



function onFail(message) {


}


function mostrarSitios(json){

     var jsonObject = eval(json);

      

     for (var n = 0; n < jsonObject.length; n++) {
        
          $('#edificio').append($('<option>', { 
              value: jsonObject[n].idSitio,
              text : jsonObject[n].nombre
          }));
     };

}


function obtenerSitios(){

	var urlGetSitio =window.localStorage.getItem("URL")+"/api/Sitio";

  var sitios = window.localStorage.getItem("sitios");

  if(sitios==null){

      $.ajax({
              url: urlGetSitio,
              type: "POST",
              dataType: "json",
              success: function(json) {


                  window.localStorage.setItem("sitios",JSON.stringify(json));

                   mostrarSitios(json);

                   
          
                
              },
              error:function (xhr, ajaxOptions, thrownError) {
                 alert(JSON.stringify(thrownError));
                 
              }
        });
    }

    else{
      mostrarSitios(JSON.parse(sitios));
    }
}

function mostrarTipos(json){

  var selectObject = $('#tipo');

               var jsonObject = eval(json);

                

               for (var n = 0; n < jsonObject.length; n++) {
                    $('#tipo').append($('<option>', { 
                        value: jsonObject[n].idTipo,
                        text : jsonObject[n].glosa
                    }));
               }
            

}

function obtenerTipos(){

  var urlGetTipo =window.localStorage.getItem("URL")+"/api/SubsitioTipo";

  var tipos = window.localStorage.getItem("Tipos");

  if(tipos==null){

        $.ajax({
                url: urlGetTipo,
                type: "POST",
                dataType: "json",
                success: function(json) {

                  window.localStorage.setItem("Tipos",JSON.stringify(json));

                  mostrarTipos(json);
                  

                     

                     
            
                  
                },
                error:function (xhr, ajaxOptions, thrownError) {
        
                   alert(JSON.stringify(xhr));
                }
          });

      }

      else{
        mostrarTipos(JSON.parse(tipos));
      }
}

function mostrarSubsitios(json){

       var jsonObject = eval(json);

       

       for (var n = 0; n < jsonObject.length; n++) {
            
            $('#categoria').append($('<option>', { 
                value: jsonObject[n].idSubSitio,
                text : jsonObject[n].glosa
            }));
       }

}

function obtenerCategoria(idSitio, idTipo){

	var urlGetCategoria =window.localStorage.getItem("URL")+"/api/Subsitio";


  var Subsitios = window.localStorage.getItem("Subsitios"+idSitio);


  if(Subsitios==null){

          $.ajax({
                  url: urlGetCategoria,
                  type: "POST",
                  dataType: "json",
                  async: false,
                  data: {"idSitio": idSitio, "idTipo": idTipo},
                  success: function(json) {
                  
                      window.localStorage.setItem("Subsitios"+idSitio,JSON.stringify(json));

                      mostrarSubsitios(json);

                       
              		
                    
                  },
                  error:function (xhr, ajaxOptions, thrownError) {
                     alert(JSON.stringify(xhr));
                  }
            });
  }

  else{
    mostrarSubsitios(JSON.parse(Subsitios));
  }

  
}

function getUrlVars(){

    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
}

function validarCampos(sitio,categoria,tipo,descripcion,idNivel3){

  var errores=0;
  var corregir="Debe corregir: \n\n"


  if (idNivel3==0) {
    corregir+="- Nivel 3\n"
    errores++;
  }

  if(sitio==0){
    corregir+="- Sitio\n"
    errores++;

  }

  if(tipo==0){
    corregir+="- Tipo\n"
    errores++;
  }

  if (descripcion=="") {
    corregir+="- descripcion\n"
    errores++;
  }

  if (errores>0) {
    showError(corregir,"Errores: "+errores)
    return false;
  }

  else{
    return true;
  }

}

function guardarTicketLocalStorage(){
  
    var sitio=$('#edificio').val();
    var categoria=$('#categoria').val();
    var tipo =$('#tipo').val();
    var descripcion=$('#descripcion').val();
    var urgente = $('#roundedOne').is(':checked');
    var idNivel3 = $('#nivel3').val();  
    var token = localStorage.getItem("token");
    var idNivel1 = getUrlVars()["idNivel1"];
    var idNivel2 = getUrlVars()["idNivel2"];
    var array = window.localStorage.getItem("push");
    
    if (array==null) {
      var local=[];
    }

    else{
      var local= JSON.parse(array);
    }

    var datos = {"descripcion": descripcion, "urgente": urgente, "token":token, "idSitio":sitio,"idSubsitio": categoria,"idTipo":tipo,"idNivel1":idNivel1,"idNivel2":idNivel2,"idNivel3":idNivel3,"documentosCarga":fotos};

    local.push(JSON.stringify(datos));

    localStorage.setItem("push",JSON.stringify(local));

    showAlert("Ticket guardado");

    location.href="index.html";

}



$('#accept').click(function() {


	var sitio=$('#edificio').val();

	var categoria=$('#categoria').val();

	var tipo =$('#tipo').val();

	var descripcion=$('#descripcion').val();

	var urgente = $('#roundedOne').is(':checked');

  var idNivel3 = $('#nivel3').val();

  var esValido=validarCampos(sitio,categoria,tipo,descripcion,idNivel3);

  if (esValido) {

      var estaConectado=checkConnection();


      if(estaConectado){
                       
            
            //guardaTicket(sitio,categoria,tipo,descripcion,urgente,idNivel3);    

            for(var i=0;i<fotos.length;i++){
                uploadPhoto(fotos[i]);
            }
      }

      else{
        showConfirm("El equipo no posee conexión a Internet.\n\n     ¿Desea guardar el ticket?");
      }
  }



});




$("#edificio").change(function(){

	
	var categoria = $('#categoria').empty();

	categoria.append($('<option>', { 
	                        value: 0,
	                        text : ".Seleccionar."
	}));


	var selectEdificio = document.getElementById("edificio").selectedIndex;

	
	obtenerCategoria($('#edificio').val(),2);

  document.getElementById("categoria").selectedIndex = "1";
	
	

        
});


document.addEventListener("deviceready", onDeviceReady, false);

  
  
  function onDeviceReady() {

    document.addEventListener("backbutton", onBackKeyDown, false);
      
  }

  
      function alertDismissed() {
         
      }

  
  function showAlert(message) {
      navigator.notification.alert(
          message,                
          alertDismissed,         
          'Aviso',            
          'Ok'                  
      );
  }

  function showError(message,titulo) {
      navigator.notification.alert(
          message,                
          alertDismissed,         
          titulo,            
          'Ok'                  
      );
    }

  function onConfirm(buttonIndex) {
        
        if(buttonIndex==2){

          guardarTicketLocalStorage();

        }
    }

    function showConfirm(message) {
        navigator.notification.confirm(
            message, // message
             onConfirm,            // callback to invoke with index of button pressed
            'Confirmar',           // title
            ['Cancelar','Ok']         // buttonLabels
        );
    }

    function onBackKeyDown() {
      
    }



