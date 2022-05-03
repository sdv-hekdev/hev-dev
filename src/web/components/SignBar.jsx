import Link from "next/link"

const SignBar = () => {
  return (
    <div className="flex space-x-4 bg-emerald-600 py-2 px-4">
      <Link href="/sign">
        <a className="text-sm text-white hover:text-gray-100">Sign in</a>
      </Link>
      <Link href="/sign">
        <a className="text-sm  text-white hover:text-gray-100">
          Create an account
        </a>
      </Link>
    </div>
  )
}

export default SignBar
