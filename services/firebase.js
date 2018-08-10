const database = firebase.database();
function CrearFirebaseDispositivo(name, valor, lugar) {
    database.ref('Topics/' + lugar + '/'+name +'/').set(valor=valor);
}

function ConsultaFirebasebyId(id) {
    return new Promise(function (resolve, reject) {
        let TName = database.ref('Topics/' + "Casa" + '/' + id);
        TName.on('value', function (snapshot) {
            resolve(snapshot.val().name);
        }, function (err) { reject(err) });
    });
}

function ConsultaFirebaseDispositivos() {
    let promises = [];
    for (let index = 0; index < TopicsName.length; index++) {
        promises.push(this.ConsultaFirebasebyId(index));
    }
    return Promise.all(promises);
}


function ConsultaDispositivosGauge() {
    ConsultaFirebaseElementsbyPlace('MyHome').then(function(result){
        Topic= new Array();
        for (let index = 0; index < result.length; index++) {
            Topic.push(new Tema(result[index], 'doughnut', random_rgba(), []));
        }
        crearTopic(Topic)
    }, function (err) { console.log(err); });

}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 250;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(50) + ')';
}

function CrearDispositivo(Place='MyHome') {
        let nombre = NombreDispositivo.value;
        if (nombre) {
            if (confirm("Se encuentra seguro de crear el dispositivo con nombre " + nombre)) {
                NombreDispositivo.value = "";
                CrearFirebaseDispositivo(nombre, 0, Place);
                alert("se agrego de forma Exitosa el dispositivo " + nombre );
            }
            else {
                NombreDispositivo.value = "";
            }
        }
        else {
            alert("Debe Ingresar un nombre  de dispositivo")
        }
}
function ConsultaFirebaseTotalElementsbyPlace(Place) {
    return ConsultaFirebaseElementsbyPlace(Place).then(function (result) {
        return result.numChildren();
    }, function (err) { console.log(err); });;
}
function ConsultaDispositivos(Place="MyHome",Elemento="option",ID="topic0"){
return ConsultaFirebaseElementsbyPlace(Place).then(function(result){
    CrearElemento(Elemento, ID, result)
});
}


function ConsultaFirebaseElementsbyPlace(Place) {
    return new Promise(function (resolve, reject) {
        let DB = database.ref("Topics" + '/' + Place);
        DB.on('value', function (snapshot) {
            var key= new Array();
            snapshot.forEach(function(childSnapshot) {
                childSnapshot.key;
                key.push(childSnapshot.key);
                 });
                 resolve(key);
        }, function (err) { reject(err) });
    });
}

function FirebaseDeletebyDeviceName(Place, DeviceName) {
    
    return new Promise(function (reject) {
        let DB = database.ref("Topics" + '/' + Place);
        DB.child(DeviceName).remove(function (err) { reject(err); });
    });
}
function EliminarDispositivo(Place='MyHome') {
    let nombre = NombreDispositivo.value;
    if (nombre) {
        if (confirm("Se encuentra seguro de Eliminar el dispositivo con nombre " + nombre)) {
            NombreDispositivo.value = "";
            FirebaseDeletebyDeviceName(Place, nombre)
            alert("se elimino de forma Exitosa el dispositivo " + nombre );
        }
        else {
            NombreDispositivo.value = "";
        }
    }
    else {
        alert("Debe Ingresar un nombre  de dispositivo")
    }
}

