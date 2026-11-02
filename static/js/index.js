window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (!dropdown || !button) return;

    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && dropdown && button && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        if (dropdown && button) {
            dropdown.classList.remove('show');
            button.classList.remove('active');
        }
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn') || document.getElementById('copy-btn');
    const copyText = button ? (button.querySelector('.copy-text') || button) : null;
    
    if (!bibtexElement) {
        console.warn('BibTeX element #bibtex-code not found.');
        return;
    }
    
    const textToCopy = (bibtexElement.innerText || bibtexElement.textContent).trim();
    
    function onSuccess() {
        if (button) {
            button.classList.add('copied');
        }
        if (copyText) {
            copyText.textContent = 'Copied!';
        }
        setTimeout(function() {
            if (button) {
                button.classList.remove('copied');
            }
            if (copyText) {
                copyText.textContent = 'Copy';
            }
        }, 2000);
    }
    
    function fallbackCopy() {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        textArea.setAttribute('readonly', '');
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                onSuccess();
            } else {
                console.error('execCommand copy returned false');
            }
        } catch (err) {
            console.error('Fallback copy failed: ', err);
        }
        document.body.removeChild(textArea);
    }
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(onSuccess).catch(fallbackCopy);
    } else {
        fallbackCopy();
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }
});

// Document ready initialization
$(document).ready(function() {
    if (typeof bulmaCarousel !== 'undefined') {
        const options = {
            slidesToScroll: 1,
            slidesToShow: 1,
            loop: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
        };
        bulmaCarousel.attach('.carousel', options);
    }
    
    if (typeof bulmaSlider !== 'undefined') {
        bulmaSlider.attach();
    }
});
