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
            
                            
            //document.getElementById('nombres').innerHTML=json.nombres.toString();
            
            //alert(json.nombres);
               
               
      
            
          },
          error:function (xhr, ajaxOptions, thrownError) {
             alert(JSON.stringify(thrownError));
             alert(JSON.stringify(xhr));
          }
    });

}

function isNumber(e) {
      k = (document.all) ? e.keyCode : e.which;
      if (k==8 || k==0) return true;
      patron = /\w/ ;
      n = String.fromCharCode(k);
      return patron.test(n);
}

$('#botonLogin2').click(function() { 

		alert("funciona boton");

        var datosUsuario = $("#nombredeusuario").val()
        var datosPassword = $("#clave").val()
        var cripto = window.btoa(datosUsuario+'|'+datosPassword);

        login(cripto);
        


});
