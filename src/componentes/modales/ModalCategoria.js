
import React from "react";
import $ from '../../../node_modules/jquery/dist/jquery';

const ModalCategoria = props =>{
  var redcategoria="form-control border ";
  var redcategoriavacia="text-center texto_error";
  var modalclass = "modal";
  var repetida = "text-center texto_error";
  
  if(props.show){
    modalclass="modal showed"
  }
  if(props.reddatos){
    redcategoria="form-control border border-danger";
    if(props.redcategoriavacia){
      redcategoriavacia="text-center texto_error show"
    }
    else if(props.redcategoria){
      repetida="text-center texto_error show"
    }
  }
  
  return(
    <div className={modalclass} id="categoriaModal" tabIndex="-1" role="dialog" aria-labelledby="categoriaModalLabel" aria-hidden="true"  onClick={()=>props.onClose()}>
      <div className="modal-dialog" role="document"  onClick={(e)=> e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id="categoriaModalLabel">Crear categoria</h3>
            <button type="button" className="close" data-dismiss="modal" id="CloseModal" aria-label="Close" onClick={()=>props.onClose()} >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <div className="row" align="center">
            <div className="col-12">					
              <form className="align-items-center pt-1 g-3 px-3">
                <div className="form-group" id="group_categoria">
                  <label htmlFor="categoriaLabel" className="form-label">Categoria</label>
                  <input type="text" className={redcategoria} id="new_categoria" name="new_categoria" alt="Nueva categoria" />
                  <p className={repetida} id="error_categoria">Categoria ya existente</p>
                  <p className={redcategoriavacia} id="error_vacia_categoria">Rellene el campo</p>
                </div>
                <div className="form-group py-4">
                  <input type="button" className="btn btn-primary" id="crearCategoria" onClick={()=>props.comprobarCrearCategoria($('#new_categoria')[0].value)} value="Crear categoria" />
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

export default ModalCategoria