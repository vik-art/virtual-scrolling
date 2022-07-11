import { Image } from "./image.interface";

export interface apiResponse {
    totalHits: number,
    hits: Array<Image>
}