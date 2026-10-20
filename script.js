/**
 * PropertiesEgy — Premier Real Estate Brokerage
 * Interactive Functionality & Google Ads / Analytics Tracking
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Footer Year
    const yearElem = document.getElementById('current-year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // 2. Initialize Subsystems
    initNavbarScroll();
    initMobileNav();
    initDestinationFilters();
    initHeroQuickSearch();
    initInstallmentCalculator();
    initFaqAccordion();
    initConsultationForm();
    initCookieConsent();
    initConversionTracking();
});

/* ==========================================================================
   1. Navbar Scroll Effect
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

/* ==========================================================================
   2. Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!toggleBtn || !navMenu) return;

    const navLinks = navMenu.querySelectorAll('a');

    toggleBtn.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        toggleBtn.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            toggleBtn.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ==========================================================================
   3. Destination Category Filtering
   ========================================================================== */
function initDestinationFilters() {
    const filterBtns = document.querySelectorAll('.dest-filter-btn');
    const destCards = document.querySelectorAll('.dest-card');

    if (!filterBtns.length || !destCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            destCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 40);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

/* ==========================================================================
   4. Hero Quick Search & Pre-fill
   ========================================================================== */
function initHeroQuickSearch() {
    const searchBtn = document.getElementById('hero-search-btn');
    if (!searchBtn) return;

    searchBtn.addEventListener('click', () => {
        const destSelect = document.getElementById('hero-dest-select');
        const devSelect = document.getElementById('hero-dev-select');
        const typeSelect = document.getElementById('hero-type-select');
        const budgetSelect = document.getElementById('hero-budget-select');

        // Target Form inputs
        const formDest = document.getElementById('form-destination');
        const formDev = document.getElementById('form-developer');
        const formType = document.getElementById('form-property-type');
        const formBudget = document.getElementById('form-budget');

        if (formDest && destSelect && destSelect.value) formDest.value = destSelect.value;
        if (formDev && devSelect && devSelect.value) formDev.value = devSelect.value;
        if (formType && typeSelect && typeSelect.value) formType.value = typeSelect.value;
        if (formBudget && budgetSelect && budgetSelect.value) formBudget.value = budgetSelect.value;

        // Smooth scroll to consultation form
        const consultSection = document.getElementById('consultation');
        if (consultSection) {
            consultSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                const nameInput = document.getElementById('form-name');
                if (nameInput) nameInput.focus();
            }, 600);
        }
    });
}

/* ==========================================================================
   5. Mortgage & Installment Interactive Calculator
   ========================================================================== */
