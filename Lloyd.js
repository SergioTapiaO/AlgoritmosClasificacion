class Lloyd{

    constructor(matriz, inicializacion){
        this.E = 10 ** (-10);
        this.K_MAX = 10;
        this.GAMMA = 0.1;
        this.matriz = matriz;
        // aqui guardamos los centros finales
        this.centros = inicializacion;
        //aqui guardamos los centros originales
        this.centros_ini = this.copiar();
    }

    calcular(){
        let iteraciones = 0;
        let fin = false;
        do{
            this.algoritmo();
            //comprobamos la variacion de los centros
            fin = this.comprobar_centros();
            iteraciones = iteraciones + 1;
        }while(iteraciones <= this.K_MAX && !fin);
    }

    algoritmo(){
        //para tantas muestras como filas tenga la matriz
        for(let i = 0; i < this.matriz.length; i++){
            let ind = this.menor_distancia(this.matriz[i]);
            //actualizamos el centro en funcion del menor
            this.actualizar_centro(ind, this.matriz[i]);
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

        return ind;
    }

    distancia_muestra(centro, muestra){
        let acum = 0;
        for(let j = 0; j < muestra.length - 1; j++){
            let resta = centro[j] - parseFloat(muestra[j]);
            resta = Math.pow(resta, 2);
            acum = acum + resta;
        }
        acum = Math.sqrt(acum);
        return acum;
    }

    actualizar_centro(ind, muestra){
        for(let i = 0; i < this.centros[ind].length; i++){
            this.centros[ind][i] = this.centros[ind][i] + this.GAMMA*(parseFloat(muestra[i]) - this.centros[ind][i]);
        }
    }

    comprobar_centros(){
        //con que una no cumpla se vuelve a iterar
        let final = true;
        for(let i = 0; i < this.centros.length; i++){
            if(!this.variacion_centros(this.centros[i], this.centros_ini[i]))
                final = false;
        }
        return final;
    }

    variacion_centros(centros, centros_ini){
        let resul = 0;
        for(let i = 0; i < centros.length;i++){
            resul = resul + Math.pow( centros[i] - centros_ini[i], 2);
        }

        if(Math.sqrt(resul) < this.E)
            return true;
        else return false;
    }

    clasificar_ejemplo(ejemplo){
        return this.menor_distancia(ejemplo);
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