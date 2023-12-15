import Link from "next/link";
import Auth from "../../components/layouts/Auth";

export default function Sigin() {
  return (
    <>
      <Auth isSignIn={true} />
      <p>
        Forgot your password?{" "}
        <Link href="/auth/forgot-password">
          <span className="text-buttonBackground">Click here!</span>
        </Link>
      </p>
    </>
  );
}
