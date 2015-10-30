
$(document).ready(function (){

  obtenerRegiones();

});


function redirigir(ruta){

  location.href=ruta;

}


function obtenerRegiones(){


  var urlGetRegion =window.localStorage.getItem("URL")+"/api/Region";

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
             
          }
    });
}



function obtenerCiudades(){

  var region = $('#region').val();

  var ciudad = $('#city').empty();

  ciudad.append($('<option>', { 
                        value: 0,
                        text : ".Seleccionar."
  }));

  var urlGetCity =window.localStorage.getItem("URL")+"/api/Ciudad/"+region;

  $.ajax({
          url: urlGetCity,
          type: "GET",
          dataType: "json",
          success: function(json) {


            if (json != "") {

               

               var jsonObject = eval(json);



              

               for (var n = 0; n < jsonObject.length; n++) {
        
                    ciudad.append($('<option>', { 
                        value: jsonObject[n].idCiudad,
                        text : jsonObject[n].glosa
                    }));
               }
            }

               
      
            
          },
          error:function (xhr, ajaxOptions, thrownError) {
             alert(JSON.stringify(thrownError));
             
          }
    });

}


function obtenerComunas(){

  var ciudad = $('#city').val();

  var comuna = $('#comuna').empty();

  comuna.append($('<option>', { 
                        value: 0,
                        text : ".Seleccionar."
  }));

  

  var urlGetComuna =window.localStorage.getItem("URL")+"/api/Comuna/"+ciudad;


  $.ajax({
          url: urlGetComuna,
          type: "GET",
          dataType: "json",
          success: function(json) {


            if (json != "") {

               

               var jsonObject = eval(json);

              

               for (var n = 0; n < jsonObject.length; n++) {
                    
                    comuna.append($('<option>', { 
                        value: jsonObject[n].idComuna,
                        text : jsonObject[n].glosa
                    }));
               };
            }

               
      
            
          },
          error:function (xhr, ajaxOptions, thrownError) {
             alert(JSON.stringify(thrownError));
             
          }
    });

}


function validarCampos(){

  var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var filter6=/^[A-Za-z\_\-\.\s\xF1\xD1]+$/;
  var num = /^([0-9])*$/;

  var errores=0;
  var corregir="Debe corregir: \n\n"


  
  if (!filter6.test(document.getElementById("userName").value)){
    //alert("Nombre de usuario inválido");
    corregir+="- Nombre de usuario\n";
    errores++;
  }
  
  if (!filter6.test(document.getElementById("userLastName").value)){
    //alert("Apellido inválido");
    corregir+="- Apellido\n";
    errores++;
  }
  

  if (!expr.test(document.getElementById("email").value)){
    //alert("Correo inválido");
    corregir+="- Correo\n";
    errores++;
  }

  if(document.getElementById("pass").value.length<4 ||(document.getElementById("pass").value != document.getElementById("passConfirm").value)){
    //alert("La contraseña debe ser mayor a 4 caracteres");
    corregir+="- Contraseña\n";
    errores++;
  }

  

  if(!num.test(document.getElementById("mobileFono").value)){
    //lert("Número de celular inválido");
    corregir+="- Número de celular\n";
    errores++;
  }

  if($("#region").val()==0){
    corregir+="- Región\n";
    errores++;
  }

  if($("#city").val()==0){
    corregir+="- Ciudad\n";
    errores++;
  }

  if($("#comuna").val()==0){
    corregir+="- Comuna\n";
    errores++;
  }

  if(errores>0){
    //alert("Errores: "+errores);

    showError(corregir,"Errores: "+errores);
    return false;  
  }  

  else{
    return true;  
  }

  

}

function crearUsuario(nombres, apellidos, mail, contrasena, telefono, celular, direccion, idPais,idRegion, idCiudad, idComuna){

  var urlCreate =window.localStorage.getItem("URL")+"/api/Usuario";
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
           
            
            url: urlCreate,
            type: "POST",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(dataUsuario),

            
           
            success: function (result) {
                showAlert("Usuario creado exitosamente");

                redirigir("login.html");

            },
           
            error: function (xhr,status,p3,p4) {
           
                alert(xhr.responseJSON.Message);
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

    
$('#cancel').click(function() { 

  parent.history.back();


});

$("#region").change(function(){

  var comuna = $('#comuna').empty();

    comuna.append($('<option>', { 
                          value: 0,
                          text : ".Seleccionar."
    }));
  
  if($("#region").val()!='-'){
    obtenerCiudades();
  }

  else{

    var ciudad = $('#city').empty();

    ciudad.append($('<option>', { 
                          value: 0,
                          text : ".Seleccionar."
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
                          value: 0,
                          text : "Seleccionar ..."
    }));

  }
        
});


document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        // Empty
    }

    // alert dialog dismissed
        function alertDismissed() {
            // do something
        }

    // Show a custom alertDismissed
    //
    function showAlert(message) {
        navigator.notification.alert(
            message,                // message
            alertDismissed,         // callback
            'Aviso',            // title
            'Ok'                  // buttonName
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




