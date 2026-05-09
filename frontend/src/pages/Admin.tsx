import { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../contexts/AuthContext';

type AdminBooking = {
  _id: string;
  eventType: string;
  city: string;
  price: number;
  status: string;
  user?: { name?: string };
};

type AdminOverview = {
  totalUsers: number;
  totalBookings: number;
  revenue: number;
  recentBookings: AdminBooking[];
};

const Admin = () => {
  const { user } = useAuth();
  const [overview, setOverview] = useState<AdminOverview | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    api.get('/admin/overview').then((res) => setOverview(res.data)).catch(() => setOverview(null));
  }, [user]);

  if (!user || user.role !== 'admin') {
    return <div className="flex min-h-screen items-center justify-center px-6 text-[var(--ce-heading)]">Access restricted to admin users.</div>;
  }

  return (
    <div className="min-h-screen px-6 py-24 text-[var(--ce-ink)]">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="ce-card-strong rounded-[2rem] p-8">
          <h1 className="ce-display text-4xl text-[var(--ce-heading)]">Admin Dashboard</h1>
          <p className="mt-3 text-[var(--ce-soft-ink)]">Manage bookings, packages, revenue and users from one place.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="ce-card rounded-[2rem] p-6">
            <p className="text-sm text-[var(--ce-soft-ink)]">Total users</p>
            <p className="mt-4 text-4xl font-semibold text-[var(--ce-heading)]">{overview?.totalUsers ?? '—'}</p>
          </div>
          <div className="ce-card rounded-[2rem] p-6">
            <p className="text-sm text-[var(--ce-soft-ink)]">Bookings</p>
            <p className="mt-4 text-4xl font-semibold text-[var(--ce-heading)]">{overview?.totalBookings ?? '—'}</p>
          </div>
          <div className="ce-card rounded-[2rem] p-6">
            <p className="text-sm text-[var(--ce-soft-ink)]">Revenue</p>
            <p className="mt-4 text-4xl font-semibold text-[var(--ce-rose)]">₹{overview?.revenue ?? '0'}</p>
          </div>
        </div>

        <div className="ce-card-strong rounded-[2rem] p-8">
          <h2 className="ce-display text-3xl text-[var(--ce-heading)]">Recent activity</h2>
          <div className="mt-6 space-y-4">
            {overview && overview.recentBookings.length > 0 ? overview.recentBookings.map((booking: AdminBooking) => (
              <div key={booking._id} className="rounded-3xl border border-[rgba(118,91,77,0.14)] bg-[rgba(255,248,242,0.88)] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-[var(--ce-heading)]">{booking.eventType}</p>
                    <p className="text-sm text-[var(--ce-soft-ink)]">{booking.user?.name} · {booking.city} · ₹{booking.price}</p>
                  </div>
                  <span className="rounded-full bg-[rgba(180,218,228,0.32)] px-3 py-1 text-sm text-[var(--ce-heading)]">{booking.status}</span>
                </div>
              </div>
            )) : <p className="text-[var(--ce-soft-ink)]">No recent bookings yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
