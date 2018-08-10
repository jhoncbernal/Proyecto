//Datos conexion server configurar en txt decode Base64
Servidor = "m11.cloudmqtt.com";
Usuario = "dcfmjydj";
Contraseña = "X51aHosKh0uD";
PuertoWebsockets = 39603;
Puerto_SSL = 29603;
// Metodo encargado de realizar la conexion con el Websocket de cloudmqtt 
client = new Paho.MQTT.Client(Servidor, PuertoWebsockets, "idcliente: " + parseInt(Math.random() * 100, 10));
// establecer controladores de devolución de llamada
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

var options = {
    useSSL: true,
    userName: Usuario,
    password: Contraseña,
    onSuccess: onConnect,
    onFailure: doFail
}

// connect y validacion del cliente por credenciales
client.connect(options);


// called when the client connects
function onConnect() {

    /* Once a connection has been made, make a subscription and send a message.
     */
    console.log("onConnect");

    dato = document.getElementById("ACCION").value;

    try {
        if (dato!="Opciones"){
            topic = document.getElementById("topic0").value;

            if (topic == "light") {
                valor = +(document.getElementById("value" + i).checked);
                value = (valor + '')
            } else {               
                value = document.getElementById("value" + i).value;
                }
            
            enviarmqtt();
            }
        
    } catch (err) {
        console.log(err);
    }

    function enviarmqtt() {
        if (typeof value !== 'undefined'){
        client.subscribe(topic);
        message = new Paho.MQTT.Message(value);
        message.destinationName = topic;
        client.send(message);
        }
    }
}

function doFail(e) {
    console.log(e);
}

/* called when the client loses its connection
 */
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
}