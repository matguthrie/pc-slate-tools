import { LineItemProperties } from "../cart";
/**
 * Returns the shipping rates for the current cart object.
 *
 * @param zip Destination zip code
 * @param country Destination country
 * @param province Destination province code (exact match only)
 */
export declare const getCurrentShippingCosts: (zip: string, country: string, province: string) => Promise<any>;
export declare type LineItem = {
    variantId: number;
    quantity: number;
    properties?: LineItemProperties;
};
export declare const estimateShippingCostsForLines: (lines: LineItem[], zip: string, country: string, province: string) => Promise<any>;
export declare const estimateShippingCosts: (variantId: number, quantity: number, zip: string, country: string, province: string) => Promise<any>;
