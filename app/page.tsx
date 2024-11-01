import Link from 'next/link';

//import "./../app/setting/app.css";
//import "./../app/app.css";
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
