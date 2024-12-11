import NavBar from "@/components/NavBar"
import NavRoot from "@/components/NavRoot"
import {ContactUs} from "@/components/ContacUs"

const AboutUs = () => {
    return (
        <div className="h-[100vh]">
            <NavBar />
            <NavRoot />

            <div className="md:flex md:justify-center md:flex-col md:items-center p-4">

            <h2 className="text-lg">¡Bienvenidos a Metal Crypt!</h2>
            <div className="md:flex">
                <div className="md:w-[50%] md:p-4 md:mt-8 ">
                    <p>
                    Tu refugio definitivo para todo lo relacionado con el metal underground. En Metal Crypt, nos apasiona la fuerza y la autenticidad de las bandas de metal que luchan en las sombras, aquellas que, lejos de los reflectores, mantienen vivo el espíritu del metal en su forma más pura.
                    </p>
                    <br />
                    <p>
                    Nuestra misión es registrar y dar visibilidad a las bandas de metal underground de todo el mundo, desde los rincones más oscuros hasta los escenarios más pequeños. Aquí podrás descubrir nuevas bandas, publicar tus propios proyectos de metal extremo y más.
                    </p>
                    <br />
                    <p>
                    Metal Crypt no es solo una página, es una comunidad global para todos aquellos que viven y respiran metal. Únete a nosotros en este viaje por el lado más crudo y real del metal. ¡El underground vive en Metal Crypt!
                    </p>
                    <br />
                    <p>Att: Mormothius y Stivliz creadores de Metal Crypt</p>
                </div>
                <div className="flex flex-col items-center justify-center md:w-[50%] md:p-10 mt-11">
                    <h3 className="mb-1">Contact Us</h3>
                    <ContactUs />
                </div>
            </div>

            </div>
        </div>
    )
}

export default AboutUs