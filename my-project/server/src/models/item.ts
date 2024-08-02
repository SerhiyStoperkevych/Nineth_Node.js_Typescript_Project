export interface Item {
    id: number;
    name: string;
    description: string;
    cost: number;
    onCart: boolean;
}

export type PartialItem = Partial<Pick<Item, 'onCart'>>;