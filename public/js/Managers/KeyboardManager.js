var KeyboardManager = function() { // static class
    this.keys = [];

    var that = this; // document.onkeydown will not know what "this" is, so we need to reference it.
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (that.keys.indexOf(evt.keyCode) == -1){ that.keys.push(evt.keyCode); }
    }
    
    document.onkeyup = function(evt) {
        evt = evt || window.event;
        if (that.keys.indexOf(evt.keyCode) > -1){ that.keys.splice(that.keys.indexOf(evt.keyCode), 1); }
    }
}

KeyboardManager = new KeyboardManager();