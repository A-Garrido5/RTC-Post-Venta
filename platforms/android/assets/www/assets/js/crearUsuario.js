
$(document).ready(function (){

  obtenerRegiones();

});


function redirigir(ruta){

  location.href=ruta;

}

function validarCampos(){

  var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var filter6=/^[A-Za-z\_\-\.\s\xF1\xD1]+$/;
  var num = /^([0-9])*$/;

  var errores=0;
  var corregir="Debe corregir: \n\n"


  
  if (!filter6.test(document.getElementById("userName").value)){
    corregir+="- Nombre de usuario\n";
    errores++;
  }
  
  if (!filter6.test(document.getElementById("userLastName").value)){
    corregir+="- Apellido\n";
    errores++;
  }
  

  if (!expr.test(document.getElementById("email").value)){
    corregir+="- Correo\n";
    errores++;
  }

  if(document.getElementById("pass").value.length<4 ||(document.getElementById("pass").value != document.getElementById("passConfirm").value)){
    corregir+="- Contraseña\n";
    errores++;
  }

  

  if(!num.test(document.getElementById("mobileFono").value)){
    corregir+="- Número de celular\n";
    errores++;
  }

  
  if(errores>0){
    showError(corregir,"Errores: "+errores);
    return false;  
  }  

  else{
    return true;  
  }

  

}

function crearUsuario(nombres, apellidos, mail, contrasena, telefono, celular, direccion){

  var urlCreate =window.localStorage.getItem("URL")+"/api/Usuario";
  var dataUsuario = { "nombres": nombres, 
                    "apellidos": apellidos, 
                    "password": contrasena,
                    "mail": mail,
                    "movil": celular,
                    "direccion": direccion
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



        if(esValido){
          
          crearUsuario(nombres,apellidos,mail,contrasena,telefono,celular,direccion);
        }      

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

    function onDeviceReady() {
        
    }

    
        function alertDismissed() {
            
        }

    
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




