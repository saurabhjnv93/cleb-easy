const Footer = () => {
  return (
    <footer className="border-t border-[rgba(118,91,77,0.14)] bg-[rgba(255,248,242,0.62)] text-[var(--ce-soft-ink)]">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="ce-display text-2xl font-semibold text-[var(--ce-heading)]">CelebEasy</h3>
            <p className="mt-4 max-w-sm text-[var(--ce-soft-ink)]">Hassle-free home event bookings for metro cities, shaped with the soft, curated feel of your presentation deck.</p>
          </div>
          <div>
            <h4 className="ce-display text-lg font-semibold text-[var(--ce-heading)]">Quick links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="/" className="transition hover:text-[var(--ce-heading)]">Home</a></li>
              <li><a href="/booking" className="transition hover:text-[var(--ce-heading)]">Book</a></li>
              <li><a href="/dashboard" className="transition hover:text-[var(--ce-heading)]">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="ce-display text-lg font-semibold text-[var(--ce-heading)]">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>hello@celebeasy.com</li>
              <li>+91 98765 43210</li>
              <li>Metro cities only</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-[rgba(118,91,77,0.14)] pt-6 text-center text-sm text-[var(--ce-soft-ink)]">© 2026 CelebEasy. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
