import React, { Component } from 'react'
import './App.css';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import Cabecera from './componentes/Cabecera'
import './objetos/css/index.css'
import './objetos/css/garamond_e55d1f9ae6f0e84086f54bb6593f6a30.woff'
import BotonesHeader from './componentes/BotonesHeader'
import GrupoProductos from './componentes/GrupoProductos';
import grupo from './juegodatos'
import $ from 'jquery'
import GrupoComprado from './componentes/GrupoComprado';
import PiePagina from './componentes/PiePagina';

export class App extends Component {
  state ={
    datos: grupo(),
    comprado:[],
    total:0
  }
  cambiarDatos = (cantidad,new_dato)=>{
    var conjuntoDatos = this.state.datos.filter(()=>true);
    conjuntoDatos.map((categoria)=>{
      if(new_dato.idcategoria.toUpperCase().startsWith(categoria.nombre.replace(".json","").toUpperCase())){
        categoria.datos.map((elemento,index)=>{
          if((categoria.nombre.replace(".json","")+"_"+index.toString()).toUpperCase() === new_dato.idcategoria.toUpperCase()){
            elemento.numero_unidades=(parseFloat(elemento.numero_unidades).toFixed(0)-cantidad).toString();
          }
        })
      }
    });
    this.setState({datos:conjuntoDatos});

  }
  comprarProducto = (new_dato) =>{
    var cargado=false;
    if(this.state.comprado!==[]){
      this.state.comprado.map((dato)=>{
        if(dato.idcategoria===new_dato.idcategoria){
          if(dato.maximo>dato.cantidad){
            dato.cantidad=dato.cantidad+1;
            $("#"+dato.idcategoria+"_comprado input[type='number']").val(dato.cantidad);
            this.recalcular();
            this.cambiarDatos(1,new_dato);
          }
          cargado = true;
        }
      })
    }
    if(!cargado){
      this.state.comprado.push(new_dato);
      this.recalcular();
      this.cambiarDatos(1,new_dato);
    }
    this.setState({
      comprado:this.state.comprado
    })
  }
  restarProducto = (new_dato) =>{
    if(this.state.comprado!==[]){
      this.state.comprado.map((dato)=>{
        if(dato.idcategoria===new_dato.idcategoria){
          if(1<dato.cantidad){
            dato.cantidad=dato.cantidad-1;
            $("#"+dato.idcategoria+"_comprado input[type='number']").val(dato.cantidad);
            this.recalcular();
            this.cambiarDatos(-1,new_dato);
          }
        }
      })
    }
    this.setState({
      comprado:this.state.comprado
    })
  }
  borrar_comprados=()=>{
    this.setState({
      comprado:[]
    });
  }
  eliminarProducto = (new_dato) =>{
    if(this.state.comprado!==[]){
      var indice=-1;
      var incremento=0;
      var comprados=this.state.comprado;
      comprados.map((dato)=>{
        if(dato.idcategoria===new_dato.idcategoria){
          indice=incremento;
        }
        incremento=incremento+1;
      })
      if(indice!==-1){
        comprados.pop(indice);
        for(var i=0;i<new_dato.cantidad;i++){
          this.cambiarDatos(-1,new_dato);
        }
      }
    }

    this.recalcular();
    
    this.setState({
      comprado:comprados
    });
  }
  comprar_elemento=(cantidad,nombre)=>{
    
    var datos={};
    datos["idcategoria"]=nombre;
    datos["cantidad"]=1;
    datos["precio"]=1;
    datos["codigo"]=$("div#productos div#"+nombre+" p[name='codigo']").text();
    datos["maximo"]=$("div#productos div#"+nombre+" p[name='cantidad']").attr("value");
    datos["img_src"]=$("div#productos div#"+nombre+" img").attr("src");
    datos["descripcion"]=$("div#productos div#"+nombre+" p[name='descripcion']").attr("value");
    datos["precio"]=$("div#productos div#"+nombre+" h5[name='precio']").attr("value");
    datos["titulo"]=$("div#productos div#"+nombre+" h3.card-title").attr("value");
    if(cantidad>0){
      for(var i=0;i<cantidad;i++){
        this.comprarProducto(datos);
      }
    }
    else if(cantidad===0){
      datos["cantidad"]=$("div#carrito div#"+nombre+"_comprado input[type='number']").val();
      this.eliminarProducto(datos);
    }
    else{
      for(var j=0 ;j<-cantidad;j++){
        this.restarProducto(datos);
      }
    }
  }
  cambiar_cantidad_elemento=(cantidad,nombre,maximo)=>{
    var diferencia=0;
    this.state.comprado.map((elemento)=>{
      if(elemento.idcategoria===nombre){
        diferencia=(cantidad-elemento.cantidad);
        if(diferencia!==0){
          this.comprar_elemento(diferencia,nombre);
        }
        else{

          $("#"+nombre+"_comprado input[type='number']").val(cantidad);
        }
      }
    });
  }
  recalcular=()=>{
    var sumatotal=0;
    this.state.comprado.map((dato) =>{
      sumatotal=sumatotal+(dato.cantidad*parseFloat(dato.precio.replace(",",".")))
    })

    this.setState({
      total:sumatotal.toFixed(2)
    });
  }
  crearCategoria=(new_categoria)=>{
    var creada=false;
    this.state.datos.map((valor)=>{
      if(valor.nombre.toUpperCase().trim().replace(".JSON","")===new_categoria.trim().toUpperCase()){
        creada=true;
      }
    });
    if(!creada){
      this.state.datos.push({"nombre":new_categoria,"datos":[]});
      console.log(this.state.datos);
      this.setState({datos:this.state.datos});
    }
    return creada;
  }
  listaCategorias=()=>{
    var conjunto=[];
    this.state.datos.map((valor)=>{
      conjunto.push(valor.nombre.trim()[0].toUpperCase()+valor.nombre.trim().toLowerCase().substring(1).replace(".json",""));
    });
    return conjunto;
  }
  crearElemento=(producto)=>{
    var conjunto=this.state.datos;
    conjunto.map((valor)=>{
      if(producto.categoria.trim().toUpperCase()===valor.nombre.trim().toUpperCase().replace(".JSON","")){
        valor.datos.push({"nombre":producto.nombre,
        "imagen":producto.src_img,
        "codigo":producto.codigo,
        "descripcion":producto.descripcion,
        "precio":parseFloat(producto.precio.toString().replace(",",".")).toFixed(2),
        "numero_unidades":parseFloat(producto.cantidad.toString().replace(",",".")).toFixed(0)});
      }
    });
    this.setState({dato:conjunto});
  }
  render() {
    return (
      <>
      <div className="App">
        <div className='grupo_titulos'>
          <div>
            <Cabecera/>
            <BotonesHeader crearElemento={(producto)=>this.crearElemento(producto)} listaCategorias={()=>this.listaCategorias()} cambioAdmin={this.cambioAdmin} crearCategoria={(categoria)=>this.crearCategoria(categoria)}/>
          </div>
        </div>
        <div className="container-big container">
          <div className="row">
            <GrupoProductos comprar_elemento={(cantidad,nombre)=>(this.comprar_elemento(cantidad,nombre))}
            comprarProducto={(comprar_p)=>this.comprarProducto(comprar_p)} 
            conjuntoDatos={this.state.datos} 
            asignarDatos={(datos)=>this.asignarDatos(datos)}/>
            <GrupoComprado borrar_comprados={()=>this.borrar_comprados()} comprarProducto={(comprar_p)=>this.comprarProducto(comprar_p)} 
            total={this.state.total}
            recalcularcantidad={this.state.recalcularcantidad}
            comprado={this.state.comprado}
            cambiar_cantidad_elemento={(nombre,cantidad,maximo)=>(this.cambiar_cantidad_elemento(nombre,cantidad,maximo))}
            comprar_elemento={(cantidad,comprar_p)=>(this.comprar_elemento(cantidad,comprar_p))}
            />
          </div>
        </div>
        <PiePagina/>
      </div>
      </>
    )
  }
}

export default App
