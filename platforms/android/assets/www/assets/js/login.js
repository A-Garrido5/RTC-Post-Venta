    function login(datos){
	    var urlLogin="http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Login/"+datos;

	    $.ajax({
	        url: urlLogin,
	        type: "GET",
	        dataType: "json",
	        success: function (json) {

              
	            var sesionvalida = parseInt(json.sesionValida);
	            if (sesionvalida != 1) {
	                alert(json.mensaje);
	            }
	            else {
	            	showAlert("Ingreso existoso");
	                $('#nameRight').text(json.nombres);
	                localStorage.setItem("username", json.nombres);
	                localStorage.setItem("token", json.tokenUsuario);
	                location.href = "index.html";
	            }
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
	            alert(JSON.stringify(xhr));
	        }
	    });

    }




    function isNumber(e) {
          k = (document.all) ? e.keyCode : e.which;
          if (k==8 || k==0 || k==190) return true;
          patron = /\w./ ;
          n = String.fromCharCode(k);
          return patron.test(n);
    }

    $('#botonLogin').click(function() { 
            var datosUsuario = $("#nombredeusuario").val()
            var datosPassword = $("#clave").val()
            var cripto = window.btoa(datosUsuario+'|'+datosPassword);
            login(cripto);
    });


    function crearCuenta() {
        location.href = "crearUsuario.html";
    }

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

    