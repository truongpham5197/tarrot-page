import type { MetadataRoute } from "next";

const siteUrl = "https://lumiere-tarot-chiem-tinh.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/booking`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
