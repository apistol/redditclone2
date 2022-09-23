import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import InputGroup from '../components/InputGroup'
import { useRouter } from 'next/router'

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<any>({})

    const router = useRouter()

    const submitForm = async (event: FormEvent) => {
        event.preventDefault()


        try {
            const res = await axios.post('/auth/login', { password, username })
            router.push("/")
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }

    }

    return (
        <div className="flex">
            <Head>
                <title>Login</title>
                <meta name="description" content="Register page" />
            </Head>

            <div className="w-40 h-screen bg-center bg-cover" style={{ backgroundImage: "url('/images/bricks.jpg')" }}></div>

            <div className="flex flex-col justify-center pl-6">
                <div className='w-70'>
                    <h1 className='mb-2 text-lg font-medium font-bungee'>Sign up</h1>
                    <form onSubmit={submitForm}>
                       
                        <InputGroup
                            className='mb-2'
                            value={username}
                            setValue={setUsername}
                            placeholder='Username'
                            error={errors.username}
                            type='text'
                        />

                        <InputGroup
                            className='mb-2'
                            value={password}
                            setValue={setPassword}
                            placeholder='Password'
                            error={errors.password}
                            type='text'
                        />

                        <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded">
                            Login
                        </button>

                        <small>
                            New to deeder ? <Link href="/register"><a className='ml-1 text-blue-500 uppercase'>Sign up</a></Link>
                        </small>

                    </form>

                </div>
            </div>
        </div>
    )
}
