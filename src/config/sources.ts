export interface RadioSource {
  id: string;
  name: string;
  url: string;
  isDefault: boolean;
  description: string;
  country?: string;
}

export const radioSources: RadioSource[] = [
  {
    id: 'default',
    name: 'Standard Source',
    url: 'https://shubhamnpk.github.io/yoradio-api/data/',
    isDefault: false,
    description: 'Primary collection of radio stations'
  },
  {
    id: 'radio-browser',
    name: 'Radio Browser',
    url: 'https://de1.api.radio-browser.info/json/stations/bycountry/',
    isDefault: true,
    description: 'Extended collection from Radio Browser API',
    country: 'bangladesh'
  }
];