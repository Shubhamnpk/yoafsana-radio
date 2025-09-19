import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { radioSources } from '@/config/sources';

interface SourceSettings {
  enabledSources: string[];
  toggleSource: (sourceId: string) => void;
  isSourceEnabled: (sourceId: string) => boolean;
  radioBrowserCountry: string;
  setRadioBrowserCountry: (country: string) => void;
  standardSourceMode: 'production' | 'beta';
  setStandardSourceMode: (mode: 'production' | 'beta') => void;
}

export const useSourceSettings = create<SourceSettings>()(
  persist(
    (set, get) => ({
      enabledSources: radioSources.filter(s => s.isDefault).map(s => s.id),
      radioBrowserCountry: 'bangladesh',
      standardSourceMode: 'production',

      toggleSource: (sourceId) => set((state) => ({
        enabledSources: state.enabledSources.includes(sourceId)
          ? state.enabledSources.filter(id => id !== sourceId)
          : [...state.enabledSources, sourceId]
      })),

      isSourceEnabled: (sourceId) => get().enabledSources.includes(sourceId),

      setRadioBrowserCountry: (country) => set({ radioBrowserCountry: country }),

      setStandardSourceMode: (mode) => set({ standardSourceMode: mode }),
    }),
    {
      name: 'yoradio-source-settings',
    }
  )
);