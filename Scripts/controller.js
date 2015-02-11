// OBJECTS PROPERTIES & STYLES - SETTING AND GETTING
function getActiveStyle(styleName, object) {
    object = object || canvas.getActiveObject();
    
    if (typeof object !== 'object' || object === null) {
        return '';
    }

    return (object.getSelectionStyles && object.isEditing)
      ? (object.getSelectionStyles()[styleName] || '')
      : (object[styleName] || '');
}

function setActiveStyle(styleName, value, object) {
    object = object || canvas.getActiveObject();
    if (!object) return;

    if (object.setSelectionStyles && object.isEditing) {
        var style = {};
        style[styleName] = value;
        object.setSelectionStyles(style);
        object.setCoords();
    }
    else {
        object[styleName] = value;
    }

    object.setCoords();
    canvas.renderAll();
}

function getActiveProp(name) {
  var object = canvas.getActiveObject();
  if (!object) return '';

  return object[name] || '';
}

function setActiveProp(name, value) {
  var object = canvas.getActiveObject();
  if (!object) return;

  object.set(name, value).setCoords();
  canvas.renderAll();
}

function addAccessors($scope) {

    // TEXT MANIPULATION
    $scope.isBold = function () {
        return getActiveStyle('fontWeight') === 'bold';
    };
    $scope.toggleBold = function () {
        setActiveStyle('fontWeight',
          getActiveStyle('fontWeight') === 'bold' ? '' : 'bold');
    };
    $scope.isItalic = function () {
        return getActiveStyle('fontStyle') === 'italic';
    };
    $scope.toggleItalic = function () {
        setActiveStyle('fontStyle',
          getActiveStyle('fontStyle') === 'italic' ? '' : 'italic');
    };
    $scope.isUnderline = function () {
        return getActiveStyle('textDecoration').indexOf('underline') > -1;
    };
    $scope.toggleUnderline = function () {
        var value = $scope.isUnderline()
          ? getActiveStyle('textDecoration').replace('underline', '')
          : (getActiveStyle('textDecoration') + ' underline');

        setActiveStyle('textDecoration', value);
    };
    $scope.isLinethrough = function () {
        return getActiveStyle('textDecoration').indexOf('line-through') > -1;
    };
    $scope.toggleLinethrough = function () {
        var value = $scope.isLinethrough()
          ? getActiveStyle('textDecoration').replace('line-through', '')
          : (getActiveStyle('textDecoration') + ' line-through');

        setActiveStyle('textDecoration', value);
    };
    $scope.isOverline = function () {
        return getActiveStyle('textDecoration').indexOf('overline') > -1;
    };
    $scope.toggleOverline = function () {
        var value = $scope.isOverline()
          ? getActiveStyle('textDecoration').replace('overline', '')
          : (getActiveStyle('textDecoration') + ' overline');

        setActiveStyle('textDecoration', value);
    };
    $scope.getText = function () {
        return getActiveProp('text');
    };
    $scope.setText = function (value) {
        setActiveProp('text', value);
    };
    $scope.getTextAlign = function () {
        return capitalize(getActiveProp('textAlign'));
    };
    $scope.setTextAlign = function (value) {
        setActiveProp('textAlign', value.toLowerCase());
    };
    $scope.getTextBgColor = function () {
        return getActiveProp('textBackgroundColor');
    };
    $scope.setTextBgColor = function (value) {
        setActiveProp('textBackgroundColor', value);
    };
    $scope.getFontFamily = function () {
        return getActiveProp('fontFamily').toLowerCase();
    };
    $scope.setFontFamily = function (value) {
        setActiveProp('fontFamily', value.toLowerCase());
    };
    $scope.getFontSize = function () {
        return getActiveStyle('fontSize');
    };
    $scope.setFontSize = function (value) {
        setActiveStyle('fontSize', parseInt(value, 10));
    };
    $scope.getLineHeight = function () {
        return getActiveStyle('lineHeight');
    };
    $scope.setLineHeight = function (value) {
        setActiveStyle('lineHeight', parseFloat(value));
    };
    $scope.getBold = function () {
        return getActiveStyle('fontWeight');
    };
    $scope.setBold = function (value) {
        setActiveStyle('fontWeight', value ? 'bold' : '');
    };

    // COLORS & BRUSHES

    $scope.getBgColor = function () {
        return getActiveStyle('backgroundColor');
    };
    $scope.setBgColor = function (value) {
        setActiveStyle('backgroundColor', value);
    };
    $scope.getOpacity = function () {
        return getActiveStyle('opacity') * 100;
    };
    $scope.setOpacity = function (value) {
        setActiveStyle('opacity', parseInt(value, 10) / 100);
    };
    $scope.getFill = function () {
        return getActiveStyle('fill');
    };
    $scope.setFill = function (value) {
        setActiveStyle('fill', value);
    };
    $scope.getStrokeColor = function () {
        return getActiveStyle('stroke');
    };
    $scope.setStrokeColor = function (value) {
        setActiveStyle('stroke', value);
    };
    $scope.getStrokeWidth = function () {
        return getActiveStyle('strokeWidth');
    };
    $scope.setStrokeWidth = function (value) {
        setActiveStyle('strokeWidth', parseInt(value, 10));
    };

    // LOCKING / UNLOCKING

    $scope.getHorizontalLock = function () {
        return getActiveProp('lockMovementX');
    };
    $scope.setHorizontalLock = function (value) {
        setActiveProp('lockMovementX', value);
    };
    $scope.getVerticalLock = function () {
        return getActiveProp('lockMovementY');
    };
    $scope.setVerticalLock = function (value) {
        setActiveProp('lockMovementY', value);
    };
    $scope.getScaleLockX = function () {
        return getActiveProp('lockScalingX');
    };
    $scope.setScaleLockX = function (value) {
        setActiveProp('lockScalingX', value);
    };
    $scope.getScaleLockY = function () {
        return getActiveProp('lockScalingY');
    };
    $scope.setScaleLockY = function (value) {
        setActiveProp('lockScalingY', value);
    };
    $scope.getRotationLock = function () {
        return getActiveProp('lockRotation');
    };
    $scope.setRotationLock = function (value) {
        setActiveProp('lockRotation', value);
    };

    // TRANSFORMATIONS - SCALING, ROTATION AND ORIGIN

    $scope.getOriginX = function () {
        return getActiveProp('originX');
    };
    $scope.setOriginX = function (value) {
        setActiveProp('originX', value);
    };
    $scope.getOriginY = function () {
        return getActiveProp('originY');
    };
    $scope.setOriginY = function (value) {
        setActiveProp('originY', value);
    };

    $scope.getWidth = function () {
        return getActiveProp('width');
    };
    $scope.setWidth = function (value) {
        setActiveProp('width', value);
    };
    $scope.getHeight = function () {
        return getActiveProp('height');
    };
    $scope.setHeight = function (value) {
        setActiveProp('height', value);
    };

    $scope.getAngle = function () {
        return getActiveProp('angle');
    };
    $scope.setAngle = function (value) {
        setActiveProp('angle', value);
    };

    $scope.getScaleX = function () {
        return getActiveProp('scaleX');
    };
    $scope.setScaleX = function (value) {
        setActiveProp('scaleX', value);
    };
    $scope.getScaleY = function () {
        return getActiveProp('scaleY');
    };
    $scope.setScaleY = function (value) {
        setActiveProp('scaleY', value);
    };

    // LAYERS MANIPULATION

    $scope.sendBackwards = function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.sendBackwards(activeObject);
        }
    };
    $scope.sendToBack = function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.sendToBack(activeObject);
        }
    };
    $scope.bringForward = function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.bringForward(activeObject);
        }
    };
    $scope.bringToFront = function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.bringToFront(activeObject);
        }
    };

    // CANVAS MANIPULATION

    $scope.getCanvasBackgroundColor = function () {
        return canvas.backgroundColor;
    };
    $scope.setCanvasBackgroundColor = function (value) {
        canvas.setBackgroundColor(value, canvas.renderAll.bind(canvas));
    };
    $scope.getCanvasWidth = function () {
        return canvas.getWidth();
    };
    $scope.setCanvasWidth = function (value) {
        canvas.setWidth(value);
        canvas.calcOffset();
    };
    $scope.getCanvasHeight = function () {
        return canvas.getHeight();
    };
    $scope.setCanvasHeight = function (value) {
        canvas.setHeight(value);
        canvas.calcOffset();
    };

    $scope.getCanvasBackgroundOpacity = function () {
        return canvas.backgroundImage ? canvas.backgroundImage.getOpacity() * 100 : '';
    };
    $scope.setCanvasBackgroundOpacity = function (value) {
        if (canvas.backgroundImage) {
            canvas.backgroundImage.setOpacity(parseInt(value, 10) / 100);
        }
    };
    $scope.setCanvasBackgroundImage = function (imagePath) {
        canvas.setBackgroundImage(imagePath, canvas.renderAll.bind(canvas));
    };
    $scope.getCanvasBackgroundImage = function () {
        return canvas.backgroundImage ? canvas.backgroundImage.getSrc() : '';
    };
    $scope.setCanvasBackgroundImageStyle = function (style) {
        if (!canvas.backgroundImage || !style) return '';

        if (style == 'Center') {
            canvas.backgroundImage.center().setCoords();
        }
        else if (style == 'Fill') {
            canvas.backgroundImage.set(
                {
                    width: canvas.width,
                    height: canvas.height,
                    originX: 'left',
                    originY: 'top'
                }).setCoords();
        }
    };
    $scope.getCanvasBackgroundImageStyle = function () {
        canvas.backgroundImage ? getActiveStyle("backgroundStyle", canvas) : '';
    };

    // CLEARING & SELECTION

    $scope.confirmClear = function () {
        if (confirm('Are you sure?')) {
            canvas.clear();
        }
    };
    $scope.getSelected = function () {
        return canvas.getActiveObject();
    };
    $scope.removeSelected = function () {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();

        if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function (object) {
                canvas.remove(object);
            });
        }
        else if (activeObject) {
            canvas.remove(activeObject);
        }
    };

    $scope.title = 'Designer';

    //function initCustomization() {
    //    if (typeof Cufon !== 'undefined' && Cufon.fonts.delicious) {
    //        Cufon.fonts.delicious.offsetLeft = 75;
    //        Cufon.fonts.delicious.offsetTop = 25;
    //    }
    //
    //    if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
    //        fabric.Object.prototype.cornerSize = 30;
    //    }
    //
    //    fabric.Object.prototype.transparentCorners = false;
    //
    //    if (document.location.search.indexOf('guidelines') > -1) {
    //        initCenteringGuidelines(canvas);
    //        initAligningGuidelines(canvas);
    //    }
    //}
    //
    //initCustomization();

    // 
    function getProperty(object, property) {
        var propertyValue = $(object).find(property).text();

        return propertyValue;
    }

    $scope.textElements = [
        {
            fontFamily: 'arial'
        }, {
            fontFamily:'helvetica'
        }];

    $scope.parseXml = function () {
        var xmlText = $('#xmlContainer').val();

        $scope.textElements = [];
        ////  <X>20</X>
        ////  <Y>700</Y>
        ////  <Rotation>0</Rotation>
        //  <Text>[Event.Name]</Text>
        //  <Name>EventName</Name>
        //  <Visible>true</Visible>
        ////  <Font>Tahoma</Font>
        ////  <FontColor>black</FontColor>
        //  <Leading>0</Leading>
        //  <Size>20</Size>
        //  <Style>bold</Style>
        //  <Width>480</Width>
        //  <Height>30</Height>
        //  <Alignment>Center</Alignment>
        var objects = jQuery.parseXML(xmlText);

        $(objects).find('TextElement').each(function (index) {
            var textObj;
            var textObj2;
            var properties = {
                left: getProperty(this, 'X'),
                top: getProperty(this, 'Y'),
                fontFamily: getProperty(this, 'Font'),
                //angle: getProperty(this, 'Rotation'),
                fill: '#0000FF',
                //getProperty(this, 'FontColor'
                fontSize: getProperty(this, 'Size'),
                width: getProperty(this, 'Width'),
                height: getProperty(this, 'Height')
            };

            $.each(properties, function(key, element) {
                //alert('key: ' + key + '\n' + 'value: ' + element);
            });

            //var textProp = angular.extend($scope.textDefaults, properties);
            var text    = getProperty(this, 'Text');



            textObj = new fabric.Text(text, $scope.textDefaults);
            textObj2 = new fabric.Text(text, properties);


            $scope.textElements.push(textObj);

            $scope.textElements.push(textObj2);

            canvas.add(textObj);
           // canvas.add(textObj2);

        });


        canvas.renderAll();
    };
}

