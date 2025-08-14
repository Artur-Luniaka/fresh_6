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
    // Show error message
    showErrorContent(targetElementId);
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
  } else if (data["adventurer-text"]) {
    renderAdventurerText(data["adventurer-text"], targetElement);
  } else if (data.animals) {
    renderAnimals(data.animals, targetElement);
  } else if (data.levels) {
    renderLevels(data.levels, targetElement);
  } else if (data.enhancements) {
    renderEnhancements(data.enhancements, targetElement);
  } else if (data.diaries) {
    renderDiaries(data.diaries, targetElement);
  } else if (data.contact) {
    renderContact(data.contact, targetElement);
  } else if (data.disclaimer) {
    renderDisclaimer(data.disclaimer, targetElement);
  } else if (data.cookiePolicy) {
    renderCookiePolicy(data.cookiePolicy, targetElement);
  } else if (data.privacyPolicy) {
    renderPrivacyPolicy(data.privacyPolicy, targetElement);
  }
}

// Render different content types
function renderFeatures(features, targetElement) {
  targetElement.innerHTML = features
    .map((feature) => {
      // Determine safari theme class based on feature content
      let safariClass = "";
      if (feature.title.includes("Level") || feature.title.includes("500+")) {
        safariClass = "safari-levels";
      } else if (
        feature.title.includes("Animal") ||
        feature.title.includes("Wild")
      ) {
        safariClass = "safari-animals";
      } else if (
        feature.title.includes("Booster") ||
        feature.title.includes("Power")
      ) {
        safariClass = "safari-boosters";
      } else if (
        feature.title.includes("Graphics") ||
        feature.title.includes("Safari")
      ) {
        safariClass = "safari-graphics";
      } else if (
        feature.title.includes("Achievement") ||
        feature.title.includes("Progress")
      ) {
        safariClass = "safari-achievements";
      } else if (
        feature.title.includes("Game Mode") ||
        feature.title.includes("Mode")
      ) {
        safariClass = "safari-modes";
      }

      return `
          <div class="feature-card ${safariClass}">
              <div class="feature-icon">${feature.icon}</div>
              <h3 class="feature-title">${feature.title}</h3>
              <p class="feature-description">${feature.description}</p>
          </div>
      `;
    })
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
        <div class="adventurer-testimonial-card">
            <p class="adventurer-testimonial-text">${testimonial.comment}</p>
            <div class="adventurer-name">- ${testimonial.name}</div>
        </div>
    `
    )
    .join("");
}

function renderAdventurerText(adventurerText, targetElement) {
  targetElement.innerHTML = adventurerText
    .map(
      (text) => `
        <p class="adventurer-text-paragraph">${text}</p>
      `
    )
    .join("");
}

function renderDisclaimer(disclaimer, targetElement) {
  targetElement.innerHTML = disclaimer.text;
}

function renderCookiePolicy(cookiePolicy, targetElement) {
  targetElement.innerHTML = cookiePolicy.text;
}

function renderPrivacyPolicy(privacyPolicy, targetElement) {
  targetElement.innerHTML = privacyPolicy.text;
}

function renderAnimals(animals, targetElement) {
  // This function will be called for the animals-boosters-content section
  // We need to render both animals and boosters from the same data
  const animalsData = animals || [];

  // Get boosters data from the same JSON
  fetch("data/home-content.json")
    .then((response) => response.json())
    .then((data) => {
      const boostersData = data.boosters || [];
      const allContent = [...animalsData, ...boostersData];

      targetElement.innerHTML = allContent
        .map((item) => {
          if (item.special_ability) {
            // This is an animal
            return `
              <div class="animal-card">
                  <h3 class="animal-name">${item.name}</h3>
                  <p class="animal-description">${item.description}</p>
                  <div class="animal-details">
                      <div class="animal-power">Power Level: ${item.power}</div>
                      <div class="animal-ability">${item.special_ability}</div>
                      <div class="animal-habitat">Habitat: ${item.habitat}</div>
                      <div class="animal-strategy">Strategy: ${item.strategy}</div>
                  </div>
              </div>
            `;
          } else {
            // This is a booster
            return `
              <div class="booster-card">
                  <h3 class="booster-name">${item.name}</h3>
                  <p class="booster-description">${item.description}</p>
                  <div class="booster-details">
                      <div class="booster-effect">Effect: ${item.effect}</div>
                      <div class="booster-power">Power Level: ${item.power_level}</div>
                      <div class="booster-best-use">Best Use: ${item.best_use}</div>
                      <div class="booster-strategy">Strategy: ${item.strategy}</div>
                  </div>
              </div>
            `;
          }
        })
        .join("");
    })
    .catch((error) => {
      console.error("❌ Error loading boosters:", error);
      // Just render animals if boosters fail
      targetElement.innerHTML = animalsData
        .map(
          (animal) => `
          <div class="animal-card">
              <h3 class="animal-name">${animal.name}</h3>
              <p class="animal-description">${animal.description}</p>
              <div class="animal-details">
                  <div class="animal-power">Power Level: ${animal.power}</div>
                  <div class="animal-ability">${animal.special_ability}</div>
                  <div class="animal-habitat">Habitat: ${animal.habitat}</div>
                  <div class="animal-strategy">Strategy: ${animal.strategy}</div>
              </div>
          </div>
        `
        )
        .join("");
    });
}

function renderSafariJourney(safariJourney, targetElement) {
  if (!safariJourney) return;

  targetElement.innerHTML = `
    <div class="safari-journey-container">
      <div class="safari-journey-header">
        <h3 class="journey-title">${safariJourney.title}</h3>
        <p class="journey-subtitle">${safariJourney.subtitle}</p>
      </div>
      
      <div class="journey-stats-grid">
        ${safariJourney.stats
          .map(
            (stat) => `
          <div class="journey-stat-card">
            <div class="stat-icon">${stat.icon}</div>
            <div class="stat-content">
              <div class="stat-value">${stat.value}</div>
              <div class="stat-label">${stat.label}</div>
              <div class="stat-description">${stat.description}</div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
      
      <div class="journey-achievements">
        <h4 class="achievements-title">Achievements Unlocked</h4>
        <div class="achievements-grid">
          ${safariJourney.achievements
            .map(
              (achievement) => `
            <div class="achievement-item ${
              achievement.unlocked ? "unlocked" : "locked"
            }">
              <div class="achievement-status">
                ${achievement.unlocked ? "🏆" : "🔒"}
              </div>
              <div class="achievement-content">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${
                  achievement.description
                }</div>
                <div class="achievement-progress">${achievement.progress}</div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <div class="next-milestone">
        <h4 class="milestone-title">${safariJourney.next_milestone.title}</h4>
        <p class="milestone-description">${
          safariJourney.next_milestone.description
        }</p>
        <div class="milestone-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${
              safariJourney.next_milestone.progress
            }"></div>
          </div>
          <div class="progress-text">
            ${safariJourney.next_milestone.progress} Complete • ${
    safariJourney.next_milestone.levels_remaining
  } levels remaining
          </div>
        </div>
      </div>
    </div>
  `;
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
        <div class="enhancement-card">
            <div class="enhancement-icon">${enhancement.icon}</div>
            <h3 class="enhancement-title">${enhancement.title}</h3>
            <p class="enhancement-description">${enhancement.description}</p>
            <div class="enhancement-version">Version: ${enhancement.version}</div>
        </div>
    `
    )
    .join("");
}

