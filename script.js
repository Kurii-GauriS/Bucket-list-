function addTask(){

    let input =
    document.getElementById("bucketInput");

    let task = input.value;

    if(task==="") return;

    let li =
    document.createElement("li");

    li.innerText = task;

    li.addEventListener("click",()=>{

        li.style.textDecoration =
        "line-through";

    });

    document
    .getElementById("bucketList")
    .appendChild(li);

    input.value="";
}
const video =
document.getElementById("video");

const startBtn =
document.getElementById("startCamera");

startBtn.onclick = async ()=>{

    const stream =
    await navigator.mediaDevices
    .getUserMedia({
        video:true
    });

    video.srcObject = stream;
}
const captureBtn =
document.getElementById("capture");

const canvas =
document.getElementById("canvas");

captureBtn.onclick = ()=>{

    canvas.width =
    video.videoWidth;

    canvas.height =
    video.videoHeight;

    const ctx =
    canvas.getContext("2d");

    ctx.drawImage(
        video,
        0,
        0
    );

    let image =
    canvas.toDataURL("image/png");

    let img =
    document.createElement("img");

    img.src = image;

    img.style.width="150px";

    document.body.appendChild(img);

}