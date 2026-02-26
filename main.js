
const generateBtn = document.getElementById('generate-btn');
const numbersContainer = document.querySelector('.numbers-container');
const menuResult = document.getElementById('menu-result');
const themeBtn = document.getElementById('theme-btn');
const imageContainer = document.getElementById('image-container');
const menuImage = document.getElementById('menu-image');
const body = document.body;

const dinnerMenus = [
    "김치찌개", "된장찌개", "부대찌개", "비빔밥", "제육볶음", "돈까스", "치킨", "피자", 
    "삼겹살", "소고기", "초밥", "라멘", "마라탕", "쌀국수", "파스타", "스테이크", 
    "떡볶이", "짜장면", "짬뽕", "탕수육", "보쌈", "족발", "햄버거", "샌드위치",
    "샐러드", "냉면", "칼국수", "수제비", "닭갈비", "곱창", "회", "카레"
];

const menuPrompts = {
    "김치찌개": "Kimchi stew, korean food, delicious, hot pot",
    "된장찌개": "Doenjang jjigae, korean bean paste stew, tofu, vegetables",
    "부대찌개": "Budae jjigae, army stew, sausage, ramen noodles, korean spicy soup",
    "비빔밥": "Bibimbap, mixed rice with vegetables and egg, korean traditional food",
    "제육볶음": "Jeyuk bokkeum, spicy stir-fried pork, korean food",
    "돈까스": "Pork cutlet, tonkatsu, japanese food, crispy fried pork",
    "치킨": "Korean fried chicken, crispy, golden brown, delicious",
    "피자": "Pizza, cheesy, pepperoni, italian food, delicious",
    "삼겹살": "Samgyeopsal, grilled pork belly, korean bbq, lettuce wrap",
    "소고기": "Grilled beef, steak, bbq, high quality meat",
    "초밥": "Sushi, fresh raw fish on rice, japanese food, platter",
    "라멘": "Ramen, japanese noodle soup, pork broth, egg, chashu",
    "마라탕": "Malatang, spicy hot pot, chinese food, vegetables, noodles",
    "쌀국수": "Pho, vietnamese noodle soup, beef, herbs, rice noodles",
    "파스타": "Pasta, spaghetti, tomato sauce, italian food, basil",
    "스테이크": "Steak, grilled beef, medium rare, gourmet food",
    "떡볶이": "Tteokbokki, spicy rice cakes, korean street food, red sauce",
    "짜장면": "Jajangmyeon, black bean noodles, korean chinese food",
    "짬뽕": "Jjamppong, spicy seafood noodle soup, korean chinese food",
    "탕수육": "Tangsuyuk, sweet and sour pork, korean chinese food, crispy",
    "보쌈": "Bossam, boiled pork wraps, korean food, kimchi",
    "족발": "Jokbal, braised pig's trotters, korean food, soy sauce glaze",
    "햄버거": "Hamburger, juicy beef patty, lettuce, tomato, cheese, fast food",
    "샌드위치": "Sandwich, fresh bread, lettuce, ham, cheese, healthy lunch",
    "샐러드": "Salad, fresh vegetables, healthy food, green leaves, tomatoes",
    "냉면": "Naengmyeon, cold buckwheat noodles, korean summer food, icy broth",
    "칼국수": "Kalguksu, korean knife-cut noodle soup, seafood broth",
    "수제비": "Sujebi, korean hand-pulled dough soup, vegetables",
    "닭갈비": "Dakgalbi, spicy stir-fried chicken, korean food, cabbage",
    "곱창": "Gopchang, grilled beef intestines, korean bbq, savory",
    "회": "Sashimi, fresh raw fish platter, korean style raw fish",
    "카레": "Curry rice, japanese curry, golden sauce, vegetables"
};

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
    
    // Pollinations AI를 사용하여 이미지 생성
    const prompt = menuPrompts[mainRecommendation] || `${mainRecommendation} food, delicious meal, high quality photo`;
    // 랜덤 시드를 추가하여 같은 메뉴라도 매번 다른 이미지가 나오도록 함
    const randomSeed = Math.floor(Math.random() * 1000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&seed=${randomSeed}`;
    
    // 이미지 로딩 중 표시 (선택 사항)
    menuImage.src = imageUrl;
    imageContainer.classList.remove('hidden');

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

