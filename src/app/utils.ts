import { OrderStatus } from "./models/order-status";
import { Shop } from "./models/shop";
import { SalesOrderService } from "./services/sales-order.service";


//const API_URL = "http://localhost:8080/BakeryService-0.0.1-SNAPSHOT/";
const API_URL = "http://localhost:8080/";
const PRODUCT_URL = API_URL + "api/product/";
const CUSTOMER_URL = API_URL + "api/customer/";
const ORDER_URL = API_URL + "api/order/";
const SHOP_URL = API_URL + "api/shop/";
const FLAVOUR_URL = API_URL + "api/flavours/";
const USER_URL = API_URL + "api/user/";
const UOM_URL = API_URL + "api/uom/";


const ACTION_SALES_REPORT = "getSalesReport";
const ACTION_FIND = "find";
const GET_ACTION = "get";
const ADD_ACTION = "add";
const STATUS_ACTION = "getStatuses";
const EDIT_ACTION = "edit";
const DELETE_ACTION ="delete";
const GET_ORDERS="getOrders";
const ORDER_STATUS = "orderStatus";
const REPORT_PARAM = "getReportParam/"
const MOVE_TO_PRODUCTION = "moveToProduction"
const MOVE_TO_InStock = "moveToStock"
const CHECK_OUT = "checkout"


export class Utils {
    
    public static SHOP_KEY = "Shop";
    public static PENDING = "Pending";
    public static DELIVERED = "Delivered";
    public static IN_PRODUCTION = "InProduction";
    public static IN_STOCK = "InStock";
    public static CANCELLED = "Cancelled";


    public static setOrderStatuses(orderStatuses: Array<OrderStatus>) {
        localStorage.setItem(ORDER_STATUS, JSON.stringify(orderStatuses));
    }
    public static getOrderStatuses(): Array<OrderStatus> {
        return JSON.parse(localStorage.getItem(ORDER_STATUS));
    }
    public static getOrderStatus(statusName: string): OrderStatus {
        let orderStatuses: Array<OrderStatus>;
        let orderStatus: OrderStatus = null;
        orderStatuses = Utils.getOrderStatuses();

        orderStatuses.forEach(element => {
            if (element.name == statusName) {
                orderStatus = element;
                return orderStatus;
            }
        });
        return orderStatus;
    }
    public static getPendingParamURL() {
        return ORDER_URL + REPORT_PARAM + this.PENDING;
    } 
    public static getInproductionParamURL() {
        return ORDER_URL + REPORT_PARAM + this.IN_PRODUCTION;
    } 
    public static getInstockParamURL() {
        return ORDER_URL + REPORT_PARAM + this.IN_STOCK;
    } 
    public static getCancelParamURL() {
        return ORDER_URL + REPORT_PARAM + this.CANCELLED;
    } 
    
    
    public static getUomURL() {
        return UOM_URL + GET_ACTION;
    }
    public static getFlavourURL() {
        return FLAVOUR_URL + GET_ACTION;
    }
    public static addFlavourURL() {
        return FLAVOUR_URL +  ADD_ACTION ;
}
public static editFlavourURL() {
    return FLAVOUR_URL  + EDIT_ACTION; 
}
    public static getStatusesURL() {
        return ORDER_URL + STATUS_ACTION;
    }
    public static addShopURL() {
        return SHOP_URL +  ADD_ACTION ;
}
public static editShopURL() {
    return SHOP_URL + EDIT_ACTION; 
}
    public static getShopURL() {
        return SHOP_URL + GET_ACTION;
    }
    public static getOrderURL() {
        return ORDER_URL + GET_ORDERS;
    }
    public static getAllOrderURL() {
        return ORDER_URL + GET_ACTION;
    }
    public static editOrderURL() {
        return ORDER_URL + EDIT_ACTION;
    }
    public static deleteOrderURL() {
        return ORDER_URL + DELETE_ACTION;
    }
    
    public static getSalesURL() {
        return ORDER_URL + ACTION_SALES_REPORT;
    }
    public static addOrderURL() {
        return ORDER_URL + ADD_ACTION;
    }
    public static addOrderNewURL() {
        return ORDER_URL + CHECK_OUT;
    }
    
    public static movetoProductionURL() {
        return ORDER_URL + MOVE_TO_PRODUCTION;
    }
    public static movetoInStockURL() {
        return ORDER_URL + MOVE_TO_InStock;
    } 
    public static getProductURL() {
            return PRODUCT_URL + GET_ACTION ;
    }
    public static addProductURL() {
              return PRODUCT_URL +  ADD_ACTION ;
    }
    public static addUserURL() {
        return USER_URL ;
}
    public static editProductURL() {
        return PRODUCT_URL + EDIT_ACTION; 
    }
    public static deleteProductURL() {
        return PRODUCT_URL + DELETE_ACTION; 
    }
    
    public static addCustomerURL() {
        return CUSTOMER_URL + ADD_ACTION;
    }
    public static getCustomerURL() {
        return CUSTOMER_URL + GET_ACTION;
    }
    public static editCustomerURL() {
        return CUSTOMER_URL + EDIT_ACTION;
    }
    public static findCustomerURL() {
        return CUSTOMER_URL + ACTION_FIND;
    }
    public static getCurrentShop() {
        let shop: Shop = JSON.parse(localStorage.getItem(this.SHOP_KEY));
        return shop;
    }
}
