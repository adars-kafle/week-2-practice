var Resource = /** @class */ (function () {
    function Resource(name, unitCost, quantity, duration) {
        this.name = name;
        this.unitCost = unitCost;
        this.quantity = quantity;
        this.duration = duration;
    }
    // Get Budget Method
    Resource.prototype.getBudget = function () {
        var durationInDays = parseInt(this.duration.split(" ")[0]);
        return this.unitCost * this.quantity * durationInDays;
    };
    // Json representation
    Resource.prototype.toJSON = function () {
        return {
            name: this.name,
            unitCost: this.unitCost,
            quantity: this.quantity,
            duration: this.duration,
            budget: this.getBudget(),
        };
    };
    return Resource;
}());
var Task = /** @class */ (function () {
    // Constructor of Task
    function Task(id, name, wbsId, claimRef, contractSum, margin) {
        this.resources = null;
        this.tasks = null;
        this.id = id;
        this.name = name;
        this.wbsId = wbsId;
        this.claimRef = claimRef;
        this.contractSum = contractSum;
        this.margin = margin;
    }
    Task.prototype.addResources = function (resources) {
        if (this.tasks !== null) {
            throw new Error("Cannot add resources to a task that already has subtasks.");
        }
        this.resources = resources;
    };
    Task.prototype.addSubTask = function (subTask) {
        if (this.resources !== null) {
            throw new Error("Cannot add subtasks to a task that already has resources.");
        }
        if (this.tasks === null) {
            this.tasks = [];
        }
        this.tasks.push(subTask);
    };
    Task.prototype.getBudget = function () {
        if (this.resources) {
            return this.resources.reduce(function (total, resource) { return total + resource.getBudget(); }, 0);
        }
        else if (this.tasks) {
            return this.tasks.reduce(function (total, task) { return total + task.getBudget(); }, 0);
        }
        return 0;
    };
    Task.prototype.toJSON = function () {
        return {
            id: this.id,
            name: this.name,
            wbsId: this.wbsId,
            claimRef: this.claimRef,
            contractSum: this.contractSum,
            margin: this.margin,
            budget: this.getBudget(),
            resources: this.resources
                ? this.resources.map(function (resource) { return resource.toJSON(); })
                : null,
            tasks: this.tasks ? this.tasks.map(function (task) { return task.toJSON(); }) : null,
        };
    };
    return Task;
}());
// Main project task
var buildBuilding = new Task(1, "Build a Building", "WBS001", "CR001", 1000000, 20);
// Subtasks
var earthWorks = new Task(2, "Earthworks", "WBS002", "CR002", 2000000, 15);
var excavation = new Task(3, "Excavation", "WBS003", "CR003", 150000, 10);
var pcc = new Task(4, "PCC", "WBS004", "CR004", 120000, 12);
var rcc = new Task(5, "RCC", "WBS005", "CR005", 300000, 18);
var plaster = new Task(6, "Plaster", "WBS006", "CR006", 80000, 15);
var brickWorks = new Task(7, "Concrete Works", "WBS007", "CR007", 90000, 12);
// Adding nested subtasks
var siteClearing = new Task(8, "Site Clearing", "WBS008", "CR008", 50000, 10);
earthWorks.addSubTask(siteClearing);
var formWork = new Task(9, "Formwork", "WBS009", "CR009", 70000, 14);
pcc.addSubTask(formWork);
// Adding resources to tasks that do not have subtasks
excavation.addResources([
    new Resource("Excavator", 1000, 2, "5 days"),
    new Resource("Shovels", 50, 10, "5 days"),
]);
rcc.addResources([
    new Resource("Steel Rods", 500, 100, "10 days"),
    new Resource("Concrete Mixer", 300, 50, "10 days"),
]);
plaster.addResources([
    new Resource("Plastering Tools", 100, 5, "3 days"),
    new Resource("Cement", 300, 50, "3 days"),
]);
brickWorks.addResources([
    new Resource("Bricks", 0.5, 1000, "7 days"),
    new Resource("Mortar", 50, 100, "7 days"),
]);
// Adding main subtasks to the main project
buildBuilding.addSubTask(earthWorks);
buildBuilding.addSubTask(excavation);
buildBuilding.addSubTask(pcc);
buildBuilding.addSubTask(rcc);
buildBuilding.addSubTask(plaster);
buildBuilding.addSubTask(brickWorks);
// Print the task structure
console.log(JSON.stringify(buildBuilding.toJSON(), null, 2));
