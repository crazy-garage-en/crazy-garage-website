import { redirect } from 'next/navigation';

const basePath =
  process.env.NODE_ENV === 'production' ? '/crazy-garage-website' : '';

export default function Home() {
  redirect(`${basePath}/en`);
}
