var t = 0;
var baseRadius = 60;

function onLoad() {
	canvas = $("#canvas")[0];
	context = canvas.getContext("2d");
	setInterval(step, 20);
}

function step() {
	canvas.width = window.innerWidth - 20;
	canvas.height = window.innerHeight - 20;
	maxX = canvas.width / baseRadius;
	maxY = canvas.height / (baseRadius * Math.sqrt(3));

	context.clearRect(0, 0, canvas.width, canvas.height);

	var height = canvas.getClientRects()[0].height;
	var width = canvas.getClientRects()[0].width;
	for (var y = 0; y < maxY; y++) {
		for (var x = y % 2 ? 0 : 0.5; x < maxX; x++) {
			var r = 255 * Math.sin(0.5 * Math.PI * y / maxY);
			var g = 127 * (1 + Math.sin((y % 2 ? 1 : -1) * t / 27));
			var b = 127 * (1 + Math.sin((y % 2 ? 1 : -1) * t / 17));
			var color = "rgba(" + [ r, g, b ].join(",") + ", 0.7)";
			var r = baseRadius * ((1 + Math.sin(Math.PI * ((t / 8) + x + y) / (maxX + maxY))) / 2);
			drawCircle({
				x : x * 2 * baseRadius,
				y : y * Math.sqrt(3) * baseRadius
			}, 2 * r, color);
		}
	}

	t++;
}


function drawCircle(p, r, color) {
	var grd = context.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
	grd.addColorStop(0.25, color);
	grd.addColorStop(1, "rgba(0, 0, 0, 0.1)");

	// Fill with gradient
	context.beginPath();
	context.fillStyle = grd;
	//	context.fillStyle = color || "#f00";
	context.arc(p.x, p.y, r || 4, 0, 2 * Math.PI);
	context.fill();
}
