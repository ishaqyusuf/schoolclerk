import { useEffect, useRef, useState } from "react";

export function usePageTitle() {
    // get document page title
    // get the first title and keep
    const hasRun = useRef(false);
    const [baseTitle, setBaseTitle] = useState(null);
    useEffect(() => {
        if (hasRun.current) return; // prevent second run
        hasRun.current = true; // mark as run
        setBaseTitle(document.title);
    }, []);
    return {
        keepTitle: () => setBaseTitle(document.title),
        reset: () => {
            document.title = baseTitle;
        },
        setTitle: (title) => {
            document.title = title;
        },
    };
}
