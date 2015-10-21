
var pictureSource; 

var destinationType; 


document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {

	pictureSource = navigator.camera.PictureSourceType;

	destinationType = navigator.camera.DestinationType;

}


function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    //options.fileName="Holaaaaa";
    options.mimeType="image/jpeg";

    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Login"), win, fail, options);


    
}

function probarAjax(){

    //alert("Probando ajax");

    var urlLogin = "http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Documento";


    $.ajax({
           
            //dataType: 'json',
            url: "http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Documento",
            type: "POST",
            data: {"idDocumento": 0, "idTicket": 1, "fecha": "2015-07-07", "documento": "FOTO.JPG" },
            
           
            success: function (result) {
                alert("OK");
            },
           
            error: function (xhr,status,p3,p4) {
           
                alert("error:" + JSON.stringify(xhr));
            }
    });

}

function win(r) {
	
    alert("Code = " + r.responseCode);
    alert("Response = " + r.response);
    alert("Sent = " + r.bytesSent);
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}


function capturePhoto() {

	alert("tomando foto");


	navigator.camera.getPicture(uploadPhoto,
        function(message) { alert('get picture failed'); },
        { quality: 30, 
            destinationType: navigator.camera.DestinationType.FILE_URI
         }   //sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
        );

}



function onFail(message) {

	alert('Failed because: ' + message);

}

/*

$.ajax(
           {
               url: "http://sae1.imatronix.com:2614/WEBAPI_SERVICE/api/Documento",
               type: "POST",
               data: { idDocumento: "0", idTicket: "1", fecha: "null", documento: "FOTO.JPG" },
               success: function (result) {
                   alert("OK");
               },
               error: function (xhr,status,p3,p4)
               {
                   alert("error:" + xhr.toString());
               }
           }
           );
*/