import React from "react";

const ModalLogin = props =>{
  var reduser="form-control border ";
  var redpass = "form-control border ";
  var modalclass = "modal face";
  if(props.show){
    modalclass="modal face showed"
  }
  if(props.reduser){
    reduser="form-control border border-danger";
  }
  if(props.redpass){
    redpass="form-control border border-danger";
  }
  return(
    <div className={modalclass} onClick={()=>props.onClose()} tabIndex="-1" role="dialog" aria-labelledby="categoriaModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document"  onClick={(e)=> e.stopPropagation()}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title" id="loginModalLabel">Inicia sesión</h3>
          <button type="button" className="close" data-dismiss="modal" id="CloseModal" aria-label="Close" onClick={()=>props.onClose()} >
              <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">

          <div className="row" align="center">
            <div className="col-12">					
              <form className="align-items-center pt-1 g-3 px-3">
                <div className="form-group">
                  <label htmlFor="usuarioLabel" className="form-label">Usuario</label>
                  <input type="text" className={reduser} id="usuario" name="usuario" alt="Usuario" />
                </div>
                <div className="form-group pt-1">
                  <label htmlFor="passLabel" className="form-label">Contraseña</label>
                  <input className={redpass} type="password" id="contrasenia" name="password" />
                </div>
                <div className="form-group py-4">
                  <input type="button" className="btn btn-primary" id="acceder" value="Acceder" onClick={()=>props.confirmLogin()}/>
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

export default ModalLogin