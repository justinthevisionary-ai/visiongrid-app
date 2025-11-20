import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <Image 
        src="/visiongrid-logo.png" 
        alt="VisionGrid Logo" 
        width={300} 
        height={300}
        className="mb-10"
      />
      <h1 className="text-3xl font-semibold tracking-wide">VisionGrid Studio</h1>
      <p className="opacity-70 mt-3">A new visual dimension.</p>
    </main>
  );
}
