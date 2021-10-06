const tarjeta = document.querySelector('#tarjeta'),
	  btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
	  formulario = document.querySelector('#formulario-tarjeta'),
	  numeroTarjeta = document.querySelector('#tarjeta .numero'),
	  nombreTarjeta = document.querySelector('#tarjeta .nombre'),
	  logoMarca = document.querySelector('#logo-marca'),
	  firma = document.querySelector('#tarjeta .firma p'),
	  mesExpiracion = document.querySelector('#tarjeta .mes'),
	  yearExpiracion = document.querySelector('#tarjeta .year');
	  ccv = document.querySelector('#tarjeta .ccv');

// Evito Refresh de la Pagina
formulario.addEventListener('submit', function(event) {
    event.preventDefault();
	formulario.reset();
	numeroTarjeta.innerHTML = "#### #### #### ####";
	nombreTarjeta.innerHTML = "Nombre Apellido";
	ccv.innerHTML = "";
	mesExpiracion.innerHTML = "MM";
	yearExpiracion.innerHTML = "AA";
	firma.innerHTML = "";
	
	mostrarFrente();
});

// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
	if(tarjeta.classList.contains('active')){
		tarjeta.classList.remove('active');
	}
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active');
	formulario.classList.toggle('active');
});

// * Select del mes generado dinamicamente.
for(let i = 1; i <= 12; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}

// * Select del año generado dinamicamente.
const yearActual = new Date().getFullYear();
for(let i = yearActual; i <= yearActual + 8; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}

// * Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	// Eliminamos espacios en blanco
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
	.trim();

	numeroTarjeta.textContent = valorInput;

	if(valorInput == ''){
		numeroTarjeta.textContent = '#### #### #### ####';

		logoMarca.innerHTML = '';
	}

	if(valorInput[0] == 4){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img-target/visa.png';
		logoMarca.appendChild(imagen);
	} else if(valorInput[0] == 5){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img-target/mastercard.png';
		logoMarca.appendChild(imagen);
	}

	// Volteamos la tarjeta para que el usuario vea el frente.
	mostrarFrente();
});

// * Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = 'Nombre';
	}

	mostrarFrente();
});

// * Select mes
formulario.selectMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;
	mostrarFrente();
});

// * Select Año
formulario.selectYear.addEventListener('change', (e) => {
	yearExpiracion.textContent = e.target.value.slice(2);
	mostrarFrente();
});

// * CCV
formulario.inputCCV.addEventListener('keyup', () => {
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	// Eliminar los espacios
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '');

	ccv.textContent = formulario.inputCCV.value;
});


// Targetero
const contenedor = document.querySelector('.tablaCuerpo');

const botonAgr = document.querySelector('.btn-enviar');
botonAgr.addEventListener('click', () => {
	const numeroFinal = formulario.num.value;
	
	agregaDatos(numeroFinal);
});

function agregaDatos(numeroFinal) {
	const agregaTr = document.createElement('tr');
    agregaTr.classList.add('agregado');
    const contenido = ` <td>${numeroFinal}</td>
						<td><input type="checkbox" checked></td>
                        <td class="elimina"><button>Eliminar</button></td>`;

    agregaTr.innerHTML = contenido;
    contenedor.append(agregaTr);

    agregaTr.querySelector('.elimina').addEventListener('click', eliminaProd);
}

// Eliminar Productos
function eliminaProd(event) {
    const botonClick = event.target;
    botonClick.closest('tr').remove();
}

// Hbilitar Boton cuando los campos esten llenos
function habilitar() {
	const numeroFinal = formulario.num.value;
	const nombreFinal = formulario.name.value;
	const ccvFinal = formulario.ccv2.value;
	const mesFinal = formulario.mes.value;
	const yearFinal = formulario.year.value;
	val = 0;

	if (numeroFinal == "") {
		val++;
	}

	if (nombreFinal == "") {
		val++;
	}

	if (ccvFinal == "") {
		val++;
	}

	if (val == 0) {
		botonAgr.disabled = false;
	} else {
		botonAgr.disabled = true;
	}
}
formulario.num.addEventListener('keyup', habilitar);
formulario.name.addEventListener('keyup', habilitar);
formulario.ccv2.addEventListener('keyup', habilitar);