/*  global module  */

(function() {
    function init(cfg) {
        if (window.loading) {
            loading.refresh(cfg);
        } else {
            window.loading = new daggerLoading(cfg);
        }
        return window.loading;
    }

    function daggerLoading( cfg ) {
        var loadingSvg = '<svg id="dagger-loading" viewBox="0 0 44 44"><title>Loading animation</title><g id="dagger-loading-pane" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="loading-circle" stroke-width="3"><circle id="circle-back-face" stroke="#5B5B5C" cx="22" cy="22" r="20"></circle><circle id="circle-front-face" stroke="#188BF9" cx="22" cy="22" r="20"></circle></g><g id="result-success" transform="translate(2, 3)" stroke="#188BF9" stroke-width="3"><path d="M7.43725586,19.375 L15.6247559,27.625 L31.9372559,11.4375" stroke-linecap="round"></path></g><g id="result-failure" transform="translate(2, 3)" stroke="#FC4B4C" stroke-width="3"><path stroke-linecap="round" d="M10.125,10.09375 L29.9375,29.78125"></path><path stroke-linecap="round" d="M10.125,10.09375 L29.9375,29.78125" transform="translate(20.031250, 19.937500) scale(-1, 1) translate(-20.031250, -19.937500) "></path></g></g></svg>',
            statusTemp = '<div class="status-group"><p class="status"></p></div>',
            body = document.querySelector('body');

        var loadingDom = document.createElement('div');
        loadingDom.className = 'dagger-loading-content';
        loadingDom.style.display = 'none';
        loadingDom.innerHTML = loadingSvg + statusTemp;
        body.appendChild(loadingDom);

        var defCfg = {
            loadingText: '加载中',
            succesText: '加载成功',
            failureText: '加载失败'
            },
            config = cfg || {};

        for (var k in config) {
            defCfg[k] = config[k];
        }

        this.elem = loadingDom;
        this.config = defCfg;
    }

    daggerLoading.prototype = {
        refresh: function( cfg ) {
            var config = cfg || {};
            for (var key in config) {
                this.config[key] = config[key];
            }

            return this;
        },

        show: function(text, duration) {
            this.elem.querySelector('p.status').textContent = text || this.config.loadingText;
            if (duration) {
                if (this.elem.style.display !== 'none') {
                    return;
                }

                var opacity = 0, _self = this;
                this.elem.style.opacity = 0;
                this.elem.style.display = 'block';

                var fadeIn = window.setInterval(function() {
                    if (opacity >= 1) {
                        window.clearInterval(fadeIn);
                    } else {
                        _self.elem.style.opacity = opacity = opacity + 0.2;
                    }

                }, duration);
            } else {
                this.elem.style.opacity = 1;
                this.elem.style.display = 'block';
            }
        },

        hide: function(duration, callback) {
            var text = this.config.loadingText;
            if (duration && typeof duration != 'function') {
                var opacity = 1, _self = this;
                var fadeOut = window.setInterval(function () {
                    if (opacity <= 0) {
                        window.clearInterval(fadeOut);
                        _self.elem.style.display = 'none';
                        _self.elem.querySelector('p.status').textContent = text;

                        if (callback && typeof callback === 'function') {
                            callback.apply(_self.elem, [])
                        }
                    } else {
                        _self.elem.style.opacity = opacity = opacity - 0.2;
                    }
                }, duration || 0);
            } else {
                this.elem.style.display = 'none';
                this.elem.querySelector('p.status').textContent = text;

                if (duration && typeof duration === 'function') {
                    duration.apply(this.elem, []);
                }
            }
        },

        success: function(text) {
            this.elem.querySelector('#result-success').style.display = 'block';
            this._showStatusLoading(text || this.config.succesText, 'success');
        },

        fail: function(text) {
            this.elem.querySelector('#result-failure').style.display = 'block';
            this._showStatusLoading(text || this.config.failureText, 'failure');
        },


        _showStatusLoading: function(text, statusCls) {
            var svg = this.elem.querySelector('svg#dagger-loading');
            this.elem.querySelector('div.status-group').classList.add('complete');
            svg.classList.add(statusCls);
            this.show(text, 70);

            var _self = this,  _completeTimeout;
            svg.addEventListener('webkitAnimationEnd', animateEndEvent, false);

            function animateEndEvent(event) {
                svg.removeEventListener('webkitAnimationEnd', animateEndEvent, false);
                if (_completeTimeout) {
                    return;
                }

                _completeTimeout = setTimeout(function() {
                    _self.complete();
                    window.clearTimeout(_completeTimeout);
                    _completeTimeout = null;
                }, 1000);
            }
        },

        complete: function() {
            this.elem.querySelector('div.status-group').classList.remove('complete');

            this.hide(70, function() {
                this.querySelector('#result-success').style.display = 'none';
                this.querySelector('#result-failure').style.display = 'none';
                var svg = this.querySelector('svg#dagger-loading');
                svg.classList.remove('success');
                svg.classList.remove('failure');
            });
        }
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = init;
    } else if (define && typeof define === 'function') {
        define([], function() {
            return init;
        });
    }
})();
