/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FileLikeObject } from './file-like-object.class';
var FileItem = /** @class */ (function () {
    function FileItem(uploader, some, options) {
        this.url = '/';
        this.headers = [];
        this.withCredentials = true;
        this.formData = [];
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.uploader = uploader;
        this.some = some;
        this.options = options;
        this.file = new FileLikeObject(some);
        this._file = some;
        if (uploader.options) {
            this.method = uploader.options.method || 'POST';
            this.alias = uploader.options.itemAlias || 'file';
        }
        this.url = uploader.options.url;
    }
    /**
     * @return {?}
     */
    FileItem.prototype.upload = /**
     * @return {?}
     */
    function () {
        try {
            this.uploader.uploadItem(this);
        }
        catch (e) {
            this.uploader._onCompleteItem(this, '', 0, {});
            this.uploader._onErrorItem(this, '', 0, {});
        }
    };
    /**
     * @return {?}
     */
    FileItem.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.uploader.cancelItem(this);
    };
    /**
     * @return {?}
     */
    FileItem.prototype.remove = /**
     * @return {?}
     */
    function () {
        this.uploader.removeFromQueue(this);
    };
    /**
     * @return {?}
     */
    FileItem.prototype.onBeforeUpload = /**
     * @return {?}
     */
    function () {
        return void 0;
    };
    /**
     * @param {?} form
     * @return {?}
     */
    FileItem.prototype.onBuildForm = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        return { form: form };
    };
    /**
     * @param {?} progress
     * @return {?}
     */
    FileItem.prototype.onProgress = /**
     * @param {?} progress
     * @return {?}
     */
    function (progress) {
        return { progress: progress };
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype.onSuccess = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype.onError = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype.onCancel = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype.onComplete = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    /**
     * @return {?}
     */
    FileItem.prototype._onBeforeUpload = /**
     * @return {?}
     */
    function () {
        this.isReady = true;
        this.isUploading = true;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.onBeforeUpload();
    };
    /**
     * @param {?} form
     * @return {?}
     */
    FileItem.prototype._onBuildForm = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        this.onBuildForm(form);
    };
    /**
     * @param {?} progress
     * @return {?}
     */
    FileItem.prototype._onProgress = /**
     * @param {?} progress
     * @return {?}
     */
    function (progress) {
        this.progress = progress;
        this.onProgress(progress);
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype._onSuccess = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.index = void 0;
        this.onSuccess(response, status, headers);
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype._onError = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.index = void 0;
        this.onError(response, status, headers);
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype._onCancel = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = true;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.onCancel(response, status, headers);
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype._onComplete = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        this.onComplete(response, status, headers);
        if (this.uploader.options.removeAfterUpload) {
            this.remove();
        }
    };
    /**
     * @return {?}
     */
    FileItem.prototype._prepareToUploading = /**
     * @return {?}
     */
    function () {
        this.index = this.index || ++this.uploader._nextIndex;
        this.isReady = true;
    };
    return FileItem;
}());
export { FileItem };
if (false) {
    /** @type {?} */
    FileItem.prototype.file;
    /** @type {?} */
    FileItem.prototype._file;
    /** @type {?} */
    FileItem.prototype.alias;
    /** @type {?} */
    FileItem.prototype.url;
    /** @type {?} */
    FileItem.prototype.method;
    /** @type {?} */
    FileItem.prototype.headers;
    /** @type {?} */
    FileItem.prototype.withCredentials;
    /** @type {?} */
    FileItem.prototype.formData;
    /** @type {?} */
    FileItem.prototype.isReady;
    /** @type {?} */
    FileItem.prototype.isUploading;
    /** @type {?} */
    FileItem.prototype.isUploaded;
    /** @type {?} */
    FileItem.prototype.isSuccess;
    /** @type {?} */
    FileItem.prototype.isCancel;
    /** @type {?} */
    FileItem.prototype.isError;
    /** @type {?} */
    FileItem.prototype.progress;
    /** @type {?} */
    FileItem.prototype.index;
    /** @type {?} */
    FileItem.prototype._xhr;
    /** @type {?} */
    FileItem.prototype._form;
    /**
     * @type {?}
     * @protected
     */
    FileItem.prototype.uploader;
    /**
     * @type {?}
     * @protected
     */
    FileItem.prototype.some;
    /**
     * @type {?}
     * @protected
     */
    FileItem.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pdGVtLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWZpbGUtdXBsb2FkLyIsInNvdXJjZXMiOlsiZmlsZS11cGxvYWQvZmlsZS1pdGVtLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHMUQ7SUF3QkUsa0JBQW1CLFFBQXNCLEVBQUUsSUFBVSxFQUFFLE9BQTRCO1FBcEI1RSxRQUFHLEdBQVcsR0FBRyxDQUFDO1FBRWxCLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFDbEIsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUNuQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixVQUFLLEdBQVcsS0FBSyxDQUFDLENBQUM7UUFTNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7WUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFD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QUF5Qjs7SUFDekIsbUNBQXVDOztJQUN2Qyw0QkFBMEI7O0lBQzFCLDJCQUFnQzs7SUFDaEMsK0JBQW9DOztJQUNwQyw4QkFBbUM7O0lBQ25DLDZCQUFrQzs7SUFDbEMsNEJBQWlDOztJQUNqQywyQkFBZ0M7O0lBQ2hDLDRCQUE0Qjs7SUFDNUIseUJBQThCOztJQUM5Qix3QkFBNEI7O0lBQzVCLHlCQUFrQjs7Ozs7SUFFbEIsNEJBQWlDOzs7OztJQUNqQyx3QkFBcUI7Ozs7O0lBQ3JCLDJCQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpbGVMaWtlT2JqZWN0IH0gZnJvbSAnLi9maWxlLWxpa2Utb2JqZWN0LmNsYXNzJztcbmltcG9ydCB7IEZpbGVVcGxvYWRlciwgUGFyc2VkUmVzcG9uc2VIZWFkZXJzLCBGaWxlVXBsb2FkZXJPcHRpb25zIH0gZnJvbSAnLi9maWxlLXVwbG9hZGVyLmNsYXNzJztcblxuZXhwb3J0IGNsYXNzIEZpbGVJdGVtIHtcbiAgcHVibGljIGZpbGU6IEZpbGVMaWtlT2JqZWN0O1xuICBwdWJsaWMgX2ZpbGU6IEZpbGU7XG4gIHB1YmxpYyBhbGlhczogc3RyaW5nO1xuICBwdWJsaWMgdXJsOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyBtZXRob2Q6IHN0cmluZztcbiAgcHVibGljIGhlYWRlcnM6IGFueSA9IFtdO1xuICBwdWJsaWMgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIGZvcm1EYXRhOiBhbnkgPSBbXTtcbiAgcHVibGljIGlzUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGlzVXBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBpc1VwbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBpc1N1Y2Nlc3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGlzQ2FuY2VsOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBpc0Vycm9yOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBwcm9ncmVzczogbnVtYmVyID0gMDtcbiAgcHVibGljIGluZGV4OiBudW1iZXIgPSB2b2lkIDA7XG4gIHB1YmxpYyBfeGhyOiBYTUxIdHRwUmVxdWVzdDtcbiAgcHVibGljIF9mb3JtOiBhbnk7XG5cbiAgcHJvdGVjdGVkIHVwbG9hZGVyOiBGaWxlVXBsb2FkZXI7XG4gIHByb3RlY3RlZCBzb21lOiBGaWxlO1xuICBwcm90ZWN0ZWQgb3B0aW9uczogRmlsZVVwbG9hZGVyT3B0aW9ucztcblxuICBwdWJsaWMgY29uc3RydWN0b3IodXBsb2FkZXI6IEZpbGVVcGxvYWRlciwgc29tZTogRmlsZSwgb3B0aW9uczogRmlsZVVwbG9hZGVyT3B0aW9ucykge1xuICAgIHRoaXMudXBsb2FkZXIgPSB1cGxvYWRlcjtcbiAgICB0aGlzLnNvbWUgPSBzb21lO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5maWxlID0gbmV3IEZpbGVMaWtlT2JqZWN0KHNvbWUpO1xuICAgIHRoaXMuX2ZpbGUgPSBzb21lO1xuICAgIGlmICh1cGxvYWRlci5vcHRpb25zKSB7XG4gICAgICB0aGlzLm1ldGhvZCA9IHVwbG9hZGVyLm9wdGlvbnMubWV0aG9kIHx8ICdQT1NUJztcbiAgICAgIHRoaXMuYWxpYXMgPSB1cGxvYWRlci5vcHRpb25zLml0ZW1BbGlhcyB8fCAnZmlsZSc7XG4gICAgfVxuICAgIHRoaXMudXJsID0gdXBsb2FkZXIub3B0aW9ucy51cmw7XG4gIH1cblxuICBwdWJsaWMgdXBsb2FkKCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnVwbG9hZGVyLnVwbG9hZEl0ZW0odGhpcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy51cGxvYWRlci5fb25Db21wbGV0ZUl0ZW0odGhpcywgJycsIDAsIHt9KTtcbiAgICAgIHRoaXMudXBsb2FkZXIuX29uRXJyb3JJdGVtKHRoaXMsICcnLCAwLCB7fSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwbG9hZGVyLmNhbmNlbEl0ZW0odGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlKCk6IHZvaWQge1xuICAgIHRoaXMudXBsb2FkZXIucmVtb3ZlRnJvbVF1ZXVlKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG9uQmVmb3JlVXBsb2FkKCk6IHZvaWQge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cblxuICBwdWJsaWMgb25CdWlsZEZvcm0oZm9ybTogYW55KTogYW55IHtcbiAgICByZXR1cm4geyBmb3JtIH07XG4gIH1cblxuICBwdWJsaWMgb25Qcm9ncmVzcyhwcm9ncmVzczogbnVtYmVyKTogYW55IHtcbiAgICByZXR1cm4geyBwcm9ncmVzcyB9O1xuICB9XG5cbiAgcHVibGljIG9uU3VjY2VzcyhyZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogYW55IHtcbiAgICByZXR1cm4geyByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzIH07XG4gIH1cblxuICBwdWJsaWMgb25FcnJvcihyZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogYW55IHtcbiAgICByZXR1cm4geyByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzIH07XG4gIH1cblxuICBwdWJsaWMgb25DYW5jZWwocmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHsgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyB9O1xuICB9XG5cbiAgcHVibGljIG9uQ29tcGxldGUocmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHsgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyB9O1xuICB9XG5cbiAgcHVibGljIF9vbkJlZm9yZVVwbG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgIHRoaXMuaXNVcGxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuaXNVcGxvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNTdWNjZXNzID0gZmFsc2U7XG4gICAgdGhpcy5pc0NhbmNlbCA9IGZhbHNlO1xuICAgIHRoaXMuaXNFcnJvciA9IGZhbHNlO1xuICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgIHRoaXMub25CZWZvcmVVcGxvYWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBfb25CdWlsZEZvcm0oZm9ybTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkJ1aWxkRm9ybShmb3JtKTtcbiAgfVxuXG4gIHB1YmxpYyBfb25Qcm9ncmVzcyhwcm9ncmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzO1xuICAgIHRoaXMub25Qcm9ncmVzcyhwcm9ncmVzcyk7XG4gIH1cblxuICBwdWJsaWMgX29uU3VjY2VzcyhyZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogdm9pZCB7XG4gICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5pc1VwbG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaXNVcGxvYWRlZCA9IHRydWU7XG4gICAgdGhpcy5pc1N1Y2Nlc3MgPSB0cnVlO1xuICAgIHRoaXMuaXNDYW5jZWwgPSBmYWxzZTtcbiAgICB0aGlzLmlzRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLnByb2dyZXNzID0gMTAwO1xuICAgIHRoaXMuaW5kZXggPSB2b2lkIDA7XG4gICAgdGhpcy5vblN1Y2Nlc3MocmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gIH1cblxuICBwdWJsaWMgX29uRXJyb3IocmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHZvaWQge1xuICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuICAgIHRoaXMuaXNVcGxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmlzVXBsb2FkZWQgPSB0cnVlO1xuICAgIHRoaXMuaXNTdWNjZXNzID0gZmFsc2U7XG4gICAgdGhpcy5pc0NhbmNlbCA9IGZhbHNlO1xuICAgIHRoaXMuaXNFcnJvciA9IHRydWU7XG4gICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgdGhpcy5pbmRleCA9IHZvaWQgMDtcbiAgICB0aGlzLm9uRXJyb3IocmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gIH1cblxuICBwdWJsaWMgX29uQ2FuY2VsKHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiB2b2lkIHtcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLmlzVXBsb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5pc1VwbG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5pc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ2FuY2VsID0gdHJ1ZTtcbiAgICB0aGlzLmlzRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICB0aGlzLmluZGV4ID0gdm9pZCAwO1xuICAgIHRoaXMub25DYW5jZWwocmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gIH1cblxuICBwdWJsaWMgX29uQ29tcGxldGUocmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHZvaWQge1xuICAgIHRoaXMub25Db21wbGV0ZShyZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcblxuICAgIGlmICh0aGlzLnVwbG9hZGVyLm9wdGlvbnMucmVtb3ZlQWZ0ZXJVcGxvYWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIF9wcmVwYXJlVG9VcGxvYWRpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5pbmRleCA9IHRoaXMuaW5kZXggfHwgKyt0aGlzLnVwbG9hZGVyLl9uZXh0SW5kZXg7XG4gICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgfVxufVxuIl19