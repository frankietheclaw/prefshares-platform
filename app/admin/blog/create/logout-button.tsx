import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function logout() {
  'use server'
  cookies().delete('admin_auth')
  redirect('/admin/login')
}

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Sign Out
      </button>
    </form>
  )
}
