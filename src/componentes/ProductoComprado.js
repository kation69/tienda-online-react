import React, { Component } from 'react'
import $ from "jquery"
import ModalVista from './modales/ModalVista';

export class ProductoComprado extends Component {
  state = {
    cantidad:1,
    visible:false
  }
  recortar=(valor,cantidad)=>{
    if(valor.trim().length>cantidad){
      return valor.trim().substring(0,cantidad)+"...";
    }
    return valor.trim();
  }
  ajusteprecio=(valor)=>{
    if(valor>0){
      return this.props.precio.toString().replace(".",",");
    }
    return "Gratis";
  }
  mostrar=()=>{
    if(this.state.visible){
      this.setState({visible:false});
    }
    else{
      this.setState({visible:true});
    }
  }
  formarImagen=(imagen)=>{
    if(imagen.trim()===""){
      return "./img/producto_neutro.jpeg"
    }
    else if(imagen.trim().startsWith("data:")){
      return imagen;
    }
    else{
      return "./img/"+imagen;
    }
  }
  reajustar=()=>{
    this.setState({cantidad:this.props.cantidad});
  }
  cambiarMargen=(maximo,nombre)=>{
    var cantidad = parseFloat($("#"+nombre+"_comprado input[type='number']").val()).toFixed(0);
    if(maximo<cantidad){
      cantidad=maximo;
    }
    else if(cantidad<1){
      cantidad=1;
    }
    this.props.cambiar_cantidad_elemento(cantidad,nombre,maximo);
  }

  interactuar=()=>{
    if(this.props.producto.cantidad>0){
      this.props.comprar_elemento(1,this.props.producto.idcategoria.toLowerCase());
    }
  }
  verprecio=(cantidad)=>{
    if(parseFloat(cantidad.toString().replace(",",".")).toFixed(2)>0){
      return cantidad.toString().replace(".",",")+" €";
    }
    else{
        return "Gratis";
    }
  }

  agotado="";
  render() {
    if(this.props.producto.cantidad===this.props.producto.maximo){
      this.agotado="acabado";
    }
    return (
      <>
      <div key={this.props.producto.idcategoria+"_comprado"} id={this.props.producto.idcategoria+"_comprado"} className="row col-12 producto_carrito">
        <div className="cuadrado_lista col-4 col-0 col-xl-4">
          <img src={this.props.producto.img_src} className="rounded img-thumbnail rellenoCuadradoLista mw-95 mh-100 cursor_help position-relative" 
          onClick={()=>this.mostrar()} alt="IMAGEN NO EXISTENTE"/>
        </div>
        <div className="col-7 col-md-11 col-xl-7">
          <h3 className="card-title">{this.recortar(this.props.producto.titulo,17)+" - "+this.props.producto.codigo}</h3>
          <h4 name="precio" value={this.props.producto.precio}>{this.verprecio(this.props.producto.precio)}</h4>
          <p>{this.recortar(this.props.producto.descripcion,47)}</p>
          <div className="decoreinput">
            <input type="number" step="1" min="1" max={this.props.producto.maximo}
              onChange={()=>(this.cambiarMargen(this.props.producto.maximo,this.props.producto.idcategoria))} 
              defaultValue={this.state.cantidad}/>
            <div className="decoreinput-nav">
              <div className="decoreinput-button decoreinput-up" onClick={()=>(this.props.comprar_elemento(1,this.props.producto.idcategoria))}>+</div>
              <div className="decoreinput-button decoreinput-down" onClick={()=>(this.props.comprar_elemento(-1,this.props.producto.idcategoria))}>-</div>
            </div>
          </div>
          <a className="btn btn-warning" onClick={()=>(this.props.comprar_elemento(0,this.props.producto.idcategoria))}>
            <i className="bi bi-x-circle-fill"></i>
            <p className="Agregar_texto_oculto"> Eliminar de la lista</p>
          </a>
        </div>
      </div>
      <br/>
      <ModalVista show={this.state.visible} nombre={this.props.producto.titulo} codigo={this.props.producto.codigo} descripcion={this.props.producto.descripcion}
      comprar_accion={()=>(this.interactuar())} src_imagen={this.props.producto.img_src} cantidad={this.props.producto.cantidad}
      agotado={this.agotado==="acabado"} onClose={()=>(this.mostrar())}/>
      </>
    )
  }
}

export default ProductoComprado