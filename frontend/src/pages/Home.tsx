import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  { title: 'Birthday Party', price: '₹2999', description: 'Soft palettes, cake styling, and quick in-home setup.' },
  { title: 'House Party', price: '₹3999', description: 'Decor bundles and energy-built hosting essentials.' },
  { title: 'Baby Shower', price: '₹3499', description: 'Warm, intimate setups with thoughtful finishing details.' },
  { title: 'Anniversary', price: '₹4999', description: 'Romantic styling with florals, candles, and table dressing.' },
];

const values = [
  { title: 'Pre-designed packages', copy: 'Decoration, accessories, and add-ons bundled into one calm booking flow.', accent: 'bg-[rgba(225,194,194,0.42)]' },
  { title: 'Verified vendors', copy: 'Reliable partners who can set up quickly without the usual follow-up chaos.', accent: 'bg-[rgba(204,196,236,0.42)]' },
  { title: 'Fast setup', copy: 'Built for intimate celebrations that need to feel special without weeks of planning.', accent: 'bg-[rgba(180,218,228,0.46)]' },
];

const Home = () => {
  return (
    <div className="px-6 pb-24 pt-10">
      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-7"
        >
          <span className="ce-pill text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--ce-rose)]" />
            Hassle-free events, timeless memories
          </span>
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--ce-soft-ink)]">Your Party, On Demand</p>
            <h1 className="ce-display max-w-3xl text-5xl leading-[0.95] text-[var(--ce-heading)] sm:text-6xl lg:text-7xl">
              Home celebrations with the calm, curated feel of a styled presentation.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--ce-soft-ink)]">
              CelebEasy turns stressful planning into a polished booking experience for birthdays, anniversaries, baby showers, and intimate gatherings across metro cities.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/booking" className="ce-button ce-button-primary">
              Start your booking
            </Link>
            <a href="#packages" className="ce-button ce-button-secondary">
              Explore packages
            </a>
          </div>
          <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
            <div className="ce-card rounded-[1.75rem] p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--ce-soft-ink)]">Focus</p>
              <p className="ce-display mt-3 text-3xl text-[var(--ce-heading)]">Sub-50</p>
              <p className="mt-2 text-sm text-[var(--ce-soft-ink)]">Intimate events only</p>
            </div>
            <div className="ce-card rounded-[1.75rem] p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--ce-soft-ink)]">Setup</p>
              <p className="ce-display mt-3 text-3xl text-[var(--ce-heading)]">Hours</p>
              <p className="mt-2 text-sm text-[var(--ce-soft-ink)]">Not weeks of coordination</p>
            </div>
            <div className="ce-card rounded-[1.75rem] p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--ce-soft-ink)]">Look</p>
              <p className="ce-display mt-3 text-3xl text-[var(--ce-heading)]">Curated</p>
              <p className="mt-2 text-sm text-[var(--ce-soft-ink)]">Aesthetic-first setups</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="ce-card-strong ce-ring relative overflow-hidden rounded-[2.5rem] p-8"
        >
          <div className="absolute -right-16 -top-14 h-44 w-44 rounded-full bg-[rgba(180,218,228,0.42)] blur-3xl" />
          <div className="absolute -left-12 bottom-8 h-32 w-32 rounded-full bg-[rgba(225,194,194,0.52)] blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-[var(--ce-soft-ink)]">CelebEasy</p>
                <h2 className="ce-display mt-2 text-4xl text-[var(--ce-heading)]">A gentler visual world</h2>
              </div>
              <div className="h-16 w-16 rounded-full border border-[rgba(118,91,77,0.16)] bg-[rgba(255,250,245,0.72)]" />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`rounded-[1.8rem] border border-[rgba(118,91,77,0.14)] p-5 ${
                    index % 2 === 0 ? 'bg-[rgba(255,248,242,0.9)]' : 'bg-[rgba(250,242,235,0.92)]'
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.28em] text-[var(--ce-soft-ink)]">Package</span>
                    <span className="rounded-full bg-[rgba(176,91,92,0.1)] px-3 py-1 text-xs text-[var(--ce-rose)]">Curated</span>
                  </div>
                  <h3 className="ce-display text-2xl text-[var(--ce-heading)]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--ce-soft-ink)]">{service.description}</p>
                  <p className="mt-5 text-xl font-semibold text-[var(--ce-rose)]">{service.price}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="ce-card rounded-[2.25rem] p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--ce-soft-ink)]">The problem</p>
            <h2 className="ce-display mt-4 text-4xl text-[var(--ce-heading)]">Planning small celebrations still feels scattered and expensive.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--ce-soft-ink)]">
              The presentation’s story is clear: people want intimate moments to feel beautiful, but the process is still fragmented across decoration, vendors, timing, and pricing.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className={`ce-card rounded-[2rem] p-6 ${value.accent}`}>
                <div className="mb-5 h-10 w-10 rounded-full border border-[rgba(118,91,77,0.14)] bg-[rgba(255,250,245,0.66)]" />
                <h3 className="ce-display text-2xl text-[var(--ce-heading)]">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#4f4039]">{value.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto mt-20 max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--ce-soft-ink)]">Featured packages</p>
            <h2 className="ce-display mt-3 text-4xl text-[var(--ce-heading)]">Soft cards, fixed pricing, and a more trustworthy booking flow.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[var(--ce-soft-ink)]">
            Instead of loud gradients and glossy product blocks, this section now follows the quiet elegance of your slides: more breathing room, warmer surfaces, and clearer information.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <div key={service.title} className="ce-card rounded-[2rem] p-6 transition duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.28em] text-[var(--ce-soft-ink)]">Package {index + 1}</span>
                <span className="h-3 w-3 rounded-full bg-[rgba(176,91,92,0.72)]" />
              </div>
              <h3 className="ce-display mt-5 text-3xl text-[var(--ce-heading)]">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ce-soft-ink)]">{service.description}</p>
              <div className="mt-8 flex items-center justify-between">
                <span className="text-2xl font-semibold text-[var(--ce-rose)]">{service.price}</span>
                <Link to="/booking" className="ce-button ce-button-secondary px-4 py-2 text-sm">
                  Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
