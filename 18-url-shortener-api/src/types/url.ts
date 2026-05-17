export interface UrlType {
    _id: string;
    originalUrl: string;
    shortCode: string;
    clicks: number;
    createdAt: string;
    lastVisited?: string | null;
}