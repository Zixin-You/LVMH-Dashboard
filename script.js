const regionData = {
  "France": {
    revenue2023: 6830,
    revenue2024: 7009,
    revenue2025: 6732,
    yoy2423: 2.6,
    yoy2524: -4.0,
    status: "Decline",
    badgeClass: "badge-orange",
    markerClass: "marker-orange",
    color: "#c98357",
    summary: "France declined in 2025 after growth in 2024, showing a softer overall demand, potentially influenced by fluctuations in tourism."
  },
  "Europe ex France": {
    revenue2023: 14145,
    revenue2024: 14538,
    revenue2025: 14530,
    yoy2423: 2.8,
    yoy2524: -0.1,
    status: "Stable",
    badgeClass: "badge-gold",
    color: "#b89c73",
    summary: "Europe stayed relatively stable, making it one of the more resilient regions in 2025."
  },
  "United States": {
    revenue2023: 21764,
    revenue2024: 21554,
    revenue2025: 20686,
    yoy2423: -1.0,
    yoy2524: -4.0,
    status: "Decline",
    badgeClass: "badge-orange",
    color: "#c98357",
    summary: "The United States declined in 2025, showing weaker momentum in a key luxury market."
  },
  "Japan": {
    revenue2023: 6314,
    revenue2024: 7475,
    revenue2025: 6378,
    yoy2423: 18.4,
    yoy2524: -14.7,
    status: "Strong decline",
    badgeClass: "badge-red",
    color: "#b65b54",
    summary: "Japan had the sharpest decline after a strong 2024 rebound, showing how quickly tourism-driven momentum can reverse."
  },
  "Asia ex Japan": {
    revenue2023: 26577,
    revenue2024: 23246,
    revenue2025: 21389,
    yoy2423: -12.5,
    yoy2524: -8.0,
    status: "Major decline",
    badgeClass: "badge-red",
    color: "#b65b54",
    summary: "Asia ex Japan shows the clearest multi-year pressure and remains the strongest signal of regional volatility."
  },
  "Other countries": {
    revenue2023: 10523,
    revenue2024: 10861,
    revenue2025: 11091,
    yoy2423: 3.2,
    yoy2524: 2.1,
    status: "Growth",
    badgeClass: "badge-green",
    color: "#6f9979",
    summary: "Other countries were the only region with positive growth in 2025, showing more resilient demand."
  }
};

const categoryData = {
  organic: {
    title: "2025 organic growth by business group",
    insight: "Selective Retailing and Watches & Jewelry remained positive, while Wines & Spirits and Fashion & Leather Goods were under pressure.",
    formatter: (value) => `${value > 0 ? "+" : ""}${value}%`,
    scaleMax: 8,
    values: [
      { label: "Wines & Spirits", value: -5 },
      { label: "Fashion & Leather Goods", value: -5 },
      { label: "Perfumes & Cosmetics", value: 0 },
      { label: "Watches & Jewelry", value: 3 },
      { label: "Selective Retailing", value: 4 }
    ]
  },
  revenue: {
    title: "2025 revenue by business group",
    insight: "Fashion & Leather Goods remains the largest revenue engine, followed by Selective Retailing.",
    formatter: (value) => `€${value.toLocaleString()}m`,
    scaleMax: 40000,
    values: [
      { label: "Wines & Spirits", value: 5358 },
      { label: "Fashion & Leather Goods", value: 37770 },
      { label: "Perfumes & Cosmetics", value: 8174 },
      { label: "Watches & Jewelry", value: 10486 },
      { label: "Selective Retailing", value: 18348 }
    ]
  },
  profit: {
    title: "2025 recurring profit by business group",
    insight: "Profitability remains highly concentrated in Fashion & Leather Goods, even though Selective Retailing improved strongly.",
    formatter: (value) => `€${value.toLocaleString()}m`,
    scaleMax: 14000,
    values: [
      { label: "Wines & Spirits", value: 1016 },
      { label: "Fashion & Leather Goods", value: 13209 },
      { label: "Perfumes & Cosmetics", value: 727 },
      { label: "Watches & Jewelry", value: 1514 },
      { label: "Selective Retailing", value: 1780 }
    ]
  }
};

const donutData = [
  { label: "Wines & Spirits", value: 5358, color: "#8f6c44" },
  { label: "Fashion & Leather Goods", value: 37770, color: "#cfa86c" },
  { label: "Perfumes & Cosmetics", value: 8174, color: "#d9bf97" },
  { label: "Watches & Jewelry", value: 10486, color: "#6f9979" },
  { label: "Selective Retailing", value: 18348, color: "#9a7d5d" }
];

