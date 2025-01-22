import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { useWindowScroll } from "@mantine/hooks";

const GoTopButton = () => {
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <button
            type="button"
            onClick={() => scrollTo({ y: 0 })}
            className={`fixed bottom-5 right-5 h-12 w-12 bg-lightred text-white rounded-xl p-2 
            transform transition-all duration-500
            ${scroll.y > 400 ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-20 pointer-events-none -z-10'}
            hover:scale-125`}
        >
            <ChevronUpIcon className="h-full w-full" />
        </button>
    );
};

export default GoTopButton;
