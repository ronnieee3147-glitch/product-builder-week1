const generateBtn = document.getElementById('generate-btn');
const numbersContainer = document.querySelector('.numbers-container');
const menuResult = document.getElementById('menu-result');
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

const dinnerMenus = [
    "김치찌개", "된장찌개", "부대찌개", "비빔밥", "제육볶음", "돈까스", "치킨", "피자", 
    "삼겹살", "소고기", "초밥", "라멘", "마라탕", "쌀국수", "파스타", "스테이크", 
    "떡볶이", "짜장면", "짬뽕", "탕수육", "보쌈", "족발", "햄버거", "샌드위치",
    "샐러드", "냉면", "칼국수", "수제비", "닭갈비", "곱창", "회", "카레"
];

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

function getRandomMenus(count) {
    const shuffled = [...dinnerMenus].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

generateBtn.addEventListener('click', () => {
    const selectedMenus = getRandomMenus(5);
    const mainRecommendation = selectedMenus[0];
    const alternatives = selectedMenus.slice(1);

    menuResult.textContent = `오늘의 추천: ${mainRecommendation}`;
    
    numbersContainer.innerHTML = '';
    const otherLabel = document.createElement('div');
    otherLabel.style.marginBottom = '10px';
    otherLabel.style.fontWeight = 'bold';
    otherLabel.textContent = '다른 후보들:';
    numbersContainer.appendChild(otherLabel);

    const alternativeContainer = document.createElement('div');
    alternativeContainer.style.display = 'flex';
    alternativeContainer.style.flexWrap = 'wrap';
    alternativeContainer.style.justifyContent = 'center';
    alternativeContainer.style.gap = '10px';

    alternatives.forEach(menu => {
        const menuTag = document.createElement('div');
        menuTag.classList.add('menu-tag');
        menuTag.textContent = menu;
        alternativeContainer.appendChild(menuTag);
    });
    
    numbersContainer.appendChild(alternativeContainer);
});
