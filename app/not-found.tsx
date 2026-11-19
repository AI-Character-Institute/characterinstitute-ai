import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <header className="page-head wrap">
        <h1>Page not found</h1>
        <p className="lead">
          We could not find this page. The <Link href="/results/">results</Link> and the <Link href="/">home page</Link>{" "}
          are good places to start again.
        </p>
      </header>
    </main>
  );
}
