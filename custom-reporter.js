export function generateModernReport(data) {
  const m = data.metrics || {};
  const duration = m.http_req_duration ? m.http_req_duration.values || {} : {};
  const failed = m.http_req_failed ? m.http_req_failed.values || {} : {};
  const reqs = m.http_reqs ? m.http_reqs.values || {} : {};
  const iterations = m.iterations ? m.iterations.values || {} : {};
  const vusMax = m.vus_max ? m.vus_max.values.value : (m.vus ? m.vus.values.max : 0);

  const p95 = duration['p(95)'] !== undefined ? duration['p(95)'].toFixed(2) : '-';
  const avg = duration.avg !== undefined ? duration.avg.toFixed(2) : '-';
  const min = duration.min !== undefined ? duration.min.toFixed(2) : '-';
  const max = duration.max !== undefined ? duration.max.toFixed(2) : '-';
  const med = duration.med !== undefined ? duration.med.toFixed(2) : '-';
  const p90 = duration['p(90)'] !== undefined ? duration['p(90)'].toFixed(2) : '-';

  const failRate = failed.rate !== undefined ? (failed.rate * 100).toFixed(2) : '0.00';
  const totalReqs = reqs.count || 0;
  const reqsPerSec = reqs.rate !== undefined ? reqs.rate.toFixed(1) : '0';
  const totalIters = iterations.count || 0;
  const itersPerSec = iterations.rate !== undefined ? iterations.rate.toFixed(1) : '0';

  const isFailed = (failed.rate > 0) || (duration['p(95)'] > 1500);
  const now = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

  // Checks extraction
  const checks = [];
  function extractChecks(group) {
    if (group.checks) {
      for (const [key, val] of Object.entries(group.checks)) {
        checks.push(val);
      }
    }
    if (group.groups) {
      for (const g of Object.values(group.groups)) {
        extractChecks(g);
      }
    }
  }
  if (data.root_group) {
    extractChecks(data.root_group);
  }

  let checksHtml = '';
  checks.forEach(c => {
    const isCheckPass = c.fails === 0;
    const badgeColor = isCheckPass ? 'background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe;' : 'background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca;';
    const icon = isCheckPass ? '✓' : '✗';
    checksHtml += `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; font-weight: 700; font-size: 13px; ${badgeColor}">${icon}</span>
          <span style="font-size: 14px; font-weight: 500; color: #1e293b;">${c.name}</span>
        </div>
        <span style="font-size: 13px; color: #64748b; font-weight: 500;">${c.passes} lulus / ${c.fails} gagal</span>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>k6 Performance Report</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, Helvetica, Arial, sans-serif;
      background: #f0f7ff;
      color: #0f172a;
      padding: 32px 16px;
      line-height: 1.5;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    .header-card {
      background: #ffffff;
      border: 1px solid #dbeafe;
      border-radius: 20px;
      padding: 28px 32px;
      box-shadow: 0 4px 20px -2px rgba(59, 130, 246, 0.08);
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .title-area h1 {
      font-size: 22px;
      font-weight: 700;
      color: #1e3a8a;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .title-area p {
      color: #64748b;
      font-size: 13px;
      margin-top: 4px;
    }
    .status-badge {
      padding: 8px 18px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.3px;
      background: ${isFailed ? '#fef2f2' : '#eff6ff'};
      color: ${isFailed ? '#dc2626' : '#2563eb'};
      border: 1px solid ${isFailed ? '#fecaca' : '#bfdbfe'};
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.08);
      border-color: #bfdbfe;
    }
    .stat-label {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      margin-bottom: 6px;
    }
    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #1e3a8a;
    }
    .stat-desc {
      font-size: 12px;
      color: #94a3b8;
      margin-top: 4px;
    }
    .content-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
    }
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #1e3a8a;
      margin-bottom: 16px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    th {
      text-align: left;
      padding: 10px 14px;
      background: #f8fafc;
      color: #475569;
      font-weight: 600;
      border-bottom: 1px solid #e2e8f0;
    }
    td {
      padding: 10px 14px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
    }
    tr:last-child td { border-bottom: none; }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      margin-top: 32px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-card">
      <div class="title-area">
        <h1>⚡ k6 Performance Report</h1>
        <p>Pengujian Otomatis &bull; Dieksekusi pada ${now}</p>
      </div>
      <div class="status-badge">
        ${isFailed ? 'FAILED (Threshold Crossed)' : 'PASSED (Semua SLA Terpenuhi)'}
      </div>
    </div>

    <div class="grid">
      <div class="stat-card">
        <div class="stat-label">Response Time p(95)</div>
        <div class="stat-value">${p95} <span style="font-size: 14px; font-weight: 500;">ms</span></div>
        <div class="stat-desc">Rata-rata: ${avg} ms</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total Transaksi</div>
        <div class="stat-value">${totalIters}</div>
        <div class="stat-desc">Throughput: ${itersPerSec} putaran/detik</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Tingkat Kegagalan</div>
        <div class="stat-value" style="color: ${failRate === '0.00' ? '#2563eb' : '#dc2626'};">${failRate}%</div>
        <div class="stat-desc">${totalReqs} total requests (${reqsPerSec}/s)</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Beban Pengujian</div>
        <div class="stat-value">${vusMax} <span style="font-size: 14px; font-weight: 500;">VUs</span></div>
        <div class="stat-desc">Virtual Users paralel</div>
      </div>
    </div>

    <div class="content-box">
      <div class="section-title">🔍 Validasi & Assertion (Checks)</div>
      ${checksHtml || '<p style="color: #94a3b8; font-size: 13px;">Tidak ada checks yang dikonfigurasi.</p>'}
    </div>

    <div class="content-box">
      <div class="section-title">⏱️ Detail Latensi Respons Server (ms)</div>
      <table>
        <thead>
          <tr>
            <th>Metrik</th>
            <th>Durasi (ms)</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>p(95)</strong></td>
            <td><strong>${p95} ms</strong></td>
            <td>95% user dilayani di bawah durasi ini</td>
          </tr>
          <tr>
            <td><strong>p(90)</strong></td>
            <td>${p90} ms</td>
            <td>90% user dilayani di bawah durasi ini</td>
          </tr>
          <tr>
            <td><strong>Median (p50)</strong></td>
            <td>${med} ms</td>
            <td>Titik tengah kecepatan respon</td>
          </tr>
          <tr>
            <td><strong>Rata-rata (Avg)</strong></td>
            <td>${avg} ms</td>
            <td>Durasi rata-rata seluruh request</td>
          </tr>
          <tr>
            <td><strong>Minimum (Min)</strong></td>
            <td>${min} ms</td>
            <td>Respons paling cepat yang tercatat</td>
          </tr>
          <tr>
            <td><strong>Maksimum (Max)</strong></td>
            <td>${max} ms</td>
            <td>Respons paling lambat yang tercatat</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer">
      Generated by k6 Automation Suite &bull; Clean Soft Blue Design
    </div>
  </div>
</body>
</html>`;
}
