let scaleFactor = 1; 
let img = new Image();
img.src = 'img/productoC3.png'; 

let videoStream;

document.getElementById('viewInAR').addEventListener('click', function() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(function(stream) {
            videoStream = stream;
            var video = document.getElementById('video');
            video.srcObject = stream;
            video.play();
            drawImage();
        })
        .catch(function(error) {
            console.error('Error accessing the camera: ', error);
        });
});

document.getElementById('stopCamera').addEventListener('click', function() {
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        videoStream = null;
        var video = document.getElementById('video');
        video.pause();
        video.srcObject = null;
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
});

document.getElementById('zoomIn').addEventListener('click', function() {
    scaleFactor *= 1.1;
    drawImage();
});

document.getElementById('zoomOut').addEventListener('click', function() {
    scaleFactor /= 1.1;
    drawImage();
});

function drawImage() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    var x = (canvas.width - img.width * scaleFactor) / 2;
    var y = (canvas.height - img.height * scaleFactor) / 2;
    context.drawImage(img, x, y, img.width * scaleFactor, img.height * scaleFactor);
}

