import { Image } from "./image.interface";

export interface ApiResponse {
    totalHits: number;
    hits: Array<Image>
}
