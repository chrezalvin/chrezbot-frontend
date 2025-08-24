import Cookies from "universal-cookie";
import debug from "debug";

const log = debug("app:localStorage");

interface LocalStorage {
    session_key: string | null;
}

const initial_state: LocalStorage = {
    session_key: null
};

const cookies = new Cookies();

/**
 * initializes the LocalStorage
 */
export function initializeLocalStorage(): void{
    log("Initializing LocalStorage");
    for(const key in initial_state){
        const value = getItem(key as keyof LocalStorage);
        log(`Checking ${key} = ${value}`);

        if(value === null){
            setItem(key as keyof LocalStorage, initial_state[key as keyof LocalStorage]);
        }
    }
}

/**
 * checks whether the input is an integer, used to anticipate uuid type data
 * @param data input
 * @returns 
 */
function isInteger(data: string): boolean {
    return typeof data === 'string' && /^[+-]?\d+$/.test(data);
}

/**
 * gets an item from the Cookies
 * @param key the key of the item
 * @returns the item stored in the Cookies
 */
export function getItem<_T extends keyof LocalStorage>(key: _T): LocalStorage[_T] | null{
    const data = cookies.get(key) as string | undefined | Object;
    log(`getting data from async storage with key: ${key}, data: ${data}`);
    
    if(data === "null" || data === undefined)
        return null;
    
    if(typeof data === "object")
        return data as LocalStorage[_T];
    
    if(isInteger(data)){
        if(!isNaN(parseInt(data)))
            return parseInt(data) as any;
    }
    
    if(data === "true" || data === "false"){
        return ((data === "true") as unknown) as LocalStorage[_T];
    }

    return data as LocalStorage[_T];
}

/**
 * sets an item in the Cookies
 * @param key Cookies key
 * @param value the value to be stored
 */
export function setItem<_T extends keyof LocalStorage>(key: _T, value: LocalStorage[_T]): LocalStorage[_T]{
    if(value === null || value === undefined){
        cookies.remove(key);
        return null;
    }

    log(`setting data in async storage with key: ${key}, data: ${value}`);
    let data: string | Object;

    switch(typeof value){
        case "object":
        case "string":
            data = value as Object | string;
            break;
        case "number":
        case "boolean":
        case "bigint":
            data = (value as number).toString();
            break
        default:
            data = "";
            break;
    }

    cookies.set(key, data);

    return getItem(key) as LocalStorage[_T];
}