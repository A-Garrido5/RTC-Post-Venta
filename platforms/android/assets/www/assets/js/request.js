
var estaConectado;


function mostrarSolicitudes(json){

	var htmlDinamico="";


          		
         

	         	for(var i=0;i<json.length;i++){

	         		var indice = json[i].fechaIngreso.indexOf("T");
	         		var fecha = json[i].fechaIngreso.substr(0,10);

	         		var stringHora= json[i].fechaIngreso.toString();

	         		var hora=stringHora.slice(11,16);
	         		
	           		var urgente;

	         		if(json[i].urgente==true){
	         			urgente="Si"
	         		}

	         		else{
	         			urgente="No"
	         		}



	         		
	         		var j = i+1;

	         		htmlDinamico+="<table data-role='table' id='table-custom-2' class='ui-responsive'>";
	         		htmlDinamico+="		<thead>";
	         		htmlDinamico+="			<tr class='ui-bar-d'>";
	         		htmlDinamico+="				<th>Solicitud "+j+"</th>";
	         		htmlDinamico+="			</tr>";
	         		htmlDinamico+="		</thead>"
	         		htmlDinamico+="		<tbody>";
	         		htmlDinamico+="			<tr class='ui-bar-d'>";
	           		htmlDinamico+="				<td><strong style='font-size: 20px;'>Sitio:</strong></td>"
	         		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+json[i].nombreSitio;+"</strong></td>"
	         		htmlDinamico+="			</tr>";
	         		htmlDinamico+="			<tr class='ui-bar-d'>";
	         		htmlDinamico+="				<td><strong style='font-size: 20px;'>Tipo:</strong></td>"
	         		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+json[i].nombreTipo;+"</strong></td>"
	         		htmlDinamico+="			</tr>";
	         		htmlDinamico+="			<tr class='ui-bar-d'>";
	         		htmlDinamico+="				<td><strong style='font-size: 20px;'>Sub-sitio:</strong></td>"
	         		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+json[i].nombreSubSitio;+"</strong></td>"
	         		htmlDinamico+="			</tr>";
	         		htmlDinamico+="			<tr class='ui-bar-d'>";
	         		htmlDinamico+="				<td><strong style='font-size: 20px;'>Fecha ingreso:</strong></td>"
	         		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+fecha+"</strong></td>"
	         		htmlDinamico+="			</tr>";
	         		htmlDinamico+="			<tr class='ui-bar-d'>";
	         		htmlDinamico+="				<td><strong style='font-size: 20px;'>Hora :</strong></td>"
	         		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+hora+"</strong></td>"
	         		htmlDinamico+="			</tr>";
	         		htmlDinamico+="			<tr class='ui-bar-d'>";
	         		htmlDinamico+="				<td><strong style='font-size: 20px;'>Descripción :</strong></td>"
	         		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+json[i].descripcion+"</strong></td>"
	         		htmlDinamico+="			</tr>";
	         		htmlDinamico+="			<tr class='ui-bar-d'>";
	         		htmlDinamico+="				<td><strong style='font-size: 20px;'>Urgente :</strong></td>"
	         		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+urgente+"</strong></td>"
	         		htmlDinamico+="			</tr>";
	         		htmlDinamico+="		</tbody>";
	         		htmlDinamico+="</table>";
	         		htmlDinamico+="<br>";
	         		htmlDinamico+="<br>";
	         		htmlDinamico+="<br>";
	         		htmlDinamico+="<br>";

	         		
		         }
	     

	         	$("#contenido").html(htmlDinamico);
}


function obtenerSolicitudes(conexion){

	var token = window.localStorage.getItem("token");
	var htmlDinamico="";

	var urlGetRequests =window.localStorage.getItem("URL")+"/api/Ticket/"+token;

	var request = window.localStorage.getItem("Solicitudes");

	if(request==null){

		if(conexion){
	  	$.ajax({
	    	    url: urlGetRequests,
	        	type: "GET",
	          	dataType: "json",
	          	success: function(json) {

	          		window.localStorage.setItem("Solicitudes",JSON.stringify(json));

	          		
	          		mostrarSolicitudes(json);
	          		

	               
	      
	            
	         	},
		        error:function (xhr, ajaxOptions, thrownError) {
		            alert(JSON.stringify(thrownError));
		        }
	    });
	  }

	  else{
	  	showError("No hay conexion a Internet\n\n           Intentelo más tarde","Error de conexión");
	  	location.href="index.html";
	  }


	}

	else{
		mostrarSolicitudes(JSON.parse(request));
	}
}



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


    function onOnline() {               
            estaConectado=true;
            obtenerSolicitudes(estaConectado);
}

//If User is Offline....................................
document.addEventListener("offline", onOffline, false);
function onOffline() {
    estaConectado=false;

    obtenerSolicitudes(estaConectado);

}
    document.addEventListener("online", onOnline, false);



    
$('#cancel').click(function() { 

	parent.history.back();


});


