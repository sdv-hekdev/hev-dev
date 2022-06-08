import Page from "@/web/components/Page"
import Link from "next/link"

const ProfilePage = () => {
  return (
    <Page title="Check your profile">
      <ul className="flex flex-col justify-between mt-5 md:flex-row md:justify-center ">
        <li className="my-5">
          <Link href="/update-email">
            <a className="rounded-md bg-emerald-600 mx-2 py-4 px-4 text-center text-lg font-light text-white hover:bg-emerald-500 active:bg-emerald-700">
              Update Email
            </a>
          </Link>
        </li>
        <li className="my-5">
          <Link href="/change-password">
            <a className="rounded-md bg-emerald-600 mx-2 py-4 px-4 text-center text-lg font-light text-white hover:bg-emerald-500 active:bg-emerald-700">
              Change password
            </a>
          </Link>
        </li>
        <li className="my-5">
          <Link href="/delete-account">
            <a className="rounded-md bg-red-600 mx-2 py-4 px-4 text-center text-lg font-light text-white hover:bg-red-500 active:bg-red-700">
              Delete account
            </a>
          </Link>
        </li>
      </ul>
      <Link href="/add-item">
        <a className="rounded-md bg-emerald-600 mx-2 py-4 px-4 text-center text-lg font-light text-white hover:bg-emerald-500 active:bg-emerald-700">
          Add item
        </a>
      </Link>
    </Page>
  )
}

export default ProfilePage
