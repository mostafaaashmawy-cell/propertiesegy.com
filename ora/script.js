/**
 * PROPERTIESEGY — ORA DEVELOPERS LUXURY PORTFOLIO
 * High-Performance Interactive Engine & Lead Automation
 * Support Hotline / WhatsApp: +20 102 095 8859
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountrySelector();
  initLeadForm();
  initVisualGalleries();
  initWhatsAppTracking();
});

/**
 * Google Ads Outbound Click / WhatsApp & Lead Conversion Handler
 */
function gtag_report_conversion(url) {
  const callback = function () {
    if (typeof url !== 'undefined' && url) {
      window.location = url;
    }
  };

  if (typeof gtag === 'function') {
    gtag('event', 'conversion', {
      'send_to': 'AW-299139259/IttmCOi8ieIcELuB0o4B',
      'value': 1.0,
      'currency': 'EGP',
      'event_callback': callback
    });
  } else if (typeof url !== 'undefined' && url) {
    window.location = url;
  }
  return false;
}

// Global scope
window.gtag_report_conversion = gtag_report_conversion;

/* ==========================================================================
   Comprehensive International Country Codes with Flags
   ========================================================================== */
const countryCodes = [
  { name: 'Egypt', code: '+20', flag: '🇪🇬' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { name: 'Kuwait', code: '+965', flag: '🇰🇼' },
  { name: 'Qatar', code: '+974', flag: '🇶🇦' },
  { name: 'Oman', code: '+968', flag: '🇴🇲' },
  { name: 'Bahrain', code: '+973', flag: '🇧🇭' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { name: 'Jordan', code: '+962', flag: '🇯🇴' },
  { name: 'Lebanon', code: '+961', flag: '🇱🇧' },
  { name: 'Iraq', code: '+964', flag: '🇮🇶' },
  { name: 'Turkey', code: '+90', flag: '🇹🇷' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'Other Worldwide', code: '+', flag: '🌐' }
];

/* ==========================================================================
   Country Selector Dropdown Setup
   ========================================================================== */
function initCountrySelector() {
  const btn = document.getElementById('countrySelectBtn');
  const menu = document.getElementById('countryDropdownMenu');
  const searchInput = document.getElementById('countrySearchInput');
  const listContainer = document.getElementById('countryListContainer');
  const hiddenCodeInput = document.getElementById('selectedCountryCode');
  const flagDisplay = document.getElementById('selectedCountryFlag');
  const codeDisplay = document.getElementById('selectedCountryCodeText');

  if (!btn || !menu || !listContainer) return;

  function renderList(filter = '') {
    listContainer.innerHTML = '';
    const filtered = countryCodes.filter(c => 
      c.name.toLowerCase().includes(filter.toLowerCase()) || 
      c.code.includes(filter)
    );

    if (filtered.length === 0) {
      listContainer.innerHTML = `<div style="padding: 12px; font-size: 0.8rem; color: #94A3B8; text-align: center;">No country found</div>`;
      return;
    }

    filtered.forEach(item => {
      const option = document.createElement('div');
      option.className = `country-option ${item.code === hiddenCodeInput.value ? 'selected' : ''}`;
      option.innerHTML = `
        <div style="display:flex; align-items:center; gap: 8px;">
          <span>${item.flag}</span>
          <span>${item.name}</span>
        </div>
        <span style="color: #94A3B8; font-weight: 600;">${item.code}</span>
      `;
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        hiddenCodeInput.value = item.code;
        flagDisplay.textContent = item.flag;
        codeDisplay.textContent = item.code;
        menu.classList.remove('active');
        if (searchInput) searchInput.value = '';
        renderList('');
      });
      listContainer.appendChild(option);
    });
  }

  renderList('');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('active');
    if (menu.classList.contains('active') && searchInput) {
      searchInput.focus();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderList(e.target.value.trim());
    });
    searchInput.addEventListener('click', (e) => e.stopPropagation());
  }

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('active');
    }
  });
}

/* ==========================================================================
   Lead Capture Form Handling (Web3Forms API + Validation + Backup Archive)
   ========================================================================== */
