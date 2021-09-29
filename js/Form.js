class Form {

  constructor() {
    this.input = createInput("NOMBRE: ");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');

    //this.buttonReset = createButton('Reset');
    
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("JUEGO DE CARRERAS: ( ͡❛ ᴗ ͡❛)");
    this.title.position(displayWidth/2 - 100, 0);

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);

    //this.buttonReset.position(displayWidth-100, 20);
    
    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("HOLA: " + player.name+"   (^◡^ )")
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });
    //if(player.distance>3560){
    /*
    this.buttonReset.mousePressed(()=>{
      game.update(0);
      player.updateCount(0);
      var playerInfoRef = database.ref('players');
      playerInfoRef.remove();

      Player.updateCarsAtEnd(0);
    })
    */
  //}
  }
}
