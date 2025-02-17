'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './introduction.css';

export default function Introduction() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [countdown, setCountdown] = useState({
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--'
  });

  useEffect(() => {
    setIsLoaded(true);
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ 
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        // Thêm class floating sau khi animation ban đầu hoàn thành
        document.querySelectorAll('.countdown-box').forEach((box, index) => {
          box.classList.add(index % 2 === 0 ? 'floating' : 'floating-delayed');
        });
        
        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
      }
    });

    // Header animations
    tl.to('.invitation-title', {
      duration: 1.2,
      opacity: 1,
      y: 0,
      ease: 'power4.out'
    })
    .to('.couple-names', {
      duration: 1,
      opacity: 1,
      y: 0,
      ease: 'power3.out'
    }, '-=0.7')
    .to('.countdown-box', {
      duration: 0.8,
      opacity: 1,
      y: 0,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.5');

    // Scroll animations
    gsap.utils.toArray('.couple-info').forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
      });
    });

    gsap.from('.map-container', {
      scrollTrigger: {
        trigger: '.map-container',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power2.out'
    });

    gsap.utils.toArray('.photo-item').forEach((photo, index) => {
      gsap.from(photo, {
        scrollTrigger: {
          trigger: photo,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        duration: 0.6,
        scale: 0.9,
        opacity: 0,
        delay: index * 0.1,
        ease: 'back.out(1.2)'
      });
    });

    // Countdown logic
    const calculateTimeLeft = () => {
      const weddingDate = new Date('2025-03-08T00:00:00');
      const now = new Date();
      const diff = weddingDate - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    };
  }, []);

  return (
    <div className="wedding-container">
      <header className="header">
        <h1 className="invitation-title" style={{ transform: 'translateY(50px)' }}>
          Thiệp Mời
        </h1>
        <h2 className="couple-names" style={{ transform: 'translateY(50px)' }}>
          Ngọc & Minh
        </h2>
        <div className="countdown">
          <div className="countdown-box" style={{ transform: 'translateY(30px)' }}>
            <div className="countdown-number">{countdown.days}</div>
            <div className="countdown-label">Ngày</div>
          </div>
          <div className="countdown-box" style={{ transform: 'translateY(30px)' }}>
            <div className="countdown-number">{countdown.hours}</div>
            <div className="countdown-label">Giờ</div>
          </div>
          <div className="countdown-box" style={{ transform: 'translateY(30px)' }}>
            <div className="countdown-number">{countdown.minutes}</div>
            <div className="countdown-label">Phút</div>
          </div>
          <div className="countdown-box" style={{ transform: 'translateY(30px)' }}>
            <div className="countdown-number">{countdown.seconds}</div>
            <div className="countdown-label">Giây</div>
          </div>
        </div>
      </header>

      <section className="couple-section">
        <div className="couple-container">
          <div className="couple-info groom-info">
            <div className="couple-photo">
              <img 
                src="/images/groom.jpg" 
                alt="Chú rể" 
              />
            </div>
            <div className="couple-details">
              <h3 className="couple-name">Nguyễn Văn Minh</h3>
              <div className="family-info">
                <p>Con trai của:</p>
                <p>Ông: Nguyễn Văn A</p>
                <p>Bà: Nguyễn Thị B</p>
                <p>Nguyên quán: Hà Nội</p>
              </div>
            </div>
          </div>

          <div className="couple-info bride-info">
            <div className="couple-photo">
              <img 
                src="/images/bride.jpg" 
                alt="Cô dâu" 
              />
            </div>
            <div className="couple-details">
              <h3 className="couple-name">Trần Thị Ngọc</h3>
              <div className="family-info">
                <p>Con gái của:</p>
                <p>Ông: Trần Văn C</p>
                <p>Bà: Trần Thị D</p>
                <p>Nguyên quán: Hà Nội</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="location-section">
        <div className="map-container">
       
          
          <div className="location-details">
            <h3>Trung tâm tiệc cưới ABC</h3>
            <p>123 Đường XYZ, Quận ABC, Hà Nội</p>
            <p>Thời gian: 18:00 - 08.03.2025</p>
          </div>
        </div>
      </section>

      <section className="photo-album">
        <div className="photo-grid">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="photo-item">
              <img src={`/images/wedding-${index}.jpg`} alt={`Wedding photo ${index}`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}