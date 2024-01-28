import { createI18n } from "vue-i18n";
import en from './en.json'
import es from './es.json'
import pt from './pt.json'

const messages = {
    en,
    es,
    pt,
}

const getLocale = (language: string) => {
    return language.includes('-') ? language.split('-')[0] : language;
}

const i18n = createI18n({
    locale: getLocale(navigator.language),
    fallbackLocale: 'pt',
    messages,
})

export const t = i18n.global.t.bind(i18n.global);