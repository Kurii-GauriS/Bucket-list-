// ==========================
// BUCKET LIST
// ==========================

function addTask() 
{

    const input =
        document.getElementById("bucketInput");

    if (!input) return;

    const task =
        input.value.trim();

    if (task === "") return;

    let dreams =
        JSON.parse(
            localStorage.getItem("dreams")
        ) || [];

    dreams.push(task);

    localStorage.setItem(
        "dreams",
        JSON.stringify(dreams)
    );

    input.value = "";

    alert("✨ Dream Added!");
}

// ==========================
// WISHLIST
// ==========================

function loadWishlist()
{

    const container =
        document.getElementById("wishlistContainer");

    if (!container) return;

    container.innerHTML = "";

    let dreams =
        JSON.parse(
            localStorage.getItem("dreams")
        ) || [];

    dreams.forEach((dream, index) => {

        const card =
            document.createElement("div");

        card.classList.add("wish-card");

        card.innerHTML = `
            ${dream}
            <button onclick="deleteDream(${index})">
                ❌
            </button>
        `;

        container.appendChild(card);
    });
}

function deleteDream(index) 
{

    let dreams =
        JSON.parse(
            localStorage.getItem("dreams")
        ) || [];

    dreams.splice(index, 1);

    localStorage.setItem(
        "dreams",
        JSON.stringify(dreams)
    );

    loadWishlist();
}
 //CAMERA
const video = document.getElementById("video");
const startBtn = document.getElementById("startCamera");

startBtn.addEventListener("click", async () =>
    {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        video.srcObject = stream;
    } catch (err)
    {
        console.error("Camera error:", err);
        alert("Unable to access camera.");
    }
});
const video =
    document.getElementById("video");

const canvas =
    document.getElementById("canvas");

const startBtn =
    document.getElementById("startCamera");

const captureBtn =
    document.getElementById("capture");

let currentFilter = "none";

if (startBtn) 
{

    startBtn.addEventListener(
        "click",
        async () => {

            try {

                const stream =
                    await navigator.mediaDevices.getUserMedia({
                        video: true
                    });

                video.srcObject = stream;

            } catch (error) 
            {

                console.error(error);

                alert(
                    "Camera access denied 📸"
                );
            }
        }
    );
}

if (captureBtn) 
{

    captureBtn.addEventListener
    (
        "click",
        () => 
        {

            canvas.width =
                video.videoWidth;

            canvas.height =
                video.videoHeight;

            const ctx =
                canvas.getContext("2d");

            ctx.filter =
                currentFilter;

            ctx.drawImage(
                video,
                0,
                0,
                canvas.width,
                canvas.height
            );

            const image =
                canvas.toDataURL(
                    "image/png"
                );

            let photos =
                JSON.parse(
                    localStorage.getItem("photos")
                ) || [];

            photos.push(image);

            localStorage.setItem(
                "photos",
                JSON.stringify(photos)
            );

            loadPhotos();
        }
    );
}

// ==========================
// PHOTO GALLERY
// ==========================

function loadPhotos()
{

    const gallery =
        document.getElementById("photoGallery");

    if (!gallery) return;

    gallery.innerHTML = "";

    let photos =
        JSON.parse(
            localStorage.getItem("photos")
        ) || [];

    photos.forEach(photo =>
    {

        const img =
            document.createElement("img");

        img.src = photo;

        img.width = 150;

        img.style.borderRadius =
            "15px";

        img.style.margin =
            "10px";

        gallery.appendChild(img);
    });
}

// ==========================
// FILTERS
// ==========================

function setFilter(filter) 
{

    currentFilter = filter;

    if (video)
    {

        video.style.filter =
            filter;
    }
}

// ==========================
// MUSIC BUTTON
// ==========================

const musicBtn =
    document.getElementById("musicBtn");

if (musicBtn) 
{

    musicBtn.addEventListener(
        "click",
        () => 
        {

            window.open(
                "https://www.youtube.com/watch?v=k1-FXQjFZJU",
                "_blank"
            );
        }
    );
}

loadWishlist();
loadPhotos();