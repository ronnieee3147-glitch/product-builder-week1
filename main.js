
const generateBtn = document.getElementById('generate-btn');
const numbersContainer = document.querySelector('.numbers-container');
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.textContent = '라이트 모드';
} else {
    themeBtn.textContent = '다크 모드';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        themeBtn.textContent = '라이트 모드';
        localStorage.setItem('theme', 'dark');
    } else {
        themeBtn.textContent = '다크 모드';
        localStorage.setItem('theme', 'light');
    }
});

function generateLottoSet() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

generateBtn.addEventListener('click', () => {
    numbersContainer.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const setDiv = document.createElement('div');
        setDiv.classList.add('number-set');
        
        const setLabel = document.createElement('span');
        setLabel.classList.add('set-label');
        setLabel.textContent = `게임 ${i + 1}: `;
        setDiv.appendChild(setLabel);

        const numbers = generateLottoSet();
        for (const number of numbers) {
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('number');
            numberDiv.textContent = number;
            setDiv.appendChild(numberDiv);
        }
        numbersContainer.appendChild(setDiv);
    }
});
