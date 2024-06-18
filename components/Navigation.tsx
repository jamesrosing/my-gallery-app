// components/Navigation.tsx
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid white' }}>
      <Link href="/" style={{ marginRight: '1rem' }}>
        Home
      </Link>
      <Link href="/gallery" style={{ marginRight: '1rem' }}>
        Gallery
      </Link>
      <Link href="/studio">
        Studio
      </Link>
    </nav>
  );
};

export default Navigation;
