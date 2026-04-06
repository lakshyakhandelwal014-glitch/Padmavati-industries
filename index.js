// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }
});

// Mobile Menu
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

// Hero Slider
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

if (slides.length > 0) {
  setInterval(() => {
    slides.forEach(slide => slide.classList.remove("active"));
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 4000);
}

// Search + Filter
const searchInput = document.getElementById("productSearch");
const categoryFilter = document.getElementById("categoryFilter");
const productCards = document.querySelectorAll(".product-card");

function filterProducts() {
  const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
  const categoryValue = categoryFilter ? categoryFilter.value : "all";

  productCards.forEach(card => {
    const productName = card.dataset.name.toLowerCase();
    const productCategory = card.dataset.category;

    const matchesSearch = productName.includes(searchValue);
    const matchesCategory = categoryValue === "all" || productCategory === categoryValue;

    card.style.display = matchesSearch && matchesCategory ? "block" : "none";
  });
}

if (searchInput) searchInput.addEventListener("keyup", filterProducts);
if (categoryFilter) categoryFilter.addEventListener("change", filterProducts);

// Quantity Buttons
document.querySelectorAll(".product-card").forEach(card => {
  const minusBtn = card.querySelector(".minus");
  const plusBtn = card.querySelector(".plus");
  const qtyInput = card.querySelector(".qty-input");

  if (minusBtn && plusBtn && qtyInput) {
    minusBtn.addEventListener("click", () => {
      let value = parseInt(qtyInput.value);
      if (value > 1) qtyInput.value = value - 1;
    });

    plusBtn.addEventListener("click", () => {
      let value = parseInt(qtyInput.value);
      qtyInput.value = value + 1;
    });
  }
});

// Scroll to Top
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (scrollTopBtn) {
    scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  }
  revealSections();
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Forms
const contactForm = document.getElementById("contactForm");
const enquiryForm = document.getElementById("enquiryForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you! Your enquiry has been submitted.");
    contactForm.reset();
  });
}

if (enquiryForm) {
  enquiryForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Business enquiry submitted successfully!");
    enquiryForm.reset();
  });
}

// Product Modal
const modal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalImage = document.getElementById("modalImage");
const modalWhatsapp = document.getElementById("modalWhatsapp");
const quickViewButtons = document.querySelectorAll(".quick-view");

quickViewButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const productCard = e.target.closest(".product-card");
    const title = productCard.querySelector("h3").innerText;
    const text = productCard.querySelector("p").innerText;
    const image = productCard.querySelector("img").src;

    modalTitle.innerText = title;
    modalText.innerText = text;
    modalImage.src = image;
    modalWhatsapp.href = `https://wa.me/919876543210?text=Hello%20Padmavati%20Industries,%20I%20am%20interested%20in%20${encodeURIComponent(title)}`;

    modal.style.display = "flex";
  });
});

if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Reveal
const reveals = document.querySelectorAll(".reveal");

function revealSections() {
  reveals.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (sectionTop < screenHeight - 100) {
      section.classList.add("active");
    }
  });
}
revealSections();

// Enquiry Cart
let enquiryItems = JSON.parse(localStorage.getItem("enquiryItems")) || [];
const enquiryList = document.getElementById("enquiryList");
const addButtons = document.querySelectorAll(".add-enquiry");
const sendWhatsappEnquiry = document.getElementById("sendWhatsappEnquiry");

function saveEnquiryItems() {
  localStorage.setItem("enquiryItems", JSON.stringify(enquiryItems));
}

function renderEnquiryItems() {
  if (!enquiryList) return;

  if (enquiryItems.length === 0) {
    enquiryList.innerHTML = "<p>No products added yet.</p>";
    return;
  }

  enquiryList.innerHTML = "";
  enquiryItems.forEach((item, index) => {
    enquiryList.innerHTML += `
      <div class="enquiry-item">
        <strong>${item.name}</strong><br>
        Quantity: ${item.qty}
      </div>
    `;
  });
}

addButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const productCard = e.target.closest(".product-card");
    const name = productCard.dataset.name;
    const qty = productCard.querySelector(".qty-input").value;

    enquiryItems.push({ name, qty });
    saveEnquiryItems();
    alert(`${name} added to enquiry list.`);
  });
});

if (sendWhatsappEnquiry) {
  sendWhatsappEnquiry.addEventListener("click", () => {
    if (enquiryItems.length === 0) {
      alert("Please add products first.");
      return;
    }

    let message = "Hello Padmavati Industries, I am interested in:%0A%0A";
    enquiryItems.forEach(item => {
      message += `• ${item.name} - Qty: ${item.qty}%0A`;
    });

    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  });
}

renderEnquiryItems();