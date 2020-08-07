export let controller = {
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

