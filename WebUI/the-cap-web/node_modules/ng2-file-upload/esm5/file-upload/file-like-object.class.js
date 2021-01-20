/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} node
 * @return {?}
 */
function isElement(node) {
    return !!(node && (node.nodeName || node.prop && node.attr && node.find));
}
var FileLikeObject = /** @class */ (function () {
    function FileLikeObject(fileOrInput) {
        this.rawFile = fileOrInput;
        /** @type {?} */
        var isInput = isElement(fileOrInput);
        /** @type {?} */
        var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
        /** @type {?} */
        var postfix = typeof fakePathOrObject === 'string' ? 'FakePath' : 'Object';
        /** @type {?} */
        var method = '_createFrom' + postfix;
        ((/** @type {?} */ (this)))[method](fakePathOrObject);
    }
    /**
     * @param {?} path
     * @return {?}
     */
    FileLikeObject.prototype._createFromFakePath = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        this.lastModifiedDate = void 0;
        this.size = void 0;
        this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
        this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
    };
    /**
     * @param {?} object
     * @return {?}
     */
    FileLikeObject.prototype._createFromObject = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        this.size = object.size;
        this.type = object.type;
        this.name = object.name;
    };
    return FileLikeObject;
}());
export { FileLikeObject };
if (false) {
    /** @type {?} */
    FileLikeObject.prototype.lastModifiedDate;
    /** @type {?} */
    FileLikeObject.prototype.size;
    /** @type {?} */
    FileLikeObject.prototype.type;
    /** @type {?} */
    FileLikeObject.prototype.name;
    /** @type {?} */
    FileLikeObject.prototype.rawFile;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1saWtlLW9iamVjdC5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1maWxlLXVwbG9hZC8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL2ZpbGUtbGlrZS1vYmplY3QuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxTQUFTLFNBQVMsQ0FBQyxJQUFTO0lBQzFCLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDNUUsQ0FBQztBQUVEO0lBT0Usd0JBQW1CLFdBQWdCO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDOztZQUN2QixPQUFPLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQzs7WUFDaEMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXOztZQUM1RCxPQUFPLEdBQUcsT0FBTyxnQkFBZ0IsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUTs7WUFDdEUsTUFBTSxHQUFHLGFBQWEsR0FBRyxPQUFPO1FBQ3BDLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBRSxNQUFNLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7O0lBRU0sNENBQW1COzs7O0lBQTFCLFVBQTJCLElBQVk7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQzs7Ozs7SUFFTSwwQ0FBaUI7Ozs7SUFBeEIsVUFBeUIsTUFBb0Q7UUFDM0UsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQzs7OztJQTNCQywwQ0FBNkI7O0lBQzdCLDhCQUFpQjs7SUFDakIsOEJBQW9COztJQUNwQiw4QkFBb0I7O0lBQ3BCLGlDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGlzRWxlbWVudChub2RlOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuICEhKG5vZGUgJiYgKG5vZGUubm9kZU5hbWUgfHwgbm9kZS5wcm9wICYmIG5vZGUuYXR0ciAmJiBub2RlLmZpbmQpKTtcbn1cblxuZXhwb3J0IGNsYXNzIEZpbGVMaWtlT2JqZWN0IHtcbiAgcHVibGljIGxhc3RNb2RpZmllZERhdGU6IGFueTtcbiAgcHVibGljIHNpemU6IGFueTtcbiAgcHVibGljIHR5cGU6IHN0cmluZztcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIHJhd0ZpbGU6IHN0cmluZztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoZmlsZU9ySW5wdXQ6IGFueSkge1xuICAgIHRoaXMucmF3RmlsZSA9IGZpbGVPcklucHV0O1xuICAgIGxldCBpc0lucHV0ID0gaXNFbGVtZW50KGZpbGVPcklucHV0KTtcbiAgICBsZXQgZmFrZVBhdGhPck9iamVjdCA9IGlzSW5wdXQgPyBmaWxlT3JJbnB1dC52YWx1ZSA6IGZpbGVPcklucHV0O1xuICAgIGxldCBwb3N0Zml4ID0gdHlwZW9mIGZha2VQYXRoT3JPYmplY3QgPT09ICdzdHJpbmcnID8gJ0Zha2VQYXRoJyA6ICdPYmplY3QnO1xuICAgIGxldCBtZXRob2QgPSAnX2NyZWF0ZUZyb20nICsgcG9zdGZpeDtcbiAgICAodGhpcyBhcyBhbnkpWyBtZXRob2QgXShmYWtlUGF0aE9yT2JqZWN0KTtcbiAgfVxuXG4gIHB1YmxpYyBfY3JlYXRlRnJvbUZha2VQYXRoKHBhdGg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubGFzdE1vZGlmaWVkRGF0ZSA9IHZvaWQgMDtcbiAgICB0aGlzLnNpemUgPSB2b2lkIDA7XG4gICAgdGhpcy50eXBlID0gJ2xpa2UvJyArIHBhdGguc2xpY2UocGF0aC5sYXN0SW5kZXhPZignLicpICsgMSkudG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLm5hbWUgPSBwYXRoLnNsaWNlKHBhdGgubGFzdEluZGV4T2YoJy8nKSArIHBhdGgubGFzdEluZGV4T2YoJ1xcXFwnKSArIDIpO1xuICB9XG5cbiAgcHVibGljIF9jcmVhdGVGcm9tT2JqZWN0KG9iamVjdDogeyBzaXplOiBudW1iZXIsIHR5cGU6IHN0cmluZywgbmFtZTogc3RyaW5nIH0pOiB2b2lkIHtcbiAgICB0aGlzLnNpemUgPSBvYmplY3Quc2l6ZTtcbiAgICB0aGlzLnR5cGUgPSBvYmplY3QudHlwZTtcbiAgICB0aGlzLm5hbWUgPSBvYmplY3QubmFtZTtcbiAgfVxufVxuIl19