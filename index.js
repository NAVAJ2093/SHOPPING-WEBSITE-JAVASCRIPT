document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }

      navLinks.forEach((link) => {
        link.classList.remove("active");
        link.style.cssText = ""; // Reset inline styles
      });

      this.classList.add("active");
      this.style.color = "#dd819c"; // Set inline CSS for active link (for example, changing color to red)
    });
  });
});

const cardButtons = document.querySelectorAll(".card-btn");
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartContent = document.querySelector(".cart-content");
const totalElement = document.querySelector(".total-price");
const closeButton = document.getElementById("cart-close");
let num = 0;
let total = 0;

cart.style.display = "none";

cartIcon.addEventListener("click", () => {
  cart.classList.toggle("active");
});

closeButton.addEventListener("click", () => {
  cart.classList.remove("active");
});

function itemExists(title) {
  const cartItems = document.querySelectorAll(".cart-item");
  for (let item of cartItems) {
    if (item.querySelector(".cart-item-title").textContent === title) {
      return item;
    }
  }
  return null;
}

cardButtons.forEach(function (cardButton) {
  cardButton.addEventListener("click", function (event) {
    event.preventDefault();

    cart.style.display = "block";

    const title = this.parentElement.querySelector(".description").textContent;
    const price = this.parentElement.querySelector(".price").textContent;
    const imgSrc = this.parentElement.querySelector(".product-img").src;

    const existingItem = itemExists(title);
    if (existingItem) {
      const quantityElement = existingItem.querySelector(".cart-item-quantity");
      const quantity = parseInt(quantityElement.textContent) + 1;
      quantityElement.textContent = quantity;
      total += parseFloat(price.replace("$", ""));
      totalElement.textContent = `$${total.toFixed(2)}`;
    } else {
      num++;
      document.querySelector("#cart-Num").textContent = num;

      total += parseFloat(price.replace("$", ""));
      totalElement.textContent = `$${total.toFixed(2)}`;

      let cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div class="cart-item-details">
          <img src="${imgSrc}" class="cart-item-img">
          <div class="cart-item-info">
            <div class="cart-item-title">${title}</div>
            <div class="cart-item-price">${price}</div>
            <div class="cart-item-quantity">1</div>
          </div>
        </div>
        <i class="fa-solid fa-xmark cart-item-remove"></i>
      `;

      cartItem
        .querySelector(".cart-item-remove")
        .addEventListener("click", function () {
          cartContent.removeChild(cartItem);
          num--;
          document.querySelector("#cart-Num").textContent = num;
          total -= parseFloat(price.replace("$", ""));
          totalElement.textContent = `$${total.toFixed(2)}`;
          if (num === 0) {
            cart.style.display = "none";
          }
        });

      cartContent.appendChild(cartItem);
    }
  });
});

// let scrollContainers = document.querySelectorAll(".gallary");
// let prevBtns = document.querySelectorAll(".prev-icon");
// let nextBtns = document.querySelectorAll(".next-icon");

// nextBtns.forEach((nextBtn) => {
//   nextBtn.addEventListener("click", () => {
//     scrollContainers.forEach((scrollContainer) => {
//       scrollContainer.style.scrollBehavior = "smooth";
//       scrollContainer.scrollLeft += 900;
//     });
//   });
// });

// prevBtns.forEach((prevBtn) => {
//   prevBtn.addEventListener("click", () => {
//     scrollContainers.forEach((scrollContainer) => {
//       scrollContainer.style.scrollBehavior = "smooth";
//       scrollContainer.scrollLeft -= 900;
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const prevBtns = document.querySelectorAll(".prev-icon");
  const nextBtns = document.querySelectorAll(".next-icon");

  nextBtns.forEach((nextBtn) => {
    nextBtn.addEventListener("click", () => {
      const targetId = nextBtn.dataset.target;
      const scrollContainer = document.getElementById(targetId);
      if (scrollContainer) {
        scrollContainer.style.scrollBehavior = "smooth";
        const cardWidth =
          window.innerWidth <= 428
            ? scrollContainer.offsetWidth / 2
            : scrollContainer.querySelector("div span").offsetWidth;
        const scrollAmount =
          window.innerWidth <= 428
            ? cardWidth * 2
            : scrollContainer.offsetWidth;
        scrollContainer.scrollLeft += scrollAmount;
      } else {
        console.error("Scroll container not found for ID:", targetId);
      }
    });
  });

  prevBtns.forEach((prevBtn) => {
    prevBtn.addEventListener("click", () => {
      const targetId = prevBtn.dataset.target;
      const scrollContainer = document.getElementById(targetId);
      if (scrollContainer) {
        scrollContainer.style.scrollBehavior = "smooth";
        const cardWidth =
          window.innerWidth <= 428
            ? scrollContainer.offsetWidth / 2
            : scrollContainer.querySelector("div span").offsetWidth;
        const scrollAmount =
          window.innerWidth <= 428
            ? cardWidth * 2
            : scrollContainer.offsetWidth;
        scrollContainer.scrollLeft -= scrollAmount;
      } else {
        console.error("Scroll container not found for ID:", targetId);
      }
    });
  });
});

let userTexts = document.getElementsByClassName("user-text");
let userPics = document.getElementsByClassName("user-pic");

function showReview() {
  for (userPic of userPics) {
    userPic.classList.remove("active-pic");
  }
  for (userText of userTexts) {
    userText.classList.remove("active-text");
  }
  let i = Array.from(userPics).indexOf(event.target);
  userPics[i].classList.add("active-pic");
  userTexts[i].classList.add("active-text");
}
document.querySelector(".burger-menu").addEventListener("click", function () {
  // Toggle the 'active' class for hamburger menu lines
  document
    .querySelectorAll(".burger-icon,.close-icon")
    .forEach((icon) => icon.classList.toggle("active"));

  // Toggle the 'active' class for navigation links
  document.querySelector("nav ul").classList.toggle("active");
  document.querySelector(".icon").classList.toggle("active");
});