var images = [];

$(document).ready(function () {
    loadImages();
});

function refreshCanvas(){
    canvas.renderAll();
}
function loadImages() {
    console.log('load images method');

    var directory = '/Content/Files/Images/';
    var extension = '.png';

    jQuery.ajax({
        url: directory,
        success: function (data) {

            //// List all pngs
            //$(data).find('a:contains(' + extension + ')').each(function () {
            //
            //    // Wycinanie relatywnego URLa
            //    var path = this.href.replace(window.location.host, "").replace("http://", "");
            //
            //    // Wycinanie nazwy pliku
            //    var filename = path.substr(path.lastIndexOf('/') + 1);
            //
            //    //console.log("dir: " + directory);
            //    //console.log("filename: " + filename);
            //    //console.log("path: " + path);
            //
            //
            //    var image = {
            //        name: filename,
            //        url: path
            //    };
            //
            //    images.push(image);
            //});

            appendDropdownOptions('backgroundImageSelector', images);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function appendDropdownOptions(dropdownId, options) {
    console.log('Filling dropdown...');

    var dropdown = $('#' + dropdownId);

    if (!dropdown || !options) return;

    $.each(options, function (i, option) {
        $(dropdown).append(
            $('<option />', {
                'text': option.name,
                'value': option.url
            }));
    });

    console.log('dropdown filled');
}

function initializeDefaults($scope) {
    var objectDefaults = {
        originX: 'left',
        originY: 'top',
        scaleX: 1,
        scaleY: 1,
        width: 100,
        height: 100,
        padding: 10,
        centeredScaling: false,
        centeredRotation: true,
        opacity: 1,
        left: 20,
        top: 20,
        angle: 0
    };

    $scope.textDefaults = angular.extend({
        type: 'text',
        fontFamily: 'helvetica',
        fill: '#' + getRandomColor()
    }, objectDefaults);

    $scope.circleDefaults = angular.extend({
        radius: 50,
        centeredScaling: true,
        fill: '#' + getRandomColor()
    }, objectDefaults);  

    $scope.triangleDefaults = angular.extend({
    }, objectDefaults);

    $scope.lineDefaults = angular.extend({
        stroke: '#00FF00',
        fill: '#' + getRandomColor(),
        originX: 'center',
        originY: 'center'
    }, objectDefaults);

    $scope.rectangleDefaults = angular.extend({
            width: 100,
            height: 100,
            fill: '#' + getRandomColor()
    }, objectDefaults);

    $scope.addText = function (text) {
        var text = text || 'Some text';
        var textSample = new fabric.Text(text, $scope.textDefaults);

        canvas.add(textSample);
    };  

    $scope.addCircle = function () {
        var circle = new fabric.Circle($scope.circleDefaults);
        canvas.add(circle);
    };

    $scope.addRect = function () {
        var rectangle = new fabric.Rect($scope.rectangleDefaults);
        canvas.add(rectangle);
    };    

    $scope.addTriangle = function () {
        var triangle = new fabric.Triangle($scope.triangleDefaults);
        canvas.add(triangle);
    };    

    $scope.addLine = function () {
        var line = new fabric.Line([50, 100, 200, 200], $scope.lineDefaults);
        canvas.add(line);
    };    

    $scope.addImage = function (imageName) {
        // temp location
        // var location = '/Content/Files/ + imageName
        var location = 'http://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Inverted_Pentagram_circumscribed.svg/2000px-Inverted_Pentagram_circumscribed.svg.png';

         fabric.Image.fromURL(location, function (image) {

            image.set($scope.imageDefaults)
            .scale(0.1, 0.1)
            .setCoords();

            canvas.add(image);
        });
    };    

    $scope.addSampleImage = function() {
        $scope.addImage('fabric.png');
    };
}

function watchCanvas($scope) {
    //log('watchCanvas');

    function updateScope() {
        //log('updateScope');
        $scope.$$phase || $scope.$digest();
        canvas.renderAll();
    }

    canvas
      .on('object:selected', updateScope)
      .on('group:selected', updateScope)
      .on('path:created', updateScope)
      .on('selection:cleared', updateScope);

    //.on('object:rotating', updateScope)
    //.on('object:moving', updateScope)
    //.on('object:scaling', updateScope)
    //.on('object:modified', updateScope);
}

ticketDesigner.controller('CanvasController', ['$scope', CanvasController]);
    
function CanvasController($scope) {
   log('ticketDesigner.controller');

    $scope.canvas = canvas;
    $scope.getActiveStyle = getActiveStyle;

    addAccessors($scope);
    initializeDefaults($scope);
    watchCanvas($scope);
}

function log(callerMethod) {
    console.log('Method ' + callerMethod + ' executed at time ' + displayTime());
}

var time = Date.now || function () {
    return +new Date;
};

function displayTime() {
    var str = "";

    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds + " ";
    if (hours > 11) {
        str += "PM"
    } else {
        str += "AM"
    }
    return str;
}