function initLeadForm() {
  const form = document.getElementById('interestLeadForm');
  const submitBtn = document.getElementById('formSubmitBtn');
  const modalBackdrop = document.getElementById('leadSuccessModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullNameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNumber');
    const countryCodeInput = document.getElementById('selectedCountryCode');
    const consentInput = document.getElementById('consent-check');

    const fullName = fullNameInput ? fullNameInput.value.trim() : '';
    let rawPhone = phoneInput ? phoneInput.value.trim().replace(/[\s\-\(\)\.]/g, '') : '';
    const selectedCode = countryCodeInput ? countryCodeInput.value : '+20';

    if (!fullName || !rawPhone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    if (consentInput && !consentInput.checked) {
      alert('Please accept the consent terms to proceed.');
      return;
    }

    // Build international phone number
    let fullPhone = '';
    if (rawPhone.startsWith('00')) {
      rawPhone = '+' + rawPhone.slice(2);
    }

    if (rawPhone.startsWith('+')) {
      fullPhone = rawPhone;
    } else {
      let numberBody = rawPhone;
      if (selectedCode === '+20' && numberBody.startsWith('01')) {
        numberBody = numberBody.slice(1); // 01020958859 -> 1020958859
      } else if (numberBody.startsWith('0') && selectedCode !== '+') {
        numberBody = numberBody.slice(1);
      }
      const prefix = selectedCode === '+' ? '+' : selectedCode;
      fullPhone = prefix + numberBody;
    }

    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phoneRegex.test(fullPhone)) {
      alert('Please enter a valid international mobile number.');
      if (phoneInput) phoneInput.focus();
      return;
    }

    // UI Loading State
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      PROCESSING...
    `;

    const leadPayload = {
      fullName: fullName,
      phone: fullPhone,
      source: 'PropertiesEgy - ORA Portfolio Landing Page (/ora/)',
      timestamp: new Date().toISOString()
    };

    // Save backup to LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem('ora_inquiries') || '[]');
      existing.push(leadPayload);
      localStorage.setItem('ora_inquiries', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    // Submit to Web3Forms
    try {
      const formData = new FormData();
      formData.append('access_key', '88bb89c7-8fbc-4de2-bc5a-4cd05694b489');
      formData.append('subject', 'New ORA Lead - Solana East & ZED (PropertiesEgy)');
      formData.append('from_name', 'PropertiesEgy ORA Landing Page');
      formData.append('name', fullName);
      formData.append('phone', fullPhone);
      formData.append('project_inquired', 'ORA Developers Portfolio (Solana East, ZED East, ZED West)');
      formData.append('submission_url', window.location.href);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const resData = await response.json();

      if (resData.success) {
        // Trigger conversion tracking
        gtag_report_conversion();

        // Reset form
        form.reset();
        if (consentInput) consentInput.checked = true;
        if (countryCodeInput) countryCodeInput.value = '+20';
        const flagDisplay = document.getElementById('selectedCountryFlag');
        const codeDisplay = document.getElementById('selectedCountryCodeText');
        if (flagDisplay) flagDisplay.textContent = '🇪🇬';
        if (codeDisplay) codeDisplay.textContent = '+20';

        // Update modal WhatsApp button
        if (modalWhatsAppBtn) {
          const enc = encodeURIComponent(`Hello PropertiesEgy, I just registered my interest in the ORA Developers portfolio on propertiesegy.com/ora/. My name is ${fullName} (${fullPhone}). Please send me the brochures and floor plans.`);
          modalWhatsAppBtn.href = `https://wa.me/201020958859?text=${enc}`;
        }

        // Open modal
        if (modalBackdrop) modalBackdrop.classList.add('show');
      } else {
        alert(resData.message || 'Submission encountered an error. Please contact us via WhatsApp.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      // Even if network fails, we recorded in local storage and offer WhatsApp backup
      gtag_report_conversion();
      if (modalWhatsAppBtn) {
        const enc = encodeURIComponent(`Hello PropertiesEgy, I tried submitting the ORA inquiry form for ${fullName} (${fullPhone}). Please send me available inventory.`);
        modalWhatsAppBtn.href = `https://wa.me/201020958859?text=${enc}`;
      }
      if (modalBackdrop) modalBackdrop.classList.add('show');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('show');
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('show');
      }
    });
  }
}

/* ==========================================================================
   Visual Gallery Lightbox Modal
   ========================================================================== */
const projectGalleries = {
  solana_east: {
    title: "Solana East (Gardinn) — Visual Gallery",
    items: [
      {
        src: "assets/images/solana_east.jpg",
        caption: "Boutique G+3 Serviced Apartments & Garden Residences in New Cairo"
      },
      {
        src: "assets/images/zed_east_gallery_1.jpg",
        caption: "Signature Landscaping, Water Promenades & Private Terraces"
      },
      {
        src: "assets/images/zed_east_gallery_2.jpg",
        caption: "Contemporary Architectural Pedigree & 98% Open Scenic Views"
      }
    ]
  },
  zed_east: {
    title: "ZED East (New Cairo) — Visual Gallery",
    items: [
      {
        src: "assets/images/zed_east.jpg",
        caption: "Masterplanned Luxury Residences Surrounding the Central Green Spine"
      },
      {
        src: "assets/images/zed_east_gallery_1.jpg",
        caption: "Curated Retail Promenade, Fine Dining & Lifestyle Hub"
      },
      {
        src: "assets/images/zed_east_gallery_2.jpg",
        caption: "Contemporary Standalone Villas & Fully Finished Park Apartments"
      }
    ]
  },
  zed_west: {
    title: "ZED West (Sheikh Zayed) — Visual Gallery",
    items: [
      {
        src: "assets/images/zed_west.jpg",
        caption: "Iconic Residential Towers Overlooking the 65-Acre ZED Park"
      },
      {
        src: "assets/images/zed_west_gallery_1.jpg",
        caption: "Lush Parkside Lagoons, Jogging Trails & Recreational Spaces"
      },
      {
        src: "assets/images/zed_west_gallery_2.jpg",
        caption: "High-Rise Finished Apartments with Expansive Panoramic Balconies"
      }
    ]
  }
};

function initVisualGalleries() {
  const modal = document.getElementById('galleryModal');
  const closeBtn = document.getElementById('galleryCloseBtn');
  const modalTitle = document.getElementById('galleryModalTitle');
  const galleryGrid = document.getElementById('galleryGrid');
  const triggers = document.querySelectorAll('[data-gallery-trigger]');

  if (!modal || !galleryGrid) return;

  function openGallery(key) {
    const data = projectGalleries[key];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    galleryGrid.innerHTML = '';

    data.items.forEach(item => {
      const wrap = document.createElement('div');
      wrap.className = 'gallery-item-wrap';
      wrap.innerHTML = `
        <img src="${item.src}" alt="${item.caption}" loading="lazy">
        <div class="gallery-caption">${item.caption}</div>
      `;
      galleryGrid.appendChild(wrap);
    });

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeGallery() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-gallery-trigger');
      openGallery(key);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeGallery);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeGallery();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGallery();
  });
}

/* ==========================================================================
   WhatsApp Click Tracking
   ========================================================================== */
function initWhatsAppTracking() {
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
      gtag_report_conversion();
    });
  });
}
