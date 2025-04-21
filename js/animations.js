// Smooth scroll effect for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    // Calculate header height for accurate scrolling
    const headerHeight = document.querySelector('header').offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
const shapes = document.querySelectorAll('.shape');

window.addEventListener('scroll', () => {
  if (window.innerWidth > 768) { // Only apply on larger screens
    const scrollY = window.scrollY;
    
    // Move shapes with parallax effect
    shapes.forEach((shape, index) => {
      const speed = 0.1 * (index + 1);
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }
});

// Typing effect animation
function setupTypeWriter(element, texts, speed = 100) {
  if (!element) return;
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = speed;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      // Removing characters
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = speed / 2;
    } else {
      // Adding characters
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = speed;
    }
    
    // Add cursor effect
    if (!element.classList.contains('typing-effect')) {
      element.classList.add('typing-effect');
    }
    
    // Completed typing current text
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingDelay = 1000; // Pause at the end
    } 
    // Completed deleting current text
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingDelay = 500; // Pause before typing next text
    }
    
    setTimeout(type, typingDelay);
  }
  
  // Start the typing animation
  setTimeout(type, 1000);
}

// Setup typing animation for tagline (uncomment to use)
// const tagline = document.querySelector('.tagline');
// if (tagline) {
//   const originalText = tagline.textContent;
//   tagline.textContent = '';
//   setupTypeWriter(tagline, [
//     originalText,
//     'UI/UX Designer',
//     'Problem Solver',
//     'Lifelong Learner'
//   ]);
// }

// Project hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  const image = card.querySelector('.project-img img');
  
  card.addEventListener('mouseenter', () => {
    image.style.transform = 'scale(1.1)';
  });
  
  card.addEventListener('mouseleave', () => {
    image.style.transform = 'scale(1)';
  });
});

// Animation for skill bars
function animateSkillBars() {
  const skillSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-progress');
  
  if (!skillSection || !skillBars.length) return;
  
  const animate = () => {
    const sectionTop = skillSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;
    
    if (sectionTop < triggerPoint) {
      skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
      });
      window.removeEventListener('scroll', animate);
    }
  };
  
  // Initial check
  animate();
  
  // Scroll check
  window.addEventListener('scroll', animate);
}

// Staggered animation for about section details
function animateAboutDetails() {
  const details = document.querySelectorAll('.detail');
  
  details.forEach((detail, index) => {
    detail.style.opacity = '0';
    detail.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      detail.style.transition = 'all 0.5s ease';
      detail.style.opacity = '1';
      detail.style.transform = 'translateY(0)';
    }, 300 * (index + 1));
  });
}

// Scroll-triggered animations for timeline
function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const checkInView = () => {
    timelineItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight - 100;
      
      if (itemTop < triggerPoint) {
        item.classList.add('active');
      }
    });
  };
  
  // Initial check
  checkInView();
  
  // Scroll check
  window.addEventListener('scroll', checkInView);
}

// Animation for achievement cards
function animateAchievements() {
  const cards = document.querySelectorAll('.achievement-card');
  
  const checkInView = () => {
    cards.forEach((card, index) => {
      const cardTop = card.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight - 100;
      
      if (cardTop < triggerPoint) {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 200 * index);
      }
    });
  };
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
  });
  
  // Initial check
  checkInView();
  
  // Scroll check
  window.addEventListener('scroll', checkInView);
}

// Image reveal animation
function animateImages() {
  const images = document.querySelectorAll('.img-container');
  
  images.forEach(container => {
    const img = container.querySelector('img');
    
    if (!img) return;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('img-overlay');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'var(--accent-color)';
    overlay.style.transform = 'scaleX(1)';
    overlay.style.transformOrigin = 'right';
    overlay.style.transition = 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)';
    overlay.style.zIndex = '1';
    
    // Make container relative for positioning
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    
    // Initially hide image
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    // Add overlay
    container.appendChild(overlay);
    
    // Animation function
    const revealImage = () => {
      const containerTop = container.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight - 100;
      
      if (containerTop < triggerPoint) {
        // Animate overlay away
        setTimeout(() => {
          overlay.style.transform = 'scaleX(0)';
          overlay.style.transformOrigin = 'left';
          
          // Show image
          setTimeout(() => {
            img.style.opacity = '1';
          }, 300);
        }, 300);
        
        window.removeEventListener('scroll', revealImage);
      }
    };
    
    // Initial check
    revealImage();
    
    // Scroll check
    window.addEventListener('scroll', revealImage);
  });
}

// Initialize animations on page load
window.addEventListener('DOMContentLoaded', () => {
  animateSkillBars();
  animateTimeline();
  animateAchievements();
  
  // Delay some animations for better user experience
  setTimeout(() => {
    animateAboutDetails();
    animateImages();
  }, 1000);
  
  // Check for animation preference (respect user settings)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Disable animations for users who prefer reduced motion
    document.body.classList.add('reduced-motion');
    
    // Apply immediate styles instead of animations
    const animatedElements = document.querySelectorAll('.fade-in, .reveal, .skill-progress');
    animatedElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.transition = 'none';
    });
    
    // Set skill bars to full width immediately
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      bar.style.width = `${progress}%`;
      bar.style.transition = 'none';
    });
  }
});