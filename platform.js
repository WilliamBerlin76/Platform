
var context, controller, sprite, spriteSheet, loop;

context = document.querySelector('canvas').getContext('2d');

context.canvas.height = 700;
context.canvas.width = 1000;


/////////////// ANIMATION CLASS/////////////

class Animation {
    constructor(frameSet, delay){
        this.count = 0;
        this.delay = delay;
        this.frameSet = frameSet;
        this.frame = 0;
        this.frameIndex = 0;
    }
    change(frameSet, delay = 20){
        if(this.frameSet !== frameSet){
            this.count = 0;
            this.delay = delay;
            this.frameSet = frameSet;
            this.frameIndex = 0;
            this.frame = this.frameSet[this.frameIndex]
        } 
    }
    update(){
        this.count++;
        // check if count has reached delay time
        if(this.count >= this.delay){
            // reset count
            this.count = 0;
            // if frameIndex is too high, reset it, otherwise, add 1
            this.frameIndex >= this.frameSet.length - 1 ? this.frameIndex = 0 : this.frameIndex++;
            this.frame = this.frameSet[this.frameIndex];
        }
    }
};


/////////////////////SPRITE////////////////////////
sprite = {
    animation: new Animation(),
    height: 90,
    width: 70,
    jumping: false,
    x: 500,
    y: 0,
    x_velocity: 0,
    y_velocity: 0,
};

///////// SPRITESHEET/////////
spriteSheet = {
    // add animation frames, inner arrays are frame sets
    frameSets: [[0,1], [2,3], [4,5]],
    image: new Image()
};

/////////////////CONTROLLER/////////////////////////
controller = {
    left: false,
    right: false,
    up: false,

    keyListener: (e) => {
        var keyState = (e.type === 'keydown') ? true : false;

        switch(e.keyCode){

            case 37:
                controller.left = keyState
            break;
            case 65:
                controller.left = keyState
            break;
            case 38:
                controller.up = keyState
            break;
            case 87:
                controller.up = keyState
            break;
            case 39:
                controller.right = keyState
            break;
            case 68:
                controller.right = keyState
            break;
        };
    }
};

/////////////////LOOP/////////////////////
// let lastRenderTime = 0;

loop = (timestamp) => {

    if (controller.up && sprite.jumping === false){
        sprite.y_velocity -= 20;
        sprite.jumping = true;
    };
    
    if (controller.left){
        sprite.x_velocity -= .8
        sprite.animation.change(spriteSheet.frameSets[1], 25)
    };

    if (controller.right){
        sprite.x_velocity += .8
        sprite.animation.change(spriteSheet.frameSets[2], 25)
    };

    // still animation
    if(!controller.right && !controller.left){
        sprite.animation.change(spriteSheet.frameSets[0], 45);
    };

    sprite.y_velocity += 1;
    sprite.x += sprite.x_velocity;
    sprite.y += sprite.y_velocity;
    sprite.x_velocity *= .6;
    sprite.y_velocity *= 1;
    

    if (sprite.y > 700 - sprite.height - 100 - 6){
        sprite.jumping = false;
        sprite.y = 700 - sprite.height - 100 - 6;
        sprite.y_velocity = 0;
    }

    if(sprite.x < -sprite.width){
        sprite.x = 1000
    } else if (sprite.x > 1000){
        sprite.x = -sprite.width;
    };

    
    
    window.requestAnimationFrame(loop);

    // const milsSinceLastRender = (timestamp - lastRenderTime)
    // if (milsSinceLastRender < 1000 / 60) return // lock in 60fps

    // lastRenderTime = timestamp

    sprite.animation.update();
    render();
    
    // setTimeout may be a good way to make movement consistent across devices as powerful devices loop faster
};


let render = function(){

    ///// CANVAS BACKGROUND //////
    context.strokeStyle = '#a4a4dd';
    context.lineJoin = "round";
    context.lineWidth = 6;
    context.fillStyle = "grey";
    context.fillRect(0,0, 1000, 700);

    ///// BEZIER CURVE //////
    context.beginPath();
    context.moveTo(0, 70);
    context.bezierCurveTo(180, 0, 360, 140, 500, 70);
    context.bezierCurveTo(640, 0, 820, 140, 1000, 70);
    context.stroke()


    ///DRAW A TRIANGLE!!!////
    context.strokeStyle = "#ffffff";
    context.lineWidth = 5;
    context.fillStyle = "red";
    context.beginPath();
    context.moveTo(500, 50);
    context.lineTo(300, 300);
    context.lineTo(700, 300);
    context.closePath();
    context.fill();
    context.stroke();

    ///// BOX HOUSE BODY/////
    context.fillStyle = "green";
    context.beginPath();
    context.rect(300, 300, 400, 300);
    context.fill();
    context.stroke();

    /// ATTIC WINDOW /////
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(500, 175, 40, 0, Math.PI*2);
    context.fill();
    context.stroke();

    ////// BOUNCY BOX//////
    // context.beginPath();
    // context.fillStyle = "purple";
    // context.rect(sprite.x, sprite.y, sprite.width, sprite.height);
    // context.fill();
    // context.stroke();
    
    
    ////// FLOOR///////
    context.strokeStyle = "#202830";
    context.lineWidth = 8;
    context.beginPath();
    context.moveTo(0, 600);
    context.lineTo(1000, 600);
    context.stroke();

    context.drawImage(spriteSheet.image, sprite.animation.frame * sprite.width, 0, sprite.width, sprite.height, sprite.x, sprite.y + 4, sprite.width, sprite.height);

}

spriteSheet.image.src = './assets/blobwalkspritesheet.png';
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
spriteSheet.image.addEventListener("load", (e) => {
    window.requestAnimationFrame(loop);
});

