img = "";
objectDetector = "";
objects = [];
status = "";
function preload()
{
    img = loadImage("bedroom.jpg");
}
function setup()
{
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded()
{   
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img , gotResult);
}
function gotResult(error , results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}   
function home()
{
    window.location = "index.html";
}
function draw()
{
    if(status !=undefined)
    {
        image(img , 0 , 0 , 640 , 420);
        r = random(255);
        g = random(255);
        b = random(255);
        for(var i = 0 ; i < objects.length ; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";   

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x +15 , objects[i].y +15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }   
    }
}
