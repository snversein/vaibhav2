        document.addEventListener('DOMContentLoaded', function() {
            // Navbar Scroll Effect
            const navbar = document.getElementById('navbar');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // Mobile Navigation Toggle
            const navToggle = document.getElementById('navToggle');
            const navLinks = document.querySelector('.nav-links');

            navToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                
                // Animate hamburger
                const spans = navToggle.querySelectorAll('span');
                if (navLinks.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });

            // Close mobile nav when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                });
            });

            // Scroll Animation Observer
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Trigger counter animation for stat numbers
                        if (entry.target.querySelector('.stat-number')) {
                            animateCounters();
                        }
                    }
                });
            }, observerOptions);

            // Observe all fade-in elements
            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });

            // Counter Animation
            function animateCounters() {
                const counters = document.querySelectorAll('.stat-number');
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                });
            }

            // Smooth Scroll for Anchor Links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Form Submission
            const bookingForm = document.getElementById('bookingForm');
            
            if (bookingForm) {
                bookingForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Get form data
                    const formData = new FormData(this);
                    const name = formData.get('name');
                    const phone = formData.get('phone');
                    const email = formData.get('email');
                    const interest = formData.get('interest');
                    const message = formData.get('message');

                    // Simple validation
                    if (!name || !phone) {
                        alert('Please fill in required fields');
                        return;
                    }

                    // Show success message (in production, you would send to server)
                    alert(`Thank you, ${name}! We have received your enquiry. Our team will contact you at ${phone} shortly.`);
                    this.reset();
                });
            }

            // Parallax Effect for Hero Section
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
                }
            });

            // Active Navigation Link Highlighting
            const sections = document.querySelectorAll('section[id]');
            
            window.addEventListener('scroll', function() {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (scrollY >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });

                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });
            });

            // Amenity Card Hover Animation
            const amenityCards = document.querySelectorAll('.amenity-card');
            
            amenityCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-15px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // RERA Number Typing Effect
            const reraNumber = document.querySelector('.rera-number');
            if (reraNumber) {
                const text = reraNumber.textContent;
                reraNumber.textContent = '';
                let i = 0;
                
                const typeWriter = () => {
                    if (i < text.length) {
                        reraNumber.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 50);
                    }
                };
                
                // Start typing when visible
                const reraObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(typeWriter, 500);
                            reraObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                reraObserver.observe(reraNumber);
            }

            // Floating Animation for Particles
            const particles = document.querySelectorAll('.particle');
            
            particles.forEach((particle, index) => {
                particle.style.animationDelay = `${index * 2}s`;
                particle.style.animationDuration = `${15 + Math.random() * 10}s`;
            });

            // Button Ripple Effect
            document.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    
                    ripple.style.cssText = `
                        position: absolute;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        pointer-events: none;
                        width: 100px;
                        height: 100px;
                        left: ${e.clientX - rect.left - 50}px;
                        top: ${e.clientY - rect.top - 50}px;
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                    `;
                    
                    this.style.position = 'relative';
                    this.style.overflow = 'hidden';
                    this.appendChild(ripple);
                    
                    setTimeout(() => ripple.remove(), 600);
                });
            });

            // Add ripple keyframes dynamically
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);

            // Scroll Reveal Animation
            function reveal() {
                const reveals = document.querySelectorAll('.reveal');
                
                reveals.forEach(element => {
                    const windowHeight = window.innerHeight;
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 139;
                    
                    if (elementTop < windowHeight - elementVisible) {
                        element.classList.add('active');
                    }
                });
            }

            window.addEventListener('scroll', reveal);

            // Initialize reveal for elements already in view
            reveal();

            // Distance Card Animation on Scroll
            const distanceItems = document.querySelectorAll('.distance-item');
            
            distanceItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                item.style.transition = 'all 0.5s ease';
                
                const distanceObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateX(0)';
                            }, index * 100);
                            distanceObserver.unobserve(item);
                        }
                    });
                }, { threshold: 0.2 });
                
                distanceObserver.observe(item);
            });

            // Logo Hover Effect
            const logo = document.querySelector('.logo');
            if (logo) {
                logo.addEventListener('mouseenter', function() {
                    const icon = this.querySelector('.logo-icon i');
                    if (icon) {
                        icon.style.transform = 'rotate(360deg)';
                    }
                });
                
                logo.addEventListener('mouseleave', function() {
                    const icon = this.querySelector('.logo-icon i');
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                });
            }

            // Contact Card Tilt Effect
            const contactCard = document.querySelector('.contact-card');
            if (contactCard) {
                contactCard.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    
                    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                });
                
                contactCard.addEventListener('mouseleave', function() {
                    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                });
            }

            // Page Load Animation
            window.addEventListener('load', function() {
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    document.body.style.opacity = '1';
                }, 100);
            });

            // Add staggered animation to footer links
            const footerLinks = document.querySelectorAll('.footer-section ul li');
            footerLinks.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(10px)';
                link.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, 100 + (index * 50));
            });
        });
