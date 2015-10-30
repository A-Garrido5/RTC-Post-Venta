$(document).ready(function (){



	mostrarMenu();


});


function irNivel2 (idBoton) {
	location.href="nivel2.html?id="+idBoton;
}






function mostrarMenu(){

  var urlGetLevel =window.localStorage.getItem("URL")+"/api/Nivel1";

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



$("#level1").change(function(){

  var valor = $("#level1").val();


  mostrarNivel2();
  



        
});