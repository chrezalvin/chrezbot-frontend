export interface Profile{
    discordID: string;
    name: string;
    avatarID: string;
    alias: string[];
    birthday: {
        day: number;
        month: number;
        year: number | null;
    } | null;
    timezone?: undefined;
}

export function isProfile(val: unknown): val is Profile{
    return true;
    // if(val === null || typeof val !== "object") return false;

    // const keys = [
    //     {key: "discordID", type: "string"},
    //     {key: "name", type: "string"},
    //     {key: "avatarID", type: "string"},
    //     {key: "alias", type: "array"},
    //     {key: "birthday", type: "object"},
    // ]

    // for(const a of keys){
    //     if(a.key in val && typeof (val as any)[a.key] === a.type) continue;
    //     return false;
    // }

    
}

export function checkArrayType<_T>(val: unknown[], typeGuard: (val: unknown) => val is _T): val is _T[]{
    for(const ele of val)
        if(!typeGuard(ele)) return false;
    return true;
}