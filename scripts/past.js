function search(event){
    event.preventDefault();
    //borrar las cards
    while (divEventos.firstChild){
        divEventos.removeChild(divEventos.firstChild);
      };
      //traer las nuevas cards filtradas
      //filtrarData es un filtro dinamico, solo revisa las funciones que se le pasan. 
      let eventosFiltrados=filtrarData(eventosPasados,[filterByName(barraBusqueda.value)],checkCategory());
      if(eventosFiltrados.length==0){
        //si no hay eventos debe indicar que ninguno cumple
        divEventos.appendChild(createtext('p',"","Ningún evento cumple con los criterios de búsqueda"));
      }
      else{
         //genera una card por cada evento y se agrega a divEventos
         eventosFiltrados.forEach(event => {
        divEventos.appendChild(generateCard(event));
        });
    }
}

function checkCategory(){
    //obtengo todas las categorias tildadas por el usuario
    let presionadas=[];
    let categories = document.getElementsByClassName("checkbox-category");
    for (category of categories){
        if(category.checked)
            presionadas=presionadas.concat(category);
    }
    //devuelvo un array de funciones para construir el filtro de manera dinamica
    return presionadas.map(category=>filterByCategory(category.name));
}

function ManipularEvents(){
        //eventos pasados
     eventosPasados=getPastEvents(data.currentDate);



    //traer todos los eventos pasados
    eventosPasados.forEach(event => {
        divEventos.appendChild(generateCard(event));
    });

    //darle evento al hacer click

    btnSearch.addEventListener('click',search);

    //generar las categorias
    generateDOMCategories(getCategories(eventosPasados),categoriesBar);
}

let data;
let eventosPasados;
//obtener datos
fetch("https://mindhub-xj03.onrender.com/api/amazing").then(datos=>datos.json()).then(
    api=>{
        data=api;
        ManipularEvents();
    });

    //obtener div con los eventos
let divEventos=document.getElementById("div-eventos");
 //obtener boton de buscar y darle evento al hacer click
 let btnSearch=document.getElementById("search");
 let barraBusqueda=document.getElementById("busq");

   //obtener el div de las categories
   let categoriesBar=document.getElementById("categories");
    //hacer que filtre cada vez que agrega una letra al buscador o tilda/destilda una categoria
 barraBusqueda.addEventListener('input',search);
 categoriesBar.addEventListener('change',search);