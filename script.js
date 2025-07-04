document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'particles.json', function() {
            console.log('Particles.js loaded');
        });
    }

    // Set dynamic stats
    document.getElementById('server-count').textContent = hyperConfig.stats.servers.toLocaleString() + '+';
    document.getElementById('user-count').textContent = hyperConfig.stats.users.toLocaleString() + '+';
    document.getElementById('command-count').textContent = hyperConfig.stats.commands + '+';

    // Handle invite buttons
    const inviteButtons = document.querySelectorAll('#invite-btn, #main-invite, #docs-invite');
    inviteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(hyperConfig.inviteURL, '_blank');
        });
    });

    // Handle support buttons
    const supportButtons = document.querySelectorAll('#support-btn');
    supportButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(hyperConfig.supportURL, '_blank');
        });
    });

    // Nav toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        });
    }

    // Load commands on commands.html
    if (document.querySelector('.commands-grid')) {
        loadCommands();
        setupCommandSearch();
    }

    // Docs sidebar navigation
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Copy code blocks
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const codeBlock = this.parentElement.querySelector('code');
            navigator.clipboard.writeText(codeBlock.textContent);
            
            const originalIcon = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
                this.innerHTML = originalIcon;
            }, 2000);
        });
    });
});

function loadCommands() {
    const commandsGrid = document.getElementById('commands-grid');
    if (!commandsGrid) return;

    let html = '';
    for (const category in hyperConfig.commands) {
        hyperConfig.commands[category].forEach(cmd => {
            html += `
                <div class="command-card" data-category="${category}">
                    <div class="command-header">
                        <h3>/${cmd.name}</h3>
                        <span class="command-category">${category}</span>
                    </div>
                    <p class="command-desc">${cmd.description}</p>
                    <div class="command-usage">
                        <code>${cmd.usage}</code>
                        <button class="copy-btn"><i class="fas fa-copy"></i></button>
                    </div>
                </div>
            `;
        });
    }

    commandsGrid.innerHTML = html;
    
    // Add event listeners to new copy buttons
    document.querySelectorAll('.command-usage .copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const code = this.parentElement.querySelector('code').textContent;
            navigator.clipboard.writeText(code);
            
            const originalIcon = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
                this.innerHTML = originalIcon;
            }, 2000);
        });
    });
}

function setupCommandSearch() {
    const searchInput = document.getElementById('command-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const commandCards = document.querySelectorAll('.command-card');

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        commandCards.forEach(card => {
            const commandName = card.querySelector('h3').textContent.toLowerCase();
            const commandDesc = card.querySelector('.command-desc').textContent.toLowerCase();
            
            if (commandName.includes(searchTerm) || commandDesc.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Filter functionality
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            commandCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
