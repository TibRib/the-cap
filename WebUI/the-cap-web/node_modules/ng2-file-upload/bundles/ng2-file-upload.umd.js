(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng2-file-upload', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory(global['ng2-file-upload'] = {}, global.ng.core, global.ng.common));
}(this, function (exports, core, common) { 'use strict';

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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FileType = /** @class */ (function () {
        function FileType() {
        }
        /**
         * @param {?} file
         * @return {?}
         */
        FileType.getMimeClass = /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            /** @type {?} */
            var mimeClass = 'application';
            if (this.mime_psd.indexOf(file.type) !== -1) {
                mimeClass = 'image';
            }
            else if (file.type.match('image.*')) {
                mimeClass = 'image';
            }
            else if (file.type.match('video.*')) {
                mimeClass = 'video';
            }
            else if (file.type.match('audio.*')) {
                mimeClass = 'audio';
            }
            else if (file.type === 'application/pdf') {
                mimeClass = 'pdf';
            }
            else if (this.mime_compress.indexOf(file.type) !== -1) {
                mimeClass = 'compress';
            }
            else if (this.mime_doc.indexOf(file.type) !== -1) {
                mimeClass = 'doc';
            }
            else if (this.mime_xsl.indexOf(file.type) !== -1) {
                mimeClass = 'xls';
            }
            else if (this.mime_ppt.indexOf(file.type) !== -1) {
                mimeClass = 'ppt';
            }
            if (mimeClass === 'application') {
                mimeClass = this.fileTypeDetection(file.name);
            }
            return mimeClass;
        };
        /**
         * @param {?} inputFilename
         * @return {?}
         */
        FileType.fileTypeDetection = /**
         * @param {?} inputFilename
         * @return {?}
         */
        function (inputFilename) {
            /** @type {?} */
            var types = {
                'jpg': 'image',
                'jpeg': 'image',
                'tif': 'image',
                'psd': 'image',
                'bmp': 'image',
                'png': 'image',
                'nef': 'image',
                'tiff': 'image',
                'cr2': 'image',
                'dwg': 'image',
                'cdr': 'image',
                'ai': 'image',
                'indd': 'image',
                'pin': 'image',
                'cdp': 'image',
                'skp': 'image',
                'stp': 'image',
                '3dm': 'image',
                'mp3': 'audio',
                'wav': 'audio',
                'wma': 'audio',
                'mod': 'audio',
                'm4a': 'audio',
                'compress': 'compress',
                'zip': 'compress',
                'rar': 'compress',
                '7z': 'compress',
                'lz': 'compress',
                'z01': 'compress',
                'bz2': 'compress',
                'gz': 'compress',
                'pdf': 'pdf',
                'xls': 'xls',
                'xlsx': 'xls',
                'ods': 'xls',
                'mp4': 'video',
                'avi': 'video',
                'wmv': 'video',
                'mpg': 'video',
                'mts': 'video',
                'flv': 'video',
                '3gp': 'video',
                'vob': 'video',
                'm4v': 'video',
                'mpeg': 'video',
                'm2ts': 'video',
                'mov': 'video',
                'doc': 'doc',
                'docx': 'doc',
                'eps': 'doc',
                'txt': 'doc',
                'odt': 'doc',
                'rtf': 'doc',
                'ppt': 'ppt',
                'pptx': 'ppt',
                'pps': 'ppt',
                'ppsx': 'ppt',
                'odp': 'ppt'
            };
            /** @type {?} */
            var chunks = inputFilename.split('.');
            if (chunks.length < 2) {
                return 'application';
            }
            /** @type {?} */
            var extension = chunks[chunks.length - 1].toLowerCase();
            if (types[extension] === undefined) {
                return 'application';
            }
            else {
                return types[extension];
            }
        };
        /*  MS office  */
        FileType.mime_doc = [
            'application/msword',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
            'application/vnd.ms-word.document.macroEnabled.12',
            'application/vnd.ms-word.template.macroEnabled.12'
        ];
        FileType.mime_xsl = [
            'application/vnd.ms-excel',
            'application/vnd.ms-excel',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
            'application/vnd.ms-excel.sheet.macroEnabled.12',
            'application/vnd.ms-excel.template.macroEnabled.12',
            'application/vnd.ms-excel.addin.macroEnabled.12',
            'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
        ];
        FileType.mime_ppt = [
            'application/vnd.ms-powerpoint',
            'application/vnd.ms-powerpoint',
            'application/vnd.ms-powerpoint',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.openxmlformats-officedocument.presentationml.template',
            'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
            'application/vnd.ms-powerpoint.addin.macroEnabled.12',
            'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
            'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
            'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
        ];
        /* PSD */
        FileType.mime_psd = [
            'image/photoshop',
            'image/x-photoshop',
            'image/psd',
            'application/photoshop',
            'application/psd',
            'zz-application/zz-winassoc-psd'
        ];
        /* Compressed files */
        FileType.mime_compress = [
            'application/x-gtar',
            'application/x-gcompress',
            'application/compress',
            'application/x-tar',
            'application/x-rar-compressed',
            'application/octet-stream',
            'application/x-zip-compressed',
            'application/zip-compressed',
            'application/x-7z-compressed',
            'application/gzip',
            'application/x-bzip2'
        ];
        return FileType;
    }());
    if (false) {
        /** @type {?} */
        FileType.mime_doc;
        /** @type {?} */
        FileType.mime_xsl;
        /** @type {?} */
        FileType.mime_ppt;
        /** @type {?} */
        FileType.mime_psd;
        /** @type {?} */
        FileType.mime_compress;
    }

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
     * @param {?} value
     * @return {?}
     */
    function isFile(value) {
        return (File && value instanceof File);
    }
    /**
     * @record
     */
    function Headers() { }
    if (false) {
        /** @type {?} */
        Headers.prototype.name;
        /** @type {?} */
        Headers.prototype.value;
    }
    /**
     * @record
     */
    function FileUploaderOptions() { }
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
            this.response = new core.EventEmitter();
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FileSelectDirective = /** @class */ (function () {
        function FileSelectDirective(element) {
            this.onFileSelected = new core.EventEmitter();
            this.element = element;
        }
        /**
         * @return {?}
         */
        FileSelectDirective.prototype.getOptions = /**
         * @return {?}
         */
        function () {
            return this.uploader.options;
        };
        /**
         * @return {?}
         */
        FileSelectDirective.prototype.getFilters = /**
         * @return {?}
         */
        function () {
            return {};
        };
        /**
         * @return {?}
         */
        FileSelectDirective.prototype.isEmptyAfterSelection = /**
         * @return {?}
         */
        function () {
            return !!this.element.nativeElement.attributes.multiple;
        };
        /**
         * @return {?}
         */
        FileSelectDirective.prototype.onChange = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var files = this.element.nativeElement.files;
            /** @type {?} */
            var options = this.getOptions();
            /** @type {?} */
            var filters = this.getFilters();
            this.uploader.addToQueue(files, options, filters);
            this.onFileSelected.emit(files);
            if (this.isEmptyAfterSelection()) {
                this.element.nativeElement.value = '';
            }
        };
        FileSelectDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[ng2FileSelect]' },] }
        ];
        /** @nocollapse */
        FileSelectDirective.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        FileSelectDirective.propDecorators = {
            uploader: [{ type: core.Input }],
            onFileSelected: [{ type: core.Output }],
            onChange: [{ type: core.HostListener, args: ['change',] }]
        };
        return FileSelectDirective;
    }());
    if (false) {
        /** @type {?} */
        FileSelectDirective.prototype.uploader;
        /** @type {?} */
        FileSelectDirective.prototype.onFileSelected;
        /**
         * @type {?}
         * @protected
         */
        FileSelectDirective.prototype.element;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FileDropDirective = /** @class */ (function () {
        function FileDropDirective(element) {
            this.fileOver = new core.EventEmitter();
            this.onFileDrop = new core.EventEmitter();
            this.element = element;
        }
        /**
         * @return {?}
         */
        FileDropDirective.prototype.getOptions = /**
         * @return {?}
         */
        function () {
            return this.uploader.options;
        };
        /**
         * @return {?}
         */
        FileDropDirective.prototype.getFilters = /**
         * @return {?}
         */
        function () {
            return {};
        };
        /**
         * @param {?} event
         * @return {?}
         */
        FileDropDirective.prototype.onDrop = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var transfer = this._getTransfer(event);
            if (!transfer) {
                return;
            }
            /** @type {?} */
            var options = this.getOptions();
            /** @type {?} */
            var filters = this.getFilters();
            this._preventAndStop(event);
            this.uploader.addToQueue(transfer.files, options, filters);
            this.fileOver.emit(false);
            this.onFileDrop.emit(transfer.files);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        FileDropDirective.prototype.onDragOver = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var transfer = this._getTransfer(event);
            if (!this._haveFiles(transfer.types)) {
                return;
            }
            transfer.dropEffect = 'copy';
            this._preventAndStop(event);
            this.fileOver.emit(true);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        FileDropDirective.prototype.onDragLeave = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (((/** @type {?} */ (this))).element) {
                if (event.currentTarget === ((/** @type {?} */ (this))).element[0]) {
                    return;
                }
            }
            this._preventAndStop(event);
            this.fileOver.emit(false);
        };
        /**
         * @protected
         * @param {?} event
         * @return {?}
         */
        FileDropDirective.prototype._getTransfer = /**
         * @protected
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
        };
        /**
         * @protected
         * @param {?} event
         * @return {?}
         */
        FileDropDirective.prototype._preventAndStop = /**
         * @protected
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
        /**
         * @protected
         * @param {?} types
         * @return {?}
         */
        FileDropDirective.prototype._haveFiles = /**
         * @protected
         * @param {?} types
         * @return {?}
         */
        function (types) {
            if (!types) {
                return false;
            }
            if (types.indexOf) {
                return types.indexOf('Files') !== -1;
            }
            else if (types.contains) {
                return types.contains('Files');
            }
            else {
                return false;
            }
        };
        FileDropDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[ng2FileDrop]' },] }
        ];
        /** @nocollapse */
        FileDropDirective.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        FileDropDirective.propDecorators = {
            uploader: [{ type: core.Input }],
            fileOver: [{ type: core.Output }],
            onFileDrop: [{ type: core.Output }],
            onDrop: [{ type: core.HostListener, args: ['drop', ['$event'],] }],
            onDragOver: [{ type: core.HostListener, args: ['dragover', ['$event'],] }],
            onDragLeave: [{ type: core.HostListener, args: ['dragleave', ['$event'],] }]
        };
        return FileDropDirective;
    }());
    if (false) {
        /** @type {?} */
        FileDropDirective.prototype.uploader;
        /** @type {?} */
        FileDropDirective.prototype.fileOver;
        /** @type {?} */
        FileDropDirective.prototype.onFileDrop;
        /**
         * @type {?}
         * @protected
         */
        FileDropDirective.prototype.element;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FileUploadModule = /** @class */ (function () {
        function FileUploadModule() {
        }
        FileUploadModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [FileDropDirective, FileSelectDirective],
                        exports: [FileDropDirective, FileSelectDirective]
                    },] }
        ];
        return FileUploadModule;
    }());

    exports.FileDropDirective = FileDropDirective;
    exports.FileItem = FileItem;
    exports.FileLikeObject = FileLikeObject;
    exports.FileSelectDirective = FileSelectDirective;
    exports.FileUploadModule = FileUploadModule;
    exports.FileUploader = FileUploader;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ng2-file-upload.umd.js.map
