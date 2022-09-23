import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Deedit</title>
        <meta name="description" content="Deedit landing" />
      </Head>
      <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 bg-white">
        {/* Logo and title */}
        <div className='flex items-center'>
          <Link href="/">
            <a>
              <img src='./images/logo.svg' className='w-8 h-8 mr-2' />
            </a>
          </Link>
        </div>

        {/* Search Input */}
        <div className='flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white'>
          <i className='pl-4 pr-3 text-gray-500 fas fa-search' />
          <input type="text" className='py-1 pr-3 bg-transparent rounded focus:outline-none' />
        </div>
        {/* Auth buttons */}
      </div>

    </div>
  )
}