function formatBillions(v) { return `€${(v / 1000).toFixed(1)}B`; }
function formatPct(v) { return `${v > 0 ? "+" : ""}${v.toFixed(1)}%`; }
function pctClass(v) { return v > 0 ? "pos" : v < 0 ? "neg" : "neutral"; }
function markerTone(v) { return v <= -10 ? '#b65b54' : v < -2 ? '#c98357' : v <= 2 ? '#b89c73' : '#6f9979'; }

function populateMapMetrics() {
  Object.entries(regionData).forEach(([region, data]) => {
    const el = document.getElementById(`mapMetric-${region}`);
    if (el) el.textContent = formatPct(data.yoy2524);
  });

  document.querySelectorAll('.map-marker').forEach(btn => {
    const region = btn.dataset.region;
    btn.querySelector('.marker-dot').style.background = markerTone(regionData[region].yoy2524);
  });
}

function renderRegionSummary(region) {
  const d = regionData[region];
  document.getElementById('regionSummary').innerHTML = `
    <div class="region-card card-inner">
      <h3>${region}</h3>
      <span class="badge ${d.badgeClass}">${d.status}</span>
      <div class="region-metrics">
        <div><span class="metric-label">2025 Revenue</span><div class="metric-value">${formatBillions(d.revenue2025)}</div></div>
        <div><span class="metric-label">2024 Revenue</span><div class="metric-value">${formatBillions(d.revenue2024)}</div></div>
        <div><span class="metric-label">2025 vs 2024</span><div class="metric-value ${pctClass(d.yoy2524)}">${formatPct(d.yoy2524)}</div></div>
      </div>
      <p>${d.summary}</p>
    </div>
    <div class="summary-note card-inner">
      <h4>Why this matters</h4>
      <p>Regional performance is uneven. This makes LVMH more exposed to market-specific volatility and supports a more balanced growth model combining tourism demand with stronger localization.</p>
    </div>
  `;

  document.querySelectorAll('.map-marker').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.region === region);
  });
}

function renderPerformanceTable() {
  const tbody = document.getElementById('performanceTableBody');
  tbody.innerHTML = Object.entries(regionData).map(([region, d]) => `
    <tr>
      <td>${region}</td>
      <td>${formatBillions(d.revenue2023)}</td>
      <td>${formatBillions(d.revenue2024)}</td>
      <td class="${pctClass(d.yoy2423)}">${formatPct(d.yoy2423)}</td>
      <td>${formatBillions(d.revenue2025)}</td>
      <td class="${pctClass(d.yoy2524)}">${formatPct(d.yoy2524)}</td>
    </tr>
  `).join('');
}

function barColor(metric, value) {
  if (metric === 'organic') return value < 0 ? '#c98357' : value > 0 ? '#6f9979' : '#b89c73';
  return '#cfa86c';
}

function renderBarChart(metric = 'organic') {
  const config = categoryData[metric];
  document.getElementById('categoryTitle').textContent = config.title;
  document.getElementById('categoryInsight').textContent = config.insight;

  const svg = document.getElementById('barChart');
  const w = 520, labelX = 12, barX = 195, valueX = 490, rowH = 46, top = 18, barW = 250, barH = 16;
  let markup = '';

  config.values.forEach((d, i) => {
    const y = top + i * rowH;
    const width = Math.max(4, Math.abs(d.value) / config.scaleMax * barW);
    markup += `
      <text x="${labelX}" y="${y + 12}" fill="#f6efe7" font-size="13" font-weight="600">${d.label}</text>
      <rect x="${barX}" y="${y}" width="${barW}" height="${barH}" rx="8" fill="rgba(255,255,255,0.06)"></rect>
      <rect x="${barX}" y="${y}" width="${width}" height="${barH}" rx="8" fill="${barColor(metric, d.value)}"></rect>
      <text x="${valueX}" y="${y + 12}" text-anchor="end" fill="#f6efe7" font-size="13" font-weight="700">${config.formatter(d.value)}</text>
    `;
  });

  svg.innerHTML = markup;
  document.querySelectorAll('.chip').forEach(chip => chip.classList.toggle('active', chip.dataset.metric === metric));
}

