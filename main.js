song1 = "";
song2 = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

LefttWristX = 0;
LefttWristY = 0;

song1_status = "";
song2_status = "";

function setup()
{
  canvas = createCanvas(600, 500);
  canvas.center();

  
  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video,modelLoaded)
  poseNet.on('pose',gotPoses);

}

function modelLoaded()
{
    console.log('PosNet Is Initialized');
}

function gotPoses(results)
{
    

if(results.length > 0)
{
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[9].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = "+scoreRightWrist+" scoreLeftWrist = " + scoreLeftWrist);

    rightWristX = results[0].pose.rightWrist.x;
    righttWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = "+rightWristX+" rightWristX = " + rightWristX);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = "+leftWristX+" lefttWristX = " + leftWristX);
}
}

function draw()
{
    image(video,0,0,600,500);
    fill("FF0000");
    stroke("FF0000");

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1_status==false)
        {
          song1.play();
          document.getElementById("song").innerHTML="playing-harry potter theme song ";
        }
    }

    if(scoreleftWrist > 0.2)
    {
        circle(lefttWristX,leftWristY,20);
        song1.stop();
        if(song2_status==false)
        {
          song2.play();
          document.getElementById("song").innerHTML="playing- peter pan song ";
        }
    }
        
    }

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}





