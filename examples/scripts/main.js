// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navContent = document.querySelector('.nav-content');
    const langSwitcher = document.querySelector('.language-switcher');
    const currentLang = document.querySelector('.current-lang');
    const langDropdown = document.querySelector('.lang-dropdown');

    let isMenuOpen = false;
    let isLangDropdownOpen = false;

    // Initialize mobile menu toggle
    if (mobileMenuToggle && navContent) {
        function toggleMenu(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            isMenuOpen = !isMenuOpen;

            // Force display block before adding active class for animation
            if (isMenuOpen) {
                navContent.style.display = 'flex';
                // Force reflow
                navContent.offsetHeight;
            }

            navContent.classList.toggle('active');
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';

            mobileMenuToggle.innerHTML = isMenuOpen ?
                '<i class="fas fa-times"></i>' :
                '<i class="fas fa-bars"></i>';

            // Close language dropdown when closing menu
            if (!isMenuOpen && isLangDropdownOpen) {
                closeLangDropdown();
            }

            // If closing, wait for animation before hiding
            if (!isMenuOpen) {
                setTimeout(() => {
                    if (!isMenuOpen) {
                        navContent.style.display = '';
                    }
                }, 300); // Match animation duration
            }
        }

        // Initialize language switcher
        if (currentLang && langDropdown) {
            function toggleLangDropdown(event) {
                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                isLangDropdownOpen = !isLangDropdownOpen;

                if (isLangDropdownOpen) {
                    langDropdown.style.display = 'block';
                    // Force reflow
                    langDropdown.offsetHeight;
                }

                langDropdown.classList.toggle('show');
                currentLang.classList.toggle('active');

                if (!isLangDropdownOpen) {
                    setTimeout(() => {
                        if (!isLangDropdownOpen) {
                            langDropdown.style.display = '';
                        }
                    }, 300);
                }
            }

            function closeLangDropdown() {
                if (!isLangDropdownOpen) return;

                isLangDropdownOpen = false;
                langDropdown.classList.remove('show');
                currentLang.classList.remove('active');

                setTimeout(() => {
                    if (!isLangDropdownOpen) {
                        langDropdown.style.display = '';
                    }
                }, 300);
            }

            // Toggle language dropdown
            currentLang.addEventListener('click', toggleLangDropdown);

            // Handle language selection
            const langOptions = langDropdown.querySelectorAll('li');
            langOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const newLang = option.getAttribute('data-lang');
                    if (window.i18n && typeof window.i18n.changeLanguage === 'function') {
                        window.i18n.changeLanguage(newLang);
                    }

                    closeLangDropdown();
                });
            });
        }

        // Event Listeners
        mobileMenuToggle.addEventListener('click', toggleMenu);

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navContent.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                if (isMenuOpen) {
                    toggleMenu();
                }
            }
            if (langSwitcher && !langSwitcher.contains(e.target)) {
                closeLangDropdown();
            }
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) {
                    toggleMenu();
                }
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (isLangDropdownOpen) {
                    closeLangDropdown();
                }
                if (isMenuOpen) {
                    toggleMenu();
                }
            }
        });

        // Handle resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768) {
                    if (isMenuOpen) {
                        toggleMenu();
                    }
                    if (isLangDropdownOpen) {
                        closeLangDropdown();
                    }
                }
            }, 250);
        });
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Form Validation and Submission
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    const formGroups = bookingForm.querySelectorAll('.form-group');

    const validateField = (input) => {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        let isValid = true;

        switch (input.type) {
            case 'email':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailPattern.test(input.value);
                errorMessage.textContent = isValid ? '' : 'Please enter a valid email address';
                break;
            case 'datetime-local':
                const selectedDate = new Date(input.value);
                const now = new Date();
                isValid = selectedDate > now;
                errorMessage.textContent = isValid ? '' : 'Please select a future date and time';
                break;
            case 'select-one':
                isValid = input.value !== '';
                errorMessage.textContent = isValid ? '' : 'Please select a service';
                break;
            default:
                isValid = input.value.trim() !== '';
                errorMessage.textContent = isValid ? '' : 'This field is required';
        }

        formGroup.classList.toggle('error', !isValid);
        return isValid;
    };

    // Real-time validation
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        if (input) {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (group.classList.contains('error')) {
                    validateField(input);
                }
            });
        }
    });

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let isFormValid = true;
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            if (input && input.hasAttribute('required')) {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            }
        });

        if (!isFormValid) {
            return;
        }

        // Show loading state
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonLoader = submitButton.querySelector('.button-loader');

        buttonText.classList.add('hidden');
        buttonLoader.classList.remove('hidden');
        submitButton.disabled = true;

        const formData = new FormData(bookingForm);
        const formObject = Object.fromEntries(formData.entries());

        try {
            // Simulate API call (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you! We will contact you shortly to confirm your appointment.';
            bookingForm.reset();
            bookingForm.parentNode.insertBefore(successMessage, bookingForm);

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);

        } catch (error) {
            console.error('Form submission error:', error);
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'An error occurred. Please try again later.';
            bookingForm.parentNode.insertBefore(errorMessage, bookingForm);

            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        } finally {
            // Reset button state
            buttonText.classList.remove('hidden');
            buttonLoader.classList.add('hidden');
            submitButton.disabled = false;
        }
    });
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    } else {
        nav.style.backgroundColor = 'rgba(26, 26, 26, 0.7)';
    }
});

