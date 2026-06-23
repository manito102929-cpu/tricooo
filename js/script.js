/**
 * ============================================================
 * BLUEGUARD - SCRIPT COMPLETO
 * Recarga de Extintores Profesional
 * ============================================================
 */

// ============================================================
// 1. HEADER - SCROLL EFFECT
// ============================================================
(function() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
})();

// ============================================================
// 2. HAMBURGER MENU (Mobile)
// ============================================================
(function() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            const isOpen = nav.classList.toggle('open');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', function(e) {
            if (!header.contains(e.target) && nav.classList.contains('open')) {
                nav.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
})();

// ============================================================
// 3. SCROLL SUAVE
// ============================================================
(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

// ============================================================
// 4. CONTADOR DE ESTADÍSTICAS
// ============================================================
(function() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    let current = 0;
                    const increment = Math.ceil(target / 60);
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            return;
                        }
                        counter.textContent = current;
                        requestAnimationFrame(updateCounter);
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
})();

// ============================================================
// 5. FAQ ACORDEÓN
// ============================================================
(function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            // Por defecto, abrir el primero
            if (item === faqItems[0]) {
                question.setAttribute('aria-expanded', 'true');
                answer.style.display = 'block';
            } else {
                answer.style.display = 'none';
            }
            
            question.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Cerrar todos
                faqItems.forEach(otherItem => {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherQuestion && otherAnswer) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.style.display = 'none';
                    }
                });
                
                // Abrir el actual si estaba cerrado
                if (!isExpanded) {
                    this.setAttribute('aria-expanded', 'true');
                    answer.style.display = 'block';
                }
            });
        }
    });
})();

// ============================================================
// 6. BACK TO TOP BUTTON
// ============================================================
(function() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
})();

// ============================================================
// 7. FORMULARIO DE CONTACTO
// ============================================================
(function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const telefono = document.getElementById('telefono');
        const mensaje = document.getElementById('mensaje');
        const consentData = document.getElementById('consent-data');
        const consentTerms = document.getElementById('consent-terms');
        const btnSubmit = document.getElementById('btn-submit');
        const btnText = document.getElementById('btn-text');
        const btnLoading = document.getElementById('btn-loading');
        const formSuccess = document.getElementById('form-success');
        
        // Limpiar errores al escribir
        [nombre, email, telefono, mensaje].forEach(input => {
            if (input) {
                input.addEventListener('input', function() {
                    const error = document.getElementById(`error-${this.id}`);
                    if (error) error.textContent = '';
                });
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validar nombre
            if (!nombre.value.trim()) {
                document.getElementById('error-nombre').textContent = 'El nombre es obligatorio.';
                isValid = false;
            } else if (nombre.value.trim().length < 2) {
                document.getElementById('error-nombre').textContent = 'El nombre debe tener al menos 2 caracteres.';
                isValid = false;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                document.getElementById('error-email').textContent = 'Ingresa un correo electrónico válido.';
                isValid = false;
            }
            
            // Validar teléfono
            const phoneRegex = /^[\d+\s-]{7,15}$/;
            if (!telefono.value.trim() || !phoneRegex.test(telefono.value.trim())) {
                document.getElementById('error-telefono').textContent = 'Ingresa un número de teléfono válido.';
                isValid = false;
            }
            
            // Validar mensaje
            if (!mensaje.value.trim()) {
                document.getElementById('error-mensaje').textContent = 'El mensaje es obligatorio.';
                isValid = false;
            } else if (mensaje.value.trim().length < 10) {
                document.getElementById('error-mensaje').textContent = 'El mensaje debe tener al menos 10 caracteres.';
                isValid = false;
            }
            
            // Validar checkboxes
            if (!consentData.checked || !consentTerms.checked) {
                alert('Debes aceptar los términos y condiciones para continuar.');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Simular envío
            btnText.classList.add('hidden');
            btnLoading.classList.remove('hidden');
            btnSubmit.disabled = true;
            
            // Recopilar datos
            const formData = {
                nombre: nombre.value.trim(),
                email: email.value.trim(),
                telefono: telefono.value.trim(),
                servicio: document.getElementById('servicio').value,
                mensaje: mensaje.value.trim()
            };
            
            console.log('📝 Datos del formulario:', formData);
            
            setTimeout(() => {
                btnText.classList.remove('hidden');
                btnLoading.classList.add('hidden');
                btnSubmit.disabled = false;
                
                contactForm.reset();
                formSuccess.classList.remove('hidden');
                formSuccess.classList.add('visible');
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Ocultar mensaje de éxito después de 8 segundos
                setTimeout(() => {
                    formSuccess.classList.remove('visible');
                    formSuccess.classList.add('hidden');
                }, 8000);
                
            }, 2500);
        });
    }
})();

// ============================================================
// 8. ANIMACIÓN DE ENTRADA
// ============================================================
(function() {
    const animateElements = document.querySelectorAll('.service-card, .step-card, .beneficio-card, .testimonio-card, .value-card');
    
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
})();

// ============================================================
// 9. NAVEGACIÓN ACTIVA POR SECCIÓN
// ============================================================
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.btn-nav)');
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.offsetHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });
    }
})();

// ============================================================
// 10. INICIALIZACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔵 BlueGuard - Recarga de Extintores Profesional');
    console.log('✅ Sitio cargado correctamente');
    
    // Verificar si hay mensaje de éxito visible al cargar
    const success = document.getElementById('form-success');
    if (success) {
        success.classList.remove('visible');
        success.classList.add('hidden');
    }
});