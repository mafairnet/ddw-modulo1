const tema = document.querySelector("#tema");
        const formulario = document.querySelector("#contacto");
        const resultado = document.querySelector("#resultado");
        document.querySelector("#anio").textContent = new Date().getFullYear();

        tema.addEventListener("click", () => {
            document.body.classList.toggle("oscuro");
            tema.textContent = document.body.classList.contains("oscuro") ? "Modo claro" : "Modo oscuro";
        });

        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            const nombre = document.querySelector("#nombre").value.trim();
            resultado.textContent = `Gracias, ${nombre}. Tu mensaje fue preparado correctamente.`;
            formulario.reset();
        });