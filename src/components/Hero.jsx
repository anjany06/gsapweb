import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

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

    // going to figure where the animation starts and ends
    const startValue = isMobile ? "top 50%" : "center 60%"; // when the top of the hero section hits 50% of the viewport height the animation starts diff for mobile and desktop
    const endValue = isMobile ? "120% top" : "bottom top"; // for the desktop version, the animation ends when the bottom of the hero section hits the top of the viewport and for mobile when the hero section is 120% of the viewport height

    //video animation timeline
    //create the timeline with a default duration
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue, // when the top of the video hits 50% of the viewport height
        end: endValue, // when the bottom of the hero section hits the top of the viewport
        scrub: true, // smooth scrubbing
        pin: true, // pin the video in place
      },
    });
    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        //This way we updating the video currentTime to match the scroll position
        currentTime: videoRef.current.duration, // play the video from start to end
        // ease: "none", // no easing
        // duration: videoRef.current.duration, // duration of the video
      });
    };
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

      {/* video absolute means we dont the video to interact with other other elements */}
      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        ></video>
      </div>
    </>
  );
};

export default Hero;
