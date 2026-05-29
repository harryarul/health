/* The Whole You — shared interactions (reveal on scroll + checklists) */
(function () {
  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Checklists: toggle .done and update any [data-count-for] counter
  document.querySelectorAll('[data-checklist]').forEach(function (list) {
    var counter = document.querySelector('[data-count-for="' + list.dataset.checklist + '"]');
    var total = list.querySelectorAll('.check').length;
    function update() {
      if (!counter) return;
      var done = list.querySelectorAll('.check.done').length;
      counter.textContent = done + ' of ' + total;
    }
    list.querySelectorAll('.check').forEach(function (c) {
      c.addEventListener('click', function () { c.classList.toggle('done'); update(); });
    });
    update();
  });
})();
