import Pieza from "./pieza.js";
export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });

    this.score = 0;

    this.piezas = [];
    this.numPiezas = 0;
    
  }
  preload() {
    this.load.image("background","./assets/Game Assets/Mockup/background.jpg");
    this.load.image("square", "./assets/Game Assets/R/R.png");
    this.load.image("i", "./assets/Game Assets/I/1.png");
    this.load.image("l", "./assets/Game Assets/L/L.png");
    this.load.image("s", "./assets/Game Assets/S/S.png");
    this.load.image("t", "./assets/Game Assets/T/T_2.png");
  }

  create() {

    this.grupoPiezas  = this.physics.add.group();

    this.physics.add.collider(this.grupoPiezas,this.grupoPiezas);

    this.background = this.add.image(this.game.config.width/2,this.game.config.height/2,"background");

    //Apenas cableamos código
    this.scoreText = this.add.text(this.game.config.width/1.49,this.game.config.height-789,this.score);

    this.scoreText.setFontSize(50,50);

    this.createFloor();

    var timer = this.time.addEvent({                                       
      delay: 5000,                // ms
      callback: () => {
        //Resulta que los intervalos de Phaser son cerrados, porque otra cosa no, pero parece que lo ha hecho alguien con taras mentales
        this.seleccion = Phaser.Math.Between(0,4); 

        //this.createForm(this.seleccion); 
        //this.createForm(2); 
        
      },
      loop: true
    });

    this.physics.add.collider(this.grupoPiezas,this.grupoPiezas);
    this.physics.add.collider(this.grupoPiezas,this.floor);
  }

  update(time,delta){
    

  }

  updateScore(){
    this.scoreText.text = this.score;
  }

  createForm(pieza){
    switch(pieza){
      case 0:
        this.piezas[this.numPiezas] = new Pieza(this.game.config.width/2, 100, this, "l", this.floor); 
        break;
      case 1:
        this.piezas[this.numPiezas] = new Pieza(this.game.config.width/2, 100, this, "square", this.floor); 
        break;
      case 2:
        this.piezas[this.numPiezas] = new Pieza(this.game.config.width/2, 100, this, "t", this.floor); 
        break;
      case 3:
        this.piezas[this.numPiezas] = new Pieza(this.game.config.width/2, 100, this, "i", this.floor); 
        break;
      case 4:
        this.piezas[this.numPiezas] = new Pieza(this.game.config.width/2, 100, this, "s", this.floor); 
        break;
    } 
    this.grupoPiezas.add(this.piezas[this.numPiezas]);
    this.numPiezas++;
  }

  createFloor(){
    this.floor = this.physics.add.existing(this.add.image(this.game.config.width/2 - 300, this.game.config.height));

    this.floor.body.allowGravity = false;

    this.floor.body.width = 500;
    this.floor.body.setImmovable(true);
  }

}
