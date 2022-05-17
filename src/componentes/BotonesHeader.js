import React, { useState } from 'react'
import ModalLogin from './modales/ModalLogin'
import $ from '../../node_modules/jquery/dist/jquery';
import ModalCategoria from './modales/ModalCategoria';
import ModalProducto from './modales/ModalProducto';

function BotonesHeader(props) {
    const [showLogin,setShowLogin]=useState(false);
    const [reduser,setRedUser]=useState(false);
    const [redpass,setRedPass]=useState(false);
    const [showCategoria,setShowCategoria]=useState(false);
    const [redcategoria,setRedCategorias]=useState(false);
    const [redcategoriavacia,setRedCategoriasVacia]=useState(false);
    const [showProducto,setShowProducto]=useState(false);
    const [rednombre,setRedNombre]=useState(false);
    const [redcodigo,setRedCodigo]=useState(false);
    const [redprecio,setRedPrecio]=useState(false);
    const [reddescripcion,setRedDescripcion]=useState(false);
    const [redcantidad,setRedCantidad]=useState(false);
    function openDialog(tipo){
      if(tipo==="categoria"){
        setRedCategorias(false);
        setRedCategoriasVacia(false);
        document.getElementById("new_categoria").value="";
        setShowCategoria(true);
      }
      else if(tipo==="login"){
        setRedUser(false);
        setRedPass(false);
        document.getElementById("usuario").value="";
        document.getElementById("contrasenia").value="";
        setShowLogin(true);
      }
      else if(tipo==="producto"){
        setRedCategorias(false);
        setRedNombre(false);
        setRedCodigo(false);
        setRedDescripcion(false);
        setRedPrecio(false);
        setRedCantidad(false);
        $("#productoModal #new_producto_categoria").val("");
        $("#productoModal #new_producto_imagen").val("");
        $("#productoModal #imagen_a_mostrar").attr("src","./img/producto_neutro.jpeg");
        $("#productoModal #new_producto_nombre").val("");
        $("#productoModal #new_producto_codigo").val("");
        $("#productoModal #new_producto_precio").val("");
        $("#productoModal #new_producto_descripcion").val("");
        $("#productoModal #new_producto_numero_unidades").val("");
        document.getElementById("usuario").value="";
        document.getElementById("contrasenia").value="";
        setShowProducto(true);
      }
    }
    function changeBotones(cambio){
      if(cambio){
        setShowLogin(false);
        $("#logarse").fadeOut(1000,function() {
          $("#deslogarse").fadeIn(500,function() {
            $("#categoria").fadeIn(500,function() {
              $("#producto").fadeIn(500)
            });
          });
        });
      }
      else{
        $(".creaciones").fadeOut(200,function() {
          $("#deslogarse").fadeOut(300,function() {
            $("#logarse").fadeIn(500)
          });
        });
      }

      
    }
    function confirmarLogin(){
      var users = document.getElementById("usuario").value;
      var contrasenia = document.getElementById("contrasenia").value;
      var error = false;
      if(users!=="admin"){
        setRedUser(true);
        error = true;
      }
      else{
        setRedUser(false);
      }
      if(contrasenia!=="admin"){
        setRedPass(true);
        error = true;
      }
      else{
        setRedPass(false);
      }
      if(!error){
        changeBotones(true);
      }
    };
    function comprobarCrearCategoria(valor){
      setRedCategorias(false);
      setRedCategoriasVacia(false);
      var creada=false;
      if(valor.trim()===""){
        setRedCategoriasVacia(true);
      }else{
        creada=props.crearCategoria(valor);
        if(creada){
          setRedCategorias(true);
        }
        else{
          setShowCategoria(false);
        }
      }
    }
    function comprobarCrearProducto(){
      var categoria=$("#productoModal #new_producto_categoria").val();
      var nombre=$("#productoModal #new_producto_nombre").val();
      var codigo=$("#productoModal #new_producto_codigo").val();
      var precio=$("#productoModal #new_producto_precio").val();
      var descripcion=$("#productoModal #new_producto_descripcion").val();
      var cantidad=$("#productoModal #new_producto_numero_unidades").val();
      var errores=false;
      var datos={};
      if(categoria===""){
        setRedCategorias(true);
        errores=true;
      }
      else{
        setRedCategorias(false);
        datos["categoria"]=categoria;
      }
      if(nombre.trim()===""){
        setRedNombre(true);
        errores=true;
      }
      else{
        setRedNombre(false);
        datos["nombre"]=nombre;
      }
      if(codigo.trim()===""){
        setRedCodigo(true);
        errores=true;
      }
      else{
        setRedCodigo(false);
        datos["codigo"]=codigo;
      }
      if(descripcion.trim()===""){
        setRedDescripcion(true);
        errores=true;
      }
      else{
        setRedDescripcion(false);
        datos["descripcion"]=descripcion;
      }
      if(parseFloat(precio).toFixed(2)<0 && precio.toString()!==""){
        setRedPrecio(true);
        errores=true;
      }
      else{
        setRedPrecio(false);
        datos["precio"]=parseFloat(precio).toFixed(2).toString();
      }
      if(parseFloat(cantidad).toFixed(0)<0 && cantidad.toString()!==""){
        setRedCantidad(true);
        errores=true;
      }
      else{
        setRedCantidad(false);
        datos["cantidad"]=cantidad;
      }
      if(errores){
        console.log("hubo errores al crear");
      }
      else{
        setShowProducto(false);
        var imagen=$("#productoModal #imagen_a_mostrar").attr("src");
        if(imagen.startsWith("./img/")){
          imagen=imagen.replace("./img/","");
        }
        datos["src_img"]=imagen;
        props.crearElemento(datos);
      }
    }

    return (
        <div className='col-xs-12 col-md-3 col-sm-4'>
            <input type='button' id='logarse' className='btn btn-primary deslogado' value='Logarse' onClick={()=>openDialog("login")} /> 
            <div className='row'>
                <input type='button' id='deslogarse' className='btn btn-primary logado' value='Deslogarse' onClick={()=>changeBotones(false)} />
            </div>
            <div className='row'>
                <input type='button' id='categoria' className='btn btn-primary logado creaciones' value='Crear Categoria' onClick={()=>openDialog("categoria")}/>
                <input type='button' id='producto' className='btn btn-primary logado creaciones' value='Crear Producto'  onClick={()=>openDialog("producto")}/>
            </div>
            <ModalCategoria onClose={()=>setShowCategoria(false)} show={showCategoria} reddatos={redcategoria||redcategoriavacia} redcategoria={redcategoria} redcategoriavacia={redcategoriavacia} comprobarCrearCategoria={(valor)=>comprobarCrearCategoria(valor)}/>
            <ModalLogin onClose={()=>setShowLogin(false)} show={showLogin} redpass={redpass} reduser={reduser} confirmLogin={()=>confirmarLogin()}/>
            <ModalProducto listaCategorias={()=>props.listaCategorias()} onClose={()=>setShowProducto(false)} show={showProducto} comprobarCrearProducto={()=>comprobarCrearProducto()}
            redcategoria={redcategoria} rednombre={rednombre} redcodigo={redcodigo} redprecio={redprecio}
            reddescripcion={reddescripcion} redcantidad={redcantidad}/>
        </div>
    )
}

export default BotonesHeader