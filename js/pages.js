// pages.js – builds all sub-pages dynamically
document.addEventListener('DOMContentLoaded', function(){
  var main = document.querySelector('.main-content');
  if(!main) return;

  function kpi(color,icon,value,label){
    return '<div class="kpi-card '+color+'"><div class="kpi-card-header"><div class="kpi-icon '+color+'"><span class="material-symbols-outlined">'+icon+'</span></div></div><div class="kpi-value">'+value+'</div><div class="kpi-label">'+label+'</div></div>';
  }

  function tableRows(rows){
    return rows.map(function(r){
      return '<tr><td><strong>'+r[0]+'</strong></td><td>'+r[1]+'</td><td>'+r[2]+'</td><td><span class="badge badge-'+r[3]+'">'+r[3].charAt(0).toUpperCase()+r[3].slice(1)+'</span></td></tr>';
    }).join('');
  }

  function page(id, html){
    var d = document.createElement('div');
    d.className = 'page-content';
    d.id = 'page-'+id;
    d.style.display = 'none';
    d.innerHTML = html;
    main.appendChild(d);
  }

  // ── APPLICATIONS ──────────────────────────────
  page('applications',
    '<section style="width:100%">'+
    '<div class="section-header" style="margin-bottom:24px"><div><div class="section-title">All Applications</div><div class="section-subtitle">Manage financing applications</div></div>'+
    '<button class="btn btn-primary" onclick="showToast(\'New application form\',\'success\')"><span class="material-symbols-outlined">add</span> New Application</button></div>'+
    '<div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:24px">'+
      kpi('blue','description','1,284','Total')+kpi('green','check_circle','745','Approved')+kpi('amber','pending','217','Pending')+kpi('red','cancel','115','Rejected')+
    '</div>'+
    '<div class="card"><div class="table-toolbar"><div class="card-title">Applications List</div>'+
    '<div class="table-filters">'+
      '<button class="filter-chip active" data-filter="all">All</button>'+
      '<button class="filter-chip" data-filter="approved">Approved</button>'+
      '<button class="filter-chip" data-filter="pending">Pending</button>'+
      '<button class="filter-chip" data-filter="rejected">Rejected</button>'+
    '</div></div>'+
    '<div style="overflow-x:auto"><table class="data-table"><thead><tr><th scope="col">Applicant</th><th scope="col">Type</th><th scope="col">Amount</th><th scope="col">Credit Score</th><th scope="col">Status</th><th scope="col">Progress</th><th scope="col">Officer</th><th scope="col">Date</th><th scope="col">Actions</th></tr></thead><tbody id="pageApplicationsBody"></tbody></table></div></div></section>'
  );

  // ── PAYMENTS ─────────────────────────────────
  page('payments',
    '<section style="width:100%">'+
    '<div class="section-header" style="margin-bottom:24px"><div><div class="section-title">Payments</div><div class="section-subtitle">Track EMIs and collections</div></div></div>'+
    '<div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:24px">'+
      kpi('green','payments','$3.2M','Collected')+kpi('sky','schedule','$4.2M','Due This Month')+kpi('red','alarm','43','Overdue')+kpi('purple','trending_up','94.3%','Collection Rate')+
    '</div>'+
    '<div class="card"><div class="table-toolbar"><div class="card-title">Payment History</div></div>'+
    '<div style="overflow-x:auto"><table class="data-table"><thead><tr><th>Loan ID</th><th>Customer</th><th>EMI Amount</th><th>Status</th></tr></thead><tbody>'+
    tableRows([
      ['FIN-2401','Arjun Mehta','$1,250','approved'],
      ['FIN-2404','Neha Patel','$680','approved'],
      ['FIN-2402','Priya Sharma','$940','pending'],
      ['FIN-2405','Vikram Singh','$2,100','rejected'],
      ['FIN-2407','Suresh Kumar','$1,080','approved'],
      ['FIN-2408','Kavya Reddy','$720','pending'],
    ])+
    '</tbody></table></div></div></section>'
  );

  // ── CUSTOMERS ────────────────────────────────
  page('customers',
    '<section style="width:100%">'+
    '<div class="section-header" style="margin-bottom:24px"><div><div class="section-title">Customers</div><div class="section-subtitle">All registered borrowers</div></div>'+
    '<button class="btn btn-primary" onclick="showToast(\'Add customer\',\'success\')"><span class="material-symbols-outlined">person_add</span> Add Customer</button></div>'+
    '<div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:24px">'+
      kpi('blue','people','2,841','Total Customers')+kpi('green','verified_user','2,104','Verified')+kpi('amber','pending_actions','737','Pending KYC')+
    '</div>'+
    '<div class="card"><div class="table-toolbar"><div class="card-title">Customer List</div></div>'+
    '<div style="overflow-x:auto"><table class="data-table"><thead><tr><th>Name</th><th>Type</th><th>Location</th><th>Status</th></tr></thead><tbody>'+
    tableRows([
      ['Arjun Mehta','Business','Mumbai','approved'],
      ['Priya Sharma','Individual','Delhi','approved'],
      ['Rahul Verma','Business','Bangalore','pending'],
      ['Neha Patel','Individual','Pune','approved'],
      ['Vikram Singh','Business','Chennai','rejected'],
      ['Anita Joshi','Business','Hyderabad','review'],
    ])+
    '</tbody></table></div></div></section>'
  );

  // ── PORTFOLIO ─────────────────────────────────
  page('portfolio',
    '<section style="width:100%">'+
    '<div class="section-header" style="margin-bottom:24px"><div><div class="section-title">Loan Portfolio</div><div class="section-subtitle">Active financing portfolio overview</div></div></div>'+
    '<div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:24px">'+
      kpi('purple','account_balance_wallet','$4.2M','Total Portfolio')+kpi('green','trending_up','698','Active Loans')+kpi('sky','percent','8.4%','Avg Interest Rate')+
    '</div>'+
    '<div class="charts-row">'+
      '<div class="card"><div class="card-header"><div class="card-title">Portfolio by Type</div></div>'+
      '<div class="card-body"><div style="display:flex;flex-direction:column;gap:16px">'+
        ['Business Loan – $1.8M – 43%','Equipment Finance – $0.9M – 21%','Working Capital – $0.8M – 19%','Trade Finance – $0.7M – 17%'].map(function(s){
          var parts=s.split(' – ');
          return '<div><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:14px;font-weight:500">'+parts[0]+'</span><span style="font-size:13px;color:#64748b">'+parts[1]+'</span></div><div class="progress-track" style="height:8px"><div class="progress-fill" style="width:'+parts[2]+';background:var(--color-primary)"></div></div></div>';
        }).join('')+
      '</div></div></div>'+
      '<div class="card"><div class="card-header"><div class="card-title">Risk Distribution</div></div>'+
      '<div class="card-body"><div style="display:flex;flex-direction:column;gap:16px">'+
        ['Low Risk – 62%|var(--color-success)','Medium Risk – 28%|var(--color-warning)','High Risk – 10%|var(--color-danger)'].map(function(s){
          var p=s.split('|'); var parts=p[0].split(' – ');
          return '<div><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:14px;font-weight:500">'+parts[0]+'</span><span style="font-size:13px;color:#64748b">'+parts[1]+'</span></div><div class="progress-track" style="height:8px"><div class="progress-fill" style="width:'+parts[1]+';background:'+p[1]+'"></div></div></div>';
        }).join('')+
      '</div></div></div>'+
    '</div></section>'
  );

  // ── CREDIT RISK ───────────────────────────────
  page('risk',
    '<section style="width:100%">'+
    '<div class="section-header" style="margin-bottom:24px"><div><div class="section-title">Credit Risk</div><div class="section-subtitle">Risk assessment and scoring</div></div></div>'+
    '<div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:24px">'+
      kpi('green','shield','740','Avg Credit Score')+kpi('red','warning','43','High Risk Loans')+kpi('amber','analytics','2.1%','Default Rate')+kpi('blue','trending_down','1.8%','NPA Ratio')+
    '</div>'+
    '<div class="card"><div class="card-header"><div class="card-title">Risk Scorecard</div></div>'+
    '<div style="overflow-x:auto"><table class="data-table"><thead><tr><th>Applicant</th><th>Score</th><th>Risk Level</th><th>Decision</th></tr></thead><tbody>'+
    tableRows([
      ['Arjun Mehta','780','Low','approved'],
      ['Priya Sharma','720','Low','approved'],
      ['Rahul Verma','695','Medium','review'],
      ['Vikram Singh','640','High','rejected'],
      ['Neha Patel','810','Low','approved'],
      ['Kavya Reddy','662','High','pending'],
    ])+
    '</tbody></table></div></div></section>'
  );

  // ── REPORTS ───────────────────────────────────
  page('reports',
    '<section style="width:100%">'+
    '<div class="section-header" style="margin-bottom:24px"><div><div class="section-title">Reports</div><div class="section-subtitle">Download and schedule reports</div></div>'+
    '<button class="btn btn-primary" onclick="showToast(\'Generating report…\',\'success\')"><span class="material-symbols-outlined">download</span> Export All</button></div>'+
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px">'+
    [
      ['bar_chart','Approval Rate Report','Monthly approval trends and breakdowns','success'],
      ['payments','Payment Collection Report','EMI collection and overdue summary','info'],
      ['people','Customer Acquisition Report','New customer onboarding metrics','info'],
      ['account_balance_wallet','Portfolio Report','Active loans and disbursement data','success'],
      ['credit_score','Credit Risk Report','Risk distribution and NPA tracking','warning'],
      ['trending_up','Performance Report','Officer and branch performance KPIs','info'],
    ].map(function(r){
      return '<div class="card hover-lift" style="cursor:pointer" onclick="showToast(\'Opening '+r[1]+'\',\'info\')">'+
        '<div class="card-body" style="display:flex;flex-direction:column;gap:12px">'+
        '<div class="kpi-icon '+r[3]+'" style="width:44px;height:44px"><span class="material-symbols-outlined">'+r[0]+'</span></div>'+
        '<div style="font-weight:600;font-size:15px">'+r[1]+'</div>'+
        '<div style="font-size:13px;color:#64748b">'+r[2]+'</div>'+
        '<button class="btn btn-sm btn-outline" style="width:fit-content"><span class="material-symbols-outlined">download</span> Download</button>'+
        '</div></div>';
    }).join('')+
    '</div></section>'
  );

  // ── AI INSIGHTS ───────────────────────────────
  page('ai-insights',
    '<section style="width:100%">'+
    '<div class="section-header" style="margin-bottom:24px"><div><div class="section-title" style="display:flex;align-items:center;gap:8px"><span class="material-symbols-outlined" style="color:#7C3AED">smart_toy</span>AI Insights</div><div class="section-subtitle">Powered by FinFlow AI</div></div></div>'+
    '<div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:24px">'+
      kpi('purple','smart_toy','24','Insights Generated')+kpi('green','lightbulb','8','Actions Taken')+kpi('amber','schedule','6','Pending Review')+
    '</div>'+
    '<div class="card"><div class="card-header"><div class="card-title">All AI Recommendations</div></div>'+
    '<div class="card-body"><div class="ai-panel">'+
    [
      ['warning','warning','3 Applications Missing Documents','FIN-2403, FIN-2406, FIN-2408 require income proof.'],
      ['danger','alarm','7 Overdue EMIs This Week','$18,400 at risk. Proactive outreach recommended.'],
      ['success','trending_up','Approval Rate Up 12%','Credit scoring improvements reduced false rejections.'],
      ['info','smart_toy','Fast-Track 4 Applications','FIN-2401, 2404, 2407 suggest expedited review.'],
      ['warning','people','Customer Retention Alert','3 high-value customers showing early delinquency signals.'],
      ['success','insights','Disbursement Peak Predicted','Volume expected to rise 18% next quarter.'],
    ].map(function(i){
      return '<div class="ai-insight-item" tabindex="0" onclick="showToast(\'AI action initiated\',\'success\')" style="cursor:pointer">'+
        '<div class="ai-insight-icon '+i[0]+'"><span class="material-symbols-outlined">'+i[1]+'</span></div>'+
        '<div class="ai-insight-content">'+
        '<div class="ai-insight-title">'+i[2]+'</div>'+
        '<div class="ai-insight-desc">'+i[3]+'</div>'+
        '<span class="ai-insight-action">Take action <span class="material-symbols-outlined" style="font-size:12px">arrow_forward</span></span>'+
        '</div></div>';
    }).join('')+
    '</div></div></div></section>'
  );

  // ── COMPLIANCE ────────────────────────────────
  page('compliance',
    '<section style="width:100%">'+
    '<div class="section-header" style="margin-bottom:24px"><div><div class="section-title">Compliance</div><div class="section-subtitle">Regulatory and audit status</div></div></div>'+
    '<div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:24px">'+
      kpi('green','verified','18','Compliant Items')+kpi('amber','warning','4','Under Review')+kpi('red','gavel','2','Action Required')+
    '</div>'+
    '<div class="card"><div class="card-header"><div class="card-title">Compliance Checklist</div></div>'+
    '<div class="card-body"><div style="display:flex;flex-direction:column;gap:12px">'+
    [
      ['check_circle','green','KYC Verification','All active customers verified','Compliant'],
      ['check_circle','green','AML Screening','Automated daily screening active','Compliant'],
      ['check_circle','green','Data Privacy (GDPR)','All data handling policies in place','Compliant'],
      ['warning','amber','RBI Reporting','Q2 report pending submission','Due Jun 30'],
      ['warning','amber','Loan Documentation','4 files incomplete','Pending'],
      ['cancel','red','NPA Classification','2 accounts require reclassification','Action Required'],
    ].map(function(item){
      return '<div class="ai-insight-item" style="cursor:pointer" onclick="showToast(\'Viewing: '+item[2]+'\',\'info\')">'+
        '<div class="ai-insight-icon '+item[1]+'"><span class="material-symbols-outlined">'+item[0]+'</span></div>'+
        '<div class="ai-insight-content">'+
        '<div class="ai-insight-title">'+item[2]+'</div>'+
        '<div class="ai-insight-desc">'+item[3]+'</div>'+
        '</div><span class="badge badge-'+(item[1]==='green'?'approved':item[1]==='amber'?'pending':'rejected')+'">'+item[4]+'</span></div>';
    }).join('')+
    '</div></div></div></section>'
  );

  // ── SETTINGS ──────────────────────────────────
  page('settings',
    '<section style="width:100%">'+
    '<div class="section-header" style="margin-bottom:24px"><div><div class="section-title">Settings</div><div class="section-subtitle">Platform configuration</div></div></div>'+
    '<div class="charts-row">'+
      '<div class="card"><div class="card-header"><div class="card-title">Profile Settings</div></div>'+
      '<div class="card-body"><div style="display:flex;flex-direction:column;gap:20px">'+

      [['Full Name','Nikhil Patel','profile-full-name'],['Email','nikhil@finflow.io','profile-email'],['Role','Credit Manager','profile-role'],['Branch','Mumbai HQ','profile-branch']].map(function(f){
        return '<div><label style="font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.04em">'+f[0]+'</label>'+
          '<input id="'+f[2]+'" style="margin-top:6px;width:100%;padding:10px 14px;border:1px solid #E2E8F0;border-radius:10px;font-family:Inter,sans-serif;font-size:14px;outline:none" value="'+f[1]+'" onfocus="this.style.borderColor=\'#2563EB\'" onblur="this.style.borderColor=\'#E2E8F0\'" /></div>';
      }).join('')+
      '<button class="btn btn-primary" id="profileSaveBtn" style="width:fit-content">Save Changes</button>'+
      '</div></div></div>'+
      '<div style="display:flex;flex-direction:column;gap:20px">'+
      '<div class="card"><div class="card-header"><div class="card-title">Notifications</div></div>'+
      '<div class="card-body"><div style="display:flex;flex-direction:column;gap:16px">'+
      ['Email Alerts','SMS Notifications','Overdue Reminders','Weekly Reports'].map(function(n,i){
        return '<div style="display:flex;align-items:center;justify-content:space-between">'+
          '<span style="font-size:14px;font-weight:500">'+n+'</span>'+
          '<div onclick="this.classList.toggle(\'on\')" class="toggle-switch '+(i<2?'on':'')+'">'+
          '<div class="toggle-switch-dot"></div></div>'+
          '</div>';
      }).join('')+
      '</div></div></div>'+
      '<div class="card"><div class="card-header"><div class="card-title">Security</div></div>'+
      '<div class="card-body"><div style="display:flex;flex-direction:column;gap:12px">'+
      '<button class="btn btn-outline" onclick="showToast(\'Password reset email sent\',\'success\')"><span class="material-symbols-outlined">lock_reset</span> Change Password</button>'+
      '<button class="btn btn-outline" onclick="showToast(\'2FA enabled!\',\'success\')"><span class="material-symbols-outlined">security</span> Enable 2FA</button>'+
      '</div></div></div>'+
      '</div>'+
    '</div></section>'
  );

  // ── HELP ──────────────────────────────────────
  page('help',
    '<section style="width:100%">'+
    '<div class="section-header" style="margin-bottom:24px"><div><div class="section-title">Help &amp; Support</div><div class="section-subtitle">Documentation and assistance</div></div></div>'+
    '<div class="charts-row" style="margin-bottom:24px">'+
      '<div class="card" style="cursor:pointer" onclick="showToast(\'Opening documentation\',\'info\')"><div class="card-body" style="display:flex;align-items:center;gap:16px"><div class="kpi-icon blue" style="width:48px;height:48px"><span class="material-symbols-outlined">menu_book</span></div><div><div style="font-weight:600">Documentation</div><div style="font-size:13px;color:#64748b">Guides, API reference, tutorials</div></div></div></div>'+
      '<div class="card" style="cursor:pointer" onclick="showToast(\'Opening live chat\',\'success\')"><div class="card-body" style="display:flex;align-items:center;gap:16px"><div class="kpi-icon green" style="width:48px;height:48px"><span class="material-symbols-outlined">support_agent</span></div><div><div style="font-weight:600">Live Support</div><div style="font-size:13px;color:#64748b">Chat with our support team</div></div></div></div>'+
    '</div>'+
    '<div class="card"><div class="card-header"><div class="card-title">Frequently Asked Questions</div></div>'+
    '<div class="card-body"><div style="display:flex;flex-direction:column;gap:12px">'+
    [
      ['How do I approve a loan application?','Go to Applications → click any application → review details → click Approve or Reject.'],
      ['How is the credit score calculated?','FinFlow uses CIBIL scores combined with internal risk models to generate a composite score.'],
      ['How do I export reports?','Go to Reports → select the report type → click the Download button.'],
      ['How do I set up EMI auto-debit?','In the loan disbursement flow, enable auto-debit and enter the customer\'s bank account details.'],
      ['How do I add a new customer?','Go to Customers → click Add Customer → fill the KYC form and submit.'],
    ].map(function(q,i){
      return '<div style="border:1px solid #E2E8F0;border-radius:12px;overflow:hidden">'+
        '<div style="padding:14px 16px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-weight:500;font-size:14px" onclick="var b=this.nextElementSibling;b.style.display=b.style.display===\'block\'?\'none\':\'block\'">'+
        q[0]+'<span class="material-symbols-outlined" style="font-size:18px;color:#94A3B8">expand_more</span></div>'+
        '<div style="display:none;padding:0 16px 14px;font-size:13px;color:#64748b;line-height:1.6">'+q[1]+'</div></div>';
    }).join('')+
    '</div></div></div></section>'
  );

  // Wire filter chips on applications page
  var appsChips = document.querySelectorAll('[id="page-applications"] .filter-chip');
  // (chips wire-up handled in app.js via delegation)

})();
