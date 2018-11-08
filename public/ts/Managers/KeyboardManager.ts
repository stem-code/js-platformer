class KeyboardManager { // static class
    public static keys = [];

    document.onkeydown = function(evt) {
        var currentEvt = evt || window.event;
        if (KeyboardManager.keys.indexOf(evt.keyCode) == -1){ KeyboardManager.keys.push(evt.keyCode); }
    }
    
    document.onkeyup = function(evt) {
        var currentEvt = evt || window.event;
        if (KeyboardManager.keys.indexOf(evt.keyCode) > -1){ KeyboardManager.keys.splice(KeyboardManager.keys.indexOf(evt.keyCode), 1); }
    }
}