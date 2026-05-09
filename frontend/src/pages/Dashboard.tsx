import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../contexts/AuthContext';

type BookingRecord = {
  _id: string;
  eventType: string;
  date: string;
  time: string;
  guests: number;
  city: string;
  status: string;
};

const bookingIdeas = [
  { title: 'Birthday Bliss', eventType: 'Birthday', city: 'Mumbai', guests: 20, budget: '₹2,999+', tone: 'Peach balloons and a styled cake corner', accent: 'bg-[rgba(234,203,202,0.45)]' },
  { title: 'Baby Shower Bloom', eventType: 'Baby Shower', city: 'Delhi', guests: 24, budget: '₹3,499+', tone: 'Pastel backdrop with dessert styling', accent: 'bg-[rgba(180,218,228,0.4)]' },
  { title: 'Anniversary Glow', eventType: 'Anniversary', city: 'Bengaluru', guests: 12, budget: '₹4,999+', tone: 'Candlelit dining and floral details', accent: 'bg-[rgba(241,201,143,0.36)]' },
  { title: 'Terrace House Party', eventType: 'House Party', city: 'Pune', guests: 30, budget: '₹5,499+', tone: 'Warm lighting with lounge-ready decor', accent: 'bg-[rgba(204,196,236,0.38)]' },
  { title: 'Surprise Proposal Corner', eventType: 'Surprise Setup', city: 'Mumbai', guests: 10, budget: '₹6,499+', tone: 'Romantic reveal with roses and candles', accent: 'bg-[rgba(234,203,202,0.5)]' },
  { title: 'Romantic Dinner Date', eventType: 'Romantic Dinner', city: 'Hyderabad', guests: 2, budget: '₹3,999+', tone: 'Private table styling at home', accent: 'bg-[rgba(241,201,143,0.34)]' },
  { title: 'Kids Theme Carnival', eventType: 'Birthday', city: 'Delhi', guests: 25, budget: '₹4,299+', tone: 'Bright props and playful photo spots', accent: 'bg-[rgba(180,218,228,0.44)]' },
  { title: 'Elegant Naming Ceremony', eventType: 'Baby Shower', city: 'Chennai', guests: 35, budget: '₹5,299+', tone: 'Soft drapes with welcoming florals', accent: 'bg-[rgba(234,203,202,0.42)]' },
  { title: 'Rooftop Friends Night', eventType: 'House Party', city: 'Bengaluru', guests: 28, budget: '₹5,899+', tone: 'Music, mood lights, and snack styling', accent: 'bg-[rgba(204,196,236,0.36)]' },
  { title: 'Silver Anniversary Setup', eventType: 'Anniversary', city: 'Pune', guests: 20, budget: '₹6,999+', tone: 'Refined centerpiece and memory wall', accent: 'bg-[rgba(241,201,143,0.4)]' },
  { title: 'First Birthday Keepsake', eventType: 'Birthday', city: 'Hyderabad', guests: 18, budget: '₹4,799+', tone: 'Cute milestone corner and family backdrop', accent: 'bg-[rgba(180,218,228,0.4)]' },
  { title: 'Intimate Mehendi Nook', eventType: 'House Party', city: 'Mumbai', guests: 22, budget: '₹6,299+', tone: 'Colorful cushions, florals, and stage touch', accent: 'bg-[rgba(234,203,202,0.46)]' },
  { title: 'Luxury Balloon Ceiling', eventType: 'Surprise Setup', city: 'Delhi', guests: 8, budget: '₹3,699+', tone: 'A quick wow moment for a private reveal', accent: 'bg-[rgba(204,196,236,0.42)]' },
  { title: 'Couple Movie Night', eventType: 'Romantic Dinner', city: 'Bengaluru', guests: 2, budget: '₹4,499+', tone: 'Projection wall with snacks and candles', accent: 'bg-[rgba(241,201,143,0.34)]' },
  { title: 'Minimal Chic Birthday', eventType: 'Birthday', city: 'Chennai', guests: 16, budget: '₹3,799+', tone: 'Muted tones and clean modern styling', accent: 'bg-[rgba(180,218,228,0.36)]' },
  { title: 'Mom-To-Be Brunch', eventType: 'Baby Shower', city: 'Pune', guests: 26, budget: '₹4,999+', tone: 'Daylight-friendly tablescape and florals', accent: 'bg-[rgba(234,203,202,0.44)]' },
  { title: 'Home Cocktail Evening', eventType: 'House Party', city: 'Hyderabad', guests: 32, budget: '₹6,899+', tone: 'Bar corner, mood lighting, and lounge energy', accent: 'bg-[rgba(204,196,236,0.4)]' },
  { title: 'Memory Lane Anniversary', eventType: 'Anniversary', city: 'Delhi', guests: 14, budget: '₹5,799+', tone: 'Printed moments and intimate dinner styling', accent: 'bg-[rgba(241,201,143,0.38)]' },
  { title: 'Midnight Surprise Entry', eventType: 'Surprise Setup', city: 'Mumbai', guests: 6, budget: '₹3,299+', tone: 'Doorway reveal with balloons and lights', accent: 'bg-[rgba(180,218,228,0.42)]' },
  { title: 'Rose Gold Dinner Story', eventType: 'Romantic Dinner', city: 'Pune', guests: 2, budget: '₹5,199+', tone: 'Soft metallic styling with luxury tableware', accent: 'bg-[rgba(234,203,202,0.48)]' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  useEffect(() => {
    if (!user) return;
    api.get('/bookings').then((res) => setBookings(res.data.bookings)).catch(() => setBookings([]));
  }, [user]);

  return (
    <div className="min-h-screen px-6 py-24 text-[var(--ce-ink)]">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="ce-card-strong rounded-[2rem] p-8">
          <h1 className="ce-display text-4xl text-[var(--ce-heading)]">Dashboard</h1>
          <p className="mt-3 text-[var(--ce-soft-ink)]">Welcome back, {user?.name || 'celebrity host'} — browse setups and book in a few clicks.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="ce-card rounded-[2rem] p-6">
            <h2 className="ce-display text-xl text-[var(--ce-heading)]">Bookings</h2>
            <p className="mt-4 text-4xl font-semibold text-[var(--ce-rose)]">{bookings.length}</p>
          </div>
          <div className="ce-card rounded-[2rem] p-6">
            <h2 className="ce-display text-xl text-[var(--ce-heading)]">Next event</h2>
            <p className="mt-4 text-[var(--ce-soft-ink)]">{bookings[0]?.eventType || 'Pick from the ideas below'}</p>
          </div>
          <div className="ce-card rounded-[2rem] p-6">
            <h2 className="ce-display text-xl text-[var(--ce-heading)]">Location</h2>
            <p className="mt-4 text-[var(--ce-soft-ink)]">{bookings[0]?.city || 'Multiple metro cities available'}</p>
          </div>
        </div>

        <div className="ce-card-strong rounded-[2rem] p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--ce-soft-ink)]">Bookable options</p>
              <h2 className="ce-display mt-3 text-3xl text-[var(--ce-heading)]">20 celebration cards users can book right after login</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[var(--ce-soft-ink)]">
              Each card routes into the booking form with event type, city, and suggested guest count already selected.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {bookingIdeas.map((idea) => (
              <Link
                key={idea.title}
                to={`/booking?eventType=${encodeURIComponent(idea.eventType)}&city=${encodeURIComponent(idea.city)}&guests=${idea.guests}`}
                className={`rounded-[1.75rem] border border-[rgba(118,91,77,0.14)] p-5 transition duration-200 hover:-translate-y-1 ${idea.accent}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-[rgba(255,250,245,0.74)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--ce-soft-ink)]">
                    {idea.eventType}
                  </span>
                  <span className="text-sm font-semibold text-[var(--ce-rose)]">{idea.budget}</span>
                </div>
                <h3 className="ce-display mt-5 text-2xl text-[var(--ce-heading)]">{idea.title}</h3>
                <p className="mt-3 min-h-[3rem] text-sm leading-6 text-[#5c4b44]">{idea.tone}</p>
                <div className="mt-6 flex items-center justify-between text-sm text-[var(--ce-soft-ink)]">
                  <span>{idea.city}</span>
                  <span>{idea.guests} guests</span>
                </div>
                <div className="mt-5 inline-flex rounded-full border border-[rgba(118,91,77,0.16)] bg-[rgba(255,248,242,0.8)] px-4 py-2 text-sm font-medium text-[var(--ce-heading)]">
                  Book this option
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="ce-card-strong rounded-[2rem] p-8">
          <h2 className="ce-display text-3xl text-[var(--ce-heading)]">Booking history</h2>
          <div className="mt-6 space-y-4">
            {bookings.length === 0 ? (
              <p className="text-[var(--ce-soft-ink)]">No bookings yet. Choose any of the 20 options above to create your first event.</p>
            ) : (
              bookings.map((booking: BookingRecord) => (
                <div key={booking._id} className="rounded-3xl border border-[rgba(118,91,77,0.14)] bg-[rgba(255,248,242,0.88)] p-5 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--ce-heading)]">{booking.eventType}</h3>
                    <p className="text-sm text-[var(--ce-soft-ink)]">{new Date(booking.date).toLocaleDateString()} · {booking.time} · {booking.guests} guests</p>
                  </div>
                  <span className="mt-4 inline-flex rounded-full bg-[rgba(180,218,228,0.32)] px-4 py-2 text-sm text-[var(--ce-heading)] sm:mt-0">{booking.status}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
