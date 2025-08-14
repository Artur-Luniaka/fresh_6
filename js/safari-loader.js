// Safari Match - Content Loader

// Load header and footer templates
async function loadTemplates() {
  try {
    // Load header
    const headerResponse = await fetch("safari-header.html");
    const headerHtml = await headerResponse.text();
    document.getElementById("safari-header-placeholder").innerHTML = headerHtml;

    // Load footer
    const footerResponse = await fetch("savanna-footer.html");
    const footerHtml = await footerResponse.text();
    document.getElementById("savanna-footer-placeholder").innerHTML =
      footerHtml;

    // Re-initialize mobile menu after loading header
    // Wait a bit for DOM to be ready
    setTimeout(() => {
      if (typeof initializeMobileMenu === "function") {
        initializeMobileMenu();
      } else if (
        window.SafariMatch &&
        window.SafariMatch.initializeMobileMenu
      ) {
        window.SafariMatch.initializeMobileMenu();
      } else {
        // Fallback: initialize directly
        const burgerBtn = document.getElementById("burger-menu-btn");
        const mobileNav = document.getElementById("mobile-nav");

        if (burgerBtn && mobileNav) {
          // Toggle mobile menu
          burgerBtn.addEventListener("click", () => {
            if (mobileNav.classList.contains("active")) {
              mobileNav.classList.remove("active");
              burgerBtn.classList.remove("active");
            } else {
              mobileNav.classList.add("active");
              burgerBtn.classList.add("active");
            }
          });

          // Close on escape key
          document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && mobileNav.classList.contains("active")) {
              mobileNav.classList.remove("active");
              burgerBtn.classList.remove("active");
            }
          });

          // Close on click outside
          document.addEventListener("click", (e) => {
            if (
              mobileNav.classList.contains("active") &&
              !mobileNav.contains(e.target) &&
              !burgerBtn.contains(e.target)
            ) {
              mobileNav.classList.remove("active");
              burgerBtn.classList.remove("active");
            }
          });
        }
      }
    }, 100);

    console.log("🌿 Templates loaded successfully");
  } catch (error) {
    console.error("❌ Error loading templates:", error);
  }
}

// Load content from JSON files
async function loadContentFromJSON(jsonFile, targetElementId) {
  try {
    const response = await fetch(`data/${jsonFile}`);
    const data = await response.json();

    const targetElement = document.getElementById(targetElementId);
    if (targetElement) {
      renderContent(data, targetElement);
    }

    console.log(`📄 Content loaded from ${jsonFile}`);
  } catch (error) {
    console.error(`❌ Error loading content from ${jsonFile}:`, error);
    // Show fallback content
    showFallbackContent(targetElementId);
  }
}

// Render content based on data structure
function renderContent(data, targetElement) {
  if (!data || !targetElement) return;

  // Determine content type and render accordingly
  if (data.features) {
    renderFeatures(data.features, targetElement);
  } else if (data.instructions) {
    renderInstructions(data.instructions, targetElement);
  } else if (data.testimonials) {
    renderTestimonials(data.testimonials, targetElement);
  } else if (data.animals) {
    renderAnimals(data.animals, targetElement);
  } else if (data.boosters) {
    renderBoosters(data.boosters, targetElement);
  } else if (data.levels) {
    renderLevels(data.levels, targetElement);
  } else if (data.enhancements) {
    renderEnhancements(data.enhancements, targetElement);
  } else if (data.diaries) {
    renderDiaries(data.diaries, targetElement);
  } else if (data.contact) {
    renderContactInfo(data.contact, targetElement);
  }
}

// Render different content types
function renderFeatures(features, targetElement) {
  targetElement.innerHTML = features
    .map(
      (feature) => `
        <div class="feature-card">
            <div class="feature-icon">${feature.icon}</div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        </div>
    `
    )
    .join("");
}

function renderInstructions(instructions, targetElement) {
  targetElement.innerHTML = instructions
    .map(
      (instruction, index) => `
        <div class="instruction-step">
            <div class="step-number">${index + 1}</div>
            <h3>${instruction.title}</h3>
            <p>${instruction.description}</p>
        </div>
    `
    )
    .join("");
}

function renderTestimonials(testimonials, targetElement) {
  targetElement.innerHTML = testimonials
    .map(
      (testimonial) => `
        <div class="testimonial-card">
            <p>${testimonial.comment}</p>
            <div class="player-name">- ${testimonial.name}</div>
        </div>
    `
    )
    .join("");
}

