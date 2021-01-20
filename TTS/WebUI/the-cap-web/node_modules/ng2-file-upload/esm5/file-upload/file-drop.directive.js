/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileUploader } from './file-uploader.class';
var FileDropDirective = /** @class */ (function () {
    function FileDropDirective(element) {
        this.fileOver = new EventEmitter();
        this.onFileDrop = new EventEmitter();
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
        { type: Directive, args: [{ selector: '[ng2FileDrop]' },] }
    ];
    /** @nocollapse */
    FileDropDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    FileDropDirective.propDecorators = {
        uploader: [{ type: Input }],
        fileOver: [{ type: Output }],
        onFileDrop: [{ type: Output }],
        onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }],
        onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
        onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }]
    };
    return FileDropDirective;
}());
export { FileDropDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1maWxlLXVwbG9hZC8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL2ZpbGUtZHJvcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRyxPQUFPLEVBQUUsWUFBWSxFQUF1QixNQUFNLHVCQUF1QixDQUFDO0FBRTFFO0lBUUUsMkJBQW1CLE9BQW1CO1FBTHJCLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxlQUFVLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFLN0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQzs7OztJQUVNLHNDQUFVOzs7SUFBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFFTSxzQ0FBVTs7O0lBQWpCO1FBQ0UsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7OztJQUdNLGtDQUFNOzs7O0lBRGIsVUFDYyxLQUFVOztZQUNsQixRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLE9BQU87U0FDUjs7WUFFRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRTs7WUFDM0IsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFHTSxzQ0FBVTs7OztJQURqQixVQUNrQixLQUFVOztZQUN0QixRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BDLE9BQU87U0FDUjtRQUVELFFBQVEsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFHTSx1Q0FBVzs7OztJQURsQixVQUNtQixLQUFVO1FBQzNCLElBQUksQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUN6QixJQUFJLEtBQUssQ0FBQyxhQUFhLEtBQUssQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUUsRUFBRTtnQkFDdEQsT0FBTzthQUNSO1NBQ0Y7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7Ozs7OztJQUVTLHdDQUFZOzs7OztJQUF0QixVQUF1QixLQUFVO1FBQy9CLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxjQUFjO0lBQ25HLENBQUM7Ozs7OztJQUVTLDJDQUFlOzs7OztJQUF6QixVQUEwQixLQUFVO1FBQ2xDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBRVMsc0NBQVU7Ozs7O0lBQXBCLFVBQXFCLEtBQVU7UUFDN0IsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO2FBQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ3pCLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7O2dCQWhGRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFOzs7O2dCQUpOLFVBQVU7OzsyQkFNekMsS0FBSzsyQkFDTCxNQUFNOzZCQUNOLE1BQU07eUJBZ0JOLFlBQVksU0FBQyxNQUFNLEVBQUUsQ0FBRSxRQUFRLENBQUU7NkJBZWpDLFlBQVksU0FBQyxVQUFVLEVBQUUsQ0FBRSxRQUFRLENBQUU7OEJBWXJDLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBRSxRQUFRLENBQUU7O0lBa0N6Qyx3QkFBQztDQUFBLEFBakZELElBaUZDO1NBaEZZLGlCQUFpQjs7O0lBQzVCLHFDQUF1Qzs7SUFDdkMscUNBQWtFOztJQUNsRSx1Q0FBK0U7Ozs7O0lBRS9FLG9DQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRmlsZVVwbG9hZGVyLCBGaWxlVXBsb2FkZXJPcHRpb25zIH0gZnJvbSAnLi9maWxlLXVwbG9hZGVyLmNsYXNzJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nMkZpbGVEcm9wXScgfSlcbmV4cG9ydCBjbGFzcyBGaWxlRHJvcERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIHB1YmxpYyB1cGxvYWRlcjogRmlsZVVwbG9hZGVyO1xuICBAT3V0cHV0KCkgcHVibGljIGZpbGVPdmVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkZpbGVEcm9wOiBFdmVudEVtaXR0ZXI8RmlsZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVtdPigpO1xuXG4gIHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPcHRpb25zKCk6IEZpbGVVcGxvYWRlck9wdGlvbnMge1xuICAgIHJldHVybiB0aGlzLnVwbG9hZGVyLm9wdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmlsdGVycygpOiBhbnkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbICckZXZlbnQnIF0pXG4gIHB1YmxpYyBvbkRyb3AoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGxldCB0cmFuc2ZlciA9IHRoaXMuX2dldFRyYW5zZmVyKGV2ZW50KTtcbiAgICBpZiAoIXRyYW5zZmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcbiAgICBsZXQgZmlsdGVycyA9IHRoaXMuZ2V0RmlsdGVycygpO1xuICAgIHRoaXMuX3ByZXZlbnRBbmRTdG9wKGV2ZW50KTtcbiAgICB0aGlzLnVwbG9hZGVyLmFkZFRvUXVldWUodHJhbnNmZXIuZmlsZXMsIG9wdGlvbnMsIGZpbHRlcnMpO1xuICAgIHRoaXMuZmlsZU92ZXIuZW1pdChmYWxzZSk7XG4gICAgdGhpcy5vbkZpbGVEcm9wLmVtaXQodHJhbnNmZXIuZmlsZXMpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbICckZXZlbnQnIF0pXG4gIHB1YmxpYyBvbkRyYWdPdmVyKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBsZXQgdHJhbnNmZXIgPSB0aGlzLl9nZXRUcmFuc2ZlcihldmVudCk7XG4gICAgaWYgKCF0aGlzLl9oYXZlRmlsZXModHJhbnNmZXIudHlwZXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgICB0aGlzLl9wcmV2ZW50QW5kU3RvcChldmVudCk7XG4gICAgdGhpcy5maWxlT3Zlci5lbWl0KHRydWUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyAnJGV2ZW50JyBdKVxuICBwdWJsaWMgb25EcmFnTGVhdmUoZXZlbnQ6IGFueSk6IGFueSB7XG4gICAgaWYgKCh0aGlzIGFzIGFueSkuZWxlbWVudCkge1xuICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQgPT09ICh0aGlzIGFzIGFueSkuZWxlbWVudFsgMCBdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9wcmV2ZW50QW5kU3RvcChldmVudCk7XG4gICAgdGhpcy5maWxlT3Zlci5lbWl0KGZhbHNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2V0VHJhbnNmZXIoZXZlbnQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGV2ZW50LmRhdGFUcmFuc2ZlciA/IGV2ZW50LmRhdGFUcmFuc2ZlciA6IGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyOyAvLyBqUXVlcnkgZml4O1xuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmV2ZW50QW5kU3RvcChldmVudDogYW55KTogYW55IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9oYXZlRmlsZXModHlwZXM6IGFueSk6IGFueSB7XG4gICAgaWYgKCF0eXBlcykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0eXBlcy5pbmRleE9mKSB7XG4gICAgICByZXR1cm4gdHlwZXMuaW5kZXhPZignRmlsZXMnKSAhPT0gLTE7XG4gICAgfSBlbHNlIGlmICh0eXBlcy5jb250YWlucykge1xuICAgICAgcmV0dXJuIHR5cGVzLmNvbnRhaW5zKCdGaWxlcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=