// Selección de elementos del DOM
const modal = document.getElementById('modalContacto');
const form = document.getElementById('formContacto');
const btnEnviar = document.getElementById('btnEnviar');
const btnCancelar = document.getElementById('btnCancelar');
const inputs = form.querySelectorAll('input, textarea');
// Selección de elementos modal nosotros
const modalNosotros = document.getElementById('modalNosotros');
const btnAbrirNosotros = document.querySelector('a[href="#nosotros"]'); // Asegúrate que tu botón tenga href="#nosotros" o una ID
const btnCerrarNosotros = document.getElementById('btnCerrarNosotros');
const cerrarFondo = document.getElementById('cerrarModalFondo');

/**
 * Lógica para abrir el Modal
 * Selecciona todos los enlaces de contacto y botones de la web
 */
const abrirModal = (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Evita el scroll de fondo
};

document.querySelectorAll('a[href="#contacto"], .btn-primary-sm').forEach((boton) => {
    boton.addEventListener('click', abrirModal);
});

/**
 * Lógica para cerrar el Modal
 */
const cerrarModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Habilita el scroll nuevamente
    form.reset(); // Limpia los campos al cerrar
    validarFormulario(); // Resetea el estado del botón enviar
};

btnCancelar.addEventListener('click', cerrarModal);

// Cerrar modal si el usuario hace clic fuera del contenido blanco
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        cerrarModal();
    }
});

/**
 * Validación en tiempo real
 * Verifica que todos los campos "required" tengan contenido
 */
const validarFormulario = () => {
    // Verificamos si cada input tiene un valor (quitando espacios en blanco)
    const todosLlenos = Array.from(inputs).every((input) => input.value.trim() !== '');

    if (todosLlenos) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('btn-enviar-desactivado');
        btnEnviar.classList.add('btn-enviar-activo');
    } else {
        btnEnviar.disabled = true;
        btnEnviar.classList.remove('btn-enviar-activo');
        btnEnviar.classList.add('btn-enviar-desactivado');
    }
};

// Escuchamos cada vez que el usuario escribe en el formulario
form.addEventListener('input', validarFormulario);

/**
 * Manejo del envío del formulario vía WhatsApp
 */
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Capturamos los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const celularCliente = document.getElementById('celular').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    // 2. CONFIGURA TU NÚMERO AQUÍ
    // Usa el código de país sin el símbolo + (Ejemplo para Argentina: 549...)
    const miNumeroWhatsApp = '5491123126749';

    // 3. Creamos el mensaje con formato para que sea fácil de leer
    const textoMensaje =
        `*NUEVA CONSULTA DESDE LA WEB*%n%n` +
        `*Nombre:* ${nombre}%n` +
        `*Celular:* ${celularCliente}%n` +
        `*Correo:* ${correo}%n` +
        `*Mensaje:* ${mensaje}`;

    // 4. Construimos la URL de WhatsApp (reemplazando espacios por %20 y saltos de línea)
    // El %0A es para saltos de línea en WhatsApp
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${miNumeroWhatsApp}&text=${encodeURIComponent(
        textoMensaje.replace(/%n/g, '\n'),
    )}`;

    // 5. Abrimos WhatsApp en una nueva pestaña
    window.open(urlWhatsApp, '_blank');

    // 6. Cerramos el modal y limpiamos
    alert('¡Perfecto! Serás redirigido a WhatsApp para finalizar el envío.');
    cerrarModal();
});

// 1. Lógica principal del botón hamburguesa
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');

    const icono = menuBtn.querySelector('i');
    icono.style.transition = 'transform 0.3s ease'; // Asegura suavidad

    if (navLinks.classList.contains('mobile-active')) {
        icono.classList.replace('fa-bars', 'fa-times'); // Se vuelve "X"
        icono.style.transform = 'rotate(90deg)'; // Rota para la "X"
    } else {
        icono.classList.replace('fa-times', 'fa-bars'); // Vuelve a "Hamburguesa"
        icono.style.transform = 'rotate(0deg)'; // RESETEA a horizontal
    }
});

// 2. Corregir el cierre al hacer clic en las opciones
document.querySelectorAll('#navLinks a').forEach((link) => {
    link.addEventListener('click', () => {
        // Cerramos el menú
        navLinks.classList.remove('mobile-active');

        // RESETEAMOS EL ICONO A HORIZONTAL
        const icono = menuBtn.querySelector('i');
        icono.classList.replace('fa-times', 'fa-bars');
        icono.style.transform = 'rotate(0deg)';
    });
});

// Función Abrir
const abrirModalNos = (e) => {
    e.preventDefault();
    modalNosotros.classList.remove('hidden');
    modalNosotros.classList.add('flex');
    document.body.classList.add('no-scroll');
};

// Función Cerrar
const cerrarModalNos = () => {
    modalNosotros.classList.add('hidden');
    modalNosotros.classList.remove('flex');
    document.body.classList.remove('no-scroll');
};

// Eventos
if (btnAbrirNosotros) {
    btnAbrirNosotros.addEventListener('click', abrirModalNos);
}
btnCerrarNosotros.addEventListener('click', cerrarModalNos);
cerrarFondo.addEventListener('click', cerrarModalNos);

// Cerrar con tecla Escape
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModalNos();
});
