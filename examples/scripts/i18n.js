// Language management
class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.translations = { en, mk, sq };
        this.init();
    }

    init() {
        this.updateLanguageUI();
        this.translatePage();
        this.setupEventListeners();
    }

    updateLanguageUI() {
        const currentLangBtn = document.querySelector('.current-lang');
        const langImg = currentLangBtn.querySelector('img');
        const langSpan = currentLangBtn.querySelector('span');

        const flagExtensions = {
            en: 'webp',
            mk: 'png',
            sq: 'jpg'
        };

        const flagNames = {
            en: 'en',
            mk: 'mk',
            sq: 'al'
        };

        const extension = flagExtensions[this.currentLang];
        const flagName = flagNames[this.currentLang];
        langImg.src = `assets/flags/${flagName}.${extension}`;
        langImg.alt = this.getLangName(this.currentLang);
        langSpan.textContent = this.currentLang.toUpperCase();
    }

    getLangName(code) {
        const names = {
            en: 'English',
            mk: 'Македонски',
            sq: 'Shqip'
        };
        return names[code];
    }

    setupEventListeners() {
        // Language switcher dropdown
        const langSwitcher = document.querySelector('.language-switcher');
        const currentLangBtn = langSwitcher.querySelector('.current-lang');
        const langDropdown = langSwitcher.querySelector('.lang-dropdown');

        currentLangBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            langDropdown.classList.remove('show');
        });

        // Language selection
        const langOptions = langDropdown.querySelectorAll('li');
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const newLang = option.getAttribute('data-lang');
                this.changeLanguage(newLang);
                langDropdown.classList.remove('show');
            });
        });
    }

    changeLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.updateLanguageUI();
        this.translatePage();

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));

        // Force re-translation after a short delay to catch any dynamic content
        setTimeout(() => this.translatePage(), 100);
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);

            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'META' && element.getAttribute('name') === 'description') {
                    element.setAttribute('content', translation);
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update document title if translation exists
        const titleTranslation = this.getTranslation('site.title');
        if (titleTranslation) {
            document.title = titleTranslation;
        }
    }

    getTranslation(key) {
        return key.split('.').reduce((obj, i) => obj ? obj[i] : null, this.translations[this.currentLang]);
    }

    // Helper method to get translation programmatically
    t(key) {
        return this.getTranslation(key);
    }
}

// Initialize internationalization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
});
