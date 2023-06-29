export interface LineItemProperties {
    [key: string]: string;
}
export interface CartAdd {
    id: number;
    quantity: number;
    selling_plan?: number;
    properties?: LineItemProperties;
}
export declare const cartAdd: (params: {
    items: CartAdd[];
}) => Promise<unknown>;
/** @deprecated */
export declare const addToCart: (variant: number, quantity?: number, properties?: LineItemProperties) => Promise<unknown>;
/** @deprecated */
export declare const addToCartCB: (variant: number, quantity?: number, properties?: LineItemProperties, callback?: any, errorCallback?: any) => void;
