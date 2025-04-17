import {
  BookCheckIcon,
  BookMarkedIcon,
  ChartLineIcon,
  HandshakeIcon,
  HouseIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Fragment } from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Button } from "@/components/ui/button";
import { ContactUs } from "./components/contact-us";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

const ABOUT_US = [
  {
    id: "La Nostra Missione",
    text: "Rendere più semplice e organizzato il lavoro quotidiano all'interno dei CAF, riducendo la burocrazia e migliorando l'accesso ai servizi per ogni cittadino.",
  },
  {
    id: "Il Nostro Team",
    text: "Siamo un gruppo di professionisti appassionati di tecnologia e innovazione nei servizi pubblici. Crediamo che strumenti moderni possano migliorare concretamente la vita di chi lavora nei CAF e di chi ne usufruisce.",
  },
  {
    id: "I Nostri Valori",
    text: "Efficienza, accessibilità e semplicità. Vogliamo offrire un sistema chiaro, veloce e personalizzabile, pensato per facilitare davvero il lavoro di ogni operatore.",
  },
] as const;

const SERVICES = [
  {
    id: "Gestione Pratiche",
    Icon: BookCheckIcon,
    text: "Crea, modifica e archivia pratiche per ogni utente in modo semplice e ordinato.",
  },
  {
    id: "Registrazione CAF",
    Icon: HouseIcon,
    text: "Registra il tuo centro CAF e gestisci i dati in totale autonomia e sicurezza.",
  },
  {
    id: "Gestione Dipendenti",
    Icon: UsersIcon,
    text: "Aggiungi e gestisci operatori con ruoli e permessi personalizzati.",
  },
  {
    id: "Archivio Digitale",
    Icon: BookMarkedIcon,
    text: "Conserva i documenti in cloud, accessibili ovunque e in qualsiasi momento.",
  },
  {
    id: "Storico e Statistiche",
    Icon: ChartLineIcon,
    text: "Tieni traccia delle attività svolte e accedi a report statistici sull'andamento del tuo CAF.",
  },
  {
    id: "Supporto Integrato",
    Icon: HandshakeIcon,
    text: "Assistenza tecnica e funzionalità di messaggistica tra operatori e amministratori.",
  },
] as const;

export default function Page() {
  return (
    <Fragment>
      <Header />
      <main>
        <div className="p-8 bg-muted">
          <MaxWidthWrapper className="grid gap-4 md:gap-0 md:grid-cols-2">
            <div className="flex flex-col justify-center gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Benvenuto a CAFnow!
                </h2>
                <p className="text-muted-foreground">
                  Tutto ciò che serve a un CAF in un&#39;unica app: gestisci
                  utenti, lavoratori e pratiche in modo smart e sicuro.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="#services">
                  <Button size="lg">I nostri servizi</Button>
                </Link>
                <Link href="#contact">
                  <Button size="lg" variant="outline">
                    Comincia
                  </Button>
                </Link>
              </div>
            </div>
            <img
              alt="girl-working-on-computer"
              src="/girl-working-on-computer.png"
              className="w-full h-full object-contain"
            />
          </MaxWidthWrapper>
        </div>
        <div id="about" className="scroll-mt-20 my-32 text-center">
          <MaxWidthWrapper className="flex flex-col gap-12">
            <div>
              <h2 className="text-2xl font-bold">Su di noi</h2>
              <p className="text-muted-foreground lg:px-48">
                CAFnow nasce con l&#39;obiettivo di digitalizzare e semplificare
                il lavoro dei Centri di Assistenza Fiscale. Offriamo una
                piattaforma intuitiva che permette di registrare il proprio CAF,
                gestire il personale, creare e archiviare pratiche in modo
                efficiente.
              </p>
            </div>
            <div className="grid gap-8 lg:gap-0 lg:grid-cols-2">
              <img
                alt="boy-working-on-computer"
                src="/boy-working-on-computer.png"
                className="w-full h-full object-cover"
              />
              <ul className="flex flex-col text-left justify-around gap-4">
                {ABOUT_US.map(({ id, text }) => {
                  return (
                    <li key={id}>
                      <h3 className="text-primary text-lg font-bold">{id}</h3>
                      <p className="text-muted-foreground">{text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </MaxWidthWrapper>
        </div>
        <div id="services" className="scroll-mt-20 my-32 text-center">
          <MaxWidthWrapper className="flex flex-col gap-12">
            <div>
              <h2 className="text-2xl font-bold">I nostri servizi</h2>
              <p className="text-muted-foreground lg:px-48">
                Offriamo strumenti digitali per semplificare e velocizzare la
                gestione delle pratiche fiscali all&#39;interno dei CAF
              </p>
            </div>
            <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-8">
              {SERVICES.map((service) => {
                return (
                  <Card key={service.id} className="text-left gap-4 px-6">
                    <CardHeader className="flex items-center p-0">
                      <service.Icon />
                      <CardTitle>{service.id}</CardTitle>
                    </CardHeader>
                    <CardDescription>{service.text}</CardDescription>
                  </Card>
                );
              })}
            </div>
          </MaxWidthWrapper>
        </div>
        <div id="contact" className="scroll-mt-20 my-32">
          <MaxWidthWrapper className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Contattaci 📞</h2>
              <p className="text-muted-foreground">
                Pronto per iniziare? Compila il modulo e il nostro team ti
                contatterà il più prima possibile. Siamo felici di risponderti e
                aiutarti a registrare il tuo CAF nel modo più semplice e sicuro
                possibile. I tuoi dati saranno trattati con riservatezza.
              </p>
            </div>
            <ContactUs />
          </MaxWidthWrapper>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}
