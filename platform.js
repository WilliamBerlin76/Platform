var context, controller, sprite, loop;

context = document.querySelector('canvas');

context.height = 300;
context.width = 500;

context.style.background = 'grey';

sprite = {
    height: 32,
    width: 32,
    jumping: false,
    x: 250,
    y: 0,
    x_velocity: 0,
    y_velocity: 0
};

controller = {
    left: false,
    right: false,
    up: false,

    keyListener: (e) => {
        var keyState = (e.type === 'keydown') ? true : false;

        switch(e.keyCode){

            case 37:
                controller.left = key_state
                break;
            case 38:
                controller.up = key_state
                break;
            case 39:
                controller.right = key_state
                break;
        };
    }
};