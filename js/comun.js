function Consulta(Topic, timeRead) {
    try {
        var m_respuesta = new Object();
        if (typeof(Topic) != 'undefined') {
            m_respuesta.value = parseFloat(Topic['N']);
            m_respuesta.time = (new Date((((timeRead) - 18000) * 1000))).toISOString();
        }
        return m_respuesta;
    } catch (err) {
        alert("Error en Consulta():" + err.message);
    }
}

function getMaxMinOfArray(array, Rtime) {
    var m_respuesta = new Object();
    m_respuesta.max = Math.max.apply(null, array);
    m_respuesta.min = Math.min.apply(null, array);
    m_respuesta.Tmax = Rtime[array.indexOf(m_respuesta.max)];
    m_respuesta.Tmin = Rtime[array.indexOf(m_respuesta.min)];
    return m_respuesta;
}

function fechaMaxima(data) {
    rango = fecha();
    var maxdate = data.length - 1;
    if (typeof(data[maxdate]['data']['M']['state']) != 'undefined') {
        tiemp = parseFloat(data[maxdate]['data']['M']['timestamp']['N']);
    }
    return tiemp - rango;
}

function AgregarDato(Topic, grafica) {

    if ((typeof(Topic.value)) != 'undefined') {
        Topic.Values.push(Topic.value);
        Topic.Labels.push("Fecha: " + (Topic.time.substring(0, 19)).replace('T', " Hora: "));

        if (Topic.TypeGraf == 'line' || Topic.TypeGraf == 'bar') {
            grafica.data.labels = Topic.Labels;
            grafica.data.datasets[0].data = Topic.Values;
        } else { grafica.data.datasets[0].data = [luzencendida, luzapagada]; }
        grafica.update();
    }

}



function params(titulo, fondo, colorborde) {
    var name = {
        label: titulo,
        lineTension: 0.3,
        pointRadius: 5,
        pointBorderColor: "rgba(255,255,255,1)",
        pointHoverRadius: 5,
        pointHitRadius: 20,
        pointBorderWidth: 2,
        backgroundColor: fondo,
        borderColor: [fondo, "rgba(0,0,0,0.3)"],
        data: []
    };
    return name;
}

function Graf(Grafi, tipo, init, ctx, nombre, color, label) {
    /* contexto para aplicar el gráfico al lienzo HTML. */
    var ctx = $(Grafi).get(0).getContext("2d");
    var init = params(nombre, color);
    var options = {
        responsive: true,
        showLines: true,
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };;
    Graficar = new Chart(ctx, { type: tipo, data: { datasets: [init], labels: label }, options: options });

    return Graficar;
}

function ValuesMaxMin(Topic) {
    // actualizar los valores  alto/bajo para watermarks
    if(Topic.max){
    $(Topic.High).text((Topic.nombre + ' mas alta: ') + Number(Topic.max).toFixed().toString());
    $(Topic.THigh).text((Topic.Tmax));
    $(Topic.Low).text((Topic.nombre + ' mas baja: ') + Number(Topic.min).toFixed().toString());
    $(Topic.TLow).text((Topic.Tmin));
    }
    else{
        delete Topic;
    }
}

function CrearGraficoHTML(NameGrafico) {

    var tip = NameGrafico.substring(0, 3);
    var contain = document.createElement('div')
    contain.className = 'container '+NameGrafico;
    var di = document.createElement('div')
    di.className = 'col-lg-2 col-md-3';
    var dicard = document.createElement('div')
    var dcol = document.createElement('div');
    dcol.className = "col-lg-10 col-md-9";
    var dcard = document.createElement('div');
    dcard.className = 'card mb-3';
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
    canva.id = NameGrafico + "graph";
    canva.width = "100";
    canva.height = "45";
    var dcardfooter = document.createElement('div');
    dcardfooter.className = "card-footer small text-muted text-center";
    var divpanelbody = document.createElement('div');
    divpanelbody.className = "panel-body";
    var drow = document.createElement('div');
    drow.className = "row";
    var div6 = document.createElement('div');
    div6.className = "col-sm-12";
    var div7 = document.createElement('div');
    div7.className = "h4 mb-0 text-success";
    div7.id = tip + "high";
    var div8 = document.createElement('div');
    div8.className = "h6 text-success";
    div8.id = tip + "thigh";
    var hr = document.createElement('hr');
    var drow2 = document.createElement('div');
    drow2.className = "row";
    var dcardherader0 = document.createElement('div');
    dcardherader0.className = "col-sm-12";
    var dcardherader1 = document.createElement('div');
    dcardherader1.className = "h4 mb-0 text-primary";
    dcardherader1.id = tip + "low";
    var dcardherader2 = document.createElement('div');
    dcardherader2.className = "h6 text-primary";
    dcardherader2.id = tip + "tlow";
    var dcardherader3 = document.createElement('div');
    dcardherader3.className = "h6 card-footer  text-muted";
    dcardherader3.textContent = "Alimentación de 5 minutos durante las últimas 24 horas";
    contain.appendChild(di);
    contain.appendChild(dcol);
    di.appendChild(dicard);
    dcol.appendChild(dcard);
    dcard.appendChild(dcardherader);
    dcard.appendChild(dcardbody);
    dcard.appendChild(dcardfooter);
    dcardherader.appendChild(i);
    dcardbody.appendChild(canva);
    dcardfooter.appendChild(divpanelbody);
    divpanelbody.appendChild(drow);
    drow.appendChild(div6);
    div6.appendChild(div7);
    div6.appendChild(div8);
    divpanelbody.appendChild(hr);
    divpanelbody.appendChild(drow2);
    drow2.appendChild(dcardherader0);
    dcardherader0.appendChild(dcardherader1);
    dcardherader0.appendChild(dcardherader2);
    dcardfooter.appendChild(dcardherader3);


    contenedor.appendChild(contain);


    // humiditygraph.update();
}



function GraficarGauge(Topic) {
    Num = Topic.UltimoValor;
    var data = {
        labels: [
            Topic.nombre,
            "NotValue"
        ],
        datasets: [{
            data: [Num, 100 - Num],
            backgroundColor: [Topic.ColorGraf, 'rgba(236, 236, 236, 0.6)'],
            hoverBackgroundColor: [Topic.ColorGraf, 'rgba(236, 236, 236, 0.6)']
        }]
    };
    Topic.NameGrafico = new Chart(document.getElementById(Topic.nombre + "gauge"), {
        type: Topic.TypeGraf,
        data: data,
        options: {
            circumference: Math.PI,
            rotation: (-0.5 * Math.PI) - (90 / 180 * Math.PI),
            responsive: true,
            legend: {
                display: false
            }
        }
    });


    Chart.pluginService.register({
        beforeDraw: function(chart) {
            width = document.getElementById(Topic.nombre + "gauge").width;
            height = document.getElementById(Topic.nombre + "gauge").height;
            ctx = $(Topic.NameGrafico).get(0).chart.ctx;
            ctx.restore();
            var fontSize = (height / 85).toFixed(2);
            ctx.font = fontSize + "em Arial";
            ctx.textBaseline = "top";
            var text = Topic.UltimoValor + "",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 1
                .3;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    });
}