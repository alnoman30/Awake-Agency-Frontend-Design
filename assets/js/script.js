gsap.registerPlugin(ScrollTrigger, Flip);

// Navbar
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");

const menuBgSvg = document.querySelector(".menu-bg-svg");

let open = false;

// MAIN TIMELINE
const tl = gsap.timeline({ paused: true, reversed: true });

// Menu open animation
tl.to(mobileMenu, {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.4,
    ease: "power2.out"
})

// SVG background animation
.to(menuBgSvg, {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: "power3.out"
}, "-=0.2")

// Menu links animation
.fromTo(".mobile-menu a",
    {
        y: 20,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.4,
        ease: "power2.out"
    },
    "-=0.3"
);

// HAMBURGER ANIMATION
function openIcon() {
    gsap.to(line1, {
        y: 6,
        rotation: 45,
        transformOrigin: "center",
        duration: 0.3
    });

    gsap.to(line2, {
        opacity: 0,
        duration: 0.2
    });

    gsap.to(line3, {
        y: -6,
        rotation: -45,
        transformOrigin: "center",
        duration: 0.3
    });
}

function closeIcon() {
    gsap.to(line1, {
        y: 0,
        rotation: 0,
        duration: 0.3
    });

    gsap.to(line2, {
        opacity: 1,
        duration: 0.2
    });

    gsap.to(line3, {
        y: 0,
        rotation: 0,
        duration: 0.3
    });
}

// TOGGLE MENU
menuToggle.addEventListener("click", () => {
    open = !open;

    if (open) {
        tl.play();
        openIcon();
    } else {
        tl.reverse();
        closeIcon();
    }
});


// ──======================================= Smooth scroll (Lenis)======================================== ──
if (typeof Lenis !== 'undefined') {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.3,
    infinite: false,
  });

  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}


// Button Animation

const buttons = document.querySelectorAll(".cta");

buttons.forEach((btn) => {
  let state;

  btn.addEventListener("mouseenter", () => {
    state = Flip.getState(btn.querySelectorAll(".cta-text, .cta-arrow"));

    btn.style.flexDirection = "row-reverse";

    Flip.from(state, {
      duration: 0.5,
      ease: "power3.inOut"
    });
  });

  btn.addEventListener("mouseleave", () => {
    state = Flip.getState(btn.querySelectorAll(".cta-text, .cta-arrow"));

    btn.style.flexDirection = "row";

    Flip.from(state, {
      duration: 0.5,
      ease: "power3.inOut"
    });
  });
});