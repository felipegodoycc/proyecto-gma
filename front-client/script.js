        var contenido = document.querySelector("#contenido")
        function traer(){
            fetch("https://us-central1-gma-api-rest.cloudfunctions.net/api/mediciones")
            .then(res => res.json())
            .then(datos => {
                tabla(datos)
                
            })

        }
        function tabla(datos){
            var datos1 = [];
            var datos2 = [];
            var lista = [];
            var contador =0;
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
                if (contador <= 60){
                    datos2.push(valor.valor);
                    var fecha = new Date(valor.date);
                    datos1.push(fecha.getTime());
                    week_data = {"year": fecha.getTime(),"value":valor.valor};
                    lista.push(week_data);
                    contador++;
                    // console.log(contador);
                }
                // datos2.push(valor.valor);
                // var fecha = new Date(valor.date);
                // datos1.push(fecha.getTime());
                // week_data = {"year": fecha.getTime(),"value":valor.valor};
                // lista.push(week_data);
                
                
                
            }   
            console.log(lista);
            grafico(lista);
            
        }
        
        function grafico(lista){
            new Morris.Line({
            // ID of the element in which to draw the chart.
            element: 'myfirstchart',
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