function renderAnimals(animals, targetElement) {
  targetElement.innerHTML = animals
    .map(
      (animal) => `
        <div class="animal-type">
            <div class="animal-emoji">${animal.emoji}</div>
            <h3>${animal.name}</h3>
            <p>${animal.description}</p>
            <p><strong>Power:</strong> ${animal.power}</p>
        </div>
    `
    )
    .join("");
}

function renderBoosters(boosters, targetElement) {
  targetElement.innerHTML = boosters
    .map(
      (booster) => `
        <div class="booster-type">
            <div class="booster-emoji">${booster.icon}</div>
            <h3>${booster.name}</h3>
            <p>${booster.description}</p>
            <p><strong>Effect:</strong> ${booster.effect}</p>
        </div>
    `
    )
    .join("");
}

function renderLevels(levels, targetElement) {
  targetElement.innerHTML = `
        <div class="level-table">
            ${levels
              .map(
                (level) => `
                <div class="level-row">
                    <div class="level-number">${level.number}</div>
                    <div class="level-name">${level.name}</div>
                    <div class="level-status ${
                      level.completed ? "status-completed" : "status-locked"
                    }">
                        ${level.completed ? "✅ Completed" : "🔒 Locked"}
                    </div>
                </div>
            `
              )
              .join("")}
        </div>
    `;
}

function renderEnhancements(enhancements, targetElement) {
  targetElement.innerHTML = enhancements
    .map(
      (enhancement) => `
        <div class="feature-card">
            <div class="feature-icon">${enhancement.icon}</div>
            <h3>${enhancement.title}</h3>
            <p>${enhancement.description}</p>
            <small><strong>Version:</strong> ${enhancement.version}</small>
        </div>
    `
    )
    .join("");
}

function renderDiaries(diaries, targetElement) {
  targetElement.innerHTML = diaries
    .map(
      (diary) => `
        <div class="feature-card">
            <div class="feature-icon">${diary.icon}</div>
            <h3>${diary.title}</h3>
            <p>${diary.story}</p>
            <small><strong>Player:</strong> ${diary.player}</small>
        </div>
    `
    )
    .join("");
}

function renderContactInfo(contact, targetElement) {
  targetElement.innerHTML = `
        <div class="contact-item">
            <div class="contact-icon">📧</div>
            <div>
                <strong>Email:</strong> <a href="mailto:${contact.email}" class="safari-link">${contact.email}</a>
            </div>
        </div>
        <div class="contact-item">
            <div class="contact-icon">📞</div>
            <div>
                <strong>Phone:</strong> <a href="tel:${contact.phone}" class="safari-link">${contact.phone}</a>
            </div>
        </div>
        <div class="contact-item">
            <div class="contact-icon">📍</div>
            <div>
                <strong>Address:</strong> ${contact.address}
            </div>
        </div>
    `;
}

// Show fallback content when JSON loading fails
function showFallbackContent(targetElementId) {
  const targetElement = document.getElementById(targetElementId);
  if (!targetElement) return;

  const fallbackContent = getFallbackContent(targetElementId);
  if (fallbackContent) {
    targetElement.innerHTML = fallbackContent;
  }
}

