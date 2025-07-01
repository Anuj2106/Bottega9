import styles from "../Css/hero.module.css"
import Image from 'next/image'

export default function Hero() {
  return (

    <div className={`${styles.heroContainer} container my-5`}>

      {/* Background Video */}
      <video
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Centered Logo/Text */}
      <div className={`${styles.heroContent}`}>
        {/* Optional Logo - Replace with your image */}
        {/* <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={100}
          className={styles.logoImg}
        /> */}

        <h1 className="display-5 fw-semibold primary-text">Timeless Craftsmanship</h1>
        <p className="lead primary-text">Elegant | Handmade | Luxurious</p>
      </div>
    </div>
  )
}
