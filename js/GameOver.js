class GameOver {
    constructor(){
        this.mensaje = createElement('h1');
    }
//{}
    display(){
        this.mensaje.html("Lugar: "+player.rank);
        this.mensaje.position(displayWidth/2.3,diaplayHeight/3-200);
    }
}
