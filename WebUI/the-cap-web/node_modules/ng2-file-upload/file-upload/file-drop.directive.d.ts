import { EventEmitter, ElementRef } from '@angular/core';
import { FileUploader, FileUploaderOptions } from './file-uploader.class';
import * as ɵngcc0 from '@angular/core';
export declare class FileDropDirective {
    uploader: FileUploader;
    fileOver: EventEmitter<any>;
    onFileDrop: EventEmitter<File[]>;
    protected element: ElementRef;
    constructor(element: ElementRef);
    getOptions(): FileUploaderOptions;
    getFilters(): any;
    onDrop(event: any): void;
    onDragOver(event: any): void;
    onDragLeave(event: any): any;
    protected _getTransfer(event: any): any;
    protected _preventAndStop(event: any): any;
    protected _haveFiles(types: any): any;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FileDropDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<FileDropDirective, "[ng2FileDrop]", never, { "uploader": "uploader"; }, { "fileOver": "fileOver"; "onFileDrop": "onFileDrop"; }, never>;
}

//# sourceMappingURL=file-drop.directive.d.ts.map