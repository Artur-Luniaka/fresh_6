// Safari Match - Wild Puzzle Adventure JavaScript

// Global variables with safari theme
let gridAnimals = [];
let currentLevel = 1;
let playerScore = 0;
let boosterCount = 0;
let isGameActive = false;

// Safari-themed game functions
function startSafariAdventure() {
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
  gridAnimals = [
    { type: "lion", emoji: "🦁", power: 3, color: "sunset-orange" },
    { type: "elephant", emoji: "🐘", power: 5, color: "wild-brown" },
    { type: "giraffe", emoji: "🦒", power: 2, color: "savanna-gold" },
    { type: "zebra", emoji: "🦓", power: 1, color: "black" },
    { type: "hippo", emoji: "🦛", power: 4, color: "jungle-dark" },
  ];
}

function matchAnimalBlocks() {
  if (!isGameActive) return;

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
  boosterCount = 0;

  // Show booster message
  showSafariMessage("⚡ WILD BOOSTER ACTIVATED! ⚡");
}

function updatePuzzleProgress() {
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

    // Hide cookie banner when mobile menu is open
    if (window.hideCookieBannerForMenu) {
      window.hideCookieBannerForMenu();
    }
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

    // Show cookie banner when mobile menu is closed
    if (window.showCookieBannerForMenu) {
      window.showCookieBannerForMenu();
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
  const phone = formData.get("phone");
  const message = formData.get("message");

  // Простая валидация на заполненность полей
  if (!name || !name.trim()) {
    showSafariMessage("Пожалуйста, введите ваше имя");
    document.getElementById("visitor-name").focus();
    return;
  }

  if (!phone || !phone.trim()) {
    showSafariMessage("Пожалуйста, введите номер телефона");
    document.getElementById("visitor-phone").focus();
    return;
  }

  if (!message || !message.trim()) {
    showSafariMessage("Пожалуйста, введите сообщение");
    document.getElementById("visitor-message").focus();
    return;
  }

  // Показываем оверлей и модалку
  showSubmissionOverlay();

  // Прокручиваем страницу вверх
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Имитируем процесс отправки (в реальном приложении здесь был бы API запрос)
  setTimeout(() => {
    showSuccessMessage(name);
  }, 3000);

  // Reset form
  event.target.reset();

  // Form submission logged (in real app, this would send to server)
}

// Функция показа оверлея с модалкой
function showSubmissionOverlay() {
  // Создаем оверлей
  const overlay = document.createElement("div");
  overlay.id = "submission-overlay";
  overlay.className = "submission-overlay";

  // Создаем модалку
  const modal = document.createElement("div");
  modal.className = "submission-modal";

  // Создаем спиннер
  const spinner = document.createElement("div");
  spinner.className = "submission-spinner";
  spinner.innerHTML = `
    <div class="spinner-ring"></div>
    <div class="spinner-text">Processing your message...</div>
  `;

  modal.appendChild(spinner);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Блокируем прокрутку страницы
  document.body.style.overflow = "hidden";
}

// Функция скрытия оверлея
function hideSubmissionOverlay() {
  const overlay = document.getElementById("submission-overlay");
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = "";
  }
}

// Функция показа уведомления об успехе в той же модалке
function showSuccessMessage(name) {
  const modal = document.querySelector(".submission-modal");
  if (modal) {
    // Заменяем содержимое модалки на уведомление
    modal.innerHTML = `
      <div class="success-content">
        <h3>Message Sent Successfully!</h3>
        <p>Thank you, ${name}! Your message has been received by our safari team.</p>
        <p>We'll get back to you as soon as possible.</p>
      </div>
    `;

    // Автоматически закрываем модалку через 3 секунды
    setTimeout(() => {
      hideSubmissionOverlay();
    }, 3000);
  }
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

// Cookie consent functionality
function initializeCookieConsent() {
  const cookieBanner = document.getElementById("cookie-consent-banner");
  const acceptButton = document.getElementById("cookie-accept-btn");

  if (!cookieBanner || !acceptButton) return;

  // Check if user has already accepted cookies
  const cookiesAccepted = localStorage.getItem("safari-cookies-accepted");

  if (cookiesAccepted === "true") {
    // Hide banner if cookies already accepted
    cookieBanner.style.display = "none";
    return;
  }

  // Show banner after a short delay
  setTimeout(() => {
    cookieBanner.classList.add("show");
  }, 1000);

  // Handle accept button click
  acceptButton.addEventListener("click", () => {
    // Save to localStorage
    localStorage.setItem("safari-cookies-accepted", "true");

    // Hide banner with animation
    cookieBanner.classList.remove("show");

    // Remove banner from DOM after animation
    setTimeout(() => {
      cookieBanner.style.display = "none";
    }, 300);
  });

  // Function to hide cookie banner when mobile menu is open
  function hideCookieBannerForMenu() {
    if (cookieBanner && !cookiesAccepted) {
      cookieBanner.style.visibility = "hidden";
      cookieBanner.style.opacity = "0";
    }
  }

  // Function to show cookie banner when mobile menu is closed
  function showCookieBannerForMenu() {
    if (cookieBanner && !cookiesAccepted) {
      cookieBanner.style.visibility = "visible";
      cookieBanner.style.opacity = "1";
    }
  }

  // Export functions for mobile menu to use
  window.hideCookieBannerForMenu = hideCookieBannerForMenu;
  window.showCookieBannerForMenu = showCookieBannerForMenu;
}

// Safari-themed utility functions
function getRandomSafariAnimal() {
  const animals = ["🦁", "🐘", "🦒", "🦓", "🦛", "🦏", "🐆", "🦊"];
  return animals[Math.floor(Math.random() * animals.length)];
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initializeMobileMenu();
  initializeContactForm();
  initializeSmoothScrolling();
  initializeCookieConsent();
});

// Export functions for external use
window.SafariMatch = {
  startSafariAdventure,
  matchAnimalBlocks,
  unleashBoosterWild,
  updatePuzzleProgress,
  showSafariMessage,
  getRandomSafariAnimal,
  showSubmissionOverlay,
  hideSubmissionOverlay,
  showSuccessMessage,
  initializeCookieConsent,
};
