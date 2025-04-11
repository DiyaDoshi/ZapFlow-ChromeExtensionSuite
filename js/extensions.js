document.addEventListener('DOMContentLoaded', () => {
    // Theme and navigation functionality is handled by the main script.js
    
    // Testimonial Carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    
    let currentSlide = 0;
    const totalSlides = testimonialSlides.length;
    
    function showSlide(index) {
      testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      indicators.forEach(indicator => {
        indicator.classList.remove('active');
      });
      
      testimonialSlides[index].classList.add('active');
      indicators[index].classList.add('active');
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Make indicators clickable
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
    
    // Auto change slides every 5 seconds
    const slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-slide when user interacts with controls
    const pauseAutoSlide = () => {
      clearInterval(slideInterval);
      // Restart after user inactivity (optional)
      setTimeout(() => {
        setInterval(nextSlide, 5000);
      }, 10000);
    };
    
    prevBtn.addEventListener('click', pauseAutoSlide);
    nextBtn.addEventListener('click', pauseAutoSlide);
    indicators.forEach(indicator => {
      indicator.addEventListener('click', pauseAutoSlide);
    });
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      item.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    });
    
    // Install button click tracking
    const installButton = document.querySelector('.cta-button');
    if (installButton) {
      installButton.addEventListener('click', (e) => {
        // Track click event (could be connected to analytics in the future)
        console.log('Install button clicked');
        
        // You could add additional functionality here, like:
        // - Opening a modal with installation instructions
        // - Triggering an analytics event
        // - Showing a success message
      });
    }
    
    // Animate content when scrolled into view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    // Observe elements for animations
    document.querySelectorAll('.section-title, .feature-item, .step, .screenshot, .faq-item').forEach(element => {
      observer.observe(element);
    });
  });
  