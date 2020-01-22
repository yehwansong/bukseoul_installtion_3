
    var w = 1000
    var h = 1000

$('document').ready(function(){
    console.log((w - window.innerWidth)/2 - 75 + 'px')
    $('#face_wrap').css({'margin-left' : (window.innerWidth - w)/2 - 75 + 'px'})
    $('#face_wrap').css({'margin-top' : (window.innerHeight - h)/2 - 50 +'px'})
var canv = document.createElement('canvas');
canv.id = 'jeeFaceFilterCanvas';
canv.width = w
canv.height = h
document.body.appendChild(canv); // adds the canvas to the body element
document.getElementsByTagName('body')[0].appendChild(canv)
main()
})
function main(){
    var CVD; //return of Canvas2DDisplay

        var or_x = 0;
        var or_y = 0;
        var or_z = 0;
        var counter = 0
const SETTINGS={
  maxFaces: 4, //max number of detected faces
};
    JEEFACEFILTERAPI.init({
        canvasId: 'jeeFaceFilterCanvas',
        NNCpath: 'js/', //root of NNC.json file
        maxFacesDetected: SETTINGS.maxFaces,
        callbackReady: function(errCode, spec){
            if (errCode){
                console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
                return;
            }

            console.log('INFO : JEEFACEFILTERAPI IS READY');
            CVD = JEEFACEFILTERAPI.Canvas2DDisplay(spec);
            CVD.ctx.strokeStyle='#ffffffff';
            CVD.ctx.lineWidth=0;
        }, //end callbackReady()

        //called at each render iteration (drawing loop)
        callbackTrack: function(detectState){
            CVD.ctx.clearRect(0,0,CVD.canvas.width, CVD.canvas.height);
            for (var i = detectState.length - 1; i >= 0; i--) {

                if(Math.abs(detectState[0].rx - or_x) > 0.1){
                    or_x = detectState[0].rx
                    counter++
                    $('#face_wrap>div').hide()
                    $('#face_' + (counter%4+1)).show()
                }

                if(Math.abs(detectState[0].ry - or_y) > 0.1){
                    or_y = detectState[0].ry
                    counter++
                    $('#face_wrap>div').hide()
                    $('#face_' + (counter%5+5)).show()
                }
                
                // or_y = detectState[i].ry
                // or_z = detectState[i].rz
                    if (detectState[i].detected>0.3){
                    var faceCoo=CVD.getCoordinates(detectState[i]);
                    $('#face_wrap').css({top:map_range(detectState[i].y, 1, -1, 0, h)})
                    $('#face_wrap').css({'transform':'rotateX('+ map_range(detectState[i].rx, 1, -1, 90, -90)  +'deg) \
                                                rotateY('+ map_range(detectState[i].ry, 1, -1, 90, -90)  +'deg) \
                                                rotateZ('+ map_range(detectState[i].rz, 1, -1, 90, -90)  +'deg) translateZ(-50px)'})
                    $('#face_wrap').css({left:map_range(detectState[i].x, 1, -1, 0, w)})
                    Body.setPosition(face1, { x: map_range(detectState[i].x, 1, -1, 0, w) , y:map_range(detectState[i].y, 1, -1, 0, h)}); 
                    if(faceCoo.x<200 && faceCoo.y<500){
                        $('#background').css({opacity:0})
                        $('#background_back').css({opacity:0})
                    }else if(faceCoo.x>500 && faceCoo.y<500){
                        $('#background').css({opacity:0})
                        $('#background_back').css({opacity:1})
                    }else{
                        $('#background').css({opacity:1})
                        $('#background_back').css({opacity:1})
                    }

                    CVD.ctx.strokeRect(faceCoo.x, faceCoo.y, faceCoo.w, faceCoo.h);
                }
            }
            CVD.update_canvasTexture();
            CVD.draw();
        } 
    }); 
} //end main()
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}