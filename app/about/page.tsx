import NavBar from "@/components/NavBar";
import NavRoot from "@/components/NavRoot";
import PopoverComponent from "@/components/Popover";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="h-[100vh]">
      <NavBar />
      <NavRoot />

      <div className="flex justify-center flex-col items-center ">
        <h2 className="text-lg">¡Bienvenidos a Metal Crypt!</h2>
        <div className="w-[60%] ">
          <div>
            <p>
              Tu refugio definitivo para todo lo relacionado con el metal
              underground. En Metal Crypt, nos apasiona la fuerza y la
              autenticidad de las bandas de metal que luchan en las sombras,
              aquellas que, lejos de los reflectores, mantienen vivo el espíritu
              del metal en su forma más pura.
            </p>
            <br />
            <p>
              Nuestra misión es registrar y dar visibilidad a las bandas de
              metal underground de todo el mundo, desde los rincones más oscuros
              hasta los escenarios más pequeños. Aquí podrás descubrir nuevas
              bandas, sumergirte en entrevistas exclusivas, seguir las giras más
              intensas y mantenerte al día con las últimas noticias del mundo
              del metal.
            </p>
            <br />
            <p>
              Metal Crypt no es solo una página, es una comunidad global para
              todos aquellos que viven y respiran metal. Únete a nosotros en
              este viaje por el lado más crudo y real del metal. ¡El underground
              vive en Metal Crypt!
            </p>
            <br />
            <p>Att: Mormothius y Stivliz creadores de Metal Crypt</p>
          </div>
          <div className="flex justify-end">
            <PopoverComponent />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
