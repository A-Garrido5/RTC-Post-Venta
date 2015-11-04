var tickets = [];

var terminoMandarTicket=false;
var terminoMandarFoto=false;

$(document).ready(function (){

	mostrarTicketsGuardados();

});




function mostrarTicketsGuardados(){


	var arreglo = JSON.parse(window.localStorage.getItem("push"));


	var htmlDinamico="";

	if(arreglo==null){
		htmlDinamico+="<label class='entrada'>No existen tickets guardados</label>";
		document.getElementById('accept').style.display="none";
	}

	
	else{

		for(var i = 0; i < arreglo.length; i++){

		var k = i+1;

		var array= JSON.parse(arreglo[i]);

		var urgencia;

		var numeroFotos = array.documentosCarga.length;
		
		if(array.urgente){
			urgencia="Si";
		}

		else{
			urgencia="No"
		}


		htmlDinamico+="<table data-role='table' id='table-custom-2'>";
		htmlDinamico+="		<thead>";
		htmlDinamico+="			<tr class='ui-bar-a'>";
		htmlDinamico+="				<th>Ticket "+k+" </th>";
		htmlDinamico+="			</tr>";
		htmlDinamico+="		</thead>"
		htmlDinamico+="		<tbody>";
 		htmlDinamico+="			<tr class='ui-bar-a'>";
   		htmlDinamico+="				<td><strong style='font-size: 20px;'>ID Sitio:</strong></td>"
 		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+array.idSitio+"</strong></td>"
 		htmlDinamico+="			</tr>";
 		htmlDinamico+="			<tr class='ui-bar-a'>";
   		htmlDinamico+="				<td><strong style='font-size: 20px;'>ID Sub-sitio:</strong></td>"
 		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+array.idSubsitio+"</strong></td>"
 		htmlDinamico+="			</tr>";
 		//htmlDinamico+="			<tr class='ui-bar-a'>";
   		//htmlDinamico+="				<td><strong style='font-size: 20px;'>ID Tipo:</strong></td>"
 		//htmlDinamico+="				<td><strong style='font-size: 20px;'>"+array.idTipo+"</strong></td>"
 		//htmlDinamico+="			</tr>";
 		htmlDinamico+="			<tr class='ui-bar-a'>";
   		htmlDinamico+="				<td><strong style='font-size: 20px;'>ID nivel 1:</strong></td>"
 		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+array.idNivel1+"</strong></td>"
 		htmlDinamico+="			</tr>";
 		htmlDinamico+="			<tr class='ui-bar-a'>";
   		htmlDinamico+="				<td><strong style='font-size: 20px;'>ID nivel 2:</strong></td>"
 		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+array.idNivel2+"</strong></td>"
 		htmlDinamico+="			</tr>";
 		htmlDinamico+="			<tr class='ui-bar-a'>";
   		htmlDinamico+="				<td><strong style='font-size: 20px;'>ID nivel 3:</strong></td>"
 		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+array.idNivel3+"</strong></td>"
 		htmlDinamico+="			</tr>";
 		htmlDinamico+="			<tr class='ui-bar-a'>";
   		htmlDinamico+="				<td><strong style='font-size: 20px;'>Urgente:  </strong></td>"
 		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+urgencia+"</strong></td>"
 		htmlDinamico+="			</tr>";
 		htmlDinamico+="			<tr class='ui-bar-a'>";
   		htmlDinamico+="				<td><strong style='font-size: 20px;'>Token:  </strong></td>"
 		htmlDinamico+="				<td><strong style='font-size: 12px;'>"+array.token+"</strong></td>"
 		htmlDinamico+="			</tr>";
 		htmlDinamico+="			<tr class='ui-bar-a'>";
   		htmlDinamico+="				<td><strong style='font-size: 20px;'>Descripción:  </strong></td>"
 		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+array.descripcion+"</strong></td>"
 		htmlDinamico+="			</tr>";

 		if(numeroFotos>0){
 			for(var x =0;x<numeroFotos;x++){

 				var y = x+1;

 				htmlDinamico+="			<tr class='ui-bar-a'>";
		   		htmlDinamico+="				<td><strong style='font-size: 20px;'>Foto "+y+":  </strong></td>"
		 		htmlDinamico+="				<td><img style='width:auto;height:auto;'src='"+array.documentosCarga[x]+"'/></td>"
		 		htmlDinamico+="			</tr>";

 			}
 		}
 		


 		htmlDinamico+="		</tbody>";
		htmlDinamico+="</table>";
		htmlDinamico+="<br>";
		htmlDinamico+="<br>";
		htmlDinamico+="<br>";
		htmlDinamico+="<br>";
		
	}

	}

	

	


	$("#TicketsGuardados").html(htmlDinamico);


}

