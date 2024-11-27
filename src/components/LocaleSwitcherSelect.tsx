'use client';

import {LanguageIcon} from '@heroicons/react/24/solid';
import {useTransition} from 'react';
import ReactCountryFlag from 'react-country-flag';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {Locale, languageToCountry} from '@/i18n/config';
import {setUserLocale} from '@/services/locale';

type Props = {
  defaultValue: string;
  items: Array<{value: string; label: string}>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger
          aria-label={label}
          className={`w-[180px] ${isPending ? 'pointer-events-none opacity-60' : ''}`}
        >
          <LanguageIcon className="mr-2 size-4" />
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent align="end">
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <div className="flex items-center">
                <ReactCountryFlag
                  className="rounded-full"
                  countryCode={languageToCountry[item.value] || ''}
                  style={{
                    width: '1.5em',
                    height: '1.5em',
                    marginRight: '0.5em'
                  }}
                  svg
                  title={item.label}
                />
                <span>{item.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
