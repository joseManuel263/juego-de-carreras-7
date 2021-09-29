class GameOver {
    constructor(){
        this.mensaje = createElement('h1');
    }
//{}
    display(){
        this.mensaje.html("Lugar: "+player.rank);
        this.mensaje.position(width/2.3,height-200);
    }
}