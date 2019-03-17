import { Customer } from "./customer";
import { Shop } from "./shop";
import { OrderItem } from "./order-item";
import { OrderStatus } from "./order-status";
import { Utils } from "../utils";

export class SalesOrder {
    constructor(
        public id: number,
        public customid:number,
        public customer: Customer,
        public advance: number,
        public total: number,
        public orderedDate: Date,
        public expectedDate: Date,
        public orderedTime: string,
        public expectedTime: string,
        public orderStatus: OrderStatus,
        public shop: Shop,
        public message: string,
        public comments: string,
        public orderItems: Array<OrderItem>
    ) { }

    public static init(): SalesOrder {
        
        return new SalesOrder(
            -1,
            0,
            new Customer(
                -1,
                "",
                "",
                "", ),
            0,
            0,
            new Date(),
            new Date(),
            "",
            "",
            Utils.getOrderStatus(Utils.PENDING),
            Utils.getCurrentShop(),
            "",
            "",
            new Array<OrderItem>()
        );
    }
}
