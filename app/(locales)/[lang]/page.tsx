import HomeContent from './HomeContent';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'mk' }, { lang: 'sq' }];
}

export const dynamicParams = false;

export default function Page({ params }: { params: { lang: string } }) {
  return <HomeContent lang={params.lang} />;
}
