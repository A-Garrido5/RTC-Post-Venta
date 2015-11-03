
$(document).ready(function (){

	mostrarTicketsGuardados();

});


function mostrarTicketsGuardados(){


	var arreglo = JSON.parse(window.localStorage.getItem("push"));

	var htmlDinamico="";


	

	for(var i = 0; i < arreglo.length; i++){

		var k = i+1;

		var array= JSON.parse(arreglo[i]);

		var urgencia;
		
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
 		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+array.idSitio+"</strong></td>"
 		htmlDinamico+="			</tr>";
 		htmlDinamico+="			<tr class='ui-bar-a'>";
   		htmlDinamico+="				<td><strong style='font-size: 20px;'>ID Tipo:</strong></td>"
 		htmlDinamico+="				<td><strong style='font-size: 20px;'>"+array.idTipo+"</strong></td>"
 		htmlDinamico+="			</tr>";
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
 		htmlDinamico+="		</tbody>";
		htmlDinamico+="</table>";
		htmlDinamico+="<br>";
		htmlDinamico+="<br>";
		htmlDinamico+="<br>";
		htmlDinamico+="<br>";

		

		/*

		alert("Descripcion : "+array.descripcion);
		alert("Urgente : "+array.urgente);
		alert("Token : "+array.token);
		alert("ID del sitio : "+array.idSitio);
		alert("ID del Subsitio : "+array.idSubsitio);
		alert("ID del tipo : "+array.tipo);
	*/
		
	}



	$("#TicketsGuardados").html(htmlDinamico);


}

//{"descripcion": descripcion,"documentosCarga":fotos};