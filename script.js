// Projects Data
const projectsData = [
    {
        id: 1,
        title: "Module Embarqué Drone Incendie",
        description: "Système embarqué autonome pour drone de lutte contre les incendies avec capteurs thermiques et transmission temps réel.",
        technologies: ["ESP32", "C/C++", "Capteurs Thermiques", "LoRa"],
        category: "IoT & Embedded",
        status: "Terminé"
    },
    {
        id: 2,
        title: "Système Brigade Cynophile",
        description: "Module de suivi et communication pour chiens de brigade avec localisation GPS et monitoring physiologique.",
        technologies: ["ESP32", "GPS", "BLE", "Python"],
        category: "IoT & Embedded",
        status: "Terminé"
    },
    {
        id: 3,
        title: "App Mobile Flutter + Stabilisation Vidéo",
        description: "Application mobile avec flux vidéo en temps réel et stabilisation d'image utilisant OpenCV.",
        technologies: ["Flutter", "OpenCV", "Python", "FFmpeg"],
        category: "Mobile & Vision",
        status: "Terminé"
    },
    {
        id: 4,
        title: "Transmission LoRa + Bluetooth",
        description: "Système de transmission longue portée combinant LoRa et BLE pour communication bidirectionnelle.",
        technologies: ["LoRa", "BLE", "ESP32", "C++"],
        category: "Communication",
        status: "Terminé"
    },
    {
        id: 5,
        title: "Système RFID avec ESP32",
        description: "Solution de contrôle d'accès et identification par RFID avec interface web de gestion.",
        technologies: ["ESP32", "RFID", "Web Server", "C++"],
        category: "IoT & Security",
        status: "Terminé"
    },
    {
        id: 6,
        title: "Calibration Capteurs Gaz",
        description: "Système de calibration et monitoring pour capteurs de gaz MQ-6 et H2S avec alertes en temps réel.",
        technologies: ["Arduino", "Capteurs MQ-6", "H2S", "Python"],
        category: "Sensors & Safety",
        status: "Terminé"
    }
];

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    loadProjects('Tous');
    initTypingEffect();
    initNavbar();
    initContactForm();
    setCurrentYear();
});

// Typing Effect
function initTypingEffect() {
    const text = "Ingénieur Électronique & Systèmes Embarqués";
    const typingElement = document.getElementById('typing-text');
    let index = 0;

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    type();
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}

// Smooth Scroll
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Load Projects
function loadProjects(category) {
    const projectsGrid = document.getElementById('projects-grid');
    const filteredProjects = category === 'Tous' 
        ? projectsData 
        : projectsData.filter(p => p.category === category);

    projectsGrid.innerHTML = '';

    filteredProjects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'card overflow-hidden group project-card';
        projectCard.style.animationDelay = `${index * 100}ms`;
        
        projectCard.innerHTML = `
            <div class="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                    <i data-lucide="layers" class="w-16 h-16 text-cyan-500/20 group-hover:text-cyan-500/40 transition-colors duration-300"></i>
                </div>
                <div class="absolute top-3 right-3">
                    <span class="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-md text-xs">
                        ${project.status}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl text-white group-hover:text-cyan-400 transition-colors duration-300 font-bold mb-2">
                    ${project.title}
                </h3>
                <span class="inline-block px-2 py-1 border border-blue-500/30 text-blue-400 rounded text-xs mb-4">
                    ${project.category}
                </span>
                <p class="text-gray-400 text-sm leading-relaxed mb-4">
                    ${project.description}
                </p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.technologies.map(tech => 
                        `<span class="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-cyan-400 text-xs font-mono">${tech}</span>`
                    ).join('')}
                </div>
                <button class="w-full px-4 py-2 border border-cyan-500/30 text-cyan-400 rounded-md hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center group">
                    Voir plus
                    <i data-lucide="external-link" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"></i>
                </button>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });

    lucide.createIcons();
}

// Filter Projects
function filterProjects(category) {
    // Update active button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category || 
            (category === 'Tous' && btn.textContent === 'Tous')) {
            btn.classList.add('active');
        }
    });

    // Load filtered projects
    loadProjects(category);
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        console.log('Form submitted:', formData);
        
        showToast('Message envoyé !', 'Je vous répondrai dès que possible.');
        
        form.reset();
    });
}

// Toast Notification
function showToast(title, description) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastDescription = document.getElementById('toast-description');
    
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    toast.classList.remove('hidden');
    toast.classList.add('toast-show');
    
    setTimeout(() => {
        toast.classList.remove('toast-show');
        toast.classList.add('hidden');
    }, 3000);
}

// Set Current Year
function setCurrentYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}
