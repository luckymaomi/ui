type FontOptions = {
  variable?: string;
  subsets?: string[];
  weight?: string | string[];
  style?: string | string[];
  display?: string;
};
type FontResult = { className: string; variable: string; style: { fontFamily: string } };

function localFont(name: string) {
  return (options: FontOptions = {}): FontResult => ({
    className: "",
    variable: options.variable ?? "",
    style: { fontFamily: `"${name.replaceAll("_", " ")}", system-ui, sans-serif` },
  });
}

export const Albert_Sans = localFont("Albert Sans");
export const Archivo = localFont("Archivo");
export const Bricolage_Grotesque = localFont("Bricolage Grotesque");
export const Cormorant_Garamond = localFont("Cormorant Garamond");
export const Familjen_Grotesk = localFont("Familjen Grotesk");
export const Fraunces = localFont("Fraunces");
export const IBM_Plex_Mono = localFont("IBM Plex Mono");
export const Instrument_Sans = localFont("Instrument Sans");
export const Instrument_Serif = localFont("Instrument Serif");
export const JetBrains_Mono = localFont("JetBrains Mono");
export const Libre_Caslon_Text = localFont("Libre Caslon Text");
export const Space_Mono = localFont("Space Mono");
export const Work_Sans = localFont("Work Sans");
