
$(document).ready(function () {



    var value = window.localStorage.getItem("username");
    if (value === null) {


        /*
        var ubicacionActual= window.location.pathname;
        //alert(ubicacionActual);
        //if(ubicacionActual!="login.html"){
        if(ubicacionActual==="/data/data/com.adobe.phonegap.app/files/files/phonegapdevapp/www/index.html"){
        }
        else if(ubicacionActual==="/data/data/com.adobe.phonegap.app/files/files/phonegapdevapp/www/login.html"){
        }
        else if(ubicacionActual==="/data/data/com.adobe.phonegap.app/files/files/phonegapdevapp/www/crearUsuario.html"){
        }
        else if(ubicacionActual!="/android_asset/www/login.html" && ubicacionActual!="/login.html" && ubicacionActual!="/crearUsuario.html" && ubicacionActual!="/android_asset/www/crearUsuario.html"){
        
        location.href="login.html";  
        }
        */
        location.href = "login.html";
        //javascript: mywindow.close(); ;
        //$('#dialogLogin').show();
        //$( "#dialogLogin" ).trigger( "click" );

        //$( '#dialogLogin' ).click ();

        //    document.getElementById('dialogLogin').onclick();




    }
    else {
        mostrarMenu();

        $('#nameRight').text(value);
    }




});

function redirigir(ruta) {
  location.href=ruta;
}

function redirigirTicket(nivel1,nivel2) {
    location.href = "ticket.html?idNivel1=" + nivel1 + "&idNivel2=" + nivel2;
}

function logout(){
  localStorage.removeItem("username");
  location.href="login.html";
}

/*
function login(datos){
  var urlLogin="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Login/"+datos;      
  $.ajax({
          url: urlLogin,
          type: "GET",
          dataType: "json",
          success: function(json) {
            var sesionvalida = parseInt(json.sesionValida);
            if(sesionvalida!=1){
              alert(json.mensaje);
                                  }
            else{
            $('#nameRight').text(json.nombres);
            localStorage.setItem("username", json.nombres);
              location.href = "index.html";
            }
          },
          error:function (xhr, ajaxOptions, thrownError) {
             alert(JSON.stringify(thrownError));
             alert(JSON.stringify(xhr));
          }
    });
}
*/

