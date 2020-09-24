import {atom} from "recoil";

const samplesList = [
    {
        title: "Bass Drum",
        path: "/BD/",
        samples: [
            "BD0000.WAV",
            "BD0010.WAV",
            "BD0025.WAV",
            "BD0050.WAV",
            "BD0075.WAV",
            "BD1000.WAV",
            "BD1010.WAV",
            "BD1025.WAV",
            "BD1050.WAV",
            "BD1075.WAV",
            "BD2500.WAV",
            "BD2510.WAV",
            "BD2525.WAV",
            "BD2550.WAV",
            "BD2575.WAV",
            "BD5000.WAV",
            "BD5010.WAV",
            "BD5025.WAV",
            "BD5050.WAV",
            "BD5075.WAV",
            "BD7500.WAV",
            "BD7510.WAV",
            "BD7525.WAV",
            "BD7550.WAV",
            "BD7575.WAV"
        ]
    },

    {
        title: "Snare Drum ",
        path: "/SD/",
        samples: [
            "SD0000.WAV",
            "SD0010.WAV",
            "SD0025.WAV",
            "SD0050.WAV",
            "SD0075.WAV",
            "SD1000.WAV",
            "SD1010.WAV",
            "SD1025.WAV",
            "SD1050.WAV",
            "SD1075.WAV",
            "SD2500.WAV",
            "SD2510.WAV",
            "SD2525.WAV",
            "SD2550.WAV",
            "SD2575.WAV",
            "SD5000.WAV",
            "SD5010.WAV",
            "SD5025.WAV",
            "SD5050.WAV",
            "SD5075.WAV",
            "SD7500.WAV",
            "SD7510.WAV",
            "SD7525.WAV",
            "SD7550.WAV",
            "SD7575.WAV",
        ]
    },

    {
        title: "Tom",
        path: "/TM/",
        samples: [
            "HT00.WAV",
            "HT10.WAV",
            "HT25.WAV",
            "HT50.WAV",
            "HT75.WAV",
            "LT00.WAV",
            "LT10.WAV",
            "LT25.WAV",
            "LT50.WAV",
            "LT75.WAV",
            "MT00.WAV",
            "MT10.WAV",
            "MT25.WAV",
            "MT50.WAV",
            "MT75.WAV"
        ]
    },

    {
        title: "Conga",
        path: "/CG/",
        samples: [
            "HC00.WAV",
            "HC10.WAV",
            "HC25.WAV",
            "HC50.WAV",
            "HC75.WAV",
            "LC00.WAV",
            "LC10.WAV",
            "LC25.WAV",
            "LC50.WAV",
            "LC75.WAV",
            "MC00.WAV",
            "MC10.WAV",
            "MC25.WAV",
            "MC50.WAV",
            "MC75.WAV"
        ]
    },

    {
        title: "Rim Shot",
        path: "/RS/",
        samples: [
            "RS00.WAV",
            "RS01.ogg",
            "RS02.ogg"
        ]
    },

    {
        title: "Claves",
        path: "/CL/",
        samples: [
            "CL00.WAV",
        ]
    },

    {
        title: "Hand Clap",
        path: "/CP/",
        samples: [
            "CP00.WAV",
            "CP01.ogg"
        ]
    },

    {
        title: "Maracas",
        path: "/MA/",
        samples: [
            "MA00.WAV",
            "MA01.ogg"
        ]
    },

    {
        title: "Cowbell",
        path: "/CB/",
        samples: [
            "CB00.WAV"
        ]
    },

    {
        title: "Cymbal",
        path: "/CY/",
        samples: [
            "CY0000.WAV",
            "CY0010.WAV",
            "CY0025.WAV",
            "CY0050.WAV",
            "CY0075.WAV",
            "CY1000.WAV",
            "CY1010.WAV",
            "CY1025.WAV",
            "CY1050.WAV",
            "CY1075.WAV",
            "CY2500.WAV",
            "CY2510.WAV",
            "CY2525.WAV",
            "CY2550.WAV",
            "CY2575.WAV",
            "CY5000.WAV",
            "CY5010.WAV",
            "CY5025.WAV",
            "CY5050.WAV",
            "CY5075.WAV",
            "CY7500.WAV",
            "CY7510.WAV",
            "CY7525.WAV",
            "CY7550.WAV",
            "CY7575.WAV",
        ]
    },

    {
        title: "Open Hi Hat",
        path: "/OH/",
        samples: [
            "OH00.WAV",
            "OH10.WAV",
            "OH25.WAV",
            "OH50.WAV",
            "OH75.WAV"
        ]
    },

    {
        title: "Closed Hi Hat",
        path: "/CH/",
        samples: [
            "CH00.WAV",
            "CH01.ogg",
            "CH02.ogg"
        ]
    },
]

export const SampleList_ = atom({
    id: "SampleList",
    default: samplesList
})
