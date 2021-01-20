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
export class FileLikeObject {
    /**
     * @param {?} fileOrInput
     */
    constructor(fileOrInput) {
        this.rawFile = fileOrInput;
        /** @type {?} */
        let isInput = isElement(fileOrInput);
        /** @type {?} */
        let fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
        /** @type {?} */
        let postfix = typeof fakePathOrObject === 'string' ? 'FakePath' : 'Object';
        /** @type {?} */
        let method = '_createFrom' + postfix;
        ((/** @type {?} */ (this)))[method](fakePathOrObject);
    }
    /**
     * @param {?} path
     * @return {?}
     */
    _createFromFakePath(path) {
        this.lastModifiedDate = void 0;
        this.size = void 0;
        this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
        this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
    }
    /**
     * @param {?} object
     * @return {?}
     */
    _createFromObject(object) {
        this.size = object.size;
        this.type = object.type;
        this.name = object.name;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1saWtlLW9iamVjdC5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1maWxlLXVwbG9hZC8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL2ZpbGUtbGlrZS1vYmplY3QuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxTQUFTLFNBQVMsQ0FBQyxJQUFTO0lBQzFCLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDNUUsQ0FBQztBQUVELE1BQU0sT0FBTyxjQUFjOzs7O0lBT3pCLFlBQW1CLFdBQWdCO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDOztZQUN2QixPQUFPLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQzs7WUFDaEMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXOztZQUM1RCxPQUFPLEdBQUcsT0FBTyxnQkFBZ0IsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUTs7WUFDdEUsTUFBTSxHQUFHLGFBQWEsR0FBRyxPQUFPO1FBQ3BDLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBRSxNQUFNLENBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7O0lBRU0sbUJBQW1CLENBQUMsSUFBWTtRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDOzs7OztJQUVNLGlCQUFpQixDQUFDLE1BQW9EO1FBQzNFLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQzFCLENBQUM7Q0FDRjs7O0lBM0JDLDBDQUE2Qjs7SUFDN0IsOEJBQWlCOztJQUNqQiw4QkFBb0I7O0lBQ3BCLDhCQUFvQjs7SUFDcEIsaUNBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gaXNFbGVtZW50KG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gISEobm9kZSAmJiAobm9kZS5ub2RlTmFtZSB8fCBub2RlLnByb3AgJiYgbm9kZS5hdHRyICYmIG5vZGUuZmluZCkpO1xufVxuXG5leHBvcnQgY2xhc3MgRmlsZUxpa2VPYmplY3Qge1xuICBwdWJsaWMgbGFzdE1vZGlmaWVkRGF0ZTogYW55O1xuICBwdWJsaWMgc2l6ZTogYW55O1xuICBwdWJsaWMgdHlwZTogc3RyaW5nO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgcmF3RmlsZTogc3RyaW5nO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihmaWxlT3JJbnB1dDogYW55KSB7XG4gICAgdGhpcy5yYXdGaWxlID0gZmlsZU9ySW5wdXQ7XG4gICAgbGV0IGlzSW5wdXQgPSBpc0VsZW1lbnQoZmlsZU9ySW5wdXQpO1xuICAgIGxldCBmYWtlUGF0aE9yT2JqZWN0ID0gaXNJbnB1dCA/IGZpbGVPcklucHV0LnZhbHVlIDogZmlsZU9ySW5wdXQ7XG4gICAgbGV0IHBvc3RmaXggPSB0eXBlb2YgZmFrZVBhdGhPck9iamVjdCA9PT0gJ3N0cmluZycgPyAnRmFrZVBhdGgnIDogJ09iamVjdCc7XG4gICAgbGV0IG1ldGhvZCA9ICdfY3JlYXRlRnJvbScgKyBwb3N0Zml4O1xuICAgICh0aGlzIGFzIGFueSlbIG1ldGhvZCBdKGZha2VQYXRoT3JPYmplY3QpO1xuICB9XG5cbiAgcHVibGljIF9jcmVhdGVGcm9tRmFrZVBhdGgocGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5sYXN0TW9kaWZpZWREYXRlID0gdm9pZCAwO1xuICAgIHRoaXMuc2l6ZSA9IHZvaWQgMDtcbiAgICB0aGlzLnR5cGUgPSAnbGlrZS8nICsgcGF0aC5zbGljZShwYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxKS50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMubmFtZSA9IHBhdGguc2xpY2UocGF0aC5sYXN0SW5kZXhPZignLycpICsgcGF0aC5sYXN0SW5kZXhPZignXFxcXCcpICsgMik7XG4gIH1cblxuICBwdWJsaWMgX2NyZWF0ZUZyb21PYmplY3Qob2JqZWN0OiB7IHNpemU6IG51bWJlciwgdHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcgfSk6IHZvaWQge1xuICAgIHRoaXMuc2l6ZSA9IG9iamVjdC5zaXplO1xuICAgIHRoaXMudHlwZSA9IG9iamVjdC50eXBlO1xuICAgIHRoaXMubmFtZSA9IG9iamVjdC5uYW1lO1xuICB9XG59XG4iXX0=