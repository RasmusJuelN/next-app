import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './components/ProductCard'

export default function Home() {
  return (
    <main>
      <h1>hej</h1>
      <Link className='btn btn-secondary' href="/users">Users Page</Link>
      <Link className='btn btn-accent' href="/users/new">New Users Page</Link>
      <Link className='btn btn-neutral' href="/data">Data Page</Link>
      <Link className='btn btn-primary' href="/nivochart">Nivo Chart Page</Link>
      <ProductCard/>
    </main>
    
  )
}