function renderDiaries(diaries, targetElement) {
  targetElement.innerHTML = diaries
    .map(
      (diary) => `
        <div class="diary-card">
            <div class="diary-icon">${diary.icon}</div>
            <h3 class="diary-title">${diary.title}</h3>
            <p class="diary-story">${diary.story}</p>
            <div class="diary-player">Player: ${diary.player}</div>
        </div>
    `
    )
    .join("");
}

function renderContact(contact, targetElement) {
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
        <div class="contact-item">
            <div class="contact-icon">🕒</div>
            <div>
                <strong>Business Hours:</strong> ${contact.hours}
            </div>
        </div>
        <div class="contact-item">
            <div class="contact-icon">🆘</div>
            <div>
                <strong>Support:</strong> <a href="mailto:${contact.support}" class="safari-link">${contact.support}</a>
            </div>
        </div>
    `;
}

// Show error message when JSON loading fails
function showErrorContent(targetElementId) {
  const targetElement = document.getElementById(targetElementId);
  if (!targetElement) return;

  targetElement.innerHTML =
    '<p class="error-message">❌ Content loading failed. Please refresh the page.</p>';
}

// Load all content for the current page
async function loadPageContent() {
  const currentPage = getCurrentPage();

  // Load templates first
  await loadTemplates();

  // Load page-specific content
  switch (currentPage) {
    case "index":
      // Load unique content for each section from home-content.json
      try {
        const response = await fetch("data/home-content.json");
        const data = await response.json();

        // Render features section
        const featuresElement = document.getElementById("features-content");
        if (featuresElement) {
          renderFeatures(data.features, featuresElement);
        }

        // Render instructions section
        const instructionsElement = document.getElementById(
          "instructions-content"
        );
        if (instructionsElement) {
          renderInstructions(data.instructions, instructionsElement);
        }

        // Render testimonials section
        const testimonialsElement = document.getElementById(
          "adventurer-testimonials-content"
        );
        if (testimonialsElement) {
          renderTestimonials(data.testimonials, testimonialsElement);
        }

        // Render adventurer text content
        const adventurerTextElement = document.getElementById(
          "adventurer-text-content"
        );
        if (adventurerTextElement) {
          renderAdventurerText(data["adventurer-text"], adventurerTextElement);
        }

        // Render animals and boosters section
        const animalsBoostersElement = document.getElementById(
          "animals-boosters-content"
        );
        if (animalsBoostersElement) {
          renderAnimals(data.animals, animalsBoostersElement);
        }

        // Render safari journey section
        const safariJourneyElement = document.getElementById(
          "safari-journey-content"
        );
        if (safariJourneyElement) {
          renderSafariJourney(data["safari-journey"], safariJourneyElement);
        }
      } catch (error) {
        console.error("❌ Error loading home content:", error);
        showErrorContent("features-content");
        showErrorContent("instructions-content");
        showErrorContent("adventurer-text-content");
        showErrorContent("adventurer-testimonials-content");
        showErrorContent("animals-boosters-content");
        showErrorContent("safari-journey-content");
      }
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