// Get fallback content for different sections
function getFallbackContent(targetElementId) {
  const fallbackContent = {
    "features-content": `
            <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <h3>500+ Exciting Levels</h3>
                <p>Challenge yourself with hundreds of unique puzzle levels that get progressively more challenging.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🦁</div>
                <h3>Wild Animal Collection</h3>
                <p>Discover and match beautiful safari animals with unique abilities and special powers.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3>Powerful Boosters</h3>
                <p>Unlock and use amazing boosters to clear difficult levels and achieve higher scores.</p>
            </div>
        `,
    "instructions-content": `
            <div class="instruction-step">
                <div class="step-number">1</div>
                <h3>Match Three or More</h3>
                <p>Connect three or more identical animal blocks in a row or column to make them disappear.</p>
            </div>
            <div class="instruction-step">
                <div class="step-number">2</div>
                <h3>Create Special Combinations</h3>
                <p>Match four or more blocks to create powerful special blocks that can clear entire rows or columns.</p>
            </div>
            <div class="instruction-step">
                <div class="step-number">3</div>
                <h3>Use Boosters Wisely</h3>
                <p>Collect boosters and use them strategically to overcome challenging levels and obstacles.</p>
            </div>
        `,
    "testimonials-content": `
            <div class="testimonial-card">
                <p>This game is absolutely addictive! The safari theme is so much fun and the puzzles are challenging but fair.</p>
                <div class="player-name">- Sarah M.</div>
            </div>
            <div class="testimonial-card">
                <p>Love the animal characters and the boosters make the game really exciting. Perfect for puzzle lovers!</p>
                <div class="player-name">- Mike R.</div>
            </div>
            <div class="testimonial-card">
                <p>Great graphics and smooth gameplay. The level progression keeps me coming back for more!</p>
                <div class="player-name">- Emma L.</div>
            </div>
        `,
    "animals-boosters-content": `
            <div class="animal-type">
                <div class="animal-emoji">🦁</div>
                <h3>Lion</h3>
                <p>The king of the jungle with powerful matching abilities.</p>
                <p><strong>Power:</strong> 3</p>
            </div>
            <div class="booster-type">
                <div class="booster-emoji">⚡</div>
                <h3>Lightning Strike</h3>
                <p>Clears an entire row or column instantly.</p>
                <p><strong>Effect:</strong> Row/Column Clear</p>
            </div>
        `,
    "progress-content": `
            <div class="level-table">
                <div class="level-row">
                    <div class="level-number">1</div>
                    <div class="level-name">Welcome to Safari</div>
                    <div class="level-status status-completed">✅ Completed</div>
                </div>
                <div class="level-row">
                    <div class="level-number">2</div>
                    <div class="level-name">First Steps</div>
                    <div class="level-status status-completed">✅ Completed</div>
                </div>
                <div class="level-row">
                    <div class="level-number">3</div>
                    <div class="level-name">Animal Friends</div>
                    <div class="level-status status-locked">🔒 Locked</div>
                </div>
            </div>
        `,
    "enhancements-content": `
            <div class="feature-card">
                <div class="feature-icon">🆕</div>
                <h3>New Animal Types</h3>
                <p>Added exciting new safari animals with unique abilities and special powers.</p>
                <small><strong>Version:</strong> 2.1.0</small>
            </div>
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3>Enhanced Boosters</h3>
                <p>Improved booster mechanics and added new special combinations for more strategic gameplay.</p>
                <small><strong>Version:</strong> 2.1.0</small>
            </div>
        `,
    "diaries-content": `
            <div class="feature-card">
                <div class="feature-icon">🏆</div>
                <h3>New World Record!</h3>
                <p>Player "WildPuzzleMaster" achieved an incredible score of 15,420 points on Level 47!</p>
                <small><strong>Player:</strong> WildPuzzleMaster</small>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <h3>Perfect Combo</h3>
                <p>Amazing 8-block combination created by "SafariQueen" resulting in a massive score boost!</p>
                <small><strong>Player:</strong> SafariQueen</small>
            </div>
        `,
    "contact-details-content": `
            <div class="contact-item">
                <div class="contact-icon">📧</div>
                <div>
                    <strong>Email:</strong> <a href="mailto:info@safarimatch.com" class="safari-link">info@safarimatch.com</a>
                </div>
            </div>
            <div class="contact-item">
                <div class="contact-icon">📞</div>
                <div>
                    <strong>Phone:</strong> <a href="tel:+27-21-123-4567" class="safari-link">+27 21 123 4567</a>
                </div>
            </div>
            <div class="contact-item">
                <div class="contact-icon">📍</div>
                <div>
                    <strong>Address:</strong> Safari Street 123, Cape Town, South Africa
                </div>
            </div>
        `,
  };

  return fallbackContent[targetElementId] || "<p>Content loading...</p>";
}

// Load all content for the current page
async function loadPageContent() {
  const currentPage = getCurrentPage();

  // Load templates first
  await loadTemplates();

  // Load page-specific content
  switch (currentPage) {
    case "index":
      await loadContentFromJSON("home-content.json", "features-content");
      await loadContentFromJSON("home-content.json", "instructions-content");
      await loadContentFromJSON("home-content.json", "testimonials-content");
      await loadContentFromJSON(
        "home-content.json",
        "animals-boosters-content"
      );
      await loadContentFromJSON("home-content.json", "progress-content");
      break;
    case "updates":
      await loadContentFromJSON("updates-content.json", "enhancements-content");
      await loadContentFromJSON("updates-content.json", "diaries-content");
      break;
    case "contact":
      await loadContentFromJSON(
        "contact-content.json",
        "contact-details-content"
      );
      break;
  }
}

// Determine current page
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes("index.html") || path === "/" || path === "")
    return "index";
  if (path.includes("safari-updates.html")) return "updates";
  if (path.includes("contact-safari.html")) return "contact";
  return "index";
}

// Initialize content loading when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("🌿 Safari Match Content Loader initialized");
  loadPageContent();
});

// Export functions for external use
window.SafariLoader = {
  loadTemplates,
  loadContentFromJSON,
  loadPageContent,
  renderContent,
};
