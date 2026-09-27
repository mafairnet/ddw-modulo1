<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json; charset=utf-8');

    $variables = [
        'nombre' => isset($_POST['nombre']) ? trim($_POST['nombre']) : '',
        'correo' => isset($_POST['correo']) ? trim($_POST['correo']) : '',
        'pais' => isset($_POST['pais']) ? trim($_POST['pais']) : '',
        'fav_language' => isset($_POST['fav_language']) ? trim($_POST['fav_language']) : '',
        'prueba' => isset($_POST['prueba']) && is_array($_POST['prueba'])
            ? array_map('trim', $_POST['prueba'])
            : [],
    ];

    $camposRequeridos = ['nombre', 'correo', 'pais', 'fav_language'];
    $camposFaltantes = [];

    foreach ($camposRequeridos as $campo) {
        if ($variables[$campo] === '') {
            $camposFaltantes[] = $campo;
        }
    }

    if ($camposFaltantes !== []) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Faltan campos obligatorios: ' . implode(', ', $camposFaltantes) . '.',
            'missing_fields' => $camposFaltantes,
            'variables' => $variables,
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    echo json_encode([
        'status' => 'success',
        'variables' => $variables,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
?>