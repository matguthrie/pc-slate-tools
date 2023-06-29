declare type CartChangeByVariant = {
    variant: string;
    quantity: number;
};
declare type CartChangeByKey = {
    key: string;
    quantity: number;
};
export declare type CartChange = CartChangeByVariant | CartChangeByKey;
export declare const changeCart: (changes: CartChange | CartChange[]) => Promise<unknown>;
export declare const changeCartCb: (changes: CartChange | CartChange[], callback?: any, errorCallback?: any) => void;
export {};
