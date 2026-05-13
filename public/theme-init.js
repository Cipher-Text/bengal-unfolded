(() => {
  try {
    const saved = localStorage.getItem("theme");
    const theme = saved === "light" || saved === "dark" ? saved : "light";
    document.documentElement.dataset.theme = theme;
  } catch (_) {
    document.documentElement.dataset.theme = "light";
  }
})();
