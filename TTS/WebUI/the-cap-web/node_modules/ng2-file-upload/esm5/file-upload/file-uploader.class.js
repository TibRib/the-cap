var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
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
var FileUploader = /** @class */ (function () {
    function FileUploader(options) {
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
            function (item) { return item._file; }),
            formatDataFunctionIsAsync: false
        };
        this.setOptions(options);
        this.response = new EventEmitter();
    }
    /**
     * @param {?} options
     * @return {?}
     */
    FileUploader.prototype.setOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
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
        for (var i = 0; i < this.queue.length; i++) {
            this.queue[i].url = this.options.url;
        }
    };
    /**
     * @param {?} files
     * @param {?=} options
     * @param {?=} filters
     * @return {?}
     */
    FileUploader.prototype.addToQueue = /**
     * @param {?} files
     * @param {?=} options
     * @param {?=} filters
     * @return {?}
     */
    function (files, options, filters) {
        var e_1, _a;
        var _this = this;
        /** @type {?} */
        var list = [];
        try {
            for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                var file = files_1_1.value;
                list.push(file);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        /** @type {?} */
        var arrayOfFilters = this._getFilters(filters);
        /** @type {?} */
        var count = this.queue.length;
        /** @type {?} */
        var addedFileItems = [];
        list.map((/**
         * @param {?} some
         * @return {?}
         */
        function (some) {
            if (!options) {
                options = _this.options;
            }
            /** @type {?} */
            var temp = new FileLikeObject(some);
            if (_this._isValidFile(temp, arrayOfFilters, options)) {
                /** @type {?} */
                var fileItem = new FileItem(_this, some, options);
                addedFileItems.push(fileItem);
                _this.queue.push(fileItem);
                _this._onAfterAddingFile(fileItem);
            }
            else {
                /** @type {?} */
                var filter = arrayOfFilters[_this._failFilterIndex];
                _this._onWhenAddingFileFailed(temp, filter, options);
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
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FileUploader.prototype.removeFromQueue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var index = this.getIndexOfItem(value);
        /** @type {?} */
        var item = this.queue[index];
        if (item.isUploading) {
            item.cancel();
        }
        this.queue.splice(index, 1);
        this.progress = this._getTotalProgress();
    };
    /**
     * @return {?}
     */
    FileUploader.prototype.clearQueue = /**
     * @return {?}
     */
    function () {
        while (this.queue.length) {
            this.queue[0].remove();
        }
        this.progress = 0;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FileUploader.prototype.uploadItem = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var index = this.getIndexOfItem(value);
        /** @type {?} */
        var item = this.queue[index];
        /** @type {?} */
        var transport = this.options.isHTML5 ? '_xhrTransport' : '_iframeTransport';
        item._prepareToUploading();
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        ((/** @type {?} */ (this)))[transport](item);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FileUploader.prototype.cancelItem = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var index = this.getIndexOfItem(value);
        /** @type {?} */
        var item = this.queue[index];
        /** @type {?} */
        var prop = this.options.isHTML5 ? item._xhr : item._form;
        if (item && item.isUploading) {
            prop.abort();
        }
    };
    /**
     * @return {?}
     */
    FileUploader.prototype.uploadAll = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var items = this.getNotUploadedItems().filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return !item.isUploading; }));
        if (!items.length) {
            return;
        }
        items.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item._prepareToUploading(); }));
        items[0].upload();
    };
    /**
     * @return {?}
     */
    FileUploader.prototype.cancelAll = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var items = this.getNotUploadedItems();
        items.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.cancel(); }));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FileUploader.prototype.isFile = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return isFile(value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FileUploader.prototype.isFileLikeObject = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value instanceof FileLikeObject;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FileUploader.prototype.getIndexOfItem = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'number' ? value : this.queue.indexOf(value);
    };
    /**
     * @return {?}
     */
    FileUploader.prototype.getNotUploadedItems = /**
     * @return {?}
     */
    function () {
        return this.queue.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return !item.isUploaded; }));
    };
    /**
     * @return {?}
     */
    FileUploader.prototype.getReadyItems = /**
     * @return {?}
     */
    function () {
        return this.queue
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return (item.isReady && !item.isUploading); }))
            .sort((/**
         * @param {?} item1
         * @param {?} item2
         * @return {?}
         */
        function (item1, item2) { return item1.index - item2.index; }));
    };
    /**
     * @return {?}
     */
    FileUploader.prototype.destroy = /**
     * @return {?}
     */
    function () {
        return void 0;
    };
    /**
     * @param {?} fileItems
     * @return {?}
     */
    FileUploader.prototype.onAfterAddingAll = /**
     * @param {?} fileItems
     * @return {?}
     */
    function (fileItems) {
        return { fileItems: fileItems };
    };
    /**
     * @param {?} fileItem
     * @param {?} form
     * @return {?}
     */
    FileUploader.prototype.onBuildItemForm = /**
     * @param {?} fileItem
     * @param {?} form
     * @return {?}
     */
    function (fileItem, form) {
        return { fileItem: fileItem, form: form };
    };
    /**
     * @param {?} fileItem
     * @return {?}
     */
    FileUploader.prototype.onAfterAddingFile = /**
     * @param {?} fileItem
     * @return {?}
     */
    function (fileItem) {
        return { fileItem: fileItem };
    };
    /**
     * @param {?} item
     * @param {?} filter
     * @param {?} options
     * @return {?}
     */
    FileUploader.prototype.onWhenAddingFileFailed = /**
     * @param {?} item
     * @param {?} filter
     * @param {?} options
     * @return {?}
     */
    function (item, filter, options) {
        return { item: item, filter: filter, options: options };
    };
    /**
     * @param {?} fileItem
     * @return {?}
     */
    FileUploader.prototype.onBeforeUploadItem = /**
     * @param {?} fileItem
     * @return {?}
     */
    function (fileItem) {
        return { fileItem: fileItem };
    };
    /**
     * @param {?} fileItem
     * @param {?} progress
     * @return {?}
     */
    FileUploader.prototype.onProgressItem = /**
     * @param {?} fileItem
     * @param {?} progress
     * @return {?}
     */
    function (fileItem, progress) {
        return { fileItem: fileItem, progress: progress };
    };
    /**
     * @param {?} progress
     * @return {?}
     */
    FileUploader.prototype.onProgressAll = /**
     * @param {?} progress
     * @return {?}
     */
    function (progress) {
        return { progress: progress };
    };
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype.onSuccessItem = /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype.onErrorItem = /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype.onCancelItem = /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype.onCompleteItem = /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    /**
     * @return {?}
     */
    FileUploader.prototype.onCompleteAll = /**
     * @return {?}
     */
    function () {
        return void 0;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    FileUploader.prototype._mimeTypeFilter = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    FileUploader.prototype._fileSizeFilter = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    FileUploader.prototype._fileTypeFilter = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return !(this.options.allowedFileType &&
            this.options.allowedFileType.indexOf(FileType.getMimeClass(item)) === -1);
    };
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype._onErrorItem = /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        item._onError(response, status, headers);
        this.onErrorItem(item, response, status, headers);
    };
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype._onCompleteItem = /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        item._onComplete(response, status, headers);
        this.onCompleteItem(item, response, status, headers);
        /** @type {?} */
        var nextItem = this.getReadyItems()[0];
        this.isUploading = false;
        if (nextItem) {
            nextItem.upload();
            return;
        }
        this.onCompleteAll();
        this.progress = this._getTotalProgress();
        this._render();
    };
    /**
     * @protected
     * @param {?} parsedHeaders
     * @return {?}
     */
    FileUploader.prototype._headersGetter = /**
     * @protected
     * @param {?} parsedHeaders
     * @return {?}
     */
    function (parsedHeaders) {
        return (/**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            if (name) {
                return parsedHeaders[name.toLowerCase()] || void 0;
            }
            return parsedHeaders;
        });
    };
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    FileUploader.prototype._xhrTransport = /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var e_2, _a, e_3, _b;
        var _this = this;
        /** @type {?} */
        var that = this;
        /** @type {?} */
        var xhr = item._xhr = new XMLHttpRequest();
        /** @type {?} */
        var sendable;
        this._onBeforeUploadItem(item);
        if (typeof item._file.size !== 'number') {
            throw new TypeError('The file specified is no longer valid');
        }
        if (!this.options.disableMultipart) {
            sendable = new FormData();
            this._onBuildItemForm(item, sendable);
            /** @type {?} */
            var appendFile = (/**
             * @return {?}
             */
            function () { return sendable.append(item.alias, item._file, item.file.name); });
            if (!this.options.parametersBeforeFiles) {
                appendFile();
            }
            // For AWS, Additional Parameters must come BEFORE Files
            if (this.options.additionalParameter !== undefined) {
                Object.keys(this.options.additionalParameter).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) {
                    /** @type {?} */
                    var paramVal = _this.options.additionalParameter[key];
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
        function (event) {
            /** @type {?} */
            var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            _this._onProgressItem(item, progress);
        });
        xhr.onload = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            var response = _this._transformResponse(xhr.response, headers);
            /** @type {?} */
            var gist = _this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            /** @type {?} */
            var method = '_on' + gist + 'Item';
            ((/** @type {?} */ (_this)))[method](item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.onerror = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            var response = _this._transformResponse(xhr.response, headers);
            _this._onErrorItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.onabort = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            var response = _this._transformResponse(xhr.response, headers);
            _this._onCancelItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.open(item.method, item.url, true);
        xhr.withCredentials = item.withCredentials;
        if (this.options.headers) {
            try {
                for (var _c = __values(this.options.headers), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var header = _d.value;
                    xhr.setRequestHeader(header.name, header.value);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (item.headers.length) {
            try {
                for (var _e = __values(item.headers), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var header = _f.value;
                    xhr.setRequestHeader(header.name, header.value);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
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
            function (result) { return xhr.send(JSON.stringify(result)); }));
        }
        else {
            xhr.send(sendable);
        }
        this._render();
    };
    /**
     * @protected
     * @param {?=} value
     * @return {?}
     */
    FileUploader.prototype._getTotalProgress = /**
     * @protected
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = 0; }
        if (this.options.removeAfterUpload) {
            return value;
        }
        /** @type {?} */
        var notUploaded = this.getNotUploadedItems().length;
        /** @type {?} */
        var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        /** @type {?} */
        var ratio = 100 / this.queue.length;
        /** @type {?} */
        var current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    };
    /**
     * @protected
     * @param {?} filters
     * @return {?}
     */
    FileUploader.prototype._getFilters = /**
     * @protected
     * @param {?} filters
     * @return {?}
     */
    function (filters) {
        if (!filters) {
            return this.options.filters;
        }
        if (Array.isArray(filters)) {
            return filters;
        }
        if (typeof filters === 'string') {
            /** @type {?} */
            var names_1 = filters.match(/[^\s,]+/g);
            return this.options.filters
                .filter((/**
             * @param {?} filter
             * @return {?}
             */
            function (filter) { return names_1.indexOf(filter.name) !== -1; }));
        }
        return this.options.filters;
    };
    /**
     * @protected
     * @return {?}
     */
    FileUploader.prototype._render = /**
     * @protected
     * @return {?}
     */
    function () {
        return void 0;
    };
    /**
     * @protected
     * @return {?}
     */
    FileUploader.prototype._queueLimitFilter = /**
     * @protected
     * @return {?}
     */
    function () {
        return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
    };
    /**
     * @protected
     * @param {?} file
     * @param {?} filters
     * @param {?} options
     * @return {?}
     */
    FileUploader.prototype._isValidFile = /**
     * @protected
     * @param {?} file
     * @param {?} filters
     * @param {?} options
     * @return {?}
     */
    function (file, filters, options) {
        var _this = this;
        this._failFilterIndex = -1;
        return !filters.length ? true : filters.every((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            _this._failFilterIndex++;
            return filter.fn.call(_this, file, options);
        }));
    };
    /**
     * @protected
     * @param {?} status
     * @return {?}
     */
    FileUploader.prototype._isSuccessCode = /**
     * @protected
     * @param {?} status
     * @return {?}
     */
    function (status) {
        return (status >= 200 && status < 300) || status === 304;
    };
    /**
     * @protected
     * @param {?} response
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype._transformResponse = /**
     * @protected
     * @param {?} response
     * @param {?} headers
     * @return {?}
     */
    function (response, headers) {
        return response;
    };
    /**
     * @protected
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype._parseHeaders = /**
     * @protected
     * @param {?} headers
     * @return {?}
     */
    function (headers) {
        /** @type {?} */
        var parsed = {};
        /** @type {?} */
        var key;
        /** @type {?} */
        var val;
        /** @type {?} */
        var i;
        if (!headers) {
            return parsed;
        }
        headers.split('\n').map((/**
         * @param {?} line
         * @return {?}
         */
        function (line) {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        }));
        return parsed;
    };
    /**
     * @protected
     * @param {?} item
     * @param {?} filter
     * @param {?} options
     * @return {?}
     */
    FileUploader.prototype._onWhenAddingFileFailed = /**
     * @protected
     * @param {?} item
     * @param {?} filter
     * @param {?} options
     * @return {?}
     */
    function (item, filter, options) {
        this.onWhenAddingFileFailed(item, filter, options);
    };
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    FileUploader.prototype._onAfterAddingFile = /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.onAfterAddingFile(item);
    };
    /**
     * @protected
     * @param {?} items
     * @return {?}
     */
    FileUploader.prototype._onAfterAddingAll = /**
     * @protected
     * @param {?} items
     * @return {?}
     */
    function (items) {
        this.onAfterAddingAll(items);
    };
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    FileUploader.prototype._onBeforeUploadItem = /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    function (item) {
        item._onBeforeUpload();
        this.onBeforeUploadItem(item);
    };
    /**
     * @protected
     * @param {?} item
     * @param {?} form
     * @return {?}
     */
    FileUploader.prototype._onBuildItemForm = /**
     * @protected
     * @param {?} item
     * @param {?} form
     * @return {?}
     */
    function (item, form) {
        item._onBuildForm(form);
        this.onBuildItemForm(item, form);
    };
    /**
     * @protected
     * @param {?} item
     * @param {?} progress
     * @return {?}
     */
    FileUploader.prototype._onProgressItem = /**
     * @protected
     * @param {?} item
     * @param {?} progress
     * @return {?}
     */
    function (item, progress) {
        /** @type {?} */
        var total = this._getTotalProgress(progress);
        this.progress = total;
        item._onProgress(progress);
        this.onProgressItem(item, progress);
        this.onProgressAll(total);
        this._render();
    };
    /**
     * @protected
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype._onSuccessItem = /**
     * @protected
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        item._onSuccess(response, status, headers);
        this.onSuccessItem(item, response, status, headers);
    };
    /**
     * @protected
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype._onCancelItem = /**
     * @protected
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        item._onCancel(response, status, headers);
        this.onCancelItem(item, response, status, headers);
    };
    return FileUploader;
}());
export { FileUploader };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWRlci5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1maWxlLXVwbG9hZC8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkZXIuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7OztBQUU3QyxTQUFTLE1BQU0sQ0FBQyxLQUFVO0lBQ3hCLE9BQU8sQ0FBQyxJQUFJLElBQUksS0FBSyxZQUFZLElBQUksQ0FBQyxDQUFDO0FBQ3pDLENBQUM7Ozs7QUFFRCw2QkFHQzs7O0lBRkMsdUJBQWE7O0lBQ2Isd0JBQWM7Ozs7O0FBVWhCLHlDQW9CQzs7O0lBbkJDLDhDQUEyQjs7SUFDM0IsOENBQTJCOztJQUMzQix5Q0FBcUI7O0lBQ3JCLHNDQUFrQjs7SUFDbEIsc0NBQTJCOztJQUMzQixzQ0FBb0I7O0lBQ3BCLHFDQUFnQjs7SUFDaEIsd0NBQW1COztJQUNuQiwwQ0FBcUI7O0lBQ3JCLHlDQUFvQjs7SUFDcEIsZ0RBQTRCOztJQUM1QixrQ0FBYTs7SUFDYiwrQ0FBMkI7O0lBQzNCLHdDQUFtQjs7SUFDbkIsOENBQXlCOztJQUN6QixrREFBK0M7O0lBQy9DLG9EQUFnQzs7SUFDaEMsaURBQThCOztJQUM5Qix3REFBb0M7O0FBR3RDO0lBdUJFLHNCQUFtQixPQUE0QjtRQXBCeEMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsVUFBSyxHQUFlLEVBQUUsQ0FBQztRQUN2QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFLdkIsWUFBTyxHQUF3QjtZ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T0FBTyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBdGNELElBc2NDOzs7O0lBcGNDLGlDQUF5Qjs7SUFDekIsbUNBQW9DOztJQUNwQyw2QkFBOEI7O0lBQzlCLGdDQUE0Qjs7SUFDNUIsa0NBQThCOztJQUM5QixrQ0FBdUI7O0lBQ3ZCLHVDQUErQjs7SUFDL0IsZ0NBQW1DOztJQUVuQywrQkFRRTs7Ozs7SUFFRix3Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbGVMaWtlT2JqZWN0IH0gZnJvbSAnLi9maWxlLWxpa2Utb2JqZWN0LmNsYXNzJztcbmltcG9ydCB7IEZpbGVJdGVtIH0gZnJvbSAnLi9maWxlLWl0ZW0uY2xhc3MnO1xuaW1wb3J0IHsgRmlsZVR5cGUgfSBmcm9tICcuL2ZpbGUtdHlwZS5jbGFzcyc7XG5cbmZ1bmN0aW9uIGlzRmlsZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiAoRmlsZSAmJiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEhlYWRlcnMge1xuICBuYW1lOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFBhcnNlZFJlc3BvbnNlSGVhZGVycyA9IHsgWyBoZWFkZXJGaWVsZE5hbWU6IHN0cmluZyBdOiBzdHJpbmcgfTtcblxuZXhwb3J0IHR5cGUgRmlsdGVyRnVuY3Rpb24gPSB7XG4gIG5hbWU6IHN0cmluZyxcbiAgZm46IChpdGVtPzogRmlsZUxpa2VPYmplY3QsIG9wdGlvbnM/OiBGaWxlVXBsb2FkZXJPcHRpb25zKSA9PiBib29sZWFuXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVVcGxvYWRlck9wdGlvbnMge1xuICBhbGxvd2VkTWltZVR5cGU/OiBzdHJpbmdbXTtcbiAgYWxsb3dlZEZpbGVUeXBlPzogc3RyaW5nW107XG4gIGF1dG9VcGxvYWQ/OiBib29sZWFuO1xuICBpc0hUTUw1PzogYm9vbGVhbjtcbiAgZmlsdGVycz86IEZpbHRlckZ1bmN0aW9uW107XG4gIGhlYWRlcnM/OiBIZWFkZXJzW107XG4gIG1ldGhvZD86IHN0cmluZztcbiAgYXV0aFRva2VuPzogc3RyaW5nO1xuICBtYXhGaWxlU2l6ZT86IG51bWJlcjtcbiAgcXVldWVMaW1pdD86IG51bWJlcjtcbiAgcmVtb3ZlQWZ0ZXJVcGxvYWQ/OiBib29sZWFuO1xuICB1cmw/OiBzdHJpbmc7XG4gIGRpc2FibGVNdWx0aXBhcnQ/OiBib29sZWFuO1xuICBpdGVtQWxpYXM/OiBzdHJpbmc7XG4gIGF1dGhUb2tlbkhlYWRlcj86IHN0cmluZztcbiAgYWRkaXRpb25hbFBhcmFtZXRlcj86IHsgWyBrZXk6IHN0cmluZyBdOiBhbnkgfTtcbiAgcGFyYW1ldGVyc0JlZm9yZUZpbGVzPzogYm9vbGVhbjtcbiAgZm9ybWF0RGF0YUZ1bmN0aW9uPzogRnVuY3Rpb247XG4gIGZvcm1hdERhdGFGdW5jdGlvbklzQXN5bmM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZGVyIHtcblxuICBwdWJsaWMgYXV0aFRva2VuOiBzdHJpbmc7XG4gIHB1YmxpYyBpc1VwbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcXVldWU6IEZpbGVJdGVtW10gPSBbXTtcbiAgcHVibGljIHByb2dyZXNzOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgX25leHRJbmRleDogbnVtYmVyID0gMDtcbiAgcHVibGljIGF1dG9VcGxvYWQ6IGFueTtcbiAgcHVibGljIGF1dGhUb2tlbkhlYWRlcjogc3RyaW5nO1xuICBwdWJsaWMgcmVzcG9uc2U6IEV2ZW50RW1pdHRlcjxhbnk+O1xuXG4gIHB1YmxpYyBvcHRpb25zOiBGaWxlVXBsb2FkZXJPcHRpb25zID0ge1xuICAgIGF1dG9VcGxvYWQ6IGZhbHNlLFxuICAgIGlzSFRNTDU6IHRydWUsXG4gICAgZmlsdGVyczogW10sXG4gICAgcmVtb3ZlQWZ0ZXJVcGxvYWQ6IGZhbHNlLFxuICAgIGRpc2FibGVNdWx0aXBhcnQ6IGZhbHNlLFxuICAgIGZvcm1hdERhdGFGdW5jdGlvbjogKGl0ZW06IEZpbGVJdGVtKSA9PiBpdGVtLl9maWxlLFxuICAgIGZvcm1hdERhdGFGdW5jdGlvbklzQXN5bmM6IGZhbHNlXG4gIH07XG5cbiAgcHJvdGVjdGVkIF9mYWlsRmlsdGVySW5kZXg6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogRmlsZVVwbG9hZGVyT3B0aW9ucykge1xuICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLnJlc3BvbnNlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0T3B0aW9ucyhvcHRpb25zOiBGaWxlVXBsb2FkZXJPcHRpb25zKTogdm9pZCB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5hdXRoVG9rZW4gPSB0aGlzLm9wdGlvbnMuYXV0aFRva2VuO1xuICAgIHRoaXMuYXV0aFRva2VuSGVhZGVyID0gdGhpcy5vcHRpb25zLmF1dGhUb2tlbkhlYWRlciB8fCAnQXV0aG9yaXphdGlvbic7XG4gICAgdGhpcy5hdXRvVXBsb2FkID0gdGhpcy5vcHRpb25zLmF1dG9VcGxvYWQ7XG4gICAgdGhpcy5vcHRpb25zLmZpbHRlcnMudW5zaGlmdCh7IG5hbWU6ICdxdWV1ZUxpbWl0JywgZm46IHRoaXMuX3F1ZXVlTGltaXRGaWx0ZXIgfSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLm1heEZpbGVTaXplKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZmlsdGVycy51bnNoaWZ0KHsgbmFtZTogJ2ZpbGVTaXplJywgZm46IHRoaXMuX2ZpbGVTaXplRmlsdGVyIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dlZEZpbGVUeXBlKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZmlsdGVycy51bnNoaWZ0KHsgbmFtZTogJ2ZpbGVUeXBlJywgZm46IHRoaXMuX2ZpbGVUeXBlRmlsdGVyIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dlZE1pbWVUeXBlKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZmlsdGVycy51bnNoaWZ0KHsgbmFtZTogJ21pbWVUeXBlJywgZm46IHRoaXMuX21pbWVUeXBlRmlsdGVyIH0pO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5xdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5xdWV1ZVsgaSBdLnVybCA9IHRoaXMub3B0aW9ucy51cmw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFRvUXVldWUoZmlsZXM6IEZpbGVbXSwgb3B0aW9ucz86IEZpbGVVcGxvYWRlck9wdGlvbnMsIGZpbHRlcnM/OiBGaWx0ZXJGdW5jdGlvbltdIHwgc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGxpc3Q6IEZpbGVbXSA9IFtdO1xuICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgIGxpc3QucHVzaChmaWxlKTtcbiAgICB9XG4gICAgbGV0IGFycmF5T2ZGaWx0ZXJzID0gdGhpcy5fZ2V0RmlsdGVycyhmaWx0ZXJzKTtcbiAgICBsZXQgY291bnQgPSB0aGlzLnF1ZXVlLmxlbmd0aDtcbiAgICBsZXQgYWRkZWRGaWxlSXRlbXM6IEZpbGVJdGVtW10gPSBbXTtcbiAgICBsaXN0Lm1hcCgoc29tZTogRmlsZSkgPT4ge1xuICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICB9XG5cbiAgICAgIGxldCB0ZW1wID0gbmV3IEZpbGVMaWtlT2JqZWN0KHNvbWUpO1xuICAgICAgaWYgKHRoaXMuX2lzVmFsaWRGaWxlKHRlbXAsIGFycmF5T2ZGaWx0ZXJzLCBvcHRpb25zKSkge1xuICAgICAgICBsZXQgZmlsZUl0ZW0gPSBuZXcgRmlsZUl0ZW0odGhpcywgc29tZSwgb3B0aW9ucyk7XG4gICAgICAgIGFkZGVkRmlsZUl0ZW1zLnB1c2goZmlsZUl0ZW0pO1xuICAgICAgICB0aGlzLnF1ZXVlLnB1c2goZmlsZUl0ZW0pO1xuICAgICAgICB0aGlzLl9vbkFmdGVyQWRkaW5nRmlsZShmaWxlSXRlbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZmlsdGVyID0gYXJyYXlPZkZpbHRlcnNbIHRoaXMuX2ZhaWxGaWx0ZXJJbmRleCBdO1xuICAgICAgICB0aGlzLl9vbldoZW5BZGRpbmdGaWxlRmFpbGVkKHRlbXAsIGZpbHRlciwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRoaXMucXVldWUubGVuZ3RoICE9PSBjb3VudCkge1xuICAgICAgdGhpcy5fb25BZnRlckFkZGluZ0FsbChhZGRlZEZpbGVJdGVtcyk7XG4gICAgICB0aGlzLnByb2dyZXNzID0gdGhpcy5fZ2V0VG90YWxQcm9ncmVzcygpO1xuICAgIH1cbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9VcGxvYWQpIHtcbiAgICAgIHRoaXMudXBsb2FkQWxsKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbW92ZUZyb21RdWV1ZSh2YWx1ZTogRmlsZUl0ZW0pOiB2b2lkIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZJdGVtKHZhbHVlKTtcbiAgICBsZXQgaXRlbSA9IHRoaXMucXVldWVbIGluZGV4IF07XG4gICAgaWYgKGl0ZW0uaXNVcGxvYWRpbmcpIHtcbiAgICAgIGl0ZW0uY2FuY2VsKCk7XG4gICAgfVxuICAgIHRoaXMucXVldWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnByb2dyZXNzID0gdGhpcy5fZ2V0VG90YWxQcm9ncmVzcygpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyUXVldWUoKTogdm9pZCB7XG4gICAgd2hpbGUgKHRoaXMucXVldWUubGVuZ3RoKSB7XG4gICAgICB0aGlzLnF1ZXVlWyAwIF0ucmVtb3ZlKCk7XG4gICAgfVxuICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICB9XG5cbiAgcHVibGljIHVwbG9hZEl0ZW0odmFsdWU6IEZpbGVJdGVtKTogdm9pZCB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleE9mSXRlbSh2YWx1ZSk7XG4gICAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlWyBpbmRleCBdO1xuICAgIGxldCB0cmFuc3BvcnQgPSB0aGlzLm9wdGlvbnMuaXNIVE1MNSA/ICdfeGhyVHJhbnNwb3J0JyA6ICdfaWZyYW1lVHJhbnNwb3J0JztcbiAgICBpdGVtLl9wcmVwYXJlVG9VcGxvYWRpbmcoKTtcbiAgICBpZiAodGhpcy5pc1VwbG9hZGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlzVXBsb2FkaW5nID0gdHJ1ZTtcbiAgICAodGhpcyBhcyBhbnkpWyB0cmFuc3BvcnQgXShpdGVtKTtcbiAgfVxuXG4gIHB1YmxpYyBjYW5jZWxJdGVtKHZhbHVlOiBGaWxlSXRlbSk6IHZvaWQge1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkl0ZW0odmFsdWUpO1xuICAgIGxldCBpdGVtID0gdGhpcy5xdWV1ZVsgaW5kZXggXTtcbiAgICBsZXQgcHJvcCA9IHRoaXMub3B0aW9ucy5pc0hUTUw1ID8gaXRlbS5feGhyIDogaXRlbS5fZm9ybTtcbiAgICBpZiAoaXRlbSAmJiBpdGVtLmlzVXBsb2FkaW5nKSB7XG4gICAgICBwcm9wLmFib3J0KCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwbG9hZEFsbCgpOiB2b2lkIHtcbiAgICBsZXQgaXRlbXMgPSB0aGlzLmdldE5vdFVwbG9hZGVkSXRlbXMoKS5maWx0ZXIoKGl0ZW06IEZpbGVJdGVtKSA9PiAhaXRlbS5pc1VwbG9hZGluZyk7XG4gICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaXRlbXMubWFwKChpdGVtOiBGaWxlSXRlbSkgPT4gaXRlbS5fcHJlcGFyZVRvVXBsb2FkaW5nKCkpO1xuICAgIGl0ZW1zWyAwIF0udXBsb2FkKCk7XG4gIH1cblxuICBwdWJsaWMgY2FuY2VsQWxsKCk6IHZvaWQge1xuICAgIGxldCBpdGVtcyA9IHRoaXMuZ2V0Tm90VXBsb2FkZWRJdGVtcygpO1xuICAgIGl0ZW1zLm1hcCgoaXRlbTogRmlsZUl0ZW0pID0+IGl0ZW0uY2FuY2VsKCkpO1xuICB9XG5cbiAgcHVibGljIGlzRmlsZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmlsZSh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgaXNGaWxlTGlrZU9iamVjdCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRmlsZUxpa2VPYmplY3Q7XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5kZXhPZkl0ZW0odmFsdWU6IGFueSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgPyB2YWx1ZSA6IHRoaXMucXVldWUuaW5kZXhPZih2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Tm90VXBsb2FkZWRJdGVtcygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMucXVldWUuZmlsdGVyKChpdGVtOiBGaWxlSXRlbSkgPT4gIWl0ZW0uaXNVcGxvYWRlZCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UmVhZHlJdGVtcygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMucXVldWVcbiAgICAgIC5maWx0ZXIoKGl0ZW06IEZpbGVJdGVtKSA9PiAoaXRlbS5pc1JlYWR5ICYmICFpdGVtLmlzVXBsb2FkaW5nKSlcbiAgICAgIC5zb3J0KChpdGVtMTogYW55LCBpdGVtMjogYW55KSA9PiBpdGVtMS5pbmRleCAtIGl0ZW0yLmluZGV4KTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cblxuICBwdWJsaWMgb25BZnRlckFkZGluZ0FsbChmaWxlSXRlbXM6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHsgZmlsZUl0ZW1zIH07XG4gIH1cblxuICBwdWJsaWMgb25CdWlsZEl0ZW1Gb3JtKGZpbGVJdGVtOiBGaWxlSXRlbSwgZm9ybTogYW55KTogYW55IHtcbiAgICByZXR1cm4geyBmaWxlSXRlbSwgZm9ybSB9O1xuICB9XG5cbiAgcHVibGljIG9uQWZ0ZXJBZGRpbmdGaWxlKGZpbGVJdGVtOiBGaWxlSXRlbSk6IGFueSB7XG4gICAgcmV0dXJuIHsgZmlsZUl0ZW0gfTtcbiAgfVxuXG4gIHB1YmxpYyBvbldoZW5BZGRpbmdGaWxlRmFpbGVkKGl0ZW06IEZpbGVMaWtlT2JqZWN0LCBmaWx0ZXI6IGFueSwgb3B0aW9uczogYW55KTogYW55IHtcbiAgICByZXR1cm4geyBpdGVtLCBmaWx0ZXIsIG9wdGlvbnMgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbkJlZm9yZVVwbG9hZEl0ZW0oZmlsZUl0ZW06IEZpbGVJdGVtKTogYW55IHtcbiAgICByZXR1cm4geyBmaWxlSXRlbSB9O1xuICB9XG5cbiAgcHVibGljIG9uUHJvZ3Jlc3NJdGVtKGZpbGVJdGVtOiBGaWxlSXRlbSwgcHJvZ3Jlc3M6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHsgZmlsZUl0ZW0sIHByb2dyZXNzIH07XG4gIH1cblxuICBwdWJsaWMgb25Qcm9ncmVzc0FsbChwcm9ncmVzczogYW55KTogYW55IHtcbiAgICByZXR1cm4geyBwcm9ncmVzcyB9O1xuICB9XG5cbiAgcHVibGljIG9uU3VjY2Vzc0l0ZW0oaXRlbTogRmlsZUl0ZW0sIHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiBhbnkge1xuICAgIHJldHVybiB7IGl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbkVycm9ySXRlbShpdGVtOiBGaWxlSXRlbSwgcmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHsgaXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyB9O1xuICB9XG5cbiAgcHVibGljIG9uQ2FuY2VsSXRlbShpdGVtOiBGaWxlSXRlbSwgcmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHsgaXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyB9O1xuICB9XG5cbiAgcHVibGljIG9uQ29tcGxldGVJdGVtKGl0ZW06IEZpbGVJdGVtLCByZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogYW55IHtcbiAgICByZXR1cm4geyBpdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzIH07XG4gIH1cblxuICBwdWJsaWMgb25Db21wbGV0ZUFsbCgpOiBhbnkge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cblxuICBwdWJsaWMgX21pbWVUeXBlRmlsdGVyKGl0ZW06IEZpbGVMaWtlT2JqZWN0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEodGhpcy5vcHRpb25zLmFsbG93ZWRNaW1lVHlwZSAmJiB0aGlzLm9wdGlvbnMuYWxsb3dlZE1pbWVUeXBlLmluZGV4T2YoaXRlbS50eXBlKSA9PT0gLTEpO1xuICB9XG5cbiAgcHVibGljIF9maWxlU2l6ZUZpbHRlcihpdGVtOiBGaWxlTGlrZU9iamVjdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKHRoaXMub3B0aW9ucy5tYXhGaWxlU2l6ZSAmJiBpdGVtLnNpemUgPiB0aGlzLm9wdGlvbnMubWF4RmlsZVNpemUpO1xuICB9XG5cbiAgcHVibGljIF9maWxlVHlwZUZpbHRlcihpdGVtOiBGaWxlTGlrZU9iamVjdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKHRoaXMub3B0aW9ucy5hbGxvd2VkRmlsZVR5cGUgJiZcbiAgICAgIHRoaXMub3B0aW9ucy5hbGxvd2VkRmlsZVR5cGUuaW5kZXhPZihGaWxlVHlwZS5nZXRNaW1lQ2xhc3MoaXRlbSkpID09PSAtMSk7XG4gIH1cblxuICBwdWJsaWMgX29uRXJyb3JJdGVtKGl0ZW06IEZpbGVJdGVtLCByZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogdm9pZCB7XG4gICAgaXRlbS5fb25FcnJvcihyZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcbiAgICB0aGlzLm9uRXJyb3JJdGVtKGl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuICB9XG5cbiAgcHVibGljIF9vbkNvbXBsZXRlSXRlbShpdGVtOiBGaWxlSXRlbSwgcmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHZvaWQge1xuICAgIGl0ZW0uX29uQ29tcGxldGUocmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gICAgdGhpcy5vbkNvbXBsZXRlSXRlbShpdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcbiAgICBsZXQgbmV4dEl0ZW0gPSB0aGlzLmdldFJlYWR5SXRlbXMoKVsgMCBdO1xuICAgIHRoaXMuaXNVcGxvYWRpbmcgPSBmYWxzZTtcbiAgICBpZiAobmV4dEl0ZW0pIHtcbiAgICAgIG5leHRJdGVtLnVwbG9hZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm9uQ29tcGxldGVBbGwoKTtcbiAgICB0aGlzLnByb2dyZXNzID0gdGhpcy5fZ2V0VG90YWxQcm9ncmVzcygpO1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9oZWFkZXJzR2V0dGVyKHBhcnNlZEhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IGFueSB7XG4gICAgcmV0dXJuIChuYW1lOiBhbnkpOiBhbnkgPT4ge1xuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlZEhlYWRlcnNbIG5hbWUudG9Mb3dlckNhc2UoKSBdIHx8IHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJzZWRIZWFkZXJzO1xuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgX3hoclRyYW5zcG9ydChpdGVtOiBGaWxlSXRlbSk6IGFueSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCB4aHIgPSBpdGVtLl94aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBsZXQgc2VuZGFibGU6IGFueTtcbiAgICB0aGlzLl9vbkJlZm9yZVVwbG9hZEl0ZW0oaXRlbSk7XG5cbiAgICBpZiAodHlwZW9mIGl0ZW0uX2ZpbGUuc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBmaWxlIHNwZWNpZmllZCBpcyBubyBsb25nZXIgdmFsaWQnKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZGlzYWJsZU11bHRpcGFydCkge1xuICAgICAgc2VuZGFibGUgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIHRoaXMuX29uQnVpbGRJdGVtRm9ybShpdGVtLCBzZW5kYWJsZSk7XG5cbiAgICAgIGNvbnN0IGFwcGVuZEZpbGUgPSAoKSA9PiBzZW5kYWJsZS5hcHBlbmQoaXRlbS5hbGlhcywgaXRlbS5fZmlsZSwgaXRlbS5maWxlLm5hbWUpO1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucGFyYW1ldGVyc0JlZm9yZUZpbGVzKSB7XG4gICAgICAgIGFwcGVuZEZpbGUoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRm9yIEFXUywgQWRkaXRpb25hbCBQYXJhbWV0ZXJzIG11c3QgY29tZSBCRUZPUkUgRmlsZXNcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbFBhcmFtZXRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsUGFyYW1ldGVyKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGxldCBwYXJhbVZhbCA9IHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsUGFyYW1ldGVyWyBrZXkgXTtcbiAgICAgICAgICAvLyBBbGxvdyBhbiBhZGRpdGlvbmFsIHBhcmFtZXRlciB0byBpbmNsdWRlIHRoZSBmaWxlbmFtZVxuICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1WYWwgPT09ICdzdHJpbmcnICYmIHBhcmFtVmFsLmluZGV4T2YoJ3t7ZmlsZV9uYW1lfX0nKSA+PSAwKSB7XG4gICAgICAgICAgICBwYXJhbVZhbCA9IHBhcmFtVmFsLnJlcGxhY2UoJ3t7ZmlsZV9uYW1lfX0nLCBpdGVtLmZpbGUubmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbmRhYmxlLmFwcGVuZChrZXksIHBhcmFtVmFsKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyYW1ldGVyc0JlZm9yZUZpbGVzKSB7XG4gICAgICAgIGFwcGVuZEZpbGUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2VuZGFibGUgPSB0aGlzLm9wdGlvbnMuZm9ybWF0RGF0YUZ1bmN0aW9uKGl0ZW0pO1xuICAgIH1cblxuICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IChldmVudDogYW55KSA9PiB7XG4gICAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLnJvdW5kKGV2ZW50Lmxlbmd0aENvbXB1dGFibGUgPyBldmVudC5sb2FkZWQgKiAxMDAgLyBldmVudC50b3RhbCA6IDApO1xuICAgICAgdGhpcy5fb25Qcm9ncmVzc0l0ZW0oaXRlbSwgcHJvZ3Jlc3MpO1xuICAgIH07XG4gICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5fcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLl90cmFuc2Zvcm1SZXNwb25zZSh4aHIucmVzcG9uc2UsIGhlYWRlcnMpO1xuICAgICAgbGV0IGdpc3QgPSB0aGlzLl9pc1N1Y2Nlc3NDb2RlKHhoci5zdGF0dXMpID8gJ1N1Y2Nlc3MnIDogJ0Vycm9yJztcbiAgICAgIGxldCBtZXRob2QgPSAnX29uJyArIGdpc3QgKyAnSXRlbSc7XG4gICAgICAodGhpcyBhcyBhbnkpWyBtZXRob2QgXShpdGVtLCByZXNwb25zZSwgeGhyLnN0YXR1cywgaGVhZGVycyk7XG4gICAgICB0aGlzLl9vbkNvbXBsZXRlSXRlbShpdGVtLCByZXNwb25zZSwgeGhyLnN0YXR1cywgaGVhZGVycyk7XG4gICAgfTtcbiAgICB4aHIub25lcnJvciA9ICgpID0+IHtcbiAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5fcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLl90cmFuc2Zvcm1SZXNwb25zZSh4aHIucmVzcG9uc2UsIGhlYWRlcnMpO1xuICAgICAgdGhpcy5fb25FcnJvckl0ZW0oaXRlbSwgcmVzcG9uc2UsIHhoci5zdGF0dXMsIGhlYWRlcnMpO1xuICAgICAgdGhpcy5fb25Db21wbGV0ZUl0ZW0oaXRlbSwgcmVzcG9uc2UsIHhoci5zdGF0dXMsIGhlYWRlcnMpO1xuICAgIH07XG4gICAgeGhyLm9uYWJvcnQgPSAoKSA9PiB7XG4gICAgICBsZXQgaGVhZGVycyA9IHRoaXMuX3BhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICAgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5fdHJhbnNmb3JtUmVzcG9uc2UoeGhyLnJlc3BvbnNlLCBoZWFkZXJzKTtcbiAgICAgIHRoaXMuX29uQ2FuY2VsSXRlbShpdGVtLCByZXNwb25zZSwgeGhyLnN0YXR1cywgaGVhZGVycyk7XG4gICAgICB0aGlzLl9vbkNvbXBsZXRlSXRlbShpdGVtLCByZXNwb25zZSwgeGhyLnN0YXR1cywgaGVhZGVycyk7XG4gICAgfTtcbiAgICB4aHIub3BlbihpdGVtLm1ldGhvZCwgaXRlbS51cmwsIHRydWUpO1xuICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBpdGVtLndpdGhDcmVkZW50aWFscztcbiAgICBpZiAodGhpcy5vcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgIGZvciAobGV0IGhlYWRlciBvZiB0aGlzLm9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIubmFtZSwgaGVhZGVyLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGl0ZW0uaGVhZGVycy5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGhlYWRlciBvZiBpdGVtLmhlYWRlcnMpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLm5hbWUsIGhlYWRlci52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmF1dGhUb2tlbikge1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIodGhpcy5hdXRoVG9rZW5IZWFkZXIsIHRoaXMuYXV0aFRva2VuKTtcbiAgICB9XG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XG4gICAgICAgIHRoYXQucmVzcG9uc2UuZW1pdCh4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmZvcm1hdERhdGFGdW5jdGlvbklzQXN5bmMpIHtcbiAgICAgIHNlbmRhYmxlLnRoZW4oXG4gICAgICAgIChyZXN1bHQ6IGFueSkgPT4geGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHhoci5zZW5kKHNlbmRhYmxlKTtcbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2dldFRvdGFsUHJvZ3Jlc3ModmFsdWU6IG51bWJlciA9IDApOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3ZlQWZ0ZXJVcGxvYWQpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgbGV0IG5vdFVwbG9hZGVkID0gdGhpcy5nZXROb3RVcGxvYWRlZEl0ZW1zKCkubGVuZ3RoO1xuICAgIGxldCB1cGxvYWRlZCA9IG5vdFVwbG9hZGVkID8gdGhpcy5xdWV1ZS5sZW5ndGggLSBub3RVcGxvYWRlZCA6IHRoaXMucXVldWUubGVuZ3RoO1xuICAgIGxldCByYXRpbyA9IDEwMCAvIHRoaXMucXVldWUubGVuZ3RoO1xuICAgIGxldCBjdXJyZW50ID0gdmFsdWUgKiByYXRpbyAvIDEwMDtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh1cGxvYWRlZCAqIHJhdGlvICsgY3VycmVudCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2dldEZpbHRlcnMoZmlsdGVyczogRmlsdGVyRnVuY3Rpb25bXSB8IHN0cmluZyk6IEZpbHRlckZ1bmN0aW9uW10ge1xuICAgIGlmICghZmlsdGVycykge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maWx0ZXJzO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXJzKSkge1xuICAgICAgcmV0dXJuIGZpbHRlcnM7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZmlsdGVycyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBuYW1lcyA9IGZpbHRlcnMubWF0Y2goL1teXFxzLF0rL2cpO1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maWx0ZXJzXG4gICAgICAgIC5maWx0ZXIoKGZpbHRlcjogYW55KSA9PiBuYW1lcy5pbmRleE9mKGZpbHRlci5uYW1lKSAhPT0gLTEpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcnM7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3JlbmRlcigpOiBhbnkge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3F1ZXVlTGltaXRGaWx0ZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5xdWV1ZUxpbWl0ID09PSB1bmRlZmluZWQgfHwgdGhpcy5xdWV1ZS5sZW5ndGggPCB0aGlzLm9wdGlvbnMucXVldWVMaW1pdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaXNWYWxpZEZpbGUoZmlsZTogRmlsZUxpa2VPYmplY3QsIGZpbHRlcnM6IEZpbHRlckZ1bmN0aW9uW10sIG9wdGlvbnM6IEZpbGVVcGxvYWRlck9wdGlvbnMpOiBib29sZWFuIHtcbiAgICB0aGlzLl9mYWlsRmlsdGVySW5kZXggPSAtMTtcbiAgICByZXR1cm4gIWZpbHRlcnMubGVuZ3RoID8gdHJ1ZSA6IGZpbHRlcnMuZXZlcnkoKGZpbHRlcjogRmlsdGVyRnVuY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuX2ZhaWxGaWx0ZXJJbmRleCsrO1xuICAgICAgcmV0dXJuIGZpbHRlci5mbi5jYWxsKHRoaXMsIGZpbGUsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pc1N1Y2Nlc3NDb2RlKHN0YXR1czogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCkgfHwgc3RhdHVzID09PSAzMDQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3RyYW5zZm9ybVJlc3BvbnNlKHJlc3BvbnNlOiBzdHJpbmcsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9wYXJzZUhlYWRlcnMoaGVhZGVyczogc3RyaW5nKTogUGFyc2VkUmVzcG9uc2VIZWFkZXJzIHtcbiAgICBsZXQgcGFyc2VkOiBhbnkgPSB7fTtcbiAgICBsZXQga2V5OiBhbnk7XG4gICAgbGV0IHZhbDogYW55O1xuICAgIGxldCBpOiBhbnk7XG4gICAgaWYgKCFoZWFkZXJzKSB7XG4gICAgICByZXR1cm4gcGFyc2VkO1xuICAgIH1cbiAgICBoZWFkZXJzLnNwbGl0KCdcXG4nKS5tYXAoKGxpbmU6IGFueSkgPT4ge1xuICAgICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgICAga2V5ID0gbGluZS5zbGljZSgwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHZhbCA9IGxpbmUuc2xpY2UoaSArIDEpLnRyaW0oKTtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgcGFyc2VkWyBrZXkgXSA9IHBhcnNlZFsga2V5IF0gPyBwYXJzZWRbIGtleSBdICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vbldoZW5BZGRpbmdGaWxlRmFpbGVkKGl0ZW06IEZpbGVMaWtlT2JqZWN0LCBmaWx0ZXI6IGFueSwgb3B0aW9uczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbldoZW5BZGRpbmdGaWxlRmFpbGVkKGl0ZW0sIGZpbHRlciwgb3B0aW9ucyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uQWZ0ZXJBZGRpbmdGaWxlKGl0ZW06IEZpbGVJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5vbkFmdGVyQWRkaW5nRmlsZShpdGVtKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25BZnRlckFkZGluZ0FsbChpdGVtczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkFmdGVyQWRkaW5nQWxsKGl0ZW1zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25CZWZvcmVVcGxvYWRJdGVtKGl0ZW06IEZpbGVJdGVtKTogdm9pZCB7XG4gICAgaXRlbS5fb25CZWZvcmVVcGxvYWQoKTtcbiAgICB0aGlzLm9uQmVmb3JlVXBsb2FkSXRlbShpdGVtKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25CdWlsZEl0ZW1Gb3JtKGl0ZW06IEZpbGVJdGVtLCBmb3JtOiBhbnkpOiB2b2lkIHtcbiAgICBpdGVtLl9vbkJ1aWxkRm9ybShmb3JtKTtcbiAgICB0aGlzLm9uQnVpbGRJdGVtRm9ybShpdGVtLCBmb3JtKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25Qcm9ncmVzc0l0ZW0oaXRlbTogRmlsZUl0ZW0sIHByb2dyZXNzOiBhbnkpOiB2b2lkIHtcbiAgICBsZXQgdG90YWwgPSB0aGlzLl9nZXRUb3RhbFByb2dyZXNzKHByb2dyZXNzKTtcbiAgICB0aGlzLnByb2dyZXNzID0gdG90YWw7XG4gICAgaXRlbS5fb25Qcm9ncmVzcyhwcm9ncmVzcyk7XG4gICAgdGhpcy5vblByb2dyZXNzSXRlbShpdGVtLCBwcm9ncmVzcyk7XG4gICAgdGhpcy5vblByb2dyZXNzQWxsKHRvdGFsKTtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25TdWNjZXNzSXRlbShpdGVtOiBGaWxlSXRlbSwgcmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHZvaWQge1xuICAgIGl0ZW0uX29uU3VjY2VzcyhyZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcbiAgICB0aGlzLm9uU3VjY2Vzc0l0ZW0oaXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uQ2FuY2VsSXRlbShpdGVtOiBGaWxlSXRlbSwgcmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHZvaWQge1xuICAgIGl0ZW0uX29uQ2FuY2VsKHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuICAgIHRoaXMub25DYW5jZWxJdGVtKGl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuICB9XG59XG4iXX0=