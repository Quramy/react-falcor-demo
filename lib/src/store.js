"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('events');
var falcor = require('falcor/browser');
var Store = (function (_super) {
    __extends(Store, _super);
    function Store(option) {
        var _this = this;
        var opt = option;
        var originalCallback = option.onChange || (function () { });
        opt.onChange = function () {
            _this.emitter.emit('change');
        };
        _super.call(this, opt);
        this.emitter = new events_1.EventEmitter();
    }
    Store.createFromModel = function (rawModel) {
        return new Store({
            source: rawModel.asDataSource()
        });
    };
    Store.createFromCache = function (caceh) {
        return new Store({
            caceh: caceh
        });
    };
    Store.prototype.addChangeListener = function (query, onSuccess) {
        var _this = this;
        var handler = function () {
            _this.get(query).then(function (res) {
                if (res && res.json) {
                    onSuccess(res.json);
                }
            });
        };
        this.emitter.on('change', handler);
        var off = function () {
            _this.emitter.removeListener('change', handler);
        };
        return off;
    };
    return Store;
}(falcor.Model));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Store;
