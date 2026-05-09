import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(255,241,239,0.14)] bg-[rgba(176,91,92,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="ce-display text-2xl font-semibold text-[#fff3ef]">CelebEasy</Link>
        <nav className="hidden items-center gap-6 text-sm text-[rgba(255,243,239,0.82)] md:flex">
          <Link to="/" className="transition hover:text-white">Home</Link>
          <Link to="/booking" className="transition hover:text-white">Book</Link>
          <Link to="/dashboard" className="transition hover:text-white">Dashboard</Link>
          <Link to="/admin" className="transition hover:text-white">Admin</Link>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="rounded-full border border-[rgba(255,243,239,0.18)] bg-[rgba(255,248,242,0.14)] px-4 py-2 text-sm text-[rgba(255,243,239,0.92)]">{user.name}</span>
              <button onClick={signOut} className="ce-button ce-button-primary px-4 py-2 text-sm">Logout</button>
            </>
          ) : (
            <Link to="/auth" className="rounded-full border border-[rgba(255,243,239,0.18)] bg-[rgba(255,248,242,0.14)] px-4 py-2 text-sm text-[rgba(255,243,239,0.92)] transition hover:bg-[rgba(255,248,242,0.22)]">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
