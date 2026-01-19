export class NewsMapDto {
  id: string;
  title: string;
  coordinates?: [number, number];
  importance: number;
  category?: string;
  location?: string;
}
