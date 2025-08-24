import { ActiveEvent, isActiveEvent } from "../models";
import { axiosInstance } from "../axiosConfig";

export async function getAllActiveEvents(): Promise<ActiveEvent[]> {
    const res = await axiosInstance.get("/activeEvents/all");

    if(res.status !== 200)
        throw new Error("Failed to get active events");

    const data = res.data as unknown;

    if(!Array.isArray(data) || !data.every(isActiveEvent))
        throw new Error("Invalid data");

    return data;
}

export async function getActiveEvent(id: number): Promise<ActiveEvent> {
    const res = await axiosInstance.get(`/activeEvents/${id}`);

    if(res.status !== 200)
        throw new Error("Failed to get active event");

    const data = res.data as unknown;

    if(!isActiveEvent(data))
        throw new Error("Invalid data");

    return data;
}

export async function getOngoingActiveEvent(): Promise<ActiveEvent> {
    const res = await axiosInstance.get("/activeEvents/ongoing");

    if(res.status !== 200)
        throw new Error("Failed to get ongoing active event");

    const data = res.data as unknown;

    if(!isActiveEvent(data))
        throw new Error("Invalid data");

    return data;
}

export async function getIncomingActiveEvent(): Promise<ActiveEvent> {
    const res = await axiosInstance.get("/activeEvents/incoming");

    if(res.status !== 200)
        throw new Error("Failed to get incoming active event");

    const data = res.data as unknown;

    if(!isActiveEvent(data))
        throw new Error("Invalid data");

    return data;
}

export async function createActiveEvent(newActiveEvent: Omit<ActiveEvent, "active_event_id" | "img_path">, file?: Blob): Promise<ActiveEvent> {
    const formData = new FormData();

    formData.append("activeEvent", JSON.stringify(newActiveEvent));

    if(file)
        formData.append("image", file);

    const res = await axiosInstance.post("/activeEvents/add", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    if(res.status !== 200){
        console.log(`Failed to create active event: ${JSON.stringify(res.data)}`);
        throw new Error("Failed to create active event");
    }

    const data = res.data as unknown;

    if(!isActiveEvent(data))
        throw new Error("Invalid data");

    return data;
}

export async function updateActiveEvent(id: number, updatedActiveEvent: Partial<Omit<ActiveEvent, "id" | "img_path">>, file?: Blob): Promise<ActiveEvent> {
    const formData = new FormData();

    formData.append("activeEvent", JSON.stringify(updatedActiveEvent));
    formData.append("id", id.toString());

    if(file)
        formData.append("image", file);

    const res = await axiosInstance.post(`/activeEvents/edit`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    if(res.status !== 200)
        throw new Error("Failed to update active event");

    const data = res.data as unknown;

    if(!isActiveEvent(data))
        throw new Error("Invalid data");

    return data;
}

export async function deleteActiveEvent(id: number): Promise<void> {
    const res = await axiosInstance.post(`/activeEvents/delete/${id}`);

    if(res.status !== 200)
        throw new Error("Failed to delete active event");
}