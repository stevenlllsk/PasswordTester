const passwordInput = document.getElementById('password');
const strengthBarInner = document.getElementById('strength-bar-inner');
const passwordStrengthText = document.getElementById('password-strength');
const crackTimeText = document.getElementById('crack-time');

passwordInput.addEventListener('input', checkPasswordStrength);

function checkPasswordStrength() {
    const password = passwordInput.value;
    let strength = 0;

    if (password.length >= 8) {
        strength += 1;
    }

    if (/[a-z]/.test(password)) {
        strength += 1;
    }

    if (/[A-Z]/.test(password)) {
        strength += 1;
    }

    if (/[0-9]/.test(password)) {
        strength += 1;
    }

    if (/[!@#$%^&*()_+={};':"|,.<>?]/.test(password)) {
        strength += 1;
    }

    let strengthBarWidth = (strength / 5) * 100;
    strengthBarInner.style.width = `${strengthBarWidth}%`;

    if (strength === 0) {
        passwordStrengthText.textContent = 'Weak';
        passwordStrengthText.style.color = '#f00';
    } else if (strength <= 2) {
        passwordStrengthText.textContent = 'Fair';
        passwordStrengthText.style.color = '#ff0';
    } else if (strength <= 4) {
        passwordStrengthText.textContent = 'Good';
        passwordStrengthText.style.color = '#0f0';
    } else {
        passwordStrengthText.textContent = 'Strong';
        passwordStrengthText.style.color = '#00f';
    }

    // Estimate time to crack
    let crackTime = estimateCrackTime(password);
    crackTimeText.textContent = crackTime;
}

function estimateCrackTime(password) {
    // Assume a cracking speed of 100,000 attempts per second
    const crackingSpeed = 100000;

    // Calculate the number of possible combinations
    let combinations = 1;
    if (/[a-z]/.test(password)) {
        combinations *= 26;
    }
    if (/[A-Z]/.test(password)) {
        combinations *= 26;
    }
    if (/[0-9]/.test(password)) {
        combinations *= 10;
    }
    if (/[!@#$%^&*()_+={};':"|,.<>?]/.test(password)) {
        combinations *= 32;
    }
    combinations = Math.pow(combinations, password.length);

    // Calculate the time to crack
    let timeToCrack = combinations / crackingSpeed;

    // Convert time to a human-readable format
    if (timeToCrack < 1) {
        return 'Instantly';
    } else if (timeToCrack < 60) {
        return `Less than 1 minute`;
    } else if (timeToCrack < 3600) {
        return `Less than 1 hour`;
    } else if (timeToCrack < 86400) {
        return `Less than 1 day`;
    } else if (timeToCrack < 604800) {
        return `Less than 1 week`;
    } else if (timeToCrack < 2629800) {
        return `Less than 1 month`;
    } else if (timeToCrack < 31557600) {
        return `Less than 1 year`;
    } else {
        return `More than 1 year`;
    }
}
