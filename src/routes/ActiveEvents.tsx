import debug from "debug";

import { useState } from "react";
import { getAllActiveEvents } from "../API/service/ActiveEventService";
import { ActiveEvent } from "../API/models";

const log = debug("app:ActiveEvents");

function ActiveEvents(){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [activeEvents, setActiveEvents] = useState<ActiveEvent[]>([]);

    async function loadActiveEventss(){
        setIsLoading(true);
        setError(null);

        try{
            const allActiveEvents = await getAllActiveEvents();
            console.log(`Got all active events: ${JSON.stringify(allActiveEvents)}`);
        }
        catch(e){
            if(e instanceof Error)
                setError(e.message);
            else{
                log(`Unknown error: ${e}`);
                setError("An unknown error occurred");
            }
        }
        finally{
            setIsLoading(false);
        }

    }

    return (
        <>
            <h1 className="text-center">
                <span className="px-3" style={{borderBlockEnd: "5px solid yellow"}}>
                    Active Events
                </span>
            </h1>
        </>
    )
}

export default ActiveEvents;