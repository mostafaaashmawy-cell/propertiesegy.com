/**
 * Nations of Sky — ORB Sheikh Zayed Landing Page JavaScript
 * Broker: propertiesegy (Independent Real Estate Consultancy)
 * WhatsApp: +20 10 20958859
 */

document.addEventListener('DOMContentLoaded', () => {
  initIntlTelInputs();
  initFormSubmissions();
  initUnitInquiryTriggers();
  initWhatsAppTracking();
  setCurrentYear();
});

/* ============================================================
   1. INTERNATIONAL TELEPHONE INPUT INITIALIZATION
   ============================================================ */
let itiInstances = [];

function initIntlTelInputs() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    if (window.intlTelInput) {
      const iti = window.intlTelInput(input, {
        initialCountry: 'eg',
        preferredCountries: ['eg', 'sa', 'ae', 'kw', 'qa', 'om', 'bh', 'us', 'gb', 'de'],
        separateDialCode: true,
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.js',
        autoPlaceholder: 'polite',
        formatOnDisplay: true,
      });

      itiInstances.push({ input, iti });
    }
  });
}

/* ============================================================
   2. FORM SUBMISSION HANDLING (Web3Forms + Fallbacks)
   ============================================================ */
function initFormSubmissions() {
  const forms = document.querySelectorAll('form[data-lead-form]');

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="name"]');
      const phoneInput = form.querySelector('input[type="tel"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      const projectInput = form.querySelector('input[name="project"]');
      const projectName = projectInput ? projectInput.value : 'ORB Sheikh Zayed by Nations of Sky';

      if (!nameInput || !phoneInput) return;

      const fullName = nameInput.value.trim();
      let fullPhone = phoneInput.value.trim();

      // Basic validation
      if (!fullName) {
        showToast('Required Field', 'Please enter your full name.');
        nameInput.focus();
        return;
      }

      if (!fullPhone) {
        showToast('Required Field', 'Please enter your phone number.');
        phoneInput.focus();
        return;
      }

      // Check intlTelInput validation if initialized
      const itiEntry = itiInstances.find(entry => entry.input === phoneInput);
      if (itiEntry && itiEntry.iti) {
        if (!itiEntry.iti.isValidNumber() && fullPhone.replace(/[\s\-\(\)]/g, '').length < 7) {
          showToast('Invalid Phone Number', 'Please provide a valid international phone number.');
          phoneInput.focus();
          return;
        }
        fullPhone = itiEntry.iti.getNumber();
      }

      // Prepare UI state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
      }

      // Prepare payload
      const formData = new FormData(form);
      formData.set('name', fullName);
      formData.set('phone', fullPhone);
      formData.set('project', projectName);
      formData.set('developer', 'Nations of Sky');
      formData.set('broker', 'propertiesegy');
      formData.set('submitted_at', new Date().toISOString());

      // Web3Forms API
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        const result = await response.json();

        if (response.ok || result.success) {
          triggerConversions();
          form.reset();
          openSuccessModal(fullName, fullPhone, projectName);
        } else {
          console.warn('Web3Forms message:', result);
          triggerConversions();
          form.reset();
          openSuccessModal(fullName, fullPhone, projectName);
        }
      } catch (err) {
        console.error('Submission network error:', err);
        // Treat as captured & direct to WhatsApp
        triggerConversions();
        openSuccessModal(fullName, fullPhone, projectName);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
        }
      }
    });
  });
}

/* ============================================================
   3. GOOGLE ADS CONVERSION TRACKING
   ============================================================ */
function triggerConversions() {
  if (typeof gtag_report_conversion === 'function') {
    gtag_report_conversion();
  } else if (typeof gtag === 'function') {
    gtag('event', 'conversion', {
      'send_to': 'AW-299139259/OsrUCJGerfYcELuB0o4B',
      'value': 1.0,
      'currency': 'EGP'
    });
  }
}

/* ============================================================
   4. UNIT INQUIRY BUTTON TRIGGERS
   ============================================================ */
function initUnitInquiryTriggers() {
  const inquireButtons = document.querySelectorAll('[data-inquire-project]');

  inquireButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const unitType = btn.getAttribute('data-inquire-project') || 'ORB Sheikh Zayed';
      
      // Update hidden project fields in all forms
      document.querySelectorAll('input[name="project"]').forEach(input => {
        if (unitType.includes('Jirian')) {
          input.value = unitType;
        } else {
          input.value = `ORB Sheikh Zayed — ${unitType}`;
        }
      });

      // Update email subject line for clear lead routing
      document.querySelectorAll('input[name="subject"]').forEach(input => {
        if (unitType.includes('Jirian')) {
          input.value = `New Jirian City Lead Submission — propertiesegy`;
        } else {
          input.value = `New ORB Lead (${unitType}) — propertiesegy`;
        }
      });

      // Smooth scroll to primary lead form
      const formSection = document.getElementById('register');
      if (formSection) {
        const headerOffset = 60;
        const elementPosition = formSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Focus name field
        setTimeout(() => {
          const nameField = formSection.querySelector('input[name="name"]');
          if (nameField) nameField.focus();
        }, 500);
      }
    });
  });
}

/* ============================================================
   5. WHATSAPP CLICK TRACKING (All WhatsApp Links)
   ============================================================ */
function initWhatsAppTracking() {
  document.addEventListener('click', (e) => {
    const waLink = e.target.closest('a[href*="wa.me"]');
    if (waLink) {
      if (typeof gtag_report_conversion === 'function') {
        gtag_report_conversion();
      } else if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          'send_to': 'AW-299139259/OsrUCJGerfYcELuB0o4B',
          'value': 1.0,
          'currency': 'EGP'
        });
      }
    }
  });
}

/* ============================================================
   6. SUCCESS MODAL CONTROLS
   ============================================================ */
function openSuccessModal(name, phone, project) {
  const backdrop = document.getElementById('successModal');
  const waBtn = document.getElementById('modalWaBtn');

  if (waBtn) {
    const text = encodeURIComponent(
      `Hello propertiesegy, I have just registered my interest in ${project} on your Nations of Sky landing page.\n\nName: ${name}\nPhone: ${phone}\n\nPlease share the latest price list, unit floorplans, and payment schedule for ORB Sheikh Zayed.`
    );
    waBtn.href = `https://wa.me/201020958859?text=${text}`;
  }

  if (backdrop) {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeSuccessModal() {
  const backdrop = document.getElementById('successModal');
  if (backdrop) {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

window.closeSuccessModal = closeSuccessModal;

window.addEventListener('click', (e) => {
  const backdrop = document.getElementById('successModal');
  if (e.target === backdrop) {
    closeSuccessModal();
  }
});

/* ============================================================
   7. TOAST NOTIFICATIONS
   ============================================================ */
function showToast(title, message, duration = 4000) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<strong>${title}</strong><div style="margin-top:4px; font-size:0.82rem; color:#E5E7EB;">${message}</div>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

/* ============================================================
   8. DYNAMIC CURRENT YEAR
   ============================================================ */
function setCurrentYear() {
  const yearSpans = document.querySelectorAll('[data-current-year]');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });
}
