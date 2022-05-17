import React, { Component } from 'react'
import $ from "jquery"
import ModalVista from './modales/ModalVista'

export class ProductoDisponible extends Component {
  state={
    agotado:"acabado",
    cantidad:-1,
    disable:false,
    visible:false
  }
  ocultar=(dato)=>{
    if($("#"+dato+" h2").hasClass("reducida")){
      $("#"+dato+" .producto").show("slow");
      $("#"+dato+" h2").removeClass("reducida");

    }
    else{
      $("#"+dato+" .producto").hide("slow");
      $("#"+dato+" h2").addClass("reducida");
    }
  }
  mostrar=()=>{
    if(this.state.visible){
      this.setState({visible:false});
    }
    else{
      this.setState({visible:true});
    }
  }
  recortar=(valor,cantidad)=>{
    if(valor.trim().length>cantidad){
      return valor.trim().substring(0,cantidad)+"...";
    }
    return valor.trim();
  }
  ajusteprecio=(valor)=>{
    if(parseFloat(valor.toString().replace(",","."))>0){
      return this.props.precio.toString().replace(".",",");
    }
    return "Gratis";
  }
  formarImagen=(imagen)=>{
    if(imagen.trim()===""){
      return "./img/producto_neutro.jpeg"
    }
    else if(imagen.trim().startsWith("data:")){
      console.log("producto creado");
      return imagen;
    }
    else{
      return "./img/"+imagen;
    }
  }
  conexistencias=(cantidad)=>{
    if(parseFloat(cantidad)>0){
      this.setState({agotado:"",cantidad:parseFloat(cantidad).toFixed(0),disable:false});
    }
    else{
      this.setState({agotado:"acabado",cantidad:parseFloat(cantidad).toFixed(0),disable:true});
    }
  }
  interactuar=()=>{
    if(this.state.disable===false){
      this.props.comprar_elemento(1,this.props.idcategoria.toLowerCase());
    }
  }
  
  render() {
    if(this.state.cantidad!=parseFloat(this.props.cantidad)){
      this.conexistencias(this.props.cantidad);
    }
    return (
      <>
      <div id={this.props.idcategoria.toLowerCase()} 
      className={this.state.agotado+" col-12 col-lg-4 col-xl-3 card producto rounded"} >
        <div className="cuadrado card-img-bottom" onClick={()=>(this.mostrar())}>
          <img src={this.formarImagen(this.props.imagen)} className="rounded rellenoCuadrado float-botton" alt="IMAGEN NO EXISTENTE"/>
          <p className="bg-light text-success w-75 mr-3 ml-3 p-1 mt-1 position-absolute rounded-pill" name="codigo">{this.props.codigo}</p>
        </div>
        <div className="card-body">
          <h3 value={this.props.titulo} className="card-title">
            {this.recortar(this.props.titulo,17)}</h3>
          <h5 className="card-title" name="precio" value={this.props.precio}>{this.ajusteprecio(this.props.precio)} €</h5>
          <p name="cantidad" value={this.props.cantidad} initial_value={this.props.cantidad}>Quedan {this.props.cantidad}</p>
          <a href={null} name="mostrar_restantes" 
            onClick={()=>(this.interactuar())} 
            value={this.props.cantidad} initial_value={this.props.cantidad} 
            className="btn btn-success text-white font-weight-bold" disabled={this.state.disable}>
            <i className="bi bi-cart4"></i> 
            <p className="">Agregar a la cesta</p>
          </a>
          <p name="descripcion" value={this.props.descripcion}>{this.recortar(this.props.descripcion,97)}</p>
        </div>
      </div>
      <ModalVista show={this.state.visible} nombre={this.props.titulo} codigo={this.props.codigo} descripcion={this.props.descripcion}
      comprar_accion={()=>(this.interactuar())} src_imagen={this.formarImagen(this.props.imagen)} cantidad={this.props.cantidad}
      agotado={this.state.agotado==="acabado"} onClose={()=>(this.mostrar())}/>
      </>
    )
  }
}

export default ProductoDisponible