import { isRecommend, Recommend } from "../models";
import { axiosInstance } from "../axiosConfig";

/**
 * gets all recommends
 * @returns array of recommends
 */
export async function getAllRecommends(): Promise<Recommend[]> {
    const res = await axiosInstance.get("/recommend");

    if(res.status !== 200)
        throw new Error("Failed to get recommends");

    const data = res.data as unknown;
    if(!Array.isArray(data) || !data.every(isRecommend))
        throw new Error("Invalid data");

    return data;
}

/**
 * gets a recommend by id
 * @param id recommend id
 * @returns recommend
 */
export async function getRecommend(id: string): Promise<Recommend> {
    const res = await axiosInstance.get(`/recommend/${id}`);

    if(res.status !== 200)
        throw new Error("Failed to get recommend");

    const data = res.data as unknown;
    if(!isRecommend(data))
        throw new Error("Invalid data");

    return data;
}

/**
 * creates a new recommend
 * @param newRecommend the new recommend
 * @param image the image of the recommend in blob form
 * @returns the created recommend
 */
export async function addRecommend(newRecommend: Omit<Recommend, "recommend_id" | "imgUrl">, image?: Blob): Promise<Recommend> {
    const formData = new FormData();

    if(image)
        formData.append("image", image);

    formData.append("recommend", JSON.stringify(newRecommend));

    const res = await axiosInstance.post("/recommend/add", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    if(res.status !== 200)
        throw new Error("Failed to create recommend");

    const data = res.data as unknown;

    if(!isRecommend(data))
        throw new Error("Invalid data");

    return data;
}

/**
 * updates a recommend by id
 * @param id recommend id
 * @param updatedRecommend the fields to be updated
 * @param image the image of the recommend in blob form
 * @returns updated recommend
 */
export async function editRecommend(id: string, updatedRecommend: Partial<Omit<Recommend, "id" | "imgUrl">>, image?: Blob): Promise<Recommend> {
    const formData = new FormData();

    if(image)
        formData.append("image", image);

    formData.append("recommend", JSON.stringify(updatedRecommend));

    const res = await axiosInstance.post(`/recommend/edit/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    if(res.status !== 200)
        throw new Error("Failed to update recommend");

    const data = res.data as unknown;

    if(!isRecommend(data))
        throw new Error("Invalid data");

    return data;
}

/**
 * deletes a recommend by id
 * @param id recommend id
 */
export async function deleteRecommend(id: Recommend["recommend_id"]): Promise<void> {
    const res = await axiosInstance.post(`/recommend/delete`, { recommend_id: id});

    if(res.status !== 200)
        throw new Error("Failed to delete recommend");
}