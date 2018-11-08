class MyScreen { // equivalent of static Class in Java
    public static windowWidth = Math.max(
        document.documentElement["clientWidth"],
        document.body["scrollWidth"],
        document.documentElement["scrollWidth"],
        document.body["offsetWidth"],
        document.documentElement["offsetWidth"]
    );

    public static windowHeight = Math.max(
        document.documentElement["clientHeight"],
        document.body["scrollHeight"],
        document.documentElement["scrollHeight"],
        document.body["offsetHeight"],
        document.documentElement["offsetHeight"]
    )

    public static getWindowDimens = () => {
        return [MyScreen.windowWidth, MyScreen.windowHeight];
    }

    public static ensureScreenBounds = (x, width) => { // ensure that platform remains within the screen dimensions (bigger than 0, but not further than the screenWidth)
        if (x < 0) { return 0; }
        if (x+width > MyScreen.windowWidth){ return MyScreen.windowWidth-width };
        return x;
    }
}