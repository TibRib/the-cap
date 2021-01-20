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
export { FileType };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS10eXBlLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWZpbGUtdXBsb2FkLyIsInNvdXJjZXMiOlsiZmlsZS11cGxvYWQvZmlsZS10eXBlLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTtJQUFBO0lBaUtBLENBQUM7Ozs7O0lBckdlLHFCQUFZOzs7O0lBQTFCLFVBQTJCLElBQW9COztZQUN6QyxTQUFTLEdBQUcsYUFBYTtRQUM3QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUMzQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNyQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNyQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNyQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFO1lBQzFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDbkI7YUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN2RCxTQUFTLEdBQUcsVUFBVSxDQUFDO1NBQ3hCO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDbEQsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUNu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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsZUxpa2VPYmplY3QgfSBmcm9tIFwiLi4vaW5kZXhcIjtcblxuZXhwb3J0IGNsYXNzIEZpbGVUeXBlIHtcbiAgLyogIE1TIG9mZmljZSAgKi9cbiAgcHVibGljIHN0YXRpYyBtaW1lX2RvYzogc3RyaW5nW10gPSBbXG4gICAgJ2FwcGxpY2F0aW9uL21zd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL21zd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwudGVtcGxhdGUnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtd29yZC5kb2N1bWVudC5tYWNyb0VuYWJsZWQuMTInLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtd29yZC50ZW1wbGF0ZS5tYWNyb0VuYWJsZWQuMTInXG4gIF07XG4gIHB1YmxpYyBzdGF0aWMgbWltZV94c2w6IHN0cmluZ1tdID0gW1xuICAgICdhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnRlbXBsYXRlJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsLnNoZWV0Lm1hY3JvRW5hYmxlZC4xMicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbC50ZW1wbGF0ZS5tYWNyb0VuYWJsZWQuMTInLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwuYWRkaW4ubWFjcm9FbmFibGVkLjEyJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsLnNoZWV0LmJpbmFyeS5tYWNyb0VuYWJsZWQuMTInXG4gIF07XG4gIHB1YmxpYyBzdGF0aWMgbWltZV9wcHQ6IHN0cmluZ1tdID0gW1xuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5wcmVzZW50YXRpb24nLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwudGVtcGxhdGUnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwuc2xpZGVzaG93JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQuYWRkaW4ubWFjcm9FbmFibGVkLjEyJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQucHJlc2VudGF0aW9uLm1hY3JvRW5hYmxlZC4xMicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LnByZXNlbnRhdGlvbi5tYWNyb0VuYWJsZWQuMTInLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludC5zbGlkZXNob3cubWFjcm9FbmFibGVkLjEyJ1xuICBdO1xuXG4gIC8qIFBTRCAqL1xuICBwdWJsaWMgc3RhdGljIG1pbWVfcHNkOiBzdHJpbmdbXSA9IFtcbiAgICAnaW1hZ2UvcGhvdG9zaG9wJyxcbiAgICAnaW1hZ2UveC1waG90b3Nob3AnLFxuICAgICdpbWFnZS9wc2QnLFxuICAgICdhcHBsaWNhdGlvbi9waG90b3Nob3AnLFxuICAgICdhcHBsaWNhdGlvbi9wc2QnLFxuICAgICd6ei1hcHBsaWNhdGlvbi96ei13aW5hc3NvYy1wc2QnXG4gIF07XG5cbiAgLyogQ29tcHJlc3NlZCBmaWxlcyAqL1xuICBwdWJsaWMgc3RhdGljIG1pbWVfY29tcHJlc3M6IHN0cmluZ1tdID0gW1xuICAgICdhcHBsaWNhdGlvbi94LWd0YXInLFxuICAgICdhcHBsaWNhdGlvbi94LWdjb21wcmVzcycsXG4gICAgJ2FwcGxpY2F0aW9uL2NvbXByZXNzJyxcbiAgICAnYXBwbGljYXRpb24veC10YXInLFxuICAgICdhcHBsaWNhdGlvbi94LXJhci1jb21wcmVzc2VkJyxcbiAgICAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgICAnYXBwbGljYXRpb24veC16aXAtY29tcHJlc3NlZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ppcC1jb21wcmVzc2VkJyxcbiAgICAnYXBwbGljYXRpb24veC03ei1jb21wcmVzc2VkJyxcbiAgICAnYXBwbGljYXRpb24vZ3ppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtYnppcDInXG4gIF07XG5cbiAgcHVibGljIHN0YXRpYyBnZXRNaW1lQ2xhc3MoZmlsZTogRmlsZUxpa2VPYmplY3QpOiBzdHJpbmcge1xuICAgIGxldCBtaW1lQ2xhc3MgPSAnYXBwbGljYXRpb24nO1xuICAgIGlmICh0aGlzLm1pbWVfcHNkLmluZGV4T2YoZmlsZS50eXBlKSAhPT0gLTEpIHtcbiAgICAgIG1pbWVDbGFzcyA9ICdpbWFnZSc7XG4gICAgfSBlbHNlIGlmIChmaWxlLnR5cGUubWF0Y2goJ2ltYWdlLionKSkge1xuICAgICAgbWltZUNsYXNzID0gJ2ltYWdlJztcbiAgICB9IGVsc2UgaWYgKGZpbGUudHlwZS5tYXRjaCgndmlkZW8uKicpKSB7XG4gICAgICBtaW1lQ2xhc3MgPSAndmlkZW8nO1xuICAgIH0gZWxzZSBpZiAoZmlsZS50eXBlLm1hdGNoKCdhdWRpby4qJykpIHtcbiAgICAgIG1pbWVDbGFzcyA9ICdhdWRpbyc7XG4gICAgfSBlbHNlIGlmIChmaWxlLnR5cGUgPT09ICdhcHBsaWNhdGlvbi9wZGYnKSB7XG4gICAgICBtaW1lQ2xhc3MgPSAncGRmJztcbiAgICB9IGVsc2UgaWYgKHRoaXMubWltZV9jb21wcmVzcy5pbmRleE9mKGZpbGUudHlwZSkgIT09IC0xKSB7XG4gICAgICBtaW1lQ2xhc3MgPSAnY29tcHJlc3MnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5taW1lX2RvYy5pbmRleE9mKGZpbGUudHlwZSkgIT09IC0xKSB7XG4gICAgICBtaW1lQ2xhc3MgPSAnZG9jJztcbiAgICB9IGVsc2UgaWYgKHRoaXMubWltZV94c2wuaW5kZXhPZihmaWxlLnR5cGUpICE9PSAtMSkge1xuICAgICAgbWltZUNsYXNzID0gJ3hscyc7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1pbWVfcHB0LmluZGV4T2YoZmlsZS50eXBlKSAhPT0gLTEpIHtcbiAgICAgIG1pbWVDbGFzcyA9ICdwcHQnO1xuICAgIH1cbiAgICBpZiAobWltZUNsYXNzID09PSAnYXBwbGljYXRpb24nKSB7XG4gICAgICBtaW1lQ2xhc3MgPSB0aGlzLmZpbGVUeXBlRGV0ZWN0aW9uKGZpbGUubmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1pbWVDbGFzcztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZmlsZVR5cGVEZXRlY3Rpb24oaW5wdXRGaWxlbmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgdHlwZXM6IHsgWyBrZXk6IHN0cmluZyBdOiBzdHJpbmcgfSA9IHtcbiAgICAgICdqcGcnOiAnaW1hZ2UnLFxuICAgICAgJ2pwZWcnOiAnaW1hZ2UnLFxuICAgICAgJ3RpZic6ICdpbWFnZScsXG4gICAgICAncHNkJzogJ2ltYWdlJyxcbiAgICAgICdibXAnOiAnaW1hZ2UnLFxuICAgICAgJ3BuZyc6ICdpbWFnZScsXG4gICAgICAnbmVmJzogJ2ltYWdlJyxcbiAgICAgICd0aWZmJzogJ2ltYWdlJyxcbiAgICAgICdjcjInOiAnaW1hZ2UnLFxuICAgICAgJ2R3Zyc6ICdpbWFnZScsXG4gICAgICAnY2RyJzogJ2ltYWdlJyxcbiAgICAgICdhaSc6ICdpbWFnZScsXG4gICAgICAnaW5kZCc6ICdpbWFnZScsXG4gICAgICAncGluJzogJ2ltYWdlJyxcbiAgICAgICdjZHAnOiAnaW1hZ2UnLFxuICAgICAgJ3NrcCc6ICdpbWFnZScsXG4gICAgICAnc3RwJzogJ2ltYWdlJyxcbiAgICAgICczZG0nOiAnaW1hZ2UnLFxuICAgICAgJ21wMyc6ICdhdWRpbycsXG4gICAgICAnd2F2JzogJ2F1ZGlvJyxcbiAgICAgICd3bWEnOiAnYXVkaW8nLFxuICAgICAgJ21vZCc6ICdhdWRpbycsXG4gICAgICAnbTRhJzogJ2F1ZGlvJyxcbiAgICAgICdjb21wcmVzcyc6ICdjb21wcmVzcycsXG4gICAgICAnemlwJzogJ2NvbXByZXNzJyxcbiAgICAgICdyYXInOiAnY29tcHJlc3MnLFxuICAgICAgJzd6JzogJ2NvbXByZXNzJyxcbiAgICAgICdseic6ICdjb21wcmVzcycsXG4gICAgICAnejAxJzogJ2NvbXByZXNzJyxcbiAgICAgICdiejInOiAnY29tcHJlc3MnLFxuICAgICAgJ2d6JzogJ2NvbXByZXNzJyxcbiAgICAgICdwZGYnOiAncGRmJyxcbiAgICAgICd4bHMnOiAneGxzJyxcbiAgICAgICd4bHN4JzogJ3hscycsXG4gICAgICAnb2RzJzogJ3hscycsXG4gICAgICAnbXA0JzogJ3ZpZGVvJyxcbiAgICAgICdhdmknOiAndmlkZW8nLFxuICAgICAgJ3dtdic6ICd2aWRlbycsXG4gICAgICAnbXBnJzogJ3ZpZGVvJyxcbiAgICAgICdtdHMnOiAndmlkZW8nLFxuICAgICAgJ2Zsdic6ICd2aWRlbycsXG4gICAgICAnM2dwJzogJ3ZpZGVvJyxcbiAgICAgICd2b2InOiAndmlkZW8nLFxuICAgICAgJ200dic6ICd2aWRlbycsXG4gICAgICAnbXBlZyc6ICd2aWRlbycsXG4gICAgICAnbTJ0cyc6ICd2aWRlbycsXG4gICAgICAnbW92JzogJ3ZpZGVvJyxcbiAgICAgICdkb2MnOiAnZG9jJyxcbiAgICAgICdkb2N4JzogJ2RvYycsXG4gICAgICAnZXBzJzogJ2RvYycsXG4gICAgICAndHh0JzogJ2RvYycsXG4gICAgICAnb2R0JzogJ2RvYycsXG4gICAgICAncnRmJzogJ2RvYycsXG4gICAgICAncHB0JzogJ3BwdCcsXG4gICAgICAncHB0eCc6ICdwcHQnLFxuICAgICAgJ3Bwcyc6ICdwcHQnLFxuICAgICAgJ3Bwc3gnOiAncHB0JyxcbiAgICAgICdvZHAnOiAncHB0J1xuICAgIH07XG5cbiAgICBsZXQgY2h1bmtzID0gaW5wdXRGaWxlbmFtZS5zcGxpdCgnLicpO1xuICAgIGlmIChjaHVua3MubGVuZ3RoIDwgMikge1xuICAgICAgcmV0dXJuICdhcHBsaWNhdGlvbic7XG4gICAgfVxuICAgIGxldCBleHRlbnNpb24gPSBjaHVua3NbIGNodW5rcy5sZW5ndGggLSAxIF0udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodHlwZXNbIGV4dGVuc2lvbiBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAnYXBwbGljYXRpb24nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHlwZXNbIGV4dGVuc2lvbiBdO1xuICAgIH1cbiAgfVxufVxuIl19