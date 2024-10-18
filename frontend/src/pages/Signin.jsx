import HeadingComponent from '../components/HeadingComponent'
import SubHeadingComponent from '../components/SubHeadingComponent'
import InputBoxComponent from '../components/InputBoxComponent'
import ButtonComponent from '../components/ButtonComponent'
import BottomWarningComponent from '../components/BottomWarningComponent'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()

    async function submitSignin(data) {
        const res = await axios.post('http://localhost:3000/api/v1/user/signin', data)
        localStorage.setItem('token', res.data.token)
        navigate('/dashboard')
    }
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-96 text-center p-2 h-max px-10'>
                <HeadingComponent label={"Sign In"} />
                <SubHeadingComponent label={"Enter your credentials to access your account"} />
                <InputBoxComponent register={register} name={'username'} label={"Email"} placeholder={"johndoe@gmail.com"}/>
                <InputBoxComponent register={register} name={'password'} label={"Password"} placeholder={"123456"}/>
                <div className='pt-4'>
                    <ButtonComponent label={"Sign In"} onSubmit={handleSubmit(submitSignin)}/>
                </div>
                <BottomWarningComponent label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>
  )
}

export default Signin