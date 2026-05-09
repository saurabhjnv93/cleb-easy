import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../contexts/AuthContext';

const eventOptions = ['Birthday', 'House Party', 'Baby Shower', 'Anniversary', 'Surprise Setup', 'Romantic Dinner'];
const addonOptions = [{ label: 'Cake', value: 'Cake', price: 1200 }, { label: 'Photography', value: 'Photography', price: 2250 }, { label: 'DJ', value: 'DJ', price: 1800 }, { label: 'Return Gifts', value: 'Return Gifts', price: 900 }, { label: 'Live Singer', value: 'Live Singer', price: 3200 }];

type PackageItem = {
  _id: string;
  name: string;
  startingPrice: number;
};

type BookingForm = {
  eventType: string;
  date: string;
  time: string;
  guests: number;
  packageId: string;
  addons: string[];
  requirements: string;
  city: string;
};

const Booking = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [booking, setBooking] = useState<BookingForm>({
    eventType: 'Birthday',
    date: '',
    time: '19:00',
    guests: 20,
    packageId: '',
    addons: [],
    requirements: '',
    city: 'Mumbai'
  });

  useEffect(() => {
    api.get('/packages').then((res) => setPackages(res.data.packages)).catch(() => setPackages([]));
  }, []);

  useEffect(() => {
    const eventType = searchParams.get('eventType');
    const city = searchParams.get('city');
    const guests = searchParams.get('guests');

    setBooking((prev) => ({
      ...prev,
      eventType: eventType && eventOptions.includes(eventType) ? eventType : prev.eventType,
      city: city || prev.city,
      guests: guests ? Number(guests) || prev.guests : prev.guests,
    }));
  }, [searchParams]);

  const selectedPackage = packages.find((pkg) => pkg._id === booking.packageId);

  const totalPrice = useMemo(() => {
    const base = selectedPackage?.startingPrice || 0;
    const addons = booking.addons.reduce((sum, addon) => {
      const item = addonOptions.find((option) => option.value === addon);
      return sum + (item?.price || 0);
    }, 0);
    return base + addons + (booking.guests * 50);
  }, [selectedPackage, booking.addons, booking.guests]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return toast.error('Please login first');
    try {
      const { data } = await api.post('/bookings', { ...booking, price: totalPrice });
      toast.success('Booking created!');
      window.location.href = `/success/${data.booking._id}`;
    } catch (error) {
      const serverError = (error as any)?.response?.data?.error;
      toast.error(typeof serverError === 'string' ? serverError : 'Booking failed');
    }
  };

  const handleCheckbox = (value: string) => {
    setBooking((prev) => ({
      ...prev,
      addons: prev.addons.includes(value) ? prev.addons.filter((item) => item !== value) : [...prev.addons, value]
    }));
  };

  return (
    <div className="min-h-screen px-6 py-24 text-[var(--ce-ink)]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr]">
          <motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="ce-card-strong rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--ce-soft-ink)]">Book a celebration</p>
            <h2 className="ce-display mb-6 text-4xl text-[var(--ce-heading)]">Create your event booking</h2>
            <div className="grid gap-5 lg:grid-cols-2">
              <label className="space-y-2 text-sm text-[var(--ce-soft-ink)]">
                Event type
                <select name="eventType" value={booking.eventType} onChange={(e) => setBooking({ ...booking, eventType: e.target.value })} className="ce-input">
                  {eventOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label className="space-y-2 text-sm text-[var(--ce-soft-ink)]">
                City
                <input name="city" value={booking.city} onChange={(e) => setBooking({ ...booking, city: e.target.value })} className="ce-input" />
              </label>
              <label className="space-y-2 text-sm text-[var(--ce-soft-ink)]">
                Event date
                <input type="date" name="date" value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} className="ce-input" required />
              </label>
              <label className="space-y-2 text-sm text-[var(--ce-soft-ink)]">
                Time
                <input type="time" name="time" value={booking.time} onChange={(e) => setBooking({ ...booking, time: e.target.value })} className="ce-input" required />
              </label>
              <label className="space-y-2 text-sm text-[var(--ce-soft-ink)]">
                Guests
                <input type="number" min="1" max="50" name="guests" value={booking.guests} onChange={(e) => setBooking({ ...booking, guests: Number(e.target.value) })} className="ce-input" />
              </label>
              <label className="space-y-2 text-sm text-[var(--ce-soft-ink)]">
                Package
                <select name="packageId" value={booking.packageId} onChange={(e) => setBooking({ ...booking, packageId: e.target.value })} className="ce-input" required>
                  <option value="">Choose package</option>
                  {packages.map((pkg) => <option key={pkg._id} value={pkg._id}>{pkg.name} — ₹{pkg.startingPrice}</option>)}
                </select>
              </label>
            </div>
            <div className="mt-8 rounded-[1.5rem] border border-[rgba(118,91,77,0.14)] bg-[rgba(255,250,245,0.6)] p-6">
              <h3 className="ce-display mb-4 text-2xl text-[var(--ce-heading)]">Add-ons</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {addonOptions.map((option) => (
                  <label key={option.value} className="flex items-center gap-3 rounded-3xl border border-[rgba(118,91,77,0.14)] bg-[rgba(255,248,242,0.88)] px-4 py-3">
                    <input type="checkbox" checked={booking.addons.includes(option.value)} onChange={() => handleCheckbox(option.value)} className="h-5 w-5 rounded border-[rgba(118,91,77,0.3)] text-[var(--ce-rose)]" />
                    <span>
                      <span className="font-medium text-[var(--ce-heading)]">{option.label}</span>
                      <span className="block text-sm text-[var(--ce-soft-ink)]">₹{option.price}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <label className="mt-8 space-y-2 text-sm text-[var(--ce-soft-ink)]">
              Custom requirements
              <textarea name="requirements" value={booking.requirements} onChange={(e) => setBooking({ ...booking, requirements: e.target.value })} rows={4} className="ce-input" />
            </label>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-[var(--ce-soft-ink)]">Live total pricing</p>
                <p className="ce-display text-4xl text-[var(--ce-heading)]">₹{totalPrice}</p>
              </div>
              <button type="submit" className="ce-button ce-button-primary px-8 py-4 text-lg">
                Confirm Booking
              </button>
            </div>
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="ce-card space-y-6 rounded-[2rem] p-8">
            <h2 className="ce-display text-3xl text-[var(--ce-heading)]">Why book with CelebEasy?</h2>
            <ul className="space-y-4 text-[var(--ce-soft-ink)]">
              <li>• AI theme suggestions for every celebration.</li>
              <li>• Real-time status updates and chat with planners.</li>
              <li>• Premium package add-ons, verified vendors, and transparent pricing.</li>
              <li>• Built for metro cities and intimate events under 50 guests.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
