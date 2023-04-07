const filterTable = [
  {
    name: 'genres',
    elements: [
      {
        id: 2,
        name: 'point-and-click',
        img: 'https://media.pocketgamer.com/artwork/na-ljxb/pgcom-highlight-top25-point-click-adventure-1010x505.jpg',
      },
      {
        id: 4,
        name: 'fighting',
        img: 'https://gmedia.playstation.com/is/image/SIEPDC/street-fighter-5-screen-01-ps4-en-27jul21?$native$',
      },
      {
        id: 5,
        name: 'shooter',
        img: 'https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/3f45dd111181481.605d1e9b41f62.png',
      },
      {
        id: 7,
        name: 'music',
        img: 'https://cogconnected.com/wp-content/uploads/2016/07/Video-Game-Cover-Bands-Top.jpg',
      },
      {
        id: 8,
        name: 'platform',
        img: 'https://www.videogameschronicle.com/files/2023/02/angry-birds.jpg',
      },
      {
        id: 9,
        name: 'puzzle',
        img: 'https://farm5.staticflickr.com/4444/36649759514_151fca1a2e_b.jpg',
      },
      {
        id: 10,
        name: 'racing',
        img: 'https://img.gaming.gentside.com/sto/tags/mario-kart-8-61263f411d28b420d1458134_6f3a13cfbf9c655e13175b7b.jpg',
      },
      {
        id: 11,
        name: 'real-time-strategy-rts',
        img: 'https://i.ytimg.com/vi/wBfVO1cCq2o/maxresdefault.jpg',
      },
      {
        id: 12,
        name: 'rpg',
        img: 'https://cdn.akamai.steamstatic.com/steam/apps/2280/capsule_616x353.jpg?t=1663861909',
      },
      {
        id: 13,
        name: 'simulator',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_LSiWUQ3QZGrVWP-KI80DciXqXWgYkRv6n6CaFPkiHD9yR6jfrTp8bUtGyAi2bnajPYM&usqp=CAU',
      },
      {
        id: 14,
        name: 'sport',
        img: 'https://i.jeuxactus.com/datas/jeux/f/i/fifa-22/xl/fifa-22-611613b873744.jpg',
      },
      {
        id: 15,
        name: 'strategy',
        img: 'https://cdn.mos.cms.futurecdn.net/AGKQpMXQLitZK8SzKNde4j-1200-80.jpg',
      },
      {
        id: 16,
        name: 'turn-based-strategy-tbs',
        img: 'https://i.ytimg.com/vi/6FTmBK97w-w/maxresdefault.jpg',
      },
      {
        id: 24,
        name: 'tactical',
        img: 'https://images2.minutemediacdn.com/image/upload/c_crop,w_1280,h_720,x_0,y_0/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/dbltap_en_international_web/01fkpb8p0dcr0xrx5j7d.jpg',
      },
      {
        id: 25,
        name: 'hack-and-slash-beat-em-up',
        img: 'https://assets.reedpopcdn.com/digitalfoundry-2015-god-of-war-3-remastered-face-off-1437676509908.jpg/BROK/resize/1200x1200>/format/jpg/quality/70/digitalfoundry-2015-god-of-war-3-remastered-face-off-1437676509908.jpg',
      },
      {
        id: 26,
        name: 'quiz-trivia',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJhzyrXvzr_NCfRZ-4QPGGt7eWQeHXwcKQB7dhUfnvu97lNQ_hTTNoyL7ili7kKYcJShA&usqp=CAU',
      },
      {
        id: 30,
        name: 'pinball',
        img: 'https://cdn.vox-cdn.com/thumbor/n1SRzs_nkwagvU_HiydROEJyWZQ=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/10803733/PREVIEW_SCREENSHOT3_49280.jpg',
      },
      {
        id: 31,
        name: 'adventure',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwbxiOpEHOQeh3sgXgZ8pYFt-iynDwu0PFXg&usqp=CAU',
      },
      {
        id: 32,
        name: 'indie',
        img: 'https://professionalmorondotcom.files.wordpress.com/2017/04/night-in-the-woods.jpg?w=640',
      },
      {
        id: 33,
        name: 'arcade',
        img: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/a/arcade-archives-pac-man-switch/hero',
      },
      {
        id: 34,
        name: 'visual-novel',
        img: 'https://whatnerd.com/wp-content/uploads/2019/07/visual-novel-video-games-featured.jpg',
      },
      {
        id: 35,
        name: 'card-and-board-game',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ_9KREU0tWja_olP5Z595UIRHgbkBaucaZ3sWJLCdVA3B-tVXswITQBQ5bZT0G4LKl8A&usqp=CAU',
      },
      {
        id: 36,
        name: 'moba',
        img: 'https://www.gamingscan.com/wp-content/uploads/2020/09/best-moba-games.jpg',
      },
    ],
  },
  {
    name: 'platforms',
    elements: [
      {
        id: 130,
        abbreviation: 'Switch',
        name: 'Nintendo Switch',
      },
      {
        id: 167,
        abbreviation: 'PS5',
        name: 'PlayStation 5',
      },
      {
        id: 169,
        abbreviation: 'Series X',
        name: 'Xbox Series X|S',
      },
      {
        id: 6,
        abbreviation: 'PC',
        name: 'PC (Microsoft Windows)',
      },
      {
        id: 34,
        abbreviation: 'Android',
        name: 'Android',
      },
      {
        id: 39,
        abbreviation: 'iOS',
        name: 'iOS',
      },
      {
        id: 48,
        abbreviation: 'PS4',
        name: 'PlayStation 4',
      },
      {
        id: 49,
        abbreviation: 'XONE',
        name: 'Xbox One',
      },
      {
        id: 20,
        abbreviation: 'NDS',
        name: 'Nintendo DS',
      },
      {
        id: 37,
        abbreviation: '3DS',
        name: 'Nintendo 3DS',
      },
      {
        id: 162,
        abbreviation: 'Oculus VR',
        name: 'Oculus VR',
      },
      {
        id: 390,
        abbreviation: 'PSVR2',
        name: 'PlayStation VR2',
      },
      {
        id: 165,
        abbreviation: 'PlayStation VR',
        name: 'PlayStation VR',
      },
      {
        id: 3,
        abbreviation: 'Linux',
        name: 'Linux',
      },
      {
        id: 38,
        abbreviation: 'PSP',
        name: 'PlayStation Portable',
      },
      {
        id: 46,
        abbreviation: 'Vita',
        name: 'PlayStation Vita',
      },
      {
        id: 7,
        abbreviation: 'PS1',
        name: 'PlayStation',
      },
      {
        id: 8,
        abbreviation: 'PS2',
        name: 'PlayStation 2',
      },
      {
        id: 9,
        abbreviation: 'PS3',
        name: 'PlayStation 3',
      },
      {
        id: 12,
        abbreviation: 'X360',
        name: 'Xbox 360',
      },
      {
        id: 24,
        abbreviation: 'GBA',
        name: 'Game Boy Advance',
      },
      {
        id: 4,
        abbreviation: 'N64',
        name: 'Nintendo 64',
      },
      {
        id: 21,
        abbreviation: 'NGC',
        name: 'Nintendo GameCube',
      },
      {
        id: 5,
        abbreviation: 'Wii',
        name: 'Wii',
      },
      {
        id: 41,
        abbreviation: 'WiiU',
        name: 'Wii U',
      },
      {
        id: 18,
        abbreviation: 'NES',
        name: 'Nintendo Entertainment System',
      },
      {
        id: 19,
        abbreviation: 'SNES',
        name: 'Super Nintendo Entertainment System',
      },
      {
        id: 22,
        abbreviation: 'GBC',
        name: 'Game Boy Color',
      },
      {
        id: 23,
        abbreviation: 'DC',
        name: 'Dreamcast',
      },
      {
        id: 11,
        abbreviation: 'XBOX',
        name: 'Xbox',
      },
      {
        id: 78,
        abbreviation: 'segacd',
        name: 'Sega CD',
      },
      {
        id: 14,
        abbreviation: 'Mac',
        name: 'Mac',
      },

      {
        id: 32,
        abbreviation: 'Saturn',
        name: 'Sega Saturn',
      },
      {
        id: 137,
        name: 'New Nintendo 3DS',
      },
      {
        id: 33,
        abbreviation: 'Game Boy',
        name: 'Game Boy',
      },
      {
        id: 170,
        abbreviation: 'Stadia',
        name: 'Google Stadia',
      },
      {
        id: 384,
        name: 'Oculus Quest',
      },

      {
        id: 59,
        abbreviation: 'Atari2600',
        name: 'Atari 2600',
      },
      {
        id: 441,
        name: 'PocketStation',
      },
      {
        id: 29,
        abbreviation: 'Genesis/MegaDrive',
        name: 'Sega Mega Drive/Genesis',
      },
      {
        id: 386,
        abbreviation: 'Meta Quest 2',
        name: 'Meta Quest 2',
      },
      // {
      //   id: 158,
      //   name: 'Commodore CDTV',
      // },
      // {
      //   id: 339,
      //   name: 'Sega Pico',
      // },

      // {
      //   id: 94,
      //   abbreviation: 'C+4',
      //   name: 'Commodore Plus/4',
      // },
      // {
      //   id: 144,
      //   name: 'AY-3-8710',
      // },
      // {
      //   id: 88,
      //   abbreviation: 'odyssey',
      //   name: 'Odyssey',
      // },
      // {
      //   id: 90,
      //   abbreviation: 'cpet',
      //   name: 'Commodore PET',
      // },
      // {
      //   id: 237,
      //   name: 'Sol-20',
      // },
      // {
      //   id: 44,
      //   abbreviation: 'zod',
      //   name: 'Tapwave Zodiac',
      // },
      // {
      //   id: 68,
      //   abbreviation: 'colecovision',
      //   name: 'ColecoVision',
      // },
      // {
      //   id: 129,
      //   abbreviation: 'ti-99',
      //   name: 'Texas Instruments TI-99',
      // },
      // {
      //   id: 134,
      //   name: 'Acorn Electron',
      // },
      // {
      //   id: 378,
      //   name: 'Gamate',
      // },
      // {
      //   id: 135,
      //   name: 'Hyper Neo Geo 64',
      // },
      // {
      //   id: 156,
      //   name: 'Thomson MO5',
      // },
      // {
      //   id: 133,
      //   name: 'Odyssey 2 / Videopac G7000',
      // },
      // {
      //   id: 163,
      //   abbreviation: 'Steam VR',
      //   name: 'SteamVR',
      // },
      // {
      //   id: 142,
      //   name: 'PC-50X Family',
      // },
      // {
      //   id: 148,
      //   name: 'AY-3-8607',
      // },
      // {
      //   id: 146,
      //   name: 'AY-3-8605',
      // },
      // {
      //   id: 147,
      //   name: 'AY-3-8606',
      // },
      // {
      //   id: 149,
      //   name: 'PC-98',
      // },
      // {
      //   id: 25,
      //   abbreviation: 'ACPC',
      //   name: 'Amstrad CPC',
      // },
      // {
      //   id: 381,
      //   name: 'Playdate',
      // },
      // {
      //   id: 51,
      //   abbreviation: 'fds',
      //   name: 'Family Computer Disk System',
      // },
      // {
      //   id: 123,
      //   name: 'WonderSwan Color',
      // },
      // {
      //   id: 136,
      //   name: 'Neo Geo CD',
      // },
      // {
      //   id: 35,
      //   abbreviation: 'Game Gear',
      //   name: 'Sega Game Gear',
      // },
      // {
      //   id: 62,
      //   abbreviation: 'Jaguar',
      //   name: 'Atari Jaguar',
      // },
      // {
      //   id: 50,
      //   abbreviation: '3DO',
      //   name: '3DO Interactive Multiplayer',
      // },
      // {
      //   id: 89,
      //   abbreviation: 'microvision',
      //   name: 'Microvision',
      // },
      // {
      //   id: 128,
      //   abbreviation: 'supergrafx',
      //   name: 'PC Engine SuperGrafx',
      // },
      // {
      //   id: 150,
      //   name: 'Turbografx-16/PC Engine CD',
      // },
      // {
      //   id: 65,
      //   abbreviation: 'Atari8bit',
      //   name: 'Atari 8-bit',
      // },
      // {
      //   id: 70,
      //   abbreviation: 'vectrex',
      //   name: 'Vectrex',
      // },
      // {
      //   id: 85,
      //   abbreviation: 'donner30',
      //   name: 'Donner Model 30',
      // },
      // {
      //   id: 97,
      //   abbreviation: 'pdp-8',
      //   name: 'PDP-8',
      // },
      // {
      //   id: 98,
      //   abbreviation: 'gt40',
      //   name: 'DEC GT40',
      // },
      // {
      //   id: 112,
      //   abbreviation: 'microcomputer',
      //   name: 'Microcomputer',
      // },
      // {
      //   id: 101,
      //   abbreviation: 'nimrod',
      //   name: 'Ferranti Nimrod Computer',
      // },
      // {
      //   id: 115,
      //   name: 'Apple IIGS',
      // },
      // {
      //   id: 13,
      //   abbreviation: 'DOS',
      //   name: 'DOS',
      // },
      // {
      //   id: 124,
      //   name: 'SwanCrystal',
      // },
      // {
      //   id: 127,
      //   name: 'Fairchild Channel F',
      // },
      // {
      //   id: 125,
      //   name: 'PC-8801',
      // },
      // {
      //   id: 87,
      //   abbreviation: 'virtualboy',
      //   name: 'Virtual Boy',
      // },
      // {
      //   id: 126,
      //   name: 'TRS-80',
      // },
      // {
      //   id: 132,
      //   name: 'Amazon Fire TV',
      // },
      // {
      //   id: 138,
      //   name: 'VC 4000',
      // },
      // {
      //   id: 139,
      //   name: '1292 Advanced Programmable Video System',
      // },
      // {
      //   id: 155,
      //   name: 'Tatung Einstein',
      // },
      // {
      //   id: 159,
      //   name: 'Nintendo DSi',
      // },
      // {
      //   id: 119,
      //   name: 'Neo Geo Pocket',
      // },
      // {
      //   id: 153,
      //   name: 'Dragon 32/64',
      // },
      // {
      //   id: 154,
      //   name: 'Amstrad PCW',
      // },

      // {
      //   id: 108,
      //   abbreviation: 'pdp11',
      //   name: 'PDP-11',
      // },
      // {
      //   id: 47,
      //   abbreviation: 'VC',
      //   name: 'Virtual Console (Nintendo)',
      // },
      // {
      //   id: 53,
      //   abbreviation: 'MSX2',
      //   name: 'MSX2',
      // },
      // {
      //   id: 60,
      //   abbreviation: 'Atari7800',
      //   name: 'Atari 7800',
      // },
      // {
      //   id: 30,
      //   abbreviation: 'Sega32',
      //   name: 'Sega 32X',
      // },
      // {
      //   id: 140,
      //   name: 'AY-3-8500',
      // },
      // {
      //   id: 143,
      //   name: 'AY-3-8760',
      // },
      // {
      //   id: 145,
      //   name: 'AY-3-8603',
      // },

      // {
      //   id: 120,
      //   name: 'Neo Geo Pocket Color',
      // },
      // {
      //   id: 77,
      //   abbreviation: 'x1',
      //   name: 'Sharp X1',
      // },
      // {
      //   id: 82,
      //   abbreviation: 'browser',
      //   name: 'Web browser',
      // },
      // {
      //   id: 109,
      //   abbreviation: 'cdccyber70',
      //   name: 'CDC Cyber 70',
      // },
      // {
      //   id: 113,
      //   name: 'OnLive Game System',
      // },
      // {
      //   id: 116,
      //   name: 'Acorn Archimedes',
      // },
      // {
      //   id: 114,
      //   name: 'Amiga CD32',
      // },
      // {
      //   id: 117,
      //   name: 'Philips CD-i',
      // },
      // {
      //   id: 121,
      //   name: 'Sharp X68000',
      // },
      // {
      //   id: 122,
      //   name: 'Nuon',
      // },

      // {
      //   id: 141,
      //   name: 'AY-3-8610',
      // },

      // {
      //   id: 64,
      //   abbreviation: 'SMS',
      //   name: 'Sega Master System/Mark III',
      // },
      // {
      //   id: 16,
      //   abbreviation: 'Amiga',
      //   name: 'Amiga',
      // },
      // {
      //   id: 86,
      //   abbreviation: 'turbografx16',
      //   name: 'TurboGrafx-16/PC Engine',
      // },

      // {
      //   id: 308,
      //   name: 'Playdia',
      // },
      // {
      //   id: 306,
      //   name: 'Satellaview',
      // },

      // {
      //   id: 15,
      //   abbreviation: 'C64',
      //   name: 'Commodore C64/128/MAX',
      // },
      // {
      //   id: 66,
      //   abbreviation: 'Atari5200',
      //   name: 'Atari 5200',
      // },
      // {
      //   id: 67,
      //   abbreviation: 'intellivision',
      //   name: 'Intellivision',
      // },
      // {
      //   id: 73,
      //   abbreviation: 'blackberry',
      //   name: 'BlackBerry OS',
      // },
      // {
      //   id: 307,
      //   name: 'Game & Watch',
      // },
      // {
      //   id: 111,
      //   abbreviation: 'imlac-pds1',
      //   name: 'Imlac PDS-1',
      // },
      // {
      //   id: 118,
      //   name: 'FM Towns',
      // },
      // {
      //   id: 131,
      //   name: 'Nintendo PlayStation',
      // },
      // {
      //   id: 157,
      //   name: 'NEC PC-6000 Series',
      // },
      // {
      //   id: 152,
      //   name: 'FM-7',
      // },

      // {
      //   id: 63,
      //   abbreviation: 'Atari-ST',
      //   name: 'Atari ST/STE',
      // },
      // {
      //   id: 61,
      //   abbreviation: 'Lynx',
      //   name: 'Atari Lynx',
      // },
      // {
      //   id: 93,
      //   abbreviation: 'C16',
      //   name: 'Commodore 16',
      // },

      // {
      //   id: 42,
      //   abbreviation: 'NGage',
      //   name: 'N-Gage',
      // },
      // {
      //   id: 374,
      //   name: 'Sharp MZ-2200',
      // },
      // {
      //   id: 58,
      //   abbreviation: 'SFAM',
      //   name: 'Super Famicom',
      // },
      // {
      //   id: 375,
      //   name: 'Epoch Cassette Vision',
      // },
      // {
      //   id: 388,
      //   name: 'Gear VR',
      // },
      // {
      //   id: 96,
      //   abbreviation: 'pdp10',
      //   name: 'PDP-10',
      // },
      // {
      //   id: 52,
      //   abbreviation: 'Arcade',
      //   name: 'Arcade',
      // },
      // {
      //   id: 377,
      //   name: 'Plug & Play',
      // },
      // {
      //   id: 57,
      //   abbreviation: 'WonderSwan',
      //   name: 'WonderSwan',
      // },
      // {
      //   id: 71,
      //   abbreviation: 'vic-20',
      //   name: 'Commodore VIC-20',
      // },
      // {
      //   id: 75,
      //   abbreviation: 'Apple][',
      //   name: 'Apple II',
      // },
      // {
      //   id: 74,
      //   abbreviation: 'Win Phone',
      //   name: 'Windows Phone',
      // },
      // {
      //   id: 80,
      //   abbreviation: 'neogeoaes',
      //   name: 'Neo Geo AES',
      // },
      // {
      //   id: 84,
      //   abbreviation: 'sg1000',
      //   name: 'SG-1000',
      // },
      // {
      //   id: 161,
      //   name: 'Windows Mixed Reality',
      // },
      // {
      //   id: 79,
      //   abbreviation: 'neogeomvs',
      //   name: 'Neo Geo MVS',
      // },
      // {
      //   id: 376,
      //   name: 'Epoch Super Cassette Vision',
      // },
      // {
      //   id: 382,
      //   name: 'Intellivision Amico',
      // },
      // {
      //   id: 387,
      //   name: 'Oculus Go',
      // },
      // {
      //   id: 385,
      //   name: 'Oculus Rift',
      // },
      // {
      //   id: 91,
      //   abbreviation: 'astrocade',
      //   name: 'Bally Astrocade',
      // },

      // {
      //   id: 69,
      //   abbreviation: 'bbcmicro',
      //   name: 'BBC Microcomputer System',
      // },
      // {
      //   id: 55,
      //   abbreviation: 'Mobile',
      //   name: 'Legacy Mobile Device',
      // },
      // {
      //   id: 379,
      //   name: 'Game.com',
      // },
      // {
      //   id: 72,
      //   abbreviation: 'Ouya',
      //   name: 'Ouya',
      // },
      // {
      //   id: 95,
      //   abbreviation: 'pdp1',
      //   name: 'PDP-1',
      // },
      // {
      //   id: 151,
      //   name: 'TRS-80 Color Computer',
      // },
      // {
      //   id: 100,
      //   abbreviation: 'analogueelectronics',
      //   name: 'Analogue electronics',
      // },
      // {
      //   id: 166,
      //   name: 'Pokémon mini',
      // },
      // {
      //   id: 102,
      //   abbreviation: 'edsac',
      //   name: 'EDSAC',
      // },
      // {
      //   id: 104,
      //   abbreviation: 'hp2100',
      //   name: 'HP 2100',
      // },
      // {
      //   id: 236,
      //   name: 'Exidy Sorcerer',
      // },
      // {
      //   id: 103,
      //   abbreviation: 'pdp-7',
      //   name: 'PDP-7',
      // },
      // {
      //   id: 238,
      //   name: 'DVD Player',
      // },
      // {
      //   id: 105,
      //   abbreviation: 'hp3000',
      //   name: 'HP 3000',
      // },
      // {
      //   id: 106,
      //   abbreviation: 'sdssigma7',
      //   name: 'SDS Sigma 7',
      // },
      // {
      //   id: 164,
      //   name: 'Daydream',
      // },
      // {
      //   id: 107,
      //   abbreviation: 'call-a-computer',
      //   name: 'Call-A-Computer time-shared mainframe computer system',
      // },
      // {
      //   id: 240,
      //   name: 'Zeebo',
      // },
      // {
      //   id: 110,
      //   abbreviation: 'plato',
      //   name: 'PLATO',
      // },
      // {
      //   id: 239,
      //   name: 'Blu-ray Player',
      // },
      // {
      //   id: 26,
      //   abbreviation: 'ZXS',
      //   name: 'ZX Spectrum',
      // },
      // {
      //   id: 274,
      //   name: 'PC-FX',
      // },
      // {
      //   id: 27,
      //   abbreviation: 'MSX',
      //   name: 'MSX',
      // },
      // {
      //   id: 309,
      //   name: 'Evercade',
      // },
      // {
      //   id: 372,
      //   name: 'OOParts',
      // },
      // {
      //   id: 373,
      //   name: 'Sinclair ZX81',
      // },
      // {
      //   id: 203,
      //   name: 'DUPLICATE Stadia',
      // },
      // {
      //   id: 380,
      //   name: 'Casio Loopy',
      // },

      // {
      //   id: 99,
      //   abbreviation: 'famicom',
      //   name: 'Family Computer',
      // },
      // {
      //   id: 389,
      //   name: 'AirConsole',
      // },
      // {
      //   id: 405,
      //   name: 'Windows Mobile',
      // },
      // {
      //   id: 409,
      //   name: 'Legacy Computer',
      // },
      // {
      //   id: 406,
      //   name: 'Sinclair QL',
      // },
      // {
      //   id: 411,
      //   name: 'Handheld Electronic LCD',
      // },
      // {
      //   id: 413,
      //   name: 'Leapster Explorer/LeadPad Explorer',
      // },
      // {
      //   id: 416,
      //   name: 'Nintendo 64DD',
      // },
      // {
      //   id: 407,
      //   name: 'HyperScan',
      // },
      // {
      //   id: 417,
      //   name: 'Palm OS',
      // },
      // {
      //   id: 408,
      //   name: 'Mega Duck/Cougar Boy',
      // },
      // {
      //   id: 410,
      //   name: 'Atari Jaguar CD',
      // },
      // {
      //   id: 415,
      //   name: 'Watara/QuickShot Supervision',
      // },
      // {
      //   id: 414,
      //   name: 'LeapTV',
      // },
      // {
      //   id: 412,
      //   name: 'Leapster',
      // },
      // {
      //   id: 438,
      //   name: 'Arduboy',
      // },
      // {
      //   id: 439,
      //   name: 'V.Smile',
      // },
      // {
      //   id: 440,
      //   name: 'Visual Memory Unit / Visual Memory System',
      // },
    ],
  },
  {
    name: 'themes',
    elements: [
      {
        id: 1,
        name: 'action',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8181sBHLYm1I-dybZLTJCfMwCh4kVAjHnFLGs-i6qyEjNWvX4abn-uoOiY4isr9-Yxw0&usqp=CAU',
      },
      {
        id: 17,
        name: 'fantasy',
        img: 'https://metro.co.uk/wp-content/uploads/2022/06/52117052922_1171b22d7c_h-98ad.jpg?quality=90&strip=all',
      },
      {
        id: 18,
        name: 'science-fiction',
        img: 'https://cdn.vox-cdn.com/thumbor/n1QlpE5EXZh02kRDsyG7HCwrUks=/0x0:5160x3836/1400x788/filters:focal(3711x1952:3712x1953)/cdn.vox-cdn.com/uploads/chorus_asset/file/23845689/Cover_1.png',
      },
      {
        id: 19,
        name: 'horror',
        img: 'https://blog.cdkeys.com/wp-content/uploads/2019/01/re2-cover-2.jpg',
      },
      {
        id: 20,
        name: 'thriller',
        img: 'https://c4.wallpaperflare.com/wallpaper/762/275/815/agent-47-red-gun-hitman-absolution-wallpaper-preview.jpg',
      },
      {
        id: 21,
        name: 'survival',
        img: 'https://i.ytimg.com/vi/KCi8CaMRuMs/mqdefault.jpg',
      },
      {
        id: 22,
        name: 'historical',
        img: 'https://asset.vg247.com/world_war_3_polish_squad_1.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/world_war_3_polish_squad_1.jpg',
      },
      {
        id: 23,
        name: 'stealth',
        img: 'https://www.gamespot.com/a/uploads/original/1597/15971423/3965790-7293095397-25324.png',
      },
      {
        id: 27,
        name: 'comedy',
        img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/448510/capsule_616x353.jpg?t=1668604484',
      },
      {
        id: 28,
        name: 'business',
        img: 'https://www.monopolyland.com/wp-content/uploads/monopoly_video-game-1.jpg',
      },
      {
        id: 31,
        name: 'drama',
        img: 'https://i.ytimg.com/vi/ohClxMmNLQQ/maxresdefault.jpg',
      },
      {
        id: 32,
        name: 'non-fiction',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKaULY3QPLsx05liTCgGZybY9idtU4dkLYD2q_bmChPDVfOrkJbY9lgjHqMTUoNWq4eQg&usqp=CAU',
      },
      {
        id: 33,
        name: 'sandbox',
        img: 'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/4/28/bjoyslzjb3uxqyg82uz2/minecraft',
      },
      {
        id: 34,
        name: 'educational',
        img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81yR-1MuNKL.jpg',
      },
      {
        id: 35,
        name: 'kids',
        img: 'https://s3-alpha.figma.com/hub/file/2098020863/c7761f65-9165-4131-894d-42f6e146462e-cover.png',
      },
      {
        id: 38,
        name: 'open-world',
        img: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/03/Red-Dead-Cover-John-Marston.jpg',
      },
      {
        id: 39,
        name: 'warfare',
        img: 'https://www.want.nl/wp-content/uploads/2022/10/1inUo7VTdbmAD9c1efdZGB9R.jpeg',
      },
      {
        id: 40,
        name: 'party',
        img: 'https://cdn.akamai.steamstatic.com/steam/apps/611790/header.jpg?t=1677257511',
      },
      {
        id: 41,
        name: '4x-explore-expand-exploit-and-exterminate',
        img: 'https://www.gamersdecide.com/sites/default/files/styles/news_images/public/content-images/news/2017/03/15/17-best-4x-games-play-pc/main_0.jpg',
      },
      {
        id: 42,
        name: 'erotic',
        img: 'https://nichegamer.com/wp-content/uploads/2018/09/negligee-09-17-18-1.jpg',
      },
      {
        id: 43,
        name: 'mystery',
        img: 'https://enjoyps4.sakura.ne.jp/wp/wp-content/uploads/2021/02/we_were_here_ps4_playstation_4_screenshot_001.jpg',
      },
      {
        id: 44,
        name: 'romance',
        img: 'https://www.gematsu.com/wp-content/uploads/2010/12/Catherine-Box-Art-Fami.jpg',
      },
    ],
  },
  {
    name: 'game_modes',
    elements: [
      {
        id: 1,
        name: 'Single player',
        slug: 'single-player',
      },
      {
        id: 2,
        name: 'Multiplayer',
        slug: 'multiplayer',
      },
      {
        id: 3,
        name: 'Co-operative',
        slug: 'co-operative',
      },
      {
        id: 4,
        name: 'Split screen',
        slug: 'split-screen',
      },
      {
        id: 5,
        name: 'Massively Multiplayer Online (MMO)',
        slug: 'massively-multiplayer-online-mmo',
      },
      {
        id: 6,
        name: 'Battle Royale',
        slug: 'battle-royale',
      },
    ],
  },

  {
    name: 'player_perspectives',
    elements: [
      {
        id: 1,
        name: 'First person',
        slug: 'first-person',
      },
      {
        id: 2,
        name: 'Third person',
        slug: 'third-person',
      },
      {
        id: 3,
        name: 'Bird view / Isometric',
        slug: 'bird-view-slash-isometric',
      },
      {
        id: 5,
        name: 'Text',
        slug: 'text',
      },
      {
        id: 4,
        name: 'Side view',
        slug: 'side-view',
      },
      {
        id: 7,
        name: 'Virtual Reality',
        slug: 'virtual-reality',
      },
      {
        id: 6,
        name: 'Auditory',
        slug: 'auditory',
      },
    ],
  },
]

export default filterTable
