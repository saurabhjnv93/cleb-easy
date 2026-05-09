import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a href="https://wa.me/919876543210?text=Hi%20CelebEasy,%20I%27d%20like%20help%20planning%20my%20event" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center rounded-full bg-emerald-500 p-4 text-white shadow-xl shadow-emerald-500/30 transition hover:scale-105">
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
