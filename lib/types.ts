export type uuid = string;

export type TodoItem = { id: uuid; text: string; done: boolean, createdAt: Date };

export enum FilterOptions {
    All = "all",
    Pending = "pending",
    Done = "done"
}

export enum SwipeDirection {
    LEFT = "left",
    RIGHT = "right",
}


