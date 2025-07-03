import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import React from "react";

const Hero = () => {
  useGSAP(() => {
    const heroSpilt = new SplitText(".title", {
      type: "chars, words",
    });
    const paragraphSpilt = new SplitText(".subtitle", {
      type: "lines",
    });

    heroSpilt.chars.forEach((char, index) => {
      char.classList.add("text-gradient");
    });

    gsap.from(heroSpilt.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });
    gsap.from(paragraphSpilt.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 0.6,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top", // start the animation when the top of the hero section hits the top of the viewport
          end: "bottom top", // end the animation when the bottom of the hero section hits the top of the viewport
          scrub: true, // smooth scrubbing
        },
      })

      .to(
        ".right-leaf",
        {
          y: 200,
        },
        0
      )
      .to(
        ".left-leaf",
        {
          y: -200,
        },
        0
      );
  }, []); // empty Array to run only once
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless receips - designed to delight your
                senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
