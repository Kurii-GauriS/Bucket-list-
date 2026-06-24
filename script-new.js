// ==========================
// BUCKET LIST
// ==========================

function addTask() {

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

function loadWishlist() {

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

function deleteDream(index) {

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

// ==========================
// CAMERA
// ==========================

const video =
    document.getElementById("video");

const canvas =
    document.getElementById("canvas");

const startBtn =
    document.getElementById("startCamera");

const captureBtn =
    document.getElementById("capture");

if (startBtn) {

    startBtn.addEventListener(
        "click",
        async () => {

            try {

                const stream =
                    await navigator.mediaDevices.getUserMedia({
                        video: true
                    });

                video.srcObject = stream;

            } catch (error) {

                console.error(error);

                alert("📸 Camera access denied!");
            }
        }
    );
}

if (captureBtn) {

    captureBtn.addEventListener(
        "click",
        () => {

            if (!video.videoWidth) {

                alert("Start camera first! 📸");

                return;
            }

            canvas.width =
                video.videoWidth;

            canvas.height =
                video.videoHeight;

            const ctx =
                canvas.getContext("2d");

            ctx.drawImage(
                video,
                0,
                0,
                canvas.width,
                canvas.height
            );

            const image =
                canvas.toDataURL("image/png");

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

function loadPhotos() {

    const gallery =
        document.getElementById("photoGallery");

    if (!gallery) return;

    gallery.innerHTML = "";

    let photos =
        JSON.parse(
            localStorage.getItem("photos")
        ) || [];

    photos.forEach((photo, index) => {

        const card =
            document.createElement("div");

        card.classList.add("photo-card");

        const img =
            document.createElement("img");

        img.src = photo;

        img.width = 150;

        const delBtn =
            document.createElement("button");

        delBtn.textContent = "🗑️";

        delBtn.onclick = () => {

            photos.splice(index, 1);

            localStorage.setItem(
                "photos",
                JSON.stringify(photos)
            );

            loadPhotos();
        };

        card.appendChild(img);
        card.appendChild(delBtn);

        gallery.appendChild(card);
    });
}

// ==========================
// FILTERS
// ==========================

let currentFilter = "none";

function setFilter(filter) {

    currentFilter = filter;

    if (video) {

        video.style.filter =
            filter;
    }
}

// ==========================
// MUSIC 1
// ==========================

const musicBtn =
    document.getElementById("musicBtn");

if (musicBtn) {

    musicBtn.addEventListener(
        "click",
        () => {

            window.open(
                "https://www.youtube.com/watch?v=k1-FXQjFZJU",
                "_blank"
            );
        }  
    );
}

// ==========================
// LOAD
// ==========================

loadWishlist();
loadPhotos();

// ==========================
// MUSIC 2
// ==========================

const musicBtn =
    document.getElementById("musicBtn");

if (musicBtn) {

    musicBtn.addEventListener(
        "click",
        () => {
            window.open(
                "https://www.youtube.com/embed/x-kl7fzEmaY",
                "_blank"
            );
        }    
    );
}
// ==========================
// LOAD
// ==========================

loadWishlist();
loadPhotos();

// ==========================
// MUSIC 3
// ==========================

const musicBtn =
    document.getElementById("musicBtn");

if (musicBtn) {

    musicBtn.addEventListener(
        "click",
        () => {
             window.open(
                "https://www.youtube.com/embed/KxrJ_1iYFyU",
                "_blank"
            );
        }
    );
}


// ==========================
// LOAD
// ==========================

loadWishlist();
loadPhotos();