// Testimonials Slider
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.testimonials-slider');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    const cards = document.querySelectorAll('.testimonial-card');

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 32; // Including gap
    const maxIndex = cards.length - Math.floor(slider.offsetWidth / cardWidth);

    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Update button states
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';

        // Add animation class to visible cards
        cards.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + 3) {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateX(50px)';
            }
        });
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    // Initialize slider position
    updateSliderPosition();

    // Update maxIndex on window resize
    window.addEventListener('resize', () => {
        maxIndex = cards.length - Math.floor(slider.offsetWidth / cardWidth);
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
            updateSliderPosition();
        }
    });
});

// Before/After Slider Initialization
function initializeBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.before-after-slider');

    sliders.forEach(slider => {
        if (!slider) return;

        const beforeImage = slider.querySelector('.before-image');
        if (!beforeImage) return;

        const sliderHandle = slider.querySelector('.slider-handle');
        let isResizing = false;

        // Set initial position
        beforeImage.style.clipPath = `polygon(0 0, 50% 0, 50% 100%, 0 100%)`;
        if (sliderHandle) {
            sliderHandle.style.left = '50%';
        }

        function updateSliderPosition(clientX) {
            const rect = slider.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;

            beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
            if (sliderHandle) {
                sliderHandle.style.left = `${percentage}%`;
            }
        }

        function handleStart(e) {
            isResizing = true;
            slider.classList.add('resizing');
            const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            updateSliderPosition(clientX);
        }

        function handleMove(e) {
            if (!isResizing) return;
            e.preventDefault();
            const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            updateSliderPosition(clientX);
        }

        function handleEnd() {
            isResizing = false;
            slider.classList.remove('resizing');
        }

        // Mouse events
        slider.addEventListener('mousedown', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);

        // Touch events
        slider.addEventListener('touchstart', handleStart, { passive: false });
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('touchend', handleEnd);
    });
}

