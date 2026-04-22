import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

// 🔢 Counter Hook (RESET EVERY TIME)
const useCountUp = (end, duration, trigger) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    setCount(0); // 🔥 reset

    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [trigger, end, duration]);

  return count;
};

export default function InfoSection() {
  const sectionRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  // 🔥 SCROLL DETECTION (RUN EVERY TIME)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 🎉 Confetti every time
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });

          // 🔢 Restart counting
          setStartCount(false);
          setTimeout(() => setStartCount(true), 100);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // 🔢 COUNTERS
  const franchises = useCountUp(4, 1200, startCount);
  const staffs = useCountUp(100, 1200, startCount);
  const menus = useCountUp(124, 1200, startCount);
  const customers = useCountUp(300000, 1500, startCount);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-orange-500 text-white py-20 px-6 md:px-16 flex flex-col md:flex-row items-start justify-between gap-10"
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-6">

        <h1 className="text-3xl font-bold text-center">
          Our Achievement
        </h1>

        <div className="flex flex-wrap justify-center md:justify-start gap-10 text-center md:text-left">

          <div>
            <h1 className="text-4xl font-bold">{franchises}+</h1>
            <p className="text-sm mt-1">FRANCHISES</p>
          </div>

          <div>
            <h1 className="text-4xl font-bold">{staffs}+</h1>
            <p className="text-sm mt-1">OUR STAFFS</p>
          </div>

          <div>
            <h1 className="text-4xl font-bold">{menus}+</h1>
            <p className="text-sm mt-1">OUR MENUS/DISH</p>
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              {customers.toLocaleString()}+
            </h1>
            <p className="text-sm mt-1">HAPPY CUSTOMERS</p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="max-w-md text-center md:text-left">

        <h2 className="text-3xl font-semibold mb-3">
          About Creamantra 🍦
        </h2>

        <p className="text-sm mb-4">
          Creamantra delivers a delightful range of specialty desserts, 
          including ice creams, Kulfis, Faloodas, and Milkshakes. 
          We craft a memorable, decadent experience by blending classic and exotic flavors.
        </p>

        <p className="text-sm">
          📞 <span className="font-medium">093737 51081</span>
        </p>

        <p className="text-sm mt-2">
          🕒 <span className="font-medium">Mon - Sun (10 AM - 11 PM)</span>
        </p>

      </div>
    </div>
  );
}