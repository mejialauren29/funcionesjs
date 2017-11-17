    var ANUAL="anual";
    var SEMANAL = "semanal";
    var QUINCENAL = "quincenal";
    var MENSUAL = "mensual";
    var no=0;

     function calcular(){
      
        var MontoSolicitado=document.getElementById("input_monto").value;
        var cuotas=document.getElementById("input_cuotas").value;
        var peridoPago=document.getElementById("select_periodo").value;

        var tasa=45; //tasa de interes anual
        var comision=1.5; //comision mensual 
        var devaluacion=0.42;//devaluacion mensual
        /*
        Historial de valores mensuales
        Noviembre:45,1.5,0.42
        */


        if(!MontoSolicitado){
            alert ('Indique el monto a solicitar');
            return;
        }
        if(!cuotas){

            alert ('Indique el plazo en meses');
            return;
        }
       
       var tasa_tipo ="anual";

       cuotas=getcuotas(cuotas,peridoPago);
       comision=getcomision(comision,peridoPago);
       devaluacion=getdevaluacion(devaluacion,peridoPago);


       var items = getAmortizacion(MontoSolicitado, tasa, cuotas, peridoPago, tasa_tipo,comision,devaluacion);
       var tbody = document.getElementById("tbody_1");
       tbody.innerHTML = "";

       /*valida la cantidad de cuotas maximas*/
       if (parseInt(cuotas) > 50) {
             alert("Ha indicado una cantidad excesiva de cuotas, porfavor reduzcala a menos de 50");
             return; 

        };

        for (i = 0; i < items.length; i++) {
                item = items[i];
                tr = document.createElement("tr");
                for (e = 0; e < item.length; e++) {
                    value = item[e];
                    if (e > 0) { value = setMoneda(value); }
                    td = document.createElement("td");
                    textCell = document.createTextNode(value);
                    td.appendChild(textCell);
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
            var div1 = document.getElementById("div-valor-cuota");
            valor = setMoneda(items[0][6]);
            div1.innerHTML = valor;
            var msg = "";

           
    }


     function setMoneda(num) {
         
        num = num.toString().replace(/\$|\,/g, '');
         if (isNaN(num)) num = "0";
              sign = (num == (num = Math.abs(num)));
                num = Math.floor(num * 100 + 0.50000000001);
                cents = num % 100;
                num = Math.floor(num / 100).toString();
         if (cents < 10) cents = "0" + cents;
                for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
                    num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
                return (((sign) ? '' : '-') + 'C$' + num + ((cents == "00") ? '' : '.' + cents));
    }


     function getAmortizacion(MontoSolicitado, tasa, cuotas, peridoPago, tasa_tipo,comision,devaluacion) {
        
        var comisionTotal=(comision/100)*cuotas*MontoSolicitado;
        var comision=comisionTotal/cuotas;

        var devaluacionTotal=(devaluacion/100)*cuotas*MontoSolicitado;
        var devaluacion=devaluacionTotal/cuotas;

        var saldo_al_capital = MontoSolicitado;

        //Pruebas
        var val_cuota_principal=MontoSolicitado/cuotas;
     
        valor_de_cuota = getValorDeCuotaFija(MontoSolicitado, tasa, cuotas, peridoPago, tasa_tipo,comision,devaluacion);

        var items = new Array();

            for (i=0; i < cuotas; i++) {

                
                interes = saldo_al_capital * getTasa(tasa, tasa_tipo, peridoPago);
                
                abono_al_capital = valor_de_cuota - interes-comision-devaluacion;
                //abono_al_capital = val_cuota_principal;
                saldo_al_capital -= abono_al_capital;
                numero = i + 1;
                
                interes = interes.toFixed(2);
                abono_al_capital = abono_al_capital.toFixed(2);
                saldo_al_capital = saldo_al_capital.toFixed(2);

                //var valor_de_cuota = getValorDeCuotaFija(MontoSolicitado, tasa, cuotas, peridoPago, tasa_tipo,comision,devaluacion);
                //alert(valor_de_cuota);

                item = [numero,val_cuota_principal, interes,comision,devaluacion,abono_al_capital, valor_de_cuota, saldo_al_capital];
                items.push(item);

            }
           
            return items;
        }

        function getValorDeCuotaFija(MontoSolicitado, tasa, cuotas, peridoPago, tasa_tipo,comision,devaluacion) {
           
            tasa = getTasa(tasa, tasa_tipo, peridoPago);
            
             //valor = MontoSolicitado *( (tasa * Math.pow(1 + tasa, cuotas)) / (Math.pow(1 + tasa, cuotas) - 1) );
            valor=MontoSolicitado/cuotas;
           alert(valor);
            valor=valor+comision+devaluacion;
            
            return valor.toFixed(2);
        }

        
        function getTasa(tasa, tasa_tipo, peridoPago) {
            /*alert("LLEGO getTasa");*/
           //no++;
            //alert(no);
            if (tasa_tipo == ANUAL) {
                 tasa = tasa / 12
            }

            tasa = tasa / 100.0;


            if (peridoPago == SEMANAL) {
             tasa = tasa / 4.34524 
            };
            if (peridoPago == QUINCENAL) {
             tasa = tasa / 2 
            };
            if (peridoPago == MENSUAL) { };
            
            return tasa;
            
        }

        function getcuotas(cuotas,peridoPago){

                if(peridoPago==MENSUAL){
                     cuotas=cuotas;
                        
                  };
                if(peridoPago==QUINCENAL){
                    cuotas=cuotas*2;
                      
                    }
                if(peridoPago==SEMANAL){
                    cuotas=cuotas*4;                      
             } 
             return cuotas;
        }
         function getcomision(comision,peridoPago){

                if(peridoPago==MENSUAL){
                     comision=comision;
                        
                  };
                if(peridoPago==QUINCENAL){
                    comision=comision/2;
                      
                    }
                if(peridoPago==SEMANAL){
                    comision=comision/4;                      
             } 
             return comision;
        }
         function getdevaluacion(devaluacion,peridoPago){

                if(peridoPago==MENSUAL){
                     devaluacion=devaluacion;
                        
                  };
                if(peridoPago==QUINCENAL){
                    devaluacion=devaluacion/2;
                      
                    }
                if(peridoPago==SEMANAL){
                    devaluacion=devaluacion/4;                      
             } 
             return devaluacion;
        }
       