import * as THREE from "three";


const ANTI_ALIAS = true;

//move this stuff too a setting menu
const FOV = 75;
const NEARCLIPPING = 0.1;
const FARCLIPPING = 10;
const HI_DPI = true;

export function renderer (contextName: string) {
    const gameEngine = new GameEngine(contextName);
    gameEngine.setup();

    // restarts render if rescaled
    window.addEventListener("resize", () => {
        gameEngine.replaceCanvas(contextName);
    });

    window.requestAnimationFrame(gameEngine.step);

}

class GameEngine {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private box: THREE.Mesh;
    private light: THREE.DirectionalLight;

    previousTimeStamp: number = Date.now();
    

    constructor(contextName: string) {
        const canvas = document.getElementById(contextName) as HTMLCanvasElement;
        this.renderer = new THREE.WebGLRenderer({antialias: ANTI_ALIAS, canvas});

        if (HI_DPI) {
            const pixelRatio = window.devicePixelRatio;
            const width = canvas.clientWidth * pixelRatio | 0;
            const height = canvas.clientHeight * pixelRatio | 0;
            this.renderer.setSize(width, height, false);
        } else {
            this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        }

        this.scene = new THREE.Scene();
        const aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera = new THREE.PerspectiveCamera(FOV, aspect, NEARCLIPPING, FARCLIPPING);

        const geometry = new THREE.BoxGeometry( 2,2,2);
        const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 } );

        this.box = new THREE.Mesh(geometry, material);
        this.light = new THREE.DirectionalLight( 0xffffff, 1);

    }

    replaceCanvas(contextName: string) {
        const canvas = document.getElementById(contextName) as HTMLCanvasElement;
        this.renderer = new THREE.WebGLRenderer({antialias: ANTI_ALIAS, canvas});

        if (HI_DPI) {
            const pixelRatio = window.devicePixelRatio;
            const width = canvas.clientWidth * pixelRatio | 0;
            const height = canvas.clientHeight * pixelRatio | 0;
            this.renderer.setSize(width, height, false);
        } else {
            this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        }

        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;;
        this.camera.updateProjectionMatrix();
    }

    step = () =>  {

        const timeNow = Date.now();
        const elapsed = timeNow - this.previousTimeStamp;
        this.previousTimeStamp = timeNow;

        console.log(`elasped:  ${elapsed}ms ${1000/elapsed}fps`);
        const t1 = performance.now();
        this.update(elapsed);
        const t2 = performance.now();
        this.draw();
        const t3 = performance.now();

        console.log(`update: ${t2-t1}ms draw: ${t3-t2}ms total: ${t3-t1}ms ${1000/(t3-t1)}fps`);

        window.requestAnimationFrame(this.step);
    }

    public setup() {
        this.light.position.set(-1,2,4);
        this.camera.position.z = 5;

        this.scene.add(this.light);
        this.scene.add(this.box);
    }


    public draw() {
        this.renderer.render(this.scene, this.camera);
    }

    public update(delta: number) {
        this.box.rotation.x += delta * 0.5 / 1000;
        this.box.rotation.y += delta * 0.5 / 1000;
    }
    
}

