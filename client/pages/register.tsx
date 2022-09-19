import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="flex">
            <Head>
                <title>Register</title>
                <meta name="description" content="Register page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="w-40 h-screen bg-center bg-cover" style={{ backgroundImage: "url('/images/bricks.jpg')" }}></div>

            <div className="flex flex-col justify-center pl-6">
                <div className='w-70'>
                    <h1 className='mb-2 text-lg font-medium'>Sign up</h1>
                    <p className="mb-10 text-xs">By continuig you agree with our User Agreement and Privacy Policy</p>
                    <form>
                        <div className="mb-6">
                            <input type="checkbox" className='mr-1 cursor-pointer' id='agreement' />
                            <label htmlFor='agreement' className='text-xs'>I agree to get emails about cool stories from Deedit</label>
                        </div>
                        <div className='mb-2'>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-gray-200 border border-gray-400 rounded"
                                placeholder='Email'
                            />
                        </div>

                        <div className='mb-2'>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-gray-200 border border-gray-400 rounded"
                                placeholder='Username'
                            />
                        </div>

                        <div className='mb-2'>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-gray-200 border border-gray-400 rounded"
                                placeholder='Password'
                            />
                        </div>

                        <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded">
                            Sign up
                        </button>

                        <small>
                            Allready a deeder? <Link href="/login"><a className='ml-1 text-blue-500 uppercase'>Log in</a></Link>
                        </small>

                    </form>

                </div>
            </div>
        </div>
    )
}
