import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FilterState, SortOption } from '@/types/radio';
import { useSourceSettings } from '@/hooks/useSourceSettings';

const countries = [
  { value: 'bangladesh', label: '🇧🇩 Bangladesh' },
  { value: 'india', label: '🇮🇳 India' },
  { value: 'pakistan', label: '🇵🇰 Pakistan' },
  { value: 'united states', label: '🇺🇸 United States' },
  { value: 'united kingdom', label: '🇬🇧 United Kingdom' },
  { value: 'germany', label: '🇩🇪 Germany' },
  { value: 'france', label: '🇫🇷 France' },
  { value: 'italy', label: '🇮🇹 Italy' },
  { value: 'spain', label: '🇪🇸 Spain' },
  { value: 'canada', label: '🇨🇦 Canada' },
  { value: 'australia', label: '🇦🇺 Australia' },
  { value: 'japan', label: '🇯🇵 Japan' },
  { value: 'china', label: '🇨🇳 China' },
  { value: 'south korea', label: '🇰🇷 South Korea' },
  { value: 'brazil', label: '🇧🇷 Brazil' },
  { value: 'mexico', label: '🇲🇽 Mexico' },
  { value: 'argentina', label: '🇦🇷 Argentina' },
  { value: 'russia', label: '🇷🇺 Russia' },
  { value: 'turkey', label: '🇹🇷 Turkey' },
  { value: 'egypt', label: '🇪🇬 Egypt' },
  { value: 'south africa', label: '🇿🇦 South Africa' },
  { value: 'nigeria', label: '🇳🇬 Nigeria' },
  { value: 'kenya', label: '🇰🇪 Kenya' },
  { value: 'netherlands', label: '🇳🇱 Netherlands' },
  { value: 'sweden', label: '🇸🇪 Sweden' },
  { value: 'norway', label: '🇳🇴 Norway' },
  { value: 'denmark', label: '🇩🇰 Denmark' },
  { value: 'finland', label: '🇫🇮 Finland' },
  { value: 'poland', label: '🇵🇱 Poland' },
  { value: 'czech republic', label: '🇨🇿 Czech Republic' },
  { value: 'hungary', label: '🇭🇺 Hungary' },
  { value: 'greece', label: '🇬🇷 Greece' },
  { value: 'portugal', label: '🇵🇹 Portugal' },
  { value: 'switzerland', label: '🇨🇭 Switzerland' },
  { value: 'austria', label: '🇦🇹 Austria' },
  { value: 'belgium', label: '🇧🇪 Belgium' },
  { value: 'ireland', label: '🇮🇪 Ireland' },
  { value: 'new zealand', label: '🇳🇿 New Zealand' },
  { value: 'singapore', label: '🇸🇬 Singapore' },
  { value: 'malaysia', label: '🇲🇾 Malaysia' },
  { value: 'thailand', label: '🇹🇭 Thailand' },
  { value: 'indonesia', label: '🇮🇩 Indonesia' },
  { value: 'philippines', label: '🇵🇭 Philippines' },
  { value: 'vietnam', label: '🇻🇳 Vietnam' },
];

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  provinces: number[];
}

export function FilterBar({ filters, onFilterChange, provinces }: FilterBarProps) {
  const { enabledSources, setRadioBrowserCountry } = useSourceSettings();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Select
        value={filters.province?.toString() || 'all'}
        onValueChange={(value) =>
          onFilterChange({ province: value === 'all' ? null : Number(value) })
        }
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select province" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Provinces</SelectItem>
          {provinces.map((province) => (
            <SelectItem key={province} value={province.toString()}>
              Province {province}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {enabledSources.includes('radio-browser') && (
        <Select
          value={filters.country || 'all'}
          onValueChange={(value) => {
            const countryValue = value === 'all' ? undefined : value;
            onFilterChange({ country: countryValue });
            if (countryValue) {
              setRadioBrowserCountry(countryValue);
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Select
        value={filters.sortBy}
        onValueChange={(value) => onFilterChange({ sortBy: value as SortOption })}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="frequency">Frequency</SelectItem>
          <SelectItem value="province">Province</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}