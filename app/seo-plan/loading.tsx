export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center my-16">
          <div className="h-20 bg-muted animate-pulse rounded-lg mb-4" />
          <div className="h-6 bg-muted animate-pulse rounded-lg max-w-2xl mx-auto" />
        </div>
        
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
