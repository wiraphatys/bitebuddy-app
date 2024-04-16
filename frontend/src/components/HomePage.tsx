"use client";
import Image from "next/image";
import styles from "./homepage.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUser , faUtensils} from "@fortawesome/free-solid-svg-icons"

export default function HomePage() {
  const handleClick = () => {
    const scrollStep = window.innerHeight / 20; // Adjust the step size as needed
    let scrolled = 0;

    const scroll = () => {
      if (scrolled < window.innerHeight) {
        window.scrollBy(0, scrollStep);
        scrolled += scrollStep;
        requestAnimationFrame(scroll);
      }
    };

    scroll();
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.leftBlock}>
          <div>
            <h1>Welcome to Bitebuddy</h1>
            <div>
              your buddy for{" "}
              <span className={styles.semiBold}>
                unforgettable experiences!
              </span>
              <br />
              With just a <span className={styles.semiBold}>
                few clicks,
              </span>{" "}
              easily reserve at top restaurants on our platform.
              <br />
              Our diverse selection ensures a culinary adventure like no other.
            </div>
            <a href="/restaurants"><button className={styles.buttonExplore}>Explore now</button></a>
          </div>
          <button className={styles.buttonLearn} onClick={handleClick}>
            Learn more about us
            <br />
            &#8595;
          </button>
        </div>
        <div className={styles.rightBlock}>
          <Image
            src="/img/logo.png"
            alt="icon"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className={styles.secondContainer}>
        <div className={styles.topContent}>
          <div className={styles.topLeftContent}>
            <div>
              Passionate
              <br />
              Creators, Innovators
              <br />
              and Visionaries
            </div>
          </div>
          <div className={styles.topRightContent}>
            <div>
              We believe that{" "}
              <span className={styles.semiBold}>
                dining out should be an experience to remember,{" "}
              </span>
              <br />
              and that's why we've made it our mission to make the reservation
              <br />
              process{" "}
              <span className={styles.semiBold}>
                easy, seamless, and enjoyable.
              </span>{" "}
              So, whether you're exploring new flavors, celebrating special
              moments,
              <br />
              or simply enjoying a night out with friends, let Bitebuddy be your
              <br />
              <span className={styles.semiBold}> trusted companion</span> in
              creating unforgettable dining experiences.
            </div>
          </div>
        </div>
        <div className={styles.bottomContent}>
          <div className={styles.bottomLeftContent}>
            <FontAwesomeIcon icon={faUser} size="2x"/>
            <br/>
            At Bitebuddy, we're driven by our passion to make
            <br/>
            <div>every dining experience <span className={styles.semiBold}>extraordinary</span> for you.</div>
          </div>
          <div className={styles.bottomRightContent}>
            <FontAwesomeIcon icon={faUtensils} size="2x"/>
            <br/>
            At Bitebuddy, we're more than just a reservation
            <br/>
            <div>platform. We're your dedicated partner in <span className={styles.semiBold}>sharing <br/> your culinary passion with the world.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
