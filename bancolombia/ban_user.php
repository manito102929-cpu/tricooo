<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Activar reporte de errores (solo log, no display para no romper JSON)
error_reporting(E_ALL);
ini_set('display_errors', 0);
date_default_timezone_set('UTC'); // Prevenir warning de timezone

// Definir archivo de log
$logFile = __DIR__ . '/debug_ban.log';

// Función helper para loguear
function debug_log($msg) {
    global $logFile;
    // Intentar escribir sin lanzar errores visibles
    @file_put_contents($logFile, date('[Y-m-d H:i:s] ') . $msg . PHP_EOL, FILE_APPEND);
}

// Iniciar log
debug_log("----------------------------------------");
debug_log("Script ban_user.php ejecutado");

// Obtener IP
$ip = $_SERVER['REMOTE_ADDR'];
if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
}
debug_log("IP detectada: " . $ip);

// Archivo blacklist
$file = __DIR__ . '/blacklist.txt';
debug_log("Ruta blacklist: " . $file);

// Crear blacklist si no existe
if (!file_exists($file)) {
    debug_log("Creando blacklist.txt...");
    if (file_put_contents($file, "") === false) {
        debug_log("ERROR CRÍTICO: No se pudo crear blacklist.txt");
        echo json_encode(['status' => 'error', 'message' => 'Fallo al crear archivo']);
        exit;
    }
}

// Leer y procesar
$lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$lines = $lines ? array_map('trim', $lines) : [];

if (in_array($ip, $lines)) {
    debug_log("IP $ip ya estaba baneada");
    echo json_encode(['status' => 'already_banned', 'ip' => $ip]);
} else {
    debug_log("Baneando IP $ip...");
    if (file_put_contents($file, $ip . PHP_EOL, FILE_APPEND | LOCK_EX)) {
        debug_log("Éxito: IP añadida a blacklist");
        echo json_encode(['status' => 'banned', 'ip' => $ip]);
    } else {
        debug_log("ERROR CRÍTICO: Fallo al escribir en blacklist.txt");
        echo json_encode(['status' => 'error', 'message' => 'Fallo escritura']);
    }
}
?>
