import debug from "debug";
import { axiosInstance } from "../axiosConfig";
import { isPartialQuote, isQuote, Quote } from "../models";

const log = debug("app:QuoteService");

/**
 * gets all chrezbot quotes
 * @returns array of quotes
 */
export async function getAllQuotes(): Promise<Quote[]> {
    const res = await axiosInstance.get("/quote");

    if(res.status !== 200)
        throw new Error("Failed to get quotes");

    const data = res.data as unknown;
    if(!Array.isArray(data) || !data.every(isQuote))
        throw new Error("Invalid data");

    return data;
}

/**
 * gets a quote by id
 * @param id quote id
 * @returns quote
 */
export async function getQuote(id: number): Promise<Quote> {
    const res = await axiosInstance.get(`/quote/${id}`);

    if(res.status !== 200)
        throw new Error("Failed to get quote");

    const data = res.data as unknown;
    if(!isQuote(data))
        throw new Error("Invalid data");

    return data;
}

/**
 * creates a new quote
 * @param newQuote the new quote
 * @returns the created quote
 */
export async function createQuote(newQuote: Omit<Quote, "quote_id">): Promise<Quote> {
    const res = await axiosInstance.post("/quote/add", newQuote);

    if(res.status !== 200)
        throw new Error("Failed to create quote");

    const data = res.data as unknown;

    if(!isQuote(data))
        throw new Error("Invalid data");

    return data;
}

/**
 * updates a quote by id
 * @param id quote id
 * @param updatedQuote the fields to be updated
 * @returns updated quote
 */
export async function updateQuote(id: number, updatedQuote: Partial<Omit<Quote, "id">>): Promise<Quote> {
    const res = await axiosInstance.post(`/quote/edit`, 
        {
            id,
            quote: updatedQuote
        }
    );

    if(res.status !== 200)
        throw new Error("Failed to update quote");

    const data = res.data as unknown;

    if(!isQuote(data))
        throw new Error("Invalid data");

    return data;
}

/**
 * deletes a quote by id
 * @param id quote id
 */
export async function deleteQuote(id: number): Promise<void> {
    const res = await axiosInstance.post(`/quote/delete`, {
        id
    });

    if(res.status !== 200)
        throw new Error("Failed to delete quote");
}