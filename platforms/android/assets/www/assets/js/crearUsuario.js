
$(document).ready(function (){

  obtenerRegiones();

});


function redirigir(ruta){

  location.href=ruta;

}


function obtenerRegiones(){


  var urlGetRegion ="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Region";

  $.ajax({
          url: urlGetRegion,
          type: "GET",
          dataType: "json",
          success: function(json) {


            if (json != "") {

               var selectObject = $('#region');

               var jsonObject = eval(json);

                

               for (var n = 0; n < jsonObject.length; n++) {
                    //selectObject.append(new Option(jsonObject[n].glosa, jsonObject[n].idRegion.value));
                    $('#region').append($('<option>', { 
                        value: jsonObject[n].idRegion,
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

function obtenerCiudades(){

  var region = $('#region').val();

  var ciudad = $('#city').empty();

  ciudad.append($('<option>', { 
                        value: "-",
                        text : "Seleccionar ..."
  }));

  var urlGetCity ="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Ciudad/"+region;

  $.ajax({
          url: urlGetCity,
          type: "GET",
          dataType: "json",
          success: function(json) {


            if (json != "") {

               

               var jsonObject = eval(json);

               //alert(JSON.stringify(json));

              

               for (var n = 0; n < jsonObject.length; n++) {
                    //selectObject.append(new Option(jsonObject[n].glosa, jsonObject[n].idRegion.value));
                    ciudad.append($('<option>', { 
                        value: jsonObject[n].idCiudad,
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


function obtenerComunas(){

  var ciudad = $('#city').val();

  var comuna = $('#comuna').empty();

  comuna.append($('<option>', { 
                        value: "-",
                        text : "Seleccionar ..."
  }));

  

  var urlGetComuna ="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Comuna/"+ciudad;


  $.ajax({
          url: urlGetComuna,
          type: "GET",
          dataType: "json",
          success: function(json) {


            if (json != "") {

               

               var jsonObject = eval(json);

              // alert(JSON.stringify(json));

              

               for (var n = 0; n < jsonObject.length; n++) {
                    //selectObject.append(new Option(jsonObject[n].glosa, jsonObject[n].idRegion.value));
                    comuna.append($('<option>', { 
                        value: jsonObject[n].idComuna,
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


function validarCampos(){

  var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var filter6=/^[A-Za-z\_\-\.\s\xF1\xD1]+$/;
  var num = /^([0-9])*$/;

  var errores=0;


  
  if (!filter6.test(document.getElementById("userName").value)){
    alert("Nombre de usuario inválido");
    errores++;
  }
  
  if (!filter6.test(document.getElementById("userLastName").value)){
    alert("Apellido inválido");
    errores++;
  }
  

  if (!expr.test(document.getElementById("email").value)){
    alert("Correo inválido");
    errores++;
  }

  if(document.getElementById("pass").value.length<4){
    alert("La contraseña debe ser mayor a 4 caracteres");
    errores++;
  }

  if(document.getElementById("pass").value != document.getElementById("passConfirm").value){
    alert("Las contraseñas no coinciden");
    errores++;
  }

  if(!num.test(document.getElementById("mobileFono").value)){
    alert("Número de celular inválido");
    errores++;
  }

  if($("#region").val()==='-'){
    alert("Region inválida");
    errores++;
  }

  if($("#city").val()==='-'){
    alert("Ciudad inválida");
    errores++;
  }

  if($("#comuna").val()==='-'){
    alert("Comuna inválida");
    errores++;
  }

  if(errores>0){
    alert("Errores: "+errores);
    return false;  
  }  

  else{
    return true;  
  }

  

}

function crearUsuario(nombres, apellidos, mail, contrasena, telefono, celular, direccion, idPais,idRegion, idCiudad, idComuna){

  var urlCreate ="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Usuario";
  var dataUsuario = { "nombres": nombres, 
                    "apellidos": apellidos, 
                    "password": contrasena,
                    "mail": mail,
                    "movil": celular,
                    "direccion": direccion,
                    "idRegion":  idRegion ,
                    "idCiudad":  idCiudad ,
                    "idComuna":  idComuna 
                  };





  $.ajax({
           
            //dataType: 'json',
            url: "http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Usuario",
            type: "POST",
            contentType:"application/json; charset=utf-8",
            //dataType:"json",
            //dataType: "json",
            data: JSON.stringify(dataUsuario),

            
           
            success: function (result) {
                alert("Usuario creado exitosamente");

                redirigir("login.html");

            },
           
            error: function (xhr,status,p3,p4) {
           
                alert("error:" + JSON.stringify(xhr));
            }
    });

}

$('#sendToCreate').click(function() {

        var esValido=validarCampos();

        var nombres = $("#userName").val();
        var apellidos = $("#userLastName").val();
        var mail = $("#email").val();
        var contrasena = $("#pass").val();
        var repetirPass = $("#passConfirm").val();
        var telefono = $("#fono").val();
        var celular = $("#mobileFono").val();
        var direccion = $("#address").val();
        var idPais = "";
        var idRegion = $("#region").val();
        var idCiudad = $("#city").val();
        var idComuna = $("#comuna").val();


        

        if(esValido){
          
          crearUsuario(nombres,apellidos,mail,contrasena,telefono,celular,direccion,idPais,idRegion,idCiudad,idComuna);
        }

   
        

        
        //location.href="login.html"

});

$("#region").change(function(){

  var comuna = $('#comuna').empty();

    comuna.append($('<option>', { 
                          value: "-",
                          text : "Seleccionar ..."
    }));
  
  if($("#region").val()!='-'){
    obtenerCiudades();
  }

  else{

    var ciudad = $('#city').empty();

    ciudad.append($('<option>', { 
                          value: "-",
                          text : "Seleccionar ..."
    }));




  }
        
});


$("#city").change(function(){
  
  if($("#city").val()!='-'){
    obtenerComunas();
  }

  else{

    var comuna = $('#comuna').empty();

    comuna.append($('<option>', { 
                          value: "-",
                          text : "Seleccionar ..."
    }));

  }
        
});



