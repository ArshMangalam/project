// Form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate form (basic validation)
    if (!validateForm(name, email, message)) {
      return;
    }
    
    // Show loading state
    showLoadingState();
    
    // Simulate form submission (in a real app, you would send to a server)
    setTimeout(() => {
      // Hide loading and show success
      showSuccessState();
      
      // Reset form after successful submission
      contactForm.reset();
      
      // Reset form state after a delay
      setTimeout(resetFormState, 3000);
    }, 1500);
  });
}

// Form validation
function validateForm(name, email, message) {
  // Reset previous error states
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(el => el.remove());
  
  let isValid = true;
  
  // Validate name
  if (!name.trim()) {
    displayError('name', 'Please enter your name');
    isValid = false;
  }
  
  // Validate email
  if (!validateEmail(email)) {
    displayError('email', 'Please enter a valid email address');
    isValid = false;
  }
  
  // Validate message
  if (!message.trim()) {
    displayError('message', 'Please enter your message');
    isValid = false;
  }
  
  return isValid;
}

// Email validation regex
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Display error message
function displayError(inputId, message) {
  const inputElement = document.getElementById(inputId);
  const formGroup = inputElement.parentElement;
  
  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerText = message;
  errorDiv.style.color = 'var(--error-color)';
  errorDiv.style.fontSize = 'var(--font-size-xs)';
  errorDiv.style.marginTop = 'var(--spacing-xs)';
  
  // Add error styling to input
  inputElement.style.borderColor = 'var(--error-color)';
  
  // Add error message to form group
  formGroup.appendChild(errorDiv);
  
  // Focus on first input with error
  inputElement.focus();
}

// Show loading state
function showLoadingState() {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  // Store original text for later
  submitBtn.setAttribute('data-original-text', originalText);
  
  // Replace with loading indicator
  submitBtn.innerHTML = `
    <div class="loading-spinner" style="display: inline-block; width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #fff; animation: spin 1s ease-in-out infinite;"></div>
    Sending...
  `;
  
  // Disable button
  submitBtn.disabled = true;
  
  // Add keyframes for spinner animation if not already in document
  if (!document.getElementById('spinner-keyframes')) {
    const style = document.createElement('style');
    style.id = 'spinner-keyframes';
    style.innerHTML = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

// Show success state
function showSuccessState() {
  const formContent = contactForm.innerHTML;
  
  // Store original content
  contactForm.setAttribute('data-original-content', formContent);
  
  // Replace with success message
  contactForm.innerHTML = `
    <div class="submit-success">
      <div>
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        <h3 style="text-align: center; margin-top: 20px; color: var(--accent-color);">Message Sent!</h3>
        <p style="text-align: center; margin-top: 10px; color: var(--text-secondary);">Thank you for reaching out. I'll get back to you soon.</p>
      </div>
    </div>
  `;
}

// Reset form state
function resetFormState() {
  // Check if we have stored the original content
  const originalContent = contactForm.getAttribute('data-original-content');
  
  if (originalContent) {
    // Restore original form content
    contactForm.innerHTML = originalContent;
    
    // Re-add event listener to new form
    const newForm = document.getElementById('contactForm');
    if (newForm) {
      newForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!validateForm(name, email, message)) {
          return;
        }
        
        // Show loading state
        showLoadingState();
        
        // Simulate form submission
        setTimeout(() => {
          // Hide loading and show success
          showSuccessState();
          
          // Reset form after successful submission
          newForm.reset();
          
          // Reset form state after a delay
          setTimeout(resetFormState, 3000);
        }, 1500);
      });
    }
  } else {
    // If no stored content (shouldn't happen), just reset the form
    contactForm.reset();
    
    // Reset submit button if it's in loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn && submitBtn.getAttribute('data-original-text')) {
      submitBtn.innerHTML = submitBtn.getAttribute('data-original-text');
      submitBtn.disabled = false;
    }
  }
}

// Form field enhancement (floating labels)
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
  // Handle focus events
  input.addEventListener('focus', () => {
    const label = input.nextElementSibling;
    if (label && label.tagName === 'LABEL') {
      label.classList.add('active');
    }
  });
  
  // Handle blur events
  input.addEventListener('blur', () => {
    const label = input.nextElementSibling;
    if (label && label.tagName === 'LABEL' && !input.value.trim()) {
      label.classList.remove('active');
    }
  });
  
  // Check initial state (for cases where browser autofills)
  if (input.value.trim()) {
    const label = input.nextElementSibling;
    if (label && label.tagName === 'LABEL') {
      label.classList.add('active');
    }
  }
});