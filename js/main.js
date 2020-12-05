const fecha = document.querySelector("#fecha");
const noches = document.querySelector("#noches");
const enviar = document.querySelector("#enviar");

enviar.addEventListener("click", final);

var optNoches = [
    {
        title:"Comunes",
        opt : [4, 7, 10, 14]
    },
    {
        title:"Diarias",
        opt : [1, 2, 3, 4, 5, 6, 7]
    }
];
var opcionesAdultos = [1, 2, 3, 4];
var opcionesNinos = [0, 1, 2, 3];
var edad = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var conthabitacion = 1;

obtenerFecha();
insertarOpciones();
iniciarHabitaciones();


/**
 * Obtiene la fecha actual para que el valor por defecto y el minimo sea ese
 * @returns void
 */
function obtenerFecha()
{
    let date = new Date();
    let agno  = date.getFullYear();
    let mes = date.getMonth() + 1;
    let dia = ("0" + date.getDate()).slice(-2);

    fecha.value = agno + "-" + mes + "-" + dia;
    fecha.min = agno + "-" + mes + "-" + dia;
}

/**
 * Inserta las opciones para las noches en el hotel
 * @returns void
 */
function insertarOpciones()
{
    const opcionesNoche = document.createElement("div");
    opcionesNoche.classList.add("opciones-noche");
    optNoches.forEach(grupo => {
        const divgrupo = document.createElement("div");
        divgrupo.classList.add("grupo");
        const title = document.createElement("h4");
        title.textContent = grupo.title;

        divgrupo.appendChild(title);

        grupo.opt.forEach(opcion => {
            const divopcion = document.createElement("div");
            divopcion.classList.add("opcion");
            divopcion.textContent = `${opcion} noches`;
            divopcion.setAttribute("data-value", opcion); //le añadimos un atributo que sea su valor para obtenerlo y meterlo en el input
            divgrupo.appendChild(divopcion);

            divopcion.addEventListener("click", valorNoche);
        });

        opcionesNoche.appendChild(divgrupo);
    });

    $('#night').popover({
        content:opcionesNoche,
        placement:"bottom",
        html:true
    });
}

/**
 * Establece el valor del número de noches en el input
 * @param {*} event 
 * @returns void
 */
function valorNoche(event)
{
    let valor = event.target.getAttribute("data-value"); //obtenemos el valor del atributo con un evento, estará dentro de target
    document.querySelector("#noches-seleccionadas").textContent = valor + " noches";
    $('#night').popover('hide');
}

/**
 * crea el popover de las habitaciones y botón de añadir
 * @returns void
 */
function iniciarHabitaciones()
{
    const divgeneral = document.createElement("div");
    divgeneral.classList.add("habitaciones");

    let habitacion = crearHabitacion(conthabitacion);

    divgeneral.appendChild(habitacion);

    const divbotones = document.createElement("div");
    divbotones.classList.add("contenedor-botones");

    const divboton = document.createElement("div");
    const imgboton = document.createElement("img");
    imgboton.src = "./img/botonmas.svg";
    divboton.classList.add("btnadd");
    
    const divhecho = document.createElement("span");
    divhecho.textContent = "Hecho";
    divhecho.addEventListener("click", cerrarHabitaciones);

    divboton.appendChild(imgboton);
    divbotones.appendChild(divboton);
    divbotones.appendChild(divhecho);

    divgeneral.appendChild(divbotones);

    divboton.addEventListener("click", addHabitacion);

    $('#rooms').popover({
        content:divgeneral,
        placement:"bottom",
        html:true
    });

    $('#rooms').on('hide.bs.popover', totalHabitaciones); //no se elimina las habitaciones y los valores
}

/**
 * crea una habitacion
 * @param {int} numhab 
 * @returns void
 */
function crearHabitacion(numhab)
{
    let habitacion = document.createElement("div");
    habitacion.classList.add("habitacion");

    let nhabquitar = document.createElement("div");
    nhabquitar.classList.add("nhabquitar"); //contenedor del numero de la habitacion y de la "x" de eliminar

    let nhabitacion = document.createElement("h4"); //numero de la habitacion
    nhabitacion.textContent = numhab + " habitación";
    nhabitacion.classList.add("nhabitacion");

    nhabquitar.appendChild(nhabitacion);

    if (numhab > 1)
    {
        let eliminar = document.createElement("div");
        eliminar.textContent = "x";
        eliminar.classList.add("eliminar");
        eliminar.addEventListener("click", removeHabitacion);
        nhabquitar.appendChild(eliminar);
    }

    let adultos = crearHuespedes("Adultos", opcionesAdultos);
    adultos.classList.add("select-adultos");

    let ninos = crearHuespedes("Niños", opcionesNinos);
    ninos.classList.add("select-ninos");

    let contenedorEdades = document.createElement("div");
    contenedorEdades.classList.add("contenedor-edades");
    ninos.querySelector("select").addEventListener("change", selectEdad); //crea los select de las edades

    habitacion.appendChild(nhabquitar);
    habitacion.appendChild(adultos);
    habitacion.appendChild(ninos);
    habitacion.appendChild(contenedorEdades);

    return habitacion;
}

