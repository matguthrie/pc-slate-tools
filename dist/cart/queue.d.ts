export declare const CART_QUEUE: any[];
export declare const FINISH_TRIGGERS: FinishTrigger[];
export interface FinishTrigger {
    event: string;
    data: any;
}
export declare const getCartState: () => 'pending' | 'finished';
/** @deprecated */
export declare const addTask: (task: any) => void;
/** @deprecated */
export declare const removeTask: (task: any) => any[];
/** @deprecated */
export declare const errorQueue: () => void;
/** @deprecated */
export declare const addFinishTrigger: (trigger: FinishTrigger) => void;
/** @deprecated */
export declare const removeFinishTrigger: (trigger: FinishTrigger) => void;
/** @deprecated */
export declare const nextTask: () => void;
