import fireSafetyImg from '../assets/fire-safety-hero.jpg';
import itInfraImg from '../assets/it-infra-hero.jpg';

export const lpasSlides = [
  {
    id: 'surveillance',
    title: 'CCTV SURVEILLANCE',
    description: 'Round-the-clock visual coverage with remote viewing and recording. Protect your assets with enterprise-grade video management.',
    color: '#0891b2',
    bgColor: 'bg-black',
    textColor: 'text-cyan-50',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2069&auto=format&fit=crop',
    video: '/cctv-video.mp4'
  },
  {
    id: 'networking',
    title: 'ENTERPRISE NETWORKING',
    description: 'LAN, WAN and Wi-Fi built for reliability and scale. Secure, high-speed backbone infrastructure for uninterrupted operations.',
    color: '#0284c7',
    bgColor: 'bg-black',
    textColor: 'text-sky-50',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop'
  },
  {
    id: 'access-control',
    title: 'ACCESS CONTROL',
    description: 'Control who goes where, and track it automatically. Seamless biometric and RFID integration for secure facilities.',
    color: '#4f46e5',
    bgColor: 'bg-black',
    textColor: 'text-indigo-50',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'fire-alarms',
    title: 'FIRE SAFETY',
    description: 'Early detection and warning to protect people and assets. Integrated voice evacuation and zone sensing capabilities.',
    color: '#0d9488',
    bgColor: 'bg-black',
    textColor: 'text-teal-50',
    image: fireSafetyImg
  },
  {
    id: 'infrastructure',
    title: 'IT INFRASTRUCTURE',
    description: 'Server and storage solutions sized and configured for your workload. Unified hubs designed for maximum uptime and cloud sync.',
    color: '#2563eb',
    bgColor: 'bg-black',
    textColor: 'text-blue-50',
    image: itInfraImg
  }
];
