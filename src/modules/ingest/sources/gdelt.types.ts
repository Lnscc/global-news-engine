export type GdeltArticle = {
  url: string;
  url_mobile: string;
  title: string;
  seendate: string;
  socialimage: string;
  domain: string;
  language: string;
  sourcecountry: string;
};

export type GdeltApiResponse = {
  articles: GdeltArticle[];
};
