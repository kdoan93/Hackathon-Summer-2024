import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './components/ProductCard'

export default function Home() {
  return (
    <main>
      <h1>Sustain</h1>
      <h2>Nourish. Embrace. Overcome.</h2>
      <Link href="/users">Users</Link>
      <Link href="/gemini">Gemini Test</Link>
      <ProductCard />
    </main>
  );
}
