'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { authFormSchema } from '@/lib/utils'
import CustomInputForm from './CustomInputForm'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SignUp, SignIn, getLoggedInUser } from '@/lib/actions/user.actions'



const AuthForm = ({ type }: {type: string}) => {


  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  const formSchema = authFormSchema(type);
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log('Hmm')

    try {
      if (type === 'sign-up'){
        console.log('SignUp Data', {data});
        const newUser = await SignUp(data);
        console.log('SignUp Response', newUser);
        setUser(newUser)
      }

      if (type === 'sign-in'){
        const response = await SignIn({email: data.email, password: data.password});
        console.log('sign in =>', response)
        if(response) router.push('/')
      }


    } catch (error) {
      
    } finally {
      setIsLoading(false);

    }
  }


  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
         
          <Link href={'/'} className='cursor-pointer flex items-center gap-1'>

            <Image
              src={'/icons/logo.svg'} width={34} height={34} 
              alt="logo"
            />

            <h1 className='text-26 font-ibm-plex-serif text-black-1'>Horizon</h1>

          </Link>


          <div className='flex flex-col gap-1 md:gap-3'>
            <h1 className='text-24 lg:text-36 font-semibold text-grey-900'>
              {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </h1>
            <p className='text-16 font-normal text-grey'> 
              {user ? 'Link your account to get started' : 'Please enter your details'}
            </p>
          </div>

      </header>

      {user ? (
        <div className='flex flex-col gap-4'>
          {/* PlaidLink */}

        </div>
        ) :  (
          <>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {type === 'sign-up' && (
                  <>
                    <div className='flex gap-4'>
                      <CustomInputForm control={form.control} name="firstName" placeholder='Enter your first name' label='First Name' />
                      <CustomInputForm control={form.control} name="lastName" placeholder='Enter your last name' label='Last Name' />
                    </div>  

                    <CustomInputForm control={form.control} name="address1" placeholder='Enter your specific address' label='Address' />
                    <CustomInputForm control={form.control} name="city" placeholder='Enter your city' label='City' />
                    

                    <div className='flex gap-4'>
                      <CustomInputForm control={form.control} name="state" placeholder='Example: NY' label='State' />
                      <CustomInputForm control={form.control} name="postalCode" placeholder='Example: 11101' label='Postal Code' />
                    </div>  


                    <div className='flex gap-4'>
                      <CustomInputForm control={form.control} name="dateOfBirth" placeholder='YYYY-MM-DD' label='Date Of Birth' />
                      <CustomInputForm control={form.control} name="ssn" placeholder='Example: 1234' label='SSN' />
                    </div>

                    <CustomInputForm control={form.control} name="email" placeholder='Enter your email' label='Email' />
                    <CustomInputForm control={form.control} name="password" placeholder='Enter your password' label='Password' />

                    
                  </> 
                )}

                {type === 'sign-in' && (
                  <>  
                    <CustomInputForm control={form.control} name="email" placeholder='Enter your email' label='Email' />
                    <CustomInputForm control={form.control} name="password" placeholder='Enter your password' label='Password' />
                  </>
                )}

                <div className='flex flex-col gap-4'>

                  <Button type="submit" className='form-btn' disabled={isLoading ? true : false} >

                    {
                      isLoading ? 
                        (
                          <>
                            <Loader2 size={20} className='animate-spin' />&nbsp; Loading...
                          </>
                        )
                      : 
                        type === 'sign-in' ? 'Sign In' : 'Sign Up'
                    
                    }

                  </Button>

                </div>

              </form>

            </Form>


            <footer className='flex justify-center gap-1'>

              <p className='text-14 font-normal text-gray-600'> 
                {type === 'sign-in' ? "Dont't have an account" : "Already have an account?"}
              </p>
              <Link href= {type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link' >        
                {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
              </Link>

            </footer>
            
          </>
        )
      }

    </section>

  )
}

export default AuthForm