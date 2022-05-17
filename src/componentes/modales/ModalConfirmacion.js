import React from "react";

const ModalConfirmacion = props =>{
    var modalclass = "modal";
    var titulo="Confirmar compra";
    var texto_foother="";
    var texto_inicial=<label htmlFor="confirmLabel" id="confirmLabel" className="form-label">¿Estás seguro qué deseas realizar la compra?</label>;

    var lita_compra="hide";
    var botones="show";
    if(props.show){
        modalclass="modal showed"
    }
    if(props.inicial){
        titulo="Compra realizada";
        lita_compra="show";
        botones="hide";
        if(props.total>0){
            texto_foother=<h4 htmlFor="confirmLabel" id="pagando" className="modal-title" >Has gastado un total de <a id="compraTotal">{props.total.toString().replace(".",",")}</a>€</h4>
        }
        else{
            texto_foother=<h4 htmlFor="confirmLabel" id="pagando_nada" className="modal-title" >La compra te salío GRATIS!!!</h4>
        }
        texto_inicial=<label htmlFor="confirmLabel" id="confirmLabel2" className="form-label">Felicidades!!! Usted acada de realizar la compra de:</label>;
    }
    function precio_mostrar(cantidad){
        if(parseFloat(cantidad.toString().replace(",",".")).toFixed(2)>0){
            return cantidad.toString().replace(".",",");
        }
        else{
            return "Gratis";
        }

    }
    function recortar(valor,cantidad){
        if(valor.trim().length>cantidad){
          return valor.trim().substring(0,cantidad)+"...";
        }
        return valor.trim();
    }
    function cerrar(inicial){
        if(inicial){
            props.borrar_comprados();
            props.onClose();
        }
        else{
            props.onClose();
        }
    }
  return(
    <div className={modalclass} id="confirmacionModal" tabIndex="-1" role="dialog" aria-labelledby="confirmacionModalLabel" aria-hidden="true" onClick={()=>cerrar(props.inicial)}>
        <div className="modal-dialog" role="document" onClick={(e)=> e.stopPropagation()}>
            <div className="modal-content">
            <div className="modal-header">
                <h3 className="modal-title" id="confirmacionModalLabel">{titulo}</h3>
                <button type="button" className="close" data-dismiss="modal" id="CloseModal" aria-label="Close" onClick={()=>cerrar(props.inicial)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                    <div className="row" align="center">
                        <div className="col-12">					
                            <form className="align-items-center pt-1 g-3 px-3">
                                <div className="form-group mb-0">
                                    {texto_inicial}
                                </div>
                                <div className={"form-group py-4 "+botones} id="botones_confirmar">
                                    <input type="button" className="btn btn-success mr-2" id="CompraConfirmada" value="Comprar" onClick={()=>props.siguiente_ventana()}/>
                                    <input type="button" className="btn btn-danger" data-dismiss="modal"  id="CloseModal" value="Cancelar" aria-label="Close" onClick={()=>cerrar(props.inicial)}/>
                                </div>
                                <div className={"form-group py-4 "+lita_compra} id="lista_comprada">
                                    {props.productos.map((producto)=>(
                                        
                                        <div id={producto.idcategoria+"_lista_compra"} className="row">
                                            <div className="cuadrado_lista col-4 col-0 col-xl-4">
                                                <img src={producto.img_src} className="rounded img-thumbnail mw-95 mh-100"/>
                                            </div>
                                            <div className="col-7 col-md-11 col-xl-7">
                                                <h3 className="card-title">{recortar(producto.titulo,17)} - {producto.codigo}</h3>
                                                <h4 name="precio">{producto.cantidad} X {precio_mostrar(producto.precio)} €</h4>
                                                <p>{recortar(producto.descripcion,47)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </form>
                        </div>
                    </div> 
                    <div className="modal-footer">
                        {texto_foother}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ModalConfirmacion