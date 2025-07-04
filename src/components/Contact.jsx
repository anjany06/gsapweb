import React from "react";
import { openingHours, socials } from "../../constants";

const Contact = () => {
  return (
    <footer id="contact">
      <img
        src="/images/footer-right-leaf.png"
        alt="leaf-right"
        id="f-right-leaf"
      />
      <img
        src="/images/footer-left-leaf.png"
        alt="left-right"
        id="f-left-leaf"
      />
      <div className="content">
        <h2>Where to find Us</h2>
        <div>
          <h3>Visit Our Bar</h3>
          <p>456, Raq Blvd, #404, Los Angeles, CA 90120</p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>(555) 987-6543</p>
          <p>hello@gmail.com</p>
        </div>
        <div>
          <h3>Open every Day</h3>
          {openingHours.map((time, index) => (
            <p key={time.day}>
              {time.day}: {time.time}
            </p>
          ))}
        </div>
        <div>
          <h3>Socials</h3>
          <div className="flex-center gap-5">
            {socials.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img
                  src= {social.icon}
                  alt={social.name}
                  className="social-icon"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
