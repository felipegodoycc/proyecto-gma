        var contenido = document.querySelector("#contenido");
        var fechaInicio = document.getElementById("fechaInicio");
        var fechaTermino = document.getElementById("fechaTermino");
        function traer(){
            fetch("https://us-central1-gma-api-rest.cloudfunctions.net/api/mediciones")
            .then(res => res.json())
            .then(datos => {
                tabla(datos)
                
            })

        }
        function tabla(datos){
            fechaInicio= new Date(fechaInicio.value);
            fechaTermino = new Date(fechaTermino.value);
            var datos1_id1 = [];
            var datos1_id2 = [];
            var datos1_id3 = [];
            var datos2_id1 = [];
            var datos2_id2 = [];
            var datos2_id3 = [];
            var lista1 = [];
            var lista2 = [];
            var lista3 = [];
            var contador1 =0;
            var contador2 =0;
            var contador3 =0;
            var fechaInicioAux = new Date(fechaInicio);
            var fechaTerminoAux = new Date(fechaTermino);
            console.log(fechaInicioAux.getTime());
            for (let valor of datos){    
                
                contenido.innerHTML += `
                <tr>
                            <th scope="row">${valor._id}</th>
                            <td>${valor.sensor}</td>
                            <td>${valor.valor}</td>
                            <td>${valor.date}</td>
                            <td>${valor.__v}</td>
                 </tr>
            
                `

                if (valor.sensor==1){
                    
                    datos2_id1.push(valor.valor);
                    var fecha1 = new Date(valor.date);
                    console.log(fecha1.getTime());
                    if ( fecha1.getTime()>= fechaInicioAux.getTime() && fecha1.getTime()<=fechaTerminoAux.getTime() ) {
                        datos1_id1.push(fecha1.getTime());
                        week_data_id1 = {"year": fecha1.getTime(),"value":valor.valor};
                        lista1.push(week_data_id1);
                        contador1++;

                    }
                    
                    
                    // console.log(contador);
                }
                if (valor.sensor==2){

                    datos2_id2.push(valor.valor);
                    var fecha2 = new Date(valor.date);

                    if ( fecha2.getTime()>= fechaInicioAux.getTime() && fecha2.getTime()<=fechaTerminoAux.getTime() ) {
                    datos1_id2.push(fecha2.getTime());
                    week_data_id2 = {"year": fecha2.getTime(),"value":valor.valor};
                    lista2.push(week_data_id2);
                    contador2++;
                    // console.log(contador);
                    }
                }
                if (valor.sensor==3){
                    datos2_id3.push(valor.valor);
                    var fecha3 = new Date(valor.date);

                    if ( fecha3.getTime()>= fechaInicioAux.getTime() && fecha3.getTime()<=fechaTerminoAux.getTime() ) {
                    datos1_id3.push(fecha3.getTime());
                    week_data_id3 = {"year": fecha3.getTime(),"value":valor.valor};
                    lista3.push(week_data_id3);
                    contador3++;
                    // console.log(contador);
                    }
                }
                
                // datos2.push(valor.valor);
                // var fecha = new Date(valor.date);
                // datos1.push(fecha.getTime());
                // week_data = {"year": fecha.getTime(),"value":valor.valor};
                // lista.push(week_data);
                
                
                
            }   
            // console.log(lista1);
            grafico(lista1,"myfirstchart1");
            // console.log(lista2);
            grafico(lista2,"myfirstchart2");
            // console.log(lista3);
            grafico(lista3,"myfirstchart3");
            
        }
        
        function grafico(lista,nombrechart){
            new Morris.Line({
            // ID of the element in which to draw the chart.
            element: nombrechart,
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
                    

            data: lista,
            // The name of the data record attribute that contains x-values.
            xkey: 'year',
            // A list of names of data record attributes that contain y-values.
            ykeys:['value'] ,
            // Labels for the ykeys -- will be displayed when you hover over the
            // chart.
            labels: ['Value']
            });
        }