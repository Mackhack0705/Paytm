import HeadingComponent from '../components/HeadingComponent'
import SubHeadingComponent from '../components/SubHeadingComponent'
import InputBoxComponent from '../components/InputBoxComponent'
import ButtonComponent from '../components/ButtonComponent'
import BottomWarningComponent from '../components/BottomWarningComponent'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const { register, handleSubmit} = useForm()

    async function submitSignup(data) {
        try {
            const res = await axios.post('http://localhost:3000/api/v1/user/signup', data)
            localStorage.setItem('userId', res.data.userId)
            alert(res.data.message)
            navigate('/dashboard')
        }
        catch(error) {
            console.log(`error: ${error.message}`)
        }
    }
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-96 text-center p-2 h-max px-10'>
                <HeadingComponent label={"Sign Up"} />
                <SubHeadingComponent label={"Enter your information to create an account"} />
                <InputBoxComponent register={register} name={'firstName'} label={"First Name"} placeholder={"John"}/>
                <InputBoxComponent register={register} name={'lastName'} label={"Last Name"} placeholder={"Doe"}/>
                <InputBoxComponent register={register} name={'username'} label={"Email"} placeholder={"johndoe@gmail.com"}/>
                <InputBoxComponent register={register} name={'password'} label={"Password"} placeholder={"123456"}/>
                <div className='pt-4'>
                    <ButtonComponent label={"Sign Up"} onSubmit={handleSubmit(submitSignup)}/>
                </div>
                <BottomWarningComponent label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    </div>
  )
}

export default Signup