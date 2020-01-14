var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Body = Matter.Body,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var w = 1000
    var h = 1000
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: w,
            height: h,
            showAngleIndicator: false,
            background: 'transparent',
			wireframes: false,
			wireframeBackground: 'transparent'
        }
    });
    Render.run(render);
    // document.getElementsByTagName('canvas')[0].id='jeeFaceFilterCanvas'
// main()
    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var ground = Bodies.rectangle(w/2, h+25, w, 50, { isStatic: true })
    var wall1 = Bodies.rectangle(-25, h/2, 50, h, { isStatic: true })
    var wall2 = Bodies.rectangle(w+25, h/2, 50, h, { isStatic: true })
    var face1 = Bodies.circle(100, -100, 100,{ isStatic: true ,render: {fillStyle: 'red'}});

    var elem1 = Bodies.circle(100, 200 - h/2, 100,{restitution : 0.5, density: 1000000, render: {fillStyle: 'blue'}});
    var elem2 = Bodies.circle(300, 200 - h/2, 100,{restitution : 0.5, density: 1000000, render: {fillStyle: 'blue'}});
    var elem3 = Bodies.circle(350, 50  - h/2, 50, {restitution : 0.99, render: {fillStyle: 'yellow'}});
    var elem4 = Bodies.circle(450, 50  - h/2, 50, {restitution : 0.99, render: {fillStyle: 'yellow'}});
    var elem5 = Bodies.circle(600, 150 - h/2, 50, {restitution : 0.99, render: {fillStyle: 'yellow'}});
    var elem6 = Bodies.circle(700, 150 - h/2, 50, {restitution : 0.99, render: {fillStyle: 'yellow'}});
    var elem7 = Bodies.circle(800, 150 - h/2, 50, {restitution : 0.5, density: 1000000, render: {fillStyle: 'blue'} });

    World.add(world, [
        ground,
        wall1,
        wall2,
        face1,
        elem1,
        elem2,
        elem3,
        elem4,
        elem5,
        elem6,
        elem7
    ]);
	engine.world.gravity.y = 1;
    reset_field()
    function reset_field(){
        Body.setPosition(ground, { x: w/2, y: 2*h+25}); 
         
        setTimeout(function(){
        	Body.setPosition(elem1, { x: 100, y: 200 - h/2})
        	Body.setPosition(elem2, { x: 300, y: 200 - h/2})
        	Body.setPosition(elem3, { x: 350, y: 50 - h/2})
        	Body.setPosition(elem4, { x: 450, y: 50 - h/2})
        	Body.setPosition(elem5, { x: 600, y: 150 - h/2})
        	Body.setPosition(elem6, { x: 700, y: 150 - h/2})
        	Body.setPosition(elem7, { x: 800, y: 150 - h/2})

        	Body.setPosition(ground, { x: w/2, y: h+25}); 
        }, 500);
        setTimeout(function(){reset_field()}, 10000);
    }
   function add_elem(){
    	World.add(world, [
        	Bodies.circle(400, -100, 100,{render: {fillStyle: 'yellow'}})
    	]);
   }
    // keep the mouse in sync with rendering
    // fit the render viewport to the scene
