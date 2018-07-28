
class Main extends PIXI.Application {

    private iconLoader: fgui.GLoader;
    private popop: fgui.GComponent;
    private window: fgui.GComponent;
    private containerComp: fgui.GComponent;

    public constructor() {
        let view = document.querySelector("#canvasContainer canvas") as HTMLCanvasElement;
        super({view: view, backgroundColor: 0xb5b5b5, antialias: true, forceCanvas: false, width: 1136, height: 640});

        fgui.GRoot.inst.attachTo(this, {
            designWidth: 1136,
            designHeight: 640,
            scaleMode: fgui.StageScaleMode.FIXED_AUTO,
            orientation: fgui.StageOrientation.LANDSCAPE,
            alignV: fgui.StageAlign.TOP,
            alignH: fgui.StageAlign.LEFT
        });

        let loader = new fgui.utils.AssetLoader();
        loader.add("listDemo", "images/listDemo.fui", { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR, xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER })
        .add("listDemo@atlas0", "images/listDemo@atlas0.png")
        .on("complete", this.resLoaded, this)
        .load();

    }
    
    private resLoaded(loader: PIXI.loaders.Loader): void {
        loader.removeAllListeners();
        fgui.UIPackage.addPackage('listDemo');

        let window = fgui.UIPackage.createObject('listDemo','main') as fgui.GComponent;
        window.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);     //add relation so that it will be auto resized when the window size is changed.
        window.addRelation(fgui.GRoot.inst, fgui.RelationType.Size);
        
        this.containerComp = new fgui.GComponent();
        this.containerComp.addChild(window);

        fgui.GRoot.inst.addChild(this.containerComp);

        this.window = window;
        
        let list = window.getChild('list_cundang') as fgui.GList;
        let backBtn = window.getChild('btn_back') as fgui.GButton;

        backBtn.click(this.onBackBtnHandler, this);

        for (let i = 0 ; i < 5; i++) {
            list.addItemFromPool('ui://listDemo/listItem');
        }
    }
    private onBackBtnHandler(): void {
        console.log('返回按钮响应');
        this.containerComp.dispose();
    }
}

new Main();