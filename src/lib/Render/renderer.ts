import * as THREE from "three";

const ANTI_ALIAS = true;

//move this stuff too a setting menu
const FOV = 75;
const NEARCLIPPING = 0.1;
const FARCLIPPING = 1000;
const HI_DPI = true;

// false or how often
const FPS_LOG = 60;
const EVENT_LOG = false;


export function renderer (contextName: string) {
    const gameEngine = new GameEngine(contextName);
    gameEngine.setup();

    // restarts render if rescaled
    window.addEventListener("resize", () => {
        gameEngine.resizeCanvas(contextName);
    });

    window.requestAnimationFrame(gameEngine.step);

}


class GameEngine {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private meshes = new Map<string, THREE.Mesh | THREE.Object3D>;

    previousTimeStamp: number = Date.now();
    steps = 0;

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


    }

    resizeCanvas(contextName: string) {
        const canvas = document.getElementById(contextName) as HTMLCanvasElement;

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


        const t1 = performance.now();
        this.update(elapsed);
        const t2 = performance.now();
        this.draw();
        const t3 = performance.now();

        if (FPS_LOG) {
            this.steps +=1;
            if (this.steps == FPS_LOG) {
                this.steps=0;
                console.log(`elasped:  ${elapsed}ms ${1000/elapsed}fps`);
                console.log(`update: ${t2-t1}ms draw: ${t3-t2}ms total: ${t3-t1}ms ${1000/(t3-t1)}fps`);
            }
        }

        window.requestAnimationFrame(this.step);
    }

    public setup() {

        // light
        const light = new THREE.PointLight( 0xffffff, 3);
        this.scene.add(light);

        //camera
        this.camera.position.set(50,50,0);
        this.camera.up.set(0,0,1);
        this.camera.lookAt(0,0,0);


        const sphereGeometry = new THREE.SphereGeometry( 1, 32, 16);

        const solarSystem = new THREE.Object3D();
        this.scene.add(solarSystem);

        this.meshes.set("sol", solarSystem);

        //sun
        const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xffff99});
        const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
        sunMesh.scale.set(5,5,5);
        this.meshes.set("sun", sunMesh);
        solarSystem.add(sunMesh);

        const earthOrbit = new THREE.Object3D();
        earthOrbit.position.x = 2;
        this.meshes.set("eOrbit", earthOrbit);
        solarSystem.add(earthOrbit);

        const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244});
        const earthMesh = new THREE.Mesh( sphereGeometry, earthMaterial);
        earthMesh.position.y = 25;
        this.meshes.set("earth", earthMesh);
        earthOrbit.add(earthMesh);

        const moonOrbit = new THREE.Object3D();
        moonOrbit.position.x = 4;
        this.meshes.set("mOrbit", moonOrbit);
        earthMesh.add(moonOrbit);

        const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x999999, emissive: 0x111111});
        const moonMesh = new THREE.Mesh( sphereGeometry, moonMaterial);
        moonMesh.scale.set(0.25, 0.25, 0.25);
        moonOrbit.add(moonMesh);


        //box
        const geometry = new THREE.BoxGeometry( .1,.4,.9);
        const material = new THREE.MeshPhongMaterial({ color: 0x111111 } );

        const box = new THREE.Mesh(geometry, material);
        box.scale.set(0.1, 0.1, 0.1);
        box.position.z = 0.5;
        this.meshes.set("box", box);

        moonOrbit.add(box);
        

    }



    public draw() {
        this.renderer.render(this.scene, this.camera);
    }

    public update(delta: number) {

        const box = this.meshes.get("box");
        box?.rotateX(delta/2000);
        box?.rotateY(delta/2000);

        this.meshes.get("sol")?.rotateX(delta/40000);
        this.meshes.get("sun")?.rotateX(delta/5000);
        this.meshes.get("eOrbit")?.rotateY(delta/5000);
        this.meshes.get("mOrbit")?.rotateY(delta/5000);
        this.meshes.get("mOrbit")?.rotateX(delta/5000);
        
    }
    
}

