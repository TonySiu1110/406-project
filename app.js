const STORAGE_KEY = "foodiesRunClubPhotos";
const form = document.getElementById("uploadForm");
const photoGrid = document.getElementById("photoGrid");

const starterPhotos = [
  {
    title: "Sunrise Miles + Croissants",
    date: "2026-04-26",
    photoUrl:
      "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1200&q=80",
    caption: "Easy pace and flaky pastries after the run."
  },
  {
    title: "River Loop + Tacos",
    date: "2026-04-19",
    photoUrl:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
    caption: "Golden hour miles and legendary tacos."
  },
  {
    title: "Tempo + Smoothie Bowls",
    date: "2026-04-12",
    photoUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    caption: "Post-run protein and fruit bowls."
  },
  {
    title: "Park Laps + Pancakes",
    date: "2026-04-05",
    photoUrl:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80",
    caption: "Stacks, syrup, and Sunday smiles."
  },
  {
    title: "Coastal Run + Coffee",
    date: "2026-03-29",
    photoUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    caption: "Strong legs, stronger espresso."
  },
  {
    title: "Recovery Walk + Bagels",
    date: "2026-03-22",
    photoUrl:
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80",
    caption: "Low pace, high vibes, extra cream cheese."
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
