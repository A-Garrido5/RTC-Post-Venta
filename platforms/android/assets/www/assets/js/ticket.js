


$('#descripcion').val(null);


    document.getElementById("descripcion").autofocus;
$('#cancel').click(function() { 

	parent.history.back();


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