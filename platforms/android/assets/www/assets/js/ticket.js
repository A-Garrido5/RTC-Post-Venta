
function onDeviceReady() {

	pictureSource = navigator.camera.PictureSourceType;

	destinationType = navigator.camera.DestinationType;


}


$(document).ready(function (){



    obtenerSitios();

    obtenerTipos();

    obtenerNivel3();





});


    
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

	var urlGetLevel3 ="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Nivel3/"+ getUrlVars()["idNivel2"];

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

  

	
	var token = localStorage.getItem("token");

	var idNivel1 = getUrlVars()["idNivel1"];

	var idNivel2 = getUrlVars()["idNivel2"];

	


  var nombreFoto=obtenerNombreFoto();

	$.ajax({
          url: "http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Ticket",
          type: "POST",
          data: {"descripcion": descripcion, "urgente": urgente, "token": token, "idSitio":sitio  ,"idSubsitio": categoria,"idTipo":tipo,"idNivel1":idNivel1,"idNivel2":idNivel2,"idNivel3":idNivel3,"documentosCarga":nombreFoto},
          
         
          success: function (result) {
              showAlert("Se ha creado un ticket número: " + result);
              location.href="index.html"
          },
         
          error: function (xhr,status,p3,p4) {
                       
              alert("error:");
          }
  });

}




function uploadPhoto(imageURI) {

	var nombreUsuario = window.localStorage.getItem("username");

	var nombreArchivo = imageURI.substr(imageURI.lastIndexOf('/')+1);

  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName= nombreUsuario+"-"+nombreArchivo;
  options.mimeType="image/jpeg";

  var params = new Object();

  options.params = params;

  var ft = new FileTransfer();
  ft.upload(imageURI, encodeURI("http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Documento"), win, fail, options);


    
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

	var urlGetSitio ="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Sitio";

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

  var urlGetTipo ="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/SubsitioTipo";

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

	var urlGetCategoria ="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Subsitio";


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


  if (idNivel3==0) {
    alert("Nivel 3 inválido");
    errores++;
  }

  if(sitio==0){
    alert("Sitio inválido");
    errores++;

  }

  if(tipo==0){
    alert("Tipo inválido");
    errores++;
  }

  if (descripcion=="") {
    alert("Descripcion inválida");
    errores++;
  }

  if (errores>0) {
    alert("Errores: "+errores);
    return false;
  }

  else{
    return true;
  }

}

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
