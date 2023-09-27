import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
const GeminoDictionary = ({
    showButton = false
}: {
    showButton?: boolean
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <div>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder={`Search for a word, either English or ${process.env.NEXT_PUBLIC_COURSE}...`} />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                        {keys.map((key, index) => (
                            <CommandItem
                                className="flex space-x-2 items-center"
                                key={
                                    index
                                }>
                                {
                                    key.charAt(0).toUpperCase() + key.slice(1)
                                } <ArrowRight size={13} />
                                {
                                    values[index].charAt(0).toUpperCase() + values[index].slice(1)
                                }
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
            {showButton && (
                <Button
                    onClick={
                        () => {
                            toggleMenu();
                        }
                    } className="flex justify-evenly items-center text-lg w-full">
                    <p className="text-sm lg:md:sm:block hidden">
                        Click Here to try it out
                        <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </p>
                    <p className="text-sm lg:md:sm:hidden block">
                        Tap Here to try it out
                    </p>
                </Button>
            )}
        </div>
    );
};

export default GeminoDictionary;



const dictionaryArray =
{
    abbiegen: "turn",
    Abend: "evening",
    Abendessen: "dinner",
    Abendkleidung: "evening dress",
    Abenteuer: "adventure",
    aber: "but",
    abfahren: "leave (irr.)",
    Abfall: "waste",
    abfliegen: "start",
    Abgabe: "tax",
    abgehoben: "withdrawn",
    abgenutzt: "worn-out",
    Abgeordneter: "representative",
    Abgrenzung: "boundary",
    Abhang: "slope",
    abhängen: "depend",
    abhängig: "dependent",
    Abhängigkeit: "dependence",
    "Abhängig sein von": "depend on",
    abhärten: "harden",
    "abheben (Geld)": "withdraw (irr.)",
    abklären: "clear",
    abkühlen: "cool",
    ablehnen: "refuse",
    Ablehnung: "refusal",
    Abmachung: "arrangement",
    Abnahme: "lessening",
    abnehmen: "decrease",
    "abnehmen (Hut)": "take off",
    abnutzen: "wear down",
    Abnutzung: "wear",
    Abrechnung: "account",
    Abreise: "departure",
    abreisen: "start",
    "abreisen nach": "leave for",
    Absatz: "heel",
    abschreiben: "copy",
    Abschrift: "copy",
    "abseits vom Wege": "out of the way",
    Absender: "sender",
    Absicht: "purpose",
    absichtlich: "on purpose",
    absperren: "lock",
    "abstammen von": "descend from",
    abstauben: "dust",
    abstimmen: "vote",
    Abstimmung: "vote",
    Absturz: "crash",
    abstürzen: "crash",
    Abteilung: "department",
    abwärts: "downwards",
    Abwechslung: "variety",
    abwesend: "absent",
    Abwesenheit: "absence",
    abzäunen: "fence off",
    Abzug: "print",
    acht: "eight",
    achte: "eighth",
    "achtgeben (auf)": "take care (of)",
    achtzehn: "eighteen",
    achtzehnte: "eighteenth",
    achtzig: "eighty",
    achtzigste: "eightieth",
    Adel: "nobility",
    "adeliger Herr": "Lord",
    adoptieren: "adopt",
    Adoption: "adoption",
    Adresse: "address",
    Affe: "monkey",
    Afrika: "Africa",
    Afrikaner: "African",
    afrikanisch: "African",
    Agent: "agent",
    Agentur: "agency",
    ähnlich: "similar",
    Akt: "act",
    Aktie: "share",
    aktiv: "active",
    Aktivität: "activity",
    Alarm: "alarm",
    Alkohol: "alcohol",
    "alkoholfreie Getränke": "soft drinks",
    all: "all",
    "alle Leute": "all men",
    "alle Menschen sind gleichwertig": "all men are equal",
    "alle paar Stunden": "every few hours",
    "alle Völker der Welt": "all the peoples of the world",
    "alle Völker der Erde": "all the peoples of the earth",
    Allee: "avenue",
    allein: "alone",
    alles: "everything",
    "alles beliebige": "anything",
    allgemein: "general",
    Allgemeinheit: "community",
    allmählich: "gradual",
    als: "as",
    "als (bei Steigerung)": "than",
    "als (zu der Zeit)": "when",
    "als ob": "as though",
    alt: "old",
    "alte Bücher": "old books",
    Alter: "age",
    älter: "older",
    ältere: "elder",
    älteste: "oldest",
    altmodisch: "old-fashioned",
    "am besten": "best",
    "am Boden von": "at the bottom of",
    "am Ende des Stücks": "at the close of the play",
    "am Körper tragen": "wear (irr.)",
    "am Leben": "alive",
    "am Leben sein": "be alive",
    "am meisten": "most",
    "am schlechtesten": "worst",
    "am schlimmsten": "worst",
    "am weitesten": "farthest",
    "am wenigsten": "least",
    Amerika: "America",
    amerikanisch: "American",
    Amt: "office",
    amtlich: "official",
    "amüsier dich": "amuse yourself",
    amüsieren: "amuse",
    an: "at",
    "an Bord": "aboard",
    "an Deck": "on board",
    "an der Spitze von": "at the head of",
    "an der Wand": "on the wall",
    "an die Kälte gewöhnt": "accustomed to the cold",
    "an einer Konferenz teilnehmen": "attend a conference",
    "an jedem Tag": "everyday",
    "an seiner Seite": "at his side",
    anbauen: "grow (irr.)",
    anbieten: "offer",
    Anblick: "sight",
    andauernd: "permanently",
    anderenfalls: "otherwise",
    anderer: "other",
    Änderung: "change",
    anerkennen: "appreciate",
    Anerkennung: "recognition",
    Anfang: "start",
    anfangen: "start",
    anfeuchten: "damp",
    angebaut: "grown",
    angeben: "declare",
    Angebot: "offer",
    angehäuft: "piled up",
    Angelegenheit: "matter",
    angelehnt: "leant",
    angeliefert: "delivered",
    Angelrute: "fishing-rod",
    angenehm: "pleasant",
    Angewohnheit: "habit",
    angezogen: "dressed",
    angezündet: "lit",
    angreifen: "attack",
    Angriff: "attack",
    Angst: "fear",
    "Angst haben vor": "be afraid of",
    anhalten: "stop",
    Anhänger: "follower",
    anhäufen: "heap",
    anklagen: "charge",
    ankommen: "arrive",
    Ankunft: "arrival",
    Anlass: "occasion",
    anlehnen: "lean (irr.)",
    anliefern: "deliver",
    Anlieferung: "delivery",
    anlocken: "attract",
    anmalen: "paint",
    Anmerkung: "note",
    annehmen: "accept",
    Annehmlichkeit: "convenience",
    annoncieren: "advertise",
    anordnen: "order",
    Anordnung: "order",
    anprobieren: "try on",
    Anrecht: "right",
    Anreiz: "attraction",
    "Anruf (Telefon)": "telephone call",
    anrufen: "telephone",
    "anrufen (Telefon)": "call",
    anschieben: "push",
    Anschlagtafel: "notice board",
    Anschluss: "connection",
    "ansehen (verb)": "look at",
    Ansiedlung: "settlement",
    Anspruch: "pretence",
    ansteigen: "rise (irr.)",
    anstellen: "employ",
    Anstellung: "engagement",
    Anstoß: "push",
    Anstrengung: "effort",
    Anstrich: "paint",
    Anteil: "share",
    antik: "ancient",
    Antriebsfeder: "spring",
    Antwort: "reply",
    antworten: "reply",
    anvertrauen: "entrust",
    Anweisungen: "directions",
    anwenden: "apply",
    anwesend: "present",
    Anwesenheit: "presence",
    anziehen: "attract",
    "anziehen (Person)": "dress",
    Anzug: "suit",
    anzünden: "light (irr.)",
    Apfel: "apple",
    Apotheker: "chemist",
    Appetit: "appetite",
    applaudieren: "applaud",
    Applaus: "applause",
    April: "April",
    Arbeit: "work",
    "Arbeit (Anstrengung)": "labour",
    arbeiten: "work",
    "Arbeiter(in)": "worker",
    Arbeiterklasse: "working-class",
    Arbeitgeber: "employer",
    Arbeitnehmer: "employee",
    arbeitslos: "unemployed",
    Arbeitslosigkeit: "unemployment",
    Arbeitstag: "working-day",
    Arbeitsvermittlung: "labour exchange",
    ärgerlich: "annoying",
    Ärgernis: "nuisance",
    Argument: "argument",
    Argwohn: "suspicion",
    Arm: "arm",
    arm: "poor",
    Armbanduhr: "wristwatch",
    Ärmel: "sleeve",
    Armut: "poverty",
    Aroma: "flavour",
    Arrest: "arrest",
    Art: "kind",
    "Art und Weise": "manner",
    Artigkeit: "prettiness",
    Artikel: "article",
    artistisch: "artistic",
    Arzneimittel: "drug",
    Arzt: "physician",
    aß: "ate",
    Asche: "ashes",
    Asien: "Asia",
    Assistent: "assistant",
    Atem: "breath",
    atmen: "breathe",
    Atmen: "breathing",
    atmend: "breathing",
    attractiv: "attractive",
    Attraktion: "attraction",
    auch: "too (nachgestellt)",
    "auch nicht": "nor",
    auf: "up",
    "auf (prep.)": "upon",
    "auf beiden Seiten": "on either side",
    "auf das Wohl der Braut trinken": "drink to the health of the bride",
    "auf dem Luftweg": "by air",
    "auf der Suche": "searching",
    "auf die eine oder andere Weise": "in some way or other",
    "auf ehrliche Weise": "honestly",
    "auf eigenartige Weise": "peculiarly",
    "auf einen Besuch hereinkommen": "drop in",
    "auf etwas deuten": "point at something",
    "auf feine Art": "finely",
    "auf Flaschen füllen": "bottle",
    "auf gierige Weise": "greedily",
    "auf grausame Weise": "cruelly",
    "auf höfliche Weise": "politely",
    "auf leichte Weise": "easily",
    "auf mechanische Weise": "mechanically",
    "auf mehr Arbeit begierig": "eager for more work",
    "auf meine Kosten": "at my expense",
    "auf natürliche Weise": "naturally",
    "auf nette Weise": "nicely",
    "auf Probe": "on trial",
    "auf schöne Weise": "beautifully",
    "auf schreckliche Art und Weise": "terribly",
    "auf tapfere Weise": "bravely",
    "auf Tour gehen": "go on tour",
    "auf trockene Art und Weise": "dryly",
    "auf und ab rennen": "run up and down",
    "Auf Wiedersehen": "goodbye ",
    "auf wunderbare Art und Weise": "wonderfully",
    "auf zarte Weise": "delicately",
    Aufbau: "structure",
    aufbrauchen: "use up",
    aufbrechen: "start",
    Aufenthalt: "stay",
    aufführen: "perform",
    auffüllen: "fill up",
    "Aufgabe (gestellte)": "task",
    aufgegangen: "risen",
    "aufgehen (Sonne etc)": "rise (irr.)",
    aufgestanden: "risen",
    aufgewacht: "woken",
    aufgeweckt: "woken",
    aufhalten: "check",
    aufhäufen: "pile up",
    aufheben: "lift",
    aufhören: "stop",
    aufknöpfen: "unbutton",
    aufleuchten: "flash",
    auflösen: "dissolve",
    Aufmerksamkeit: "attention",
    aufmuntern: "cheer",
    "aufpassen (auf)": "pay attention (to)",
    aufrecht: "upright",
    aufrechterhalten: "maintain",
    aufregen: "excite",
    aufregend: "exciting",
    Aufregung: "excitement",
    aufrichten: "raise",
    aufrichtig: "truly",
    aufrühren: "stir up",
    "aufs Neue": "anew",
    Aufschrei: "outcry",
    aufschreien: "cry out",


}

const keys = Object.keys(dictionaryArray);
const values = Object.values(dictionaryArray);