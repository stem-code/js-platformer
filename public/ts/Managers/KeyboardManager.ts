class KeyboardManager { // static class
    public static keys: any[] = [];

    public static init() {
        document.onkeydown = function(evt) {
            var currentEvt = evt || window.event;
            if (KeyboardManager.keys.indexOf(evt.keyCode) == -1){ KeyboardManager.keys.push(evt.keyCode); } // check if key has already been registered, if not, add it.
        }
        
        document.onkeyup = function(evt) {
            var currentEvt = evt || window.event;
            if (KeyboardManager.keys.indexOf(evt.keyCode) > -1){ KeyboardManager.keys.splice(KeyboardManager.keys.indexOf(evt.keyCode), 1); }
        }
    }
}