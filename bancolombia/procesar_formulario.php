<?php
session_start();
header('Content-Type: application/json');

// Recibir datos JSON
$input = json_decode(file_get_contents('php://input'), true);

if ($input) {
    // Guardar transaction_id en sesión si viene
    if (isset($input['transaction_id'])) {
        $_SESSION['transaction_id'] = $input['transaction_id'];
    }
    
    // Guardar otros datos en sesión si es necesario
    $_SESSION['formData'] = $input;
    
    echo json_encode(['status' => 'success', 'message' => 'Datos procesados']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No se recibieron datos']);
}
?>