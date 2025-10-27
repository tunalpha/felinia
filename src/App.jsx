import React, { useMemo, useState } from "react";

/**
 * Félinia – Landing page multilingue IT/FR/EN
 * Include sezione "Chi siamo / À propos / About" con descrizione emozionante
 * PayPal integrato via PAYPAL_URL (sostituire l'ID reale)
 */

// Palette brand e PayPal
// Verde petrolio: #0C7463  | Oro tenue: #D6B36A  | Sabbia: #F5EFE7  | Nero soft: #1E1E1E
const PAYPAL_URL = "https://www.paypal.com/donate?hosted_button_id=YOUR_ID"; // TODO: sostituisci con ID reale
const WHATSAPP_LINK = "https://wa.me/393488450532?text=Ciao%20F%C3%A9linia!%20Scrivo%20per%20Enrico."; // bottone contatto fondatore

const translations = {
  it: {
    langName: "Italiano",
    nav: { home: "Home", mission: "Missione", about: "Chi siamo", adopt: "Adotta", help: "Sostieni", contact: "Contatti" },
    hero: {
      kicker: "Rifugio e adozioni internazionali",
      title: "Félinia",
      subtitle:
        "Un ponte tra Tunisia e Europa per proteggere, curare e trovare casa ai gatti più fragili.",
      ctaPrimary: "Adotta o affida",
      ctaSecondary: "Dona con PayPal",
    },
    mission: {
      title: "La nostra missione",
      p1:
        "Félinia è un rifugio innovativo con base in Tunisia e associazione in Italia. Ci occupiamo di salvataggio, cure veterinarie, riabilitazione comportamentale e adozioni responsabili verso l'Europa.",
      p2:
        "Crediamo in benessere, trasparenza e sostenibilità: spazi biofilici, tracciabilità digitale dei casi, e percorsi educativi per creare convivenze felici e durature.",
      stats: { saved: "Gatti salvati", adopted: "Adozioni riuscite", volunteers: "Volontari attivi" },
    },
    about: {
      title: "Chi siamo",
      p1: "Siamo persone unite da una missione semplice e profonda: salvare i gatti dalla strada e donare loro ciò che ogni creatura merita — una casa, un abbraccio e un futuro.",
      p2: "Ogni giorno percorriamo le vie della Tunisia per dare speranza a chi non ha voce. Ogni sguardo impaurito che si trasforma in fiducia, ogni fusa nata dal silenzio del dolore, ci ricorda perché lo facciamo: perché l’amore salva davvero.",
      p3: "Félinia è più di un rifugio: è un ponte di compassione tra popoli, lingue e cuori. Quando l’empatia incontra l’azione, anche la vita più fragile può rifiorire.",
    },
    adopt: {
      title: "Percorso di adozione",
      steps: [
        { t: "Candidatura", d: "Compila il questionario pre-affido per conoscerci meglio." },
        { t: "Colloquio", d: "Video‑call con il nostro team per valutare bisogni e compatibilità." },
        { t: "Match & Preparazione", d: "Scegliamo insieme il micio giusto e ti supportiamo con il kit di benvenuto." },
        { t: "Trasferimento", d: "Gestiamo logistica e documenti per un arrivo sereno e sicuro." },
        { t: "Post‑affido", d: "Follow‑up e consulenza gratuita di comportamento felino." },
      ],
      cta: "Scopri i gatti adottabili",
    },
    help: {
      title: "Come puoi aiutarci",
      cards: [
        { t: "Donazioni", d: "Sostieni cure veterinarie, cibo e trasporti.", btn: "Dona ora" },
        { t: "Volontariato", d: "In rifugio in Tunisia o da remoto per adozioni e comunicazione.", btn: "Diventa volontario/a" },
        { t: "Stallo / Foster", d: "Accogli temporaneamente un gatto in attesa di adozione.", btn: "Offri uno stallo" },
      ],
    },
    contact: {
      title: "Contattaci",
      subtitle: "Parliamone – rispondiamo in IT/FR/EN.",
      form: { name: "Nome", email: "Email", message: "Messaggio", send: "Invia" },
      legal: "Iscrizione associazione in Italia · Rifugio operativo in Tunisia",
    },
    footer: {
      legal: "© " + new Date().getFullYear() + " Félinia. Tutti i diritti riservati.",
      policy: "Privacy",
      cookies: "Cookie",
      imprint: "Note legali",
    },
    badge: "Multilingue IT/FR/EN",
    location: "Tunisia · Italia · Europa",
    paypalCta: "Dona con PayPal",
  },
  fr: {
    langName: "Français",
    nav: { home: "Accueil", mission: "Mission", about: "À propos", adopt: "Adopter", help: "Soutenir", contact: "Contacts" },
    hero: {
      kicker: "Refuge et adoptions internationales",
      title: "Félinia",
      subtitle:
        "Un pont entre la Tunisie et l'Europe pour protéger, soigner et trouver un foyer aux chats vulnérables.",
      ctaPrimary: "Adopter ou accueillir",
      ctaSecondary: "Donner avec PayPal",
    },
    mission: {
      title: "Notre mission",
      p1:
        "Félinia est un refuge innovant basé en Tunisie avec une association en Italie. Nous assurons sauvetage, soins vétérinaires, réhabilitation comportementale et adoptions responsables vers l'Europe.",
      p2:
        "Nous croyons au bien‑être, à la transparence et à la durabilité : espaces biophiliques, traçabilité numérique des dossiers, et parcours éducatifs pour des cohabitations heureuses et durables.",
      stats: { saved: "Chats sauvés", adopted: "Adoptions réussies", volunteers: "Bénévoles actifs" },
    },
    about: {
      title: "À propos",
      p1: "Nous sommes des personnes réunies par une mission simple et profonde : sauver les chats de la rue et leur offrir ce que toute créature mérite — une maison, une étreinte et un avenir.",
      p2: "Chaque jour, nous sillonnons les rues de Tunisie pour redonner espoir à celles et ceux qui n'ont pas de voix. Chaque regard apeuré qui devient confiance, chaque ronron né du silence de la douleur, nous rappelle pourquoi nous agissons : parce que l'amour sauve vraiment.",
      p3: "Félinia est plus qu'un refuge : c'est un pont de compassion entre peuples, langues et cœurs. Quand l'empathie rencontre l'action, la vie la plus fragile refleurit.",
    },
    adopt: {
      title: "Parcours d'adoption",
      steps: [
        { t: "Candidature", d: "Remplissez le questionnaire pré‑accueil pour mieux vous connaître." },
        { t: "Entretien", d: "Visio avec notre équipe pour évaluer besoins et compatibilité." },
        { t: "Matching & Préparation", d: "Nous choisissons ensemble le bon chat et vous soutenons avec le kit d'accueil." },
        { t: "Transfert", d: "Nous gérons logistique et documents pour une arrivée sereine et sûre." },
        { t: "Suivi", d: "Post‑adoption avec conseils gratuits de comportement félin." },
      ],
      cta: "Découvrir les chats à adopter",
    },
    help: {
      title: "Comment nous aider",
      cards: [
        { t: "Dons", d: "Soutenez soins vétérinaires, nourriture et transports.", btn: "Faire un don" },
        { t: "Bénévolat", d: "Au refuge en Tunisie ou à distance pour adoptions et communication.", btn: "Devenir bénévole" },
        { t: "Famille d'accueil", d: "Accueillez temporairement un chat en attente d'adoption.", btn: "Proposer un accueil" },
      ],
    },
    contact: {
      title: "Contactez‑nous",
      subtitle: "Échangeons – réponses en FR/IT/EN.",
      form: { name: "Nom", email: "Email", message: "Message", send: "Envoyer" },
      legal: "Association enregistrée en Italie · Refuge opérant en Tunisie",
    },
    footer: {
      legal: "© " + new Date().getFullYear() + " Félinia. Tous droits réservés.",
      policy: "Confidentialité",
      cookies: "Cookies",
      imprint: "Mentions légales",
    },
    badge: "Multilingue IT/FR/EN",
    location: "Tunisie · Italie · Europe",
    paypalCta: "Donner avec PayPal",
  },
  en: {
    langName: "English",
    nav: { home: "Home", mission: "Mission", about: "About", adopt: "Adopt", help: "Support", contact: "Contact" },
    hero: {
      kicker: "Shelter & international adoptions",
      title: "Félinia",
      subtitle:
        "A bridge between Tunisia and Europe to protect, heal and rehome vulnerable cats.",
      ctaPrimary: "Adopt or foster",
      ctaSecondary: "Donate via PayPal",
    },
    mission: {
      title: "Our mission",
      p1:
        "Félinia is an innovative shelter operating in Tunisia with a registered association in Italy. We handle rescue, veterinary care, behavioral rehab and responsible adoptions across Europe.",
      p2:
        "We stand for welfare, transparency and sustainability: biophilic spaces, digital case tracking, and education for long‑lasting happy cohabitation.",
      stats: { saved: "Cats rescued", adopted: "Successful adoptions", volunteers: "Active volunteers" },
    },
    about: {
      title: "About",
      p1: "We are people united by a simple, profound mission: to save street cats and give them what every creature deserves — a home, an embrace and a future.",
      p2: "Every day we walk the streets of Tunisia to bring hope to those without a voice. Each frightened gaze turning into trust, every purr born from pain's silence, reminds us why we do this: because love truly saves.",
      p3: "Félinia is more than a shelter: it's a bridge of compassion across peoples, languages and hearts. When empathy meets action, even the most fragile life can bloom again.",
    },
    adopt: {
      title: "Adoption journey",
      steps: [
        { t: "Application", d: "Fill the pre‑adoption form so we can get to know you." },
        { t: "Interview", d: "Video call with our team to assess needs and compatibility." },
        { t: "Match & Preparation", d: "We choose the right cat together and provide a welcome kit." },
        { t: "Transfer", d: "We handle logistics and paperwork for a safe arrival." },
        { t: "Aftercare", d: "Post‑adoption follow‑up and free feline behavior advice." },
      ],
      cta: "See adoptable cats",
    },
    help: {
      title: "How you can help",
      cards: [
        { t: "Donations", d: "Support vet care, food and transport.", btn: "Donate now" },
        { t: "Volunteering", d: "At the shelter in Tunisia or remotely for adoptions and comms.", btn: "Become a volunteer" },
        { t: "Foster care", d: "Host a cat temporarily while waiting for adoption.", btn: "Offer foster" },
      ],
    },
    contact: {
      title: "Get in touch",
      subtitle: "Let's talk – replies in EN/IT/FR.",
      form: { name: "Name", email: "Email", message: "Message", send: "Send" },
      legal: "Association registered in Italy · Shelter operating in Tunisia",
    },
    footer: {
      legal: "© " + new Date().getFullYear() + " Félinia. All rights reserved.",
      policy: "Privacy",
      cookies: "Cookies",
      imprint: "Imprint",
    },
    badge: "Multilingual IT/FR/EN",
    location: "Tunisia · Italy · Europe",
    paypalCta: "Donate via PayPal",
  },
};

