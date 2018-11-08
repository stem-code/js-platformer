var Screen = function(){ // equivalent of static Class in Java
    this.windowWidth = Math.max(
        document.documentElement["clientWidth"],
        document.body["scrollWidth"],
        document.documentElement["scrollWidth"],
        document.body["offsetWidth"],
        document.documentElement["offsetWidth"]
    );

    this.windowHeight = Math.max(
        document.documentElement["clientHeight"],
        document.body["scrollHeight"],
        document.documentElement["scrollHeight"],
        document.body["offsetHeight"],
        document.documentElement["offsetHeight"]
    )

    this.getWindowDimens = () => {
        return [this.windowWidth, this.windowHeight];
    }

    var that = this;
    this.ensureScreenBounds = (x, width) => { // ensure that platform remains within the screen dimensions (bigger than 0, but not further than the screenWidth)
        if (x < 0) { return 0; }
        if (x+width > that.windowWidth){ return that.windowWidth-width };
        return x;
    }
}

Screen = new Screen(); // Static WorkAround, may need to be fixed