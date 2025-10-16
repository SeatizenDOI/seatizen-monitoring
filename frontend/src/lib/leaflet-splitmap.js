/**
 * For next project, we need to import manually the css.
 * 
 * 
 * 
 * Copyright (c) 2015 Gregor MacLennan

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.


# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [leaflet-splitmap]

- ADDED: Allows Leaflet version 0.7.7 through 1.x

## [leaflet-side-by-side v2.0.0] - 2015-12-08

- ADDED: Add `setLeftLayers()` and `setRightLayers()` methods
- ADDED: `options.padding`
- ADDED: `getPosition()` returns the x coordinate (relative to the map container) of the divider
- FIXED: **[BREAKING]** Export factory function on `L.control` not `L.Control`
- FIXED: Slider drag was not working on touch devices

## [leaflet-side-by-side v1.1.1] - 2015-12-03

- FIXED: fix package.json settings for npm distribution

## [leaflet-side-by-side v1.1.0] - 2015-12-03

- ADDED: Events
- FIXED: Fix initial divider position in Firefox, should start in middle of map

## [leaflet-side-by-side] v1.0.2 - 2015-12-02

Initial release


### License

MIT
 */

import { DomEvent, Control, setOptions, version, Evented, Mixin, DomUtil, control } from "leaflet";

var mapWasDragEnabled;
var mapWasTapEnabled;

// Leaflet v0.7 backwards compatibility
function on(el, types, fn, context) {
    types.split(" ").forEach(function (type) {
        DomEvent.on(el, type, fn, context);
    });
}

// Leaflet v0.7 backwards compatibility
function off(el, types, fn, context) {
    types.split(" ").forEach(function (type) {
        DomEvent.off(el, type, fn, context);
    });
}

function getRangeEvent(rangeInput) {
    return "oninput" in rangeInput ? "input" : "change";
}

function cancelMapDrag() {
    mapWasDragEnabled = this._map.dragging.enabled();
    mapWasTapEnabled = this._map.tap && this._map.tap.enabled();
    this._map.dragging.disable();
    if (this._map.tap) {
        this._map.tap.disable();
    }
}

function uncancelMapDrag(e) {
    this._refocusOnMap(e);
    if (mapWasDragEnabled) {
        this._map.dragging.enable();
    }
    if (mapWasTapEnabled) {
        this._map.tap.enable();
    }
}

// convert arg to an array - returns empty array if arg is undefined
function asArray(arg) {
    return arg === "undefined" ? [] : Array.isArray(arg) ? arg : [arg];
}

function noop() {
    return;
}

Control.SplitMap = Control.extend({
    options: {
        thumbSize: 42,
        padding: 0,
    },

    initialize: function (leftLayers, rightLayers, options) {
        this._leftLayers = asArray(leftLayers);
        this._rightLayers = asArray(rightLayers);
        this._updateClip();
        setOptions(this, options);
    },

    getPosition: function () {
        var rangeValue = this._range.value;
        var offset = (0.5 - rangeValue) * (2 * this.options.padding + this.options.thumbSize);
        return this._map.getSize().x * rangeValue + offset;
    },

    setPosition: noop,

    includes: version.split(".")[0] === "1" ? Evented.prototype : Mixin.Events,

    addTo: function (map) {
        this.remove();
        this._map = map;
        var container = (this._container = DomUtil.create("div", "leaflet-sbs", map._controlContainer));
        this._divider = DomUtil.create("div", "leaflet-sbs-divider", container);

        // Add left panel
        this._leftPanel = DomUtil.create("div", "leaflet-sbs-panel leaflet-sbs-panel-left", this._divider);
        this._leftPanel.innerHTML = "Left panel";

        // Add right panel
        this._rightPanel = DomUtil.create("div", "leaflet-sbs-panel leaflet-sbs-panel-right", this._divider);
        this._rightPanel.innerHTML = "Right panel";

        var range = (this._range = DomUtil.create("input", "leaflet-sbs-range", container));
        range.type = "range";
        range.min = 0;
        range.max = 1;
        range.step = "any";
        range.value = 0.5;
        range.style.paddingLeft = range.style.paddingRight = this.options.padding + "px";
        this._addEvents();
        this._updateClip();
        return this;
    },

    remove: function () {
        if (!this._map) {
            return this;
        }
        this._leftLayers.forEach((left_layer) => {
            if (left_layer.getContainer) {
                left_layer.getContainer().style.clip = "";
            } else {
                left_layer.getPane().style.clip = "";
            }
        });

        this._rightLayers.forEach((right_layer) => {
            if (right_layer.getContainer) {
                right_layer.getContainer().style.clip = "";
            } else {
                right_layer.getPane().style.clip = "";
            }
        });
        this._removeEvents();
        DomUtil.remove(this._container);
        this._map = null;
        return this;
    },

    _updateClip: function () {
        if (!this._map) {
            return this;
        }
        var map = this._map;
        var nw = map.containerPointToLayerPoint([0, 0]);
        var se = map.containerPointToLayerPoint(map.getSize());
        var clipX = nw.x + this.getPosition();
        var dividerX = this.getPosition();
        this._divider.style.left = dividerX + "px";
        this.fire("dividermove", { x: dividerX });
        var clipLeft = "rect(" + [nw.y, clipX, se.y, nw.x].join("px,") + "px)";
        var clipRight = "rect(" + [nw.y, se.x, se.y, clipX].join("px,") + "px)";

        this._leftLayers.forEach((left_layer) => {
            if (left_layer.getContainer) {
                left_layer.getContainer().style.clip = clipLeft;
            } else {
                left_layer.getPane().style.clip = clipLeft;
            }
        });

        this._rightLayers.forEach((right_layer) => {
            if (right_layer.getContainer) {
                right_layer.getContainer().style.clip = clipRight;
            } else {
                right_layer.getPane().style.clip = clipRight;
            }
        });
    },

    _addEvents: function () {
        var range = this._range;
        var map = this._map;
        if (!map || !range) return;
        map.on("move", this._updateClip, this);
        map.on("layeradd layerremove", this._updateLayers, this);
        on(range, getRangeEvent(range), this._updateClip, this);
        on(range, "ontouchstart" in window ? "touchstart" : "mousedown", cancelMapDrag, this);
        on(range, "ontouchend" in window ? "touchend" : "mouseup", uncancelMapDrag, this);
    },

    _removeEvents: function () {
        var range = this._range;
        var map = this._map;
        if (range) {
            off(range, getRangeEvent(range), this._updateClip, this);
            off(range, "ontouchstart" in window ? "touchstart" : "mousedown", cancelMapDrag, this);
            off(range, "ontouchend" in window ? "touchend" : "mouseup", uncancelMapDrag, this);
        }
        if (map) {
            map.off("layeradd layerremove", this._updateLayers, this);
            map.off("move", this._updateClip, this);
        }
    },
});

control.splitMap = function (leftLayers, rightLayers, options) {
    return new Control.SplitMap(leftLayers, rightLayers, options);
};

export default Control.SplitMap;
