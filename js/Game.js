class Game {
  constructor(){
    this.GameOver = createElement('h2');
    //this.Lugar = createElement('h2');

    this.buttonReset = createButton('Reset');
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];

  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getcarsAtEnd();

    
    if(allPlayers !== undefined){
      background("#c68767");

      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("red");
          stroke(4)
          ellipse(x,y,90,90);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance>3560){
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
      gameOver = new GameOver();
      gameOver.display();

      this.buttonReset.position(displayWidth-100, 20);
      this.buttonReset.mousePressed(()=>{
        game.update(0);
        player.updateCount(0);
        var playerInfoRef = database.ref('players');
        playerInfoRef.remove();
  
        Player.updateCarsAtEnd(0);


      })
    }

    drawSprites();
  }
  end(){
    console.log("FIN del juego\n   (>‿◠)\n\n");
    //console.log("Lugar: "+player.rank+"\n👍( ͡❛ ͜ʖ ͡❛👍)\n")
    //text("FIN del juego\n   ✍(◔◡◔)",displayWidth/2,displayHeight/4);
    this.GameOver.html("FIN del juego   ✍(◔◡◔)");
    //this.Lugar.html("Lugar: "+player.rank+"    👍( ͡❛ ͜ʖ ͡❛👍)");
    this.GameOver.position(displayWidth/2 - 100, 0);
    //this.Lugar.position(displayWidth/2 -  100, 100);
    //game.update(2);
  }
}
