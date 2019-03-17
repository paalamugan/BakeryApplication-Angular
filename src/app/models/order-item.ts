import { Product } from "./product";
import { SalesOrder } from "./sales-order";

import { Flavour } from "./flavour";
import { Uom } from "./uom";

export class OrderItem {
    
    constructor(
        public id: number,
        public product: Product,
        public price: number,
        public quantity: number,
        public uom: Uom,
      public flavour: Flavour,
        public order: SalesOrder
    ) {}
}

