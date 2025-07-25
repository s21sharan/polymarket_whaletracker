import { Button } from "@/components/ui/button"

export default function BlankPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <p className="mt-4 text-muted-foreground">
        This is a blank Next.js page with shadcn/ui styling.
      </p>
      <div className="mt-6">
        <Button>Click me</Button>
      </div>
    </div>
  )
}