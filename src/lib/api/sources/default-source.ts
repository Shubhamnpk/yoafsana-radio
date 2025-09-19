import { BaseRadioSource } from './base';
import type { RadioStation } from '@/types/radio';
import { useSourceSettings } from '@/hooks/useSourceSettings';
import { transformDefaultStation } from '@/lib/transformers/default';

export class DefaultRadioSource extends BaseRadioSource {
  constructor(config: any) {
    super('default', config);
  }

  async fetchStations(): Promise<RadioStation[]> {
    try {
      const { standardSourceMode } = useSourceSettings.getState();

      let urls: string[];

      if (standardSourceMode === 'beta') {
        // Beta mode: fetch from both active and index
        urls = [
          'https://shubhamnpk.github.io/yoradio-api/data/active.json',
          'https://shubhamnpk.github.io/yoradio-api/data/index.json'
        ];
      } else {
        // Production mode: fetch only from active
        urls = [
          'https://shubhamnpk.github.io/yoradio-api/data/active.json'
        ];
      }

      const fetchPromises = urls.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch from ${url}`);
        return response.json();
      });

      const results = await Promise.all(fetchPromises);
      const allStations = results.flat();

      // Transform stations to match RadioStation interface
      const transformedStations = allStations.map(transformDefaultStation);

      // Remove duplicates based on station ID
      const uniqueStations = transformedStations.filter((station, index, self) =>
        index === self.findIndex(s => s.id === station.id)
      );

      return uniqueStations;
    } catch (error) {
      console.error('Error fetching default stations:', error);
      return [];
    }
  }
}