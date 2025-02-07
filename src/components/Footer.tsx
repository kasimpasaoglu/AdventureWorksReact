import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";


const Footer = () => {
    return (
        <footer className="px-10 py-5 shadow-top-darkblue rounded-t-3xl text-cream bg-darkblue grid md:grid-cols-3 gap-3">
            <p className="text-center">
                Designed and created from scratch by <a className="hover:underline duration-300" href="https://www.linkedin.com/in/kasim-pasaoglu/" target="_blank" rel="noopener noreferrer">Kasim Pasaoglu</a>
            </p>
            <p className="font-extrabold text-center">
                This website is a demo and does not facilitate actual purchases or transactions.
            </p>
            <div className="flex justify-center items-center gap-3">
                <a
                    aria-label="Github"
                    href="https://github.com/kasimpasaoglu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                >
                    <FaGithub className="w-8 h-8 hover:scale-125 hover:text-gray-100 duration-300" />
                </a>
                <a
                    aria-label="LinkedIn"
                    href="https://www.linkedin.com/in/kasim-pasaoglu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                >
                    <FaLinkedin className="w-8 h-8 hover:scale-125 hover:text-blue-500 duration-300" />
                </a>
                <a
                    aria-label="WhatsApp"
                    href=" https://wa.me/905433010531"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                >
                    <FaWhatsapp className="w-8 h-8 hover:scale-125 hover:text-green-600 duration-300" />
                </a>
                <a
                    aria-label="Instagram"
                    href="https://www.instagram.com/kasimpasaoglu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                >
                    <FaInstagram className="w-8 h-8 hover:scale-125 hover:text-pink-700 duration-300" />
                </a>
            </div>
        </footer>
    )
}

export default Footer