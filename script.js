const familyGrid = document.getElementById("familyGrid");
const searchInput = document.getElementById("searchInput");

function createPersonCard(person, index) {
    const doNotBuyText = person.doNotBuy
        ? `
      <p class="detail-line warning-line">
        <span class="detail-icon">🚫</span>
        <strong>Do Not Buy:</strong> ${person.doNotBuy}
      </p>
    `
        : "";

    const wishlistButton = person.wishlist
        ? `
      <a
        class="wishlist-button"
        href="${person.wishlist}"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Wishlist
      </a>
    `
        : `<span class="wishlist-button disabled">Wishlist Coming Soon</span>`;

    return `
    <article class="accordion-card" data-name="${person.name.toLowerCase()}">
      <button class="accordion-toggle" aria-expanded="${index === 0 ? "true" : "false"}">
        <div class="person-summary">
          <img
            src="${person.image}"
            alt="Photo of ${person.name}"
            class="avatar"
          />

          <div>
            <p class="card-label">Wishlist Card</p>
            <h2>${person.name}</h2>
          </div>
        </div>

        <span class="chevron">${index === 0 ? "⌃" : "⌄"}</span>
      </button>

      <div class="accordion-content ${index === 0 ? "open" : ""}">
        <div class="details">
          <p class="detail-line">
            <span class="detail-icon">👕</span>
            <strong>Shirt:</strong> ${person.clothing.shirt}
          </p>

          <p class="detail-line">
            <span class="detail-icon">👖</span>
            <strong>Pants:</strong> ${person.clothing.pants}
          </p>

          <p class="detail-line">
            <span class="detail-icon">👟</span>
            <strong>Shoe:</strong> ${person.clothing.shoe}
          </p>

          <p class="detail-line">
            <span class="detail-icon">⭐</span>
            <strong>Teams:</strong> ${person.favorites.teams}
          </p>

          <p class="detail-line">
            <span class="detail-icon">🎨</span>
            <strong>Colors:</strong> ${person.favorites.colors}
          </p>

          <p class="detail-line">
            <span class="detail-icon">🎁</span>
            <strong>Gift Notes:</strong> ${person.giftNotes}
          </p>

          ${doNotBuyText}
        </div>

        ${wishlistButton}
      </div>
    </article>
  `;
}

function renderFamilyCards(list = familyMembers) {
    familyGrid.innerHTML = list.map(createPersonCard).join("");

    const toggles = document.querySelectorAll(".accordion-toggle");

    toggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const card = toggle.closest(".accordion-card");
            const content = card.querySelector(".accordion-content");
            const chevron = card.querySelector(".chevron");
            const isOpen = content.classList.contains("open");

            content.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(!isOpen));
            chevron.textContent = isOpen ? "⌄" : "⌃";
        });
    });
}

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredMembers = familyMembers.filter((person) => {
        return person.name.toLowerCase().includes(searchTerm);
    });

    renderFamilyCards(filteredMembers);
});

renderFamilyCards();

console.log("No More Guessing is loaded.");