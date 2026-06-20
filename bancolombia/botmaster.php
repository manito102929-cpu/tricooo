<?php
// Cargar configuración global desde config.json
$configJson = file_get_contents(__DIR__ . '/config.json');
$config = json_decode($configJson, true);

if (!$config) {
    // Fallback o error si no se puede leer el JSON
    return [];
}

return [
    'token' => $config['token'],
    'chat_id' => $config['chat_id']
];
