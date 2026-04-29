/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, animate, useInView } from 'motion/react';
import {
  Phone, Menu, ArrowRight, ShieldCheck, Zap, CheckCircle2, Wrench,
  Gauge, Bug, MonitorOff, AlertTriangle, HardDrive, Flame, ChevronRight,
  Cpu, Hammer, MapPin, Facebook, Youtube, MessageCircle,
  Monitor, Laptop, Terminal, Gamepad2, Video, Headphones, PhoneCall,
  Store, Clock, User, Smartphone, Settings, Timer, X
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-xl tracking-tighter">AN</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">AL-Najim</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-white hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
              <a href="#services" className="text-slate-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</a>
              <a href="#about" className="text-slate-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">About Us</a>
              <a href="#contact" className="text-slate-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
            </div>
          </div>
          <div className="hidden md:block">
            <a href="tel:+966123456789" className="group flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40">
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden glass-nav absolute w-full border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#services" className="text-slate-300 block px-3 py-2 rounded-md text-base font-medium">Services</a>
            <a href="#about" className="text-slate-300 block px-3 py-2 rounded-md text-base font-medium">About Us</a>
            <a href="#contact" className="text-slate-300 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const MagneticButton = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.2);
    y.set((clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: smoothX, y: smoothY }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(248,113,22,0.5)" }}
      whileTap={{ scale: 0.95 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.button>
  );
};

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const blob1X = useTransform(smoothX, [-1, 1], [-50, 50]);
  const blob1Y = useTransform(smoothY, [-1, 1], [-50, 50]);
  const blob2X = useTransform(smoothX, [-1, 1], [50, -50]);
  const blob2Y = useTransform(smoothY, [-1, 1], [50, -50]);

  // Card tilt logic
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const cardSmoothX = useSpring(cardX, { damping: 20, stiffness: 150 });
  const cardSmoothY = useSpring(cardY, { damping: 20, stiffness: 150 });
  const rotateX = useTransform(cardSmoothY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(cardSmoothX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXLocal = e.clientX - rect.left;
    const mouseYLocal = e.clientY - rect.top;
    cardX.set(mouseXLocal / width - 0.5);
    cardY.set(mouseYLocal / height - 0.5);
  };

  const handleCardMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none hero-pattern opacity-20 z-0"></div>
      
      <motion.div 
        style={{ x: blob1X, y: blob1Y }}
        className="blob-bg w-[500px] h-[500px] rounded-full bg-primary/20 -top-20 -left-20 pointer-events-none"
      ></motion.div>
      <motion.div 
        style={{ x: blob2X, y: blob2Y }}
        className="blob-bg w-[400px] h-[400px] rounded-full bg-blue-500/10 bottom-0 right-0 pointer-events-none"
      ></motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 text-center lg:text-left space-y-8 max-w-2xl relative z-10"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mx-auto lg:mx-0 cursor-pointer"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Serving Dammam Since 2004
        </motion.div>
        
        <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
          Your Computer Problems <br/>
          <motion.span 
            className="text-gradient inline-block"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            End Here.
          </motion.span>
        </h1>
        
        <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
          Expert repair for laptops, desktops, and custom builds. From hardware failures to software glitches, we fix what others can't with a 20-year legacy of trust.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
          <MagneticButton 
            className="bg-primary text-white px-8 py-4 rounded-xl font-semibold shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
          >
            Book Appointment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(248,113,22,0.1)", borderColor: "#f87116" }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border border-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
          >
            Explore Services
          </motion.button>
        </div>
        
        <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-slate-500 text-sm font-medium">
          <motion.div whileHover={{ y: -2, color: "#f87116" }} className="flex items-center gap-2 cursor-pointer transition-colors">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span>90-Day Warranty</span>
          </motion.div>
          <motion.div whileHover={{ y: -2, color: "#f87116" }} className="flex items-center gap-2 cursor-pointer transition-colors">
            <Zap className="w-5 h-5 text-primary" />
            <span>Same Day Repair</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 w-full max-w-lg lg:max-w-xl relative group z-10"
        style={{ perspective: 1000 }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-blue-500/30 rounded-full blur-3xl transform group-hover:scale-105 transition-transform duration-700 pointer-events-none"></div>
        
        <motion.div 
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative bg-surface-dark/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl overflow-visible cursor-crosshair transition-colors duration-300 hover:border-primary/50"
        >
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          
          <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-700/50" style={{ transform: "translateZ(30px)" }}>
            <motion.img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdZ3AtwNlHdmWjBEHRSPRWmPxvzyc47aqelLPR8dt0xko6rIv4rqJul6HyLZnjxzYT1AHamAHDhCaXv6zLvDibCCArB4V4sg1ototeFJuP_YNkJ2GhWEFPhAbjrbcbkZc8kZXD_C5wPV8T8s7t2ZyMmumO120ZLkOiA_e0jDZ8tcFx60tfX1BxFq2PH_Vmzs_FMRaL0-jY_BAC41YDOIF34qjDn658ibRq-4a0I0Q-GP_k-ZLMHFY0KCr6EfCpRW5TqUbHbX_s7_w" 
              alt="Computer repair" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              referrerPolicy="no-referrer"
              style={{ transform: "translateZ(0px)" }}
            />
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              whileHover={{ scale: 1.1 }}
              style={{ transform: "translateZ(60px)" }}
              className="absolute top-6 right-6 bg-slate-900/90 backdrop-blur border border-slate-700 p-3 rounded-lg shadow-xl flex items-center gap-3 cursor-pointer"
            >
              <div className="bg-green-500/20 p-2 rounded-md">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Status</p>
                <p className="text-sm font-bold text-white">System Optimized</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              whileHover={{ scale: 1.1 }}
              style={{ transform: "translateZ(50px)" }}
              className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur border border-slate-700 p-3 rounded-lg shadow-xl flex items-center gap-3 cursor-pointer"
            >
              <div className="bg-primary/20 p-2 rounded-md">
                <Wrench className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Service</p>
                <p className="text-sm font-bold text-white">Hardware Diagnostics</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const Counter = ({ from, to, suffix = "", duration = 2, decimals = 0 }: { from: number, to: number, suffix?: string, duration?: number, decimals?: number }) => {
  const nodeRef = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    const node = nodeRef.current;
    if (node && inView) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          node.textContent = value.toFixed(decimals) + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [from, to, suffix, duration, decimals, inView]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
};

const Stats = () => {
  return (
    <div className="border-y border-white/5 bg-white/5 backdrop-blur-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5 text-center">
          <div className="px-4">
            <p className="text-4xl lg:text-5xl font-bold text-white mb-2"><Counter from={0} to={20} suffix="+" /></p>
            <p className="text-xs text-primary uppercase tracking-widest font-semibold">Years Experience</p>
          </div>
          <div className="px-4">
            <p className="text-4xl lg:text-5xl font-bold text-white mb-2"><Counter from={0} to={5} suffix="k+" /></p>
            <p className="text-xs text-primary uppercase tracking-widest font-semibold">Devices Fixed</p>
          </div>
          <div className="px-4">
            <p className="text-4xl lg:text-5xl font-bold text-white mb-2"><Counter from={0} to={4.9} suffix="" duration={1.5} decimals={1} /></p>
            <p className="text-xs text-primary uppercase tracking-widest font-semibold">Star Rating</p>
          </div>
          <div className="px-4">
            <p className="text-4xl lg:text-5xl font-bold text-white mb-2"><Counter from={0} to={24} suffix="h" /></p>
            <p className="text-xs text-primary uppercase tracking-widest font-semibold">Turnaround</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProblemCard = ({ prob, i }: { prob: any, i: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative bg-surface-dark border border-white/5 hover:border-primary/50 rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(248,113,22,0.15)] hover:-translate-y-1 overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(248, 113, 22, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      <div className="relative z-10 flex flex-col items-start h-full">
        <div className="w-14 h-14 rounded-lg bg-black/50 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
          <prob.icon className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">{prob.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{prob.desc}</p>
        <div className="mt-auto flex items-center gap-2 text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <span>{prob.action}</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};

const ProblemGrid = () => {
  const problems = [
    { icon: Gauge, title: "Slow & Sluggish", desc: "Your computer takes forever to boot or freezes during simple tasks like browsing or opening documents.", action: "Get Speed Boost" },
    { icon: Bug, title: "Virus Infected", desc: "Pop-ups appearing out of nowhere, files disappearing, or strange programs running in the background.", action: "Remove Malware" },
    { icon: MonitorOff, title: "Broken Hardware", desc: "Cracked laptop screens, unresponsive keyboards, broken hinges, or ports that stopped working.", action: "Hardware Repair" },
    { icon: AlertTriangle, title: "Blue Screen Loops", desc: "Constant crashing, the dreaded \"Blue Screen of Death\", or the computer restarts randomly on its own.", action: "Fix Crashes" },
    { icon: HardDrive, title: "Lost Precious Files", desc: "Accidentally deleted photos, corrupted hard drives, or unable to access critical work documents.", action: "Recover Data" },
    { icon: Flame, title: "Overheating & Noise", desc: "Fan sounds like a jet engine, the laptop feels dangerously hot to the touch, or sudden shutdowns.", action: "Cool It Down" },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background-dark">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Does This Sound <span className="text-primary">Like You?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            Diagnosing Dammam's toughest tech headaches for over 20 years. Identify your issue below, and let the experts handle the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob, i) => (
            <ProblemCard key={i} prob={prob} i={i} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-primary rounded-lg hover:bg-orange-600">
            Get a Free Diagnosis
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-4 text-sm text-slate-500">No fix, no fee. Visit us in Dammam today.</p>
        </div>
      </div>
    </section>
  );
};

const Legacy = () => {
  return (
    <section className="py-24 bg-[#150d08] relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Restoring Technology in <span className="text-gradient">Dammam</span>.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              What started as a small workbench has grown into Dammam's most trusted repair hub. For over two decades, we've kept your digital lives running with precision, honesty, and technical mastery.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <MagneticButton className="bg-primary text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-primary/25 flex items-center gap-2 group">
                Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl opacity-30"></div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="space-y-4 pt-12"
              >
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-WTHZFiHqrjxeKR17CHrtHnDwobbtCNH6iplern2CJLXbspYhQvJ5g0ntH5W_e_O3AaK4pZAwytXPBcOwg2pc-uphtDJbOWtdDtQh90guE0RkwkOkCD20CKW7jMMmnaak_jT4HxdXeQ_2WLMZddIAglSBN570BrOyIqXDhmj1kpdtrlX2Vk6YXbydDzd3WZl8S4xN5AixMh1WlEDOk_SbHfmthBF3DaFKprqdu1CQkPmcVNPIXj9MQ9RJkbqcwW-WYnzEweuwLwQ" 
                  alt="Tech repair" 
                  className="w-full h-64 object-cover rounded-xl shadow-2xl border border-white/10"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-primary to-orange-600 p-6 rounded-xl shadow-lg text-white"
                >
                  <Hammer className="w-8 h-8 mb-2" />
                  <p className="font-medium">Master Technicians</p>
                  <p className="text-xs text-orange-100 opacity-80 mt-1">Certified experts only.</p>
                </motion.div>
                <motion.img 
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa0m2vx6Dt80h61s6MoQmKeQJKrt8SkB-I1dehE_Nvm04IT9b1T3DxxSt7fXxVrl25dzZAao3Z7amLagyuU08eH5mIb2PPFk8drkU62rhyVtXsZ0EtZjWaCgR2-905wE-hERZCqpCYwNH6VBDpRmaMlFDycn8UiOVSwrkNyfMfUadtGlJwn0Jy2UeItHYDuE3sjuPJtmdoEdBByBWpGgG_7Ne97LkdNs5wA_N7H6fTAJxG8S-bYgqHIWCZhop-y2Ek9Afa9coN4D0" 
                  alt="Workshop" 
                  className="w-full h-48 object-cover rounded-xl shadow-2xl border border-white/10"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium tracking-wide uppercase text-sm">Why AL-Najim?</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2 mb-6">Built on Values That Matter</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-dark border border-white/5 rounded-2xl p-8 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Honest Service</h3>
            <p className="text-slate-400 leading-relaxed">
              We believe in transparent pricing. You'll never find hidden fees on your invoice, and we'll always explain the issue in plain language before we start.
            </p>
          </div>
          <div className="bg-surface-dark border border-white/5 rounded-2xl p-8 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Fast Turnaround</h3>
            <p className="text-slate-400 leading-relaxed">
              We know downtime costs you money. That's why 85% of our repairs are completed within 24 hours, getting you back online faster.
            </p>
          </div>
          <div className="bg-surface-dark border border-white/5 rounded-2xl p-8 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Wrench className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Expert Technicians</h3>
            <p className="text-slate-400 leading-relaxed">
              Your hardware is in safe hands. Our team is certified and stays updated with the latest tech trends, from GPU micro-soldering to data recovery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ svc, i }: { svc: any, i: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group bg-surface-dark rounded-xl border border-white/5 p-6 md:p-8 flex flex-col h-full hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(248, 113, 22, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,113,22,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      <div className="relative z-10 w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
        <svc.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
      </div>
      <h3 className="relative z-10 text-2xl font-bold text-white mb-4">{svc.title}</h3>
      <p className="relative z-10 text-slate-400 mb-6 text-sm">{svc.desc}</p>
      <ul className="relative z-10 space-y-3 mb-8 flex-grow">
        {svc.points.map((pt: string, j: number) => (
          <li key={j} className="flex items-start gap-3 text-sm text-slate-300">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
      <button className="relative z-10 w-full py-3 px-4 bg-transparent border border-primary/30 hover:bg-primary hover:border-primary text-primary hover:text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
        Book Service
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: "Computer Repair",
      desc: "Comprehensive diagnostics and repair for all desktop brands. We fix what others can't.",
      points: ["Motherboard Diagnostics & Repair", "Power Supply Unit Replacement", "Overheating & Cooling Fixes", "Hardware Upgrades (RAM/SSD)"]
    },
    {
      icon: Laptop,
      title: "Laptop Services",
      desc: "Specialized care for portable devices. Screen repairs to intricate chip-level fixes.",
      points: ["Screen & LCD Replacement", "Keyboard & Trackpad Repair", "Battery Replacement", "Hinge & Chassis Repair"]
    },
    {
      icon: Terminal,
      title: "Software Solutions",
      desc: "Optimize your system performance, remove threats, and secure your valuable data.",
      points: ["OS Installation (Windows/Linux)", "Virus & Malware Removal", "Data Recovery Services", "Driver Updates & Optimization"]
    },
    {
      icon: Gamepad2,
      title: "Gaming & Custom Builds",
      desc: "Dream it, we build it. High-performance rigs tailored to your gaming or creative needs.",
      points: ["Custom PC Assembly", "GPU & CPU Upgrades", "RGB Lighting & Cable Management", "Liquid Cooling Installation"]
    },
    {
      icon: Video,
      title: "Security & CCTV",
      desc: "Protect your home or business with state-of-the-art surveillance systems.",
      points: ["Home/Office Camera Installation", "DVR/NVR Configuration", "Remote Viewing Setup (Mobile)", "Maintenance & Troubleshooting"]
    },
    {
      icon: Headphones,
      title: "Accessories",
      desc: "Enhance your setup with premium peripherals. We stock the best brands.",
      points: ["Mechanical Keyboards", "High-DPI Gaming Mice", "Headsets & Audio Gear", "4K & High Refresh Monitors"]
    }
  ];

  return (
    <section id="services" className="py-24 relative z-10 bg-background-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Expert Tech Solutions for <br/>
            <span className="text-primary">Modern Challenges</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            From high-end custom gaming builds to critical data recovery, AL-Najim brings over two decades of expertise to every repair.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((svc, i) => (
            <ServiceCard key={i} svc={svc} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Booking = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#150d08] border-t border-white/5">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(248,113,22,0.1)_0,transparent_50%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            Expert Repairs. <span className="text-gradient">Zero Hassle.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl">
            Get your tech fixed by Dammam's most trusted experts. Book an appointment online or visit our workshop today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 space-y-6">
            <div className="group bg-surface-dark p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <PhoneCall className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Call Us Directly</h3>
                  <p className="text-slate-400 text-sm mb-3">Speak to a technician immediately.</p>
                  <a href="tel:+966138000000" className="text-xl font-semibold text-primary hover:text-orange-400 transition-colors tracking-wide">+966 13 8XX XXXX</a>
                </div>
              </div>
            </div>

            <div className="group bg-surface-dark p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <Store className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Visit Workshop</h3>
                  <p className="text-slate-400 text-sm mb-3">King Khalid Street, Dammam, KSA.</p>
                  <a href="#" className="inline-flex items-center text-sm font-medium text-primary hover:text-orange-400 transition-colors">
                    Get Directions
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            <div className="group bg-surface-dark p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <Clock className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div className="w-full">
                  <h3 className="text-lg font-bold text-white mb-2">Business Hours</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-sm w-full max-w-[200px]">
                      <span className="text-slate-400">Sat - Thu</span>
                      <span className="font-medium text-white">9:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center text-sm w-full max-w-[200px]">
                      <span className="text-primary font-medium">Friday</span>
                      <span className="font-medium text-white">4:00 PM - 10:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10 group">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATj0T2urQGOnjUFhdwpx8Ef72ceRAEJu_mxwHf_hbW8_COJESAe0K56YWDYmjCwic7WVxZNr3pERZrDavsLcfcXFz3U1dvvztvhLb8c4N-JVjiWkHsD4F6dYxypLHa3P2IS_scTfWMpmk5Wm5bu2HxEo5PNjzqznzzrwD5BZ5b6qVSR6_yKnIR_64Gb--LwxXnn8DPFpWo1GV-gAYLlU6x3rR7-tC2zTRAw-2WL921KuvTur7BM7mp8S1Ou3MqhMT7rO4yqe6jj68" 
                alt="Map" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <p className="text-white text-sm font-medium flex items-center">
                  <MapPin className="w-4 h-4 text-primary mr-1" />
                  Find us on Google Maps
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-surface-dark rounded-2xl border border-white/10 p-8 lg:p-10 relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">Book an Appointment</h3>
                  <p className="text-sm text-slate-400 mt-1">Skip the queue. Secure your slot now.</p>
                </div>
                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <Zap className="w-6 h-6 animate-pulse" />
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-slate-500" />
                      </div>
                      <input type="text" className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-black/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all outline-none" placeholder="John Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Smartphone className="w-5 h-5 text-slate-500" />
                      </div>
                      <input type="tel" className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-black/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all outline-none" placeholder="05X XXX XXXX" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Service Required</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Laptop Repair', 'PC Build/Fix', 'Hardware', 'Software'].map((service, idx) => (
                      <label key={idx} className="relative cursor-pointer">
                        <input type="radio" name="service" className="peer sr-only" defaultChecked={idx === 0} />
                        <div className="h-full p-3 rounded-lg border border-white/10 bg-black/50 hover:bg-white/5 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all text-center flex flex-col items-center justify-center gap-2 text-slate-400">
                          {idx === 0 && <Laptop className="w-6 h-6" />}
                          {idx === 1 && <Monitor className="w-6 h-6" />}
                          {idx === 2 && <Cpu className="w-6 h-6" />}
                          {idx === 3 && <Settings className="w-6 h-6" />}
                          <span className="text-xs font-medium">{service}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Describe the Issue</label>
                  <textarea rows={4} className="block w-full p-3 border border-white/10 rounded-lg bg-black/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all outline-none resize-none" placeholder="E.g., Screen is flickering, blue screen error..."></textarea>
                </div>

                <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <Timer className="w-5 h-5 text-primary" />
                  <p className="text-sm text-primary font-medium">
                    We usually respond within <span className="font-bold underline decoration-2">1 hour</span> during work hours.
                  </p>
                </div>

                <button type="button" className="group w-full flex items-center justify-center py-4 px-6 rounded-lg text-base font-bold text-white bg-gradient-to-r from-primary to-orange-500 hover:to-orange-400 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/30">
                  <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Book Appointment
                </button>
                <p className="text-xs text-center text-slate-500 mt-4">
                  By booking, you agree to our Terms of Service. No payment required until service is complete.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-background-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">A</div>
          <span className="font-bold text-white">AL-Najim</span>
        </div>
        <p className="text-sm text-slate-500">
          © 2024 AL-Najim Computer Shop. All rights reserved. <span className="mx-2">|</span> King Khalid Street, Dammam
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-slate-500 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
          <a href="#" className="text-slate-500 hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
          <a href="#" className="text-slate-500 hover:text-primary transition-colors"><MessageCircle className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#150d08] text-slate-100 font-display selection:bg-primary selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <ProblemGrid />
      <Legacy />
      <Services />
      <Booking />
      <Footer />
    </div>
  );
}
