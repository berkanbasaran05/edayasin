import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })
interface Point {
  x: number;
  y: number;
}

const words = ['Eda-Yasin', 'Seni Çok Seviyorum', 'Seni rastgele sevmedim.', 'Hayatımın anlamı', 'Çocuklarımın annesi', 'Ömrüm'];

export default function Home() {
  const [points, setPoints] = useState<Point[]>([]);
  const [data, setData] = useState<Point[]>([]);
  const [wordIndex, setWordIndex] = useState(0);

  const clickHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    setPoints(prevPoints => [...prevPoints, { x: e.clientX, y: e.clientY }]);
    setData([]);
    setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const redoHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newData = [...points];
    const item = newData.pop();
    if (item) {
      setData(prevData => [...prevData, item]);
      setPoints(newData);
      setWordIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
    }
  };

  const undoHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newData = [...data];
    const item = newData.pop();
    if (item) {
      setPoints(prevPoints => [...prevPoints, item]);
      setData(newData);
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between    ${inter.className}`}
    >
      <div className='flex flex-col w-full h-full' style={{ backgroundImage: `url("/assets/ey.jpeg")`, backgroundSize: 'cover' }}>
        <div className='h-screen w-full ' onClick={clickHandle}>
          <header className='header'>
            <button disabled={points.length === 0} onClick={redoHandle} className='border border-white'>
              Geri All
            </button>
            <button disabled={data.length === 0} onClick={undoHandle} className='border border-white'>
              İleri
            </button>
          </header>
          {points.map((heart, key) => (
            <div className='heart items-center flex' key={key} style={{ left: heart.x, top: heart.y }}>
              <div className='text'>{words[wordIndex]}</div>
            </div>
          ))}
          <div className='flex flex-row justify-center w-[400px] mt-24 mx-auto h-[600px]'>
            <video controls className='video' width={400} height={200}>
              <source src='/assets/dogumgunu.mp4' type='video/mp4' />
            </video>
          </div>
        </div>
      </div>
    </main>
  );
}
