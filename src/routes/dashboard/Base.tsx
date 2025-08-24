import debug from "debug";
import { createActiveEvent, getActiveEvent, getAllActiveEvents, updateActiveEvent } from "../../API/service/ActiveEventService";
import sourdough from "../sourdough.jpg";
const log = debug("app:Base");


function Base(){
    async function testing(){
        try{
            log("Getting all active events");
            const allActiveEvents = await getAllActiveEvents()

            log(`Got all active events: ${JSON.stringify(allActiveEvents)}`);

            log("Getting active event by id");
            const activeEvent = await getActiveEvent(7);

            log(`Got active event: ${JSON.stringify(activeEvent)}`);

            // add active event now
            const now = new Date();
            const nowPlus2Days = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
            const imageFetched = await fetch(sourdough);
            const imageBlob = await imageFetched.blob();
            const newActiveEvent = await createActiveEvent({
                title: "Testing",
                description: "This is a test",
                start_date: now.toLocaleDateString(),
                end_date: nowPlus2Days.toLocaleDateString(),
                link: null,
                short_description: null
            }, imageBlob);

            log(`Created active event: ${JSON.stringify(newActiveEvent)}`);

            const updated = updateActiveEvent(newActiveEvent.active_event_id, {
                title: "Updated",
                description: "This is an updated test"
            })

            log(`Updated active event: ${JSON.stringify(updated)}`);
        }
        catch(e){
            log(`Error: ${e}`);
        }
    }

    return(
        <div>
            <h1>Dashboar</h1>
            <button onClick={testing}>Test</button>
        </div>
    )
}

export default Base;