function CatLogo({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" role="img" aria-label="Félinia logo">
      <path
        d="M20 22c1.5-4 5-8 12-8s10.5 4 12 8m-24 0c-4 2-6 6-6 10 0 8 6 12 10 14 3 2 2 6 0 8m20-32c4 2 6 6 6 10 0 8-6 12-10 14-3 2-2 6 0 8"
        stroke="#0C7463" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="26" cy="26" r="1.5" fill="#0C7463" />
      <circle cx="38" cy="26" r="1.5" fill="#0C7463" />
      <path d="M26 34c4 3 8 3 12 0" stroke="#0C7463" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function FeliniaLanding() {
  const [lang, setLang] = useState("it");
  const t = useMemo(() => translations[lang], [lang]);

  return (
    <div className="min-h-screen bg-[#F5EFE7] text-[#1E1E1E]">
      {/* Nav */}
      <header className="sticky top-0 z-20 backdrop-blur bg-[#F5EFE7]/80 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CatLogo className="w-9 h-9" />
            <span className="font-serif text-2xl tracking-wide text-[#0C7463]">Félinia</span>
            <span className="ml-3 rounded-full bg-[#0C7463]/10 text-[#0C7463] text-xs px-2 py-1">{t.badge}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#mission" className="hover:text-[#0C7463]">{t.nav.mission}</a>
            <a href="#about" className="hover:text-[#0C7463]">{t.nav.about}</a>
            <a href="#adopt" className="hover:text-[#0C7463]">{t.nav.adopt}</a>
            <a href="#help" className="hover:text-[#0C7463]">{t.nav.help}</a>
            <a href="#contact" className="hover:text-[#0C7463]">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-2">
            <select
              aria-label="switch language"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="rounded-xl border border-[#0C7463]/30 px-3 py-1.5 text-sm bg-white/70 hover:bg-white"
            >
              <option value="it">IT</option>
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
            <a href={PAYPAL_URL} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#0C7463] text-white px-3 py-1.5 text-sm hover:opacity-90">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-widest text-xs text-[#0C7463]/80 font-medium">{t.hero.kicker}</p>
            <h1 className="mt-3 font-serif text-5xl md:text-6xl text-[#0C7463]">{t.hero.title}</h1>
            <p className="mt-5 text-lg leading-relaxed max-w-prose">{t.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#adopt" className="rounded-2xl bg-[#0C7463] text-white px-5 py-3 text-sm md:text-base shadow-sm hover:shadow">
                {t.hero.ctaPrimary}
              </a>
              <a href={PAYPAL_URL} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-[#0C7463] text-[#0C7463] px-5 py-3 text-sm md:text-base hover:bg-white">
                {t.hero.ctaSecondary}
              </a>
            </div>
            <div className="mt-6 text-sm text-[#0C7463]">{t.location}</div>
          </div>
          {/* Hero card */}
          <div className="bg-white/70 rounded-3xl p-6 md:p-8 shadow-sm border border-black/5">
            <div className="flex items-center gap-3">
              <CatLogo className="w-8 h-8" />
              <div className="font-medium">Félinia Care</div>
            </div>
            <p className="mt-3 text-sm">
              {lang === "it"
                ? "Tracciamo ogni salvataggio con schede cliniche digitali e follow‑up. Benessere prima di tutto."
                : lang === "fr"
                ? "Chaque sauvetage est tracé avec dossiers cliniques numériques et suivi. Le bien‑être avant tout."
                : "We track every rescue with digital medical records and follow‑ups. Welfare first."}
            </p>
            <ul className="mt-4 grid grid-cols-3 gap-3 text-center">
              <li className="rounded-2xl bg-white p-3 border border-black/5">
                <div className="text-2xl font-semibold text-[#0C7463]">128</div>
                <div className="text-xs opacity-70">{t.mission.stats.saved}</div>
              </li>
              <li className="rounded-2xl bg-white p-3 border border-black/5">
                <div className="text-2xl font-semibold text-[#0C7463]">94</div>
                <div className="text-xs opacity-70">{t.mission.stats.adopted}</div>
              </li>
              <li className="rounded-2xl bg-white p-3 border border-black/5">
                <div className="text-2xl font-semibold text-[#0C7463]">37</div>
                <div className="text-xs opacity-70">{t.mission.stats.volunteers}</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="bg-white/70 border-y border-black/5">
        <div className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0C7463]">{t.mission.title}</h2>
            <p className="mt-4 leading-relaxed">{t.mission.p1}</p>
            <p className="mt-3 leading-relaxed">{t.mission.p2}</p>
          </div>
          <div className="rounded-3xl bg-[#0C7463]/5 p-6 md:p-8 border border-[#0C7463]/10">
            <h3 className="font-medium text-[#0C7463]">ESG & Innovazione</h3>
            <ul className="mt-3 space-y-2 text-sm list-disc pl-5">
              <li>Spazi biofilici e arricchimento ambientale</li>
              <li>Energia da fonti rinnovabili e gestione sostenibile</li>
              <li>Tracciabilità digitale pre/post affido</li>
              <li>Formazione per famiglie e scuole</li>
            </ul>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="">
        <div className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl bg-white p-6 border border-black/5">
            <div className="flex items-center gap-3">
              <CatLogo className="w-10 h-10" />
              <h2 className="font-serif text-3xl text-[#0C7463]">{t.about.title}</h2>
            </div>
            <p className="mt-4 text-lg leading-relaxed">{t.about.p1}</p>
            <p className="mt-3 leading-relaxed">{t.about.p2}</p>
            <p className="mt-3 leading-relaxed">{t.about.p3}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 border border-black/5">
              <div className="text-sm uppercase tracking-wide text-[#0C7463]/80">Rescue</div>
              <div className="mt-1 font-semibold">Street to Safe</div>
              <p className="mt-2 text-sm opacity-80">Interventi sul territorio, cure e riabilitazione comportamentale.</p>
            </div>
            <div className="rounded-2xl bg-white p-5 border border-black/5">
              <div className="text-sm uppercase tracking-wide text-[#0C7463]/80">Family</div>
              <div className="mt-1 font-semibold">From Stray to Stay</div>
              <p className="mt-2 text-sm opacity-80">Adozioni responsabili e accompagnamento post‑affido.</p>
            </div>
            <div className="rounded-2xl bg-white p-5 border border-black/5">
              <div className="text-sm uppercase tracking-wide text-[#0C7463]/80">Transparency</div>
              <div className="mt-1 font-semibold">Trust by Design</div>
              <p className="mt-2 text-sm opacity-80">Tracciabilità casi, report donazioni, impatto condiviso.</p>
            </div>
            <div className="rounded-2xl bg-white p-5 border border-black/5">
              <div className="text-sm uppercase tracking-wide text-[#0C7463]/80">Community</div>
              <div className="mt-1 font-semibold">Together We Meow</div>
              <p className="mt-2 text-sm opacity-80">Volontariato, famiglie foster e scuole in rete.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder card */}
      <div className="mx-auto max-w-7xl px-4 pb-4">
        <div className="rounded-3xl border border-[#D6B36A] bg-[#F5EFE7] p-6 md:p-8 shadow-sm">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div>
              <img
                src="/enrico-founder.jpg"
                alt={lang === "fr" ? "Enrico, Fondateur" : lang === "en" ? "Enrico, Founder" : "Enrico, Fondatore"}
                className="w-full max-w-xs aspect-square object-cover rounded-2xl border border-[#D6B36A]/60 mx-auto"
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="font-serif text-2xl text-[#0C7463]">Enrico</h3>
                <span className="text-sm px-2 py-1 rounded-full bg-[#0C7463]/10 text-[#0C7463]">
                  {lang === "fr" ? "Fondateur" : lang === "en" ? "Founder" : "Fondatore"}
                </span>
              </div>
              <blockquote className="mt-3 italic text-[#1E1E1E]">
                “{lang === "fr"
                  ? "L’amour ne s’achète pas, il se sauve — et chaque vie sauvée rend le monde un peu plus doux."
                  : lang === "en"
                  ? "Love can’t be bought, it’s saved — and every life saved makes the world a little kinder."
                  : "L’amore non si compra, si salva — e ogni vita salvata rende il mondo un po’ più gentile."}”
              </blockquote>
              <p className="mt-3 text-sm md:text-base opacity-90">
                {lang === "fr"
                  ? "Fondateur de Félinia, il coordonne les adoptions internationales et les projets de sensibilisation entre l’Italie et la Tunisie."
                  : lang === "en"
                  ? "Founder of Félinia, he coordinates international adoptions and awareness projects between Italy and Tunisia."
                  : "Fondatore di Félinia, coordina le adozioni internazionali e i progetti di sensibilizzazione tra Italia e Tunisia."}
              </p>
              <div className="mt-5 flex gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#0C7463] text-[#0C7463] px-4 py-2 text-sm hover:bg-white"
                >
                  <svg viewBox="0 0 32 32" className="w-4 h-4" fill="currentColor" aria-hidden="true"><path d="M19.11 17.36c-.26-.13-1.51-.74-1.74-.82-.23-.09-.4-.13-.57.13-.17.26-.66.82-.81.99-.15.17-.3.2-.56.07-.26-.13-1.08-.4-2.05-1.28-.76-.68-1.27-1.52-1.42-1.78-.15-.26-.02-.4.11-.53.12-.12.26-.3.4-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.48-.41-.42-.57-.43l-.49-.01c-.17 0-.45.07-.69.32-.23.26-.9.88-.9 2.14 0 1.26.92 2.48 1.05 2.65.13.17 1.81 2.77 4.38 3.89.61.26 1.09.42 1.47.54.62.2 1.19.17 1.64.1.5-.08 1.51-.62 1.73-1.22.21-.6.21-1.11.15-1.22-.06-.11-.24-.17-.5-.3z"/><path d="M26.88 5.1A13.93 13.93 0 0016 2C8.28 2 2 8.28 2 16c0 2.47.64 4.78 1.77 6.78L2 30l7.39-1.93A13.93 13.93 0 0016 30c7.72 0 14-6.28 14-14 0-3.74-1.47-7.18-4.12-9.9zM16 27.56c-2.45 0-4.72-.73-6.63-1.98l-.47-.3-4.38 1.14 1.17-4.26-.31-.52A11.51 11.51 0 014.44 16C4.44 9.53 9.53 4.44 16 4.44S27.56 9.53 27.56 16 22.47 27.56 16 27.56z"/></svg>
                  {lang === "fr" ? "Écrire sur WhatsApp" : lang === "en" ? "Message on WhatsApp" : "Scrivi su WhatsApp"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adopt */}
      <section id="adopt" className="">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#0C7463]">{t.adopt.title}</h2>
          <ol className="mt-8 grid md:grid-cols-5 gap-4">
            {t.adopt.steps.map((s, i) => (
              <li key={i} className="rounded-2xl bg-white p-5 border border-black/5">
                <div className="text-xs uppercase tracking-wide text-[#0C7463]/80">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-1 font-semibold">{s.t}</div>
                <p className="mt-2 text-sm opacity-80">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <a href="#contact" className="rounded-2xl bg-[#0C7463] text-white px-5 py-3 inline-block hover:opacity-90">{t.adopt.cta}</a>
          </div>
        </div>
      </section>

      {/* Help */}
      <section id="help" className="bg-white/70 border-y border-black/5">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#0C7463]">{t.help.title}</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {t.help.cards.map((c, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 border border-black/5 flex flex-col">
                <div className="font-semibold">{c.t}</div>
                <p className="mt-2 text-sm opacity-80 flex-1">{c.d}</p>
                <a href={PAYPAL_URL} target="_blank" rel="noopener noreferrer" className="mt-4 rounded-xl bg-[#0C7463] text-white px-4 py-2 text-sm text-center hover:opacity-90">
                  {c.btn}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate anchor */}
      <div id="donate" className="mx-auto max-w-7xl px-4 pt-10 text-sm">
        <a href={PAYPAL_URL} target="_blank" rel="noopener noreferrer" className="inline-block rounded-xl bg-[#0C7463] text-white px-5 py-3">
          {t.paypalCta}
        </a>
        <p className="mt-3 opacity-70">
          {lang === "it"
            ? "Pagamento sicuro su PayPal. A breve: trasparenza spese e progetti."
            : lang === "fr"
            ? "Paiement sécurisé via PayPal. Bientôt : transparence des dépenses et projets."
            : "Secure payment via PayPal. Coming soon: expense transparency and projects."}
        </p>
      </div>

      {/* Contact */}
      <section id="contact" className="">
        <div className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0C7463]">{t.contact.title}</h2>
            <p className="mt-3">{t.contact.subtitle}</p>
            <div className="mt-6 rounded-2xl bg-white p-6 border border-black/5 text-sm">
              <div className="font-medium">Félinia – NGO</div>
              <div className="mt-1">{t.location}</div>
              <div className="mt-2">✉️ hello@felinia.org</div>
              <div className="">☎️ +216 00 000 000 (TN) · +39 000 000 000 (IT)</div>
              <div className="mt-2 opacity-70">{t.contact.legal}</div>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                lang === "it"
                  ? "Grazie! Ti risponderemo al più presto."
                  : lang === "fr"
                  ? "Merci ! Nous vous répondrons au plus vite."
                  : "Thanks! We'll get back to you soon."
              );
            }}
            className="rounded-2xl bg-white p-6 border border-black/5"
          >
            <label className="block text-sm">
              {t.contact.form.name}
              <input className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#0C7463]/40" required />
            </label>
            <label className="block text-sm mt-4">
              {t.contact.form.email}
              <input type="email" className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#0C7463]/40" required />
            </label>
            <label className="block text-sm mt-4">
              {t.contact.form.message}
              <textarea rows={4} className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#0C7463]/40" required />
            </label>
            <button className="mt-5 rounded-xl bg-[#0C7463] text-white px-5 py-2.5 text-sm hover:opacity-90">{t.contact.form.send}</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5">
        <div className="mx-auto max-w-7xl px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <CatLogo className="w-6 h-6" />
              <span className="font-medium">Félinia</span>
            </div>
            <p className="mt-2 opacity-70 max-w-sm">
              {lang === "it"
                ? "Un rifugio innovativo per gatti tra Tunisia e Europa, con adozioni responsabili, benessere e trasparenza."
                : lang === "fr"
                ? "Un refuge innovant pour chats entre Tunisie et Europe, avec adoptions responsables, bien‑être et transparence."
                : "An innovative cat shelter bridging Tunisia and Europe, focused on responsible adoptions, welfare and transparency."}
            </p>
          </div>
          <div className="space-y-1">
            <div className="font-medium">{t.nav.help}</div>
            <a href={PAYPAL_URL} target="_blank" rel="noopener noreferrer" className="block hover:text-[#0C7463]">{t.hero.ctaSecondary}</a>
            <a href="#adopt" className="block hover:text-[#0C7463]">{t.nav.adopt}</a>
            <a href="#contact" className="block hover:text-[#0C7463]">{t.nav.contact}</a>
          </div>
          <div className="opacity-70">
            <div>{t.footer.legal}</div>
            <div className="mt-1 flex gap-3">
              <a href="#" className="hover:text-[#0C7463]">{t.footer.policy}</a>
              <a href="#" className="hover:text-[#0C7463]">{t.footer.cookies}</a>
              <a href="#" className="hover:text-[#0C7463]">{t.footer.imprint}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
