import React from 'react'
import {
  FormControl,
  FormField, FormLabel,FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Control, FieldPath} from 'react-hook-form'
import z from 'zod'
import { authFormSchema } from '@/lib/utils'

// const formSchema = authFormSchema('sign-up'); //used sign up since we want to use all of the fields
type FormSchema = z.infer<ReturnType<typeof authFormSchema>>;

interface CustomFormInput {
  control: Control<FormSchema>,
  name: FieldPath<FormSchema>,
  placeholder: string,
  label: string
}

const CustomInputForm = ({control, name, placeholder, label }: CustomFormInput) => {
  return (
    <>
      <FormField control={control} name={name} render={({ field }) => (

          <div className='form-item'>

            <FormLabel className='form-label'> {label} </FormLabel>

            <div className='flex w-full flex-col'>
              <FormControl>
                <Input placeholder={placeholder} className='input-class' type={name === 'password' ? 'password' : 'text'}   {...field} />
              </FormControl>
              <FormMessage className='form-message mt-2' />
            </div>

          </div>

        )}
      />
    
      
    </> 
  )
}

export default CustomInputForm