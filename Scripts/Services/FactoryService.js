ticketDesigner.service('ObjectFactory', function () {
    var objectDefaults = {
        originX: 'left',
        originY: 'top',
        scaleX: 1,
        scaleY: 1,
        width: 100,
        height: 100,
        padding: 0,
        centeredScaling: false,
        centeredRotation: true,
        opacity: 1,
        left: 20,
        top: 20,
        angle: 0
    };


    var rectangleDefaults = angular.extend({
        type: 'rect',
        fill: '#' + getRandomColor()
    }, objectDefaults);

    return {
        newRect: function(text){
            return new fabric.Rect(rectangleDefaults);
            //
            //return "Factory says \"Hello " + text + "\"";
        }
        //sayGoodbye: function(text){
        //
        //    //return "Factory says \"Goodbye " + text + "\"";
        //}
    }
});