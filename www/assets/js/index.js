
$(document).ready(function () {

      //location.href = "guardarLocalStorage.html";
      //localStorage.removeItem("push");
   // alert(JSON.parse(window.localStorage.getItem("push")));

    localStorage.setItem("URL", "http://sae1.imatronix.com:2614/WEBAPI_SERVICE");

    var value = window.localStorage.getItem("token");
    var username = window.localStorage.getItem("username");

    if (value === null) {

        location.href = "login.html";
        

    }

    else {
        mostrarMenu();

        $('#nameRight').text(username);
    }




});




function redirigir(ruta) {
  location.href=ruta;
}

function redirigirTicket(nivel1,nivel2) {
    location.href = "ticket.html?idNivel1=" + nivel1 + "&idNivel2=" + nivel2;
}

function logout(){
  localStorage.removeItem("token");
  location.href="login.html";
}

function showMenu(json){

  var selectObject = $('#level1');
                var jsonObject = eval(json);
                for (var n = 0; n < jsonObject.length; n++) {
                      $('#level1').append($('<option>', { 
                          value: jsonObject[n].idNivel1,
                          text : jsonObject[n].glosa
                      }));
                 }

}


function mostrarMenu(){

  var menuNivel1=window.localStorage.getItem("nivel1");


  if(menuNivel1==null){

    var urlGetLevel =window.localStorage.getItem("URL")+"/api/Nivel1";
    $.ajax({
            url: urlGetLevel,
            type: "GET",
            dataType: "json",
            success: function(json) {
              

                window.localStorage.setItem("nivel1",JSON.stringify(json));

                showMenu(json);

                
              
              
            },
            error:function (xhr, ajaxOptions, thrownError) {
               alert(JSON.stringify(thrownError));
          
            }
    });
  }

  else{

    showMenu(JSON.parse(menuNivel1));

    

  }

}

function showLevel2(json,idNivel1){

  var divApertura = "<div class='row text-center'>";
  var divCierre ="</div>";
  var html = "";
  var html2 = "";
  var contenido = "";

  var jsonObject = eval(json);

  var tope = jsonObject.length;
  var htmlDinamico = "";
  var htmlDinamicoCuerpo = "";

  if (tope > 1) {
      for (var n = 1; n <= jsonObject.length; n++) {
          if (n % 2 == 0) {
              if (n <= tope) {

                  htmlDinamico += divApertura + "  \n ";
                  htmlDinamico += "  <div class='col-50'>   \n";
                  htmlDinamico += "      <a href='#' onclick='redirigirTicket(" + idNivel1 + "," + json[n - 2].idNivel2 + ");return false;' class='menu-link'>  \n";
                  htmlDinamico += "         <span class='" + json[n - 2].imagen + "'></span>      \n";
                  htmlDinamico += "         <span>" + json[n - 2].glosa + "</span>    \n";
                  htmlDinamico += "      </a>   \n";
                  htmlDinamico += "  </div>   \n";

                  htmlDinamico += "  <div class='col-50'>    \n";
                  htmlDinamico += "      <a href='about.html' class='menu-link' onclick='redirigirTicket(" + idNivel1 + "," + json[n - 1].idNivel2 + ");return false;'>    \n";
                  htmlDinamico += "         <span class='" + json[n - 1].imagen + "'></span>    \n";
                  htmlDinamico += "         <span>" + json[n - 1].glosa + "</span>    \n";
                  htmlDinamico += "      </a>   \n";
                  htmlDinamico += "  </div>   \n";

                  htmlDinamico += "    \n" + divCierre + "     \n";

              }

          }
          else {
              if (n == tope) {
                htmlDinamico += divApertura + "  \n ";
                  htmlDinamico += "  <div class='col-50'>    \n";
                  htmlDinamico += "      <a href='about.html' class='menu-link' onclick='redirigirTicket(" + idNivel1 + "," + json[n - 1].idNivel2 + ");return false;'>    \n";
                  htmlDinamico += "         <span class='" + json[n - 1].imagen + "'></span>     \n";
                  htmlDinamico += "         <span>" + json[n-1].glosa + "</span>      \n";
                  htmlDinamico += "      </a>    \n";
                  htmlDinamico += "  </div>   \n";
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

 
  $("#menuDinamico").html(htmlDinamicoCuerpo);

}


function mostrarNivel2(idNivel1){

  $("#menuDinamico").html("");
  
  if (idNivel1 == 0) {
      return;
  }

  var menuNivel2=window.localStorage.getItem("nivel2"+idNivel1);

  if(menuNivel2==null){

        var urlGetLevel2 =window.localStorage.getItem("URL")+"/api/Nivel2/"+idNivel1;
        

        $.ajax({
            url: urlGetLevel2,
            type: "GET",
            dataType: "json",
            success: function (json) {

                window.localStorage.setItem("nivel2"+idNivel1,JSON.stringify(json));

                showLevel2(json,idNivel1);

                


            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(JSON.stringify(thrownError));
            }
        });


    }

    else{
      showLevel2(JSON.parse(menuNivel2),idNivel1);
    }


  

}


function crearCuenta(){
  location.href="crearUsuario.html";
}



$("#level1").change(function(){
  var valor = $("#level1").val();
  mostrarNivel2(valor);    
});





var permanentStorage = window.localStorage;