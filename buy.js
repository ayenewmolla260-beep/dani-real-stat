// Favorite Button
const hearts = document.querySelectorAll(".fa-heart");

hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
        heart.classList.toggle("active");
    });
});

// Search
const searchInput = document.querySelector(".search-box input");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();

        if(text.includes(value)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }
    });
});

// Animation
window.addEventListener("load", () => {

    cards.forEach((card,index)=>{

        card.style.opacity="0";
        card.style.transform="translateY(40px)";

        setTimeout(()=>{

            card.style.transition=".6s";
            card.style.opacity="1";
            card.style.transform="translateY(0)";

        },index*250);

    });

});
// =========================
// Image Slider
// =========================

const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let current = 0;

function showSlide(index){

    slides.forEach((slide)=>{
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");
}

next.addEventListener("click",()=>{

    current++;

    if(current >= slides.length){
        current = 0;
    }

    showSlide(current);

});

prev.addEventListener("click",()=>{

    current--;

    if(current < 0){
        current = slides.length - 1;
    }

    showSlide(current);

});


// Auto Slide
setInterval(() => {

    current++;

    if (current >= slides.length) {
        current = 0;
    }

    showSlide(current);

}, 2000);