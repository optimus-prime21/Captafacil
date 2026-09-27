// ============================================
// CaptaFácil — JavaScript accesible
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.getElementById('menu-principal');

    if (menuToggle && menuList) {
        // Abrir/cerrar menú con clic
        menuToggle.addEventListener('click', () => {
            const isOpen = menuList.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        // Cerrar menú al hacer clic en un enlace
        menuList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuList.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuList.classList.contains('is-open')) {
                menuList.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
            }
        });
    }

    // Validación accesible del formulario
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');
            
            let valido = true;
            let primerError = null;

            // Limpiar errores previos
            [nombre, email, mensaje].forEach(campo => {
                campo.setAttribute('aria-invalid', 'false');
                campo.style.borderColor = '#ccc';
            });

            // Validar nombre
            if (!nombre.value.trim()) {
                nombre.setAttribute('aria-invalid', 'true');
                nombre.style.borderColor = '#d00000';
                if (!primerError) primerError = nombre;
                valido = false;
            }

            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                email.setAttribute('aria-invalid', 'true');
                email.style.borderColor = '#d00000';
                if (!primerError) primerError = email;
                valido = false;
            }

            // Validar mensaje
            if (!mensaje.value.trim()) {
                mensaje.setAttribute('aria-invalid', 'true');
                mensaje.style.borderColor = '#d00000';
                if (!primerError) primerError = mensaje;
                valido = false;
            }

            if (valido) {
                // Mensaje de éxito accesible
                const exito = document.createElement('div');
                exito.setAttribute('role', 'status');
                exito.setAttribute('aria-live', 'polite');
                exito.style.cssText = 'background: #d8f3dc; color: #1b4332; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center; font-weight: 600;';
                exito.textContent = '✅ ¡Mensaje enviado! Nos pondremos en contacto pronto.';
                form.appendChild(exito);
                form.reset();

                setTimeout(() => exito.remove(), 5000);
            } else if (primerError) {
                // Enfocar el primer campo con error
                primerError.focus();
            }
        });
    }
});