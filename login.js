        document.addEventListener('DOMContentLoaded', function() {
            // Create floating particles
            createParticles();
            
            // Password toggle
            const togglePassword = document.getElementById('togglePassword');
            const password = document.getElementById('password');
            
            togglePassword.addEventListener('click', function() {
                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                password.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
            });
            
            // Form submission
            const loginForm = document.getElementById('loginForm');
            const loginBtn = document.getElementById('loginBtn');
            
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show loading state
                loginBtn.classList.add('loading');
                
                // Simulate login process
                setTimeout(() => {
                    // In a real app, you would check credentials here
                    loginBtn.classList.remove('loading');
                    
                    // Show success state (in a real app, redirect or show message)
                    alert('Login successful! Welcome to ScolariOfficial Dashboard.');
                window.location.href = 'https://scolariofficial-website-store.vercel.app/toolscpm.html';
                }, 2500);
            });
            
            // 3D Tilt Effect
            const loginCard = document.getElementById('loginCard');
            
            loginCard.addEventListener('mousemove', (e) => {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                loginCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-10px)`;
            });
            
            loginCard.addEventListener('mouseleave', () => {
                loginCard.style.transform = 'rotateY(0) rotateX(0) translateY(-10px)';
            });
            
            // FIXED: Create Account Link Redirect
            const createAccountLink = document.getElementById('createAccountLink');
            createAccountLink.addEventListener('click', function(e) {
                e.preventDefault();
                // Redirect to registration page
                window.location.href = 'https://scolariofficial-website-store.vercel.app/register.html';
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