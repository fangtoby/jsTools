/**
 *
 * jQuery 实现原理
 *
 * Created by toby on 5/7/16.
 *
 *
 * 
 */

/*
 html:
 <div>
 <button id="test_on_event">Event</button>
 </div>
 <div id="but_box"></div>
*/

(function () {
    var test_on_event = document.getElementById('test_on_event')
    var but_box = document.getElementById('but_box')

    test_on_event.addEventListener('click',function (e) {
        console.log('test_on_event')
        but_box.innerHTML = '<button id="test_after_create_on_event">Event After Create</button>'
        e.stopPropagation()
    })

    var _event = {
        objs:{

        },
        /**
         *
         * @param event
         * @param target
         * @param callbck
         */
        on:function (event,target,callbck) {
            var t = this
            if(!t.objs[target]){
                t.objs[target] = callbck
            }
        },
        /**
         * 
         * @param e
         */
        listen:function (e) {
            var t = this,_target = e.target.id
            if( t.objs[_target])
                t.objs[_target](e)
        }
    }
    
    _event.on('click','test_after_create_on_event',function (e) {
        console.log('test_after_create_on_event')
    })
    
    document.addEventListener('click',function (e) {
        _event.listen(e)
        console.log(e)
    })

})()