function mostrarMenu(){

  var urlGetLevel ="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Nivel1";
  $.ajax({
          url: urlGetLevel,
          type: "GET",
          dataType: "json",
          success: function(json) {
            if (json != "") {

               var selectObject = $('#level1');
               var jsonObject = eval(json);
               for (var n = 0; n < jsonObject.length; n++) {
                    $('#level1').append($('<option>', { 
                        value: jsonObject[n].idNivel1,
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


function mostrarNivel2(idNivel1){

    $("#menuDinamico").html("");
    if (idNivel1 == 0) {
        return;
    }
  var urlGetLevel2 ="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Nivel2/"+idNivel1;
  var divApertura = "<div class='row text-center'>";
  var divCierre ="</div>";
  var html = "";
  var html2 = "";
  var contenido = "";

  $.ajax({
      url: urlGetLevel2,
      type: "GET",
      dataType: "json",
      success: function (json) {

          var jsonObject = eval(json);

          /*
          html += divApertura;
          html += "  <div class='col-50'>";
          html += "      <a href='#' onclick='redirigirTicket(" + idNivel1 + "," + json[0].idNivel2 + ");return false;' class='menu-link'>";
          html += "         <span class='" + json[0].imagen + "'></span>";
          html += "         <span>" + json[0].glosa + "</span>"
          html += "      </a>"
          html += "  </div>";
          html += "  <div class='col-50'>";
          html += "      <a href='about.html' class='menu-link' onclick='redirigirTicket(" + idNivel1 + "," + json[1].idNivel2 + ");return false;'>";
          html += "         <span class='" + json[1].imagen + "'></span>";
          html += "         <span>" + json[1].glosa + "</span>"
          html += "      </a>"
          html += "  </div>";
          html += divCierre;
          html2 += divApertura;
          html2 += "  <div class='col-50'>";
          html2 += "      <a href='about.html' class='menu-link' onclick='redirigirTicket(" + idNivel1 + "," + json[2].idNivel2 + ");return false;'>";
          html2 += "         <span class='" + json[2].imagen + "'></span>";
          html2 += "         <span>" + json[2].glosa + "</span>"
          html2 += "      </a>"
          html2 += "  </div>";
          html2 += divCierre;
          */

          var tope = jsonObject.length;
          var htmlDinamico = "";
          var htmlDinamicoCuerpo = "";
          if (tope > 1) {
              for (var n = 1; n <= jsonObject.length; n++) {
                  if (n % 2 == 0) {
                      if (n <= tope) {

                         htmlDinamico += divApertura;
                          htmlDinamico += "  <div class='col-50'>";
                          htmlDinamico += "      <a href='#' onclick='redirigirTicket(" + idNivel1 + "," + json[n - 2].idNivel2 + ");return false;' class='menu-link'>";
                          htmlDinamico += "         <span class='" + json[n - 2].imagen + "'></span>";
                          htmlDinamico += "         <span>" + json[n - 2].glosa + "</span>"
                          htmlDinamico += "      </a>"
                          htmlDinamico += "  </div>";

                          htmlDinamico += "  <div class='col-50'>";
                          htmlDinamico += "      <a href='about.html' class='menu-link' onclick='redirigirTicket(" + idNivel1 + "," + json[n - 1].idNivel2 + ");return false;'>";
                          htmlDinamico += "         <span class='" + json[n - 1].imagen + "'></span>";
                          htmlDinamico += "         <span>" + json[n - 1].glosa + "</span>"
                          htmlDinamico += "      </a>"
                          htmlDinamico += "  </div>";

                        htmlDinamico += divCierre;




                      }

                  }
                  else {
                      if (n == tope) {
                        htmlDinamico += divApertura;
                          htmlDinamico += "  <div class='col-50'>";
                          htmlDinamico += "      <a href='about.html' class='menu-link' onclick='redirigirTicket(" + idNivel1 + "," + json[n - 1].idNivel2 + ");return false;'>";
                          htmlDinamico += "         <span class='" + json[n - 1].imagen + "'></span>";
                          htmlDinamico += "         <span>" + json[n-1].glosa + "</span>"
                          htmlDinamico += "      </a>"
                          htmlDinamico += "  </div>";
                          htmlDinamico += divCierre;
                        


                      }
                  }

                  htmlDinamicoCuerpo = htmlDinamico ;
              }
          }
          else if (tope == 1) {
              htmlDinamicoCuerpo += "  <div class='col-50'>";
              htmlDinamicoCuerpo += "      <a href='#' onclick='redirigirTicket(" + idNivel1 + "," + json[0].idNivel2 + ");return false;' class='menu-link'>";
              htmlDinamicoCuerpo += "         <span class='" + json[0].imagen + "'></span>";
              htmlDinamicoCuerpo += "         <span>" + json[0].glosa + "</span>"
              htmlDinamicoCuerpo += "      </a>"
              htmlDinamicoCuerpo += "  </div>";
              htmlDinamicoCuerpo = divApertura + htmlDinamicoCuerpo + divCierre;
          }

          /* for (var n = 0; n < jsonObject.length; n++) {              
                 
                 
          if(n%2==0){
          html+=divApertura;
          contenido+="  <div class='col-50'>\n";
          contenido+="      <a href='about.html' class='menu-link' onclick='redirigir('ticket.html?idNivel1="+idNivel1+"&idNivel2="+json[n].idNivel2+")>\n";
          contenido+="         <span class='"+json[n].imagen+"'></span>\n";
          contenido+="         <span>"+json[n].glosa+"</span>\n"
          contenido+="      </a>"
          contenido+="  </div>";  
          if(n===jsonObject.length-1){
          html+=contenido+divCierre;
          break;
          }
          }
          else{
          contenido+="  <div class='col-50'>\n";
          contenido+="      <a href='about.html' class='menu-link' onclick='redirigir('ticket.html?idNivel1="+idNivel1+"&idNivel2="+json[n].idNivel2+")>\n";
          contenido+="         <span class='"+json[n].imagen+"'></span>\n";
          contenido+="         <span>"+json[n].glosa+"</span>\n"
          contenido+="      </a>"
          contenido+="  </div>";  
          html+=contenido+divCierre; 
          }
                  
          //selectObject.append(new Option(jsonObject[n].glosa, jsonObject[n].idRegion.value));
                    
          }*/

          //alert(html);

          //$("#menuDinamico").html(html + html2);
          alert(htmlDinamicoCuerpo);
          $("#menuDinamico").html(htmlDinamicoCuerpo);


      },
      error: function (xhr, ajaxOptions, thrownError) {
          alert(JSON.stringify(thrownError));
          alert(JSON.stringify(xhr));
      }
  });



  

}


function crearCuenta(){
  location.href="crearUsuario.html";
}

function isNumber(e) {
      k = (document.all) ? e.keyCode : e.which;
      if (k==8 || k==0) return true;
      patron = /\w/ ;
      n = String.fromCharCode(k);
      return patron.test(n);
}

/*
$('#botonLogin').click(function() {
        var datosUsuario = $("#nombredeusuario").val()
        var datosPassword = $("#clave").val()
        var cripto = window.btoa(datosUsuario+'|'+datosPassword);
        login(cripto);
        
});
*/

$("#level1").change(function(){
  var valor = $("#level1").val();
  mostrarNivel2(valor);    
});





var permanentStorage = window.localStorage;