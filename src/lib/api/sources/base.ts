import type { RadioStation } from '@/types/radio';
import type { RadioSource as ConfigRadioSource } from '@/config/sources';

export interface RadioSource {
  id: string;
  fetchStations(): Promise<RadioStation[]>;
  searchStations?(query: string): Promise<RadioStation[]>;
}

export class BaseRadioSource implements RadioSource {
  id: string;
  config: ConfigRadioSource;

  constructor(id: string, config: ConfigRadioSource) {
    this.id = id;
    this.config = config;
  }

  async fetchStations(): Promise<RadioStation[]> {
    throw new Error('Method not implemented');
  }
}