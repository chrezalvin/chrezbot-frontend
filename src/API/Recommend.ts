import axios from "axios";
import { BASE_URL } from "../config";

export interface Recommend{
    title: string;
    description: string;
    imgUrl?: string;
    link?: string;
    category?: string[];
}

export interface RecommendDoc{
    id: string;
    data: Recommend;
}

export function isRecommend(obj: unknown): obj is Recommend{
    if(typeof obj !== "object" || obj === null) return false;

    if(!("title" in obj) || !("description" in obj)) return false;

    return obj.title !== undefined && obj.description !== undefined;
}

export function isRecommendDoc(obj: unknown): obj is RecommendDoc{
    if(typeof obj !== "object" || obj === null) return false;

    if(!("id" in obj) || !("data" in obj)) return false;

    return isRecommend(obj.data);
}

export async function getAllRecommends(): Promise<RecommendDoc[]>{
    const res = await axios.get(`${BASE_URL}/recommend`);

    if(res.status !== 200) return [];

    if(Array.isArray(res.data) && res.data.every(isRecommendDoc))
        return res.data;

    return [];
}

export async function getRecommend(id: string): Promise<RecommendDoc | null>{
    const res = await axios.get(`${BASE_URL}/recommend/${id}`);

    if(res.status !== 200) return null;

    if(isRecommendDoc(res.data))
        return res.data;

    return null;
}