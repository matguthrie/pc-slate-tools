/**
 *  Escape String
 *    Takes a given string and converts it to an escaped HTML string.
 *    Replaces items like "<" with "&lt;" and "&" with "&amp;"
 *
 * @param {string} s HTML string
 * @returns {string} Escaped string
 */
export declare const escapeString: (s: string) => string;
/**
 *  Handlize
 *    Takes in a string and converts it to a Shopify formatted handle
 *
 * @param {string} s String to handlize
 * @returns {string} Handle
 */
export declare const handlize: (s: string) => string;
/**
 *  Liquid to Date
 *    Convert a Liquid string date to a Javascript Date Object
 *
 * @param {string} strDate Liquid date string
 * @returns {Date} Javascript Date Object
 */
export declare const liquidToDate: (strDate: string) => Date;
/**
 *  Liquid
 *    Takes in a string containing liquid-like variables e.g. {{ test }} and
 *    replaces them with the variables provided
 *
 * @param {string} str The liquid string
 * @param {object} vars The variables to replace
 * @returns {string} The formatted string
 */
export declare const liquid: (str: string, vars?: {
    [key: string]: string;
}) => string;
export declare const getLanguageKey: (key: string, variables?: {
    [key: string]: string;
}) => string;
export declare const t: (key: string, variables?: {
    [key: string]: string;
}) => string;