function enviarTextoTicket(datos,esUltimo,numeroTickets){


	
	
	
	
	$.ajax({
                  url: window.localStorage.getItem("URL")+"/api/Ticket",
                  type: "POST",
                  async: false,
                  data: datos,
                  
                 
                  success: function (result) {
                  		tickets.push(result);
                  		
                  		if (esUltimo) {
							
							showAlert("Se han creado los siguientes tickets "+tickets);
							tickets=[];
							terminoMandarTicket=true;
						}
                      //showAlert("Se ha creado un ticket número: " + result);
                      
                  },
                 
                  error: function (xhr,status,p3,p4) {
                               
                      alert("Error de conexión");
                  }
          });
}


function uploadPhoto(imageURI, esUltimaFoto) {

	var idUsuario = window.localStorage.getItem("idUsuario");

	var nombreArchivo = imageURI.substr(imageURI.lastIndexOf('/')+1);

	var options = new FileUploadOptions();
	options.fileKey="file";
	options.fileName= idUsuario+"_"+nombreArchivo;
	options.mimeType="image/jpeg";

	var params = new Object();

	options.params = params;

	var ft = new FileTransfer();

	
	ft.upload(imageURI, encodeURI(window.localStorage.getItem("URL")+"/api/Documento"), win, fail, options);

	if (esUltimaFoto) {
		terminoMandarFoto=true;
	}
	



    
}


function win(r) {
	
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    
}


function enviarTicketsGuardados(){

	var nombreFoto="";

	var esUltimo=false;

	var esUltimaFoto=false;

	var arreglo = JSON.parse(window.localStorage.getItem("push"));

	for(var i=0;i<arreglo.length;i++){

		
		array = JSON.parse(arreglo[i]);

		for(var j=0;j<array.documentosCarga.length;j++){

			nombreFoto+=array.documentosCarga[j].substr(array.documentosCarga[j].lastIndexOf('/')+1)+"|";
		}


		var datos = {
			"descripcion": array.descripcion, 
			"urgente": array.urgente, 
			"token": array.token,
			"idSitio":array.idSitio,
			"idSubsitio": array.idSubsitio,
			"idTipo":array.idTipo,
			"idNivel1":array.idNivel1,
			"idNivel2":array.idNivel2,
			"idNivel3":array.idNivel3,
			"documentosCarga": nombreFoto};

		if(i==arreglo.length-1){
			esUltimo=true;
		}

		enviarTextoTicket(datos,esUltimo,i+1)

		for(var k=0;k<array.documentosCarga.length;k++){


			if(k==array.documentosCarga.length-1){
				esUltimaFoto=true;
			}

			uploadPhoto(array.documentosCarga[k],esUltimaFoto);

		}



		
	}


	
		if(terminoMandarTicket && terminoMandarFoto)
			window.localStorage.removeItem("push");
			nombreFoto="";

}

$('#accept').click(function() {

	var estaConectado=checkConnection();

	if(estaConectado) {

		enviarTicketsGuardados();
	}

	else{
		showAlert("El equipo aún se encuentra sin conexión\n\n         Intentelo más tarde");
	}


});

$('#cancel').click(function() { 

	parent.history.back();


});


document.addEventListener("deviceready", onDeviceReady, false);

  
  
  function onDeviceReady() {
      
  }

  
      function alertDismissed() {
         
      }


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

  