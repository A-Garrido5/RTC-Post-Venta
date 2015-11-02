
$(document).ready(function (){

	mostrarTicketsGuardados();

});


function mostrarTicketsGuardados(){

	alert("Quiero mostrar los tickste");

var arreglo = JSON.parse(window.localStorage.getItem("push"));

var htmlDinamico="";


					htmlDinamico+="<table data-role='table' id='table-custom-2' class='ui-body-d'>";
	         		htmlDinamico+="		<thead>";
	         		htmlDinamico+="			<tr class='ui-bar-d'>";
	         		htmlDinamico+="				<th>Solicitud </th>";
	         		htmlDinamico+="				<th>asdasdashjasd</th>";
	         		htmlDinamico+="			</tr>";
	         		htmlDinamico+="		</thead>"
	         		htmlDinamico+="</table>";
	         		htmlDinamico+="<br>";
	         		htmlDinamico+="<br>";
	         		htmlDinamico+="<br>";
	         		htmlDinamico+="<br>";

for(var i = 0; i < arreglo.length; i++){

	var k = i+1;

	var array= JSON.parse(arreglo[i]);

	

	/*

	alert("Descripcion : "+array.descripcion);
	alert("Urgente : "+array.urgente);
	alert("Token : "+array.token);
	alert("ID del sitio : "+array.idSitio);
	alert("ID del Subsitio : "+array.idSubsitio);
	alert("ID del tipo : "+array.tipo);
*/
	
}

alert(htmlDinamico);
console.log(htmlDinamico);


$("TicketsGuardados").html(htmlDinamico);


}

//{"descripcion": descripcion, "urgente": urgente, "token":token, "idSitio":sitio,"idSubsitio": categoria,"idTipo":tipo,"idNivel1":idNivel1,"idNivel2":idNivel2,"idNivel3":idNivel3,"documentosCarga":fotos};