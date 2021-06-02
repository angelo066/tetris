export default class Pieza extends Phaser.GameObjects.Sprite{
    constructor(x,y,scene, figure, floor){
        super(scene,x,y,figure);
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
                break;
            case "i":
                this.body.setSize(this.width * this.size - 30,this.height - 150);
                this.body.maxSpeed = 100;
                break;
            case "l":
                this.body.setSize(1,1);

                this.partes[0] = this.scene.physics.add.image(this.x + 24, this.y + 25);
                this.numPartes++;

                this.partes[1] = this.scene.physics.add.image(this.x - 15, this.y - 11);
                this.partes[1].body.setSize(35, 100);
                this.numPartes++;

                break;
                //El offset tiene una distancia minima, lo cual es una puta basura infecta
                //this.body.setOffset(0,0);
            case "t":
                this.body.setSize(1,1);

                this.partes[0] = this.scene.physics.add.image(this.x, this.y - 30);
                this.numPartes++;

                this.partes[1] = this.scene.physics.add.image(this.x, this.y + 15);
                this.partes[1].body.setSize(100, 35);
                this.numPartes++;
                //Colisiones a capón porque jijiji venimos de ecuador   

                break;
            
            case "s":   //Me tengo que clavar aquí todos los colliders porque jiji JavaScript guarda valores raros que guapo
                this.body.setSize(1,1);

                this.partes[0] = this.scene.physics.add.image(this.x + 19, this.y - 22);
                this.partes[0].body.setSize(66, 35);
                this.numPartes++;


                this.partes[1] = this.scene.physics.add.image(this.x - 19, this.y + 15);
                this.partes[1].body.setSize(66, 35);
                this.numPartes++;
                break;

        }
        this.body.maxSpeed = 100;
        this.setScale(this.size);
    
        if(this.body!=null)this.body.allowRotation = false;
        //this.body.setImmovable(true);
        this.falling = true;

        this.scene.grupoPiezas.add(this);
        
        for(var i=0; i<this.numPartes;i++){
            this.partes[i].body.maxSpeed = 100;
            this.scene.grupoPiezas.add(this.partes[i]);
        }

    }
    
    preUpdate(time, delta){
        if(this.falling){
            // if(this.body != null)this.body.setVelocity(0,this.velocity);
            // for(var i=0; i < this.numPartes; i++){
            //     this.partes[i].body.setVelocity(0,this.velocity);
            // }
        }
    }

    setFalling(fall){
        this.falling = fall;
    }

}