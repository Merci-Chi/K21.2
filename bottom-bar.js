const bottomBarStyles = `
  .nav {
    position: fixed;
    z-index: 30;
    left: 50%;
    right: auto;
    bottom: max(12px, env(safe-area-inset-bottom));
    width: min(calc(100vw - 36px), 394px);
    min-height: 76px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    gap: 5px;
    padding: 8px 10px;
    border-radius: 28px;
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.03)),
      rgba(18, 24, 36, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.09);
    box-shadow: 0 24px 58px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(26px);
    transform: translateX(-50%);
    pointer-events: auto;
  }

  .nav-item {
    min-width: 0;
    height: 58px;
    display: grid;
    justify-items: center;
    align-content: center;
    gap: 4px;
    color: rgba(255, 255, 255, 0.66);
    font-size: 12px;
    font-weight: 750;
    letter-spacing: 0;
  }

  .nav-item svg {
    width: 27px;
    height: 27px;
    stroke-width: 2.25;
  }

  .nav-item.active {
    color: var(--blue);
  }

  .add {
    position: relative;
    z-index: 4;
    width: 62px;
    height: 62px;
    margin: -22px auto 0;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background:
      radial-gradient(circle at 32% 22%, rgba(255, 255, 255, 0.52), transparent 27%),
      linear-gradient(140deg, #48a7ff 0%, #7d7aff 48%, #aa62ff 100%);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.32);
    color: white;
    transition: transform 140ms ease, box-shadow 140ms ease, filter 140ms ease;
  }

  .add:active,
  .add.is-open {
    transform: translateY(2px) scale(0.92);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.28);
    filter: saturate(1.12);
  }

  .add svg {
    width: 32px;
    height: 32px;
    stroke-width: 2.4;
    transition: transform 180ms ease;
  }

  .add.is-open svg {
    transform: rotate(45deg);
  }

  .quick-add-menu {
    position: absolute;
    z-index: 31;
    left: 50%;
    bottom: 84px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
    width: min(250px, calc(100% - 34px));
    padding: 9px;
    border-radius: 22px;
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.045)),
      rgba(14, 20, 32, 0.96);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 22px 48px rgba(0, 0, 0, 0.44), inset 0 1px 0 rgba(255, 255, 255, 0.09);
    backdrop-filter: blur(22px);
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, 12px) scale(0.95);
    transform-origin: 50% 100%;
    transition: opacity 170ms ease, transform 170ms ease;
  }

  .quick-add-menu.open {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, 0) scale(1);
  }

  .quick-add-option {
    min-height: 58px;
    display: grid;
    grid-template-columns: 30px 1fr;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 16px;
    color: var(--text);
    text-align: left;
    font-size: 13px;
    font-weight: 850;
    background: rgba(255, 255, 255, 0.06);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.09);
    transition: transform 120ms ease, background 120ms ease;
  }

  .quick-add-option:active {
    transform: scale(0.96);
    background: rgba(255, 255, 255, 0.1);
  }

  .quick-add-option svg {
    width: 25px;
    height: 25px;
    stroke-width: 2.35;
  }

  .quick-add-option.task {
    color: #5a8cff;
  }

  .quick-add-option.habit {
    color: #46d7c5;
  }
`;

const bottomBarStyleTag = document.createElement("style");
bottomBarStyleTag.dataset.bottomBar = "true";
bottomBarStyleTag.textContent = bottomBarStyles;
document.head.appendChild(bottomBarStyleTag);

document.querySelectorAll(".nav-item").forEach((item) => {
  const label = item.textContent.trim();
  const page = window.location.pathname.split("/").pop() || "index.html";
  item.classList.toggle("active",
    (label === "Home" && page === "index.html") ||
    ((label === "Habit" || label === "Habits") && page === "habits.html") ||
    (label === "Notes" && page === "notes.html")
  );

  item.addEventListener("click", () => {
    if (label === "Home") {
      window.location.href = "index.html";
      return;
    }
    if (label === "Habit" || label === "Habits") {
      window.location.href = "habits.html";
      return;
    }
    if (label === "Notes") {
      window.location.href = "notes.html";
      return;
    }
    document.querySelectorAll(".nav-item").forEach((navItem) => {
      navItem.classList.remove("active");
    });
    item.classList.add("active");
  });
});

const nav = document.querySelector(".nav");
const addButton = document.querySelector(".add");

if (!nav || !addButton) {
  console.warn("Bottom bar not loaded: .nav or .add is missing");
}

if (nav && addButton) {
  const quickAddMenu = document.createElement("div");
  quickAddMenu.className = "quick-add-menu";
  quickAddMenu.setAttribute("aria-hidden", "true");
  const page = window.location.pathname.split("/").pop() || "index.html";
  quickAddMenu.innerHTML = page === "notes.html" ? `
    <button class="quick-add-option task" type="button" data-add-kind="note-page">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 3h8l4 4v14H6V3Z" stroke="currentColor" stroke-linejoin="round" />
        <path d="M14 3v5h5M9 13h6M9 17h4" stroke="currentColor" stroke-linecap="round" />
      </svg>
      <span>Page</span>
    </button>
    <button class="quick-add-option habit" type="button" data-add-kind="note-card">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 6h16v12H4V6Z" stroke="currentColor" stroke-linejoin="round" />
        <path d="M8 10h8M8 14h5" stroke="currentColor" stroke-linecap="round" />
      </svg>
      <span>Card</span>
    </button>
  ` : `
    <button class="quick-add-option task" type="button" data-add-kind="task">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span>Task</span>
    </button>
    <button class="quick-add-option habit" type="button" data-add-kind="habit">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" />
        <path d="M8 12h8M12 8v8" stroke="currentColor" stroke-linecap="round" />
      </svg>
      <span>Habit</span>
    </button>
  `;
  nav.appendChild(quickAddMenu);

  const closeQuickAdd = () => {
    addButton.classList.remove("is-open");
    quickAddMenu.classList.remove("open");
    quickAddMenu.setAttribute("aria-hidden", "true");
  };

  addButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = quickAddMenu.classList.toggle("open");
    addButton.classList.toggle("is-open", isOpen);
    quickAddMenu.setAttribute("aria-hidden", String(!isOpen));
  });

  quickAddMenu.addEventListener("click", (event) => {
  event.stopPropagation();
    const option = event.target.closest("[data-add-kind]");
    if (!option) return;
    closeQuickAdd();
    if (option.dataset.addKind === "note-page" || option.dataset.addKind === "note-card") {
      window.dispatchEvent(new CustomEvent("openNotesComposer", { detail: { kind: option.dataset.addKind } }));
      return;
    }
    if (option.dataset.addKind === "task") {
      if (page === "index.html") {
        window.dispatchEvent(new CustomEvent("openTaskComposer"));
      } else {
        window.location.href = "index.html?add=task";
      }
      return;
    }
    if (page === "habits.html") {
      window.dispatchEvent(new CustomEvent("openHabitComposer"));
    } else {
      window.location.href = "habits.html?add=habit";
    }
  });

  document.addEventListener("click", closeQuickAdd);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeQuickAdd();
  });
}
