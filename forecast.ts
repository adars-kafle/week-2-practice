export type Duration = `${number} days`;

class Resource {
  name: string;
  unitCost: number;
  quantity: number;
  duration: Duration;

  constructor(
    name: string,
    unitCost: number,
    quantity: number,
    duration: Duration
  ) {
    this.name = name;
    this.unitCost = unitCost;
    this.quantity = quantity;
    this.duration = duration;
  }

  // Get Budget Method
  getBudget(): number {
    const durationInDays = parseInt(this.duration.split(" ")[0], 10);
    return this.unitCost * this.quantity * durationInDays;
  }

  // Json representation
  toJSON() {
    return {
      name: this.name,
      unitCost: this.unitCost,
      quantity: this.quantity,
      duration: this.duration,
      budget: this.getBudget(),
    };
  }
}

// Define the interface for a task
interface ITask {
  id: number;
  name: string;
  wbsId: string;
  claimRef: string;
  contractSum: number;
  margin: number;
  resources?: Resource[] | null;
  tasks?: Task[] | null;
  getBudget(): number;
  toJSON(): object;
}

class Task implements ITask {
  id: number;
  name: string;
  wbsId: string;
  claimRef: string;
  contractSum: number;
  margin: number;
  resources: Resource[] | null = null;
  tasks: Task[] | null = null;

  // Constructor of Task
  constructor(
    id: number,
    name: string,
    wbsId: string,
    claimRef: string,
    contractSum: number,
    margin: number
  ) {
    this.id = id;
    this.name = name;
    this.wbsId = wbsId;
    this.claimRef = claimRef;
    this.contractSum = contractSum;
    this.margin = margin;
  }

  addResources(resources: Resource[]): void {
    if (this.tasks !== null) {
      throw new Error(
        "Cannot add resources to a task that already has subtasks."
      );
    }

    this.resources = resources;
  }

  addSubTask(subTask: Task): void {
    if (this.resources !== null) {
      throw new Error(
        "Cannot add subtasks to a task that already has resources."
      );
    }

    if (this.tasks === null) {
      this.tasks = [];
    }

    this.tasks.push(subTask);
  }

  getBudget(): number {
    let totalBudget = 0;

    if (this.resources) {
      totalBudget += this.resources.reduce(
        (total, resource) => total + resource.getBudget(),
        0
      );
    }
    if (this.tasks) {
      totalBudget += this.tasks.reduce(
        (total, task) => total + task.getBudget(),
        0
      );
    }

    return totalBudget;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      wbsId: this.wbsId,
      claimRef: this.claimRef,
      contractSum: this.contractSum,
      margin: this.margin,
      budget: this.getBudget(),
      resources: this.resources
        ? this.resources.map((resource) => resource.toJSON())
        : null,
      tasks: this.tasks ? this.tasks.map((task) => task.toJSON()) : null,
    };
  }
}

// Main project task
const buildBuilding = new Task(
  1,
  "Build a Building",
  "WBS001",
  "CR001",
  1000000,
  20
);

// Subtasks
const earthWorks = new Task(2, "Earthworks", "WBS002", "CR002", 2000000, 15);
const excavation = new Task(3, "Excavation", "WBS003", "CR003", 150000, 10);
const pcc = new Task(4, "PCC", "WBS004", "CR004", 120000, 12);
const rcc = new Task(5, "RCC", "WBS005", "CR005", 300000, 18);
const plaster = new Task(6, "Plaster", "WBS006", "CR006", 80000, 15);
const brickWorks = new Task(7, "Concrete Works", "WBS007", "CR007", 90000, 12);

// Adding nested subtasks
const siteClearing = new Task(8, "Site Clearing", "WBS008", "CR008", 50000, 10);
earthWorks.addSubTask(siteClearing);

const formWork = new Task(9, "Formwork", "WBS009", "CR009", 70000, 14);
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
