import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import logotipo from '@/assets/logotipo.svg';

const Login = () => {
    const [signInForm, setSignInForm] = useState({
        username: "",
        password: "",
    });
    const handleSignInChange = (e) => {
        const { name, value } = e.target;
        setSignInForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSignInSubmit = (e) => {
        e.preventDefault();
        console.log("Sign in form submitted:", signInForm);
    };

    return (
         <div className="h-screen w-screen flex flex-row items-center justify-center bg-[url(@/assets/lightBackground.png)] bg-cover">
             <div className="flex-1 w-1/2 h-full bg-[url(@/assets/login/loginBanner.png)] bg-cover">

             </div>
             <div className="w-1/2 pl-3 pr-[167px] py-[202px] flex-1 grow flex flex-col items-center justify-center gap-5 relative">
                 <div className="flex flex-col w-[463px] items-center justify-center gap-2.5 px-[30px] py-[25px] relative flex-[0_0_auto] mt-[-24.00px] mb-[-24.00px] rounded-[20px]">
                     <div className="flex w-[463px] h-[124px] items-center justify-center gap-px relative ml-[-30.00px] mr-[-30.00px]">
                         <img
                             className="relative w-[374.19px] h-[49.26px]"
                             alt="Logotipo ECIEXPRESS"
                             src={logotipo}
                         />
                     </div>
                     <div className="flex flex-col h-[45px] items-start justify-center gap-2.5 relative self-stretch w-full">
                         <h2 className="relative self-stretch h-[93px] mt-[-25.00px] mb-[-23.00px] text-neutral-800 text-[28px] flex items-center justify-center [font-family:'Arial_Rounded_MT_Bold-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
                             Iniciar sesión
                         </h2>
                     </div>
                     <form
                         onSubmit={handleSignInSubmit}
                         className="flex flex-col items-center w-full gap-2.5"
                         aria-label="Formulario de inicio de sesión"
                     >
                         <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                             <label
                                 htmlFor="signin-username"
                                 className="relative flex items-center justify-center w-[114px] h-[41px] mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-[#8b8b8b] text-base tracking-[0] leading-[normal]"
                             >
                                 Usuario
                             </label>
                             <input
                                 type="text"
                                 id="signin-username"
                                 name="username"
                                 value={signInForm.username}
                                 onChange={handleSignInChange}
                                 required
                                 className="relative self-stretch w-full h-[63px] bg-[#f6f6f6] rounded-[20px] shadow-[inset_0px_4px_4px_#00000008] px-5 [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-800 text-base"
                                 aria-label="Nombre de usuario"
                             />
                         </div>
                         <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] shadow-[inset_0px_4px_7.5px_#00000008]">
                             <label
                                 htmlFor="signin-password"
                                 className="relative flex items-center justify-center w-[114px] h-[41px] mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-[#8b8b8b] text-base tracking-[0] leading-[normal]"
                             >
                                 Contraseña
                             </label>
                             <input
                                 type="password"
                                 id="signin-password"
                                 name="password"
                                 value={signInForm.password}
                                 onChange={handleSignInChange}
                                 required
                                 className="relative self-stretch w-full h-[63px] bg-[#f6f6f6] rounded-[20px] shadow-[inset_0px_4px_4px_#00000008] px-5 [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-800 text-base"
                                 aria-label="Contraseña"
                             />
                         </div>
                         <div className="relative w-[403px] h-[33px]" />
                         <div className="inline-flex flex-col h-[88px] items-start gap-2.5 px-0 py-5 relative shadow-[0px_4px_4px_#00000008]">
                             <button
                                 type="submit"
                                 className="relative w-[146px] h-14 mb-[-8.00px] bg-[#5ac7e1] rounded-[20px] shadow-[0px_4px_4px_#00000008] cursor-pointer hover:bg-[#4ab5cf] transition-colors"
                                 aria-label="Iniciar sesión"
                             >
                <span className="absolute top-5 left-[30px] w-[89px] h-[19px] text-[#f6f6f6] text-2xl whitespace-nowrap flex items-center justify-center [font-family:'Arial_Rounded_MT_Bold-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
                  Iniciar
                </span>
                             </button>
                         </div>
                     </form>
                     <div className="inline-flex items-center justify-center gap-[5px] relative flex-[0_0_auto]">
                         <p className="relative flex items-center justify-center w-[205px] mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-[#8b8b8b] text-lg text-right tracking-[0] leading-[normal]">
                             ¿No tienes una cuenta?
                         </p>
                         <Link
                             to="/signup"
                             className="relative flex items-end justify-center w-[81px] mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-[#5ac7e1] text-lg tracking-[0] leading-[normal] underline hover:text-[#4ab5cf] transition-colors"
                             aria-label="Crear una cuenta"
                         >
                             Crea una
                         </Link>
                     </div>
                     <Link
                         to="/forgot-password"
                         className="relative flex items-end justify-center w-fit [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-[#5ac7e1] text-lg tracking-[0] leading-[normal] underline hover:text-[#4ab5cf] transition-colors"
                         aria-label="Recuperar contraseña"
                     >
                         ¿Olvidaste tu contraseña?
                     </Link>
                 </div>
             </div>
         </div>
    );
};

export default Login;