import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../../locales/translations';

export function EmployeeListPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t(translations.PAGE_TITLE.EMPLOYEE_PAGE)}</title>
        <meta
          name="description"
          content={t(translations.PAGE_TITLE.EMPLOYEE_PAGE)}
        />
      </Helmet>
      <div />
    </>
  );
}
