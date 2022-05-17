import React, { useState }  from 'react'
import ProductoComprado from './ProductoComprado'
import ModalConfirmacion from './modales/ModalConfirmacion'

function GrupoComprado(props) {
  const [showConfirmacion,setShowConfirmacion]=useState(false);
  const [inicial,setInicial]=useState(false);
  function abrirModal(){
    setShowConfirmacion(true);
    setInicial(false);
  }
  return (
    <div className="aspecto-carrito mt-3 col-md-4 col-sm-12 col-12">
        <div id="carrito" className="rounded h-100 p-2">
        <h2 className="rounded-pill p-3 pl-5">Lista de la compra</h2>
        <div className="card rounded-pill">
            <h4 className="card-title m-3">Total: <a id="total">{props.total.toString()}</a>€ 
            <input type="button" id="confirmarCompra" className="btn btn-primary" defaultValue="Realizar pedido" disabled={props.comprado.length===0} 
            onClick={()=>abrirModal()} /></h4>
            <ModalConfirmacion borrar_comprados={()=>props.borrar_comprados()} productos={props.comprado} inicial={inicial} siguiente_ventana={()=>setInicial(true)} total={props.total} onClose={()=>setShowConfirmacion(false)} show={showConfirmacion}/>
        </div>
        {props.comprado.map((productos)=>(
            <ProductoComprado onClose={()=>(this.ocultar())}
            recalcularcantidad={props.recalcularcantidad}
            producto={productos} 
            cambiar_cantidad_elemento={(nombre,cantidad,maximo)=>(props.cambiar_cantidad_elemento(nombre,cantidad,maximo))}
            comprar_elemento={(cantidad,comprar_p)=>(props.comprar_elemento(cantidad,comprar_p))}/>
        ))}
        </div>
    </div>
  )
}

export default GrupoComprado