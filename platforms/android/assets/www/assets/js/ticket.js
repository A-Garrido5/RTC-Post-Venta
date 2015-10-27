
function onDeviceReady() {

	pictureSource = navigator.camera.PictureSourceType;

	destinationType = navigator.camera.DestinationType;

  
    if (navigator.notification) { // Si disponemos de notificaciones nativas, sobreescribimos el alert del navegador:
            window.alert = function (message) {
                    navigator.notification.alert(
                    message,    // mensaje
                    null,       // función de callback
                    "Workshop", // título
                    'OK'        // Nombre botón
            );
          };
    }	  

}

 



$(document).ready(function (){



    obtenerSitios();

    obtenerTipos();

    obtenerNivel3();





});

$('#descripcion').val(null);


    
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

               //var selectObject = $('#edificio');

               var jsonObject = eval(json);

                

               for (var n = 0; n < jsonObject.length; n++) {
                    //selectObject.append(new Option(jsonObject[n].glosa, jsonObject[n].idRegion.value));
                   $('#nivel3').append($('<option>', { 
                        value: jsonObject[n].idNivel3,
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

function guardaTicket(sitio,categoria,tipo,descripcion,urgente){

	
	var token = localStorage.getItem("token");

	var idNivel1 = getUrlVars()["idNivel1"];

	var idNivel2 = getUrlVars()["idNivel2"];

	var idNivel3 = $('#nivel3').val();

	  $.ajax({
           
            //dataType: 'json',, 
            url: "http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Ticket",
            type: "POST",
            data: {"descripcion": descripcion, "urgente": urgente, "token": token, "idSitio":sitio  ,"idSubsitio": categoria,"idTipo":tipo,"idNivel1":idNivel1,"idNivel2":idNivel2,"idNivel3":idNivel3},
            
           
            success: function (result) {
                alert("Se ha creado un ticket número: " + result);
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
    params.value1 = "Hola mundo";
    params.value2 = "Priueba";
    params.value3 = "adrian";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Documento"), win, fail, options);


    
}


function win(r) {
	
  alert("Foto enviada");
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}



function capturePhoto() {



	navigator.camera.getPicture(sendData,
        function(message) { alert('get picture failed'); },
        { quality: 30, 
            destinationType: navigator.camera.DestinationType.FILE_URI
         }   //sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
        );

}



function onFail(message) {

	alert('Failed because: ' + message);

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
                    //selectObject.append(new Option(jsonObject[n].glosa, jsonObject[n].idRegion.value));
                    $('#edificio').append($('<option>', { 
                        value: jsonObject[n].idSitio,
                        text : jsonObject[n].nombre
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

$('#accept').click(function() { 

	var sitio=$('#edificio').val();

	var categoria=$('#categoria').val();

	var tipo =$('#tipo').val();

	var descripcion=$('#descripcion').val();

	var urgente = $('#roundedOne').is(':checked');

	if(document.getElementById("smallImage").style.display!="none"){
		
		var foto = document.getElementById("smallImage").innerHTMl;
			
	}

	else{
		document.getElementById("smallImage").src=null;
		
	}


	uploadPhoto(document.getElementById('smallImage').src);

	guardaTicket(sitio,categoria,tipo,descripcion,urgente);
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