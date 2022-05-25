function gtris_character_details(name) {
  var lang = selectedSettings.Other.Language
  return {
    eng: {
      ericlenovo: {
        name: "EricLenovo",
        gender: "Male",
        date_existed: "May 18, 2022",
        date_version: "0.0.021 Alpha",
        author: "EricLenovo",
        description: "He is the developer of Gachatris Tetraplus.",
        versions: ['Original']
      },
      betelgeuse_abbygaile: {
        name: "Betelgeuse Abbygaile",
        gender: "Female",
        date_existed: "May 18, 2022",
        date_version: "0.0.021 Alpha",
        author: "EricLenovo",
        description: "She is the fictional wife of EricLenovo in Phar Re.",
        versions: ['Original']
      },
      sun_gabbryielle: {
        name: "Sun Gabbryielle",
        gender: "Female",
        date_existed: "May 18, 2022",
        date_version: "0.0.021 Alpha",
        author: "EricLenovo",
        description: "She is the fictional daughter of EricLenovo and Abbygaile in Phar Re.",
        versions: ['Original']
      },
      pikumon10: {
        name: "Piku",
        gender: "Female",
        date_existed: "May 18, 2022",
        date_version: "0.0.021 Alpha",
        author: "Pikumon10",
        description: "She is one of the spring adventurers known for her picnics.",
        versions: ['Original']
      },
      forest: {
        name: "Forest",
        gender: "Male",
        date_existed: "May 25, 2022",
        date_version: "0.0.048 Alpha",
        author: "That-Aromantic_Asexual",
        description: "He is a forest explorer named after one of the places filled with trees.",
        versions: ['Original']
      },
    },
    fil: {
      ericlenovo: {
        name: "EricLenovo",
        gender: "Lalaki",
        date_existed: "Mayo 18, 2022",
        date_version: "0.0.021 Alpha",
        author: "EricLenovo",
        description: "Isa siyang taga-likha ng Gachatris Tetraplus.",
        versions: ['Original']
      },
      betelgeuse_abbygaile: {
        name: "Betelgeuse Abbygaile",
        gender: "Babae",
        date_existed: "Mayo 18, 2022",
        date_version: "0.0.021 Alpha",
        author: "EricLenovo",
        description: "Ang isang piksyunal na asawang babae ni EricLenovo sa Phar Re.",
        versions: ['Original']
      },
      sun_gabbryielle: {
        name: "Sun Gabbryielle",
        gender: "Babae",
        date_existed: "Mayo 18, 2022",
        date_version: "0.0.021 Alpha",
        author: "EricLenovo",
        description: "Ang isang piksyunal na anak na babae nina EricLenovo at Abbygaile sa Phar Re.",
        versions: ['Original']
      },
      pikumon10: {
        name: "Piku",
        gender: "Babae",
        date_existed: "Mayo 18, 2022",
        date_version: "0.0.021 Alpha",
        author: "Pikumon10",
        description: "Isa siyang babaeng manlalakbay ng spring na nakilala dahil sa kaniyang mga lapag-kainan.",
        versions: ['Original']
      },
      forest: {
        name: "Forest",
        gender: "Lalaki",
        date_existed: "Mayo 25, 2022",
        date_version: "0.0.048 Alpha",
        author: "That-Aromantic_Asexual",
        description: "Isang lalaking manlalakbay sa gubat na pinangalanan pagkatapos ng isa sa mga lugar na punong-puno ng mga puno.",
        versions: ['Original']
      },
    },

  } [{
    0: 'eng',
    1: 'fil',
    2: '???'
  } [lang]][name.toLowerCase().replace(' ', '_')]
}