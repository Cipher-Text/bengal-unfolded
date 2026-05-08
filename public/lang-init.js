(() => {
  try {
    const seg = location.pathname.split("/")[1];
    if (seg === "bn") document.documentElement.lang = "bn";
  } catch (_) {
    // no-op
  }
})();
