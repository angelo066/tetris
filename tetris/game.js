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

    this.grupoMuros = this.physics.add.staticGroup();

    this.physics.add.collider(this.grupoPiezas,this.grupoPiezas);

    this.background = this.add.image(this.game.config.width/2,this.game.config.height/2,"background");

    //Apenas cableamos código
    this.scoreText = this.add.text(this.game.config.width/1.49,this.game.config.height-789,this.score);

    this.scoreText.setFontSize(50,50);

    this.createFloor();
    
    this.createForm(1);
    // this.createForm(0); 
    
    var timer = this.time.addEvent({                                       
      delay: 10000,                // ms
      callback: () => {
        //this.createForm(0); 
        //Resulta que los intervalos de Phaser son cerrados, porque otra cosa no, pero parece que lo ha hecho alguien con taras mentales
        this.seleccion = Phaser.Math.Between(0,4); 
        // this.createForm(4); 
        //this.createForm(this.seleccion); 
        this.numPiezas++;
      },
      loop: true
    });


    this.createWalls();
  }

  update(time,delta){
    

  }

  updateScore(){
    this.scoreText.text = this.score;
  }

  createForm(pieza){
    this.x = Phaser.Math.Between(this.game.config.width / 1.8,this.game.config.width / 3);
    this.y = 50;
    switch(pieza){
      case 0:
        this.piezas[this.numPiezas] = new Pieza(this.x, this.y, this, "l", this.floor); 
        break;
      case 1:
        this.piezas[this.numPiezas] = new Pieza(this.x, this.y, this, "square", this.floor); 
        break;
      case 2:
        this.piezas[this.numPiezas] = new Pieza(this.x, this.y, this, "t", this.floor); 
        break;
      case 3:
        this.piezas[this.numPiezas] = new Pieza(this.x, this.y, this, "i", this.floor); 
        break;
      case 4:
        this.piezas[this.numPiezas] = new Pieza(this.x, this.y, this, "s", this.floor); 
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

  createWalls(){
    this.wallE = this.physics.add.existing(this.add.image(this.game.config.width/2 - 300, this.game.config.height/2 - 400));

    this.wallE.body.allowGravity = false;

    this.wallE.body.height = 800;

    this.floor.body.setImmovable(true);

    this.grupoMuros.add(this.wallE);

    this.wallW = this.physics.add.existing(this.add.image(this.game.config.width/2 + 150, this.game.config.height/2 - 400));

    this.wallW.body.allowGravity = false;

    this.wallW.body.height = 800;
    this.floor.body.setImmovable(true);

    this.grupoMuros.add(this.wallW);
    
    this.physics.add.collider(this.grupoMuros,this.grupoPiezas);
  }
}
