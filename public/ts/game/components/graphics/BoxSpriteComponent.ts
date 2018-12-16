class BoxSpriteComponent extends Component {
    color: string;
    constructor (color: string = "#8BC34A") {
        super();
        this.color = color;
    }

    public update() {

    }

    public draw(ctx: CanvasRenderingContext2D, camera: Camera){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.getEntity().getAABB().x + camera.offsetX, this.getEntity().getAABB().y + camera.offsetY, this.getEntity().getAABB().width, this.getEntity().getAABB().height);
    }
}