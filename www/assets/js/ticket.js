
function onDeviceReady() {

	pictureSource = navigator.camera.PictureSourceType;

	destinationType = navigator.camera.DestinationType;


}


$(document).ready(function (){




    obtenerSitios();

    obtenerTipos();

    obtenerNivel3();





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

      alert('Connection type: ' + states[networkState]);
}



    
$('#cancel').click(function() { 

	parent.history.back();


});



$('#TakePicture').click(function() { 

	capturePhoto();


});



function sendData(imageData){

	//alert("Foto tomada exitosamente");

	var image = document.getElementById('smallImage');
  image.src = imageData;
  image.style.display="";


}

function obtenerNivel3(){

	var urlGetLevel3 =window.localStorage.getItem("URL")+"/api/Nivel3/"+ getUrlVars()["idNivel2"];

  $.ajax({
          url: urlGetLevel3,
          type: "GET",
          dataType: "json",
          success: function(json) {


            if (json != "") {

               var jsonObject = eval(json);

               for (var n = 0; n < jsonObject.length; n++) {
       
                   $('#nivel3').append($('<option>', { 
                        value: jsonObject[n].idNivel3,
                        text : jsonObject[n].glosa
                    }));
               };
            }

               
      
            
          },
          error:function (xhr, ajaxOptions, thrownError) {
             alert(JSON.stringify(thrownError));
          }
    });

}

function obtenerNombreFoto () {
  

    var nombreFoto = (document.getElementById('smallImage').src).substr((document.getElementById('smallImage').src).lastIndexOf('/')+1);

    //showAlert(nombreFoto);

    return nombreFoto;
}

function guardaTicket(sitio,categoria,tipo,descripcion,urgente,idNivel3){

  
  var idUsuario = window.localStorage.getItem("idUsuario");
	
	var token = localStorage.getItem("token");

	var idNivel1 = getUrlVars()["idNivel1"];

	var idNivel2 = getUrlVars()["idNivel2"];

  var nombreFoto=obtenerNombreFoto();
	
  var datos = {"descripcion": descripcion, "urgente": urgente, "token": token, "idSitio":sitio  ,"idSubsitio": categoria,"idTipo":tipo,"idNivel1":idNivel1,"idNivel2":idNivel2,"idNivel3":idNivel3,"documentosCarga":idUsuario+'_'+nombreFoto}

  var estaConectado=checkConnection();

  //alert(estaConectado);

  if(estaConectado){

        	$.ajax({
                  url: window.localStorage.getItem("URL")+"/api/Ticket",
                  type: "POST",
                  data: datos,
                  
                 
                  success: function (result) {
                      showAlert("Se ha creado un ticket número: " + result);
                      location.href="index.html"
                  },
                 
                  error: function (xhr,status,p3,p4) {
                               
                      alert("error:");
                  }
          });
    }

    else{
      showAlert("No esta conectado");
    }
}




function uploadPhoto(imageURI) {

	var idUsuario = window.localStorage.getItem("idUsuario");

	var nombreArchivo = imageURI.substr(imageURI.lastIndexOf('/')+1);

  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName= idUsuario+"_"+nombreArchivo;
  options.mimeType="image/jpeg";

  var params = new Object();

  options.params = params;

  var estaConectado=checkConnection();

  var ft = new FileTransfer();

  if(estaConectado){
    ft.upload(imageURI, encodeURI(window.localStorage.getItem("URL")+"/api/Documento"), win, fail, options);
  }



    
}


function win(r) {
	
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

	alert('Fallo ocurrido:  ' + message);

}


function obtenerSitios(){

	var urlGetSitio =window.localStorage.getItem("URL")+"/api/Sitio";

  $.ajax({
          url: urlGetSitio,
          type: "POST",
          dataType: "json",
          success: function(json) {


            if (json != "") {

               var selectObject = $('#edificio');

               var jsonObject = eval(json);

                

               for (var n = 0; n < jsonObject.length; n++) {
                  
                    $('#edificio').append($('<option>', { 
                        value: jsonObject[n].idSitio,
                        text : jsonObject[n].nombre
                    }));
               };
            }

               
      
            
          },
          error:function (xhr, ajaxOptions, thrownError) {
             alert(JSON.stringify(thrownError));
             
          }
    });

}

function obtenerTipos(){

  var urlGetTipo =window.localStorage.getItem("URL")+"/api/SubsitioTipo";

  $.ajax({
          url: urlGetTipo,
          type: "POST",
          dataType: "json",
          success: function(json) {


            if (json != "") {

               var selectObject = $('#tipo');

               var jsonObject = eval(json);

                

               for (var n = 0; n < jsonObject.length; n++) {
                    //selectObject.append(new Option(jsonObject[n].glosa, jsonObject[n].idRegion.value));
                    $('#tipo').append($('<option>', { 
                        value: jsonObject[n].idTipo,
                        text : jsonObject[n].glosa
                    }));
               };
            }

               
      
            
          },
          error:function (xhr, ajaxOptions, thrownError) {
             alert(JSON.stringify(thrownError));
             alert(JSON.stringify(xhr));
          }
    });


}

function obtenerCategoria(idSitio, idTipo){

	var urlGetCategoria =window.localStorage.getItem("URL")+"/api/Subsitio";


  $.ajax({
          url: urlGetCategoria,
          type: "POST",
          dataType: "json",
          data: {"idSitio": idSitio, "idTipo": idTipo},
          success: function(json) {
          
          

            if (json != "") {

               var selectObject = $('#categoria');

               var jsonObject = eval(json);

               

               for (var n = 0; n < jsonObject.length; n++) {
                    //selectObject.append(new Option(jsonObject[n].glosa, jsonObject[n].idRegion.value));
                    $('#categoria').append($('<option>', { 
                        value: jsonObject[n].idSubSitio,
                        text : jsonObject[n].glosa
                    }));
               };
            }

               
      		
            
          },
          error:function (xhr, ajaxOptions, thrownError) {
             alert(JSON.stringify(thrownError));
             alert(JSON.stringify(xhr));
          }
    });


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
    //alert("Nivel 3 inválido");
    corregir+="- Nivel 3\n"
    errores++;
  }

  if(sitio==0){
    //alert("Sitio inválido");
    corregir+="- Sitio\n"
    errores++;

  }

  if(tipo==0){
    //alert("Tipo inválido");
    corregir+="- Tipo\n"
    errores++;
  }

  if (descripcion=="") {
    corregir+="- descripcion\n"
    errores++;
  }

  if (errores>0) {
    showError(corregir,"Errores: "+errores)
    //alert(+"\n\n"+);
    return false;
  }

  else{
    return true;
  }

}

