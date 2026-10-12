import { useRouteError } from 'react-router-dom'
import ErrorVolt from '../assets/img/ErrorVolt.png'

export default function ErrorPage(){

    const error = useRouteError();

    return(
        <div className='flex w-screen h-screen justify-center items-center'>
            <img className='w-80' src={ErrorVolt} alt="logo volt cassé " />
            <div className='flex flex-col'>
                <h1 className='text-[60px] font-black'>Oups, Une erreur est survenue ! </h1> 
            <p className='text-[30px]'>
                {error.error.toString()}
            </p>

            </div>
            
            

        </div>
        
    )
}