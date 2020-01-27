
    var w = 1000
    var h = 1000
    var movingamount = 0

var hideface1  = 0
$('document').ready(function(){
var canv = document.createElement('canvas');
canv.id = 'jeeFaceFilterCanvas';
canv.width = w
canv.height = h
$('#face_wrap_wrap').css({'width':w})
$('#face_wrap_wrap').css({'height':h})

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
                if (detectState[i].detected>0.3){
                        movingamount++ 
                        hideface1 = 0
                        if(movingamount>100){
                            face_change(detectState);
                        }
                        $('.face_ani').removeClass('face_ani')
                        var faceCoo=CVD.getCoordinates(detectState[i]);

                        $('#face_wrap').css({'transform':'rotateX('+ map_range(detectState[i].rx, 1, -1, 90, -90)  +'deg) \
                                                rotateY('+ map_range(detectState[i].ry, 1, -1, 90, -90)  +'deg) \
                                                rotateZ('+ map_range(detectState[i].rz, 1, -1, 90, -90)  +'deg) translateZ(-75px)'})
                            $('#face_wrap').css({top:map_range(detectState[i].y, 1, -1, 0, h)})
                            $('#face_wrap').css({left:map_range(detectState[i].x, 1, -1, 0, w)})
                            Body.setPosition(face1, { x: map_range(detectState[i].x, 1, -1, 0, w) , y:map_range(detectState[i].y, 1, -1, 0, h)}); 
                    

                    CVD.ctx.strokeRect(faceCoo.x, faceCoo.y, faceCoo.w, faceCoo.h);

                    var center_x = 500
                    var center_xy = 500
                    map_range(detectState[i].x, 1, -1, 0, h)
                    map_range(detectState[i].y, 1, -1, 0, h)


                }else{
                    hideface1++
                    if(hideface1>1000){
                        smovingamount = 0
                        console.log('disappear!')
                        $('#face_wrap').css({top:-100})
                        $('#face_wrap').css({left:-100})
                        $('#face_2').addClass('face_ani')
                    };
                }
            }
            CVD.update_canvasTexture();
            CVD.draw();
        } 
    }); 
} //end main()

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}



or_y = 0
counter = 0
function face_change(detectState){
                        if(Math.abs(detectState[0].ry - or_y) > 0.1){
                            or_y = detectState[0].ry
                            counter++
                            $('#face_wrap>div').hide()
                            $('#face_' + (counter%4+1)).show()
                        }

}
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}