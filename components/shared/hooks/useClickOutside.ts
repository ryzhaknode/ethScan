import {useEffect, useRef, useState} from 'react';

const useClickOutside = (excludeRef: React.RefObject<HTMLElement>) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isActive &&
                ref.current &&
                excludeRef.current &&
                !excludeRef.current.contains(event.target as Node) &&
                !ref.current.contains(event.target as Node)
            ) {
                setIsActive(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isActive, ref, excludeRef]);

    return [isActive, setIsActive, ref] as const;
};

export default useClickOutside;