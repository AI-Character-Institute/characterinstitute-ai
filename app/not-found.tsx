import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <header className="page-head wrap">
        <h1>This page is not on the record.</h1>
        <p className="lead">
          The address may have changed when the site was rebuilt. The <Link href="/results/">results</Link> and the{" "}
          <Link href="/">home page</Link> are good places to start again.
        </p>
      </header>
    </main>
  );
}
