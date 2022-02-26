// Find the <canvas/> element in the HTML
const canvas = document.querySelector("canvas");

// Grab the 'context' within it, in which we'll draw stuff
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const lineWidthVar = randBetween(1,5);
ctx.lineWidth = lineWidthVar;

let currentX = 0;
let currentY = 0;

let centerWidth = canvasWidth/2;
let centerHeight = canvasHeight/2;

setInterval(() => {
	const branchLength = randBetween(100, 500);
	centerWidth = randBetween(0,canvasWidth);
	centerHeight = randBetween(0,canvasHeight);
	const numBranches = randBetween(3,10);
	spiderWeb(centerWidth,centerHeight, numBranches, branchLength);
}, 100);


//-----------------------
function randBetween(minVar, maxVar){
return Math.random() * (maxVar-minVar)+minVar;
}

//-----------------------
function spiderWeb(centerWidth,centerHeight,numBranches,branchLength){


let hValue = randBetween(0,100);
let hMod = 60;

let degreeSteps= (360/numBranches);
let theta = -degreeSteps;

for(let i = 0; i<=numBranches/2; i++){
	if(hValue + hMod > 360 || hValue + hMod < 0){
		hMod = hMod*-1;
	}
	hValue = hValue + hMod;
	let color = "hsl("+hValue+", 50%, 50%)";
	ctx.strokeStyle = color;

	ctx.beginPath();
	ctx.moveTo(centerWidth,centerHeight);
	theta = theta+degreeSteps;

	let newX = centerWidth + branchLength * Math.cos(Math.PI * theta / 180.0);
	let newY = centerHeight + branchLength * Math.sin(Math.PI * theta / 180.0);
        ctx.lineTo(newX, newY);	

	ctx.moveTo(centerWidth,centerHeight);

	newX = centerWidth + (branchLength*-1) * Math.cos(Math.PI * theta / 180.0);
	newY = centerHeight + (branchLength*-1) * Math.sin(Math.PI * theta / 180.0);
	ctx.lineTo(newX, newY);	

	ctx.stroke();
	ctx.closePath();
}



let myRadius = 10;
for(let k = 1; k<7; k++){
	let thisRadius = myRadius*k;
	for(let j = 0; j<=numBranches; j++){

		if(hValue + hMod > 360 || hValue + hMod < 0){
			hMod = hMod*-1;
		}
		hValue = hValue + hMod;
		    let color = "hsl("+hValue+", 50%, 50%)";
		    ctx.strokeStyle = color;

			ctx.beginPath();
			ctx.moveTo(centerWidth,centerHeight);
			theta = theta+degreeSteps;
			nextTheta = theta+degreeSteps;

			let newX = centerWidth + branchLength * Math.cos(Math.PI * theta / 180.0);
			let newY = centerHeight + branchLength * Math.sin(Math.PI * theta / 180.0);
	        	ctx.moveTo(newX, newY);	

			newX = centerWidth + branchLength * Math.cos(Math.PI * nextTheta / 180.0);
			newY = centerHeight + branchLength * Math.sin(Math.PI * nextTheta / 180.0);
			ctx.arcTo(centerWidth, centerHeight, newX, newY, thisRadius);	

			ctx.stroke();
			ctx.closePath();
		}
	}
ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
}
