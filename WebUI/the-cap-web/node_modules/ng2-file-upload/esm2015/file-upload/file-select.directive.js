/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, ElementRef, Input, HostListener, Output } from '@angular/core';
import { FileUploader } from './file-uploader.class';
export class FileSelectDirective {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.onFileSelected = new EventEmitter();
        this.element = element;
    }
    /**
     * @return {?}
     */
    getOptions() {
        return this.uploader.options;
    }
    /**
     * @return {?}
     */
    getFilters() {
        return {};
    }
    /**
     * @return {?}
     */
    isEmptyAfterSelection() {
        return !!this.element.nativeElement.attributes.multiple;
    }
    /**
     * @return {?}
     */
    onChange() {
        /** @type {?} */
        let files = this.element.nativeElement.files;
        /** @type {?} */
        let options = this.getOptions();
        /** @type {?} */
        let filters = this.getFilters();
        this.uploader.addToQueue(files, options, filters);
        this.onFileSelected.emit(files);
        if (this.isEmptyAfterSelection()) {
            this.element.nativeElement.value = '';
        }
    }
}
FileSelectDirective.decorators = [
    { type: Directive, args: [{ selector: '[ng2FileSelect]' },] }
];
/** @nocollapse */
FileSelectDirective.ctorParameters = () => [
    { type: ElementRef }
];
FileSelectDirective.propDecorators = {
    uploader: [{ type: Input }],
    onFileSelected: [{ type: Output }],
    onChange: [{ type: HostListener, args: ['change',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zZWxlY3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWZpbGUtdXBsb2FkLyIsInNvdXJjZXMiOlsiZmlsZS11cGxvYWQvZmlsZS1zZWxlY3QuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR3JELE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFNOUIsWUFBbUIsT0FBbUI7UUFKckIsbUJBQWMsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUtqRixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDOzs7O0lBRU0sVUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVNLFVBQVU7UUFDZixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Ozs7SUFFTSxxQkFBcUI7UUFDMUIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztJQUMxRCxDQUFDOzs7O0lBR00sUUFBUTs7WUFDVCxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSzs7WUFDeEMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUU7O1lBQzNCLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFO1FBRS9CLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEMsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzs7O1lBbkNGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTs7OztZQUpSLFVBQVU7Ozt1QkFNekMsS0FBSzs2QkFDTCxNQUFNO3VCQW9CTixZQUFZLFNBQUMsUUFBUTs7OztJQXJCdEIsdUNBQXVDOztJQUN2Qyw2Q0FBbUY7Ozs7O0lBRW5GLHNDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBJbnB1dCwgSG9zdExpc3RlbmVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRmlsZVVwbG9hZGVyIH0gZnJvbSAnLi9maWxlLXVwbG9hZGVyLmNsYXNzJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nMkZpbGVTZWxlY3RdJyB9KVxuZXhwb3J0IGNsYXNzIEZpbGVTZWxlY3REaXJlY3RpdmUge1xuICBASW5wdXQoKSBwdWJsaWMgdXBsb2FkZXI6IEZpbGVVcGxvYWRlcjtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkZpbGVTZWxlY3RlZDogRXZlbnRFbWl0dGVyPEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVbXT4oKTtcblxuICBwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0T3B0aW9ucygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnVwbG9hZGVyLm9wdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmlsdGVycygpOiBhbnkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHB1YmxpYyBpc0VtcHR5QWZ0ZXJTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlcy5tdWx0aXBsZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScpXG4gIHB1YmxpYyBvbkNoYW5nZSgpOiBhbnkge1xuICAgIGxldCBmaWxlcyA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZpbGVzO1xuICAgIGxldCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XG4gICAgbGV0IGZpbHRlcnMgPSB0aGlzLmdldEZpbHRlcnMoKTtcblxuICAgIHRoaXMudXBsb2FkZXIuYWRkVG9RdWV1ZShmaWxlcywgb3B0aW9ucywgZmlsdGVycyk7XG4gICAgdGhpcy5vbkZpbGVTZWxlY3RlZC5lbWl0KGZpbGVzKTtcblxuICAgIGlmICh0aGlzLmlzRW1wdHlBZnRlclNlbGVjdGlvbigpKSB7XG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxufVxuIl19