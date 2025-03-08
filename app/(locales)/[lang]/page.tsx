import HomeContent from './HomeContent';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'mk' }, { lang: 'sq' }];
}

export default function Home({ params }: { params: { lang: string } }) {
  return <HomeContent lang={params.lang} />;
}
