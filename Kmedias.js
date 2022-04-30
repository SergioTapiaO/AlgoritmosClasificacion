class Kmedias{

    constructor(matriz, inicializacion){
        this.E = 0.01;
        this.b = 2;
        this.muestras = matriz;
        // la matriz de los grados de pertenencia
        this.grados_pertenencia = new Array(2);
        // aqui guardamos los centros finales
        this.centros = inicializacion;
        //aqui guardamos los centros originales
        this.centros_ini;
    }

    iniciar(){

        do{
            this.grados_pertenencia[0] = new Array();
            this.grados_pertenencia[1] = new Array();

            //para cada muestra
            for(let i = 0; i < this.muestras.length; i++){
                this.algoritmo(this.muestras[i]);
            }
        }while(!this.comprobar_final());
    }

    algoritmo(muestra){
        // para cada clase
        for(let i = 0;i < this.centros.length; i++){
            this.grados_pertenencia[i].push(this.calcular_g_pretenencia(muestra, this.centros[i]));
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

    comprobar_final(){
        this.centros_ini = this.copiar(this.centros);
        this.centros = this.nuevos_centros();
        if(this.variacion_centros(this.centros, this.centros_ini) < this.E)
            return true;
        else return false;
    }

    nuevos_centros(){
        let numerador = new Array();
        let denominador = 0;

        for(let i = 0; i < this.centros.length; i++){
            numerador[i] = new Array(0, 0, 0, 0);
            //calcular el numerador y el denominador
            for(let j = 0; j< this.grados_pertenencia[i].length; j++){
                numerador[i] = (this.calcular(numerador[i], this.muestras[j], this.grados_pertenencia[i][j]));
                denominador = denominador + this.grados_pertenencia[i][j];
            }

            //hacemos la division
            for(let j = 0; j < numerador[i].length; j++)
                numerador[i][j] = numerador[i][j]/denominador; 
            
        }

        return numerador;
    }

    calcular(numerador, muestra, grado_p){
        for(let i = 0; i < numerador.length; i++){
            numerador[i] = numerador[i] + (grado_p * muestra[i]); 
        }
        return numerador;
    }

    variacion_centros(nuevo, inicial){
        let var_c = 0;
        for(let i = 0; i < nuevo.length; i++){
            var_c = var_c + this.distancia(nuevo[i], inicial[i]);
        }
        return Math.sqrt(var_c);
    }

    clasificar_ejemplo(ejemplo){
        return this.menor_distancia(ejemplo);
    }

    menor_distancia(muestra){
        let menor = 100;
        let ind = -1;
        //para cada centro
        for(let i = 0; i < this.centros.length; i++){
            let dist = Math.sqrt(this.distancia(muestra, this.centros[i]));
            if(dist < menor){
                menor = dist;
                ind = i;
            }
        } //for externo

        return ind;
    }

    copiar(c){
        let ini = new Array();
        for(let i = 0; i < c.length; i++){
            ini[i] = new Array();
            for(let j = 0; j < c[i].length; j++){
                ini[i].push(c[i][j]);
            }
        }
        return ini;
    }

}