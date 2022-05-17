
import readFileAsString from "../../javascript/readFileAsString"
const ModalProducto = props =>{
  var redcategoria="form-control border";
  var redcantidad = "form-control border";
  var redcodigo = "form-control border";
  var reddescripcion = "form-control border";
  var redprecio = "form-control border";
  var redproducto = "form-control border";
  var redcategoriatexto="text-center texto_error hide";
  var redcantidadtexto = "text-center texto_error hide";
  var redcodigotexto = "text-center texto_error hide";
  var reddescripciontexto = "text-center texto_error hide";
  var redpreciotexto = "text-center texto_error hide";
  var redproductotexto = "text-center texto_error hide";
  
  var modalclass = "modal";
  if(props.show){
    modalclass="modal showed"
  }
  if(props.redcategoria){
    redcategoria="form-control border border-danger";
    redcategoriatexto="text-center texto_error show"
  }
  if(props.redcantidad){
    redcantidad="form-control border border-danger";
    redcantidadtexto="text-center texto_error show"
  }
  if(props.redprecio){
    redprecio="form-control border border-danger";
    redpreciotexto="text-center texto_error show"
  }
  if(props.redcodigo){
    redcodigo="form-control border border-danger";
    redcodigotexto="text-center texto_error show"
  }
  if(props.reddescripcion){
    reddescripcion="form-control border border-danger";
    reddescripciontexto="text-center texto_error show"
  }
  if(props.rednombre){
    redproducto="form-control border border-danger";
    redproductotexto="text-center texto_error show"
  }
  

  return(
    <>
    <div className={modalclass} id="productoModal" tabIndex="-1" role="dialog" aria-labelledby="productoModalLabel" aria-hidden="true"  onClick={()=>props.onClose()}>
      <div className="modal-dialog" role="document" onClick={(e)=> e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id="productoModalLabel">Crear producto</h3>
            <button type="button" className="close" data-dismiss="modal" id="CloseModal" aria-label="Close"   onClick={()=>props.onClose()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <div className="row" align="center">
            <div className="col-12">					
              <form className="align-items-center pt-1 g-3 px-3">
                <div className="form-group" id="group_categoria">
                  <h4>Nuevo Producto</h4>
                </div>
                <div className="form-group" id="group_producto">
                  <label htmlFor="productoLabel" className="form-label">Categoria</label>
                  <select type="text" className={redcategoria} id="new_producto_categoria" name="new_producto_categoria" alt="Categoria">
                    <option value="">Seleccione categoria...</option>
                    {props.listaCategorias().map((cate)=>(
                      <option key={cate} value={cate}>{cate}</option>
                    )
                    )}
                  </select>
                  <p className={redcategoriatexto} id="error_vacia_categoria_producto">Seleccione categoria valida</p>
                </div>
                <div className="form-group" id="group_producto">
                  <label htmlFor="productoLabel" className="form-label">Nombre</label>
                  <input type="text" className={redproducto} id="new_producto_nombre" name="new_producto_nombre" alt="Nombre" placeholder="Escriba el nombre del producto" />
                  <p className={redproductotexto} id="error_vacia_producto_nombre">Indique nombre del producto</p>
                </div>
                <div className="form-group" id="group_producto">
                  <label htmlFor="productoLabel" className="form-label">Codigo</label>
                  <input type="text" className={redcodigo} id="new_producto_codigo" name="new_producto_codigo" alt="Codigo" placeholder="Escriba el codigo del producto" />
                  <p className={redcodigotexto} id="error_vacia_producto_codigo">Indique codigo del producto</p>
                </div>
                <div className="form-group" id="group_producto">
                  <label htmlFor="productoLabel" className="form-label">Precio (€)</label>
                  <input type="number" className={redprecio} id="new_producto_precio" name="new_producto_precio" alt="Precio" defaultValue="0" min="0" step="0.01"  placeholder="Escriba el precio del producto" />
                  <p className={redpreciotexto} id="error_vacia_producto_precio">Indique precio adecuado al producto</p>
                </div>
                <div className="form-group" id="group_producto">
                  <label htmlFor="productoLabel" className="form-label">Descripcion</label>
                  <textarea type="text" className={reddescripcion} id="new_producto_descripcion" name="new_producto_descripcion" alt="Descripcion" placeholder="Escriba la descripcion del producto"></textarea>
                  <p className={reddescripciontexto} id="error_vacia_producto_descripcion">Indique descripcion del producto</p>
                </div>
                <div className="form-group" id="group_producto">
                  <label htmlFor="productoLabel" className="form-label">Imagen</label>
                  <input type="file" className="form-control border" id="new_producto_imagen" name="new_producto_imagen" alt="imagen" placeholder="Escriba la ruta de la imagen del producto" 
                  onChange={()=>readFileAsString()}/>
                  <img id="imagen_a_mostrar" className="mw-95 mt-3" src="./img/producto_neutro.jpeg" alt="IMAGEN NO EXISTENTE"/>
                </div>
                <div className="form-group" id="group_producto">
                  <label htmlFor="productoLabel" className="form-label">Numero de unidades</label>
                  <input type="number" step="1" className={redcantidad} id="new_producto_numero_unidades" name="new_producto_numero_unidades" alt="Cantidad" defaultValue="0" min="0"  placeholder="Escriba el cantidad de producto" />
                  <p className={redcantidadtexto} id="error_vacia_producto_numero_unidades">Indique numero de unidades adecuado al producto</p>
                </div>
                <div className="form-group py-4">
                  <input type="button" className="btn btn-primary" id="crearProducto" onClick={()=>props.comprobarCrearProducto()} value="Crear producto" />
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
    
    </>
  )
}

export default ModalProducto