function initInstallmentCalculator() {
    const priceSlider = document.getElementById('calc-price-slider');
    const priceDisplay = document.getElementById('calc-price-display');
    const dpPillBtns = document.querySelectorAll('.calc-dp-btn');
    const yearsPillBtns = document.querySelectorAll('.calc-years-btn');
    const curBtns = document.querySelectorAll('.calc-cur-btn');

    // Result displays
    const resDp = document.getElementById('res-down-payment');
    const resMonthly = document.getElementById('res-monthly');
    const resQuarterly = document.getElementById('res-quarterly');
    const resCashDiscount = document.getElementById('res-cash-discount');

    if (!priceSlider || !priceDisplay || !resDp || !resMonthly || !resQuarterly) return;

    let currentPriceEGP = parseFloat(priceSlider.value) || 12000000;
    let currentDpPercent = 10; // Default 10%
    let currentYears = 8;      // Default 8 years
    let currentCurrency = 'EGP';

    // Currency exchange rates relative to EGP (indicative)
    const rates = {
        'EGP': 1,
        'USD': 0.021, // ~ 48 EGP / USD
        'SAR': 0.078, // ~ 12.8 EGP / SAR
        'AED': 0.077  // ~ 13 EGP / AED
    };

    const symbols = {
        'EGP': 'EGP ',
        'USD': '$',
        'SAR': 'SAR ',
        'AED': 'AED '
    };

    function formatNumber(num) {
        return Math.round(num).toLocaleString('en-US');
    }

    function calculate() {
        const rate = rates[currentCurrency] || 1;
        const sym = symbols[currentCurrency] || '';

        // Display current property price in selected currency
        const convertedPrice = currentPriceEGP * rate;
        priceDisplay.textContent = `${sym}${formatNumber(convertedPrice)}`;

        // Calculations
        const downPayment = convertedPrice * (currentDpPercent / 100);
        const remainingAmount = convertedPrice - downPayment;
        const totalMonths = currentYears * 12;
        const totalQuarters = currentYears * 4;

        const monthlyPayment = remainingAmount / totalMonths;
        const quarterlyPayment = remainingAmount / totalQuarters;
        const cashDiscountAmount = convertedPrice * 0.35; // 35% typical cash discount

        resDp.textContent = `${sym}${formatNumber(downPayment)}`;
        resMonthly.textContent = `${sym}${formatNumber(monthlyPayment)}`;
        resQuarterly.textContent = `${sym}${formatNumber(quarterlyPayment)}`;
        if (resCashDiscount) {
            resCashDiscount.textContent = `${sym}${formatNumber(cashDiscountAmount)} (Save ~35%)`;
        }
    }

    // Slider Event
    priceSlider.addEventListener('input', (e) => {
        currentPriceEGP = parseFloat(e.target.value);
        calculate();
    });

    // Down Payment Pills
    dpPillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dpPillBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDpPercent = parseFloat(btn.getAttribute('data-dp')) || 10;
            calculate();
        });
    });

    // Years Pills
    yearsPillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            yearsPillBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentYears = parseFloat(btn.getAttribute('data-years')) || 8;
            calculate();
        });
    });

    // Currency Switcher
    curBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            curBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCurrency = btn.getAttribute('data-cur') || 'EGP';
            calculate();
        });
    });

    // Initial calculation
    calculate();
}

/* ==========================================================================
   6. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (!questionBtn) return;

        questionBtn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close others
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('open');
            });

            // Toggle current
            if (isOpen) {
                item.classList.remove('open');
            } else {
                item.classList.add('open');
            }
        });
    });
}

/* ==========================================================================
   7. Consultation Form & Google Policy Consent Validation
   ========================================================================== */
