/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FileLikeObject } from './file-like-object.class';
export class FileItem {
    /**
     * @param {?} uploader
     * @param {?} some
     * @param {?} options
     */
    constructor(uploader, some, options) {
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
    upload() {
        try {
            this.uploader.uploadItem(this);
        }
        catch (e) {
            this.uploader._onCompleteItem(this, '', 0, {});
            this.uploader._onErrorItem(this, '', 0, {});
        }
    }
    /**
     * @return {?}
     */
    cancel() {
        this.uploader.cancelItem(this);
    }
    /**
     * @return {?}
     */
    remove() {
        this.uploader.removeFromQueue(this);
    }
    /**
     * @return {?}
     */
    onBeforeUpload() {
        return void 0;
    }
    /**
     * @param {?} form
     * @return {?}
     */
    onBuildForm(form) {
        return { form };
    }
    /**
     * @param {?} progress
     * @return {?}
     */
    onProgress(progress) {
        return { progress };
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onSuccess(response, status, headers) {
        return { response, status, headers };
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onError(response, status, headers) {
        return { response, status, headers };
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onCancel(response, status, headers) {
        return { response, status, headers };
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onComplete(response, status, headers) {
        return { response, status, headers };
    }
    /**
     * @return {?}
     */
    _onBeforeUpload() {
        this.isReady = true;
        this.isUploading = true;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.onBeforeUpload();
    }
    /**
     * @param {?} form
     * @return {?}
     */
    _onBuildForm(form) {
        this.onBuildForm(form);
    }
    /**
     * @param {?} progress
     * @return {?}
     */
    _onProgress(progress) {
        this.progress = progress;
        this.onProgress(progress);
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onSuccess(response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.index = void 0;
        this.onSuccess(response, status, headers);
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onError(response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.index = void 0;
        this.onError(response, status, headers);
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onCancel(response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = true;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.onCancel(response, status, headers);
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onComplete(response, status, headers) {
        this.onComplete(response, status, headers);
        if (this.uploader.options.removeAfterUpload) {
            this.remove();
        }
    }
    /**
     * @return {?}
     */
    _prepareToUploading() {
        this.index = this.index || ++this.uploader._nextIndex;
        this.isReady = true;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pdGVtLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWZpbGUtdXBsb2FkLyIsInNvdXJjZXMiOlsiZmlsZS11cGxvYWQvZmlsZS1pdGVtLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHMUQsTUFBTSxPQUFPLFFBQVE7Ozs7OztJQXdCbkIsWUFBbUIsUUFBc0IsRUFBRSxJQUFVLEVBQUUsT0FBNEI7UUFwQjVFLFFBQUcsR0FBVyxHQUFHLENBQUM7UUFFbEIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixvQkFBZSxHQUFZLElBQUksQ0FBQztRQUNoQyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLFVBQUssR0FBVyxLQUFLLENBQUMsQ0FBQztRQVM1QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztZQUNoRCxJQUFJLENBQUMsS0FBSyxHQUFH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IGZyb20gJy4vZmlsZS1saWtlLW9iamVjdC5jbGFzcyc7XG5pbXBvcnQgeyBGaWxlVXBsb2FkZXIsIFBhcnNlZFJlc3BvbnNlSGVhZGVycywgRmlsZVVwbG9hZGVyT3B0aW9ucyB9IGZyb20gJy4vZmlsZS11cGxvYWRlci5jbGFzcyc7XG5cbmV4cG9ydCBjbGFzcyBGaWxlSXRlbSB7XG4gIHB1YmxpYyBmaWxlOiBGaWxlTGlrZU9iamVjdDtcbiAgcHVibGljIF9maWxlOiBGaWxlO1xuICBwdWJsaWMgYWxpYXM6IHN0cmluZztcbiAgcHVibGljIHVybDogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgbWV0aG9kOiBzdHJpbmc7XG4gIHB1YmxpYyBoZWFkZXJzOiBhbnkgPSBbXTtcbiAgcHVibGljIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyBmb3JtRGF0YTogYW55ID0gW107XG4gIHB1YmxpYyBpc1JlYWR5OiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBpc1VwbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgaXNVcGxvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgaXNTdWNjZXNzOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBpc0NhbmNlbDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgaXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcHJvZ3Jlc3M6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBpbmRleDogbnVtYmVyID0gdm9pZCAwO1xuICBwdWJsaWMgX3hocjogWE1MSHR0cFJlcXVlc3Q7XG4gIHB1YmxpYyBfZm9ybTogYW55O1xuXG4gIHByb3RlY3RlZCB1cGxvYWRlcjogRmlsZVVwbG9hZGVyO1xuICBwcm90ZWN0ZWQgc29tZTogRmlsZTtcbiAgcHJvdGVjdGVkIG9wdGlvbnM6IEZpbGVVcGxvYWRlck9wdGlvbnM7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHVwbG9hZGVyOiBGaWxlVXBsb2FkZXIsIHNvbWU6IEZpbGUsIG9wdGlvbnM6IEZpbGVVcGxvYWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLnVwbG9hZGVyID0gdXBsb2FkZXI7XG4gICAgdGhpcy5zb21lID0gc29tZTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuZmlsZSA9IG5ldyBGaWxlTGlrZU9iamVjdChzb21lKTtcbiAgICB0aGlzLl9maWxlID0gc29tZTtcbiAgICBpZiAodXBsb2FkZXIub3B0aW9ucykge1xuICAgICAgdGhpcy5tZXRob2QgPSB1cGxvYWRlci5vcHRpb25zLm1ldGhvZCB8fCAnUE9TVCc7XG4gICAgICB0aGlzLmFsaWFzID0gdXBsb2FkZXIub3B0aW9ucy5pdGVtQWxpYXMgfHwgJ2ZpbGUnO1xuICAgIH1cbiAgICB0aGlzLnVybCA9IHVwbG9hZGVyLm9wdGlvbnMudXJsO1xuICB9XG5cbiAgcHVibGljIHVwbG9hZCgpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy51cGxvYWRlci51cGxvYWRJdGVtKHRoaXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMudXBsb2FkZXIuX29uQ29tcGxldGVJdGVtKHRoaXMsICcnLCAwLCB7fSk7XG4gICAgICB0aGlzLnVwbG9hZGVyLl9vbkVycm9ySXRlbSh0aGlzLCAnJywgMCwge30pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy51cGxvYWRlci5jYW5jZWxJdGVtKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnVwbG9hZGVyLnJlbW92ZUZyb21RdWV1ZSh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkJlZm9yZVVwbG9hZCgpOiB2b2lkIHtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG5cbiAgcHVibGljIG9uQnVpbGRGb3JtKGZvcm06IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHsgZm9ybSB9O1xuICB9XG5cbiAgcHVibGljIG9uUHJvZ3Jlc3MocHJvZ3Jlc3M6IG51bWJlcik6IGFueSB7XG4gICAgcmV0dXJuIHsgcHJvZ3Jlc3MgfTtcbiAgfVxuXG4gIHB1YmxpYyBvblN1Y2Nlc3MocmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHsgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyB9O1xuICB9XG5cbiAgcHVibGljIG9uRXJyb3IocmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHsgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyB9O1xuICB9XG5cbiAgcHVibGljIG9uQ2FuY2VsKHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiBhbnkge1xuICAgIHJldHVybiB7IHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNvbXBsZXRlKHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiBhbnkge1xuICAgIHJldHVybiB7IHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMgfTtcbiAgfVxuXG4gIHB1YmxpYyBfb25CZWZvcmVVcGxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICB0aGlzLmlzVXBsb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmlzVXBsb2FkZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlzU3VjY2VzcyA9IGZhbHNlO1xuICAgIHRoaXMuaXNDYW5jZWwgPSBmYWxzZTtcbiAgICB0aGlzLmlzRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICB0aGlzLm9uQmVmb3JlVXBsb2FkKCk7XG4gIH1cblxuICBwdWJsaWMgX29uQnVpbGRGb3JtKGZvcm06IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25CdWlsZEZvcm0oZm9ybSk7XG4gIH1cblxuICBwdWJsaWMgX29uUHJvZ3Jlc3MocHJvZ3Jlc3M6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgICB0aGlzLm9uUHJvZ3Jlc3MocHJvZ3Jlc3MpO1xuICB9XG5cbiAgcHVibGljIF9vblN1Y2Nlc3MocmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHZvaWQge1xuICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuICAgIHRoaXMuaXNVcGxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmlzVXBsb2FkZWQgPSB0cnVlO1xuICAgIHRoaXMuaXNTdWNjZXNzID0gdHJ1ZTtcbiAgICB0aGlzLmlzQ2FuY2VsID0gZmFsc2U7XG4gICAgdGhpcy5pc0Vycm9yID0gZmFsc2U7XG4gICAgdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICB0aGlzLmluZGV4ID0gdm9pZCAwO1xuICAgIHRoaXMub25TdWNjZXNzKHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuICB9XG5cbiAgcHVibGljIF9vbkVycm9yKHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiB2b2lkIHtcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLmlzVXBsb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5pc1VwbG9hZGVkID0gdHJ1ZTtcbiAgICB0aGlzLmlzU3VjY2VzcyA9IGZhbHNlO1xuICAgIHRoaXMuaXNDYW5jZWwgPSBmYWxzZTtcbiAgICB0aGlzLmlzRXJyb3IgPSB0cnVlO1xuICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgIHRoaXMuaW5kZXggPSB2b2lkIDA7XG4gICAgdGhpcy5vbkVycm9yKHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuICB9XG5cbiAgcHVibGljIF9vbkNhbmNlbChyZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogdm9pZCB7XG4gICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5pc1VwbG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaXNVcGxvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNTdWNjZXNzID0gZmFsc2U7XG4gICAgdGhpcy5pc0NhbmNlbCA9IHRydWU7XG4gICAgdGhpcy5pc0Vycm9yID0gZmFsc2U7XG4gICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgdGhpcy5pbmRleCA9IHZvaWQgMDtcbiAgICB0aGlzLm9uQ2FuY2VsKHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuICB9XG5cbiAgcHVibGljIF9vbkNvbXBsZXRlKHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ29tcGxldGUocmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG5cbiAgICBpZiAodGhpcy51cGxvYWRlci5vcHRpb25zLnJlbW92ZUFmdGVyVXBsb2FkKSB7XG4gICAgICB0aGlzLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBfcHJlcGFyZVRvVXBsb2FkaW5nKCk6IHZvaWQge1xuICAgIHRoaXMuaW5kZXggPSB0aGlzLmluZGV4IHx8ICsrdGhpcy51cGxvYWRlci5fbmV4dEluZGV4O1xuICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gIH1cbn1cbiJdfQ==