class Bayes{

    constructor(matriz){
        this.d = matriz[0].length - 1;
        this.muestras = matriz;
    }

    // ---------- SE PUEDE OPTIMIZAR CON UN WHILE QUE CONTROLE TIPO O TAM y marReduce -------------
    iniciar(){
        //Medias
        var tipo = this.muestras[0][this.d];
        var medias = new Array();
        var m = 0;
        var tam = 1;
        medias[0] = new Array();
        //Relleni la media con la primera muestra
        for (let j = 0; j < this.d; j++) {
            medias[0][j] = parseFloat(this.muestras[0][j]);
        }

        for (let i = 1; i < this.muestras.length; i++) {
            if(this.muestras[i][this.d] == tipo){
                tam++;
                //Hacemos el sumatorio de esa muestra
                for (let j = 0; j < this.d; j++) {
                    medias[m][j]+=  parseFloat(this.muestras[i][j]);
                }
            }else{
                //Guardamos la media para esa clase m
                for (let j = 0; j < this.d; j++) {
                    medias[m][j] = medias[m][j] / tam;
                }
                tam = 1;//Nuevo tam para la nueva clase
                m++;//Pasamos a la siguiente clase
                medias[m] = new Array();
                for (let j = 0; j < this.d; j++) {
                    medias[m][j] = parseFloat(this.muestras[i][j]);
                }
                tipo = this.muestras[i][this.d];
            }
        }     
        //Guardamos la ultima media
        for (let j = 0; j < this.d; j++) {
            medias[m][j] = medias[m][j] / tam;
        }

        this.medias = medias;
    }

    clasificar_ejemplo(ejemplo){
        //X-M
        var restas = new Array();
        var i = 0;
        this.medias.forEach(media => {
            restas[i] = new Array();
            for (let j = 0; j < this.d; j++)
                restas[i][j] =  parseFloat(ejemplo[j]) - media[j];
            i++;
        });

        //(X-M)^t * I * (X-M)

        var sol = new Array();
        i=0;
        restas.forEach(resta => {
            sol[i]=0;
            for (let j = 0; j < this.d; j++)
                sol[i] += resta[j] * resta[j];
            i++;
        });
        var elem = sol[0]
        var indice = 0;
        for (let i = 1; i < sol.length; i++)
            if(elem > sol[i]){
                elem = sol[i];
                indice = i;
            }
        
        return indice;
    }
}