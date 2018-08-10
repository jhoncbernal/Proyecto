var PubliDB;


$(function() {
    crearTopic();
    $.ajaxSetup({ cache: false });
    setInterval(crearTopic, 500000);
});

/* las opciones para nuestro grafico */


var dynamodb = new AWS.DynamoDB(); /*Realiza un análisis de la tabla DynamoDB para establecer un objeto de datos para el gráfico. */
var timestampRead = 0.0;

function Refresh() {
    fecha();
    crearTopic();
}

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

    limit = (fechaMaxima(data));
    for (var T in Topic) {
        for (var i in data) { // lee los valores del paquete dynamodb JSON
            var timestampRead = parseFloat(data[i]['data']['M']['timestamp']['N']);
            if (timestampRead > limit) {
                var n = (data[i]['data']['M']['state']['M']['reported']['M']);
                Topic[T] = Object.assign({}, Topic[T], (Consulta(n[Topic[T].nombre], timestampRead)));
                CTabla(Topic[T]);

                delete Topic[T].value, delete Topic[T].time;

            }
        }

    }


}

function Tema(nombre, value, time, Values, Labels) {
    this.nombre = nombre;
    this.value = value;
    this.time = time;
    this.Values = [];
    this.Labels = [];
}
var Topic=new Array();
function crearTopic(Place="MyHome"){
    ConsultaFirebaseElementsbyPlace(Place).then(function(result){
        
        result.forEach(element => {
            Topic.push(new Tema(element));
        });
        getData();
    });
}
// function crearTopic() {
  
//       let Topic = [];
//       for (let index = 0; index < TopicsName.length; index++) {
//           TopicsName[index] = firebase.database().ref('Topics/' + "Casa" + '/'+index);
//           TopicsName[index].on('value', function(snapshot) {    
//               Topic.push( new Tema(snapshot.val().name));
//           });
//      }  
//       return Topic;
//   }

function fecha() {

    return rango = 21600;

}
var k = 0;

function CTabla(Topic) {
    if ((typeof(Topic.value)) != 'undefined') {
        k = +1;
        var table = document.getElementById("myTable");
        var row = table.insertRow(table.rows.length);
        let cell1 = row.insertCell(0);
        let cell3 = row.insertCell(1);
        let cell4 = row.insertCell(2);
        let cell5 = row.insertCell(3);
        cell1.innerHTML = Topic.nombre;
        cell3.innerHTML = Topic.value;
        let Fecha=  (Topic.time.substring(0, 19));
        cell4.innerHTML = Fecha.substring(0,10);
        cell5.innerHTML = Fecha.substring(11);
    }
}