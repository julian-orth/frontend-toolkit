import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://frontend-tools-hub.com";

  const tools = [
    "json-formatter",
    "uuid-generator",
    "base64",
    "url-encoder",
    "regex-tester",
    "color-picker",
    "lorem-ipsum",
    "timestamp-converter",
    "text-diff",
    "jwt-decoder",
  ];

  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...toolUrls,
  ];
}
