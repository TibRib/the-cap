import { EventEmitter, ElementRef } from '@angular/core';
import { FileUploader } from './file-uploader.class';
import * as ɵngcc0 from '@angular/core';
export declare class FileSelectDirective {
    uploader: FileUploader;
    onFileSelected: EventEmitter<File[]>;
    protected element: ElementRef;
    constructor(element: ElementRef);
    getOptions(): any;
    getFilters(): any;
    isEmptyAfterSelection(): boolean;
    onChange(): any;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FileSelectDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<FileSelectDirective, "[ng2FileSelect]", never, { "uploader": "uploader"; }, { "onFileSelected": "onFileSelected"; }, never>;
}

//# sourceMappingURL=file-select.directive.d.ts.map