
define('main',function(require, exports, module) {
    console.log('_init_')

});

seajs.use('main');


(function () {
    function Abstract() {

    }
    Abstract.prototype = {
        config:{
            isAbstract: true,
            hasLoading: false
        },
        jqueryObj:{

        },
        $element:null,
        view:null,
        events:function () {

        },
        data:{

        },
        setData:function () {

        },
        render:function (callback) {

            console.log('->render')
            callback && callback();
        },
        addEvent:function (callback) {
            console.log('->event')

            callback && callback();
        },
        init:function (callback) {
            console.log('->init')
            callback && callback();
        },
        initialization:function (parameters) {
            var t = this;
            //init param data
            //t.events = $.extend({},t.events, parameters.events)
            //run default line
            if(parameters){
                if (parameters instanceof  $){
                    t.$element = parameters
                    if (t.$element.length == 0){
                        console.error('$element is null.')
                        return
                    }
                }else{
                    t.$element = parameters.$element || t.$element
                    t.jqueryObj = $.extend({}, t.jqueryObj, parameters.jqueryObj)
                    t.config = $.extend({}, t.config, parameters.config)
                    t.data = $.extend({}, t.data, parameters.data)
                    t.events = $.extend({}, t.events, parameters.events)
                }
            }

            t.render && t.render(function () {
                t.addEvent && t.addEvent(function(){
                    t.init && t.init();
                });
            });
        }
    }
    Abstract.extend = function (obj) {
        function SubClass() {
            this.initialization.apply(this,arguments)
        }
        SubClass.prototype = $.extend(true,{},this.prototype,obj);
        SubClass.extend = Abstract.extend;
        return SubClass;
    }

    var view = Abstract.extend({
        data:{
            name:'Fly',
            age:24,
            email:'fangtoby@live.cn'
        },
        events:function () {

        }
    });

    var target = new  view({
        config:{
            hasLoading: true,
            isAsyc: false
        }
    });


})();
