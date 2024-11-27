import {useLocale, useTranslations} from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          label: t('en')
        },
        {
          value: 'de',
          label: t('de')
        },
        {
          value: 'ar',
          label: t('ar')
        },
        {
          value: 'fa',
          label: t('fa')
        },
        {
          value: 'he',
          label: t('he')
        },
        {
          value: 'tr',
          label: t('tr')
        }
      ]}
      label={t('label')}
    />
  );
}