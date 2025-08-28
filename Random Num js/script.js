class RandomNumberGenerator {
    constructor() {
        console.log('RandomNumberGenerator constructor called');
        this.history = [];
        this.currentNumber = null;
        this.isGenerating = false;
        
        console.log('Initializing event listeners...');
        this.initializeEventListeners();
        console.log('Loading theme...');
        this.loadTheme();
        console.log('Loading history...');
        this.loadHistory();
        console.log('Updating stats...');
        this.updateStats();
        console.log('RandomNumberGenerator initialized successfully');
    }

    initializeEventListeners() {
        // Generate single number
        const generateBtn = document.getElementById('generate-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                console.log('Generate button clicked!');
                this.generateNumber();
            });
        } else {
            console.error('Generate button not found!');
        }

        // Generate multiple numbers
        const generateMultipleBtn = document.getElementById('generate-multiple-btn');
        if (generateMultipleBtn) {
            generateMultipleBtn.addEventListener('click', () => {
                this.generateMultipleNumbers();
            });
        }

        // Clear history
        document.getElementById('clear-history-btn').addEventListener('click', () => {
            this.clearHistory();
        });

        // Export history
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportHistory();
        });

        // Theme toggle
        document.getElementById('theme-btn').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Range validation
        document.getElementById('min-range').addEventListener('input', (e) => {
            this.validateRange();
        });

        document.getElementById('max-range').addEventListener('input', (e) => {
            this.validateRange();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                this.generateNumber();
            }
        });
    }

    validateRange() {
        const minInput = document.getElementById('min-range');
        const maxInput = document.getElementById('max-range');
        const min = parseInt(minInput.value);
        const max = parseInt(maxInput.value);

        if (min >= max) {
            maxInput.value = min + 1;
        }

        // Ensure reasonable limits
        if (min < -999999) minInput.value = -999999;
        if (max > 999999) maxInput.value = 999999;
    }

    generateNumber() {
        console.log('generateNumber method called');
        
        if (this.isGenerating) {
            console.log('Already generating, returning');
            return;
        }

        const min = parseInt(document.getElementById('min-range').value);
        const max = parseInt(document.getElementById('max-range').value);
        const excludeRepeats = document.getElementById('exclude-repeats').checked;
        const animate = document.getElementById('animate-numbers').checked;

        console.log('Values:', { min, max, excludeRepeats, animate });

        if (min >= max) {
            this.showNotification('Maximum must be greater than minimum', 'error');
            return;
        }

        this.isGenerating = true;
        const currentNumberElement = document.getElementById('current-number');

        if (animate) {
            console.log('Using animation');
            this.animateGeneration(currentNumberElement, min, max, excludeRepeats);
        } else {
            console.log('No animation, generating directly');
            const number = this.getRandomNumber(min, max, excludeRepeats);
            console.log('Generated number:', number);
            this.displayNumber(number);
            this.addToHistory(number, min, max);
            this.isGenerating = false; // Reset the flag when not animating
        }
    }

    animateGeneration(element, min, max, excludeRepeats) {
        const duration = 1000; // 1 second
        const steps = 20;
        const stepDuration = duration / steps;
        let currentStep = 0;

        element.classList.add('generating');

        const animation = setInterval(() => {
            if (currentStep < steps) {
                // Show random numbers during animation
                const tempNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                element.textContent = tempNumber;
                currentStep++;
            } else {
                // Final number
                clearInterval(animation);
                element.classList.remove('generating');
                
                const finalNumber = this.getRandomNumber(min, max, excludeRepeats);
                this.displayNumber(finalNumber);
                this.addToHistory(finalNumber, min, max);
                
                this.isGenerating = false;
            }
        }, stepDuration);
    }

    getRandomNumber(min, max, excludeRepeats) {
        console.log('getRandomNumber called with:', { min, max, excludeRepeats });
        
        if (excludeRepeats && this.history.length > 0) {
            const availableNumbers = [];
            for (let i = min; i <= max; i++) {
                if (!this.history.some(item => item.number === i)) {
                    availableNumbers.push(i);
                }
            }
            
            if (availableNumbers.length === 0) {
                this.showNotification('No more unique numbers available in this range', 'warning');
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            
            const result = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
            console.log('Generated unique number:', result);
            return result;
        }
        
        const result = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log('Generated random number:', result);
        return result;
    }

    displayNumber(number) {
        console.log('displayNumber called with:', number);
        this.currentNumber = number;
        const currentNumberElement = document.getElementById('current-number');
        
        if (currentNumberElement) {
            currentNumberElement.textContent = number;
            console.log('Number displayed successfully');
            
            // Add a subtle animation effect
            currentNumberElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                currentNumberElement.style.transform = 'scale(1)';
            }, 200);
        } else {
            console.error('Current number element not found!');
        }
    }

    generateMultipleNumbers() {
        const min = parseInt(document.getElementById('min-range').value);
        const max = parseInt(document.getElementById('max-range').value);
        const count = Math.min(10, max - min + 1); // Generate up to 10 numbers or max possible

        if (min >= max) {
            this.showNotification('Maximum must be greater than minimum', 'error');
            return;
        }

        const numbers = [];
        const excludeRepeats = document.getElementById('exclude-repeats').checked;

        for (let i = 0; i < count; i++) {
            const number = this.getRandomNumber(min, max, excludeRepeats);
            numbers.push(number);
            this.addToHistory(number, min, max);
        }

        this.displayNumber(numbers[numbers.length - 1]); // Show last number
        this.showNotification(`Generated ${count} numbers!`, 'success');
    }

    addToHistory(number, min, max) {
        console.log('addToHistory called with:', { number, min, max });
        
        const historyItem = {
            id: Date.now(),
            number: number,
            range: `${min} - ${max}`,
            timestamp: new Date().toLocaleString(),
            type: 'single'
        };

        this.history.unshift(historyItem);
        console.log('History item added:', historyItem);
        
        // Keep only last 50 items
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }

        this.saveHistory();
        this.updateStats();
        this.renderHistory();
        console.log('History updated successfully');
    }

    clearHistory() {
        if (this.history.length === 0) {
            this.showNotification('No history to clear', 'warning');
            return;
        }

        if (confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
            this.history = [];
            this.saveHistory();
            this.updateStats();
            this.renderHistory();
            this.showNotification('History cleared successfully!', 'success');
        }
    }

    exportHistory() {
        if (this.history.length === 0) {
            this.showNotification('No history to export', 'warning');
            return;
        }

        const csvContent = this.convertToCSV();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `random_numbers_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.showNotification('History exported successfully!', 'success');
        }
    }

    convertToCSV() {
        const headers = ['Number', 'Range', 'Timestamp'];
        const rows = this.history.map(item => [item.number, item.range, item.timestamp]);
        
        return [headers, ...rows]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');
    }

    updateStats() {
        const totalGenerated = this.history.length;
        const averageNumber = totalGenerated > 0 
            ? (this.history.reduce((sum, item) => sum + item.number, 0) / totalGenerated).toFixed(1)
            : 0;
        const highestNumber = totalGenerated > 0 
            ? Math.max(...this.history.map(item => item.number))
            : 0;
        const lowestNumber = totalGenerated > 0 
            ? Math.min(...this.history.map(item => item.number))
            : 0;

        document.getElementById('total-generated').textContent = totalGenerated;
        document.getElementById('average-number').textContent = averageNumber;
        document.getElementById('highest-number').textContent = highestNumber;
        document.getElementById('lowest-number').textContent = lowestNumber;
    }

    renderHistory() {
        const historyList = document.getElementById('history-list');
        
        if (this.history.length === 0) {
            historyList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-history"></i>
                    <p>No numbers generated yet. Generate your first number!</p>
                </div>
            `;
            return;
        }

        historyList.innerHTML = this.history.map(item => `
            <div class="history-item" data-id="${item.id}">
                <div class="history-info">
                    <div class="history-number">${item.number}</div>
                    <div class="history-details">Range: ${item.range}</div>
                </div>
                <div class="history-time">${item.timestamp}</div>
            </div>
        `).join('');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'warning'}-color);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: var(--shadow);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }

    toggleTheme() {
        const body = document.body;
        const themeBtn = document.getElementById('theme-btn');
        const icon = themeBtn.querySelector('i');
        
        if (body.getAttribute('data-theme') === 'light') {
            body.removeAttribute('data-theme');
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const themeBtn = document.getElementById('theme-btn');
        const icon = themeBtn.querySelector('i');
        
        if (savedTheme === 'light') {
            document.body.setAttribute('data-theme', 'light');
            icon.className = 'fas fa-sun';
        }
    }

    saveHistory() {
        localStorage.setItem('randomNumberHistory', JSON.stringify(this.history));
    }

    loadHistory() {
        const savedHistory = localStorage.getItem('randomNumberHistory');
        if (savedHistory) {
            this.history = JSON.parse(savedHistory);
            this.renderHistory();
        }
    }
}

// Initialize the random number generator when DOM is loaded
let randomNumberGenerator;
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing RandomNumberGenerator...');
    randomNumberGenerator = new RandomNumberGenerator();
    console.log('RandomNumberGenerator instance created:', randomNumberGenerator);
});
