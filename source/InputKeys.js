//Este fichero se deber importar en todas las escenas que usen input

const { KeyCodes } = Phaser.Input.Keyboard;
/**
 * La variable KEY_BINDINGS tienen todas las teclas usadas.
 * Dentro de cada escena se decidirá que se hace con cada tecla
 */
export const KEY_BINDINGS = {
    UP: KeyCodes.W,
    DOWN: KeyCodes.S,
    LEFT: KeyCodes.A,
    RIGHT: KeyCodes.D,
    BUTTON1: KeyCodes.I,
    BUTTON2: KeyCodes.O,
    BUTTON3: KeyCodes.P
};

/**
 * @todo Añadir una función que permita cambiar el valor de los keyBindings
 * Igual también habría que hacer que el navegador guardase las teclas usadas 
 * y las recargará la siguiente vez que el jugador entrase pero esto es muy opcional
 */