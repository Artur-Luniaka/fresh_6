// Safari Match - Wild Puzzle Adventure JavaScript

// Global variables with safari theme
let gridAnimals = [];
let currentLevel = 1;
let playerScore = 0;
let boosterCount = 0;
let isGameActive = false;

// Safari-themed game functions
function startSafariAdventure() {
  console.log("🦁 Starting Safari Match Adventure!");
  isGameActive = true;

  // Show game start animation
  const playButton = document.querySelector(".play-button");
  if (playButton) {
    playButton.innerHTML =
      '<span class="button-text">Adventure Started!</span><span class="button-icon">🎯</span>';
    playButton.style.background =
      "linear-gradient(135deg, var(--sunset-orange), var(--match-vibe))";

    // Reset button after animation
    setTimeout(() => {
      playButton.innerHTML =
        '<span class="button-text">Start Adventure</span><span class="button-icon">🦒</span>';
      playButton.style.background =
        "linear-gradient(135deg, var(--leaf-green), var(--jungle-dark))";
    }, 2000);
  }

  // Initialize game grid
  initializeSafariGrid();

  // Show welcome message
  showSafariMessage(
    "Welcome to Safari Match! Connect the wild animals to solve puzzles! 🦁🐘🦒"
  );
}

function initializeSafariGrid() {
  console.log("🌿 Initializing Safari Grid...");
  gridAnimals = [
    { type: "lion", emoji: "🦁", power: 3, color: "sunset-orange" },
    { type: "elephant", emoji: "🐘", power: 5, color: "wild-brown" },
    { type: "giraffe", emoji: "🦒", power: 2, color: "savanna-gold" },
    { type: "zebra", emoji: "🦓", power: 1, color: "black" },
    { type: "hippo", emoji: "🦛", power: 4, color: "jungle-dark" },
  ];

  console.log("🐾 Safari animals loaded:", gridAnimals.length);
}

function matchAnimalBlocks() {
  if (!isGameActive) return;

  console.log("🔗 Matching animal blocks...");
  playerScore += 10;
  boosterCount++;

  // Update score display
  updatePuzzleProgress();

  // Check for special combinations
  if (boosterCount >= 5) {
    unleashBoosterWild();
  }

  // Show match animation
  showMatchAnimation();
}

function unleashBoosterWild() {
  console.log("⚡ Unleashing Wild Booster!");
  boosterCount = 0;

  // Show booster message
  showSafariMessage("⚡ WILD BOOSTER ACTIVATED! ⚡");
}

function updatePuzzleProgress() {
  console.log("📊 Updating puzzle progress...");

  // Update level progress
  if (playerScore >= currentLevel * 100) {
    currentLevel++;
    showLevelUpMessage();
  }

  // Update any progress displays on the page
  const progressElements = document.querySelectorAll(".progress-display");
  progressElements.forEach((element) => {
    if (element.dataset.type === "score") {
      element.textContent = `Score: ${playerScore}`;
    } else if (element.dataset.type === "level") {
      element.textContent = `Level: ${currentLevel}`;
    }
  });
}

function showMatchAnimation() {
  // Simple score update without animation
  console.log("+10 points scored!");
}

function showLevelUpMessage() {
  // Simple level up message without animation
  showSafariMessage(`🎉 Level Up! You've reached Level ${currentLevel}! 🎉`);
}

function showSafariMessage(message) {
  const safariMsg = document.createElement("div");
  safariMsg.className = "safari-message";
  safariMsg.textContent = message;
  safariMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--leaf-green), var(--jungle-dark));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 25px;
        box-shadow: 0 4px 15px var(--shadow-medium);
        z-index: 10000;
        max-width: 300px;
        text-align: center;
    `;

  document.body.appendChild(safariMsg);

  setTimeout(() => {
    document.body.removeChild(safariMsg);
  }, 3000);
}

// Mobile menu functionality
function initializeMobileMenu() {
  const burgerBtn = document.getElementById("burger-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const overlay = document.getElementById("mobile-menu-overlay");

  if (burgerBtn && mobileNav) {
    // Toggle mobile menu
    burgerBtn.addEventListener("click", () => {
      if (mobileNav.classList.contains("active")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("active")) {
        closeMobileMenu();
      }
    });

    // Close on click outside or overlay click
    document.addEventListener("click", (e) => {
      if (
        mobileNav.classList.contains("active") &&
        !mobileNav.contains(e.target) &&
        !burgerBtn.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close on overlay click
    if (overlay) {
      overlay.addEventListener("click", () => {
        closeMobileMenu();
      });
    }

    // Close menu when clicking on navigation links
    const mobileNavLinks = mobileNav.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });
  }
}

// Function to open mobile menu
function openMobileMenu() {
  const mobileNav = document.getElementById("mobile-nav");
  const burgerBtn = document.getElementById("burger-menu-btn");
  const overlay = document.getElementById("mobile-menu-overlay");

  if (mobileNav && burgerBtn) {
    mobileNav.classList.add("active");
    burgerBtn.classList.add("active");

    if (overlay) {
      overlay.classList.add("active");
    }

    // Block page scroll
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${window.scrollY}px`;
  }
}

// Function to close mobile menu
function closeMobileMenu() {
  const mobileNav = document.getElementById("mobile-nav");
  const burgerBtn = document.getElementById("burger-menu-btn");
  const overlay = document.getElementById("mobile-menu-overlay");

  if (mobileNav && burgerBtn) {
    mobileNav.classList.remove("active");
    burgerBtn.classList.remove("active");

    if (overlay) {
      overlay.classList.remove("active");
    }

    // Restore page scroll
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";

    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }
}

// Form handling
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }
}

function handleContactSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  // Show success message
  showSafariMessage(
    `Thank you, ${name}! Your message has been sent to the safari team! 🦁📧`
  );

  // Reset form
  event.target.reset();

  // Log form submission (in real app, this would send to server)
  console.log("📧 Contact form submitted:", { name, email, phone, message });
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
}

// Safari-themed utility functions
function getRandomSafariAnimal() {
  const animals = ["🦁", "🐘", "🦒", "🦓", "🦛", "🦏", "🐆", "🦊"];
  return animals[Math.floor(Math.random() * animals.length)];
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("🌿 Safari Match DOM loaded!");

  // Initialize all functionality
  initializeMobileMenu();
  initializeContactForm();
  initializeSmoothScrolling();

  console.log("🦁 Safari Match fully initialized!");
});

// Export functions for external use
window.SafariMatch = {
  startSafariAdventure,
  matchAnimalBlocks,
  unleashBoosterWild,
  updatePuzzleProgress,
  showSafariMessage,
  getRandomSafariAnimal,
};
