// የሶስት ሰረዝ ምልክቱን እና የናቭ ባሩን መምረጥ
const menuIcon = document.querySelector('.menu-icon');
const navBar = document.querySelector('.nav-bar');

// ምልክቱ ሲጫን (Click ሲደረግ) የ 'active' ክላስን ይጨምራል ወይም ያጠፋል
menuIcon.addEventListener('click', () => {
    navBar.classList.toggle('active');
});
document.addEventListener("DOMContentLoaded", function () {
    const readMoreBtn = document.getElementById("readMoreBtn");
    const moreContent = document.getElementById("moreAboutContent");

    readMoreBtn.addEventListener("click", function () {
        // ክላሱን 'show' በመቀያየር ይዘቱን መክፈት እና መዝጋት
        moreContent.classList.toggle("show");

        // በተኑ ላይ ያለውን ፅሁፍ እና ቀስት መቀየር
        if (moreContent.classList.contains("show")) {
            readMoreBtn.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
            // ይዘቱ ሲከፈት በራስ ሰር በለስላሳ ሁኔታ ወደ ታች ይሸብልላል
            setTimeout(() => {
                moreContent.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 300);
        } else {
            readMoreBtn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
            // ሲዘጋ ወደ መጀመሪያው Who We Are ይመልሰዋል
            document.querySelector(".about-section").scrollIntoView({ behavior: "smooth" });
        }
    });
});

   // --- PROPERTIES 3-COLUMNS ONE-BY-ONE SLIDER ---

let currentSlide = 0;
const propSlider = document.getElementById("propertiesSlider");

// በየ 4 ሰከንዱ በራሱ አንድ በአንድ እንዲያልፍ ማድረግ
let autoPropSlider = setInterval(() => {
    moveSlider('right');
}, 4000);

function moveSlider(direction) {
    const cards = document.querySelectorAll(".property-card");
    const totalCards = cards.length;
    
    // የአንድን ካርድ ሙሉ ስፋት ከነ ማርጂኑ (Gap) ጋር ማስላት
    const cardWidth = cards[0].offsetWidth;
    const style = window.getComputedStyle(cards[0]);
    const marginRight = parseFloat(style.marginRight);
    const stepDistance = cardWidth + marginRight; // አንድ ቤት ለማሳለፍ የሚጓዘው ርቀት

    // በስክሪኑ ላይ በአንዴ የሚታዩትን ቤቶች ብዛት ማወቅ (ለኮምፒውተር 3፣ ለታብሌት 2፣ ለስልክ 1)
    let visibleCards = 3;
    if (window.innerWidth <= 768) visibleCards = 1;
    else if (window.innerWidth <= 1024) visibleCards = 2;

    const maxSlides = totalCards - visibleCards;

    if (direction === 'right') {
        currentSlide++;
        if (currentSlide > maxSlides) {
            currentSlide = 0; // መጨረሻ ሲደርስ ወደ መጀመሪያው ይመለሳል
        }
    } else {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = maxSlides;
        }
    }

    // ስላይደሩን በአንድ ቤት ርቀት ብቻ ማንቀሳቀስ
    propSlider.style.transform = `translateX(-${currentSlide * stepDistance}px)`;

    // ሰው ቀስቱን ሲነካው አውቶማቲክ መቁጠሪያውን አድሶ ከ 4 ሰከንድ በኋላ እንዲያስቆጥር
    clearInterval(autoPropSlider);
    autoPropSlider = setInterval(() => { moveSlider('right'); }, 4000);
}

// ስክሪኑ ሲሰፋ ወይም ሲጠበብ (Resize ሲሆን) ስላይደሩ እንዳይበላሽ ማስተካከያ
window.addEventListener('resize', () => {
    currentSlide = 0;
    propSlider.style.transform = `translateX(0px)`;
});
 // --- ዲቴልስ DETAILS MODAL DATA & LOGIC ---

