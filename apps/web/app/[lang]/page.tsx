import Link from "next/link";
import { useTranslations } from 'next-intl';;

export default function Home() {
  const t = useTranslations();
  console.log(t('d'));

  return (
    <div>
      <Link href="/dashboard">123</Link>
    </div>
  )
}