function initConsultationForm() {
    const form = document.getElementById('consultation-form');
    const submitBtn = document.getElementById('submit-btn');
    const spinner = document.getElementById('form-spinner');
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('form-name');
        const phoneInput = document.getElementById('form-phone');
        const emailInput = document.getElementById('form-email');
        const consentCheckbox = document.getElementById('form-consent');

        // 1. Basic Name Check
        if (!nameInput || !nameInput.value.trim()) {
            alert('Please enter your full name.');
            if (nameInput) nameInput.focus();
            return;
        }

        // 2. Phone / WhatsApp Validation
        if (!phoneInput || !phoneInput.value.trim()) {
            alert('Please enter your phone or WhatsApp number.');
            if (phoneInput) phoneInput.focus();
            return;
        }

        let cleanPhone = phoneInput.value.trim().replace(/[\s\-\(\)\.]/g, '');
        if (cleanPhone.startsWith('00')) {
            cleanPhone = '+' + cleanPhone.slice(2);
        }

        const phoneRegex = /^\+?[0-9]{7,16}$/;
        if (!phoneRegex.test(cleanPhone)) {
            alert('Please enter a valid phone number with country code (e.g. +20 100 356 5002 or +966 50 123 4567).');
            phoneInput.focus();
            return;
        }

        // 3. Email Check
        if (emailInput && emailInput.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }
        }

        // 4. Google Compliance Consent Checkbox
        if (consentCheckbox && !consentCheckbox.checked) {
            alert('Please agree to the Privacy Policy and consent to being contacted by PropertiesEgy advisors.');
            consentCheckbox.focus();
            return;
        }

        // Prepare Form Data
        const formData = new FormData(form);
        formData.set('phone', cleanPhone);

        // UI Loading
        if (submitBtn) submitBtn.disabled = true;
        if (spinner) spinner.style.display = 'inline-block';

        const accessKeyInput = document.getElementById('web3forms-key');
        const accessKey = accessKeyInput ? accessKeyInput.value.trim() : '';

        // Test Mode / Fallback Handler
        if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
            console.log('%c[PropertiesEgy Advisory Request Captured]', 'color: #c5a880; font-weight: bold; font-size: 14px;');
            console.log('Customer Details:', {
                name: nameInput.value,
                phone: cleanPhone,
                email: emailInput ? emailInput.value : '',
                destination: formData.get('destination'),
                developer: formData.get('developer'),
                propertyType: formData.get('propertyType'),
                budget: formData.get('budget')
            });

            setTimeout(() => {
                form.reset();
                if (submitBtn) submitBtn.disabled = false;
                if (spinner) spinner.style.display = 'none';
                openSuccessModal();
                triggerGoogleConversion();
            }, 800);
            return;
        }

        // Live Web3Forms Endpoint
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.success) {
                form.reset();
                if (submitBtn) submitBtn.disabled = false;
                if (spinner) spinner.style.display = 'none';
                openSuccessModal();
                triggerGoogleConversion();
            } else {
                alert('Submission failed: ' + (result.message || 'Please verify your details and try again.'));
                if (submitBtn) submitBtn.disabled = false;
                if (spinner) spinner.style.display = 'none';
            }
        } catch (err) {
            console.error('Submission Error:', err);
            alert('An error occurred during submission. Please contact our advisory team directly on WhatsApp.');
            if (submitBtn) submitBtn.disabled = false;
            if (spinner) spinner.style.display = 'none';
        }
    });

    function openSuccessModal() {
        if (!successModal) return;
        successModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeSuccessModal() {
        if (!successModal) return;
        successModal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    window.closeSuccessModal = closeSuccessModal;

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeSuccessModal);
    }

    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) closeSuccessModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && successModal && successModal.classList.contains('open')) {
            closeSuccessModal();
        }
    });
}

/* ==========================================================================
   8. Cookie Consent Banner (Google Consent Mode)
   ========================================================================== */
function initCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const declineBtn = document.getElementById('cookie-decline-btn');

    if (!banner || !acceptBtn) return;

    const consentStatus = localStorage.getItem('propertiesegy_cookie_consent');
    if (!consentStatus) {
        // Show after 1.5 seconds
        setTimeout(() => {
            banner.classList.add('show');
        }, 1500);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('propertiesegy_cookie_consent', 'accepted');
        banner.classList.remove('show');
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted'
            });
        }
    });

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('propertiesegy_cookie_consent', 'declined');
            banner.classList.remove('show');
            if (typeof gtag === 'function') {
                gtag('consent', 'update', {
                    'analytics_storage': 'denied',
                    'ad_storage': 'denied'
                });
            }
        });
    }
}

/* ==========================================================================
   9. Google Ads Conversion & WhatsApp Tracking
   ========================================================================== */
function triggerGoogleConversion(url) {
    if (typeof gtag_report_conversion === 'function') {
        gtag_report_conversion(url);
    } else if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
            'send_to': 'AW-18495474156/EvjICOTemJQdEOyTqvNE',
            'value': 1.0,
            'currency': 'EGP',
            'event_callback': function () {
                if (typeof url !== 'undefined' && url) {
                    window.location = url;
                }
            }
        });
    } else if (typeof url !== 'undefined' && url) {
        window.location = url;
    }
}

function initConversionTracking() {
    const waLinks = document.querySelectorAll('a[href*="wa.me"]');
    waLinks.forEach(link => {
        link.addEventListener('click', () => {
            triggerGoogleConversion();
        });
    });

    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            triggerGoogleConversion();
        });
    });
}
