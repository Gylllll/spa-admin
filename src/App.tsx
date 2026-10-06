import { useEffect, useState } from 'react'
import heroImg from '@/assets/hero.png'
import reactLogo from '@/assets/react.svg'
import viteLogo from '@/assets/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const getMockData = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result = await response.json()
        console.log('Mock data fetched:', result)
        setData(result)
      } catch (error) {
        setData(null)
        console.error('Error fetching mock data:', error)
      }
    }

    getMockData()
  }, [])

  return (
    <>
      <div className='hero'>
        <img src={heroImg} className='base' width='170' height='179' alt='' />
        <img src={reactLogo} className='framework' alt='React logo' />
        <img src={viteLogo} className='vite' alt='Vite logo' />
      </div>
      <div className='mock-data'>
        <h2>获取 Mock 数据</h2>
        {data === null ? <p>没有数据</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </>
  )
}

export default App
