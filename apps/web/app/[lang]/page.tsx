import Link from "next/link";
import { useTranslations } from 'next-intl';;

export default function Home() {
  const t = useTranslations();
  return (
    <div className="text-center pt-8">
      <Link href="/dashboard">{ t('common.dashboard') }</Link>
    </div>
  )
}
