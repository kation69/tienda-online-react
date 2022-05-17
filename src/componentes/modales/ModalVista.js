
import React from "react";
const ModalVista = props =>{  
  var modalclass = "modal";
  if(props.show){
    modalclass="modal showed"
  }
  var boton_compra = <a className="btn btn-success" id="boton_anadir_ok" onClick={()=>props.comprar_accion()}><i className="bi bi-cart4"></i> <p className="Agregar_texto_oculto">Agregar a la cesta</p></a>;
  if(props.agotado){
    boton_compra =<a className="btn acabado_mostrar" id="boton_anadir_ko"><i className="bi bi-cart-x-fill"></i> <p className="Agregar_texto_oculto">Agregar a la cesta</p></a>;
  }
  return(
    <div className={modalclass} id={"productoMostrarModal_"+props.id} tabIndex="-1" role="dialog" aria-labelledby="productoMostrarModalLabel" aria-hidden="true" onClick={()=>props.onClose()}>
        <div className="modal-dialog" role="document" onClick={(e)=> e.stopPropagation()}>
            <div className="modal-content">
            <div className="modal-header">
                <h3 className="modal-title" id="nombre_mostrar">{props.nombre}</h3>
                <button type="button" className="close" data-dismiss="modal" id="CloseModal" aria-label="Close" onClick={()=>props.onClose()}>
                <span aria-hidden="true">×</span>
                </button>
            </div>
            <div className="modal-body">
                    <div className="row" align="center">
                        <div className="col-12">					
                            <form className="align-items-center pt-1 g-3 px-3">
                            <div className="form-group" id="group_categoria">
                                <h5 id="codigo_mostrar">{props.codigo}</h5>
                                <img src={props.src_imagen} id="imagen_mostrar" className="img-thumbnail mw-95" />
                                <h3 id="precio_mostrar">{props.precio}</h3>
                            </div>
                            <div className="form-group py-4" id="descripcion">
                                <label htmlFor="productoLabel" className="form-label titulo_descripcion">Descripcion:</label>
                                <p id="descripcion_mostrar">{props.descripcion}</p>
                            </div>
                            <div className="form-group py-4">
                                {boton_compra}
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="button" onClick={()=>props.onClose()} >Cerrar</button>
                </div>
            </div>
        </div>
        </div>
  )
}

export default ModalVista