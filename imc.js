const Saludo = 'Bienvenido a nuestra calculadora IMC';
const resultado = 'Su índice de masa corporal es: ';
const mensaje = 'Basándonos en ese resultado, su estado dentro del IMC es: ';
const mensajeerror = 'Datos inválidos :(';

alert(Saludo);

let running = true;
let menores = 0;
let mujeres = 0;
let hombres = 0;
let hombresobre = 0;
let mujeresobre = 0;
let sumaEdadesHombres = 0;
let sumaEdadesMujeres = 0;
let datos = [];

do {
    let opcion = prompt(
        'Elija su opción: \n1. Registrar paciente\n2. Total pacientes \n3. Promedios de edad \n4. Total menores de edad\n5. Total pacientes con sobrepeso\n6. Paciente con menor IMC\n7. Salir'
    );

    switch (opcion) {
        case "1":
            let paciente = {}; // nuevo objeto por paciente

            let nombre = prompt('Ingrese su nombre:');
            paciente.nombre = nombre;

            let edad = parseInt(prompt('Ingrese su edad:'));
            paciente.edad = edad;

            if (edad < 18 && edad > 0) {
                menores++;
            }

            let genero2 = prompt('Ingrese su género \n1. Hombre\n2. Mujer');
            paciente.genero = genero2;

            if (genero2 == '1') {
                hombres++;
                sumaEdadesHombres += edad;
            } else if (genero2 == '2') {
                mujeres++;
                sumaEdadesMujeres += edad;
            }

            let id = prompt('Ingrese su ID:');
            paciente.id = id;

            let peso = parseFloat(prompt('Ingrese su peso en kg:'));
            let estatura = parseFloat(prompt('Ingrese su estatura en metros:'));
            let imc = peso / (estatura ** 2);
            paciente.imc = imc;

            alert(`${resultado} ${imc.toFixed(2)}`);

            if (imc < 18.5) {
                alert(`${mensaje} "Peso inferior al normal"`);
            } else if (imc >= 18.5 && imc <= 24.9) {
                alert(`${mensaje} "Normal"`);
            } else if (imc >= 25 && imc <= 29.9) {
                alert(`${mensaje} "Peso superior al normal"`);
            } else if (imc >= 30) {
                alert(`${mensaje} "Obesidad"`);
            } else {
                alert(mensajeerror);
            }

            if (genero2 == '1' && imc >= 25) {
                hombresobre++;
            } else if (genero2 == '2' && imc >= 25) {
                mujeresobre++;
            }

            datos.push(paciente);
            break;

        case "2":
            if (hombres === 0 && mujeres === 0) {
                alert("Registre pacientes primero.");
                break;
            }
            let total = hombres + mujeres;
            alert(`El total de pacientes es: ${total}`);
            break;

        case "3":
            if (hombres === 0 && mujeres === 0) {
                alert("Registre pacientes primero.");
                break;
            }
            let promedioHombres = hombres > 0 ? sumaEdadesHombres / hombres : 0;
            let promedioMujeres = mujeres > 0 ? sumaEdadesMujeres / mujeres : 0;
            let promedioTotal = (sumaEdadesHombres + sumaEdadesMujeres) / (hombres + mujeres);

            alert(`Promedio de edad de hombres: ${promedioHombres.toFixed(2)}`);
            alert(`Promedio de edad de mujeres: ${promedioMujeres.toFixed(2)}`);
            alert(`Promedio total de edades: ${promedioTotal.toFixed(2)}`);
            break;

        case "4":
            if (hombres === 0 && mujeres === 0) {
                alert("Registre pacientes primero.");
                break;
            }
            alert(`El total de menores registrados es: ${menores}`);
            break;

        case "5":
            if (hombres === 0 && mujeres === 0) {
                alert("Registre pacientes primero.");
                break;
            }
            alert(`Hombres con sobrepeso u obesidad: ${hombresobre}`);
            alert(`Mujeres con sobrepeso u obesidad: ${mujeresobre}`);
            break;

        case "6":
            if (datos.length === 0) {
                alert("Registre pacientes primero.");
                break;
            }
            let menorIMC = Math.min(...datos.map(p => p.imc));
            let pacienteMenor = datos.find(p => p.imc === menorIMC);
            alert(`El menor IMC es: ${menorIMC.toFixed(2)} (Paciente: ${pacienteMenor.nombre})`);
            break;

        case "7":
            alert("Hasta luego...");
            running = false;
            break;

        default:
            alert("Opción no válida.");
            break;
    }
} while (running);