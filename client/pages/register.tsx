import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import InputGroup from '../components/InputGroup'
import { useRouter } from 'next/router'

export default function Register() {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [agreement, setAgreement] = useState(false)
    const [errors, setErrors] = useState<any>({})

    const router = useRouter()

    const submitForm = async (event: FormEvent) => {
        event.preventDefault()

        if(!agreement){
            return setErrors({
                ...errors, agreement: 'You must agree to Terms & Conditions.'
            })
        }

        try {
            const res = await axios.post('/auth/register', { email, password, username })
            router.push("/login")
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }

    }

    return (
        <div className="flex">
            <Head>
                <title>Register</title>
                <meta name="description" content="Register page" />
            </Head>

            <div className="w-40 h-screen bg-center bg-cover" style={{ backgroundImage: "url('/images/bricks.jpg')" }}></div>

            <div className="flex flex-col justify-center pl-6">
                <div className='w-70'>
                    <h1 className='mb-2 text-lg font-medium font-bungee'>Sign up</h1>
                    <p className="mb-10 text-xs">By continuig you agree with our User Agreement and Privacy Policy</p>
                    <form onSubmit={submitForm}>
                        <div className="mb-6">
                            <input type="checkbox" checked={agreement} onChange={e => setAgreement(e.target.checked)} className='mr-1 cursor-pointer' id='agreement' />
                            <label htmlFor='agreement' className='text-xs'>I agree to get emails about cool stories from Deedit</label>
                            <small className='block font-medium text-red-600'>{errors.agreement}</small>
                        </div>

                        <InputGroup
                            className='mb-2'
                            value={email}
                            setValue={setEmail}
                            placeholder='Email'
                            error={errors.email}
                            type='text'
                        />

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
