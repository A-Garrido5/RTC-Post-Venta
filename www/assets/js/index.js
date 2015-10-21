



$(document).ready(function (){



	var value = window.localStorage.getItem("username");

	

	if (value===null){



    var ubicacionActual= window.location.pathname;

    
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


  
		
		//$('#dialogLogin').show();
		//$( "#dialogLogin" ).trigger( "click" );

		//$( '#dialogLogin' ).click ();

//		document.getElementById('dialogLogin').onclick();

		


	}
	else
	{	
		
		$('#nameRight').text(value);
	}




});

function redirigir(ruta){

	location.href=ruta;

}

function logout(){

  localStorage.removeItem("username");

  location.href="login.html";


}

function login(datos){

	
	var urlLogin="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Login/"+datos; 
	        
	$.ajax({
          url: urlLogin,
          type: "GET",
          dataType: "json",
          success: function(json) {
            //alert(JSON.stringify(json));

            var sesionvalida = parseInt(json.sesionValida);
            if(sesionvalida!=1){
              alert(json.mensaje);
                                  }
            else{
             // alert("            "+json.mensaje +'\n'+json.nombres);

				
      				$('#nameRight').text(json.nombres);
      				localStorage.setItem("username", json.nombres);

              location.href="/android_asset/www/index.html";
              
            }
                            
            //document.getElementById('nombres').innerHTML=json.nombres.toString();
            
            //alert(json.nombres);
               
               
      
            
          },
          error:function (xhr, ajaxOptions, thrownError) {
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

$('#botonLogin').click(function() {


        var datosUsuario = $("#nombredeusuario").val()
        var datosPassword = $("#clave").val()
        var cripto = window.btoa(datosUsuario+'|'+datosPassword);

        login(cripto);
        


});





var permanentStorage = window.localStorage;