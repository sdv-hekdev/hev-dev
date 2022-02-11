import Link from "next/link"

const CreateAccount = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link href="/sign">
        <a className="text-sm font-medium text-white hover:text-gray-100">
          Sign in
        </a>
      </Link>
      <Link href="/sign">
        <a className="text-sm font-medium text-white hover:text-gray-100">
          Create an account{" "}
        </a>
      </Link>
    </div>
  )
}

export default CreateAccount
