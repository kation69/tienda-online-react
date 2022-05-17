import React from 'react'
import $ from "jquery"
import Categoria from './Categoria';

function GrupoProductos(props) {
  function nombre (valor,valor2){
    return valor+valor2;
  }
  function ocultar(dato){
    if($("#"+dato+" h2").hasClass("reducida")){
      $("#"+dato+" .producto").show("slow");
      $("#"+dato+" h2").removeClass("reducida");

    }
    else{
      $("#"+dato+" .producto").hide("slow");
      $("#"+dato+" h2").addClass("reducida");
    }
    console.log("ocultar")
  }
  function idcat(valor){
    if(valor.trim().toUpperCase().endsWith(".JSON")){
      return nombre(valor[0].toUpperCase(),valor.substring(1,valor.length-5).toLowerCase());
    }
    return nombre(valor[0].toUpperCase(),valor.substring(1,valor.length).toLowerCase());
  }
  return (
    <div key="productos" id="productos" className="col-md-8 col-sm-12 col-12">
        {props.conjuntoDatos.map(dato => (
          <Categoria key={idcat(dato.nombre)} dato={dato} ocultar={(datos)=>ocultar(datos)}
            nombre={(valor1,valor2)=>nombre(valor1,valor2)}
            comprar_elemento={props.comprar_elemento}
          />
        ))
        }
    </div>
  )
}

export default GrupoProductos