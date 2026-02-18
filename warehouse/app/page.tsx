import Link from "next/link";
import {
  Package,
  BarChart3,
  ShoppingCart,
  Truck,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { auth } from "@/auth";

const features = [
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Track stock levels in real-time. Get alerts when products run low and automate reorder processes.",
  },
  {
    icon: ShoppingCart,
    title: "Order Processing",
    description:
      "Manage orders from creation to delivery. Keep customers updated with real-time order status.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description:
      "Visualize your warehouse performance with dashboards. Make data-driven decisions to grow your business.",
  },
  {
    icon: Truck,
    title: "Logistics Tracking",
    description:
      "Monitor shipments and deliveries. Optimize routes and reduce shipping costs.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security to protect your data. Reliable uptime so your operations never stop.",
  },
  {
    icon: Zap,
    title: "Fast & Easy",
    description:
      "Intuitive interface that your team can learn in minutes. No complex setup required.",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50M+", label: "Orders Processed" },
  { value: "99.9%", label: "Uptime" },
  { value: "150+", label: "Countries" },
];

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
                Now available for all businesses
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Manage Your Warehouse{" "}
                <span className="text-primary">Smarter</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                A modern warehouse management system that helps you track
                inventory, process orders, and grow your business — all in one
                place.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                {session ? (
                  <Button size="lg" asChild>
                    <Link href="/warehouse/inventory">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Go to Dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" asChild>
                      <Link href="/auth/register">
                        Get Started Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/auth/login">Sign In</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to run your warehouse
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Powerful tools designed for modern warehouse operations.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="transition-shadow hover:shadow-md"
                >
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About / Why Us */}
        <section id="about" className="scroll-mt-16 border-t bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Why choose Warehouse co.?
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  We built this platform because managing a warehouse should not
                  be complicated. Our mission is to give every business the tools
                  they need to operate efficiently.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "No credit card required to start",
                    "Set up in under 5 minutes",
                    "Free plan available for small teams",
                    "24/7 support via chat and email",
                    "Regular updates with new features",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border bg-linear-to-br from-primary/5 to-primary/10 p-8 lg:p-12">
                <blockquote className="space-y-4">
                  <p className="text-lg italic leading-relaxed text-foreground/80">
                    &ldquo;Warehouse co. transformed how we manage inventory.
                    What used to take hours now takes minutes. Our team loves how
                    simple it is to use.&rdquo;
                  </p>
                  <footer className="text-sm text-muted-foreground">
                    — Somchai K., Operations Manager at LogiTech Solutions
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
                Join thousands of businesses already using Warehouse co. to
                streamline their operations. Start for free today.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                {session ? (
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/warehouse/inventory">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Go to Dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" variant="secondary" asChild>
                      <Link href="/auth/register">
                        Start Free Trial
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                      asChild
                    >
                      <Link href="mailto:support@warehouse-co.com">
                        Contact Sales
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
