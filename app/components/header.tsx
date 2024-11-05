import Link from 'next/link';

//import "./app.css";

export default function Home() {
  return (
    <>
      <ul>
        <li><Link href="/">トップ</Link></li>
        <li><Link href="/setting">マスタ設定</Link></li>
        <li><Link href="/graph">グラフ表示</Link></li>
      </ul>
    </>

  );
}
