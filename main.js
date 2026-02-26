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
    "김치찌개": "Photorealistic Kimchi stew, korean food, steaming hot pot, professional food photography, high resolution, 4k",
    "된장찌개": "Ultra-realistic Doenjang jjigae, korean soybean paste stew, tofu and vegetables, traditional korean pottery bowl, macro food photography",
    "부대찌개": "Photorealistic Budae jjigae, korean army stew with sausages and ramen, spicy red soup, steaming, professional food lighting",
    "비빔밥": "High resolution Bibimbap, colorful korean mixed rice with vegetables and egg, wooden bowl, authentic food photography",
    "제육볶음": "Realistic spicy stir-fried pork Jeyuk bokkeum, glistening sauce, korean side dishes, professional food styling",
    "돈까스": "Crispy pork cutlet tonkatsu, golden brown texture, macro photography, japanese restaurant style, high resolution",
    "치킨": "Golden crispy korean fried chicken, glistening texture, high resolution food photography, bokeh background",
    "피자": "Gourmet pepperoni pizza, melting cheese stretch, wood-fired oven crust, professional food photography",
    "삼겹살": "Sizzling grilled pork belly Samgyeopsal, korean bbq grill, lettuce and garlic, realistic texture, 4k photography",
    "소고기": "Premium grilled beef steak, succulent texture, medium rare, gourmet plating, professional studio lighting",
    "초밥": "Fresh assorted sushi platter, high resolution sashimi, japanese omakase style, macro food photography",
    "라멘": "Authentic japanese ramen, rich pork broth, soft boiled egg, steaming noodles, professional food photography",
    "마라탕": "Spicy Malatang hot pot, various vegetables and noodles, vibrant colors, realistic texture, high resolution",
    "쌀국수": "Vietnamese Pho beef noodle soup, fresh herbs, clear broth, realistic steam, professional food photography",
    "파스타": "Classic spaghetti pasta, tomato basil sauce, parmesan cheese, italian restaurant plating, realistic photo",
    "스테이크": "Juicy grilled ribeye steak, grill marks, herb butter, gourmet photography, high resolution",
    "떡볶이": "Korean spicy rice cakes Tteok볶이, glistening red sauce, steaming, street food photography, realistic",
    "짜장면": "Korean-Chinese black bean noodles Jajangmyeon, shiny black sauce, realistic texture, food photography",
    "짬뽕": "Spicy seafood noodle soup Jjamppong, mussels and shrimp, vibrant red soup, professional food photography",
    "탕수육": "Crispy sweet and sour pork Tangsuyuk, glistening glaze, golden fried, realistic food photo",
    "보쌈": "Tender boiled pork slices Bossam, fresh kimchi and lettuce, traditional korean setting, realistic photography",
    "족발": "Braised pig's trotters Jokbal, glistening soy glaze, sliced meat, authentic food photography",
    "햄버거": "Gourmet double cheeseburger, juicy beef, melting cheese, high resolution food photography, studio lighting",
    "샌드위치": "Fresh club sandwich, layers of turkey and lettuce, realistic texture, bright food photography",
    "샐러드": "Vibrant garden salad, fresh vegetables, balsamic dressing, high resolution, healthy food photography",
    "냉면": "Chilled buckwheat noodles Naengmyeon, icy broth, half egg topping, korean summer food photography, realistic",
    "칼국수": "Hand-cut noodle soup Kalguksu, seafood and zucchini, steaming bowl, realistic food texture",
    "수제비": "Korean hand-pulled dough soup Sujebi, clear vegetable broth, rustic wooden table, food photography",
    "닭갈비": "Spicy stir-fried chicken Dakgalbi, large iron pan, melting cheese, vibrant colors, realistic food photo",
    "곱창": "Sizzling grilled beef tripe Gopchang, golden brown, korean bbq style, realistic macro photography",
    "회": "Assorted raw fish sashimi platter, fresh translucent slices, japanese style presentation, high resolution photo",
    "카레": "Japanese style curry rice, rich brown sauce, carrots and potatoes, steaming, realistic food photography"
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
    const photoKeywords = "photorealistic, professional food photography, high quality, 4k, cinematic lighting";
    const prompt = menuPrompts[mainRecommendation] || `${mainRecommendation} food, ${photoKeywords}`;
    const randomSeed = Math.floor(Math.random() * 1000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true&seed=${randomSeed}`;
    
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
