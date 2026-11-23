import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import CodeBro from "./components/CodeBro";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import BackgroundFloaters from "./components/BackgroundFloaters";
import ChatAccess from "./pages/ChatAccess";
import AdminLogin from "./pages/AdminLogin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import "./index.css";

function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";

  if (path === "/chat") return <><BackgroundFloaters /><ChatAccess /></>;
  if (path === "/admin" || path === "/admin/login") return <><BackgroundFloaters /><AdminLogin /></>;
  if (path === "/privacy-policy") {
  return (
    <>
      <BackgroundFloaters />
      <PrivacyPolicy />
    </>
  );
}

if (path === "/terms-of-service") {
  return (
    <>
      <BackgroundFloaters />
      <TermsOfService />
    </>
  );
}

  return (
    <>
      <Preloader />
      <BackgroundFloaters />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CodeBro />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
