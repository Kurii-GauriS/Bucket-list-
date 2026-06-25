// ==========================
// WISHLIST
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

    dreams.push({
        text: task,
        done: false
    });

    localStorage.setItem(
        "dreams",
        JSON.stringify(dreams)
    );

    input.value = "";

    loadWishlist();
}

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

        if (dream.done) {
            card.style.textDecoration =
                "line-through";
            card.style.opacity =
                "0.6";
        }

        card.innerHTML = `
            <span>${dream.text}</span>

            <button onclick="toggleDream(${index})">
                ✅
            </button>

            <button onclick="deleteDream(${index})">
                ❌
            </button>
        `;

        container.appendChild(card);
    });
}

function toggleDream(index) {

    let dreams =
        JSON.parse(
            localStorage.getItem("dreams")
        ) || [];

    dreams[index].done =
        !dreams[index].done;

    localStorage.setItem(
        "dreams",
        JSON.stringify(dreams)
    );

    loadWishlist();
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

let currentFilter =
    "none";

if (startBtn) {

    startBtn.addEventListener(
        "click",
        async () => {

            try {

                const stream =
                    await navigator.mediaDevices.getUserMedia({
                        video: true
                    });

                video.srcObject =
                    stream;

            } catch (error) {

                console.error(error);

                alert(
                    "📸 Camera access denied!"
                );
            }
        }
    );
}

if (captureBtn) {

    captureBtn.addEventListener(
        "click",
        () => {

            if (!video.videoWidth) {

                alert(
                    "Start camera first!"
                );

                return;
            }

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

        card.classList.add(
            "photo-card"
        );

        const img =
            document.createElement("img");

        img.src = photo;

        img.width = 150;

        const deleteBtn =
            document.createElement(
                "button"
            );

        deleteBtn.textContent =
            "🗑️";

        deleteBtn.onclick = () => {

            photos.splice(
                index,
                1
            );

            localStorage.setItem(
                "photos",
                JSON.stringify(
                    photos
                )
            );

            loadPhotos();
        };

        card.appendChild(img);
        card.appendChild(deleteBtn);

        gallery.appendChild(card);
    });
}

// ==========================
// FILTERS
// ==========================

function setFilter(filter) {

    currentFilter =
        filter;

    if (video) {

        video.style.filter =
            filter;
    }
}
function initCamera() {
  const video = $("#camera");
  const select = $("#filter-select");
  const message = $("#camera-message");

  select.addEventListener("change", () => {
    video.className = select.value === "none" ? "" : `filter-${select.value}`;
  });

  $("#start-camera").addEventListener("click", async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      video.srcObject = stream;
      message.textContent = "Camera is ready. Capture a tiny memory.";
      toast("Camera started.");
    } catch (error) {
      message.textContent = "Camera could not start. Try opening this page from localhost and allow camera access.";
      toast("Camera access was blocked or unavailable.");
    }
  });

  $("#capture-photo").addEventListener("click", () => {
    if (!video.videoWidth) {
      toast("Start the camera before capturing.");
      return;
    }
    const canvas = $("#capture-canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    applyCanvasFilter(ctx, select.value);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    state.photos.unshift({ id: `${Date.now()}`, src: canvas.toDataURL("image/jpeg", .9), created: Date.now() });
    state.photos = state.photos.slice(0, 12);
    saveState();
    renderPhotos();
    unlock("first-photo", "Badge unlocked: Photo Strip Starter");
  });

  $("#download-strip").addEventListener("click", downloadStrip);
}

function applyCanvasFilter(ctx, filter) {
  ctx.filter = {
    soft: "saturate(1.1) sepia(.08) hue-rotate(315deg) brightness(1.08)",
    mint: "saturate(1.1) hue-rotate(65deg) brightness(1.05)",
    bw: "grayscale(1) contrast(1.08)",
    warm: "sepia(.22) saturate(1.25) brightness(1.05)"
  }[filter] || "none";
}

function renderPhotos() {
  const strip = $("#photo-strip");
  strip.innerHTML = "";
  const photos = state.photos.slice(0, 4);
  if (!photos.length) {
    strip.innerHTML = `<p class="empty">Your photo strip is blank for now.</p>`;
    return;
  }
  photos.forEach(photo => {
    const item = document.createElement("div");
    item.className = "strip-photo";
    item.innerHTML = `<img src="${photo.src}" alt="Captured photo"><button type="button">Delete</button>`;
    $("button", item).addEventListener("click", () => {
      state.photos = state.photos.filter(saved => saved.id !== photo.id);
      saveState();
      renderPhotos();
    });
    strip.append(item);
  });
}

async function downloadStrip() {
  const photos = state.photos.slice(0, 4);
  if (!photos.length) {
    toast("Capture at least one photo first.");
    return;
  }
  const canvas = document.createElement("canvas");
  const width = 720;
  const photoHeight = 430;
  canvas.width = width;
  canvas.height = photos.length * photoHeight + 170;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fffdf7";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f8b8cc";
  ctx.fillRect(0, 0, canvas.width, 44);
  ctx.fillStyle = "#51404a";
  ctx.font = "700 38px Nunito";
  ctx.fillText("cozy photo strip", 40, canvas.height - 58);

  for (let index = 0; index < photos.length; index += 1) {
    const img = await loadImage(photos[index].src);
    const y = 70 + index * photoHeight;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(44, y - 22, width - 88, photoHeight - 28);
    ctx.drawImage(img, 68, y, width - 136, photoHeight - 88);
  }

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "cozy-photo-strip.png";
  link.click();
  toast("Photo strip downloaded.");
}

function loadImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
}


// ==========================
// MUSIC BUTTON
// ==========================

const musicBtn =
    document.getElementById(
        "musicBtn"
    );

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
// LOAD PAGE
// ==========================

loadWishlist();
loadPhotos();