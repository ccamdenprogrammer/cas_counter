import Header from './components/header';
import Counter from './components/counter';
import ChildrenNames from './components/names';
import Footer from './components/footer';

export default function App() {
  return (
    <main
      className="
        min-h-dvh bg-black text-white
        font-['Moderniz']
        animate-[fade-in_0.8s_ease-out_both]
      "
    >
      <div className="space-y-16">
        <Header />

        {/* Hero: total killed, centered */}
        <section className="container mx-auto px-4">
          <Counter />
        </section>

        {/* Everything else: left-aligned content, padded from the left */}
        <section className="container mx-auto">
          <div className="pl-6 md:pl-10">
            <ChildrenNames />
          </div>
        </section>

        {/* Centered ICC callout + FREE PALESTINE */}
        <section className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
            Via the International Criminal Court, Benjamin Netanyahu is...
          </h1>
          <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl max-w-4xl mx-auto opacity-90">
            "Allegedly responsible for the war crimes of starvation as a method of warfare and of
            intentionally directing an attack against the civilian population; and the crimes against
            humanity of murder, persecution, and other inhumane acts from at least 8 October 2023
            until at least 20 May 2024"
          </h2>

          <h2 className="mt-12 text-4xl sm:text-5xl md:text-6xl tracking-tight">
            FREE PALESTINE
          </h2>
        </section>

        <section className="container mx-auto px-4">
          <Footer />
        </section>
      </div>
    </main>
  );
}
