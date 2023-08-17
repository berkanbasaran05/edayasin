import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })
interface Point {
  x: number;
  y: number;
}

const words = ['Eda-Yasim', 'Seni Çok Seviyorum', 'Seni rastgele sevmedim.', 'Hayatımın anlamı', 'Çocuklarımın annesi', 'Ömrüm'];

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
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <div className='flex flex-col w-full h-full relative'>
        <Image
          src="/assets/ey.jpeg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div
          className='h-screen w-full relative'
          onClick={clickHandle}
        >
          <header className='header absolute top-0 left-0 p-4'>
            <button
              disabled={points.length === 0}
              onClick={redoHandle}
              className='border border-white p-2'
            >
              Geri Al
            </button>
            <button
              disabled={data.length === 0}
              onClick={undoHandle}
              className='border border-white p-2 ml-2'
            >
              İleri
            </button>
          </header>
            {/**
           * <div className='flex flex-row justify-center w-[400px] mt-24 mx-auto h-[600px]'>
            <video controls className='video' width={400} height={200}>
              <source src='/assets/dogumgunu.mp4' type='video/mp4' />
            </video>
          </div>
           */}
          {points.map((heart, key) => (
            <div
              className='heart items-center flex absolute'
              key={key}
              style={{ left: heart.x, top: heart.y }}
            >
              <div className='text text-white'>{words[wordIndex]}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

