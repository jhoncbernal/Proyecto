var PubliDB;
$(function () {

    Refresh();
    $.ajaxSetup({ cache: false });
    setInterval(DinamicData, 1000);
});

/* las opciones para nuestro grafico */


var dynamodb = new AWS.DynamoDB(); /*Realiza un análisis de la tabla DynamoDB para establecer un objeto de datos para el gráfico. */
var timestampRead = 0.0,
    luzapagada = 0,
    luzencendida = 0;

function DeleteGrafico(Tag) {
    if (document.getElementsByClassName(Tag)) {
        let del = document.getElementsByClassName(Tag);
        for (let index = 0; index < del.length; index++) {
            contenedor.removeChild(del[index]);
        }
    }
}
function Refresh() {
    delete Topic;
    Topic= new Array();
   
    fecha();
    ConsultaFirebaseElementsbyPlace('MyHome').then(function(result){     
        for (let index = 0; index < result.length; index++) {
            DeleteGrafico(result[index]);
            Topic.push(new Tema(result[index], 'line', [random_rgba(), random_rgba()], []));
            
        }
        getData(Topic);
    }, function (err) { console.log(err); });

    
}

function getData(Topic) {
    try {
        var params = {
            TableName: Tabla,
            KeyConditionExpression: '#id = :iotTopic',
            ExpressionAttributeNames: {
                "#id": Partitionkey,
            },
            ExpressionAttributeValues: {
                ":iotTopic": { "S": DeviceName },
            }
        };
        datosBD = dynamodb.query(params, function (err, data) {
            if (err) {
                console.log(err);
                return null;
            } else {
                // marcadores de posición para las matrices de datos
                PubliDB = data['Items'];
                leerDB(Topic);

            }
        });
    } catch (err) {
        alert("Error en :" + err.message);
    }
}


function leerDB(Topic) {
    data = PubliDB;
    limit = (fechaMaxima(data));
    for (var T in Topic) {
        delete Topic[T].Values, delete Topic[T].Labels;
        Topic[T].Values = [], Topic[T].Labels = [];

        Topic[T].Grafica = Graf(Topic[T].NomGraf, Topic[T].TypeGraf, Topic[T].TiniGraf, Topic[T].TctxGraf, Topic[T].nombre, Topic[T].ColorGraf, Topic[T].datalabel);
        if (Topic[T].Grafica == undefined) {
            Topic[T].Grafica.destroy();
        }

        for (var i in data) { // lee los valores del paquete dynamodb JSON
            var timestampRead = parseFloat(data[i]['data']['M']['timestamp']['N']);
            if (timestampRead > limit) {
                var n = (data[i]['data']['M']['state']['M']['reported']['M']);
                Topic[T] = Object.assign({}, Topic[T], (Consulta(n[Topic[T].nombre], timestampRead)));

                AgregarDato(Topic[T], Topic[T].Grafica);
                delete Topic[T].value, delete Topic[T].time;
            }
        }
        if(Topic[T].Values.length<1){
            DeleteGrafico(Topic[T].nombre);
        }
        if (i == (data.length) - 1) {
            Topic[T] = Object.assign({}, Topic[T], (getMaxMinOfArray(Topic[T].Values, Topic[T].Labels)));
        }
        ValuesMaxMin(Topic[T]);
    }
}

function fecha() {

    return rango = document.getElementById("Selecfecha").value;

}
function DinamicData(){

    try {
        var params = {
            TableName: Tabla,
            KeyConditionExpression: '#id = :iotTopic',
            ExpressionAttributeNames: {
                "#id": Partitionkey,
            },
            ExpressionAttributeValues: {
                ":iotTopic": { "S": DeviceName },
            },
            ScanIndexForward: false,
            Limit: 1
        };
        datosBD = dynamodb.query(params, function (err, data) {
            if (err) {
                console.log(err);
                return null;
            } else {
                // marcadores de posición para las matrices de datos
                data = data['Items'];
                    var timestampRead = parseFloat(data[0]['data']['M']['timestamp']['N']);
                    var n = (data[0]['data']['M']['state']['M']['reported']['M']);
                    for (var T in Topic) {
                    if(typeof(n[Topic[T].nombre])!= 'undefined'){
                        let fecha=(new Date((((timestampRead) - 18000) * 1000))).toISOString();
                        fecha=("Fecha: " + (fecha.substring(0, 19)).replace('T', " Hora: "));
                        if(fecha!=Topic[T].Labels[Topic[T].Labels.length-1]){
                Topic[T].Values.push(parseFloat(n[Topic[T].nombre]['N']))
                 Topic[T].Labels.push( fecha);
                    Topic[T].Grafica.update()
                    Topic[T] = Object.assign({}, Topic[T], (getMaxMinOfArray(Topic[T].Values, Topic[T].Labels)));
                    ValuesMaxMin(Topic[T]);
                        }
                    }}
            }
        });
    } catch (err) { 
        alert("Error en :" + err.message);
    }
}