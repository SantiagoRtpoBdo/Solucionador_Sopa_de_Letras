const $ = (id) => document.getElementById(id);
let currentMatrix = [];
let foundPositions = new Set();

window.addEventListener("DOMContentLoaded", () => {
  // Try to use global lucide (CDN) or dynamic import as fallback
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  } else {
    import("lucide")
      .then((m) => {
        if (m && typeof m.createIcons === "function") m.createIcons();
      })
      .catch(() => {
        // If lucide failed to load, apply inline SVG fallbacks
        applyFallbackIcons();
      });
  }
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

$("wordSearchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const matrixText = $("matrix").value.trim();
  const wordsText = $("words").value.trim();

  if (!matrixText || !wordsText) {
    showAlert("Por favor complete ambos campos", "error");
    return;
  }

  try {
    const matrix = matrixText.split("\n").map((r) =>
      r
        .split(",")
        .map((c) => c.trim().toUpperCase())
        .filter(Boolean),
    );
    if (!matrix.every((row) => row.length === matrix[0].length)) {
      throw new Error("La matriz debe tener todas las filas del mismo tamaño.");
    }

    currentMatrix = matrix;
    const words = wordsText
      .split("\n")
      .map((w) => w.trim().toUpperCase())
      .filter(Boolean);
    foundPositions.clear();

    const results = words.reduce(
      (acc, word) => {
        (searchInMatrix(matrix, word) ? acc.found : acc.notFound).push(word);
        return acc;
      },
      { found: [], notFound: [] },
    );

    displayResults(results);
    displayMatrix();
    $("resultsContainer").classList.remove("hidden");

    setTimeout(() => {
      $("resultsContainer").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  } catch (err) {
    showAlert(err.message || "Error en el formato de datos", "error");
  }
});

$("clearBtn").addEventListener("click", function () {
  $("matrix").value = "";
  $("words").value = "";
  $("resultsContainer").classList.add("hidden");
  currentMatrix = [];
  foundPositions.clear();

  window.scrollTo({ top: 0, behavior: "smooth" });
});

function searchInMatrix(matrix, word) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (let [dr, dc] of directions) {
        if (checkWord(matrix, word, row, col, dr, dc)) {
          for (let i = 0; i < word.length; i++) {
            foundPositions.add(`${row + i * dr}-${col + i * dc}`);
          }
          return true;
        }
      }
    }
  }
  return false;
}

function checkWord(matrix, word, row, col, dr, dc) {
  for (let i = 0; i < word.length; i++) {
    const r = row + i * dr;
    const c = col + i * dc;
    if (
      r < 0 ||
      r >= matrix.length ||
      c < 0 ||
      c >= matrix[0].length ||
      matrix[r][c] !== word[i]
    ) {
      return false;
    }
  }
  return true;
}

function displayResults({ found, notFound }) {
  renderWordBadges("foundList", found, "found");
  renderWordBadges("notFoundList", notFound, "not-found");
  $("foundCount").textContent = found.length;
  $("notFoundCount").textContent = notFound.length;
}

function renderWordBadges(containerId, items, type) {
  const container = $(containerId);
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = '<span class="text-gray-400 text-sm">Ninguna</span>';
    return;
  }

  items.forEach((text) => {
    const badge = document.createElement("span");
    badge.className = `word-badge ${type}`;
    badge.textContent = text;
    container.appendChild(badge);
  });
}

function displayMatrix() {
  const matrixGrid = $("matrixGrid");
  matrixGrid.innerHTML = "";

  const rows = currentMatrix.length;
  const cols = currentMatrix[0].length;

  matrixGrid.style.display = "grid";
  matrixGrid.style.gridTemplateColumns = `repeat(${cols}, 1.75rem)`;
  matrixGrid.style.gridAutoRows = "1.75rem";
  matrixGrid.style.gap = "2px";

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement("div");
      cell.className = "matrix-cell";
      cell.textContent = currentMatrix[row][col] || "?";
      if (foundPositions.has(`${row}-${col}`)) {
        cell.classList.add("found");
      }
      matrixGrid.appendChild(cell);
    }
  }
}

function showAlert(message, type = "info") {
  alert(message);
}

// --- Icon fallbacks -------------------------------------------------
function applyFallbackIcons() {
  const nodes = Array.from(document.querySelectorAll("i[data-lucide]"));
  nodes.forEach((node) => {
    const name = node.getAttribute("data-lucide");
    const cls = node.getAttribute("class") || "";
    const svg = getFallbackSVG(name);
    if (svg) {
      const wrapper = document.createElement("span");
      wrapper.className = cls;
      wrapper.innerHTML = svg;
      node.replaceWith(wrapper);
    }
  });
}

function getFallbackSVG(name) {
  const common =
    'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  switch (name) {
    case "search":
      return `<svg viewBox="0 0 24 24" ${common}><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
    case "trash-2":
      return `<svg viewBox="0 0 24 24" ${common}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>`;
    case "info":
      return `<svg viewBox="0 0 24 24" ${common}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    case "grid-3x3":
    case "grid-2x2":
      return `<svg viewBox="0 0 24 24" ${common}><rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/></svg>`;
    case "list":
      return `<svg viewBox="0 0 24 24" ${common}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3.5" cy="6" r="1.5"/><circle cx="3.5" cy="12" r="1.5"/><circle cx="3.5" cy="18" r="1.5"/></svg>`;
    case "bar-chart-3":
      return `<svg viewBox="0 0 24 24" ${common}><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`;
    case "check-circle":
    case "check-circle-2":
      return `<svg viewBox="0 0 24 24" ${common}><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>`;
    case "x-circle":
      return `<svg viewBox="0 0 24 24" ${common}><circle cx="12" cy="12" r="9"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    default:
      return null;
  }
}
