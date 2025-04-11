
document.addEventListener('DOMContentLoaded', () => {

  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme");

  // Apply saved theme
  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }

  // Toggle theme on button click
  themeToggle.addEventListener("click", function () {
    let newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Save preference
  });

  
  
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
  setInterval(nextSlide, 5000);
  
  // Animate stats when scrolled into view
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateStats() {
    statNumbers.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
      
      let current = 0;
      const counterInterval = setInterval(() => {
        current += step;
        
        if (current >= target) {
          clearInterval(counterInterval);
          current = target;
        }
        
        // Handle decimal values
        if (target % 1 !== 0) {
          stat.textContent = current.toFixed(1);
        } else {
          stat.textContent = Math.floor(current).toLocaleString();
        }
      }, 16);
    });
  }
  
  // Intersection Observer for animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('stats-grid')) {
          animateStats();
        }
        
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // Observe elements for animations
  document.querySelectorAll('.section-title, .extension-card, .feature-item, .stats-grid').forEach(element => {
    observer.observe(element);
  });
  
  // Extension cards hover effect
  const extensionCards = document.querySelectorAll('.extension-card');
  
  extensionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Navbar scroll behavior
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.padding = '0.5rem 0';
      navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.padding = '1rem 0';
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  });
});

// Hero Section Animation
document.addEventListener('DOMContentLoaded', () => {
  // Network Lines Animation
  const setupNetworkLines = () => {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const points = [];
    let animationFrameId;
    let width = canvas.width;
    let height = canvas.height;
    
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Re-create points on resize
      points.length = 0;
      createPoints();
    };
    
    const createPoints = () => {
      const pointCount = Math.floor(width * height / 15000); // Density factor
      
      for (let i = 0; i < pointCount; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4
        });
      }
    };
    
    const drawLines = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw points
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
        ctx.fill();
        
        // Move point
        point.x += point.vx;
        point.y += point.vy;
        
        // Bounce off edges
        if (point.x < 0 || point.x > width) point.vx = -point.vx;
        if (point.y < 0 || point.y > height) point.vy = -point.vy;
        
        // Draw connections
        for (let j = i + 1; j < points.length; j++) {
          const otherPoint = points[j];
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) { // Connection distance
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 - (distance / 100) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(drawLines);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createPoints();
    drawLines();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  };

  // Parallax Effect
  const setupParallax = () => {
    const container = document.getElementById('heroContainer');
    if (!container) return;
    
    const handleMouseMove = (e) => {
      const items = container.querySelectorAll('.parallax-item');
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      items.forEach((item) => {
        const strength = parseFloat(item.dataset.strength || '0.05');
        const x = (centerX - e.clientX) * strength;
        const y = (centerY - e.clientY) * strength;
        item.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  };

  // Initialize animations
  setupNetworkLines();
  setupParallax();
  
  // Button hover effects
  const learnMoreBtn = document.querySelector('.cta-secondary');
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('mouseenter', () => {
      const icon = learnMoreBtn.querySelector('.chevron-icon');
      if (icon) {
        icon.style.transform = 'translateX(4px)';
      }
    });
    
    learnMoreBtn.addEventListener('mouseleave', () => {
      const icon = learnMoreBtn.querySelector('.chevron-icon');
      if (icon) {
        icon.style.transform = 'translateX(0)';
      }
    });
  }
});

