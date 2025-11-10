        document.addEventListener('DOMContentLoaded', function() {
            // Create floating particles
            createParticles();
            
            // Password toggle
            const togglePassword = document.getElementById('togglePassword');
            const password = document.getElementById('password');
            const togglePassword2 = document.getElementById('togglePassword2');
            const password2 = document.getElementById('password2');
            
            togglePassword.addEventListener('click', function() {
                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                password.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
            });
            
            togglePassword2.addEventListener('click', function() {
                const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
                password2.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
            });
            
            // Form submission
            const registerForm = document.getElementById('registerForm');
            const registerBtn = document.getElementById('registerBtn');
            
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show loading state
                registerBtn.classList.add('loading');
                
                // Simulate registration process
                setTimeout(() => {
                    registerBtn.classList.remove('loading');
                    alert('Registration successful! Welcome to ScolariOfficial.');
                }, 2500);
            });
            
            // 3D Tilt Effect
            const registerCard = document.getElementById('registerCard');
            
            registerCard.addEventListener('mousemove', (e) => {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                registerCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-10px)`;
            });
            
            registerCard.addEventListener('mouseleave', () => {
                registerCard.style.transform = 'rotateY(0) rotateX(0) translateY(-10px)';
            });
            
            // Login Link Redirect
            const loginLink = document.getElementById('loginLink');
            loginLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = '/#login';
            });
            
            // Create floating particles function
            function createParticles() {
                const animatedBg = document.querySelector('.animated-bg');
                const particleCount = 50;
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');
                    
                    // Random properties
                    const size = Math.random() * 6 + 2;
                    const posX = Math.random() * 100;
                    const delay = Math.random() * 20;
                    const duration = Math.random() * 10 + 15;
                    
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    particle.style.left = `${posX}%`;
                    particle.style.animationDelay = `${delay}s`;
                    particle.style.animationDuration = `${duration}s`;
                    
                    // Random gradient
                    const gradients = [
                        'linear-gradient(135deg, #6366f1, #10b981)',
                        'linear-gradient(135deg, #10b981, #f59e0b)',
                        'linear-gradient(135deg, #f59e0b, #6366f1)',
                        'linear-gradient(135deg, #ef4444, #6366f1)'
                    ];
                    particle.style.background = gradients[Math.floor(Math.random() * gradients.length)];
                    
                    animatedBg.appendChild(particle);
                }
            }
        });