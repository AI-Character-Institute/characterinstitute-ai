// Progressive enhancement only. The site reads fully without this file.
// Shows the text in data-tip beside a chart mark on hover, focus or tap.
(function () {
  var tip = document.getElementById("tip");
  if (!tip) return;
  function show(el) {
    tip.textContent = el.getAttribute("data-tip");
    tip.hidden = false;
    var r = el.getBoundingClientRect();
    var w = tip.offsetWidth;
    var x = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), window.innerWidth - w - 8);
    var above = r.top - tip.offsetHeight - 10;
    tip.style.left = x + window.scrollX + "px";
    tip.style.top = (above < 8 ? r.bottom + 10 : above) + window.scrollY + "px";
  }
  function hide() {
    tip.hidden = true;
  }
  function target(e) {
    return e.target && e.target.closest ? e.target.closest("[data-tip]") : null;
  }
  document.addEventListener("mouseover", function (e) { var el = target(e); if (el) show(el); else hide(); });
  document.addEventListener("focusin", function (e) { var el = target(e); if (el) show(el); else hide(); });
  document.addEventListener("click", function (e) { var el = target(e); if (el) show(el); else hide(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") hide(); });
  window.addEventListener("scroll", hide, { passive: true });
})();
