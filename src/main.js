function HomePage() {
  return (
    <main data-screen-label="01 Home">
      <Hero />
      <TrustStrip />
      <CubeFaceted />
      <CubeRotating />
      <Pillars />
      <Decisors />
      <Proof />
      <Pains />
      <Services />
      <Method />
      <Deliverable />
      <Geo />
      <Sectors />
      <Resources />
      <About />
      <FAQ />
      <FinalCTA />
    </main>
  );
}

function App() {
  const { route } = useRoute();
  return (
    <>
      <ScrollProgress />
      <Header />
      {route === 'home' && <HomePage />}
      {route === 'services' && <main data-screen-label="02 Services"><ServicesDetailPage /></main>}
      {route === 'contact' && <main data-screen-label="03 Contact"><ContactPage /></main>}
      <Footer />
      <CookieRoot />
    </>
  );
}

function Root() {
  return (
    <I18nProvider>
      <RouteProvider>
        <App />
      </RouteProvider>
    </I18nProvider>
  );
}

// On pinned-scroll pages, browser scroll restoration can leave the pinned
// hero in a stale state after a reload. Always start at the top.
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
