document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const passwordOutput = document.getElementById('passwordOutput');
    const lengthSlider = document.getElementById('lengthSlider');
    const lengthValue = document.getElementById('lengthValue');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');
    const strengthProgress = document.getElementById('strengthProgress');
    const strengthLabel = document.getElementById('strengthLabel');
    const notification = document.getElementById('notification');

    // Character sets
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Update length value display
    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });

    // Generate password
    function generatePassword() {
        let chars = lowercase;
        let password = '';

        // Add selected character sets
        if (uppercaseCheckbox.checked) chars += uppercase;
        if (numbersCheckbox.checked) chars += numbers;
        if (symbolsCheckbox.checked) chars += symbols;

        // Generate password
        const length = lengthSlider.value;
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }

        // Ensure at least one character from each selected set
        if (uppercaseCheckbox.checked) {
            const pos = Math.floor(Math.random() * length);
            password = password.substring(0, pos) + 
                      uppercase[Math.floor(Math.random() * uppercase.length)] + 
                      password.substring(pos + 1);
        }
        if (numbersCheckbox.checked) {
            const pos = Math.floor(Math.random() * length);
            password = password.substring(0, pos) + 
                      numbers[Math.floor(Math.random() * numbers.length)] + 
                      password.substring(pos + 1);
        }
        if (symbolsCheckbox.checked) {
            const pos = Math.floor(Math.random() * length);
            password = password.substring(0, pos) + 
                      symbols[Math.floor(Math.random() * symbols.length)] + 
                      password.substring(pos + 1);
        }

        return password;
    }

    // Add password strength checker function
    function checkPasswordStrength(password) {
        let strength = 0;
        
        // Length check
        if (password.length >= 12) strength += 1;
        if (password.length >= 16) strength += 1;
        
        // Character variety checks
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update strength meter
        strengthProgress.className = 'strength-progress';
        if (strength <= 2) {
            strengthProgress.classList.add('weak');
            strengthLabel.textContent = 'Weak';
        } else if (strength <= 4) {
            strengthProgress.classList.add('medium');
            strengthLabel.textContent = 'Medium';
        } else {
            strengthProgress.classList.add('strong');
            strengthLabel.textContent = 'Strong';
        }
    }

    // Update generate button click handler
    generateButton.addEventListener('click', function() {
        const password = generatePassword();
        passwordOutput.value = password;
        passwordOutput.classList.add('fade-in');
        setTimeout(() => passwordOutput.classList.remove('fade-in'), 500);
        
        // Check and display password strength
        checkPasswordStrength(password);
    });

    // Update copy button click handler
    copyButton.addEventListener('click', function() {
        passwordOutput.select();
        document.execCommand('copy');
        
        // Visual feedback for copy button
        const originalSvg = this.innerHTML;
        this.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        `;
        
        // Show notification
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            this.innerHTML = originalSvg;
        }, 2000);
    });

    // Generate initial password
    generateButton.click();
}); 