export declare const fetchRelated: (product_id: number, limit?: number) => Promise<any>;
export interface SectionParams {
    section_id: string;
    product_recommendations_url: string;
    product_id?: string;
    limit?: number;
}
export declare const fetchRelatedSection: (params: SectionParams) => Promise<string>;
interface GetOptionIndexParams {
    product: {
        options_with_values: {
            name: string;
        }[];
    };
    options: string[];
}
export declare const getOptionIndex: (params: GetOptionIndexParams) => number;
export {};
