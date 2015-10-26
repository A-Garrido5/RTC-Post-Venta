
function onDeviceReady() {

	pictureSource = navigator.camera.PictureSourceType;

	destinationType = navigator.camera.DestinationType;

}

$(document).ready(function (){

  obtenerSitios();

});

$('#descripcion').val(null);


    
$('#cancel').click(function() { 

	parent.history.back();


});



$('#TakePicture').click(function() { 

	capturePhoto();


});



function sendData(imageData){

	alert("Foto tomada exitosamente");

	var image = document.getElementById('smallImage');
    image.src = imageData;
    image.style.display="";


}


function enviarTicket(edificio, criticidad, categoria, descripcion, urgente, foto){





    var urlLogin = "http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Documento";


    $.ajax({
           
            //dataType: 'json',, 
            url: "http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Documento",
            type: "POST",
            data: {"idDocumento": 0, "idTicket": 1, "fecha": "2015-07-07", "documento": "FOTO.JPG" },
            
           
            success: function (result) {
                alert("OK");
            },
           
            error: function (xhr,status,p3,p4) {
           
                alert("error:" + JSON.stringify(xhr));
            }
    });

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

$('#accept').click(function() { 

	var edificio=$('#edificio').val();
	var criticidad=$('#criticidad').val();
	var categoria=$('#categoria').val();

	var descripcion=$('#descripcion').val();

	var urgente = $('#roundedOne').is(':checked');

	if(document.getElementById("smallImage").style.display!="none"){
		
		var foto = document.getElementById("smallImage").innerHTMl;
		alert(foto);		
	}

	else{
		document.getElementById("smallImage").src=null;
		alert("No hay foto");
	}

	enviarTicket(edificio,criticidad,categoria,descripcion,urgente,foto);




});