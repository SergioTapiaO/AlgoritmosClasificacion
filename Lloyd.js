class Lloyd{

    constructor(matriz, inicializacion){
        this.E = 10 ** (-10);
        this.K_MAX = 10;
        this.GAGMA = 0.1;
        this.matriz = matriz;
        //aqui guardamos los centros originales
        this.centros_ini = inicializacion;
        // aqui guardamos los centros finales
        this.centros = inicializacion;
    }

    algoritmo(){
        //para tantas muestras como filas tenga la matriz
        for(let i = 0; i < this.matriz.length; i++){
            let ind = this.menor_distancia(this.matriz[i]);
        }
    }

    menor_distancia(muestra){
        let menor = 100;
        let ind = -1;
        //para cada centro
        for(let i = 0; i < this.centros.length; i++){
            let dist = this.distancia_muestra(this.centros[i], muestra);
            if(dist < menor){
                menor = dist;
                ind = i;
            }
        } //for externo

    }

    distancia_muestra(centro, muestra){
        let acum = 0;
        for(let j = 0; j < muestra.length - 1; j++){
            let resta = centro[j] - muestra[j];
            resta = Math.pow(resta, 2);
            acum = acum + resta;
        }
    }

}