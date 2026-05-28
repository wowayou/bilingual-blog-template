import enMessages from "../i18n/messages/en";
import zhMessages from "../i18n/messages/zh";
import enTaxonomy from "../content/taxonomy/en.json";
import zhTaxonomy from "../content/taxonomy/zh.json";
import { getSiteProfile } from "../site.config";
import {
  defaultLocale,
  localeLabels,
  localeNames,
  locales,
  type Locale
} from "./locales";

type UiMessages = Record<string, string>;
type TagMeta = {
  label: string;
  description?: string;
};

const messages = {
  zh: zhMessages,
  en: enMessages
} satisfies Record<Locale, UiMessages>;

const taxonomies = {
  zh: zhTaxonomy,
  en: enTaxonomy
} as Record<Locale, Record<string, TagMeta>>;

export { defaultLocale, localeLabels, localeNames, locales, type Locale };

function buildUi(locale: Locale) {
  const profile = getSiteProfile(locale);

  return {
    ...messages[locale],
    siteTitle: profile.title,
    siteDescription: profile.description,
    introTitle: profile.introTitle,
    intro: profile.intro
  };
}

export const ui = {
  zh: buildUi("zh"),
  en: buildUi("en")
} satisfies Record<Locale, UiMessages & {
  siteTitle: string;
  siteDescription: string;
  introTitle: string;
  intro: string;
}>;

export type UiKey = keyof (typeof ui)[Locale];

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function t(locale: Locale, key: UiKey) {
  return ui[locale][key];
}

export function formatMessage(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce((message, [key, value]) => message.replace(`{${key}}`, value), template);
}

export function localizedPath(locale: Locale, path = "") {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

export function tagLabel(tag: string, locale: Locale) {
  return taxonomies[locale][tag]?.label ?? tag;
}

export function tagDescription(tag: string, locale: Locale) {
  return taxonomies[locale][tag]?.description;
}

export function assertKnownTags(tags: Iterable<string>, locale: Locale) {
  const missing = [...new Set(tags)].filter((tag) => !taxonomies[locale][tag]);

  if (missing.length > 0) {
    throw new Error(`Missing ${locale} taxonomy labels for tags: ${missing.join(", ")}`);
  }
}
