import keyFeatures from "../aboutData/keyFeatures.json"
import techUsed from "../aboutData/techUsed.json"
import devProcess from "../aboutData/developmentProgress.json"
import plannedFuture from "../aboutData/plannedFuture.json"
import { GiBullseye, GiCrystalBall } from "react-icons/gi";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { CheckCircleIcon, ComputerDesktopIcon, EnvelopeIcon, RocketLaunchIcon, SparklesIcon, SwatchIcon } from "@heroicons/react/24/solid";


const AboutPage = () => {


    return (
        <div>

            <h1 className='w-full h-28 flex items-center justify-center text-darkblue font-extrabold text-4xl'>
                <span className="flex-grow border-t border-darkblue mx-0 md:mx-4"></span>
                About This Web-Page
                <span className="flex-grow border-t border-darkblue mx-0 md:mx-4"></span>
            </h1>

            <article className="bg-darkblue rounded-3xl text-cream max-w-[1600px] mx-auto px-5 md:px-10 py-5 mb-20">

                <div className="flex flex-col gap-4 py-4">
                    <h3 className='text-center text-cream flex items-center justify-center border-b pb-4'>
                        Project Purpose
                        <GiBullseye className="ml-3 w-10 h-10 hidden md:block" />
                    </h3>
                    <p>This project was developed as a personal challenge to create a demo e-commerce website. The primary focus was not on design but on experimenting with and testing the features offered by React. <strong>Since no designer was involved, the goal was to explore frontend-backend integration,</strong> React’s capabilities, and performance optimization.
                    </p>
                    <p>The project was built using the AdventureWorks database, which lacked images and detailed descriptions for some products. <strong>However, various filtering mechanisms were implemented to prioritize displaying products with price and essential details.</strong>
                    </p>
                </div>

                {/* Techs Used */}
                <div className="flex flex-col gap-4 py-4">
                    <h3 className='text-center text-cream flex items-center justify-center border-b pb-4'>
                        {techUsed.title}
                        <FaScrewdriverWrench className="ml-3 w-7 h-7 hidden md:block" />
                    </h3>
                    {techUsed.sub.map((data, index) => (
                        <div key={index}>
                            <h5 className="my-4 text-cream flex items-center ">
                                {data.subtitle}
                                {index == 0 ?
                                    (<ComputerDesktopIcon width={28} height={28} className="ml-3" />) :
                                    (<SwatchIcon width={28} height={28} className="ml-3" />)}
                            </h5>
                            <ul className="list-disc list-inside flex flex-col gap-2" >
                                {data.bulletPoints.map((bullets, index) => {
                                    const parts = bullets.split(':')
                                    return (
                                        <li key={index}>
                                            <strong>{parts[0]}:</strong> {parts.slice(1).join(":")}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Key Features */}
                <div className="flex flex-col gap-4 py-4">
                    <h3 className='text-center text-cream flex items-center justify-center border-b pb-4'>
                        {keyFeatures.title}
                        <RocketLaunchIcon className="ml-3 w-7 h-7 hidden md:block" />
                    </h3>

                    {keyFeatures.sub.map((data, index) => (
                        <div key={index}>
                            <h5 className="my-4 text-cream flex items-center ">
                                {data.subtitle}
                                <CheckCircleIcon width={28} height={28} className="ml-3" />
                            </h5>
                            <ul className="list-disc list-inside flex flex-col gap-2">
                                {data.bulletPoints.map((bullets, index) => (
                                    <li key={index}>{bullets}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Development Process */}
                <div className="flex flex-col gap-4 py-4">
                    <h3 className='text-center text-cream flex items-center justify-center border-b pb-4'>
                        {devProcess.title}
                        <RocketLaunchIcon className="ml-3 w-7 h-7 hidden md:block" />
                    </h3>

                    {devProcess.sub.map((data, index) => (
                        <div key={index}>
                            <h5 className="my-4 text-cream flex items-center ">
                                {data.subtitle}
                            </h5>
                            <ul className="list-disc list-inside flex flex-col gap-2">
                                {data.bulletPoints.map((bullets, index) => (
                                    <li key={index}>{bullets}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Planned for Future */}
                <div className="flex flex-col gap-4 py-4">
                    <h3 className='text-center text-cream flex items-center justify-center border-b pb-4'>
                        {plannedFuture.title}
                        <GiCrystalBall className="ml-3 w-7 h-7 hidden md:block" />
                    </h3>

                    {plannedFuture.sub.map((data, index) => (
                        <div key={index}>
                            <h5 className="my-4 text-cream flex items-center ">
                                {data.subtitle}
                                <SparklesIcon width={28} height={28} className="ml-3" />
                            </h5>
                            <ul className="list-disc list-inside flex flex-col gap-2">
                                {data.bulletPoints.map((bullets, index) => (
                                    <li key={index}>{bullets}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4 py-4">
                    <h3 className='text-center text-cream flex items-center justify-center border-b pb-4'>
                        Contact & Feedback
                        <EnvelopeIcon className="ml-3 w-10 h-10 hidden md:block" />
                    </h3>

                    <p>If you have any feedback or suggestions about the project, feel free to reach out through the links in the footer
                    </p>


                </div>
            </article>
        </div>
    );
};

export default AboutPage;
