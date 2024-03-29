import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function SearchInput() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParam = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParam.get('search') ?? '')
  useEffect(() => {
    setSearchTerm(searchParam.get('search') ?? '')
  }, [searchParam])
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const searchParam = new URLSearchParams()
      if (searchTerm) searchParam.set('search', searchTerm)
      router.push(`${pathname}?${searchParam.toString()}`)
    }
  }

  return (
    <div className='w-full max-w-sm lg:flex'>
      <div className='relative w-full'>
        <svg
          className='pointer-events-none absolute my-4 ms-4 stroke-current opacity-60 text-base-content'
          width='16'
          height='16'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          ></path>
        </svg>
        <input
          name='search'
          type='text'
          placeholder='Search…'
          className='input w-full ps-10 input-bordered'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
      </div>
    </div>
  )
}
