$(document).ready(function (){




	obtenerBotones();

	


});


function irNivel2 (idBoton) {
	location.href="nivel2.html?id="+idBoton;
}






function mostrarMenu(json){

  var bla = JSON.stringify(json);

  //alert(JSON.stringify(json));

  //alert(json.length);

  
  
  //alert(json.d.toString());

  var x;
/*
  $.each(json,function(){

    x += '1';

  });

  alert(x);
*/
  //json.forEach(alert("hola mundo"));
}







function obtenerBotones(){

  var capa = document.getElementById("capa");

  
  var html;
  //nav.innerHTML = "Probando agregar HTML";

  html = "<div class=\"page-content\">\n"
  html += "<nav class=\"dashboard-menu\">"

  alert(html);

  var urlGetButton ="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Nivel1";

  $.ajax({
          url: urlGetButton,
          type: "GET",
          dataType: "json",
          //contentType: "application/json"
          success: function(json) {

           for(var k in json){
              alert(k);


            }


            /*

             $.each(customers, function () {
           html += "<li class='three columns'>";
           html += "   <article class='" + this.lienzo.toString() + "'>";
           html += "       <figure class='mosaic-block'>";
           html += "           <a href='/paginas/blog.aspx'>See more</a>";
           html += "               <img src='/images/properties/" + this.rutaImagen.toString() + "' alt='property-200x148' />";
           html += "       </figure>";
           html += "<div class='description'>";
           html += "   <h6>" + this.titulo.toString() + "</h6>";
           html += "   <p>" + this.descripcionCorta.toString() + "</p>";
           html += "</div>";
           html += "<div class='tools'>";
           if (this.mostrarPrecio == 1) {
               html += "   <p class='price'>$"+ this.precio.toString() +"</p>";
           }
           else
           {
               html += "   <p class='price'>N/D</p>";
           }
           html += "   <a href='' class='button'>detalles</a>";
           html += "</div>";
           html += "</article>";
           html += "</li>";
       });

          */


            //$("#galeriaMejoresPropiedades").html(html == "" ? "No results" : html);
              //var titulo = createElement("h1")

              




           	

           	

           	
            
          },
          error:function (xhr, ajaxOptions, thrownError) {
             alert(JSON.stringify(thrownError));
             alert(JSON.stringify(xhr));
          }
    });
}