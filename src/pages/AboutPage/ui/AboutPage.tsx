import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page/Page';

function AboutPage() {
  const { t } = useTranslation('about');

  return (
       <Page>
            <h1>{t('about-page')}</h1>
       </Page>
  );
}

export default AboutPage;