/**
 * crea el contenedor de cada huésped (adultos y niños)
 * @param {string} valor 
 * @param {array} opciones 
 * @returns {div} devuelve el contenedor del select correspondiente
 */
function crearHuespedes(valor, opciones)
{
    let contenedor = document.createElement("div");

    let tcontenedor = document.createElement("label");
    tcontenedor.textContent = valor;
    tcontenedor.classList.add("tselect");

    let select = crearSelect(opciones);

    contenedor.appendChild(tcontenedor);
    contenedor.appendChild(select);

    return contenedor;
}

/**
 * crea los select del nº de niños y adultos
 * @param {array} opciones 
 * @returns {select} devuelve el select correspondiente 
 */
function crearSelect(opciones)
{
    let select = document.createElement("select");

    opciones.forEach(opcion => {
        crearOpcion(select, opcion);
    });

    return select;
}

/**
 * crea las opciones para los select
 * @param {div} contenedor 
 * @param {int} valor 
 * @returns void
 */
function crearOpcion(contenedor, valor)
{
    const opcion = document.createElement('option');
    
    opcion.value = valor;
    opcion.textContent = valor;

    contenedor.appendChild(opcion);
}

/**
 * crear select de las edades de los niños
 * @param {*} event 
 * @returns void
 */
function selectEdad(event)
{
    let nselect = parseInt(event.target.value); //obtenemos el valor seleccionado para crear los select correspondientes
    let contenedorEdades = event.target.closest(".habitacion").querySelector(".contenedor-edades"); //obtenemos del div Habitacion que hayamos seleccionado el div contenedor-edades
    
    limpiarContenedor(contenedorEdades); //limpiamos en caso de que existan select dentro del contenedor
    for (let i = 0; i < nselect; i++) //creamos tantos select como el valor seleccionado
    {
        let select = crearSelect(edad);
        select.classList.add("sedad");
        
        contenedorEdades.appendChild(select);
    }
}

/**
 * en el caso de que hayan select de edad se eliminan
 * @param {div} contenedor 
 * @returns void
 */
function limpiarContenedor(contenedor)
{
    while (contenedor.hasChildNodes())
    {
        contenedor.removeChild(contenedor.firstChild);
    }
}

/**
 * crea una habitacion
 * @returns void
 */
function addHabitacion()
{
    
    if (conthabitacion < 4)
    {
        conthabitacion++;
        let habitacion = crearHabitacion(conthabitacion);
        document.querySelector(".habitaciones .contenedor-botones").before(habitacion); //se añade antes del boton de añadir
    }
    
    $('#rooms').popover('update'); //para que el popover no crezca hacia la derecha
}

/**
 * eliminamos la habitacion
 * @param {*} event 
 * @returns void
 */
function removeHabitacion(event)
{
    event.target.closest(".habitacion").remove(); //obtenemos el div habitacion que hayamos seleccionado y lo eliminamos 
    conthabitacion--; 
    actualizarNumero();
    $('#rooms').popover('update');
}

/**
 * actualiza el numero de la habitacion
 * @returns void
 */
function actualizarNumero()
{
    //obtenemos todos los div de habitaciones y le actualizamos su h4
    document.querySelectorAll(".habitacion").forEach((habitacion, numero) => {
        habitacion.querySelector("h4").textContent = (numero + 1) + " habitación";
    });
}

/**
 * Cuenta el total de habitaciones y huéspedes para añadirlos en el input
 * @returns void
 */
function totalHabitaciones()
{
    let nhuespedes = 0;
    document.querySelectorAll(".select-adultos, .select-ninos").forEach(div => {
        nhuespedes += parseInt(div.querySelector("select").value);
    });

    document.querySelector("#habitaciones").textContent = conthabitacion;
    document.querySelector("#huespedes").textContent = nhuespedes;
}

/**
 * Cierra el popover de las habitaciones
 * @returns void
 */
function cerrarHabitaciones()
{
    $('#rooms').popover('hide');
}

/**
 * Muestra por consola los valores
 * @returns void
 */
function final()
{
    let name = document.querySelector("#nombre-hotel").value;
    document.querySelector("#nombre-hotel").value = "";
    console.log("Nombre del hotel o destino: ", name);

    console.log("Fecha de entrada: ", fecha.value);

    let valor = document.getElementById("noches-seleccionadas").innerHTML;
    console.log("Se hospedará", valor);

    let habitaciones = document.getElementById("habitaciones").innerHTML;
    console.log("Número de habitaciones:", habitaciones);

    let huespedes = document.getElementById("huespedes").innerHTML;
    console.log("Número de huéspedes:", huespedes);
}