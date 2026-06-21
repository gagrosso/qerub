function HomePage() {
  return (
    <main data-screen-label="01 Home">
      <Hero />
      <TrustStrip />
      <StatsBand />
      <Pains />
      <Services />
      <Method />
      <Deliverable />
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
