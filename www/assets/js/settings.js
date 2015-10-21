
document.getElementById('accept').style.marginRight = "100px";
document.getElementById('cancel').style.marginLeft = "100px";

$('#descripcion').val(null);


    document.getElementById("descripcion").autofocus;
$('#cancel').click(function() { 

	parent.history.back();


});

$('input:text').focus(
function(){
      document.getElementById('descripcion').setSelectionRange(0, 0);
    });

function sendData(){

}

$('#accept').click(function() { 

	var edificio=$('#edificio').val();
	var criticidad=$('#criticidad').val();
	var categoria=$('#categoria').val();

	var descripcion=$('#descripcion').val();

	alert(descripcion);



});