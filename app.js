//VARIABLES GLOBALES

const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');
let arrayActividades = [];
let item={
  actividad: '',
  estado: false
}


//FUNCIONES

const CrearItem = (actividad)=>{
 
    let item ={
    actividad: actividad,
    estado: false
  }
  
  arrayActividades.push(item);
  return item;
}

const GuardarDB = (actividad)=>{
 
   localStorage.setItem('lista', JSON.stringify(arrayActividades));
   PintarDB();
}

const PintarDB = () =>{

   listaActividadesUI.innerHTML = '';
   arrayActividades = JSON.parse(localStorage.getItem('lista'));
   if(arrayActividades=== null){

    arrayActividades =[];
   }else{

    arrayActividades.forEach(element => {

        if(element.estado){
          listaActividadesUI.innerHTML += `<div class="alert alert-success" role="alert">
        <span class="material-icons float-left mr-2">store</span><b>${element.actividad}</b> - ${element.estado}
        <span class="float-right"><span class="material-icons">done</span><span class="material-icons">delete</span>
        </span></div> `

        }else{
            listaActividadesUI.innerHTML += `<div class="alert alert-danger" role="alert">
            <span class="material-icons float-left mr-2">store</span><b>${element.actividad}</b> - ${element.estado}
            <span class="float-right"><span class="material-icons">done</span><span class="material-icons">delete</span>
            </span></div> `
        }

        
    });
   }
}

const EliminarDB = (actividad)=>{

  let indexArray;

  arrayActividades.forEach((element, index) =>{
   
    if(element.actividad === actividad){

        indexArray = index;
    }
   
  })

  arrayActividades.splice(indexArray,1);
  GuardarDB();
}

const EditarDB = (actividad) => {

    let indexArray = arrayActividades.findIndex((element)=>element.actividad === actividad)
 
    arrayActividades[indexArray].estado = true;

    GuardarDB();
}
//EventListener

formularioUI.addEventListener('submit',(e)=>{

  e.preventDefault();
  let actividadUI = document.querySelector('#actividad').value;
  
  CrearItem(actividadUI);
  GuardarDB();
  formularioUI.reset(); 

});

document.addEventListener('DOMContentLoaded', PintarDB)
listaActividadesUI.addEventListener('click', (e) => {

    e.preventDefault();
    

    if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){

        let texto = e.path[2].childNodes[2].innerHTML;
        if(e.target.innerHTML === 'delete'){

         EliminarDB(texto);
        }
        if(e.target.innerHTML === 'done'){

         EditarDB(texto);
        }
    }

})