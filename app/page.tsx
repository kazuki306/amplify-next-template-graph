import Link from 'next/link';

import "./app.css";

export default function Home() {
  return (
    <>
      <h1>トップページ</h1>
      <Link href="/setting">
        サブページへ
      </Link>
    </>

  );
}
