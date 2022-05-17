import React from 'react'
function readFileAsString() {
    var files = document.getElementById("new_producto_imagen").files;
    if (files.length === 0) {
        console.log('No file is selected');
        document.getElementById('imagen_a_mostrar').src="./img/producto_neutro.jpeg";
        return;
    }
    var reader = new FileReader();
    reader.onload = function(event) {
        console.log('File content:', event.target.result);
    };
    reader.readAsDataURL(files[0]);

    reader.onload = function(){
        document.getElementById('imagen_a_mostrar').src=reader.result;
    }
}

export default readFileAsString