function buildCategoryFilter() {
  const filter = document.getElementById('categoryFilter');
  const labels = { organic: 'Organic growth', revenue: 'Revenue', profit: 'Recurring profit' };
  filter.innerHTML = Object.keys(categoryData).map(key => `<button class="chip ${key === 'organic' ? 'active' : ''}" data-metric="${key}">${labels[key]}</button>`).join('');
  filter.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    renderBarChart(btn.dataset.metric);
  });
}

function polarToCartesian(cx, cy, r, angle) {
  const radians = (angle - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(radians), y: cy + r * Math.sin(radians) };
}
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return ["M", start.x, start.y, "A", r, r, 0, largeArcFlag, 0, end.x, end.y].join(" ");
}

function polarToCartesian(cx, cy, r, angle) {
  const radians = (angle - 90) * Math.PI / 180;
  return {
    x: cx + r * Math.cos(radians),
    y: cy + r * Math.sin(radians)
  };
}

function describeDonutArc(cx, cy, rOuter, rInner, startAngle, endAngle) {
  const startOuter = polarToCartesian(cx, cy, rOuter, endAngle);
  const endOuter = polarToCartesian(cx, cy, rOuter, startAngle);
  const startInner = polarToCartesian(cx, cy, rInner, endAngle);
  const endInner = polarToCartesian(cx, cy, rInner, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 0 ${endOuter.x} ${endOuter.y}`,
    `L ${endInner.x} ${endInner.y}`,
    `A ${rInner} ${rInner} 0 ${largeArcFlag} 1 ${startInner.x} ${startInner.y}`,
    "Z"
  ].join(" ");
}

function renderDonut() {
  const total = donutData.reduce((sum, d) => sum + d.value, 0);
  const svg = document.getElementById('donutChart');
  const legend = document.getElementById('donutLegend');

  const centerLabel = document.getElementById('donutCenterLabel');
  const centerValue = document.getElementById('donutCenterValue');
  const centerSub = document.getElementById('donutCenterSub');
  const subtitle = document.getElementById('portfolioSubtitle');

  if (!svg || !legend) return;

  svg.innerHTML = '';
  legend.innerHTML = '';

  let currentAngle = 0;

  donutData.forEach((d, index) => {
    const angle = (d.value / total) * 360;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      describeDonutArc(160, 160, 94, 60, currentAngle, currentAngle + angle)
    );
    path.setAttribute("fill", d.color);
    path.setAttribute("class", "donut-slice");
    path.dataset.index = index;

    svg.appendChild(path);

    const legendItem = document.createElement("div");
    legendItem.className = "legend-item";
    legendItem.dataset.index = index;
    legendItem.innerHTML = `
      <span class="legend-color" style="background:${d.color}"></span>
      <span>${d.label} · ${((d.value / total) * 100).toFixed(1)}%</span>
    `;
    legend.appendChild(legendItem);

    currentAngle += angle;
  });

  function setActiveSlice(index) {
    const item = donutData[index];
    const pct = ((item.value / total) * 100).toFixed(1);

    document.querySelectorAll('#donutChart .donut-slice').forEach((slice, i) => {
      slice.classList.toggle('active', i === index);
      slice.classList.toggle('dimmed', i !== index);
    });

    document.querySelectorAll('#donutLegend .legend-item').forEach((entry, i) => {
      entry.classList.toggle('active', i === index);
    });

    if (centerLabel) centerLabel.textContent = item.label;
    if (centerValue) centerValue.textContent = formatBillions(item.value);
    if (centerSub) centerSub.textContent = `${pct}% of total revenue`;
    if (subtitle) subtitle.textContent = `${item.label} accounts for ${pct}% of total revenue in 2025.`;
  }

  document.querySelectorAll('#donutChart .donut-slice').forEach((slice) => {
    slice.addEventListener('click', () => {
      setActiveSlice(Number(slice.dataset.index));
    });
  });

  document.querySelectorAll('#donutLegend .legend-item').forEach((item) => {
    item.addEventListener('click', () => {
      setActiveSlice(Number(item.dataset.index));
    });
  });

  // default selection: Fashion & Leather Goods
  setActiveSlice(1);
}

function initMap() {
  document.querySelectorAll('.map-marker').forEach(btn => {
    btn.addEventListener('click', () => renderRegionSummary(btn.dataset.region));
  });
}

function staggerReveal() {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.animationDelay = `${i * 70}ms`;
  });
}

populateMapMetrics();
renderRegionSummary('Asia ex Japan');
renderPerformanceTable();
buildCategoryFilter();
renderBarChart('organic');
renderDonut();
initMap();
staggerReveal();
