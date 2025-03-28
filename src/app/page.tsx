import { Hero } from '../components/hero';
import { Main } from '../components/main';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ backgroundImage: `url('/images/acai-background.jpg')` }}>
      <Hero />
      <Main />
      <img src="/images/acai-background.jpg" alt="Açaí" />
    </div>
  );
} 