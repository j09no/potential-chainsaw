
import React, { useRef, useEffect } from 'react';

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    
    if (!container || !card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / rect.height) * -30;
      const rotateY = (mouseX / rect.width) * 30;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const touchX = touch.clientX - centerX;
      const touchY = touch.clientY - centerY;
      
      const rotateX = (touchY / rect.height) * -30;
      const rotateY = (touchX / rect.width) * 30;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleTouchEnd = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div ref={containerRef} className="container">
        <div className="canvas">
          <div className="tr-1"></div>
          <div className="tr-2"></div>
          <div className="tr-3"></div>
          <div className="tr-4"></div>
          <div className="tr-5"></div>
          <div className="tr-6"></div>
          <div className="tr-7"></div>
          <div className="tr-8"></div>
          <div className="tr-9"></div>
          <div className="tr-10"></div>
          <div className="tr-11"></div>
          <div className="tr-12"></div>
          <div className="tr-13"></div>
          <div className="tr-14"></div>
          <div className="tr-15"></div>
          <div className="tr-16"></div>
          <div className="tr-17"></div>
          <div className="tr-18"></div>
          <div className="tr-19"></div>
          <div className="tr-20"></div>
          <div className="tr-21"></div>
          <div className="tr-22"></div>
          <div className="tr-23"></div>
          <div className="tr-24"></div>
          <div className="tr-25"></div>
        </div>
        
        <div className="tracker"></div>
        
        <div id="card" ref={cardRef}>
          <div className="card-content">
            <div className="title noselect">CYBER</div>
            <div id="prompt" className="noselect">
              HOVER ME
            </div>
            <div className="subtitle noselect">
              Experience the
              <span className="highlight">Future</span>
            </div>
            
            <div className="glowing-elements">
              <div className="glow-1"></div>
              <div className="glow-2"></div>
              <div className="glow-3"></div>
            </div>
            
            <div className="card-particles">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            
            <div className="card-glare"></div>
            
            <div className="cyber-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            
            <div className="corner-elements">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            
            <div className="scan-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