// የስድስቱ ቤቶች ዝርዝር መረጃዎች (ባለ 20 አመት ልምድ እና ጥራትን የሚገልጹ ሀሳቦች)
const propertyData = {
    1: {
        title: "Dani Luxury Villa",
        location: "Bole Atlas, Addis Ababa",
        price: "$450,000",
        img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80",
        beds: "4 Beds", baths: "3 Baths", size: "350 ㎡",
        desc: "This magnificent villa represents our 20-year legacy in construction excellence. Located in the elite neighborhood of Bole Atlas, it features a fully automated smart home system, a premium European modular kitchen, high-security perimeter walls, and a dedicated servant quarter. Perfect for luxury family living with verified legal bankable deeds."
    },
    2: {
        title: "Premium Modern Apartment",
        location: "Kazanchis, Addis Ababa",
        price: "$2,500 / mo",
        img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
        beds: "2 Beds", baths: "2 Baths", size: "140 ㎡",
        desc: "An executive apartment ideal for professionals and diplomats. Located in the heart of Kazanchis, just minutes away from the UNECA. Features include 24/7 backup generator, high-speed elevator, continuous water supply with large reserve tanks, and top-tier security monitoring. Enjoy scenic city views from the private balcony."
    },
    3: {
        title: "Elite Royal Penthouse",
        location: "Old Airport, Addis Ababa",
        price: "$850,000",
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
        beds: "5 Beds", baths: "5 Baths", size: "500 ㎡",
        desc: "The pinnacle of high-end real estate craftsmanship. This massive penthouse spans the top floors, providing 360-degree views of Addis Ababa. Includes private terrace, premium jacuzzi, separate family and chef kitchens, and private elevator access. Designed with imported marble floors and built to withstand decades of timeless perfection."
    },
    4: {
        title: "Dani Smart Mansion",
        location: "CMC, Addis Ababa",
        price: "$620,000",
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        beds: "4 Beds", baths: "4 Baths", size: "400 ㎡",
        desc: "A breathtaking contemporary mansion in the quiet residential zone of CMC. Equipped with state-of-the-art green energy solar backup, rainwater harvesting, biometric security doors, and underfloor heating. A marvelous architectural piece crafted by Dani Real Estate's premier design team."
    },
    5: {
        title: "Urban Luxury Condo",
        location: "Meskel Square, Addis Ababa",
        price: "$3,800 / mo",
        img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
        beds: "3 Beds", baths: "2 Baths", size: "180 ㎡",
        desc: "Live where the action is. This upscale condominium offers an unmatched urban lifestyle at Meskel Square. Steps away from luxury shopping malls and restaurants. Includes access to a shared premium gym, indoor swimming pool, underground secured parking, and 24-hour concierge desk service."
    },
    6: {
        title: "Minimalist Comfort Villa",
        location: "Lebu, Addis Ababa",
        price: "$390,000",
        img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
        beds: "3 Beds", baths: "3 Baths", size: "280 ㎡",
        desc: "Designed with modern minimalist aesthetics, focusing on open spatial distribution, large floor-to-ceiling windows, and natural lighting. Located in a peaceful gated community in Lebu. It offers a secure playground for children, low-maintenance private garden, and high-quality durable finishing materials."
    }
};

// ፖፕአፑን የመክፈቻ ተግባር (Function)
function openDetails(id) {
    const modal = document.getElementById("propertyModal");
    const data = propertyData[id];

    if (data) {
        // የፖፕአፑን መረጃዎች በየቤቱ መተካት
        document.getElementById("modalImg").src = data.img;
        document.getElementById("modalTitle").innerText = data.title;
        document.getElementById("modalLocation").innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.location}`;
        document.getElementById("modalPrice").innerText = data.price;
        document.getElementById("modalBeds").innerHTML = `<i class="fas fa-bed"></i> ${data.beds}`;
        document.getElementById("modalBaths").innerHTML = `<i class="fas fa-bath"></i> ${data.baths}`;
        document.getElementById("modalSize").innerHTML = `<i class="fas fa-ruler-combined"></i> ${data.size}`;
        document.getElementById("modalDesc").innerText = data.desc;

        // ፖፕአፑን ማሳየት
        modal.style.display = "flex";
        // ፖፕአፑ ሲከፈት የጀርባው ገጽ እንዳይንቀሳቀስ (scroll እንዳይሆን) ማገድ
        document.body.style.overflow = "hidden";
    }
}

// ፖፕአፑን የመዝጊያ ተግባር
function closeDetails() {
    const modal = document.getElementById("propertyModal");
    modal.style.display = "none";
    // ገጹን ወደ ነበረበት መመለስ
    document.body.style.overflow = "auto";
}

// ተጠቃሚው ከሳጥኑ ውጭ ጥቁሩን ገጽ ሲነካ በራሱ እንዲዘጋ ማድረግ
window.onclick = function(event) {
    const modal = document.getElementById("propertyModal");
    if (event.target == modal) {
        closeDetails();
    }
}
//about detail

// ==========================================
// TESTIMONIAL SLIDER LOGIC
// ==========================================
let currentTestimonialSlide = 0;

function moveTestimonial(direction) {
    const slider = document.getElementById("testimonialSlider");
    const cards = slider.querySelectorAll(".testimonial-card");
    if (!cards.length || !slider) return;

    // የአንድ ካርድ ስፋት እና ማርጅን ማስላት
    const cardWidth = cards[0].offsetWidth;
    const stepDistance = cardWidth + 20; // 20px ማርጅኑ ነው
    
    // በኮምፒውተር ላይ በአንድ ጊዜ 2 ካርድ ይታያል
    const maxSlides = cards.length - 2; 

    if (direction === 'right') {
        currentTestimonialSlide++;
        if (currentTestimonialSlide > maxSlides) currentTestimonialSlide = 0;
    } else {
        currentTestimonialSlide--;
        if (currentTestimonialSlide < 0) currentTestimonialSlide = maxSlides;
    }

    slider.style.transform = `translateX(-${currentTestimonialSlide * stepDistance}px)`;
}

