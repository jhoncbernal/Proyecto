var PubliDB;


$(function() {
    ConsultaDispositivosGauge();
    $.ajaxSetup({ cache: false });
    setInterval(ConsultaDispositivosGauge, 500000);
});

/* las opciones para nuestro grafico */


var dynamodb = new AWS.DynamoDB(); /*Realiza un análisis de la tabla DynamoDB para establecer un objeto de datos para el gráfico. */
var timestampRead = 0.0;

function getData() {
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
        datosBD = dynamodb.query(params, function(err, data) {
            if (err) {
                console.log(err);
                return null;
            } else {
                // marcadores de posición para las matrices de datos
                PubliDB = data['Items'];                
                leerDB();

            }
        });
    } catch (err) {
        alert("Error en :" + err.message);
    }
}


function leerDB() {
    data = PubliDB;

    for (var T in Topic) {
        delete Topic[T].Values, delete Topic[T].Labels;
        Topic[T].Values = [], Topic[T].Labels = [];
        if (Topic[T].Grafica != undefined) {
            Topic[T].Grafica.destroy();
        }

        for (var i in data) { // lee los valores del paquete dynamodb JSON
            var max = parseFloat(data[data.length - 1]['data']['M']['timestamp']['N']);
            timestampRead = parseFloat(data[i]['data']['M']['timestamp']['N']);
            limit = (max - 3600);
            if (timestampRead > limit) {
                var n = (data[i]['data']['M']['state']['M']['reported']['M']);
                if (typeof(n[Topic[T].nombre]) != 'undefined') {
                    Topic[T].value = parseFloat(n[Topic[T].nombre]['N']);
                }

            }
            if ((typeof(Topic[T].value)) != 'undefined') {
                Topic[T].Values.push(Topic[T].value);
            }
            delete Topic[T].value;
        }
        if (Topic[T].Values.length != 0) {
            Topic[T].UltimoValor = Topic[T].Values[(Topic[T].Values.length) - 1];
            GraficarGauge(Topic[T]);
        }

        if (Topic[T].UltimoValor == 0 || Topic[T].UltimoValor == undefined) {
            document.getElementById("cont" + Topic[T].nombre).style.display = "none";
        } else {
            document.getElementById("cont" + Topic[T].nombre).style.display = "block";
        }
    }

}

function fecha() {

    return rango = document.getElementById("Selecfecha").value;

}

function crearTopic(topic) {
Topic =new Array();
Topic=Topic.concat(topic);
getData();
}

function Tema(nombre, TypeGraf, ColorGraf, value, time, Values, UltimoValor) {
    CrearGaugeHTML(nombre);
    this.nombre = nombre;
    this.NomGraf = eval(nombre + "gauge");
    this.TypeGraf = TypeGraf;
    this.ColorGraf = ColorGraf;
    this.value = value;
    this.time = time;
    this.Values = Values;
    this.UltimoValor = UltimoValor;
}


function CrearGaugeHTML(NameGrafico) {

    var tip = NameGrafico.substring(0, 3);
    var center= document.createElement("center");
    var contain2 = document.createElement('div');
    contain2.className = 'row';
    var dis = document.createElement('div')
    dis.className = 'col-lg-3 col-md-2';
    var di = document.createElement('div')
    center.className = 'col-lg-8 col-md-9';
    var dcard = document.createElement('div')
    dcard.className = 'card text-center';
    dcard.id = "cont" + NameGrafico;
    dcard.style = 'display:block;'
    var dcardherader = document.createElement('div');
    dcardherader.className = 'card-header';
    var i = document.createElement('i');
    i.className = 'fa fa-area-chart';
    i.textContent = NameGrafico;
    var dcardbody = document.createElement('div');
    dcardbody.className = 'card-body';
    var canva = document.createElement('canvas');
    canva.id = NameGrafico + "gauge";
    canva.width = "90";
    canva.height = "30";
    var dicardfooter = document.createElement('div');
    dicardfooter.className = "card-footer small text-muted text-center";
    dicardfooter.textContent = "Alimentación de 5 minutos durante las últimas 24 horas";

    var dcards = document.createElement('div')
    dcards.className = 'card-dark';
    contain2.style.padding="1%";
    contain2.appendChild(dis);
    contain2.appendChild(center);
    center.appendChild(di);    
    di.appendChild(dcard);
    dis.appendChild(dcards);
    dcard.appendChild(dcardherader);
    dcard.appendChild(dcardbody);
    dcard.appendChild(dicardfooter);
    dcardherader.appendChild(i);
    dcardbody.appendChild(canva);
    document.body.appendChild(contain2);
}