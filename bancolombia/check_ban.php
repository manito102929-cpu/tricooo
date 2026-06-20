<?php
header('Content-Type: application/json');

$ip = $_SERVER['REMOTE_ADDR'];

// Manejo de proxies (mismo método que ban_user.php)
if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip_list = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
    $ip = trim($ip_list[0]);
} elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
}

$file = __DIR__ . '/blacklist.txt';

$banned = false;

if (file_exists($file)) {
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines !== false) {
        $lines = array_map('trim', $lines);
        if (in_array($ip, $lines)) {
            $banned = true;
        }
    }
}

echo json_encode(['banned' => $banned]);
?>