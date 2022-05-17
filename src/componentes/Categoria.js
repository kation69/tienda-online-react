import React from 'react'
import ProductoDisponible from './ProductoDisponible'

function Categoria(props) {
  function idcat(valor){
    if(valor.trim().toUpperCase().endsWith(".JSON")){
      return props.nombre(valor[0].toUpperCase(),valor.substring(1,valor.length-5).toLowerCase());
    }
    return props.nombre(valor[0].toUpperCase(),valor.substring(1,valor.length).toLowerCase());
  }
  return (
    
    <div 
    className="categoria row" 
    id={idcat(props.dato.nombre)}>
      <h2 className="w-100 titulo_categoria mt-2 p-3 pl-5 rounded-pill" 
      onClick={()=>props.ocultar(idcat(props.dato.nombre))}>{idcat(props.dato.nombre)}</h2>
      {props.dato.datos.map((producto,index)=>(
        <ProductoDisponible key={idcat(props.dato.nombre)+"_"+index.toString()} 
          comprar_elemento={(cantidad,nombre)=>(props.comprar_elemento(cantidad,nombre))}
          //comprarProducto={(comprar_p)=>props.comprarProducto(comprar_p)}
          titulo={producto.nombre}
          precio={producto.precio}
          descripcion={producto.descripcion}
          cantidad={producto.numero_unidades}
          codigo={producto.codigo}
          imagen={producto.imagen}
          idcategoria={idcat(props.dato.nombre)+"_"+index.toString()}
          />)
      )}
    </div>
  )
}

export default Categoria