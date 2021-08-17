objects = [];
status = "";


function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(300,300);
  video = createCapture(VIDEO);
  video.size(300,300);
  video.hide();
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  object_name = document.getElementById("object_name").value;
}

function gotResults(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 300, 300);
  if (status != "") {
    objectDetector.detect(video, gotResults);
    for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status :  Objects Detected";
        
        fill("red");
        stroke("red");
        noFill();
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "" + percent + "%" , objects[i].x + 15, objects[i].y + 15);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label==object_name){
video.stop();
objectDetector.detect(gotResults);
document.getElementById("object_status").innerHTML = object_name + " Found";
        }
        else{
          document.getElementById("object_status").innerHTML = object_name + "Not Found"; 
        }
    }
}
}