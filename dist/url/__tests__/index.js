"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../index");
var SAMPLE_IMAGE_LARGE = 'https://cdn.shopify.com/s/files/1/0283/2008/files/ecology2020_homepage2_hero_2500x1591_2042b687-938a-4d0a-9616-c87b6678b5ad.jpg';
var SAMPLE_IMAGE_DOTS = 'https://cdn.shopify.com/s/files/1/0085/8102/1755/products/FRG3950_FRANK_GREEN_PRODUCT_BAGS_V01.01_Circles_Shadow.png';
var SAMPLE_IMAGE_UNDERLINE = 'https://cdn.shopify.com/s/files/1/0085/8102/1755/products/FG0195_10oz_mothersday_queen_lilachaze.png';
var SAMPLE_IMAGE_RELATIVE = '/s/files/1/0085/8102/1755/products/FG0195_10oz_mothersday_queen_lilachaze.png';
var SAMPLE_PREFORMATTED = '//cdn.shopify.com/s/files/1/0085/8102/1755/products/FRG3950_FRANK_GREEN_PRODUCT_BAGS_V01.01_Circles_Shadow_small.png?v=1607058638';
var SAMPLE_NUMBER_AND_X = 'http://cdn.shopify.com/s/files/1/0282/3546/products/gift-box-1080-x-1080.jpg?v=1571267880';
var SAMPLE_NUMBER_1 = 'https://cdn.shopify.com/s/files/1/1082/2622/products/mctavish-mens-a21-washed-cord-shirt-flax.jpg?v=1609745999';
var SAMPLE_NUMBER_2 = 'https://cdn.shopify.com/s/files/1/1082/2622/products/mctavish-mens-a21-sunwashed-linen-shirt-roux.jpg?v=1609745382';
describe('getImageUrl', function () {
    it('should return the no-image when no src is provided', function () {
        expect(index_1.getImageUrl(null, 200)).toContain('no-image');
        expect(index_1.getImageUrl('', 200)).toContain('no-image');
    });
    it('should strip out the protocol', function () {
        expect(index_1.getImageUrl(SAMPLE_IMAGE_LARGE, null)).toEqual('//cdn.shopify.com/s/files/1/0283/2008/files/ecology2020_homepage2_hero_2500x1591_2042b687-938a-4d0a-9616-c87b6678b5ad.jpg');
    });
    it('should return a resized image', function () {
        expect(index_1.getImageUrl(SAMPLE_IMAGE_LARGE, 200)).toEqual('//cdn.shopify.com/s/files/1/0283/2008/files/ecology2020_homepage2_hero_2500x1591_2042b687-938a-4d0a-9616-c87b6678b5ad_200x.jpg');
        expect(index_1.getImageUrl(SAMPLE_IMAGE_LARGE, 400)).toEqual('//cdn.shopify.com/s/files/1/0283/2008/files/ecology2020_homepage2_hero_2500x1591_2042b687-938a-4d0a-9616-c87b6678b5ad_400x.jpg');
        expect(index_1.getImageUrl(SAMPLE_IMAGE_LARGE, 'master')).toEqual('//cdn.shopify.com/s/files/1/0283/2008/files/ecology2020_homepage2_hero_2500x1591_2042b687-938a-4d0a-9616-c87b6678b5ad.jpg');
        expect(index_1.getImageUrl(SAMPLE_IMAGE_LARGE, 'small')).toEqual('//cdn.shopify.com/s/files/1/0283/2008/files/ecology2020_homepage2_hero_2500x1591_2042b687-938a-4d0a-9616-c87b6678b5ad_small.jpg');
    });
    it('should be able to handle image filenames properly', function () {
        expect(index_1.getImageUrl(SAMPLE_IMAGE_DOTS, 200)).toStrictEqual('//cdn.shopify.com/s/files/1/0085/8102/1755/products/FRG3950_FRANK_GREEN_PRODUCT_BAGS_V01.01_Circles_Shadow_200x.png');
        expect(index_1.getImageUrl(SAMPLE_IMAGE_DOTS, 600)).toStrictEqual('//cdn.shopify.com/s/files/1/0085/8102/1755/products/FRG3950_FRANK_GREEN_PRODUCT_BAGS_V01.01_Circles_Shadow_600x.png');
        expect(index_1.getImageUrl(SAMPLE_IMAGE_UNDERLINE, 200)).toStrictEqual('//cdn.shopify.com/s/files/1/0085/8102/1755/products/FG0195_10oz_mothersday_queen_lilachaze_200x.png');
        expect(index_1.getImageUrl(SAMPLE_IMAGE_UNDERLINE, 'small')).toStrictEqual('//cdn.shopify.com/s/files/1/0085/8102/1755/products/FG0195_10oz_mothersday_queen_lilachaze_small.png');
    });
    it('should be able to handle relative urls', function () {
        expect(index_1.getImageUrl(SAMPLE_IMAGE_RELATIVE, 'small')).toStrictEqual('//cdn.shopify.com/s/files/1/0085/8102/1755/products/FG0195_10oz_mothersday_queen_lilachaze_small.png');
        expect(index_1.getImageUrl(SAMPLE_IMAGE_RELATIVE, 200)).toStrictEqual('//cdn.shopify.com/s/files/1/0085/8102/1755/products/FG0195_10oz_mothersday_queen_lilachaze_200x.png');
    });
    it('should be able to update preformatted urls', function () {
        expect(index_1.getImageUrl(SAMPLE_PREFORMATTED, 200)).toStrictEqual('//cdn.shopify.com/s/files/1/0085/8102/1755/products/FRG3950_FRANK_GREEN_PRODUCT_BAGS_V01.01_Circles_Shadow_200x.png');
        expect(index_1.getImageUrl(SAMPLE_PREFORMATTED, 600)).toStrictEqual('//cdn.shopify.com/s/files/1/0085/8102/1755/products/FRG3950_FRANK_GREEN_PRODUCT_BAGS_V01.01_Circles_Shadow_600x.png');
        expect(index_1.getImageUrl(SAMPLE_PREFORMATTED, 'master')).toStrictEqual('//cdn.shopify.com/s/files/1/0085/8102/1755/products/FRG3950_FRANK_GREEN_PRODUCT_BAGS_V01.01_Circles_Shadow.png');
        expect(index_1.getImageUrl(SAMPLE_PREFORMATTED, 'small')).toStrictEqual('//cdn.shopify.com/s/files/1/0085/8102/1755/products/FRG3950_FRANK_GREEN_PRODUCT_BAGS_V01.01_Circles_Shadow_small.png');
    });
    it('should be able to tell a size from another type of numbered url', function () {
        expect(index_1.getImageUrl(SAMPLE_NUMBER_AND_X, 360)).toStrictEqual('//cdn.shopify.com/s/files/1/0282/3546/products/gift-box-1080-x-1080_360x.jpg');
        expect(index_1.getImageUrl(SAMPLE_NUMBER_1, 400)).toStrictEqual('//cdn.shopify.com/s/files/1/1082/2622/products/mctavish-mens-a21-washed-cord-shirt-flax_400x.jpg');
        expect(index_1.getImageUrl(SAMPLE_NUMBER_2, 400)).toStrictEqual('//cdn.shopify.com/s/files/1/1082/2622/products/mctavish-mens-a21-sunwashed-linen-shirt-roux_400x.jpg');
    });
});
//# sourceMappingURL=index.js.map