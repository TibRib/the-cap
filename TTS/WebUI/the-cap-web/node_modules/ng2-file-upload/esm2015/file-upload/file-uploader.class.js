/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter } from '@angular/core';
import { FileLikeObject } from './file-like-object.class';
import { FileItem } from './file-item.class';
import { FileType } from './file-type.class';
/**
 * @param {?} value
 * @return {?}
 */
function isFile(value) {
    return (File && value instanceof File);
}
/**
 * @record
 */
export function Headers() { }
if (false) {
    /** @type {?} */
    Headers.prototype.name;
    /** @type {?} */
    Headers.prototype.value;
}
/**
 * @record
 */
export function FileUploaderOptions() { }
if (false) {
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.allowedMimeType;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.allowedFileType;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.autoUpload;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.isHTML5;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.filters;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.headers;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.method;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.authToken;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.maxFileSize;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.queueLimit;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.removeAfterUpload;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.url;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.disableMultipart;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.itemAlias;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.authTokenHeader;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.additionalParameter;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.parametersBeforeFiles;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.formatDataFunction;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.formatDataFunctionIsAsync;
}
export class FileUploader {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.isUploading = false;
        this.queue = [];
        this.progress = 0;
        this._nextIndex = 0;
        this.options = {
            autoUpload: false,
            isHTML5: true,
            filters: [],
            removeAfterUpload: false,
            disableMultipart: false,
            formatDataFunction: (/**
             * @param {?} item
             * @return {?}
             */
            (item) => item._file),
            formatDataFunctionIsAsync: false
        };
        this.setOptions(options);
        this.response = new EventEmitter();
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setOptions(options) {
        this.options = Object.assign(this.options, options);
        this.authToken = this.options.authToken;
        this.authTokenHeader = this.options.authTokenHeader || 'Authorization';
        this.autoUpload = this.options.autoUpload;
        this.options.filters.unshift({ name: 'queueLimit', fn: this._queueLimitFilter });
        if (this.options.maxFileSize) {
            this.options.filters.unshift({ name: 'fileSize', fn: this._fileSizeFilter });
        }
        if (this.options.allowedFileType) {
            this.options.filters.unshift({ name: 'fileType', fn: this._fileTypeFilter });
        }
        if (this.options.allowedMimeType) {
            this.options.filters.unshift({ name: 'mimeType', fn: this._mimeTypeFilter });
        }
        for (let i = 0; i < this.queue.length; i++) {
            this.queue[i].url = this.options.url;
        }
    }
    /**
     * @param {?} files
     * @param {?=} options
     * @param {?=} filters
     * @return {?}
     */
    addToQueue(files, options, filters) {
        /** @type {?} */
        let list = [];
        for (let file of files) {
            list.push(file);
        }
        /** @type {?} */
        let arrayOfFilters = this._getFilters(filters);
        /** @type {?} */
        let count = this.queue.length;
        /** @type {?} */
        let addedFileItems = [];
        list.map((/**
         * @param {?} some
         * @return {?}
         */
        (some) => {
            if (!options) {
                options = this.options;
            }
            /** @type {?} */
            let temp = new FileLikeObject(some);
            if (this._isValidFile(temp, arrayOfFilters, options)) {
                /** @type {?} */
                let fileItem = new FileItem(this, some, options);
                addedFileItems.push(fileItem);
                this.queue.push(fileItem);
                this._onAfterAddingFile(fileItem);
            }
            else {
                /** @type {?} */
                let filter = arrayOfFilters[this._failFilterIndex];
                this._onWhenAddingFileFailed(temp, filter, options);
            }
        }));
        if (this.queue.length !== count) {
            this._onAfterAddingAll(addedFileItems);
            this.progress = this._getTotalProgress();
        }
        this._render();
        if (this.options.autoUpload) {
            this.uploadAll();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    removeFromQueue(value) {
        /** @type {?} */
        let index = this.getIndexOfItem(value);
        /** @type {?} */
        let item = this.queue[index];
        if (item.isUploading) {
            item.cancel();
        }
        this.queue.splice(index, 1);
        this.progress = this._getTotalProgress();
    }
    /**
     * @return {?}
     */
    clearQueue() {
        while (this.queue.length) {
            this.queue[0].remove();
        }
        this.progress = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    uploadItem(value) {
        /** @type {?} */
        let index = this.getIndexOfItem(value);
        /** @type {?} */
        let item = this.queue[index];
        /** @type {?} */
        let transport = this.options.isHTML5 ? '_xhrTransport' : '_iframeTransport';
        item._prepareToUploading();
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        ((/** @type {?} */ (this)))[transport](item);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    cancelItem(value) {
        /** @type {?} */
        let index = this.getIndexOfItem(value);
        /** @type {?} */
        let item = this.queue[index];
        /** @type {?} */
        let prop = this.options.isHTML5 ? item._xhr : item._form;
        if (item && item.isUploading) {
            prop.abort();
        }
    }
    /**
     * @return {?}
     */
    uploadAll() {
        /** @type {?} */
        let items = this.getNotUploadedItems().filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => !item.isUploading));
        if (!items.length) {
            return;
        }
        items.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item._prepareToUploading()));
        items[0].upload();
    }
    /**
     * @return {?}
     */
    cancelAll() {
        /** @type {?} */
        let items = this.getNotUploadedItems();
        items.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.cancel()));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isFile(value) {
        return isFile(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isFileLikeObject(value) {
        return value instanceof FileLikeObject;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getIndexOfItem(value) {
        return typeof value === 'number' ? value : this.queue.indexOf(value);
    }
    /**
     * @return {?}
     */
    getNotUploadedItems() {
        return this.queue.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => !item.isUploaded));
    }
    /**
     * @return {?}
     */
    getReadyItems() {
        return this.queue
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => (item.isReady && !item.isUploading)))
            .sort((/**
         * @param {?} item1
         * @param {?} item2
         * @return {?}
         */
        (item1, item2) => item1.index - item2.index));
    }
    /**
     * @return {?}
     */
    destroy() {
        return void 0;
    }
    /**
     * @param {?} fileItems
     * @return {?}
     */
    onAfterAddingAll(fileItems) {
        return { fileItems };
    }
    /**
     * @param {?} fileItem
     * @param {?} form
     * @return {?}
     */
    onBuildItemForm(fileItem, form) {
        return { fileItem, form };
    }
    /**
     * @param {?} fileItem
     * @return {?}
     */
    onAfterAddingFile(fileItem) {
        return { fileItem };
    }
    /**
     * @param {?} item
     * @param {?} filter
     * @param {?} options
     * @return {?}
     */
    onWhenAddingFileFailed(item, filter, options) {
        return { item, filter, options };
    }
    /**
     * @param {?} fileItem
     * @return {?}
     */
    onBeforeUploadItem(fileItem) {
        return { fileItem };
    }
    /**
     * @param {?} fileItem
     * @param {?} progress
     * @return {?}
     */
    onProgressItem(fileItem, progress) {
        return { fileItem, progress };
    }
    /**
     * @param {?} progress
     * @return {?}
     */
    onProgressAll(progress) {
        return { progress };
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onSuccessItem(item, response, status, headers) {
        return { item, response, status, headers };
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onErrorItem(item, response, status, headers) {
        return { item, response, status, headers };
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onCancelItem(item, response, status, headers) {
        return { item, response, status, headers };
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onCompleteItem(item, response, status, headers) {
        return { item, response, status, headers };
    }
    /**
     * @return {?}
     */
    onCompleteAll() {
        return void 0;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _mimeTypeFilter(item) {
        return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _fileSizeFilter(item) {
        return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _fileTypeFilter(item) {
        return !(this.options.allowedFileType &&
            this.options.allowedFileType.indexOf(FileType.getMimeClass(item)) === -1);
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onErrorItem(item, response, status, headers) {
        item._onError(response, status, headers);
        this.onErrorItem(item, response, status, headers);
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onCompleteItem(item, response, status, headers) {
        item._onComplete(response, status, headers);
        this.onCompleteItem(item, response, status, headers);
        /** @type {?} */
        let nextItem = this.getReadyItems()[0];
        this.isUploading = false;
        if (nextItem) {
            nextItem.upload();
            return;
        }
        this.onCompleteAll();
        this.progress = this._getTotalProgress();
        this._render();
    }
    /**
     * @protected
     * @param {?} parsedHeaders
     * @return {?}
     */
    _headersGetter(parsedHeaders) {
        return (/**
         * @param {?} name
         * @return {?}
         */
        (name) => {
            if (name) {
                return parsedHeaders[name.toLowerCase()] || void 0;
            }
            return parsedHeaders;
        });
    }
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    _xhrTransport(item) {
        /** @type {?} */
        let that = this;
        /** @type {?} */
        let xhr = item._xhr = new XMLHttpRequest();
        /** @type {?} */
        let sendable;
        this._onBeforeUploadItem(item);
        if (typeof item._file.size !== 'number') {
            throw new TypeError('The file specified is no longer valid');
        }
        if (!this.options.disableMultipart) {
            sendable = new FormData();
            this._onBuildItemForm(item, sendable);
            /** @type {?} */
            const appendFile = (/**
             * @return {?}
             */
            () => sendable.append(item.alias, item._file, item.file.name));
            if (!this.options.parametersBeforeFiles) {
                appendFile();
            }
            // For AWS, Additional Parameters must come BEFORE Files
            if (this.options.additionalParameter !== undefined) {
                Object.keys(this.options.additionalParameter).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                (key) => {
                    /** @type {?} */
                    let paramVal = this.options.additionalParameter[key];
                    // Allow an additional parameter to include the filename
                    if (typeof paramVal === 'string' && paramVal.indexOf('{{file_name}}') >= 0) {
                        paramVal = paramVal.replace('{{file_name}}', item.file.name);
                    }
                    sendable.append(key, paramVal);
                }));
            }
            if (this.options.parametersBeforeFiles) {
                appendFile();
            }
        }
        else {
            sendable = this.options.formatDataFunction(item);
        }
        xhr.upload.onprogress = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            this._onProgressItem(item, progress);
        });
        xhr.onload = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            let response = this._transformResponse(xhr.response, headers);
            /** @type {?} */
            let gist = this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            /** @type {?} */
            let method = '_on' + gist + 'Item';
            ((/** @type {?} */ (this)))[method](item, response, xhr.status, headers);
            this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.onerror = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            let response = this._transformResponse(xhr.response, headers);
            this._onErrorItem(item, response, xhr.status, headers);
            this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.onabort = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            let response = this._transformResponse(xhr.response, headers);
            this._onCancelItem(item, response, xhr.status, headers);
            this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.open(item.method, item.url, true);
        xhr.withCredentials = item.withCredentials;
        if (this.options.headers) {
            for (let header of this.options.headers) {
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (item.headers.length) {
            for (let header of item.headers) {
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (this.authToken) {
            xhr.setRequestHeader(this.authTokenHeader, this.authToken);
        }
        xhr.onreadystatechange = (/**
         * @return {?}
         */
        function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                that.response.emit(xhr.responseText);
            }
        });
        if (this.options.formatDataFunctionIsAsync) {
            sendable.then((/**
             * @param {?} result
             * @return {?}
             */
            (result) => xhr.send(JSON.stringify(result))));
        }
        else {
            xhr.send(sendable);
        }
        this._render();
    }
    /**
     * @protected
     * @param {?=} value
     * @return {?}
     */
    _getTotalProgress(value = 0) {
        if (this.options.removeAfterUpload) {
            return value;
        }
        /** @type {?} */
        let notUploaded = this.getNotUploadedItems().length;
        /** @type {?} */
        let uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        /** @type {?} */
        let ratio = 100 / this.queue.length;
        /** @type {?} */
        let current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    }
    /**
     * @protected
     * @param {?} filters
     * @return {?}
     */
    _getFilters(filters) {
        if (!filters) {
            return this.options.filters;
        }
        if (Array.isArray(filters)) {
            return filters;
        }
        if (typeof filters === 'string') {
            /** @type {?} */
            let names = filters.match(/[^\s,]+/g);
            return this.options.filters
                .filter((/**
             * @param {?} filter
             * @return {?}
             */
            (filter) => names.indexOf(filter.name) !== -1));
        }
        return this.options.filters;
    }
    /**
     * @protected
     * @return {?}
     */
    _render() {
        return void 0;
    }
    /**
     * @protected
     * @return {?}
     */
    _queueLimitFilter() {
        return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
    }
    /**
     * @protected
     * @param {?} file
     * @param {?} filters
     * @param {?} options
     * @return {?}
     */
    _isValidFile(file, filters, options) {
        this._failFilterIndex = -1;
        return !filters.length ? true : filters.every((/**
         * @param {?} filter
         * @return {?}
         */
        (filter) => {
            this._failFilterIndex++;
            return filter.fn.call(this, file, options);
        }));
    }
    /**
     * @protected
     * @param {?} status
     * @return {?}
     */
    _isSuccessCode(status) {
        return (status >= 200 && status < 300) || status === 304;
    }
    /**
     * @protected
     * @param {?} response
     * @param {?} headers
     * @return {?}
     */
    _transformResponse(response, headers) {
        return response;
    }
    /**
     * @protected
     * @param {?} headers
     * @return {?}
     */
    _parseHeaders(headers) {
        /** @type {?} */
        let parsed = {};
        /** @type {?} */
        let key;
        /** @type {?} */
        let val;
        /** @type {?} */
        let i;
        if (!headers) {
            return parsed;
        }
        headers.split('\n').map((/**
         * @param {?} line
         * @return {?}
         */
        (line) => {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        }));
        return parsed;
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} filter
     * @param {?} options
     * @return {?}
     */
    _onWhenAddingFileFailed(item, filter, options) {
        this.onWhenAddingFileFailed(item, filter, options);
    }
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    _onAfterAddingFile(item) {
        this.onAfterAddingFile(item);
    }
    /**
     * @protected
     * @param {?} items
     * @return {?}
     */
    _onAfterAddingAll(items) {
        this.onAfterAddingAll(items);
    }
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    _onBeforeUploadItem(item) {
        item._onBeforeUpload();
        this.onBeforeUploadItem(item);
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} form
     * @return {?}
     */
    _onBuildItemForm(item, form) {
        item._onBuildForm(form);
        this.onBuildItemForm(item, form);
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} progress
     * @return {?}
     */
    _onProgressItem(item, progress) {
        /** @type {?} */
        let total = this._getTotalProgress(progress);
        this.progress = total;
        item._onProgress(progress);
        this.onProgressItem(item, progress);
        this.onProgressAll(total);
        this._render();
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onSuccessItem(item, response, status, headers) {
        item._onSuccess(response, status, headers);
        this.onSuccessItem(item, response, status, headers);
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onCancelItem(item, response, status, headers) {
        item._onCancel(response, status, headers);
        this.onCancelItem(item, response, status, headers);
    }
}
if (false) {
    /** @type {?} */
    FileUploader.prototype.authToken;
    /** @type {?} */
    FileUploader.prototype.isUploading;
    /** @type {?} */
    FileUploader.prototype.queue;
    /** @type {?} */
    FileUploader.prototype.progress;
    /** @type {?} */
    FileUploader.prototype._nextIndex;
    /** @type {?} */
    FileUploader.prototype.autoUpload;
    /** @type {?} */
    FileUploader.prototype.authTokenHeader;
    /** @type {?} */
    FileUploader.prototype.response;
    /** @type {?} */
    FileUploader.prototype.options;
    /**
     * @type {?}
     * @protected
     */
    FileUploader.prototype._failFilterIndex;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWRlci5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1maWxlLXVwbG9hZC8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkZXIuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7O0FBRTdDLFNBQVMsTUFBTSxDQUFDLEtBQVU7SUFDeEIsT0FBTyxDQUFDLElBQUksSUFBSSxLQUFLLFlBQVksSUFBSSxDQUFDLENBQUM7QUFDekMsQ0FBQzs7OztBQUVELDZCQUdDOzs7SUFGQyx1QkFBYTs7SUFDYix3QkFBYzs7Ozs7QUFVaEIseUNBb0JDOzs7SUFuQkMsOENBQTJCOztJQUMzQiw4Q0FBMkI7O0lBQzNCLHlDQUFxQjs7SUFDckIsc0NBQWtCOztJQUNsQixzQ0FBMkI7O0lBQzNCLHNDQUFvQjs7SUFDcEIscUNBQWdCOztJQUNoQix3Q0FBbUI7O0lBQ25CLDBDQUFxQjs7SUFDckIseUNBQW9COztJQUNwQixnREFBNEI7O0lBQzVCLGtDQUFhOztJQUNiLCtDQUEyQjs7SUFDM0Isd0NBQW1COztJQUNuQiw4Q0FBeUI7O0lBQ3pCLGtEQUErQzs7SUFDL0Msb0RBQWdDOztJQUNoQyxpREFBOEI7O0lBQzlCLHdEQUFvQzs7QUFHdEMsTUFBTSxPQUFPLFlBQVk7Ozs7SUF1QnZCLFlBQW1CLE9BQTRCO1FBcEJ4QyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBQ3ZCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUt2QixZQUFP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QUE4QjtRQUN0RyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0Y7OztJQXBjQyxpQ0FBeUI7O0lBQ3pCLG1DQUFvQzs7SUFDcEMsNkJBQThCOztJQUM5QixnQ0FBNEI7O0lBQzVCLGtDQUE4Qjs7SUFDOUIsa0NBQXVCOztJQUN2Qix1Q0FBK0I7O0lBQy9CLGdDQUFtQzs7SUFFbkMsK0JBUUU7Ozs7O0lBRUYsd0NBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWxlTGlrZU9iamVjdCB9IGZyb20gJy4vZmlsZS1saWtlLW9iamVjdC5jbGFzcyc7XG5pbXBvcnQgeyBGaWxlSXRlbSB9IGZyb20gJy4vZmlsZS1pdGVtLmNsYXNzJztcbmltcG9ydCB7IEZpbGVUeXBlIH0gZnJvbSAnLi9maWxlLXR5cGUuY2xhc3MnO1xuXG5mdW5jdGlvbiBpc0ZpbGUodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gKEZpbGUgJiYgdmFsdWUgaW5zdGFuY2VvZiBGaWxlKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIZWFkZXJzIHtcbiAgbmFtZTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBQYXJzZWRSZXNwb25zZUhlYWRlcnMgPSB7IFsgaGVhZGVyRmllbGROYW1lOiBzdHJpbmcgXTogc3RyaW5nIH07XG5cbmV4cG9ydCB0eXBlIEZpbHRlckZ1bmN0aW9uID0ge1xuICBuYW1lOiBzdHJpbmcsXG4gIGZuOiAoaXRlbT86IEZpbGVMaWtlT2JqZWN0LCBvcHRpb25zPzogRmlsZVVwbG9hZGVyT3B0aW9ucykgPT4gYm9vbGVhblxufTtcblxuZXhwb3J0IGludGVyZmFjZSBGaWxlVXBsb2FkZXJPcHRpb25zIHtcbiAgYWxsb3dlZE1pbWVUeXBlPzogc3RyaW5nW107XG4gIGFsbG93ZWRGaWxlVHlwZT86IHN0cmluZ1tdO1xuICBhdXRvVXBsb2FkPzogYm9vbGVhbjtcbiAgaXNIVE1MNT86IGJvb2xlYW47XG4gIGZpbHRlcnM/OiBGaWx0ZXJGdW5jdGlvbltdO1xuICBoZWFkZXJzPzogSGVhZGVyc1tdO1xuICBtZXRob2Q/OiBzdHJpbmc7XG4gIGF1dGhUb2tlbj86IHN0cmluZztcbiAgbWF4RmlsZVNpemU/OiBudW1iZXI7XG4gIHF1ZXVlTGltaXQ/OiBudW1iZXI7XG4gIHJlbW92ZUFmdGVyVXBsb2FkPzogYm9vbGVhbjtcbiAgdXJsPzogc3RyaW5nO1xuICBkaXNhYmxlTXVsdGlwYXJ0PzogYm9vbGVhbjtcbiAgaXRlbUFsaWFzPzogc3RyaW5nO1xuICBhdXRoVG9rZW5IZWFkZXI/OiBzdHJpbmc7XG4gIGFkZGl0aW9uYWxQYXJhbWV0ZXI/OiB7IFsga2V5OiBzdHJpbmcgXTogYW55IH07XG4gIHBhcmFtZXRlcnNCZWZvcmVGaWxlcz86IGJvb2xlYW47XG4gIGZvcm1hdERhdGFGdW5jdGlvbj86IEZ1bmN0aW9uO1xuICBmb3JtYXREYXRhRnVuY3Rpb25Jc0FzeW5jPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRlciB7XG5cbiAgcHVibGljIGF1dGhUb2tlbjogc3RyaW5nO1xuICBwdWJsaWMgaXNVcGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHF1ZXVlOiBGaWxlSXRlbVtdID0gW107XG4gIHB1YmxpYyBwcm9ncmVzczogbnVtYmVyID0gMDtcbiAgcHVibGljIF9uZXh0SW5kZXg6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBhdXRvVXBsb2FkOiBhbnk7XG4gIHB1YmxpYyBhdXRoVG9rZW5IZWFkZXI6IHN0cmluZztcbiAgcHVibGljIHJlc3BvbnNlOiBFdmVudEVtaXR0ZXI8YW55PjtcblxuICBwdWJsaWMgb3B0aW9uczogRmlsZVVwbG9hZGVyT3B0aW9ucyA9IHtcbiAgICBhdXRvVXBsb2FkOiBmYWxzZSxcbiAgICBpc0hUTUw1OiB0cnVlLFxuICAgIGZpbHRlcnM6IFtdLFxuICAgIHJlbW92ZUFmdGVyVXBsb2FkOiBmYWxzZSxcbiAgICBkaXNhYmxlTXVsdGlwYXJ0OiBmYWxzZSxcbiAgICBmb3JtYXREYXRhRnVuY3Rpb246IChpdGVtOiBGaWxlSXRlbSkgPT4gaXRlbS5fZmlsZSxcbiAgICBmb3JtYXREYXRhRnVuY3Rpb25Jc0FzeW5jOiBmYWxzZVxuICB9O1xuXG4gIHByb3RlY3RlZCBfZmFpbEZpbHRlckluZGV4OiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEZpbGVVcGxvYWRlck9wdGlvbnMpIHtcbiAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5yZXNwb25zZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICB9XG5cbiAgcHVibGljIHNldE9wdGlvbnMob3B0aW9uczogRmlsZVVwbG9hZGVyT3B0aW9ucyk6IHZvaWQge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgIHRoaXMuYXV0aFRva2VuID0gdGhpcy5vcHRpb25zLmF1dGhUb2tlbjtcbiAgICB0aGlzLmF1dGhUb2tlbkhlYWRlciA9IHRoaXMub3B0aW9ucy5hdXRoVG9rZW5IZWFkZXIgfHwgJ0F1dGhvcml6YXRpb24nO1xuICAgIHRoaXMuYXV0b1VwbG9hZCA9IHRoaXMub3B0aW9ucy5hdXRvVXBsb2FkO1xuICAgIHRoaXMub3B0aW9ucy5maWx0ZXJzLnVuc2hpZnQoeyBuYW1lOiAncXVldWVMaW1pdCcsIGZuOiB0aGlzLl9xdWV1ZUxpbWl0RmlsdGVyIH0pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tYXhGaWxlU2l6ZSkge1xuICAgICAgdGhpcy5vcHRpb25zLmZpbHRlcnMudW5zaGlmdCh7IG5hbWU6ICdmaWxlU2l6ZScsIGZuOiB0aGlzLl9maWxlU2l6ZUZpbHRlciB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmFsbG93ZWRGaWxlVHlwZSkge1xuICAgICAgdGhpcy5vcHRpb25zLmZpbHRlcnMudW5zaGlmdCh7IG5hbWU6ICdmaWxlVHlwZScsIGZuOiB0aGlzLl9maWxlVHlwZUZpbHRlciB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmFsbG93ZWRNaW1lVHlwZSkge1xuICAgICAgdGhpcy5vcHRpb25zLmZpbHRlcnMudW5zaGlmdCh7IG5hbWU6ICdtaW1lVHlwZScsIGZuOiB0aGlzLl9taW1lVHlwZUZpbHRlciB9KTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMucXVldWVbIGkgXS51cmwgPSB0aGlzLm9wdGlvbnMudXJsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRUb1F1ZXVlKGZpbGVzOiBGaWxlW10sIG9wdGlvbnM/OiBGaWxlVXBsb2FkZXJPcHRpb25zLCBmaWx0ZXJzPzogRmlsdGVyRnVuY3Rpb25bXSB8IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBsaXN0OiBGaWxlW10gPSBbXTtcbiAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICBsaXN0LnB1c2goZmlsZSk7XG4gICAgfVxuICAgIGxldCBhcnJheU9mRmlsdGVycyA9IHRoaXMuX2dldEZpbHRlcnMoZmlsdGVycyk7XG4gICAgbGV0IGNvdW50ID0gdGhpcy5xdWV1ZS5sZW5ndGg7XG4gICAgbGV0IGFkZGVkRmlsZUl0ZW1zOiBGaWxlSXRlbVtdID0gW107XG4gICAgbGlzdC5tYXAoKHNvbWU6IEZpbGUpID0+IHtcbiAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgfVxuXG4gICAgICBsZXQgdGVtcCA9IG5ldyBGaWxlTGlrZU9iamVjdChzb21lKTtcbiAgICAgIGlmICh0aGlzLl9pc1ZhbGlkRmlsZSh0ZW1wLCBhcnJheU9mRmlsdGVycywgb3B0aW9ucykpIHtcbiAgICAgICAgbGV0IGZpbGVJdGVtID0gbmV3IEZpbGVJdGVtKHRoaXMsIHNvbWUsIG9wdGlvbnMpO1xuICAgICAgICBhZGRlZEZpbGVJdGVtcy5wdXNoKGZpbGVJdGVtKTtcbiAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKGZpbGVJdGVtKTtcbiAgICAgICAgdGhpcy5fb25BZnRlckFkZGluZ0ZpbGUoZmlsZUl0ZW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGZpbHRlciA9IGFycmF5T2ZGaWx0ZXJzWyB0aGlzLl9mYWlsRmlsdGVySW5kZXggXTtcbiAgICAgICAgdGhpcy5fb25XaGVuQWRkaW5nRmlsZUZhaWxlZCh0ZW1wLCBmaWx0ZXIsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0aGlzLnF1ZXVlLmxlbmd0aCAhPT0gY291bnQpIHtcbiAgICAgIHRoaXMuX29uQWZ0ZXJBZGRpbmdBbGwoYWRkZWRGaWxlSXRlbXMpO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IHRoaXMuX2dldFRvdGFsUHJvZ3Jlc3MoKTtcbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvVXBsb2FkKSB7XG4gICAgICB0aGlzLnVwbG9hZEFsbCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVGcm9tUXVldWUodmFsdWU6IEZpbGVJdGVtKTogdm9pZCB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleE9mSXRlbSh2YWx1ZSk7XG4gICAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlWyBpbmRleCBdO1xuICAgIGlmIChpdGVtLmlzVXBsb2FkaW5nKSB7XG4gICAgICBpdGVtLmNhbmNlbCgpO1xuICAgIH1cbiAgICB0aGlzLnF1ZXVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5wcm9ncmVzcyA9IHRoaXMuX2dldFRvdGFsUHJvZ3Jlc3MoKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclF1ZXVlKCk6IHZvaWQge1xuICAgIHdoaWxlICh0aGlzLnF1ZXVlLmxlbmd0aCkge1xuICAgICAgdGhpcy5xdWV1ZVsgMCBdLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgfVxuXG4gIHB1YmxpYyB1cGxvYWRJdGVtKHZhbHVlOiBGaWxlSXRlbSk6IHZvaWQge1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkl0ZW0odmFsdWUpO1xuICAgIGxldCBpdGVtID0gdGhpcy5xdWV1ZVsgaW5kZXggXTtcbiAgICBsZXQgdHJhbnNwb3J0ID0gdGhpcy5vcHRpb25zLmlzSFRNTDUgPyAnX3hoclRyYW5zcG9ydCcgOiAnX2lmcmFtZVRyYW5zcG9ydCc7XG4gICAgaXRlbS5fcHJlcGFyZVRvVXBsb2FkaW5nKCk7XG4gICAgaWYgKHRoaXMuaXNVcGxvYWRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pc1VwbG9hZGluZyA9IHRydWU7XG4gICAgKHRoaXMgYXMgYW55KVsgdHJhbnNwb3J0IF0oaXRlbSk7XG4gIH1cblxuICBwdWJsaWMgY2FuY2VsSXRlbSh2YWx1ZTogRmlsZUl0ZW0pOiB2b2lkIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZJdGVtKHZhbHVlKTtcbiAgICBsZXQgaXRlbSA9IHRoaXMucXVldWVbIGluZGV4IF07XG4gICAgbGV0IHByb3AgPSB0aGlzLm9wdGlvbnMuaXNIVE1MNSA/IGl0ZW0uX3hociA6IGl0ZW0uX2Zvcm07XG4gICAgaWYgKGl0ZW0gJiYgaXRlbS5pc1VwbG9hZGluZykge1xuICAgICAgcHJvcC5hYm9ydCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGxvYWRBbGwoKTogdm9pZCB7XG4gICAgbGV0IGl0ZW1zID0gdGhpcy5nZXROb3RVcGxvYWRlZEl0ZW1zKCkuZmlsdGVyKChpdGVtOiBGaWxlSXRlbSkgPT4gIWl0ZW0uaXNVcGxvYWRpbmcpO1xuICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGl0ZW1zLm1hcCgoaXRlbTogRmlsZUl0ZW0pID0+IGl0ZW0uX3ByZXBhcmVUb1VwbG9hZGluZygpKTtcbiAgICBpdGVtc1sgMCBdLnVwbG9hZCgpO1xuICB9XG5cbiAgcHVibGljIGNhbmNlbEFsbCgpOiB2b2lkIHtcbiAgICBsZXQgaXRlbXMgPSB0aGlzLmdldE5vdFVwbG9hZGVkSXRlbXMoKTtcbiAgICBpdGVtcy5tYXAoKGl0ZW06IEZpbGVJdGVtKSA9PiBpdGVtLmNhbmNlbCgpKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0ZpbGUodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0ZpbGUodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGlzRmlsZUxpa2VPYmplY3QodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGVMaWtlT2JqZWN0O1xuICB9XG5cbiAgcHVibGljIGdldEluZGV4T2ZJdGVtKHZhbHVlOiBhbnkpOiBudW1iZXIge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gdmFsdWUgOiB0aGlzLnF1ZXVlLmluZGV4T2YodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldE5vdFVwbG9hZGVkSXRlbXMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlLmZpbHRlcigoaXRlbTogRmlsZUl0ZW0pID0+ICFpdGVtLmlzVXBsb2FkZWQpO1xuICB9XG5cbiAgcHVibGljIGdldFJlYWR5SXRlbXMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlXG4gICAgICAuZmlsdGVyKChpdGVtOiBGaWxlSXRlbSkgPT4gKGl0ZW0uaXNSZWFkeSAmJiAhaXRlbS5pc1VwbG9hZGluZykpXG4gICAgICAuc29ydCgoaXRlbTE6IGFueSwgaXRlbTI6IGFueSkgPT4gaXRlbTEuaW5kZXggLSBpdGVtMi5pbmRleCk7XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG5cbiAgcHVibGljIG9uQWZ0ZXJBZGRpbmdBbGwoZmlsZUl0ZW1zOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB7IGZpbGVJdGVtcyB9O1xuICB9XG5cbiAgcHVibGljIG9uQnVpbGRJdGVtRm9ybShmaWxlSXRlbTogRmlsZUl0ZW0sIGZvcm06IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHsgZmlsZUl0ZW0sIGZvcm0gfTtcbiAgfVxuXG4gIHB1YmxpYyBvbkFmdGVyQWRkaW5nRmlsZShmaWxlSXRlbTogRmlsZUl0ZW0pOiBhbnkge1xuICAgIHJldHVybiB7IGZpbGVJdGVtIH07XG4gIH1cblxuICBwdWJsaWMgb25XaGVuQWRkaW5nRmlsZUZhaWxlZChpdGVtOiBGaWxlTGlrZU9iamVjdCwgZmlsdGVyOiBhbnksIG9wdGlvbnM6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHsgaXRlbSwgZmlsdGVyLCBvcHRpb25zIH07XG4gIH1cblxuICBwdWJsaWMgb25CZWZvcmVVcGxvYWRJdGVtKGZpbGVJdGVtOiBGaWxlSXRlbSk6IGFueSB7XG4gICAgcmV0dXJuIHsgZmlsZUl0ZW0gfTtcbiAgfVxuXG4gIHB1YmxpYyBvblByb2dyZXNzSXRlbShmaWxlSXRlbTogRmlsZUl0ZW0sIHByb2dyZXNzOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB7IGZpbGVJdGVtLCBwcm9ncmVzcyB9O1xuICB9XG5cbiAgcHVibGljIG9uUHJvZ3Jlc3NBbGwocHJvZ3Jlc3M6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHsgcHJvZ3Jlc3MgfTtcbiAgfVxuXG4gIHB1YmxpYyBvblN1Y2Nlc3NJdGVtKGl0ZW06IEZpbGVJdGVtLCByZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogYW55IHtcbiAgICByZXR1cm4geyBpdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzIH07XG4gIH1cblxuICBwdWJsaWMgb25FcnJvckl0ZW0oaXRlbTogRmlsZUl0ZW0sIHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiBhbnkge1xuICAgIHJldHVybiB7IGl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNhbmNlbEl0ZW0oaXRlbTogRmlsZUl0ZW0sIHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiBhbnkge1xuICAgIHJldHVybiB7IGl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNvbXBsZXRlSXRlbShpdGVtOiBGaWxlSXRlbSwgcmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHsgaXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyB9O1xuICB9XG5cbiAgcHVibGljIG9uQ29tcGxldGVBbGwoKTogYW55IHtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG5cbiAgcHVibGljIF9taW1lVHlwZUZpbHRlcihpdGVtOiBGaWxlTGlrZU9iamVjdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKHRoaXMub3B0aW9ucy5hbGxvd2VkTWltZVR5cGUgJiYgdGhpcy5vcHRpb25zLmFsbG93ZWRNaW1lVHlwZS5pbmRleE9mKGl0ZW0udHlwZSkgPT09IC0xKTtcbiAgfVxuXG4gIHB1YmxpYyBfZmlsZVNpemVGaWx0ZXIoaXRlbTogRmlsZUxpa2VPYmplY3QpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISh0aGlzLm9wdGlvbnMubWF4RmlsZVNpemUgJiYgaXRlbS5zaXplID4gdGhpcy5vcHRpb25zLm1heEZpbGVTaXplKTtcbiAgfVxuXG4gIHB1YmxpYyBfZmlsZVR5cGVGaWx0ZXIoaXRlbTogRmlsZUxpa2VPYmplY3QpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISh0aGlzLm9wdGlvbnMuYWxsb3dlZEZpbGVUeXBlICYmXG4gICAgICB0aGlzLm9wdGlvbnMuYWxsb3dlZEZpbGVUeXBlLmluZGV4T2YoRmlsZVR5cGUuZ2V0TWltZUNsYXNzKGl0ZW0pKSA9PT0gLTEpO1xuICB9XG5cbiAgcHVibGljIF9vbkVycm9ySXRlbShpdGVtOiBGaWxlSXRlbSwgcmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHZvaWQge1xuICAgIGl0ZW0uX29uRXJyb3IocmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gICAgdGhpcy5vbkVycm9ySXRlbShpdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyBfb25Db21wbGV0ZUl0ZW0oaXRlbTogRmlsZUl0ZW0sIHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiB2b2lkIHtcbiAgICBpdGVtLl9vbkNvbXBsZXRlKHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuICAgIHRoaXMub25Db21wbGV0ZUl0ZW0oaXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gICAgbGV0IG5leHRJdGVtID0gdGhpcy5nZXRSZWFkeUl0ZW1zKClbIDAgXTtcbiAgICB0aGlzLmlzVXBsb2FkaW5nID0gZmFsc2U7XG4gICAgaWYgKG5leHRJdGVtKSB7XG4gICAgICBuZXh0SXRlbS51cGxvYWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5vbkNvbXBsZXRlQWxsKCk7XG4gICAgdGhpcy5wcm9ncmVzcyA9IHRoaXMuX2dldFRvdGFsUHJvZ3Jlc3MoKTtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaGVhZGVyc0dldHRlcihwYXJzZWRIZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiBhbnkge1xuICAgIHJldHVybiAobmFtZTogYW55KTogYW55ID0+IHtcbiAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBwYXJzZWRIZWFkZXJzWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSB8fCB2b2lkIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFyc2VkSGVhZGVycztcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIF94aHJUcmFuc3BvcnQoaXRlbTogRmlsZUl0ZW0pOiBhbnkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBsZXQgeGhyID0gaXRlbS5feGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgbGV0IHNlbmRhYmxlOiBhbnk7XG4gICAgdGhpcy5fb25CZWZvcmVVcGxvYWRJdGVtKGl0ZW0pO1xuXG4gICAgaWYgKHR5cGVvZiBpdGVtLl9maWxlLnNpemUgIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgZmlsZSBzcGVjaWZpZWQgaXMgbm8gbG9uZ2VyIHZhbGlkJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5vcHRpb25zLmRpc2FibGVNdWx0aXBhcnQpIHtcbiAgICAgIHNlbmRhYmxlID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICB0aGlzLl9vbkJ1aWxkSXRlbUZvcm0oaXRlbSwgc2VuZGFibGUpO1xuXG4gICAgICBjb25zdCBhcHBlbmRGaWxlID0gKCkgPT4gc2VuZGFibGUuYXBwZW5kKGl0ZW0uYWxpYXMsIGl0ZW0uX2ZpbGUsIGl0ZW0uZmlsZS5uYW1lKTtcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLnBhcmFtZXRlcnNCZWZvcmVGaWxlcykge1xuICAgICAgICBhcHBlbmRGaWxlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEZvciBBV1MsIEFkZGl0aW9uYWwgUGFyYW1ldGVycyBtdXN0IGNvbWUgQkVGT1JFIEZpbGVzXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxQYXJhbWV0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbFBhcmFtZXRlcikuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBsZXQgcGFyYW1WYWwgPSB0aGlzLm9wdGlvbnMuYWRkaXRpb25hbFBhcmFtZXRlclsga2V5IF07XG4gICAgICAgICAgLy8gQWxsb3cgYW4gYWRkaXRpb25hbCBwYXJhbWV0ZXIgdG8gaW5jbHVkZSB0aGUgZmlsZW5hbWVcbiAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtVmFsID09PSAnc3RyaW5nJyAmJiBwYXJhbVZhbC5pbmRleE9mKCd7e2ZpbGVfbmFtZX19JykgPj0gMCkge1xuICAgICAgICAgICAgcGFyYW1WYWwgPSBwYXJhbVZhbC5yZXBsYWNlKCd7e2ZpbGVfbmFtZX19JywgaXRlbS5maWxlLm5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZW5kYWJsZS5hcHBlbmQoa2V5LCBwYXJhbVZhbCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnBhcmFtZXRlcnNCZWZvcmVGaWxlcykge1xuICAgICAgICBhcHBlbmRGaWxlKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbmRhYmxlID0gdGhpcy5vcHRpb25zLmZvcm1hdERhdGFGdW5jdGlvbihpdGVtKTtcbiAgICB9XG5cbiAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgbGV0IHByb2dyZXNzID0gTWF0aC5yb3VuZChldmVudC5sZW5ndGhDb21wdXRhYmxlID8gZXZlbnQubG9hZGVkICogMTAwIC8gZXZlbnQudG90YWwgOiAwKTtcbiAgICAgIHRoaXMuX29uUHJvZ3Jlc3NJdGVtKGl0ZW0sIHByb2dyZXNzKTtcbiAgICB9O1xuICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsZXQgaGVhZGVycyA9IHRoaXMuX3BhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICAgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5fdHJhbnNmb3JtUmVzcG9uc2UoeGhyLnJlc3BvbnNlLCBoZWFkZXJzKTtcbiAgICAgIGxldCBnaXN0ID0gdGhpcy5faXNTdWNjZXNzQ29kZSh4aHIuc3RhdHVzKSA/ICdTdWNjZXNzJyA6ICdFcnJvcic7XG4gICAgICBsZXQgbWV0aG9kID0gJ19vbicgKyBnaXN0ICsgJ0l0ZW0nO1xuICAgICAgKHRoaXMgYXMgYW55KVsgbWV0aG9kIF0oaXRlbSwgcmVzcG9uc2UsIHhoci5zdGF0dXMsIGhlYWRlcnMpO1xuICAgICAgdGhpcy5fb25Db21wbGV0ZUl0ZW0oaXRlbSwgcmVzcG9uc2UsIHhoci5zdGF0dXMsIGhlYWRlcnMpO1xuICAgIH07XG4gICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICBsZXQgaGVhZGVycyA9IHRoaXMuX3BhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICAgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5fdHJhbnNmb3JtUmVzcG9uc2UoeGhyLnJlc3BvbnNlLCBoZWFkZXJzKTtcbiAgICAgIHRoaXMuX29uRXJyb3JJdGVtKGl0ZW0sIHJlc3BvbnNlLCB4aHIuc3RhdHVzLCBoZWFkZXJzKTtcbiAgICAgIHRoaXMuX29uQ29tcGxldGVJdGVtKGl0ZW0sIHJlc3BvbnNlLCB4aHIuc3RhdHVzLCBoZWFkZXJzKTtcbiAgICB9O1xuICAgIHhoci5vbmFib3J0ID0gKCkgPT4ge1xuICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLl9wYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgICAgIGxldCByZXNwb25zZSA9IHRoaXMuX3RyYW5zZm9ybVJlc3BvbnNlKHhoci5yZXNwb25zZSwgaGVhZGVycyk7XG4gICAgICB0aGlzLl9vbkNhbmNlbEl0ZW0oaXRlbSwgcmVzcG9uc2UsIHhoci5zdGF0dXMsIGhlYWRlcnMpO1xuICAgICAgdGhpcy5fb25Db21wbGV0ZUl0ZW0oaXRlbSwgcmVzcG9uc2UsIHhoci5zdGF0dXMsIGhlYWRlcnMpO1xuICAgIH07XG4gICAgeGhyLm9wZW4oaXRlbS5tZXRob2QsIGl0ZW0udXJsLCB0cnVlKTtcbiAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gaXRlbS53aXRoQ3JlZGVudGlhbHM7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICBmb3IgKGxldCBoZWFkZXIgb2YgdGhpcy5vcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLm5hbWUsIGhlYWRlci52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpdGVtLmhlYWRlcnMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBoZWFkZXIgb2YgaXRlbS5oZWFkZXJzKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlci5uYW1lLCBoZWFkZXIudmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5hdXRoVG9rZW4pIHtcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKHRoaXMuYXV0aFRva2VuSGVhZGVyLCB0aGlzLmF1dGhUb2tlbik7XG4gICAgfVxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgICB0aGF0LnJlc3BvbnNlLmVtaXQoeGhyLnJlc3BvbnNlVGV4dClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5mb3JtYXREYXRhRnVuY3Rpb25Jc0FzeW5jKSB7XG4gICAgICBzZW5kYWJsZS50aGVuKFxuICAgICAgICAocmVzdWx0OiBhbnkpID0+IHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB4aHIuc2VuZChzZW5kYWJsZSk7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRUb3RhbFByb2dyZXNzKHZhbHVlOiBudW1iZXIgPSAwKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnJlbW92ZUFmdGVyVXBsb2FkKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGxldCBub3RVcGxvYWRlZCA9IHRoaXMuZ2V0Tm90VXBsb2FkZWRJdGVtcygpLmxlbmd0aDtcbiAgICBsZXQgdXBsb2FkZWQgPSBub3RVcGxvYWRlZCA/IHRoaXMucXVldWUubGVuZ3RoIC0gbm90VXBsb2FkZWQgOiB0aGlzLnF1ZXVlLmxlbmd0aDtcbiAgICBsZXQgcmF0aW8gPSAxMDAgLyB0aGlzLnF1ZXVlLmxlbmd0aDtcbiAgICBsZXQgY3VycmVudCA9IHZhbHVlICogcmF0aW8gLyAxMDA7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodXBsb2FkZWQgKiByYXRpbyArIGN1cnJlbnQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRGaWx0ZXJzKGZpbHRlcnM6IEZpbHRlckZ1bmN0aW9uW10gfCBzdHJpbmcpOiBGaWx0ZXJGdW5jdGlvbltdIHtcbiAgICBpZiAoIWZpbHRlcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsdGVycztcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVycykpIHtcbiAgICAgIHJldHVybiBmaWx0ZXJzO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGZpbHRlcnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbmFtZXMgPSBmaWx0ZXJzLm1hdGNoKC9bXlxccyxdKy9nKTtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsdGVyc1xuICAgICAgICAuZmlsdGVyKChmaWx0ZXI6IGFueSkgPT4gbmFtZXMuaW5kZXhPZihmaWx0ZXIubmFtZSkgIT09IC0xKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maWx0ZXJzO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9yZW5kZXIoKTogYW55IHtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9xdWV1ZUxpbWl0RmlsdGVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucXVldWVMaW1pdCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucXVldWUubGVuZ3RoIDwgdGhpcy5vcHRpb25zLnF1ZXVlTGltaXQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2lzVmFsaWRGaWxlKGZpbGU6IEZpbGVMaWtlT2JqZWN0LCBmaWx0ZXJzOiBGaWx0ZXJGdW5jdGlvbltdLCBvcHRpb25zOiBGaWxlVXBsb2FkZXJPcHRpb25zKTogYm9vbGVhbiB7XG4gICAgdGhpcy5fZmFpbEZpbHRlckluZGV4ID0gLTE7XG4gICAgcmV0dXJuICFmaWx0ZXJzLmxlbmd0aCA/IHRydWUgOiBmaWx0ZXJzLmV2ZXJ5KChmaWx0ZXI6IEZpbHRlckZ1bmN0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9mYWlsRmlsdGVySW5kZXgrKztcbiAgICAgIHJldHVybiBmaWx0ZXIuZm4uY2FsbCh0aGlzLCBmaWxlLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaXNTdWNjZXNzQ29kZShzdGF0dXM6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDApIHx8IHN0YXR1cyA9PT0gMzA0O1xuICB9XG5cbiAgcHJvdGVjdGVkIF90cmFuc2Zvcm1SZXNwb25zZShyZXNwb25zZTogc3RyaW5nLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiBzdHJpbmcge1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VIZWFkZXJzKGhlYWRlcnM6IHN0cmluZyk6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyB7XG4gICAgbGV0IHBhcnNlZDogYW55ID0ge307XG4gICAgbGV0IGtleTogYW55O1xuICAgIGxldCB2YWw6IGFueTtcbiAgICBsZXQgaTogYW55O1xuICAgIGlmICghaGVhZGVycykge1xuICAgICAgcmV0dXJuIHBhcnNlZDtcbiAgICB9XG4gICAgaGVhZGVycy5zcGxpdCgnXFxuJykubWFwKChsaW5lOiBhbnkpID0+IHtcbiAgICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICAgIGtleSA9IGxpbmUuc2xpY2UoMCwgaSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICB2YWwgPSBsaW5lLnNsaWNlKGkgKyAxKS50cmltKCk7XG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHBhcnNlZFsga2V5IF0gPSBwYXJzZWRbIGtleSBdID8gcGFyc2VkWyBrZXkgXSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhcnNlZDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25XaGVuQWRkaW5nRmlsZUZhaWxlZChpdGVtOiBGaWxlTGlrZU9iamVjdCwgZmlsdGVyOiBhbnksIG9wdGlvbnM6IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25XaGVuQWRkaW5nRmlsZUZhaWxlZChpdGVtLCBmaWx0ZXIsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vbkFmdGVyQWRkaW5nRmlsZShpdGVtOiBGaWxlSXRlbSk6IHZvaWQge1xuICAgIHRoaXMub25BZnRlckFkZGluZ0ZpbGUoaXRlbSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uQWZ0ZXJBZGRpbmdBbGwoaXRlbXM6IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25BZnRlckFkZGluZ0FsbChpdGVtcyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uQmVmb3JlVXBsb2FkSXRlbShpdGVtOiBGaWxlSXRlbSk6IHZvaWQge1xuICAgIGl0ZW0uX29uQmVmb3JlVXBsb2FkKCk7XG4gICAgdGhpcy5vbkJlZm9yZVVwbG9hZEl0ZW0oaXRlbSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uQnVpbGRJdGVtRm9ybShpdGVtOiBGaWxlSXRlbSwgZm9ybTogYW55KTogdm9pZCB7XG4gICAgaXRlbS5fb25CdWlsZEZvcm0oZm9ybSk7XG4gICAgdGhpcy5vbkJ1aWxkSXRlbUZvcm0oaXRlbSwgZm9ybSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uUHJvZ3Jlc3NJdGVtKGl0ZW06IEZpbGVJdGVtLCBwcm9ncmVzczogYW55KTogdm9pZCB7XG4gICAgbGV0IHRvdGFsID0gdGhpcy5fZ2V0VG90YWxQcm9ncmVzcyhwcm9ncmVzcyk7XG4gICAgdGhpcy5wcm9ncmVzcyA9IHRvdGFsO1xuICAgIGl0ZW0uX29uUHJvZ3Jlc3MocHJvZ3Jlc3MpO1xuICAgIHRoaXMub25Qcm9ncmVzc0l0ZW0oaXRlbSwgcHJvZ3Jlc3MpO1xuICAgIHRoaXMub25Qcm9ncmVzc0FsbCh0b3RhbCk7XG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uU3VjY2Vzc0l0ZW0oaXRlbTogRmlsZUl0ZW0sIHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiB2b2lkIHtcbiAgICBpdGVtLl9vblN1Y2Nlc3MocmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gICAgdGhpcy5vblN1Y2Nlc3NJdGVtKGl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vbkNhbmNlbEl0ZW0oaXRlbTogRmlsZUl0ZW0sIHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiB2b2lkIHtcbiAgICBpdGVtLl9vbkNhbmNlbChyZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcbiAgICB0aGlzLm9uQ2FuY2VsSXRlbShpdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcbiAgfVxufVxuIl19