function topic0(tongle="no") {

    try {

        Accion = document.getElementById("ACCION").value;            
        topic = document.getElementById("topic0").value;
        value = document.getElementById("value").value;
        if(value){
        document.getElementById("sliderVal0").innerHTML = value;
        }
        if(tongle=="si"){
         value =   (+(document.getElementById("state").checked))+'';
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