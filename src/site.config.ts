import enProfile from "./content/site/en.json";
import zhProfile from "./content/site/zh.json";
import { type Locale, locales } from "./lib/locales";

export type SiteProfile = {
  author: string;
  title: string;
  description: string;
  introTitle: string;
  intro: string;
  about: string[];
  timeZone: string;
  license: {
    label: string;
    url: string;
  };
  socialLinks: {
    label: string;
    url: string;
    icon?: string;
  }[];
};

export const siteProfiles = {
  zh: zhProfile,
  en: enProfile
} satisfies Record<Locale, SiteProfile>;

for (const locale of locales) {
  const profile = siteProfiles[locale];
  const required = ["author", "title", "description", "introTitle", "intro", "timeZone"] as const;
  const missing = required.filter((key) => !profile[key]);

  if (missing.length > 0) {
    throw new Error(`Missing site profile fields for ${locale}: ${missing.join(", ")}`);
  }
}

export function getSiteProfile(locale: Locale) {
  return siteProfiles[locale];
}

export const siteConfig = {
  author: siteProfiles.zh.author,
  title: Object.fromEntries(locales.map((locale) => [locale, siteProfiles[locale].title])) as Record<Locale, string>,
  description: Object.fromEntries(locales.map((locale) => [locale, siteProfiles[locale].description])) as Record<Locale, string>,
  introTitle: Object.fromEntries(locales.map((locale) => [locale, siteProfiles[locale].introTitle])) as Record<Locale, string>,
  intro: Object.fromEntries(locales.map((locale) => [locale, siteProfiles[locale].intro])) as Record<Locale, string>,
  about: Object.fromEntries(locales.map((locale) => [locale, siteProfiles[locale].about])) as Record<Locale, string[]>
};
