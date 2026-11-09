export const name = 'Sebastian Szyszło';
export const email = 'szysebastian@gmail.com';
export const linkedin = 'https://www.linkedin.com/in/sebastian-szyszło-a57877218';

export const projects = [
  {
    id: 'pcsk225',
    title: 'Odbiornik PCSK225',
    description: 'Odbiór radiowego sygnału czasu.',
    detail: 'Po odebraniu sygnału eCzasPL układ dekoduje zawartą w nim informację o czasie i prezentuje odczyt na wbudowanym wyświetlaczu matrycowym.',
    tags: ['RF', 'DSP'],
    status: 'W realizacji',
    images: [],
  },
  {
    id: 'wireless',
    title: 'System lokalizacji zagubionych dzieci',
    description: 'Lokalizatory BLE, stacje LoRa i powiadomienia GSM.',
    detail: 'Projekt grupowy łączący trzy technologie radiowe. BLE służy do wykrywania lokalizatorów, LoRa do komunikacji stacji, a GSM do wysyłania powiadomień na urządzenia rodziców.',
    tags: ['BLE', 'LoRa', 'GSM'],
    status: 'Projekt grupowy',
    images: [],
  },
  {
    id: 'layout',
    title: 'SN74138',
    description: 'Layout demultipleksera w Magic VLSI.',
    detail: 'Projekt fizycznego układu warstw i połączeń demultipleksera SN74138 w edytorze Magic VLSI.',
    tags: ['VLSI', 'Magic VLSI'],
    images: [],
  },
  {
    id: 'game',
    title: 'Perfect Circuit Builder',
    description: 'Gra edukacyjna napisana w Javie.',
    detail: 'Projekt programistyczny, który przenosi temat budowania obwodów elektrycznych do gry edukacyjnej.',
    tags: ['Java', 'Edukacja'],
    images: [],
  },
];

export const toolGroups = [
  ['Elektronika', 'Altium, KiCad, Magic VLSI'],
  ['Programowanie', 'C++, Python, Java'],
  ['Sygnały i modelowanie', 'MATLAB, Fusion 360'],
];