$('#save').click(function(){


    var sitio=$('#edificio').val();

    var categoria=$('#categoria').val();

    var tipo =$('#tipo').val();

    var descripcion=$('#descripcion').val();

    var urgente = $('#roundedOne').is(':checked');

    var idNivel3 = $('#nivel3').val();

    var esValido=validarCampos(sitio,categoria,tipo,descripcion,idNivel3);

    var idUsuario = window.localStorage.getItem("idUsuario");
  
    var token = localStorage.getItem("token");

    var idNivel1 = getUrlVars()["idNivel1"];

    var idNivel2 = getUrlVars()["idNivel2"];

    var nombreFoto=obtenerNombreFoto();

    var array = window.localStorage.getItem("push");

    if (array==null) {
      var local=[];
    }

    else{
      var local= JSON.parse(array);
    }

    var datos = {"descripcion": descripcion, "urgente": urgente, "token":token, "idSitio":sitio,"idSubsitio": categoria,"idTipo":tipo,"idNivel1":idNivel1,"idNivel2":idNivel2,"idNivel3":idNivel3,"documentosCarga":idUsuario+'_'+nombreFoto}

    local.push(JSON.stringify(datos));

    localStorage.setItem("push",JSON.stringify(local));

    alert("Foto guardada");



});

$('#accept').click(function() {


	var sitio=$('#edificio').val();

	var categoria=$('#categoria').val();

	var tipo =$('#tipo').val();

	var descripcion=$('#descripcion').val();

	var urgente = $('#roundedOne').is(':checked');

  var idNivel3 = $('#nivel3').val();

  var esValido=validarCampos(sitio,categoria,tipo,descripcion,idNivel3);

	if(document.getElementById("smallImage").style.display!="none"){
		
		var foto = document.getElementById("smallImage").innerHTMl;
			
	}

	else{
		document.getElementById("smallImage").src=null;
		
	}

  if (esValido) {
      
      if(document.getElementById("smallImage").src!=null)
        uploadPhoto(document.getElementById('smallImage').src);

      guardaTicket(sitio,categoria,tipo,descripcion,urgente,idNivel3);    
  }


	//enviarTicket(edificio,criticidad,categoria,descripcion,urgente,foto);




});






$("#edificio").change(function(){

	
	var categoria = $('#categoria').empty();

	categoria.append($('<option>', { 
	                        value: 0,
	                        text : ".Seleccionar."
	}));


	var selectEdificio = document.getElementById("edificio").selectedIndex;
	var selectTipo = document.getElementById("tipo").selectedIndex;

	if(selectEdificio!= 0 && selectTipo != 0){
		obtenerCategoria($('#edificio').val(),$('#tipo').val());
	}
	

        
});


$("#tipo").change(function(){

	
	var categoria = $('#categoria').empty();

	categoria.append($('<option>', { 
	                        value: 0,
	                        text : ".Seleccionar."
	}));

	var selectEdificio = document.getElementById("edificio").selectedIndex;
	var selectTipo = document.getElementById("tipo").selectedIndex;

	if(selectEdificio!= 0 && selectTipo != 0){
		obtenerCategoria($('#edificio').val(),$('#tipo').val());
	}
	
        
});

document.addEventListener("deviceready", onDeviceReady, false);

  
  
  function onDeviceReady() {
      
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
