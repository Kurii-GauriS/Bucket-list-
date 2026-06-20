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
function addTask() {

    let input =
    document.getElementById("bucketInput");

    let task = input.value;

    if(task === "") return;

    let dreams =
    JSON.parse(
        localStorage.getItem("dreams")
    ) || [];

    dreams.push(task);

    localStorage.setItem(
        "dreams",
        JSON.stringify(dreams)
    );

    input.value="";

    alert("Dream Added! ✨");
}
function loadWishlist(){

    let container =
    document.getElementById(
        "wishlistContainer"
    );

    if(!container) return;

    let dreams =
    JSON.parse(
        localStorage.getItem("dreams")
    ) || [];

    dreams.forEach(dream => {

        let card =
        document.createElement("div");

        card.classList.add("wish-card");

        card.innerHTML =
     `
     🌸 ${dream}
     <button class="deleteBtn">
     ❌
     </button>
     `;

        container.appendChild(card);

    });
}

loadWishlist();
function loadWishlist(){

    let container =
    document.getElementById(
        "wishlistContainer"
    );

    if(!container) return;

    let dreams =
    JSON.parse(
        localStorage.getItem("dreams")
    ) || [];

    dreams.forEach(dream => {

        let card =
        document.createElement("div");

        card.classList.add("wish-card");

        card.innerHTML =
        "🌸 " + dream;

        container.appendChild(card);

    });
}

loadWishlist();
card.querySelector(".deleteBtn")
.addEventListener("click",()=>{

    dreams =
    dreams.filter(
        item => item !== dream
    );

    localStorage.setItem(
        "dreams",
        JSON.stringify(dreams)
    );

    location.reload();

});
document.getElementById("musicBtn").addEventListener("click", () => {
    window.open(
        "https://www.youtube.com/watch?v=k1-FXQjFZJU",
        "_blank"
    );
});