
    var w = 1000
    var h = 1000

$('document').ready(function(){
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
            console.log(CVD)
            CVD.ctx.strokeStyle='#ffffffff';
            CVD.ctx.lineWidth=0;
        }, //end callbackReady()

        //called at each render iteration (drawing loop)

        callbackTrack: function(detectState){
            CVD.ctx.clearRect(0,0,CVD.canvas.width, CVD.canvas.height);
            for (var i = detectState.length - 1; i >= 0; i--) {
                    if (detectState[i].detected>0.3){
                    //draw a border around the face
                    var faceCoo=CVD.getCoordinates(detectState[i]);
                    // -1~1
                    Body.setPosition(face1, { x: map_range(detectState[i].x, 1, -1, 0, w), y:map_range(detectState[i].y, 1, -1, 0, h)}); 
                    setTimeout(function(){
                        // engine.world.gravity.y = 0.5;
                    }, 1000);

                    CVD.ctx.strokeRect(faceCoo.x, faceCoo.y, faceCoo.w, faceCoo.h);
                }
            }
            CVD.update_canvasTexture();
            CVD.draw();
        } //end callbackTrack()
    }); //end JEEFACEFILTERAPI.init call
} //end main()
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}