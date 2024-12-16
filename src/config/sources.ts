export interface RadioSource {
  id: string;
  name: string;
  url: string;
  isDefault: boolean;
  description: string;
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
    name: 'Radio Browser (bangali)',
    url: 'https://de1.api.radio-browser.info/json/stations/bycountry/bangladesh',
    isDefault: true,
    description: 'Extended collection from Radio Browser API'
  }
];