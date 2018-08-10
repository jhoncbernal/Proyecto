var iotdata = new AWS.IotData({
    endpoint: 'a2imeekghuew2f.iot.us-east-1.amazonaws.com',
    accessKeyId: 'AKIAIC33F3MSIFITLXGQ',
    secretAccessKey: '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',
    region: 'us-east-1',
    apiVersion: '2015-05-28'
});

function topic0() {

    try {
        Accion = document.getElementById("ACCION").value;            
        topic = document.getElementById("topic0").value;
        value = document.getElementById("value0").value;
        if(value){
        document.getElementById("sliderVal0").innerHTML = value;
        }
        traer(Accion);

    } catch (err) {
        alert("topic0() test" + err)
    }
}






function Get(NameObjet){
    var params = {
        thingName: NameObjet//'HomeIO' /* required */
    };
    
    iotdata.getThingShadow(params,function(err, data) {
        if (err) {
         console.log( err.stack); // an error occurred
        } else {
            alert(data.payload)

        }                   
    }); 
}

var fruts=[];

function Update(NameObjet,Valor){
    var params = {
        payload: Valor,
        thingName: NameObjet,
    };

    return iotdata.updateThingShadow(params, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            // alert("success!");
        }
    })
}

function traer(accion) {
    switch (accion) {
        case "obtener":
        Get('HomeIO'); 
               
            break;
        case "actualizar":
            var nuevo = '';
            nuevo = nuevo.concat('{"state": {"reported": {"', topic, '":', value, '}}}');
            Update('HomeIO',nuevo);
            break;
        default:
            //alert("Por favor seleccione una opcion en el cuadro superior : " + "\n" + "Actualizar: Envia los datos al dispositivo. \nObtener : Obtiene el ultimo valor publicado en los dispositivos");
    }
}
function CrearElemento(etiqueta, etiquetaPadre, Topicos) {
    let t0 = document.getElementById(etiquetaPadre);
    while (t0.hasChildNodes()) {   
        t0.removeChild(t0.firstChild);
    }
    if (t0) {        
        for (let index = 0; index < Topicos.length; index++) {
            let opt = document.createElement(etiqueta);
            opt.value = Topicos[index];
            var text = document.createTextNode(Topicos[index]);
            opt.appendChild(text);
            t0.appendChild(opt);
        }             
        
    }
}