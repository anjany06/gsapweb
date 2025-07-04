import React, { useRef, useState } from "react";
import { allCocktails } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Menu = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    // Parallax effect for leaves
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#menu",
        start: "top top", // start when top of menu hits bottom of viewport
        end: "bottom top", // end when bottom of menu hits top of viewport
        scrub: true, // smooth scrubbing
      },
    });

    parallaxTimeline
      .to("#m-left-leaf", {
        y: -150,
        x: -50,
        rotation: 5,
        ease: "none",
      })
      .to(
        "#m-right-leaf",
        {
          y: 100,
          x: 50,
          rotation: -5,
          ease: "none",
        },
        0
      ); // start at the same time as left leaf

    // Existing animations for cocktail content
    gsap.fromTo(
      "#title",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      }
    );
    gsap.fromTo(
      ".cocktail img",
      {
        opacity: 0,
        xPercent: -100,
      },
      {
        xPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      }
    );
    gsap.fromTo(
      ".details h2",
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.5,
        ease: "power1.inOut",
      }
    );
    gsap.fromTo(
      ".details p",
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.5,
        ease: "power1.inOut",
      }
    );
  }, [currentIndex]);

  const totalCocktails = allCocktails.length;
  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };
  const getCocktailArt = (indexOffset) => {
    return allCocktails[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailArt(0);
  const prevCocktail = getCocktailArt(-1);
  const nextCocktail = getCocktailArt(1);
  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />
      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              key={cocktail.id}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>
      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="/images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="/images/left-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="cocktail">
          <img
            src={currentCocktail.image}
            alt="current-cocktail-image"
            className="object-contain"
          />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe For : </p>
            <p id="title">{currentCocktail.name}</p>
          </div>
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
