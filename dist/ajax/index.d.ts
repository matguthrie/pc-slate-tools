export declare const ajaxRequest: <P, R = any>(url: string, method: string, data?: P, params?: any) => Promise<R>;
export declare const shopifyGet: <P, R = any>(url: string, data?: P) => Promise<R>;
export declare const shopifyPost: <P, R = any>(url: string, data?: P) => Promise<R>;
