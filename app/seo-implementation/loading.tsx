export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="h-12 bg-muted rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-muted rounded w-64 mx-auto animate-pulse"></div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
          <div className="lg:col-span-2">
            <div className="h-[700px] bg-muted rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
