class Kmedias{

    constructor(matriz, inicializacion){
        this.E = 0.01;
        this.b = 2;
        this.muestras = matriz;
        this.grados_pertenencia = new Array(2);
        // aqui guardamos los centros finales
        this.centros = inicializacion;
        //aqui guardamos los centros originales
        this.centros_ini = this.copiar();
    }

    iniciar(){
        //para cada muestra
        for(let i = 0; i < this.muestras.length; i++){
            this.algoritmo(this.muestras[i]);
        }
    }

    algoritmo(muestra){
        // para cada clase
        for(let i = 0;i < this.centros.length; i++){
            this.calcular_g_pretenencia(muestra, this.centros[i]);
        }
    }

    calcular_g_pretenencia(muestra, centro){
        let numerador = Math.pow( (1/this.distancia(muestra, centro)), (1/(this.b - 1)) );
        let denominador = 0;
        for(let i = 0; i < this.centros.length; i++){
            denominador = denominador + Math.pow( (1/this.distancia(muestra, this.centros[i])), (1/(this.b - 1)) );
        }

        return (numerador/denominador);
    }

    distancia(muestra, centro){
        let x = 0;
        for(let i = 0; i < centro.length; i++){
            x = x + Math.pow((muestra[i] - centro[i]), 2);
        }
        return x;
    }

    copiar(){
        let ini = new Array();
        for(let i = 0; i < this.centros.length; i++){
            ini[i] = new Array();
            for(let j = 0; j < this.centros[i].length; j++){
                ini[i].push(this.centros[i][j]);
            }
        }
        return ini;
    }

}