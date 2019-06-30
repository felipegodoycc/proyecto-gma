        var contenido = document.querySelector("#contenido");
        var activo=0;
        function recibirFecha(){
            if (activo==1) {
                $("#myfirstchart1").empty();
                $("#myfirstchart2").empty();
                $("#myfirstchart3").empty();
                $("#contenido").empty();
            }
            var fechaInicio = document.getElementById("fechaInicio");
            var url = 'https://us-central1-gma-api-rest.cloudfunctions.net/api/mediciones';
            var fechaAnalisis = new Date(fechaInicio.value);
            var fechaDia= fechaAnalisis.getDate()+1;
            var fechaMes = fechaAnalisis.getMonth()+1;
            var fechaAno = fechaAnalisis.getFullYear();

            console.log( `dia : ${fechaDia} mes : ${fechaMes} ano : ${fechaAno}`);
            if (fechaDia==32){
                var fechaDia = 1;
            }
            console.log( `dia : ${fechaDia} mes : ${fechaMes} ano : ${fechaAno}`);
            var data = {
                dia: fechaDia,
                mes: fechaMes,
                anyo: fechaAno
                };
            console.log(data);  
            fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                    'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .catch(error => console.log('Error:', error))
            .then(response => { 
                
                dat = response.datosDB;
                console.log(dat);
                 tabla(dat);
            
            
            } );
         }
            
        function tabla(datos){
            // fechaInicio= new Date(fechaInicio.value);
            var datos1_id1 = [];
            var datos1_id2 = [];
            var datos1_id3 = [];
            var datos2_id1 = [];
            var datos2_id2 = [];
            var datos2_id3 = [];
            var lista1 = [];
            var lista2 = [];
            var lista3 = [];
            var contador = 0;
            console.log("cargando");
            for (let valor of datos){   
                if (contador==0){
                    var dB = (valor.valor+83.2073) / 11.003;
                    var fecha = new Date(valor.date); 
                    console.log(".");
                    // fecha =  fecha.toISOString();

                    // console.log(fecha.getHours);
                    if(fecha.getHours()>=8 && fecha.getHours()<18 && dB>15){
                    // if(contador==0){  
                        contenido.innerHTML += `
                        <tr>
                                    <th scope="row">${valor._id}</th>
                                    <td>${valor.sensor}</td>
                                    <td>${dB}</td>
                                    <td>${fecha}</td>
                                    <td>${valor.__v}</td>
                        </tr>
                    
                        `
                        if (valor.sensor==1){
                            datos2_id1.push(dB);
                            datos1_id1.push(fecha.getTime());
                            week_data_id1 = {"year": fecha.getTime(),"value":dB};
                            lista1.push(week_data_id1);
    
                        }    
    
                        if (valor.sensor==2){
                            datos2_id2.push(dB);
                            datos1_id2.push(fecha.getTime());
                            week_data_id2 = {"year": fecha.getTime(),"value":dB};
                            lista2.push(week_data_id2);
    
                        }
    
                    
                        if (valor.sensor==3){
                            datos2_id3.push(dB);
                            datos1_id3.push(fecha.getTime());
                            week_data_id3 = {"year": fecha.getTime(),"value":dB};
                            lista3.push(week_data_id3);
    
                        }
                    }
       
                    // contador++;


                }
                
                
                
            }   

            
            console.log(lista1);
            grafico(lista1,"myfirstchart1");
            console.log(lista2);
            grafico(lista2,"myfirstchart2");
            console.log(lista3);
            grafico(lista3,"myfirstchart3");
            
        }
        
        function grafico(lista,nombrechart){
            activo=1;
            new Morris.Line({
            element: nombrechart,
            data: lista,
            xkey: 'year',
            ykeys:['value'] ,
            labels: ['Value']
            });
         } 
     