$(document).ready(function() {
    $("#demoForm").submit(function(event) {
        event.preventDefault();
        evaluateForm();
    });
});

function showResponse(response) {
    const isSuccess = response.status === "success";
    const $panel = $("#responsePanel");

    $panel
        .removeClass("is-success is-error")
        .addClass(isSuccess ? "is-success" : "is-error")
        .show()
        .attr("aria-hidden", "false");

    $("#responseTitle").text(isSuccess ? "Envío exitoso" : "No se pudo enviar");
    $("#responseMessage").text(
        response.message || (isSuccess ? "Tus datos se enviaron correctamente." : "Ocurrió un error al procesar la solicitud.")
    );
    $("#responseJson").text(JSON.stringify(response, null, 2));
    console.log(JSON.stringify(response, null, 2));
}

function evaluateForm() {
    const nombre = $("#nombre").val().trim();
    const correo = $("#correo").val().trim();
    const pais = $("#pais").val();
    const favLanguage = $("input[name='fav_language']:checked").val();
    const prueba = $("input[name='prueba[]']")
        .map(function() {
            return $(this).val().trim();
        })
        .get();
    const missingFields = [];

    $("#nombre, #correo, #pais").removeClass("alert-input");
    $("#nombreLabel, #correoLabel, #paisLabel").removeClass("alert-label");
    $("#fav_language").removeClass("alert-input");
    $("#fav_languageLabel").removeClass("alert-label");

    if (!nombre) {
        $("#nombre").addClass("alert-input");
        $("#nombreLabel").addClass("alert-label");
        missingFields.push("nombre");
    }

    if (!correo) {
        $("#correo").addClass("alert-input");
        $("#correoLabel").addClass("alert-label");
        missingFields.push("correo");
    }

    if (!pais) {
        $("#pais").addClass("alert-input");
        $("#paisLabel").addClass("alert-label");
        missingFields.push("país");
    }

    if (!favLanguage) {
        $("#fav_language").addClass("alert-input");
        $("#fav_languageLabel").addClass("alert-label");
        missingFields.push("lenguaje favorito +");
    }

    if (missingFields.length > 0) {
        showResponse({
            status: "error",
            message: "Completa los campos obligatorios: " + missingFields.join(", ") + ".",
            missing_fields: missingFields
        });
        return;
    }

    $.ajax({
        url: "http://localhost:89/azt/formularios/controller/demo.php",
        type: "POST",
        dataType: "json",
        data: {
            nombre: nombre,
            correo: correo,
            pais: pais,
            fav_language: favLanguage,
            prueba: prueba
        }
    }).done(function(response) {
        showResponse(response);
    }).fail(function(xhr) {
        const response = xhr.responseJSON || {
            status: "error",
            message: "No fue posible completar la solicitud."
        };
        showResponse(response);
    });
}