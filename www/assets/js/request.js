$(document).ready(function (){



    obtenerSolicitudes();





});


function obtenerSolicitudes(){

	var token = window.localStorage.getItem("token");
	var htmlDinamico="";
	

	var urlGetRequests ="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Ticket/"+token;

  	$.ajax({
    	    url: urlGetRequests,
        	type: "GET",
          	dataType: "json",
          	success: function(json) {

          		

          		var jsonObject = eval(json);
          		
          		/*
	         	alert(json[0].nombreSitio);
	         	alert(json[0].nombreTipo);
	         	alert(json[0].nombreSubSitio);
	         	alert(json[0].fechaIngreso);
	         	alert(json[0].descripcion);
	         	alert(json[0].urgente);
	         	*/

	         	for(var i=0;i<jsonObject.length;i++){

	         		var j = i+1;

	         		htmlDinamico+="<table data-role='table' id='table-custom-2' class='ui-body-d'>";
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
	         		htmlDinamico+="		</tbody>";
	         		htmlDinamico+="</table>"
	         		htmlDinamico+="<br>"

	         		/*
					<strong style="font-size: 35px;">Datum:</strong><br />

	         		 <table data-role="table" id="table-custom-2" class="ui-body-d">
                                                    <thead>
                                                        <tr class="ui-bar-d">
                                                            <th>Cabecera 1</th>
                                                           
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Fila 1 Col. 1</td>
                                                            <td>Fila 1 Col. 2</td>
                                                            <td>Fila 1 Col. 3</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Fila 2 Col. 1</td>
                                                            <td>Fila 2 Col. 2</td>
                                                            <td>Fila 2 Col. 3</td>
                                                        </tr>
                                                        
                                                    </tbody>
                                                </table>
		         	htmlDinamico += "<div class='class='form-row'>";

		         	htmlDinamico += "<label class='label-entrada'>"+i+"</label> <br>\n";
		         	htmlDinamico += "<label class='label-entrada'>Sitio:  "+json[i].nombreSitio+"</label><br>\n";
		         	htmlDinamico += "<label class='label-entrada'>Tipo:  "+json[i].nombreTipo+"</label><br>\n";
		         	htmlDinamico += "<label class='label-entrada'>Sub-sitio:  "+json[i].nombreSubSitio+"</label><br>\n";
		         	htmlDinamico += "<label class='label-entrada'>Fecha de ingreso:  "+json[i].fechaIngreso+"</label><br>\n";
		         	htmlDinamico += "<label class='label-entrada'>Descripcion:  "+json[i].descripcion+"</label><br>\n";
		         	htmlDinamico += "<label class='label-entrada'>Urgente:  "+json[i].urgente+"</label><br>\n";

		         	htmlDinamico+="</div>" */
		         }
	     

	         	$("#contenido").html(htmlDinamico);

               
      
            
         	},
	        error:function (xhr, ajaxOptions, thrownError) {
	            alert(JSON.stringify(thrownError));
	        }
    });
}