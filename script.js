function addTask()
{

```
const input = document.getElementById("bucketInput");
const task = input.value.trim();

if (task === "") return;

let dreams =
    JSON.parse(localStorage.getItem("dreams")) || [];

dreams.push(task);

localStorage.setItem(
    "dreams",
    JSON.stringify(dreams)
);

input.value = "";

alert("Dream Added! ✨");
```

}

function loadWishlist() {}

```
const container =
    document.getElementById("wishlistContainer");

if (!container) return;

container.innerHTML = "";

let dreams =
    JSON.parse(localStorage.getItem("dreams")) || [];

dreams.forEach((dream, index) => {

    const card =
        document.createElement("div");

    card.classList.add("wish-card");
    card.textContent = dream;
}

loadWishlist();

const video =
document.getElementById("video");

const startBtn =
document.getElementById("startCamera");

if (startBtn) {

```
startBtn.onclick = async () => {

    const stream =
        await navigator.mediaDevices.getUserMedia({
            video: true
        });

    video.srcObject = stream;
};
```

}

const captureBtn =
document.getElementById("capture");

const canvas =
document.getElementById("canvas");

if (captureBtn) {

```
captureBtn.onclick = () => {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx =
        canvas.getContext("2d");

    ctx.drawImage(
        video,
        0,
        0
    );

    const image =
        canvas.toDataURL("image/png");

    const img =
        document.createElement("img");

    img.src = image;
    img.style.width = "150px";

    document.body.appendChild(img);
};
```

}

const musicBtn =
document.getElementById("musicBtn");

if (musicBtn) {

```
musicBtn.addEventListener("click", () => {

    window.open(
        "https://www.youtube.com/watch?v=k1-FXQjFZJU",
        "_blank"
    );
});
``
const image = canvas.toDataURL("image/png");
let photos =
    JSON.parse(localStorage.getItem("photos")) || [];

photos.push(image);

localStorage.setItem(
    "photos",
    JSON.stringify(photos)
);
const image = canvas.toDataURL("image/png");
function loadPhotos() {

    const gallery =
        document.getElementById("photoGallery");

    if (!gallery) return;

    gallery.innerHTML = "";

    let photos =
        JSON.parse(localStorage.getItem("photos")) || [];

    photos.forEach(photo => {

        let img =
            document.createElement("img");

        img.src = photo;
        img.width = 150;

        gallery.appendChild(img);
    });
}

loadPhotos();
let currentFilter = "none";

function setFilter(filter) {

    currentFilter = filter;

    video.style.filter = filter;
}
let currentFilter = "none";

function setFilter(filter) {
    currentFilter = filter;

    const video = document.getElementById("video");

    if(video){
        video.style.filter = filter;
    }
}

ctx.filter = currentFilter;

ctx.drawImage(
    video,
    0,
    0
);