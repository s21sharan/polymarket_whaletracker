import Home from '@/components/tabs/Home'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Market Discovery</h1>
          <p className="text-gray-600 mt-2">Discover and analyze prediction markets</p>
        </div>
        <Home />
      </div>
    </main>
  )
}