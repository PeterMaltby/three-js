type Entity = number;

abstract class Component {}

abstract class System {
    public abstract componentsRequired: Set<Function>;

    public abstract update(entities: Set<Entity>) :void
    public ecs: ECS;
}

type ComponentClass<T extends Component> = new (...args: any[]) => T;

class ComponentContainer {
    private map = new Map<(Function), Component>();

    public add(component: Component): void {
        this.map.set(component.constructor, component);
    }

    public get <T extends Component>(
        componentClass: ComponentClass<T>
    ): T {
        return this.map.get(componentClass) as T;
    }

    public has (componentClass: Function):boolean {
            return this.map.has(componentClass);
    }

    public hasAll (componentClasses: Iterable<Function>): boolean {
        for (const cls of componentClasses) {
            if (!this.map.has(cls)) return false;
    }
    return true;
    }

    public delete(componentClass: Function): void {
        this.map.delete(componentClass);
    }

}

class ECS {
    private entities = new Map<Entity, ComponentContainer>();
    private systems = new Map<System, Set<Entity>>();

    private nextEntityID = 0;
    private entitiesToDestroy = new Array<Entity>();

    public addEntity(): Entity {
        const entity = this.nextEntityID;
        this.nextEntityID++;
        this.entities.set(entity, new ComponentContainer());
        return entity;
    }

    public removeEntity(entity: Entity): void {
        this.entitiesToDestroy.push(entity);
    }

    //TODO possible ERROR
    public addComponent (entity: Entity, component: Component): void {
        this.entities.get(entity)!.add(component);
        this.checkEntity(entity);
    }

    //TODO possible ERROR
    public getComponents(entity: Entity): ComponentContainer {
        return this.entities.get(entity)!;
    }

    public removeComponent (entity: Entity, componentClass: Function) :void {
        this.entities.get(entity)?.delete(componentClass);
        this.checkEntity(entity);
    }

    public addSystem(system: System): void{
        if (system.componentsRequired.size == 0) {
            console.warn("system not added: empty Component List.");
            console.warn(system);
            return;
        }

        //TODO check this
        system.ecs = this;

        this.systems.set(system, new Set());
        for (const entity of this.entities.keys()) {
            this.checkEntitySystem(entity, system);
        }
    }
    
    public update(): void {
        for (const [system, entities] of this.systems.entries()) {
            system.update(entities)
        }
        while (this.entitiesToDestroy.length > 0) {
            this.destroyEntity(this.entitiesToDestroy.pop()!);
        }
    }

    private destroyEntity(entity: Entity):void {
        this.entities.delete(entity);
        for (const entities of this.systems.values()) {
            entities.delete(entity);
        }
    }

    private checkEntity(entity: Entity): void {
        for (const system of this.systems.keys()) {
            this.checkEntitySystem(entity, system);
        }
    }

    private checkEntitySystem(entity: Entity, system:System): void {
        const have = this.entities.get(entity);
        const need = system.componentsRequired;
        if (have?.hasAll(need)) {
            this.systems.get(system)!.add(entity);
        } else {
            this.systems.get(system)!.delete(entity);
        }
    }

}
