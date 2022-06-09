import { useEffect, useState } from "react";

const PREFIX = "whatsapp-clone-";

export const useLocalStorage = (key: string, initialValue: Function | string | number | boolean) => {
    const prefixdKey = PREFIX + key;
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixdKey);
        if (jsonValue !== null) return JSON.parse(jsonValue);
        if (typeof initialValue === "function") {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(prefixdKey, JSON.stringify(value));
    }, [prefixdKey, value]);

    return [value, setValue];
};
