const botonCar = document.querySelectorAll('.boton1');
botonCar.forEach((agregarCar) => {
    agregarCar.addEventListener('click', clickCar);
});

const comprarBoton = document.querySelector('.botonCompara');
comprarBoton.addEventListener('click', comprarClick);

//Agregar articulos al carrito
const contenedor = document.querySelector('.tablaCuerpo');

function clickCar(event) {
    const boton = event.target;
    const item = boton.closest('.itemBox');

    const titulo = item.querySelector('.item-text').textContent;
    const precio = item.querySelector('.pesos').textContent;

    agregarItemsCar(titulo, precio);
} 

function agregarItemsCar(titulo, precio) {

    //Para que no se repita y se sume al contador
    const tab = contenedor.getElementsByClassName('tit');
    for(let i = 0; i < tab.length; i++) {
        if (tab[i].innerText === titulo) {
            let cantidadElementos = tab[i].parentElement.querySelector('.input');
            cantidadElementos.value++;
            precioTotal();
            return;
        }
    }

    //Agrego tr's
    const agregaTr = document.createElement('tr');
    agregaTr.classList.add('agregado');
    const contenido = ` <td class="tit">${titulo}</td>
                        <td class="monto">${precio}</td>
                        <td><input class="input" type="number"  value="1"></td>
                        <td class="elimina"><button>Eliminar</button></td>`;

    agregaTr.innerHTML = contenido;
    contenedor.append(agregaTr);

    agregaTr.querySelector('.elimina').addEventListener('click', eliminaProd);
    agregaTr.querySelector('.input').addEventListener('change', cantidadMod);

    precioTotal()
}

//Sumador de Precio Total
function precioTotal() {
    let total = 0;
    const precioTot = document.querySelector('.totpre');

    const todos = document.querySelectorAll('.agregado'); 

    todos.forEach(tr => { 
        const selectPrecio = tr.querySelector('.monto');
        const soloPrecio = Number(selectPrecio.textContent.replace('$',''));
        const cantidad = tr.querySelector('.input');
        const valorCantidad = Number(cantidad.value);

        total = total + soloPrecio * valorCantidad;
    });

    precioTot.innerHTML = `${total}`;
}

//Elimina del Carrito
function eliminaProd(event) {
    const botonClick = event.target;
    botonClick.closest('tr').remove();
    precioTotal();
}

//Modifico Contador
function cantidadMod(event) {
    const contador = event.target;
    contador.value <= 0 ? (contador.value = 1) : null; 
    precioTotal();
}

//Comprar
function comprarClick() {
        Swal.fire({
            title: '¿Estás Seguro?',
            text: "Puede que olvides algo.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2CAB1C',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Comprar Ahora'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Gracias por tu Compra!!!',
                    text: "Tu pedido llegara pronto.",
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 3000
                });
            contenedor.innerHTML = '';
            precioTotal();
            }
        })
}