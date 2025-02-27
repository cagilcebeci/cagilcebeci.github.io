// Smooth Scroll for Navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Lazy Loading for Videos
const lazyLoadVideos = () => {
    const videoItems = document.querySelectorAll('.video-item iframe');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src; // Load the video
                observer.unobserve(iframe); // Stop observing once loaded
            }
        });
    }, { rootMargin: '100px' }); // Load 100px before entering the viewport

    videoItems.forEach(iframe => {
        iframe.dataset.src = iframe.src; // Store the video URL in data-src
        iframe.src = ''; // Remove the src initially
        observer.observe(iframe);
    });
};

// Animate Sections on Scroll
const animateOnScroll = () => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

    sections.forEach(section => {
        observer.observe(section);
    });
};

// Interactive Video Expansion
function expandVideo(videoNumber) {
    const videoItem = document.querySelector(`.video-item:nth-child(${videoNumber})`);
    const isExpanded = videoItem.classList.contains('expanded');

    // Collapse all videos first
    document.querySelectorAll('.video-item').forEach(item => {
        item.classList.remove('expanded');
    });

    // Expand the clicked video if it wasn't already expanded
    if (!isExpanded) {
        videoItem.classList.add('expanded');
    }
}

// Dynamic Footer Year
const updateFooterYear = () => {
    const year = new Date().getFullYear();
    document.querySelector('footer p').innerText = `© ${year} Your Name. All rights reserved.`;
};

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadVideos();
    animateOnScroll();
    updateFooterYear();
    document.querySelector('.preloader').style.display = 'none'; // Hide preloader
});