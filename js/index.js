;(function(global, $, undefined) {

    'use strict';

    // utility
    var Util = (function() {

        var resize = function() {
            document.documentElement.style.zoom = global.innerWidth / 320;
        };

        var getTime = function() {
            var now = global.performance.now || global.performance.webkitNow;
            var time = (now && now.call(global.performance)) || (new Date().getTime());
            return time;
        };

        return {
            resize: resize,
            getTime: getTime
        };

    })();

    // mogura class
    var Mogura = (function() {

        var mg = function() {
               this.element = $('<div></div>').addClass('mogura').html('も');
        }
        mg.prototype = {
            append: function(target) {
                  this.element.appendTo(target);
                this.element.on('click', function() {
                    this.remove();
                });
            },
            remove: function() {
                this.element.remove();
            }
        }

        return mg;

    })();

    // game main
    var Main = (function() {

        var config = {
            cell: {
                numX: 5,
                numY: 5
            }
        };

        var mogura = null;
        var baseTime = 0;

        var init = function() {
            $(global).on('resize', Util.resize);
            Util.resize();
            mogura = new Mogura();
            _render();
        }

        function _render() {
           var time = Util.getTime();

           if (time - baseTime >= 3000) {
               if (mogura !== null) {
                   mogura.remove();
               }

               var totalCell = config.cell.numX * config.cell.numY;
               var cellPos = Math.floor(Math.random() * totalCell);
               var $cell = $($('.td').get(cellPos));

               mogura.append($cell);
               baseTime = time;
           }
           global.webkitRequestAnimationFrame(_render);
        }

        return {
            start: init
        };

    })();

    Main.start();

})(window, jQuery);
