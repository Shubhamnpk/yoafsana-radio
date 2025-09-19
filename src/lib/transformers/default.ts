import type { RadioStation } from '@/types/radio';

interface DefaultStationData {
  id: string;
  name: string;
  streamUrl: string;
  frequency: number;
  address: string;
  province: number;
  [key: string]: any; // Allow additional properties
}

export function transformDefaultStation(station: DefaultStationData): RadioStation {
  return {
    id: station.id,
    name: station.name,
    streamUrl: station.streamUrl,
    frequency: station.frequency || null,
    address: station.address,
    province: station.province,
    // Add any other fields that might be present
    favicon: station.favicon,
    tags: station.tags,
    language: station.language,
    country: station.country,
    state: station.state,
    codec: station.codec,
    bitrate: station.bitrate,
    votes: station.votes,
    homepage: station.homepage,
    lastChecked: station.lastChecked,
    isOnline: station.isOnline,
  };
}