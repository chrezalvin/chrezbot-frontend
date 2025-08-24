import { StrictOmit } from "../../library/CustomTypes";
const debug = require("debug")("models:Recommend");

// TODO: Category to nullable
export interface Recommend{
    recommend_id: number;
    title: string;
    description: string;
    imgUrl: string | null;
    link: string | null;
    category: string[] | null;
}

export function isRecommend(obj: unknown): obj is Recommend{
    if(typeof obj !== "object" || obj === null) {
        debug("object is not defined or null");
        return false;
    }

    if(!("recommend_id" in obj)){
        debug("property recommend_id is not defined");
        return false;
    }

    if(!("title" in obj)){
        debug("property title is not defined");
        return false;
    }

    if(!("description" in obj)){
        debug("property description is not defined");
        return false;
    }

    if(!("imgUrl" in obj)){
        debug("property imgUrl is not defined");
        return false;
    }

    if(!("link" in obj)){
        debug("property link is not defined");
        return false;
    }

    if(!("category" in obj)){
        debug("property category is not defined");
        return false;
    }

    if(typeof obj.recommend_id !== "number"){
        debug("property recommend_id is not a number");
        return false;
    }

    if(typeof obj.title !== "string"){
        debug("property title is not a string");
        return false;
    }

    if(typeof obj.description !== "string"){
        debug("property description is not a string");
        return false;
    }

    if(typeof obj.imgUrl !== "string" && obj.imgUrl !== null){
        debug("property imgUrl is not a string or null");
        return false;
    }

    if(typeof obj.link !== "string" && obj.link !== null){
        debug("property link is not a string or null");
        return false;
    }

    if(!Array.isArray(obj.category) && obj.category !== null){
        debug("property category is not an array or null");
        return false;
    }

    return true;
}

export function isRecommendWithoutId(obj: unknown): obj is StrictOmit<Recommend, "recommend_id" | "imgUrl">{
    if(typeof obj !== "object" || obj === null) {
        debug("object is not defined or null");
        return false;
    }

    if(!("title" in obj)){
        debug("property title is not defined");
        return false;
    }

    if(!("description" in obj)){
        debug("property description is not defined");
        return false;
    }

    if(!("link" in obj)){
        debug("property link is not defined");
        return false;
    }

    if("category" in obj && !Array.isArray(obj.category)) return false;

    if(typeof obj.title !== "string"){
        debug("property title is not a string");
        return false;
    }

    if(typeof obj.description !== "string"){
        debug("property description is not a string");
        return false;
    }

    if(typeof obj.link !== "string" && obj.link !== null){
        debug("property link is not a string or null");
        return false;
    }

    return true;
}

export function isPartialRecommend(obj: unknown): obj is Partial<Recommend>{
    if(typeof obj !== "object" || obj === null) {
        debug("object is not defined or null");
        return false;
    }

    if("recommend_id" in obj){
        debug("property recommend_id is defined");
        return false;
    }

    if("title" in obj && typeof obj.title !== "string"){
        debug("property title is not a string");
        return false;
    }

    if("description" in obj && typeof obj.description !== "string"){
        debug("property description is not a string");
        return false;
    }

    if("imgUrl" in obj && typeof obj.imgUrl !== "string" && obj.imgUrl !== null){
        debug("property imgUrl is not a string or null");
        return false;
    }

    if("link" in obj && typeof obj.link !== "string" && obj.link !== null){
        debug("property link is not a string or null");
        return false;
    }

    if("category" in obj && !Array.isArray(obj.category)) return false;

    return true;
}