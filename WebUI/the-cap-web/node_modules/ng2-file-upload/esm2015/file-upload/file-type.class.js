/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class FileType {
    /**
     * @param {?} file
     * @return {?}
     */
    static getMimeClass(file) {
        /** @type {?} */
        let mimeClass = 'application';
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
    }
    /**
     * @param {?} inputFilename
     * @return {?}
     */
    static fileTypeDetection(inputFilename) {
        /** @type {?} */
        let types = {
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
        let chunks = inputFilename.split('.');
        if (chunks.length < 2) {
            return 'application';
        }
        /** @type {?} */
        let extension = chunks[chunks.length - 1].toLowerCase();
        if (types[extension] === undefined) {
            return 'application';
        }
        else {
            return types[extension];
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS10eXBlLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWZpbGUtdXBsb2FkLyIsInNvdXJjZXMiOlsiZmlsZS11cGxvYWQvZmlsZS10eXBlLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLE9BQU8sUUFBUTs7Ozs7SUE0RFosTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFvQjs7WUFDekMsU0FBUyxHQUFHLGFBQWE7UUFDN0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDM0MsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUNyQjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDckMsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUNyQjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDckMsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUNyQjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDckMsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUNyQjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxpQkFBaUIsRUFBRTtZQUMxQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQ25CO2FBQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDdkQsU0FBUyxHQUFHLFVBQVUsQ0FBQztTQUN4QjthQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2xELFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDbkI7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IGZyb20gXCIuLi9pbmRleFwiO1xuXG5leHBvcnQgY2xhc3MgRmlsZVR5cGUge1xuICAvKiAgTVMgb2ZmaWNlICAqL1xuICBwdWJsaWMgc3RhdGljIG1pbWVfZG9jOiBzdHJpbmdbXSA9IFtcbiAgICAnYXBwbGljYXRpb24vbXN3b3JkJyxcbiAgICAnYXBwbGljYXRpb24vbXN3b3JkJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC50ZW1wbGF0ZScsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy13b3JkLmRvY3VtZW50Lm1hY3JvRW5hYmxlZC4xMicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy13b3JkLnRlbXBsYXRlLm1hY3JvRW5hYmxlZC4xMidcbiAgXTtcbiAgcHVibGljIHN0YXRpYyBtaW1lX3hzbDogc3RyaW5nW10gPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoZWV0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwudGVtcGxhdGUnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwuc2hlZXQubWFjcm9FbmFibGVkLjEyJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsLnRlbXBsYXRlLm1hY3JvRW5hYmxlZC4xMicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbC5hZGRpbi5tYWNyb0VuYWJsZWQuMTInLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwuc2hlZXQuYmluYXJ5Lm1hY3JvRW5hYmxlZC4xMidcbiAgXTtcbiAgcHVibGljIHN0YXRpYyBtaW1lX3BwdDogc3RyaW5nW10gPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnByZXNlbnRhdGlvbicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC50ZW1wbGF0ZScsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5zbGlkZXNob3cnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludC5hZGRpbi5tYWNyb0VuYWJsZWQuMTInLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludC5wcmVzZW50YXRpb24ubWFjcm9FbmFibGVkLjEyJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQucHJlc2VudGF0aW9uLm1hY3JvRW5hYmxlZC4xMicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LnNsaWRlc2hvdy5tYWNyb0VuYWJsZWQuMTInXG4gIF07XG5cbiAgLyogUFNEICovXG4gIHB1YmxpYyBzdGF0aWMgbWltZV9wc2Q6IHN0cmluZ1tdID0gW1xuICAgICdpbWFnZS9waG90b3Nob3AnLFxuICAgICdpbWFnZS94LXBob3Rvc2hvcCcsXG4gICAgJ2ltYWdlL3BzZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3Bob3Rvc2hvcCcsXG4gICAgJ2FwcGxpY2F0aW9uL3BzZCcsXG4gICAgJ3p6LWFwcGxpY2F0aW9uL3p6LXdpbmFzc29jLXBzZCdcbiAgXTtcblxuICAvKiBDb21wcmVzc2VkIGZpbGVzICovXG4gIHB1YmxpYyBzdGF0aWMgbWltZV9jb21wcmVzczogc3RyaW5nW10gPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3gtZ3RhcicsXG4gICAgJ2FwcGxpY2F0aW9uL3gtZ2NvbXByZXNzJyxcbiAgICAnYXBwbGljYXRpb24vY29tcHJlc3MnLFxuICAgICdhcHBsaWNhdGlvbi94LXRhcicsXG4gICAgJ2FwcGxpY2F0aW9uL3gtcmFyLWNvbXByZXNzZWQnLFxuICAgICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICdhcHBsaWNhdGlvbi94LXppcC1jb21wcmVzc2VkJyxcbiAgICAnYXBwbGljYXRpb24vemlwLWNvbXByZXNzZWQnLFxuICAgICdhcHBsaWNhdGlvbi94LTd6LWNvbXByZXNzZWQnLFxuICAgICdhcHBsaWNhdGlvbi9nemlwJyxcbiAgICAnYXBwbGljYXRpb24veC1iemlwMidcbiAgXTtcblxuICBwdWJsaWMgc3RhdGljIGdldE1pbWVDbGFzcyhmaWxlOiBGaWxlTGlrZU9iamVjdCk6IHN0cmluZyB7XG4gICAgbGV0IG1pbWVDbGFzcyA9ICdhcHBsaWNhdGlvbic7XG4gICAgaWYgKHRoaXMubWltZV9wc2QuaW5kZXhPZihmaWxlLnR5cGUpICE9PSAtMSkge1xuICAgICAgbWltZUNsYXNzID0gJ2ltYWdlJztcbiAgICB9IGVsc2UgaWYgKGZpbGUudHlwZS5tYXRjaCgnaW1hZ2UuKicpKSB7XG4gICAgICBtaW1lQ2xhc3MgPSAnaW1hZ2UnO1xuICAgIH0gZWxzZSBpZiAoZmlsZS50eXBlLm1hdGNoKCd2aWRlby4qJykpIHtcbiAgICAgIG1pbWVDbGFzcyA9ICd2aWRlbyc7XG4gICAgfSBlbHNlIGlmIChmaWxlLnR5cGUubWF0Y2goJ2F1ZGlvLionKSkge1xuICAgICAgbWltZUNsYXNzID0gJ2F1ZGlvJztcbiAgICB9IGVsc2UgaWYgKGZpbGUudHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3BkZicpIHtcbiAgICAgIG1pbWVDbGFzcyA9ICdwZGYnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5taW1lX2NvbXByZXNzLmluZGV4T2YoZmlsZS50eXBlKSAhPT0gLTEpIHtcbiAgICAgIG1pbWVDbGFzcyA9ICdjb21wcmVzcyc7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1pbWVfZG9jLmluZGV4T2YoZmlsZS50eXBlKSAhPT0gLTEpIHtcbiAgICAgIG1pbWVDbGFzcyA9ICdkb2MnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5taW1lX3hzbC5pbmRleE9mKGZpbGUudHlwZSkgIT09IC0xKSB7XG4gICAgICBtaW1lQ2xhc3MgPSAneGxzJztcbiAgICB9IGVsc2UgaWYgKHRoaXMubWltZV9wcHQuaW5kZXhPZihmaWxlLnR5cGUpICE9PSAtMSkge1xuICAgICAgbWltZUNsYXNzID0gJ3BwdCc7XG4gICAgfVxuICAgIGlmIChtaW1lQ2xhc3MgPT09ICdhcHBsaWNhdGlvbicpIHtcbiAgICAgIG1pbWVDbGFzcyA9IHRoaXMuZmlsZVR5cGVEZXRlY3Rpb24oZmlsZS5uYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWltZUNsYXNzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmaWxlVHlwZURldGVjdGlvbihpbnB1dEZpbGVuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCB0eXBlczogeyBbIGtleTogc3RyaW5nIF06IHN0cmluZyB9ID0ge1xuICAgICAgJ2pwZyc6ICdpbWFnZScsXG4gICAgICAnanBlZyc6ICdpbWFnZScsXG4gICAgICAndGlmJzogJ2ltYWdlJyxcbiAgICAgICdwc2QnOiAnaW1hZ2UnLFxuICAgICAgJ2JtcCc6ICdpbWFnZScsXG4gICAgICAncG5nJzogJ2ltYWdlJyxcbiAgICAgICduZWYnOiAnaW1hZ2UnLFxuICAgICAgJ3RpZmYnOiAnaW1hZ2UnLFxuICAgICAgJ2NyMic6ICdpbWFnZScsXG4gICAgICAnZHdnJzogJ2ltYWdlJyxcbiAgICAgICdjZHInOiAnaW1hZ2UnLFxuICAgICAgJ2FpJzogJ2ltYWdlJyxcbiAgICAgICdpbmRkJzogJ2ltYWdlJyxcbiAgICAgICdwaW4nOiAnaW1hZ2UnLFxuICAgICAgJ2NkcCc6ICdpbWFnZScsXG4gICAgICAnc2twJzogJ2ltYWdlJyxcbiAgICAgICdzdHAnOiAnaW1hZ2UnLFxuICAgICAgJzNkbSc6ICdpbWFnZScsXG4gICAgICAnbXAzJzogJ2F1ZGlvJyxcbiAgICAgICd3YXYnOiAnYXVkaW8nLFxuICAgICAgJ3dtYSc6ICdhdWRpbycsXG4gICAgICAnbW9kJzogJ2F1ZGlvJyxcbiAgICAgICdtNGEnOiAnYXVkaW8nLFxuICAgICAgJ2NvbXByZXNzJzogJ2NvbXByZXNzJyxcbiAgICAgICd6aXAnOiAnY29tcHJlc3MnLFxuICAgICAgJ3Jhcic6ICdjb21wcmVzcycsXG4gICAgICAnN3onOiAnY29tcHJlc3MnLFxuICAgICAgJ2x6JzogJ2NvbXByZXNzJyxcbiAgICAgICd6MDEnOiAnY29tcHJlc3MnLFxuICAgICAgJ2J6Mic6ICdjb21wcmVzcycsXG4gICAgICAnZ3onOiAnY29tcHJlc3MnLFxuICAgICAgJ3BkZic6ICdwZGYnLFxuICAgICAgJ3hscyc6ICd4bHMnLFxuICAgICAgJ3hsc3gnOiAneGxzJyxcbiAgICAgICdvZHMnOiAneGxzJyxcbiAgICAgICdtcDQnOiAndmlkZW8nLFxuICAgICAgJ2F2aSc6ICd2aWRlbycsXG4gICAgICAnd212JzogJ3ZpZGVvJyxcbiAgICAgICdtcGcnOiAndmlkZW8nLFxuICAgICAgJ210cyc6ICd2aWRlbycsXG4gICAgICAnZmx2JzogJ3ZpZGVvJyxcbiAgICAgICczZ3AnOiAndmlkZW8nLFxuICAgICAgJ3ZvYic6ICd2aWRlbycsXG4gICAgICAnbTR2JzogJ3ZpZGVvJyxcbiAgICAgICdtcGVnJzogJ3ZpZGVvJyxcbiAgICAgICdtMnRzJzogJ3ZpZGVvJyxcbiAgICAgICdtb3YnOiAndmlkZW8nLFxuICAgICAgJ2RvYyc6ICdkb2MnLFxuICAgICAgJ2RvY3gnOiAnZG9jJyxcbiAgICAgICdlcHMnOiAnZG9jJyxcbiAgICAgICd0eHQnOiAnZG9jJyxcbiAgICAgICdvZHQnOiAnZG9jJyxcbiAgICAgICdydGYnOiAnZG9jJyxcbiAgICAgICdwcHQnOiAncHB0JyxcbiAgICAgICdwcHR4JzogJ3BwdCcsXG4gICAgICAncHBzJzogJ3BwdCcsXG4gICAgICAncHBzeCc6ICdwcHQnLFxuICAgICAgJ29kcCc6ICdwcHQnXG4gICAgfTtcblxuICAgIGxldCBjaHVua3MgPSBpbnB1dEZpbGVuYW1lLnNwbGl0KCcuJyk7XG4gICAgaWYgKGNodW5rcy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4gJ2FwcGxpY2F0aW9uJztcbiAgICB9XG4gICAgbGV0IGV4dGVuc2lvbiA9IGNodW5rc1sgY2h1bmtzLmxlbmd0aCAtIDEgXS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0eXBlc1sgZXh0ZW5zaW9uIF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuICdhcHBsaWNhdGlvbic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0eXBlc1sgZXh0ZW5zaW9uIF07XG4gICAgfVxuICB9XG59XG4iXX0=