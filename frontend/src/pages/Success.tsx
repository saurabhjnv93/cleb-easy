import { Link, useParams } from 'react-router-dom';

const Success = () => {
  const { id } = useParams();
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-24 text-[var(--ce-ink)]">
      <div className="ce-card-strong w-full max-w-2xl rounded-[2rem] p-10 text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(176,91,92,0.14)] text-3xl text-[var(--ce-rose)]">✓</div>
        <h1 className="ce-display mb-4 text-4xl text-[var(--ce-heading)]">Booking Confirmed!</h1>
        <p className="mb-6 text-[var(--ce-soft-ink)]">Your event booking has been created successfully. A confirmation message has been sent to your inbox and WhatsApp.</p>
        <p className="mb-8 text-sm text-[var(--ce-soft-ink)]">Booking ID: <span className="font-semibold text-[var(--ce-heading)]">{id}</span></p>
        <Link to="/dashboard" className="ce-button ce-button-primary px-8 py-3">Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default Success;
