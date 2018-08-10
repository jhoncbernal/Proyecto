function Tema(nombre, TypeGraf, ColorGraf, datalabel, Grafica, value, time, Values, Labels, max, min, Tmax, Tmin) {
    CrearGraficoHTML(nombre);
    this.nombre = nombre;
    this.NomGraf = eval(nombre + "graph");
    this.TypeGraf = TypeGraf;
    this.TiniGraf = nombre.substring(0, 1) + "init";
    this.TctxGraf = nombre.substring(0, 1) + "ctx";
    this.ColorGraf = ColorGraf;
    this.datalabel = datalabel;
    this.Grafica = Grafica;
    this.High = eval(nombre.substring(0, 3) + "high");
    this.THigh = eval(nombre.substring(0, 3) + "thigh")
    this.Low = eval(nombre.substring(0, 3) + "low");
    this.TLow = eval(nombre.substring(0, 3) + "tlow");
    this.value = value;
    this.time = time;
    this.Values = [];
    this.Labels = [];
    this.max = max;
    this.min = min;
    this.Tmax = Tmax;
    this.Tmin = Tmin;
}

// function crearTopic() {
//  colors=  [ verde = ['rgba(0,204,204,0.4)', 'rgba(0, 167, 245,0.4)'],
//     amarillo = ['rgba(245,241,2,0.5)', 'rgba(245,241,1,1)'],
//     azul = ['rgba(0, 167, 245,0.3)', 'rgba(0, 167, 245,1)'],
//     verdoso = ['rgba(0,204,204,0.5)', 'rgba(255,255,255,1)'],
//     lila = ['rgba(229,204,255,0.5)', 'rgba(204,153,255,1)'],
// ];
//     labelON = ['On', 'Off'];
//     var Topic = [];
//     for (let index = 0; index < TopicsName.length; index++) {
//         TopicsName[index] = firebase.database().ref('Topics/' + "Casa" + '/'+index);
//         TopicsName[index].on('value', function(snapshot) {    
//             Topic.push( new Tema(snapshot.val().name, 'line', colors[index], []));
//         });
//    }
//     return Topic;
// }