// Array: Store product information
const products = [
    {
        id: "freshBreads",
        name: "Fresh Breads"
    }
];

// Object: Store messages for each favorite state
const favoriteMessages = {
    added: "This item is in your favorites!",
    removed: "This item is not in your favorites yet."
};

// Get the product displayed on this page
const currentProduct = products[0];

// Get HTML elements
const favoriteButton = document.getElementById("favorite-button");
const favoriteMessage = document.getElementById("favorite-message");

// Load saved data
const storageKey = currentProduct.id + "Favorite";

let isFavorite = localStorage.getItem(storageKey) === "true";

// Update the display
function updateFavoriteDisplay() {
    if (isFavorite) {
        favoriteButton.textContent = "Remove from Favorites";
        favoriteMessage.textContent = favoriteMessages.added;
    } else {
        favoriteButton.textContent = "Add to Favorites";
        favoriteMessage.textContent = favoriteMessages.removed;
    }
}

// Toggle favorite status
favoriteButton.addEventListener("click", function () {
    isFavorite = !isFavorite;

    localStorage.setItem(storageKey, String(isFavorite));

    updateFavoriteDisplay();
});

// Initialize the page
updateFavoriteDisplay();