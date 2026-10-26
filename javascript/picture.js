document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("enlargedImg");
  const caption = document.getElementById("galleryCaption");
  const closeButton = document.getElementById("closeGallery");
  const previousButton = document.getElementById("previousPhoto");
  const nextButton = document.getElementById("nextPhoto");
  const photos = Array.from(document.querySelectorAll(".gallery-item"));

  if (!modal || !modalImage || !caption || !closeButton || !previousButton || !nextButton || photos.length === 0) {
    return;
  }

  let currentIndex = 0;

  const showPhoto = (index) => {
    currentIndex = (index + photos.length) % photos.length;
    const photo = photos[currentIndex];
    const image = photo.querySelector("img");

    if (!image) {
      return;
    }

    modalImage.src = photo.dataset.full;
    modalImage.alt = image.alt;
    caption.textContent = `PHOTO ${String(currentIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
  };

  photos.forEach((photo, index) => {
    photo.addEventListener("click", () => {
      showPhoto(index);
      modal.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener("click", () => modal.close());
  previousButton.addEventListener("click", () => showPhoto(currentIndex - 1));
  nextButton.addEventListener("click", () => showPhoto(currentIndex + 1));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  modal.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPhoto(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showPhoto(currentIndex + 1);
    }
  });
});
