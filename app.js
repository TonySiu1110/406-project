const STORAGE_KEY = "foodiesRunClubPhotos";
const form = document.getElementById("uploadForm");
const photoGrid = document.getElementById("photoGrid");

const starterPhotos = [
  {
    title: "Sunrise Miles + Croissants",
    date: "2026-04-20",
    photoUrl:
      "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1200&q=80",
    caption: "Easy social run followed by pastries and coffee."
  },
  {
    title: "Waterfront Loop + Tacos",
    date: "2026-04-13",
    photoUrl:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
    caption: "Golden hour miles and the best post-run bite in town."
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
