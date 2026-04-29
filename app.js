const STORAGE_KEY = "runClubPhotos";
const form = document.getElementById("uploadForm");
const photoGrid = document.getElementById("photoGrid");

const starterPhotos = [
  {
    title: "Kickoff Run",
    date: "2026-04-20",
    photoUrl:
      "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=1200&q=80",
    caption: "A sunny welcome run through the neighborhood."
  }
];

function getPhotos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(starterPhotos));
    return starterPhotos;
  }
  return JSON.parse(stored);
}

function savePhotos(photos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
}

function renderGallery() {
  const photos = getPhotos().sort((a, b) => new Date(b.date) - new Date(a.date));
  photoGrid.innerHTML = "";

  photos.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "photo-item";
    card.innerHTML = `
      <img src="${entry.photoUrl}" alt="${entry.title}" loading="lazy" />
      <div class="photo-meta">
        <p><strong>${entry.title}</strong></p>
        <p>${entry.date}</p>
        <p>${entry.caption ?? ""}</p>
      </div>
    `;
    photoGrid.appendChild(card);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const payload = {
    title: document.getElementById("runTitle").value,
    date: document.getElementById("runDate").value,
    photoUrl: document.getElementById("photoUrl").value,
    caption: document.getElementById("caption").value
  };

  const photos = getPhotos();
  photos.push(payload);
  savePhotos(photos);
  renderGallery();
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
renderGallery();
