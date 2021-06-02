export default class Pieza extends Phaser.GameObjects.Sprite{
    constructor(x,y,scene, figure, floor){
        super(scene,x,y,figure);
        this.squareWidht = 10;

        this.floor = floor;
        this.figure = figure;
        this.size = 0.3;
        
        this.velocity = 100;
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.numPartes = 0;
        this.partes = [];
        //Separar las colisiones en un método y pasarle un indice
        //Cada figura lleva bastante cableado porque vaya vaya cada figura es distinta
        switch(figure){
            case "square":
                this.body.setSize(this.width* this.size,this.height * this.size);
                this.body.maxSpeed = 100;
                this.partes[0] = this;
                break;
            case "i":
                this.body.setSize(this.width * this.size - 30,this.height - 150);
                this.body.maxSpeed = 100;
                this.partes[0] = this;
                break;
            case "l":
                //En mi vida habia cableado tanto código tan mal
                this.body.setSize(1,270);

                this.partes[0] = this.scene.physics.add.image(this.x + 20, this.y + 25);
                this.numPartes++;

                this.partes[1] = this.scene.physics.add.image(this.x - 15, this.y - 11);
                this.partes[1].body.setSize(35, 100);
                this.numPartes++;

                break;
                //El offset tiene una distancia minima, lo cual es una puta basura infecta
            case "t":
                this.body.setSize(1,1);

                this.partes[0] = this.scene.physics.add.image(this.x, this.y - 25);
                this.numPartes++;

                this.partes[1] = this.scene.physics.add.image(this.x, this.y + 15);
                this.partes[1].body.setSize(100, 35);
                this.numPartes++;
                //Colisiones a capón porque jijiji venimos de ecuador   

                break;
            
            case "s":   //Me tengo que clavar aquí todos los colliders porque jiji JavaScript guarda valores raros que guapo
                this.body.setSize(1,1);

                this.partes[0] = this.scene.physics.add.image(this.x + 19, this.y - 20);
                this.partes[0].body.setSize(66, 35);
                this.numPartes++;


                this.partes[1] = this.scene.physics.add.image(this.x - 19, this.y + 15);
                this.partes[1].body.setSize(66, 35);
                this.numPartes++;
                break;

        }
        //Para diferenciar entre pieza
        if(this.partes[0] != undefined){
            this.pieza = this.scene.numPiezas;

            this.partes[0].pieza = this.scene.numPiezas;
            if(this.partes[1])this.partes[1].pieza = this.scene.numPiezas;
            
        }
        //Para que no caigan demasiado deprisa
        this.body.maxSpeed = 100;
        this.setScale(this.size);
    
        //Que no roten
        if(this.body!=null)this.body.allowRotation = false;
        //this.body.setImmovable(true);
        this.falling = true;

        this.scene.grupoPiezas.add(this);

        this.setPhysics();
        //Puede ser que esto tenga que dejar de ser un int y convertirse en un puntero a PIEZA
        // this.scene.physics.add.collider(this.scene.grupoPiezas, this.piezas,(o1,o2)=>{
        //     //Para que no frenen si las partes de una misma pieza chocan entre si
        //     if(o1.pieza != o2.pieza){
        //         this.body.setVelocity(0,0);
        //         this.body.setAllowGravity(false); 
        //         this.falling = false;
        //     } 
        // });


        this.initInput();
    }
    
    preUpdate(time, delta){
        //console.log("Soy: "+ this.figure +" y estoy cayendo:" + this.falling);

        if(this.falling){
            if(this.keycodeA.isDown) {
                this.setPosition(this.x - this.squareWidht, this.y);
                
                for(let i =0; i<this.numPartes;i++){
                    this.partes[i].setPosition(this.partes[i].x - this.squareWidht, this.partes[i].y);
                }
            }

            if(this.keycodeD.isDown) {
                this.setPosition(this.x + this.squareWidht, this.y);
                
                for(let i =0; i<this.numPartes;i++){
                    this.partes[i].setPosition(this.partes[i].x + this.squareWidht, this.partes[i].y);
                }
            }
        }
    }

    setFalling(fall){
        this.falling = fall;
    }
    //Determina si las partes que colisionan pertencen a una misma pieza

    initInput(){
        this.keycodeA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keycodeD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    stop(){
        this.body.setVelocity(0,0);
        this.body.setAllowGravity(false); 
        this.falling = false;
    }

    setPhysics(){
        //puede ser que todo el problema de esta muralla de bazofia es que estoy haciendo setPos en vez de velocity


        for(var i=0; i<this.numPartes;i++){
            this.partes[i].body.maxSpeed = 100;
            this.scene.grupoPiezas.add(this.partes[i]);

        }

        this.scene.physics.add.collider(this.floor, this.partes,(o1,o2)=>{
            //Para que solo frenen si chocan partes de esa pieza
            //Esto funciona más para allá que para aca no te voy a mentir
            this.body.setVelocity(0,0);
            this.body.setAllowGravity(false); 
            this.falling = false;            
        });

        this.scene.physics.add.collider(this.scene.grupoPiezas, this.partes,(o1,o2)=>{
            //Para que solo frenen si chocan partes de esa pieza
            //Esto funciona más para allá que para aca no te voy a mentir
            if(o1.pieza != o2.pieza){
                this.body.setVelocity(0,0);
                this.body.setAllowGravity(false); 
                this.falling = false;
                
                for(var i=0; i<this.numPartes;i++){
                    this.partes[i].body.maxSpeed = 0;
        
                }
            }
                 
        });

        // this.scene.physics.add.collider(this.scene.grupoPiezas, this,(o1,o2)=>{
        //     //Para que solo frenen si chocan partes de esa pieza
        //     //Esto funciona más para allá que para aca no te voy a mentir
        //     this.body.setVelocity(0,0);
        //     this.body.setAllowGravity(false); 
        //     this.falling = false;            
        // });
    }
}