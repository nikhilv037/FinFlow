// ===================================================
// FINANCING DASHBOARD – CHART.JS CHARTS
// ===================================================

const CHART_COLORS = {
  primary:  '#2563EB',
  success:  '#10B981',
  warning:  '#F59E0B',
  danger:   '#EF4444',
  secondary:'#7C3AED',
  accent:   '#0EA5E9',
  muted:    '#94A3B8',
  border:   '#E2E8F0',
  bg:       '#F1F5F9',
};

const chartDefaults = () => {
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.color = '#94A3B8';
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.pointStyle = 'circle';
  Chart.defaults.plugins.legend.labels.padding = 16;
  Chart.defaults.plugins.tooltip.backgroundColor = '#0F172A';
  Chart.defaults.plugins.tooltip.titleColor = '#fff';
  Chart.defaults.plugins.tooltip.bodyColor = '#94A3B8';
  Chart.defaults.plugins.tooltip.padding = 12;
  Chart.defaults.plugins.tooltip.cornerRadius = 10;
  Chart.defaults.plugins.tooltip.displayColors = true;
  Chart.defaults.plugins.tooltip.boxPadding = 4;
};

// ── 1. Approval Rate Trend (Line) ─────────────────
function initApprovalTrendChart() {
  const ctx = document.getElementById('approvalTrendChart');
  if (!ctx) return;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const approvalData = [62, 65, 70, 68, 74, 78, 75, 80, 82, 79, 85, 88];
  const rejectionData = [38, 35, 30, 32, 26, 22, 25, 20, 18, 21, 15, 12];

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Approval Rate',
          data: approvalData,
          borderColor: CHART_COLORS.primary,
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, 'rgba(37,99,235,0.2)');
            gradient.addColorStop(1, 'rgba(37,99,235,0)');
            return gradient;
          },
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: CHART_COLORS.primary,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
        {
          label: 'Rejection Rate',
          data: rejectionData,
          borderColor: CHART_COLORS.danger,
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, 'rgba(239,68,68,0.1)');
            gradient.addColorStop(1, 'rgba(239,68,68,0)');
            return gradient;
          },
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: CHART_COLORS.danger,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', align: 'end' },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}%`
          }
        }
      },
      scales: {
        x: {
          grid: { color: CHART_COLORS.border, drawBorder: false },
          ticks: { font: { size: 11 } }
        },
        y: {
          min: 0, max: 100,
          grid: { color: CHART_COLORS.border, drawBorder: false },
          ticks: {
            font: { size: 11 },
            callback: v => v + '%'
          }
        }
      }
    }
  });
}

// ── 2. Monthly Financing Volume (Bar) ─────────────
function initFinancingVolumeChart() {
  const ctx = document.getElementById('financingVolumeChart');
  if (!ctx) return;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const disbursed = [1.2, 1.5, 1.8, 1.3, 2.1, 2.4, 2.0, 2.8, 3.1, 2.9, 3.4, 3.8];
  const collected = [0.9, 1.1, 1.4, 1.0, 1.6, 1.9, 1.7, 2.2, 2.6, 2.4, 2.9, 3.2];

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Disbursed ($M)',
          data: disbursed,
          backgroundColor: CHART_COLORS.primary,
          borderRadius: 6,
          borderSkipped: false,
          barPercentage: 0.6,
          categoryPercentage: 0.7,
        },
        {
          label: 'Collected ($M)',
          data: collected,
          backgroundColor: CHART_COLORS.success,
          borderRadius: 6,
          borderSkipped: false,
          barPercentage: 0.6,
          categoryPercentage: 0.7,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', align: 'end' },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: $${ctx.raw}M`
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: {
          grid: { color: CHART_COLORS.border, drawBorder: false },
          ticks: {
            font: { size: 11 },
            callback: v => '$' + v + 'M'
          }
        }
      }
    }
  });
}

// ── 3. Application Funnel (Doughnut) ──────────────
function initFunnelChart() {
  const ctx = document.getElementById('funnelDonutChart');
  if (!ctx) return;

  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Approved', 'Pending', 'Under Review', 'Rejected'],
      datasets: [{
        data: [58, 22, 11, 9],
        backgroundColor: [
          CHART_COLORS.success,
          CHART_COLORS.warning,
          CHART_COLORS.accent,
          CHART_COLORS.danger
        ],
        borderWidth: 3,
        borderColor: '#fff',
        hoverBorderWidth: 4,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: { position: 'bottom', align: 'center' },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.raw}%`
          }
        }
      }
    },
    plugins: [{
      id: 'centerText',
      afterDraw(chart) {
        const { ctx: c, chartArea: { width, height, left, top } } = chart;
        c.save();
        c.font = 'bold 28px Inter';
        c.fillStyle = '#0F172A';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText('58%', left + width / 2, top + height / 2 - 10);
        c.font = '12px Inter';
        c.fillStyle = '#94A3B8';
        c.fillText('Approval Rate', left + width / 2, top + height / 2 + 16);
        c.restore();
      }
    }]
  });
}

// ── 4. Payment Collection Trend (Area) ────────────
function initPaymentCollectionChart() {
  const ctx = document.getElementById('paymentCollectionChart');
  if (!ctx) return;

  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];
  const onTime  = [85, 88, 82, 90, 87, 92, 89, 94, 91, 96, 93, 97];
  const overdue = [15, 12, 18, 10, 13,  8, 11,  6,  9,  4,  7,  3];

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: weeks,
      datasets: [
        {
          label: 'On-Time',
          data: onTime,
          borderColor: CHART_COLORS.success,
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 180);
            gradient.addColorStop(0, 'rgba(16,185,129,0.25)');
            gradient.addColorStop(1, 'rgba(16,185,129,0)');
            return gradient;
          },
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          pointHoverRadius: 5,
        },
        {
          label: 'Overdue',
          data: overdue,
          borderColor: CHART_COLORS.danger,
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 180);
            gradient.addColorStop(0, 'rgba(239,68,68,0.15)');
            gradient.addColorStop(1, 'rgba(239,68,68,0)');
            return gradient;
          },
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          pointHoverRadius: 5,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', align: 'end' },
        tooltip: {
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}%` }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: {
          min: 0, max: 100,
          grid: { color: CHART_COLORS.border, drawBorder: false },
          ticks: { font: { size: 11 }, callback: v => v + '%' }
        }
      }
    }
  });
}

// ── Init All Charts ────────────────────────────────
function initCharts() {
  chartDefaults();
  window._charts = {
    approval:    initApprovalTrendChart(),
    volume:      initFinancingVolumeChart(),
    funnel:      initFunnelChart(),
    collection:  initPaymentCollectionChart(),
  };
}

// initCharts is now globally available
