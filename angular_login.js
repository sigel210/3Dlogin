var app = angular.module('myApp',[]);
app.controller('myController',['$scope',"$rootScope",'$timeout',"$q",function($scope,$rootScope,$timeout,$q){
//	$scope.pic_up = function(){
//		$rootScope.imgNum = 0;
//		$rootScope.addimg = 0;
//		angular.forEach($scope.readyImg,function(arr){
//			$rootScope.imgNum++;
//		})
//		if($rootScope.imgNum == 6){
//			$scope.picHide = true;
//		}
//	}
//	$scope.file_img_show = ""
	$scope.addimg = 0

	$scope.imgContainer = {}
	
	$scope.imgChange = function(files){
		if(files[0].type.substring(0,5) !== 'image'){
			alert('请输入图片');
			return
		}
		var reader = new FileReader();
		reader.readAsDataURL(files[0])
		$scope.file_img_show = ''
		$scope.timeRecord = (new Date()).valueOf();
			reader.onload = function(event) {
				var txt = event.target.result;
				$scope.imgContainer[$scope.timeRecord] = {
					file_img_show : txt
				}
				$scope.$apply();//必须一个$apply更新dom
		};
		$scope.addimg++
		console.log($scope.addimg)
		if($scope.addimg == 6){
				$scope.picHide = true
			}
		var ipt = document.getElementById('one-input');
		ipt.value = ''	
	} 
	$scope.delete = function(index){
//		console.log($scope.imgContainer);
//		console.log(index)
		var guidTime = []
		for(var p in $scope.imgContainer){
			guidTime.push(p)//把$scope.imgContainer的key值添加到一个数组当中，做删除时的标记使用
		}
//		console.log(guidTime[index])
		delete $scope.imgContainer[guidTime[index]]
		$scope.addimg--
		$scope.picHide = false
	}
	$scope.effect = {
		isShow : false,
		isShow0 : false,
		text : 'Guess What?',
		isShowfn : function(){
			$('.form').fadeToggle(1000)
			$('.leadContainer').fadeToggle(1000)
			this.isShow = !this.isShow;
		},
		isShow0fn : function(){
			$('.form0').fadeToggle(1000);
			$('.leadContainer').fadeToggle(1000)
			this.isShow0 = ! this.isShow0
		}
	}
	$scope.form = {
		title : "返回"
	}
//	//3D建模
//	var container;//创建canvas盒子
//
//	var camera, scene, renderer;
//
//	var group, text, plane;
//
//	var targetRotation = 0;
//	var targetRotationOnMouseDown = 0;
//
//	var mouseX = 0;
//	var mouseXOnMouseDown = 0;
//
//	var windowHalfX = window.innerWidth / 2;
//	var windowHalfY = window.innerHeight / 2;
//
//	var heartShape, particleCloud, sparksEmitter, emitterPos;
//	var _rotation = 0;
//	var timeOnShapePath = 0;
//
//	init();
//	animate();
//
//	function init() {
//
//		container = document.createElement('div');
//		document.body.appendChild(container);
//		
//
//		//相机
//		camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
//		camera.position.set(0, 150, 800);
//
//		//场景
//		scene = new THREE.Scene();
//
//		group = new THREE.Group();
//		scene.add(group);
//
//		// Get text from hash
//
//		var string = "XXXXX";
//		var hash = document.location.hash.substr(1);
//
//		if (hash.length !== 0) {
//
//			string = hash;
//
//		}
//
//		var text3d = new THREE.TextGeometry(string, {
//			size: 80,
//			height: 20,
//			curveSegments: 2,
//			font: "helvetiker"
//
//		});
//
//		text3d.computeBoundingBox();
//		var centerOffset = -0.5 * (text3d.boundingBox.max.x - text3d.boundingBox.min.x);
//
//		var textMaterial = new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff, overdraw: 0.5});
//
//		text = new THREE.Mesh(text3d, textMaterial);
//
//		// Potentially, we can extract the vertices or faces of the text to generate particles too.
//		// Geo > Vertices > Position
//
//		text.position.x = centerOffset;
//		text.position.y = 100;
//		text.position.z = 0;
//
//		text.rotation.x = 0;
//		text.rotation.y = Math.PI * 2;
//
//		group.add(text);
//
//
//		particleCloud = new THREE.Object3D(); // Just a group
//		particleCloud.y = 800;
//		group.add(particleCloud);
//
//		// Create Particle Systems
//
//		// Heart
//
//		var x = 0, y = 0;
//
//		heartShape = new THREE.Shape();
//
//		heartShape.moveTo(x + 25, y + 25);
//		heartShape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y);
//		heartShape.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35);
//		heartShape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
//		heartShape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
//		heartShape.bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y);
//		heartShape.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);
//
//		var hue = 0;
//
//		var hearts = function(context) {
//
//			context.globalAlpha = 0.5;
//			var x = 0, y = 0;
//			context.scale(0.05, -0.05); // Scale so canvas render can redraw within bounds
//			context.beginPath();
//			// From http://blog.burlock.org/html5/130-paths
//			context.bezierCurveTo(x + 2.5, y + 2.5, x + 2.0, y, x, y);
//			context.bezierCurveTo(x - 3.0, y, x - 3.0, y + 3.5, x - 3.0, y + 3.5);
//			context.bezierCurveTo(x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5);
//			context.bezierCurveTo(x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5);
//			context.bezierCurveTo(x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y);
//			context.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
//			context.fill();
//			context.lineWidth = 0.5; //0.05
//			context.stroke();
//
//		}
//
//		var setTargetParticle = function() {
//
//			var material = new THREE.SpriteCanvasMaterial({
//				program: hearts
//			});
//
//			material.color.setHSL(hue, 1, 0.75);
//			hue += 0.001;
//			if (hue > 1)
//				hue -= 1;
//
//			particle = new THREE.Sprite(material);
//
//			particle.scale.x = particle.scale.y = Math.random() * 40 + 40;
//			particleCloud.add(particle);
//
//			return particle;
//
//		};
//
//		var onParticleCreated = function(p) {
//
//			p.target.position.copy(p.position);
//
//		};
//
//		var onParticleDead = function(particle) {
//
//			particle.target.visible = false;
//			particleCloud.remove(particle.target);
//
//		};
//
//		sparksEmitter = new SPARKS.Emitter(new SPARKS.SteadyCounter(160));
//
//		emitterpos = new THREE.Vector3();
//
//		sparksEmitter.addInitializer(new SPARKS.Position(new SPARKS.PointZone(emitterpos)));
//		sparksEmitter.addInitializer(new SPARKS.Lifetime(0, 2));
//		sparksEmitter.addInitializer(new SPARKS.Target(null, setTargetParticle));
//
//		sparksEmitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0, -50, 10))));
//
//		// TOTRY Set velocity to move away from centroid
//
//		sparksEmitter.addAction(new SPARKS.Age());
//		//sparksEmitter.addAction(new SPARKS.Accelerate(0.2));
//		sparksEmitter.addAction(new SPARKS.Move());
//		sparksEmitter.addAction(new SPARKS.RandomDrift(50, 50, 2000));
//
//		sparksEmitter.addCallback("created", onParticleCreated);
//		sparksEmitter.addCallback("dead", onParticleDead);
//		sparksEmitter.addCallback("updated", function(particle) {
//
//			particle.target.position.copy(particle.position);
//
//		});
//
//		sparksEmitter.start();
//
//		// End Particles
//
//
//		renderer = new THREE.CanvasRenderer();
//		renderer.setClearColor(0xf0f0f0,0);
//		renderer.setPixelRatio(window.devicePixelRatio);
//		renderer.setSize(window.innerWidth, window.innerHeight);
////		console.log(renderer.domElement)
//		container.appendChild(renderer.domElement);
//
//		document.addEventListener('mousedown', onDocumentMouseDown, false);
//		document.addEventListener('touchstart', onDocumentTouchStart, false);
//		document.addEventListener('touchmove', onDocumentTouchMove, false);
//
//		//
//
//		window.addEventListener('resize', onWindowResize, false);
//
//	}
//
//	function onWindowResize() {
//
//		windowHalfX = window.innerWidth / 2;
//		windowHalfY = window.innerHeight / 2;
//
//		camera.aspect = window.innerWidth / window.innerHeight;
//		camera.updateProjectionMatrix();
//
//		renderer.setSize(window.innerWidth, window.innerHeight);
//
//	}
//
//	//
//
//	document.addEventListener('mousemove', onDocumentMouseMove, false);
//
//	function onDocumentMouseDown(event) {
//
//		event.preventDefault();
//
//		mouseXOnMouseDown = event.clientX - windowHalfX;
//		targetRotationOnMouseDown = targetRotation;
//
//		if (sparksEmitter.isRunning()) {
//
//			sparksEmitter.stop();
//
//		} else {
//
//			sparksEmitter.start();
//
//		}
//
//	}
//
//	function onDocumentMouseMove(event) {
//
//		mouseX = event.clientX - windowHalfX;
//
//		targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
//
//	}
//
//	function onDocumentTouchStart(event) {
//
//		if (event.touches.length == 1) {
//
//			event.preventDefault();
//
//			mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
//			targetRotationOnMouseDown = targetRotation;
//
//		}
//
//	}
//
//	function onDocumentTouchMove(event) {
//
//		if (event.touches.length == 1) {
//
//			event.preventDefault();
//
//			mouseX = event.touches[ 0 ].pageX - windowHalfX;
//			targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
//
//		}
//
//	}
//
//	//
//
//	function animate() {//更新场景
//
//		requestAnimationFrame(animate);
//
//		render();
//
//	}
//
//	function render() {
//
//		timeOnShapePath += 0.0337;
//
//		if (timeOnShapePath > 1)
//			timeOnShapePath -= 1;
//
//		// TODO Create a PointOnShape Action/Zone in the particle engine
//		var pointOnShape = heartShape.getPointAt(timeOnShapePath);
//
//		emitterpos.x = pointOnShape.x * 5 - 100;
//		emitterpos.y = -pointOnShape.y * 5 + 400;
//
//		// Pretty cool effect if you enable this
//		// particleCloud.rotation.y += 0.05;
//
//		group.rotation.y += (targetRotation - group.rotation.y) * 0.05;
//		renderer.render(scene, camera);
//	}
	
}])