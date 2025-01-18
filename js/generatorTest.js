document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const passwordOutput = document.getElementById('passwordOutput'); // this is the password 
    const lengthSlider = document.getElementById('lengthSlider');
    const lengthValue = document.getElementById('lengthValue');
    const uppercaseCheckbox = document.getElementById('uppercase'); // this is the uppercase checkbox
    const numbersCheckbox = document.getElementById('numbers'); // this is the numbers checkbox
    const symbolsCheckbox = document.getElementById('symbols'); // this is the symbols checkbox
    const generateButton = document.getElementById('generateButton'); // this is the generate button
    const copyButton = document.getElementById('copyButton'); // this is the copy button

    // Charater sets
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Update the length value display
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

        for(let i = 0; i < lengthSlider.value; i++){
            password += chars[Math.floor(Math.random() * chars.length)]
        }
        
        
        
        
    }

    generatePassword();


});