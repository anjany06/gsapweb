import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import React from "react";
import gsap from "gsap";

const About = () => {
  useGSAP(() => {
    const titleSpilt = SplitText.create("#about h2", {
      type: "words",
    });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center", // start the animation when the top of the about section hits cenetr of the viewport height
      },
    });

    scrollTimeline
      .from(titleSpilt.words, {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: "expo.out",
        stagger: 0.02,
      })
      .from(
        ".top-grid div, .bottom-grid div",
        {
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.04,
        },
        "-=0.5" // overlap with the previous animation by 0.5 seconds like its start this animation half a second before the previous one ends
      );
  });
  return (
    <div id="about">
      <div className="mb-16 container-padding">
        <div className="content">
          <div className="md:col-span-8">
            <p className="badge">Best Cocktails</p>
            <h2>
              Where every details matters <span className="text-white">-</span>
              from muddle to garnish
            </h2>
          </div>

          <div className="sub-content">
            <p>
              At Velvet Pour, we believe that every cocktail tells a story. Our
              expert mixologists craft each drink with precision and passion,
              using only the finest ingredients. From the first sip to the last
              drop, experience the art of cocktail making like never before.
            </p>

            <div>
              <p className="md:text-3xl text-xl font-bold">
                <span>4.5</span>/5
              </p>
              <p className="text-sm text-white-100">
                More Than 12000+ customers
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="top-grid">
        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt1.png" alt="grid-img-1" />
        </div>

        <div className="md:col-span-6">
          <div className="noisy" />
          <img src="/images/abt2.png" alt="grid-img-2" />
        </div>

        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt5.png" alt="grid-img-5" />
        </div>
      </div>

      <div className="bottom-grid">
        <div className="md:col-span-8">
          <div className="noisy" />
          <img src="/images/abt3.png" alt="grid-img-3" />
        </div>

        <div className="md:col-span-4">
          <div className="noisy" />
          <img src="/images/abt4.png" alt="grid-img-4" />
        </div>
      </div>
    </div>
  );
};

export default About;
