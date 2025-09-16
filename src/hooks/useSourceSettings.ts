import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { radioSources } from '@/config/sources';

interface SourceSettings {
  enabledSources: string[];
  toggleSource: (sourceId: string) => void;
  isSourceEnabled: (sourceId: string) => boolean;
  radioBrowserCountry: string;
  setRadioBrowserCountry: (country: string) => void;
}

export const useSourceSettings = create<SourceSettings>()(
  persist(
    (set, get) => ({
      enabledSources: radioSources.filter(s => s.isDefault).map(s => s.id),
      radioBrowserCountry: 'bangladesh',

      toggleSource: (sourceId) => set((state) => ({
        enabledSources: state.enabledSources.includes(sourceId)
          ? state.enabledSources.filter(id => id !== sourceId)
          : [...state.enabledSources, sourceId]
      })),

      isSourceEnabled: (sourceId) => get().enabledSources.includes(sourceId),

      setRadioBrowserCountry: (country) => set({ radioBrowserCountry: country }),
    }),
    {
      name: 'yoradio-source-settings',
    }
  )
);