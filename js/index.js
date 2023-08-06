const calculator = document.getElementById("calculator"); //boton de ejecucion del programa.
const modal = document.getElementById("modal"); //ventana modal.
const errors = document.getElementById("errors")//lista de posibles errores.
const closeButton = document.getElementById("closeButton"); // boton de "cierre" de la ventana.
const optionsButton = document.getElementById("optionsButton"); // boton de "cierre" de la ventana.
const pOutput = document.getElementById("days");//parrafos del index.
const pModal = document.getElementById("pModal");//parrafos modal.
const info = document.getElementById("output");//seccion donde se muestra el resultado de la funcion.

closeButton.addEventListener("click",()=> close()); //cierra la ventana modal al cambiar su display.
calculator.addEventListener("click",()=> main()); //llama a la funcion principal.
optionsButton.addEventListener("click",()=> toggleText()); //hace visible la lista de errores.

function close(){
    modal.style.display = "none"
}

function toggleText(){
    /*cambia la clase del contenedor de la lista
    haciendolo visible o invisible segun corresponda.*/
    errors.classList.toggle("listErrorsShow"); 
}

let dateA = new Date(); //Fecha del equipo.

let dA = dateA.getDate(); //Dia actual.
let mA = dateA.getMonth() + 1; //Mes actual.
let yA = dateA.getFullYear(); //Año actual.


