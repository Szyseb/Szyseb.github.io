export const name = 'Sebastian Szyszło';
export const email = 'szysebastian@gmail.com';

export const projects = [
  {
    id: 'pcsk225',
    title: 'Odbiornik PCSK225',
    status: 'W realizacji',
    description: 'Projekt odbiornika sygnału czasu PCSK225 i dekodowania ramki.',
    tags: ['RF', 'Embedded', 'DSP'],
    image: '/media/pcsk225.svg',
    images: ['', '', '']
  },
  {
    id: 'lokalizacja',
    title: 'System lokalizacji BLE/LoRa/GSM',
    status: 'Projekt grupowy',
    description: 'Zespół lokalizatorów BLE, bramek LoRa i modułu powiadomień GSM.',
    tags: ['BLE', 'LoRa', 'GSM'],
    image: '/media/wireless.svg',
    images: ['', '', '']
  },
  {
    id: 'sn74138',
    title: 'SN74138 w Magic VLSI',
    status: '',
    description: 'Layout układu SN74138 wykonany w środowisku Magic VLSI.',
    tags: ['VLSI', 'Layout'],
    image: '/media/layout.svg',
    images: ['', '', '']
  },
  {
    id: 'kicad-7seg',
    title: 'Sterownik 7-segmentowy w KiCad',
    status: '',
    description: 'Projekt kontrolera wyświetlacza siedmiosegmentowego w KiCadzie.',
    tags: ['KiCad', 'Elektronika'],
    image: '/media/display.svg',
    images: ['', '', '']
  },
  {
    id: 'perfect-circuit-builder',
    title: 'Perfect Circuit Builder',
    status: '',
    description: 'Edukacyjna gra Java do nauki podstaw budowania obwodów.',
    tags: ['Java', 'Edukacja'],
    image: '/media/game.svg',
    images: ['', '', '']
  }
];

export const workshop = {
  intro: 'Portfolio projektowe z naciskiem na elektronikę, prototypowanie i dokumentację.',
  tools: ['KiCad', 'Altium', 'Magic VLSI', 'Java', 'Python', 'MATLAB', 'C++', 'Fusion 360'],
  about:
    'To miejsce na krótki opis sposobu pracy: od schematu i symulacji, przez płytkę, po uruchomienie i pomiary. Uzupełnij własnymi przykładami i decyzjami projektowymi.',
  portraitSlot: '',
  workbenchSlot: ''
};
