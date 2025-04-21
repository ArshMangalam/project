// DOM elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('header');
const backToTop = document.querySelector('.back-to-top');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const sections = document.querySelectorAll('section');
const skillBars = document.querySelectorAll('.skill-progress');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Toggle navigation menu
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});

// Highlight active nav link on scroll
function highlightNavLink() {
  let scrollPosition = window.scrollY;

  // Header background change on scroll
  if (scrollPosition > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Back to top button visibility
  if (scrollPosition > 500) {
    backToTop.classList.add('active');
  } else {
    backToTop.classList.remove('active');
  }

  // Highlight active nav link
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// Custom cursor
if (window.matchMedia("(min-width: 1024px)").matches) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
    
    // Add a slight delay to follower for smooth effect
    setTimeout(() => {
      cursorFollower.style.top = e.clientY + 'px';
      cursorFollower.style.left = e.clientX + 'px';
    }, 70);
  });

  // Cursor hover effects
  const cursorElements = document.querySelectorAll('a, button, .btn, .project-card, .social-link');
  cursorElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.borderColor = 'rgba(110, 7, 243, 0.5)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.borderColor = 'var(--accent-color)';
    });
  });
}

// Scroll reveal animation
function revealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('active');
    }
  });

  // Animate skill bars when in view
  const skillSection = document.getElementById('skills');
  if (skillSection) {
    const sectionTop = skillSection.getBoundingClientRect().top;
    
    if (sectionTop < window.innerHeight - 100) {
      skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
      });
    }
  }

  // Animate timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    
    if (itemTop < window.innerHeight - 100) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Project filtering
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        
        // Add a slight delay for smooth transition
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        // Hide after transition
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Typed.js effect for hero section (comment out if not using library)
// if (typeof Typed !== 'undefined') {
//   const typed = new Typed('.typed-text', {
//     strings: ['Front-end Developer', 'UI/UX Designer', 'Computer Science Student'],
//     typeSpeed: 80,
//     backSpeed: 40,
//     backDelay: 1500,
//     loop: true,
//     showCursor: true
//   });
// }

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  // Set initial state for active link
  highlightNavLink();
  
  // Trigger reveal animations
  revealOnScroll();
  
  // Initialize project filters (set to 'all' by default)
  document.querySelector('.filter-btn[data-filter="all"]').click();
});