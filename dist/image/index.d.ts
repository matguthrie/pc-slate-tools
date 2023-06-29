export declare const SHOPIFY_VALID_IMG_SIZE_NAMES: readonly ["master", "large", "medium", "small"];
export declare type ShopifyImageSizes = ReturnType<typeof SHOPIFY_VALID_IMG_SIZE_NAMES.find>;
export declare type ShopifyImageSize = ShopifyImageSizes | string | number;
/**
 * @deprecated In favour of pictureGenerate() as of 20201010
 */
export declare const generatePicture: (image: string | null, width?: number, sizes?: number[], clazz?: string, alt?: string, attributes?: string, lazy?: boolean, lazyExpand?: number) => string;
export declare const generateIcon: (icon: string, clazz?: string, title?: string, alt?: string, attributes?: string) => string;
declare type ImageSize = {
    ratios?: number[];
    size: ShopifyImageSize;
    screen?: string | number;
};
declare type LazyImageParams = {
    dataSrc?: boolean;
    dataExpand?: number;
    dataSizes?: boolean;
    class?: boolean;
    className?: string;
};
export declare type AccentuateImage = {
    alt: string;
    aspect_ratio: number;
    cloudinary_src: string;
    filename: string;
    handle: string;
    height: number;
    id: number;
    key: string;
    media_type: string;
    mime_type: string;
    original_src: string;
    scope: string;
    src: string;
    width: number;
}[];
export declare type ImageSource = AccentuateImage | string;
declare type GenPictureParams = {
    src: ImageSource;
    srcSize: ShopifyImageSize;
    sizes?: ImageSize[];
    class?: string;
    alt?: string;
    attributes?: string;
    lazy?: LazyImageParams;
    cache?: boolean;
};
export declare const pictureGenerate: (params: GenPictureParams) => string;
export declare const pictureGenerateElement: (params: GenPictureParams) => HTMLPictureElement;
export {};
