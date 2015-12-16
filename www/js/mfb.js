/**
 * Material floating button
 * By: Nobita
 * Repo and docs: https://github.com/nobitagit/material-floating-button
 *
 * License: MIT
 */


(function(window) {

    'use strict';

    /**
     * Extend Object helper function.
     */
    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    /**
     * Each helper function.
     */
    function each(collection, callback) {
        for (var i = 0; i < collection.length; i++) {
            var item = collection[i];
            callback(item);
        }
    }

    /**
     * Floatingbutton Constructor.
     */
    function Floatingbutton() {
        this._init();
    }

    /**
     * Floatingbutton Options.
     */
    Floatingbutton.prototype.options = {
        clickOpt: 'click',
        hoverOpt: 'hover',
        toggleMethod: 'data-mfb-toggle',
        menuState: 'data-mfb-state',
        isOpen: 'open',
        isClosed: 'closed',
        mainButtonClass: 'mfb-component__button--main'

    };

    /**
     * Initialise Floatingbutton.
     */
    Floatingbutton.prototype._init = function() {
        this._initEvents();
    };

    /**
     * Initialise Floatingbutton Events.
     */
    Floatingbutton.prototype._initEvents = function() {
        if (window.Modernizr && Modernizr.touch) {
            this.elemsToHover = this.getElemsByToggleMethod(this.options.hoverOpt);
            this.replaceAttrs(this.elemsToHover);
        }

        this.elemsToClick = this.getElemsByToggleMethod(this.options.clickOpt);

        this.attachEvt(this.elemsToClick, 'click');

    };

    Floatingbutton.prototype.attachEvt = function(elems, evt) {
        for (var i = 0, len = elems.length; i < len; i++) {
            this.mainButton = elems[i].querySelector('.' + this.mainButtonClass);
            this.mainButton.addEventListener(evt, this.options.toggleButton, false);
        }
    }

    /**
     * Remove the hover option, set a click toggle and a default,
     * initial state of 'closed' to menu that's been targeted.
     */
    Floatingbutton.prototype.replaceAttrs = function(elems) {
        for (var i = 0, len = elems.length; i < len; i++) {
            elems[i].setAttribute(this.options.toggleMethod, this.options.clickOpt);
            elems[i].setAttribute(this.options.menuState, this.options.isClosed);
        }
    }

    Floatingbutton.prototype.getElemsByToggleMethod = function(selector) {
        return document.querySelectorAll('[' + this.options.toggleMethod + '="' + selector + '"]');
    }

    /**
     * The open/close action is performed by toggling an attribute
     * on the menu main element.
     *
     * First, check if the target is the menu itself. If it's a child
     * keep walking up the tree until we found the main element
     * where we can toggle the state.
     */
    Floatingbutton.prototype.toggleButton = function(evt) {

        this.target = evt.target;
        while (this.target && !this.target.getAttribute(this.options.toggleMethod)) {
            this.target = this.target.parentNode;
            if (!this.target) {
                return;
            }
        }

        this.currentState = this.target.getAttribute(this.options.menuState) === this.options.isOpen ? this.options.isClosed : this.options.isOpen;

        this.target.setAttribute(this.options.menuState, this.currentState);

    }

    /**
     * Add to global namespace.
     */
    window.Floatingbutton = Floatingbutton;

})(window);
