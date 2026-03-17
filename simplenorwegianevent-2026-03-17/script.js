// SmplCo Prototype JavaScript - Norwegian UX Optimized
let clickCount = 0;
const maxClicks = 3;

// Three.js 3D Visualization Setup
let scene, camera, renderer, globe, animationId;

function initThreeJS() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / 300, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threejs-canvas'), alpha: true });
    
    const canvas = document.getElementById('threejs-canvas');
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    
    // Create glowing globe
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x4299e1,
        transparent: true,
        opacity: 0.8,
        wireframe: true
    });
    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    
    // Add Norway highlight (approximate position)
    const norwayGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const norwayMaterial = new THREE.MeshBasicMaterial({ color: 0xff6b6b });
    const norwayMarker = new THREE.Mesh(norwayGeometry, norwayMaterial);
    
    // Position marker roughly where Norway would be on globe
    norwayMarker.position.set(0.2, 0.8, 0.5);
    scene.add(norwayMarker);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    camera.position.z = 3;
    
    animate();
}

function animate() {
    animationId = requestAnimationFrame(animate);
    
    // Rotate the globe
    if (globe) {
        globe.rotation.y += 0.005;
    }
    
    renderer.render(scene, camera);
}

// Initialize Three.js when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initThreeJS, 100); // Small delay to ensure canvas is ready
});

// Handle window resize
window.addEventListener('resize', function() {
    if (renderer && camera) {
        const canvas = document.getElementById('threejs-canvas');
        const rect = canvas.getBoundingClientRect();
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.setSize(rect.width, rect.height);
    }
});

// Track user flow for Andy's 3-click rule
function trackClick(action) {
    clickCount++;
    console.log(`Click ${clickCount}: ${action}`);
    
    // Show success if under 3 clicks and reaching value
    if (clickCount <= maxClicks && action.includes('value')) {
        showSuccess();
    }
}

// Start user flow (Click 1)
function startUserFlow() {
    trackClick('User started flow - showing main features');
    
    // Scroll to features section smoothly
    document.querySelector('.main-feature').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    // Highlight feature cards
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.3)';
        }, index * 200);
    });
}

// Feature interactions (Click 2)
function showFeature1() {
    trackClick('Feature 1 selected - Norwegian simplicity');
    
    // Update hero content
    updateHeroContent(
        '🚀 Norsk Enkelhet i Praksis',
        'Se hvordan vi gjør komplekse ting superenkel for norske brukere. Ingen opplæring nødvendig!'
    );
    
    // Show specific content
    showFeatureDetails('Designet for bestemor-testen. Intuitivt grensesnitt som følger norske designprinsipper.');
}

function showFeature2() {
    trackClick('Feature 2 selected - Norwegian cultural fit');
    
    updateHeroContent(
        '🇳🇴 Laget Spesielt for Norge',
        'Kulturelt tilpasset, norsk språkstøtte, og forståelse for hvordan nordmenn liker å jobbe.'
    );
    
    showFeatureDetails('Ultra-simple event creation for Norwegian communities');
}

function showVMFeature() {
    trackClick('VM 2026 feature selected - sports opportunity');
    
    updateHeroContent(
        '⚽ VM 2026 Muligheten',
        'Perfekt timing for Verdensmesterskapet 2026 - få være med fra starten!'
    );
    
    showFeatureDetails('Unike forretningsmuligheter knyttet til VM 2026. Første til markedet med norsk perspektiv.');
}

// Update hero content dynamically  
function updateHeroContent(title, description) {
    const hero = document.querySelector('.hero');
    hero.style.background = 'linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)';
    hero.style.transform = 'scale(1.02)';
    
    const h2 = hero.querySelector('h2');
    const valueProp = hero.querySelector('.value-prop');
    
    h2.textContent = title;
    valueProp.textContent = description;
    
    // Show call to action for next step
    setTimeout(() => {
        const ctaButton = hero.querySelector('.cta-button');
        ctaButton.textContent = '✨ Se Resultat (Klikk 3)';
        ctaButton.onclick = () => showValueDelivered();
    }, 1000);
}

// Show feature details
function showFeatureDetails(details) {
    // Create or update details section
    let detailsSection = document.getElementById('feature-details');
    if (!detailsSection) {
        detailsSection = document.createElement('div');
        detailsSection.id = 'feature-details';
        detailsSection.className = 'feature-details';
        detailsSection.innerHTML = `
            <div class="container">
                <div class="details-card">
                    <h3>💡 Detaljer</h3>
                    <p id="details-text"></p>
                </div>
            </div>
        `;
        document.querySelector('.main-feature').appendChild(detailsSection);
        
        // Add CSS for details section
        const style = document.createElement('style');
        style.textContent = `
            .feature-details {
                margin: 2rem 0;
                animation: slideIn 0.5s ease-out;
            }
            .details-card {
                background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
                padding: 2rem;
                border-radius: 15px;
                border-left: 5px solid #e53e3e;
                box-shadow: 0 10px 25px rgba(229, 62, 62, 0.1);
            }
            @keyframes slideIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.getElementById('details-text').textContent = details;
    detailsSection.scrollIntoView({ behavior: 'smooth' });
}

// Show final value (Click 3 or less)
function showValueDelivered() {
    trackClick('value delivered - user reached goal');
    
    const resultsArea = document.getElementById('results');
    resultsArea.style.display = 'block';
    resultsArea.scrollIntoView({ behavior: 'smooth' });
    
    // Update metrics with actual click count
    const clickMetric = document.querySelector('.metric-number');
    clickMetric.textContent = clickCount;
    
    // Add success animation
    resultsArea.style.animation = 'successPulse 2s ease-out';
    
    // Show completion message
    setTimeout(() => {
        alert(`🎉 Gratulerer! Du nådde verdien på bare ${clickCount} klikk! \n\nDette oppfyller Andy's 3-klikk regel for brukervennlighet.`);
    }, 1500);
}

// Show success state
function showSuccess() {
    document.body.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
    
    // Add success CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes successPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        body.success {
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%) !important;
        }
    `;
    document.head.appendChild(style);
    document.body.classList.add('success');
}

// Norwegian keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.tagName === 'BUTTON') {
            focusedElement.click();
        }
    }
    
    // Norwegian accessibility: Æ, Ø, Å shortcuts
    if (event.key === 'æ' || event.key === 'Æ') {
        showFeature1(); // Æ = Enkelhet
    }
    if (event.key === 'ø' || event.key === 'Ø') {
        showFeature2(); // Ø = Norwegian
    }
});

// Mobile touch optimizations
let touchStartY = 0;
document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndY = e.changedTouches[0].clientY;
    const swipeDistance = touchStartY - touchEndY;
    
    // Swipe up to continue flow
    if (swipeDistance > 50) {
        if (clickCount === 0) {
            startUserFlow();
        } else if (clickCount === 1) {
            showFeature1();
        } else if (clickCount === 2) {
            showValueDelivered();
        }
    }
});

// Analytics for Andy
function trackAnalytics(event, data) {
    console.log(`📊 Analytics: ${event}`, data);
    // In production, this would send to analytics service
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SimpleNorwegianEvent prototype loaded');
    console.log('📱 Mobile-first design active');
    console.log('🇳🇴 Norwegian UX patterns enabled');
    console.log('✅ Grandmother test compliance: Active');
    console.log('🎯 Max clicks to value: 3');
    
    trackAnalytics('prototype_loaded', {
        prototype: 'SimpleNorwegianEvent',
        norwayFocused: true,
        vm2026Related: false,
        sessionId: 'unknown',
        timestamp: new Date().toISOString()
    });
});