function main(){
    function capture(){ //captura y guarda el valor ingresado.
        let date = document.getElementById("date").value;
        return date
    }

    let separarCadena = capture().split(""); //separa la fecha en subcadenas dentro de una nueva.

    //unifica la fecha en un formato DD/MM/AAAA al tiempo que las convierte en un valor numerico
    let dB= Number(separarCadena[8] + separarCadena[9]); //dia de nacimiento.
    let mB= Number(separarCadena[5] + separarCadena[6]); //mes de nacimiento.
    let yB= Number(separarCadena[0] + separarCadena[1] + separarCadena[2]+ separarCadena[3]); //año de nacimiento.      
    


    function validDate(dB,dA,mB,mA,yB,yA){ //evalua la fecha ingresada y envia un mensaje segun sea o no valida.

        if((yB == yA & mB > mA) || (yB == yA & mB >= mA & dB > dA) || yB>yA){ 
            //si la fecha ingresada es mayor a la actual se notifica al usuario y se detiene el programa.
            let mensaje="No se permiten fechas superiores a la actual.";
            pModal.innerHTML= mensaje;
            modal.style.display="flex";
        } else if(isNaN(dB,mB,yB)){
            //si el input retorna un dato invalido (NaN) se notifica al usuario y se detiene el programa.
            let mensaje="Formato de fecha invalido. <br> Intentelo de nuevo.";
            pModal.innerHTML= mensaje;
            modal.style.display="flex";
        } else{ //de lo contrario el programa se ejecutara
            lived(dB,dA,mB,mA,yB,yA);
        }
    }

    function lived(dB,dA,mB,mA,yB,yA){

        function isLeap(year) { //Retorna "true" en caso de que el año ingresado cumpla las condiciones que lo hacen bisiesto.

            if ( (year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
                return true;
            }
        }
        
        function monthDay(year){ //Segun el resultado de la funcion "isLeap" febrero tendra 28 o 29 dias.
            if (isLeap(year)) {
                feb = 29;                
            } else {
                feb = 28;
            }
        
            return feb;
        }
        
        function diaJuliano(day,month,year){

            /*Se declara una variable "dj" con valor cero.
            En todas las funciones que calculan los dias transcurridos en un año determinado.
            creamos una variable por cada mes con valor equivalente a los dias del mismo.
            Y la variable febrero obtendra un valor dependiendo de del resultado de la funcion "monthDay".*/

            let dj=0;
            let jan = 31;  let mar = 31; let  apr = 30; let  may = 31; let  jun = 30; 
            let jul = 31; let  aug = 31; let sep = 30; let oct = 31; let nov = 30; 
            let feb = monthDay(year);
        
            switch (month) {
                /*segun el numero de mes ingresado, a la variable "dj" se le sumaran los valores de
                las varaibles meses entre enero y el mes anterior al ingresado.
                Sumando los dias ingresados en lugar del valor total del mes
                para obtener la cantidad real de dias transcuridos en el año actual.*/

                case 1: //En caso de ingresas "enero", al ser el primer mes solo se sumaran los dias que el usuario ingreso.
                    dj += day
                    break;
                case 2:
                    dj += jan + day
                    break;
                case 3:
                    dj += jan + feb + day
                    break;
                case 4:
                    dj += jan + feb + mar + day
                    break;
                case 5:
                    dj += jan + feb + mar + apr + day
                    break;
                case 6:
                    dj += jan + feb + mar + apr + may + day
                    break;
                case 7:
                    dj += jan + feb + mar + apr + may + jun + day
                    break;
                case 8:
                    dj += jan + feb + mar + apr + may + jun + jul + day
                    break;
                case 9:
                    dj += jan + feb + mar + apr + may + jun + jul + aug + day
                    break;
                case 10:
                    dj += jan + feb + mar + apr + may + jun + jul + aug + sep + day
                    break;
                case 11:
                    dj += jan + feb + mar + apr + may + jun + jul + aug + sep + oct + day
                    break;
                case 12:
                    dj += jan + feb + mar + apr + may + jun + jul + aug + sep + oct + nov + day
                    break;                                                                
            }
            return dj;
        }
        
        function daysYB(day, month, year){
            /*En todas las funciones que calculan los dias transcurridos en un año determinado.
            creamos una variable por cada mes con valor equivalente a los dias del mismo.
            Y la variable febrero obtendra un valor dependiendo de del resultado de la funcion "monthDay".*/
        
            let jan = 31;  let mar = 31; let  apr = 30; let  may = 31; let  jun = 30; 
            let jul = 31; let  aug = 31; let sep = 30; let oct = 31; let nov = 30;
            let dic = 31;
            let feb = monthDay(year);
        
            let dayLived = jan + feb + mar + apr + may + jun + jul + aug + sep + oct + nov + dic;

            /*Se declara una variable que corresponde a la suma de todas los meses antes declarados
            y dependiendo el mes ingresado como nacimiento se le restara a la misma
            los valores de cada mes entre enero y el mes anterior al ingresado.
            Restando los dias ingresados en lugar del valor total del mes
            para obtener la cantidad real de dias vividos por el usuario en el año de su nacimiento.*/
        
            switch (month) {
                case 1:
                    case 1: //En caso de ingresas "enero", al ser el primer mes solo se restan los dias que el usuario ingreso.
                    dayLived = dayLived - day
                    break;
                case 2:
                    dayLived = dayLived - jan - day
                    break;
                case 3:
                    dayLived = dayLived - jan - feb - day
                    break;
                case 4:
                    dayLived = dayLived - jan - feb - mar - day
                    break;
                case 5:
                    dayLived = dayLived - jan - feb - mar - apr - day
                    break;
                case 6:
                    dayLived = dayLived - jan - feb - mar - apr - may - day
                    break;
                case 7:
                    dayLived = dayLived - jan - feb - mar - apr - may - jun - day
                    break;
                case 8:
                    dayLived = dayLived - jan - feb - mar - apr - may - jun - jul - day
                    break;
                case 9:
                    dayLived = dayLived - jan - feb - mar - apr - may - jun - jul - aug - day
                    break;
                case 10:
                    dayLived = dayLived - jan - feb - mar - apr - may - jun - jul - aug - sep - day
                    break;
                case 11:
                    dayLived = dayLived - jan - feb - mar - apr - may - jun - jul - aug - sep - oct - day
                    break;
                case 12:
                    dayLived = dayLived - jan - feb - mar - apr - may - jun - jul - aug - sep - oct - nov - day
                    break;                                                                               
            }
            return dayLived;
        }
        
        function edad(dB,dA,mB,mA,yB,yA){

            /*La edad del usuario se calcula restando el año ingresado con el actual.
            Sin embargo, si el mes actual coincide con el de nacimiento pero el dia es inferior se resta un año al resultado de dicho calculo.
            lo mismo pasa si el mes actual es inferior al de nacimiento.*/
            let edad = 0;
        
            if ((mB == mA && dB > dA) || (mB > mA)){
                edad = yA - yB - 1;
            }else {
                edad = yA - yB;
            }
            return edad;
        }

        function leapYears(yB,yA) {
            /*Se calculan cuandtos años bisiestos vivio el usuario ingresando los años entre su nacimieto y la actualidad
            en un array y pasando cada elemento dentre de este por la funcion "isLeap" para despues poner los bisiestos en otro array.
            Se retorna la cantidad de elementos del array para mostar los años visiestos vividos.
            */

            let years = [];
        
            for (let year = yB; year <= yA; year++){
                years.push(year);
            }
            let lY= years.filter(isLeap);
            return lY.length;
        }

        function thisYear(dB,dA,mB,mA,year){
            function daysYB(mB,mA,year){
                /*En todas las funciones que calculan los dias transcurridos en un año determinado.
                creamos una variable por cada mes con valor equivalente a los dias del mismo.
                Y la variable febrero obtendra un valor dependiendo de del resultado de la funcion "monthDay".
                */
        
                let jan = 31;  let mar = 31; let  apr = 30; let  may = 31; let  jun = 30; 
                let jul = 31; let  aug = 31; let sep = 30; let oct = 31; let nov = 30;
                let dic = 31;
                let feb = monthDay(year);
                
                /*Se crean dos arreglos: dentro del primero se engloban las variables meses y una extra al principio
                Para que cada mes ocpupe la pocicion numerica que ocuparia en un calendario.
                El segundo arreglo quedara vacio.*/

                let months = ["x",jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dic];
                let days = [];

                let d = 0

                /*Recorremos los elementos del primer arreglo
                desde el mes de nacimiento hasta el actual.
                Agregando los elementos entre estos dos al segundo arreglo.*/

                for (let m = mB; m < mA; m++) {
                    days.push(months[m]);
                }

                /*Recorremos el segundo arreglo, sumando los valores de los elementos a una misma variable.
                Luego a esta misma varaible le restamos el dia de nacimiento y el actual.
                Obteniendo la cantidad real de dias transcurridos entre dos fechas del mismo año.*/ 

                for(n of days){
                    d += n
                }
                d= d - dB + dA
                return d
            }
            let tY = daysYB(mB,mA,year);
            return tY

            //de esta manera obtenemos la cantidad de dias que vivio una persona nacida en el mismo año que se utiliza el programa.
        }

        //El programa debe calcular de manera diferente segun la distancia de la fecha de nacimiento.

        if (yA - yB == 1){
            //Si la fecha ingresada pertenece al año anterior el programa solo sumara los dias vividos en ambos años.

            let livedDay = daysYB(dB,mB,yB) + diaJuliano(dA,mA,yA) + leapYears(yB,yA)
            let mensaje = "Usted tiene " + edad(dB,dA,mB,mA,yB,yA) + " años. <br> vivio " + daysYB(dB,mB,yB) + " dias de su año de nacimiento y " + diaJuliano(dA,mA,yA) + " del año actual. <br> Habiendo atravezado " + leapYears(yB,yA) + " años bisiestos.<br> Usted vivio " + livedDay + " dias."
            pOutput.innerHTML = mensaje;
            info.style.display ="block"
        } else if(yA == yB){ 
            //Si la fecha ingresada pertenece al año actual se utilia un a funcion particular

            let livedDay = thisYear(dB,dA,mB,mA,yB);
            let mensaje = "Usted solo ha vivido " + livedDay + " dias.";
            pOutput.innerHTML = mensaje;
            info.style.display ="block"
        } else{
            /*Los dias de vida se calculan multiplicando los dias de un año estandar por la edad del usuario.
            Se restan los dias trascurridos entre su fecha de nacimiento y el final de su año de nacimiento y los dias transcurridos en el año actual.
            Al resultado se le suma un dia por cada año bisiesto vivido.*/

            let livedDay =(edad(dB,dA,mB,mA,yB,yA) * 365) - daysYB(dB,mB,yB) - diaJuliano(dA,mA,yA) + leapYears(yB,yA)
            let mensaje = "Usted tiene " + edad(dB,dA,mB,mA,yB,yA) + " años. <br> vivio " + daysYB(dB,mB,yB) + " dias de su año de nacimiento y " + diaJuliano(dA,mA,yA) + " del año actual. <br> Habiendo atravezado " + leapYears(yB,yA) + " años bisiestos.<br> Usted vivio " + livedDay + " dias."
            pOutput.innerHTML = mensaje;
            info.style.display = "block"
        }
    }

    return validDate(dB,dA,mB,mA,yB,yA); //se muestra el mensaje que la funcion "validDate" retorna.
}

