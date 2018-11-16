class UIManager { // Handles all UI (game menus, you lose/win text, etc.)
    public FPSElement: any;
    public winstatusElement: any;
    public countdownElement: any;
    public numUsersElement: any;
    public winstatusTimeout: any;

    constructor(){
        this.FPSElement = document.getElementById("fps");
        this.winstatusElement = document.getElementById("winStatus");
        this.countdownElement = document.getElementById("countDown");
        this.numUsersElement = document.getElementById("num-users");

        this.winstatusTimeout; // Javascript Timer Function for how long the winstatus remains visible
    }

    updateFPS(deltaTime: number){
        this.FPSElement.innerHTML = (1000/deltaTime).toFixed(0); // Calculate FPS (no decimals)
    }

    setWinStatus(winStatus: string, fadeDelay: number){ // fadeDelay is how long until it disappears (seconds)
        fadeDelay = fadeDelay || 2;
        this.winstatusElement.innerHTML = winStatus;

        clearTimeout(this.winstatusTimeout); // clear the timeout function if this was previously called (otherwise it will erase earlier)
        var that = this;
        this.winstatusTimeout = setTimeout(function(){ that.winstatusElement.innerHTML = "" }, fadeDelay*1000);
    }

    setCountDown(countDownValue: number){
        this.countdownElement.innerHTML = countDownValue;
    }

    clearCountDown(){
        this.countdownElement.innerHTML = "";
    }

    setNumUsers(numUsers: number){
        this.numUsersElement.innerHTML = numUsers;
    }

    clearUI(){
        this.countdownElement.innerHTML = "";
        this.FPSElement.innerHTML = "";
        this.winstatusElement.innerHTML = "";
        this.numUsersElement.innerHTML = "";
    }
}