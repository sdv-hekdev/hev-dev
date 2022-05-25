import Link from "next/link"

import Page from "@/web/components/Page"

const ProfilePage = () => {
  return (
    <Page title="Check your profile">
      <ul className="flex mt-5">
        <li>
          <Link href="/change-password">
            <a className="rounded-md bg-emerald-600  mx-2 py-4 px-4 text-center text-lg font-light text-white hover:bg-emerald-500 active:bg-emerald-700">
              Change your password
            </a>
          </Link>
        </li>
        <li>
          <Link href="/delete-account">
            <a className="rounded-md bg-emerald-600  mx-2 py-4 px-4 text-center text-lg font-light text-white hover:bg-emerald-500 active:bg-emerald-700">
              Delete your account
            </a>
          </Link>
        </li>
      </ul>
    </Page>
  )
}

export default ProfilePage