// Initialize language switcher
function initializeLanguageSwitcher() {
    const langSwitcher = document.querySelector('.language-switcher');
    if (!langSwitcher) return;

    const currentLangBtn = langSwitcher.querySelector('.current-lang');
    const langDropdown = langSwitcher.querySelector('.lang-dropdown');
    if (!currentLangBtn || !langDropdown) return;

    let isDropdownOpen = false;
    let closeTimeout;

    function toggleDropdown(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        isDropdownOpen = !isDropdownOpen;

        if (closeTimeout) {
            clearTimeout(closeTimeout);
        }

        if (isDropdownOpen) {
            requestAnimationFrame(() => {
                langDropdown.style.display = 'block';
                langDropdown.offsetHeight; // Force reflow
                langDropdown.classList.add('show');
                currentLangBtn.classList.add('active');
            });
        } else {
            langDropdown.classList.remove('show');
            currentLangBtn.classList.remove('active');
            closeTimeout = setTimeout(() => {
                if (!isDropdownOpen) {
                    langDropdown.style.display = '';
                }
            }, 200);
        }
    }

    function handleLanguageSelection(event) {
        const langItem = event.target.closest('li');
        if (!langItem) return;

        const newLang = langItem.getAttribute('data-lang');
        const newLangImg = langItem.querySelector('img').src;
        const newLangText = langItem.querySelector('span').textContent;

        const currentImg = currentLangBtn.querySelector('img');
        const currentText = currentLangBtn.querySelector('span');

        if (currentImg && currentText) {
            currentImg.src = newLangImg;
            currentText.textContent = newLangText;
        }

        isDropdownOpen = false;
        langDropdown.classList.remove('show');
        currentLangBtn.classList.remove('active');

        closeTimeout = setTimeout(() => {
            if (!isDropdownOpen) {
                langDropdown.style.display = '';
            }
        }, 200);

        if (window.i18n && typeof window.i18n.changeLanguage === 'function') {
            window.i18n.changeLanguage(newLang);
        }
    }

    currentLangBtn.addEventListener('click', toggleDropdown);
    langDropdown.addEventListener('click', handleLanguageSelection);

    document.addEventListener('click', (event) => {
        if (!langSwitcher.contains(event.target) && isDropdownOpen) {
            toggleDropdown();
        }
    }, { passive: true });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isDropdownOpen) {
            toggleDropdown();
        }
    });

    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (isDropdownOpen && Math.abs(e.touches[0].clientY - touchStartY) > 10) {
            toggleDropdown();
        }
    }, { passive: true });

    window.addEventListener('scroll', () => {
        if (isDropdownOpen) {
            toggleDropdown();
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
        if (isDropdownOpen) {
            toggleDropdown();
        }
    }, { passive: true });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize before/after sliders
    initializeBeforeAfterSliders();

    // Initialize language switcher
    initializeLanguageSwitcher();

    // Initialize gallery
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const ITEMS_PER_PAGE = 6;
    let currentPage = 1;
    let currentFilter = 'all';
    let allGalleryItems = [];

    // Initialize gallery items
    function initializeGallery() {
        allGalleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        showItems();
    }

    // Show items based on current page and filter
    function showItems() {
        const filteredItems = allGalleryItems.filter(item => {
            return currentFilter === 'all' || item.dataset.category === currentFilter;
        });

        const start = 0;
        const end = currentPage * ITEMS_PER_PAGE;

        allGalleryItems.forEach(item => item.classList.add('hidden'));

        filteredItems.slice(start, end).forEach(item => {
            item.classList.remove('hidden');
            setTimeout(() => item.classList.remove('fade-out'), 10);
        });

        updateLoadMoreButton(filteredItems.length > end);
    }

    // Update Load More button visibility
    function updateLoadMoreButton(hasMore) {
        let loadMoreBtn = document.querySelector('.load-more-btn');

        if (!loadMoreBtn) {
            loadMoreBtn = document.createElement('button');
            loadMoreBtn.className = 'load-more-btn';
            loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More';
            document.querySelector('.gallery-cta').insertBefore(loadMoreBtn, document.querySelector('.gallery-cta p'));

            loadMoreBtn.addEventListener('click', () => {
                currentPage++;
                showItems();
            });
        }

        loadMoreBtn.style.display = hasMore ? 'inline-flex' : 'none';
    }

    // Filter items
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentFilter = button.getAttribute('data-filter');
            currentPage = 1;
            showItems();
        });
    });

    // Enhanced Lightbox
    function createLightbox(image, galleryItems) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';

        const content = document.createElement('div');
        content.className = 'lightbox-content';

        const img = document.createElement('img');
        img.src = image.src;

        const nav = document.createElement('div');
        nav.className = 'lightbox-nav';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'lightbox-btn prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'lightbox-btn next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';

        const caption = document.createElement('div');
        caption.className = 'lightbox-caption';
        caption.textContent = image.alt;

        content.appendChild(img);
        nav.appendChild(prevBtn);
        nav.appendChild(nextBtn);
        content.appendChild(nav);
        content.appendChild(closeBtn);
        content.appendChild(caption);
        lightbox.appendChild(content);

        let currentIndex = Array.from(galleryItems).indexOf(image);

        function updateImage(index) {
            const newImage = galleryItems[index];
            img.src = newImage.src;
            img.alt = newImage.alt;
            caption.textContent = newImage.alt;
            currentIndex = index;
        }

        prevBtn.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateImage(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % galleryItems.length;
            updateImage(newIndex);
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('show');
            setTimeout(() => lightbox.remove(), 300);
        });

        document.body.appendChild(lightbox);
        setTimeout(() => lightbox.classList.add('show'), 10);
    }

    // Initialize lightbox for gallery images
    galleryGrid.addEventListener('click', (e) => {
        const image = e.target.closest('img');
        if (image) {
            const galleryImages = Array.from(document.querySelectorAll('.gallery-item:not(.hidden) img'));
            createLightbox(image, galleryImages);
        }
    });

    // Initialize gallery
    initializeGallery();

    // Initialize mobile menu
    initializeMobileMenu();
});

// Add lightbox styles
const style = document.createElement('style');
style.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
    }

    .lightbox img {
        max-width: 90%;
        max-height: 90vh;
        object-fit: contain;
    }
`;
document.head.appendChild(style);

// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('back-to-top');

    const toggleBackToTopButton = () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleBackToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Cookie Consent Functionality
document.addEventListener('DOMContentLoaded', () => {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptButton = document.getElementById('accept-cookies');
    const declineButton = document.getElementById('decline-cookies');

    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieChoice');

    if (!cookieChoice) {
        // Show the banner after a short delay
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }

    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookieChoice', 'accepted');
        cookieConsent.classList.remove('show');
        // Here you could initialize your analytics or other cookie-dependent features
    });

    declineButton.addEventListener('click', () => {
        localStorage.setItem('cookieChoice', 'declined');
        cookieConsent.classList.remove('show');
    });
});

function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navContent = document.querySelector('.nav-content');
    const navLinks = document.querySelectorAll('.nav-links a');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navContent.classList.toggle('active');
        mobileMenuToggle.innerHTML = isMenuOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navContent.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // Toggle menu on button click
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(scrollTop - lastScrollTop) > 10 && isMenuOpen) {
            toggleMenu();
        }
        lastScrollTop = scrollTop;
    });
}
