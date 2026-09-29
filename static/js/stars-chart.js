/* Hover layer for the data-efficiency chart: draws the markers and shows a
   tooltip with the exact mean and standard deviation from Table 1. */
(function () {
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var X = [64, 191.2, 318.4, 445.6, 572.8, 700];
  var FRACTIONS = ['1%', '5%', '10%', '25%', '50%', '100%'];

  var SERIES = [
    { name: 'MLP',         slot: 4, y: [331.92, 328.04, 324.17, 316.42, 330.62, 333.21],
      mu: [0.294, 0.297, 0.300, 0.306, 0.295, 0.293],
      sd: ['0.00', '0.01', '0.01', '0.02', '0.01', '0.00'] },
    { name: 'Autoencoder', slot: 3, y: [313.83, 312.54, 315.12, 311.25, 312.54, 282.83],
      mu: [0.308, 0.309, 0.307, 0.310, 0.309, 0.332],
      sd: ['0.019', '0.018', '0.022', '0.018', '0.018', '0.008'] },
    { name: 'STARS-Ho',    slot: 2, y: [267.33, 154.96, 126.54, 107.17, 103.29, 98.13],
      mu: [0.344, 0.431, 0.453, 0.468, 0.471, 0.475],
      sd: ['0.05', '0.045', '0.035', '0.03', '0.024', '0.02'] },
    { name: 'STARS-He',    slot: 1, y: [244.08, 134.29, 104.58, 74.87, 64.54, 61.96],
      mu: [0.362, 0.447, 0.470, 0.493, 0.501, 0.503],
      sd: ['0.058', '0.051', '0.044', '0.032', '0.028', '0.022'] }
  ];

  var svg = document.getElementById('eff-chart');
  var layer = document.getElementById('eff-points');
  var tip = document.getElementById('eff-tooltip');
  if (!svg || !layer || !tip) return;

  function el(name, attrs) {
    var node = document.createElementNS(SVG_NS, name);
    Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    return node;
  }

  function show(series, i, cx, cy) {
    var rect = svg.getBoundingClientRect();
    var box = svg.viewBox.baseVal;
    var scale = rect.width / box.width;
    tip.innerHTML =
      '<span class="viz-tooltip-series">' + series.name + '</span><br>' +
      FRACTIONS[i] + ' labeled &middot; macro F<sub>1</sub> ' +
      series.mu[i].toFixed(3) + ' &plusmn; ' + series.sd[i];
    tip.hidden = false;
    var parent = tip.offsetParent.getBoundingClientRect();
    tip.style.left = (rect.left - parent.left + cx * scale) + 'px';
    tip.style.top = (rect.top - parent.top + cy * scale - 10) + 'px';
  }

  function hide() { tip.hidden = true; }

  SERIES.forEach(function (series) {
    var g = el('g', { style: '--c: var(--series-' + series.slot + ')' });
    series.y.forEach(function (cy, i) {
      var cx = X[i];
      g.appendChild(el('circle', { class: 'viz-point', cx: cx, cy: cy, r: 4 }));
      var hit = el('circle', { class: 'viz-hit', cx: cx, cy: cy, r: 14, tabindex: '0',
        role: 'img',
        'aria-label': series.name + ', ' + FRACTIONS[i] + ' labeled data, macro F1 ' +
          series.mu[i].toFixed(3) + ' plus or minus ' + series.sd[i] });
      hit.addEventListener('mouseenter', function () { show(series, i, cx, cy); });
      hit.addEventListener('focus', function () { show(series, i, cx, cy); });
      hit.addEventListener('mouseleave', hide);
      hit.addEventListener('blur', hide);
      g.appendChild(hit);
    });
    layer.appendChild(g);
  });

  svg.addEventListener('mouseleave', hide);
  window.addEventListener('scroll', hide, { passive: true });
})();
