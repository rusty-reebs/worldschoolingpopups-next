// import { createClient } from "@supabase/supabase-js";

// const events = [
//   {
//     location: {
//       country: "Costa Rica",
//       city: "Puerto Viejo de Talamanca",
//       lat: 9.6529616,
//       lon: -82.761823,
//     },
//     date: { eventType: "Fixed Session", start: null, end: null },
//     age: { min: null, max: null },
//     contact: {
//       name: "Las Semillas Creciendo",
//       email: "jardinlasemillas@gmail.com",
//       website: "jardinlassemillas.wixsite.com/",
//       fbPage: "",
//     },
//     _id: "6259e246b4441807fa27f0f5",
//     author: "621e99c1418fbfd280fdd3d1",
//     name: "Las Semillas Creciendo",
//     accomIncluded: false,
//     excursions: [],
//     description:
//       "We create a space of harmony, love, peace and creativity where children, through their own experiences, discover who they are and how to relate to the world around them, in a creative, peaceful and respectful way.\nWe take advantage of the joy and curiosity that children naturally have for learning, to introduce the magical world of letters and numbers in a creative, fun and interesting way. With images and fantasy we begin a journey that sows in them the love and passion for study and the curiosity to find answers to their questions.",
//     images: [
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1650057641/worldschoolingpopups/vpoagrgfkjspvphkqgnh.png",
//         cloudinary_id: "worldschoolingpopups/vpoagrgfkjspvphkqgnh",
//         _id: "6259e246b4441807fa27f0f6",
//       },
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1650057724/worldschoolingpopups/ckjdv0vemiko2rw4riyv.png",
//         cloudinary_id: "worldschoolingpopups/ckjdv0vemiko2rw4riyv",
//         _id: "6259e246b4441807fa27f0f7",
//       },
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1650057790/worldschoolingpopups/zg0az93cua6sh1ktgegg.png",
//         cloudinary_id: "worldschoolingpopups/zg0az93cua6sh1ktgegg",
//         _id: "6259e246b4441807fa27f0f8",
//       },
//     ],
//     __v: 0,
//     dateSubmitted: "2022-05-22T20:47:55.864Z",
//   },
//   {
//     location: { country: "Spain", city: "Malaga", lat: 36.72, lon: -4.422 },
//     date: {
//       eventType: "Fixed Session",
//       start: "2022-03-11T00:00:00.000Z",
//       end: "2022-03-19T00:00:00.000Z",
//     },
//     age: { min: null, max: null },
//     temperature: { high: "19", low: "9" },
//     contact: {
//       name: "Skyler Gilbert",
//       email: "learningbrave@gmail.com",
//       website: "learningbrave.com",
//       fbPage: "",
//     },
//     _id: "621ea21c418fbfd280fdd42b",
//     author: "621e8822e9db09eaf19a4f28",
//     name: "Learning Brave Spain Youth Tour 2022",
//     accomIncluded: true,
//     excursions: [],
//     description:
//       "Our Spring Youth Tour 2022 will be based in the Spanish Port City of Malaga in the Andalusian region of Southern Spain. Malaga is set along the sparkling coastline of the Costa del Sol, it is a port city that epitomizes the Andalusian lifestyle. \nRoman Ruins, Moorish history and architecture, castles, mosques, world class art galleries, gorgeous white sandy beaches, caves, hiking, markets and so much more!",
//     images: [
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1646328079/worldschoolingpopups/kikx1vg63emyvrbw5rf4.jpg",
//         cloudinary_id: "worldschoolingpopups/kikx1vg63emyvrbw5rf4",
//         _id: "621ea21c418fbfd280fdd42c",
//       },
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1646328094/worldschoolingpopups/fzlgfkx15m25i6oxlohi.jpg",
//         cloudinary_id: "worldschoolingpopups/fzlgfkx15m25i6oxlohi",
//         _id: "621ea21c418fbfd280fdd42d",
//       },
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1646328111/worldschoolingpopups/pntucgvngbjmfusgsz7p.jpg",
//         cloudinary_id: "worldschoolingpopups/pntucgvngbjmfusgsz7p",
//         _id: "621ea21c418fbfd280fdd42e",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     location: { country: "Egypt", city: "Luxor", lat: 25.687, lon: 32.64 },
//     date: {
//       eventType: "Fixed Session",
//       start: "2022-05-02T00:00:00.000Z",
//       end: "2022-05-11T00:00:00.000Z",
//     },
//     age: { min: null, max: null },
//     contact: {
//       name: "Luxor Worldschool Learning Hub",
//       email: "",
//       website: "www.luxorworldschoolhub.com/",
//       fbPage: "www.facebook.com/groups/luxorworldschoolhub/?ref=share",
//     },
//     excursions: [],
//     _id: "62127f6bad1befccef2fc974",
//     name: "Luxor Worldschool Learning Hub",
//     accomIncluded: false,
//     description:
//       "Our 4-week workshops explore themes that embody skills that children can carry into their everyday life.\n\nEach session is immersive in nature so children can explore what it means to care for themselves and the community they belong to here in Luxor and in the wider world.\n\n​Our sessions revolve around the core principles of respect for each other, our community members, and the planet as a whole.\n\n​Our education space is at a new site that is 100% outdoor in nature, where children will also be given the opportunity to grow their own food and care for our rescue animals in a 1 day a week workshop led by a local charity staff member.\n\n​Your child's learning hub fee will go towards helping fund Egyptian students to attend the learning hub to create a diverse cultural exchange for both Egyptian and International children who attend.",
//     images: [
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1645379378/worldschoolingpopups/a1qwwpvsve4dxpppoz8c.jpg",
//         cloudinary_id: "worldschoolingpopups/a1qwwpvsve4dxpppoz8c",
//         _id: "62127f6cad1befccef2fc975",
//       },
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1645379398/worldschoolingpopups/uc906svqo6gbuxbc0v27.jpg",
//         cloudinary_id: "worldschoolingpopups/uc906svqo6gbuxbc0v27",
//         _id: "62127f6cad1befccef2fc976",
//       },
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1645379421/worldschoolingpopups/cv0vnv4fckyxls7roprd.jpg",
//         cloudinary_id: "worldschoolingpopups/cv0vnv4fckyxls7roprd",
//         _id: "62127f6cad1befccef2fc977",
//       },
//     ],
//     __v: 0,
//     author: "621e8822e9db09eaf19a4f28",
//     dateSubmitted: "2022-06-30T18:55:51.404Z",
//   },
//   {
//     location: {
//       country: "Guatemala",
//       city: "San Marcos",
//       lat: 14.7245103,
//       lon: -91.2631059,
//     },
//     date: {
//       eventType: "Fixed Session",
//       start: "2022-06-01T00:00:00.000Z",
//       end: "2022-06-30T00:00:00.000Z",
//     },
//     age: { min: 5, max: 12 },
//     contact: {
//       name: "Adriana Pogar",
//       email: "",
//       website: "",
//       fbPage: "www.facebook.com/groups/2731711113803601/",
//     },
//     _id: "6259ddaab4441807fa27f052",
//     author: "621e99c1418fbfd280fdd3d1",
//     name: "Summer Camp on Lake Atitlan",
//     accomIncluded: true,
//     excursions: [],
//     description:
//       "This is a world school pop up summer camp on Lake Atitlan, Guatemala for the month of June. The summer camp is for ages 5-12 and will run Monday - Thursday 9:00-2:00. It is meant to give world schooling/ remote working parents time to work during the day and then have community time in the afternoon/weekends. We will be in community housing in the village of San Marcos and it is gorgeous!",
//     images: [
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1650056606/worldschoolingpopups/cqdcc6a8mhc2jnb6mbyl.jpg",
//         cloudinary_id: "worldschoolingpopups/cqdcc6a8mhc2jnb6mbyl",
//         _id: "6259ddaab4441807fa27f053",
//       },
//     ],
//     __v: 0,
//     dateSubmitted: "2022-05-22T20:47:19.257Z",
//   },
//   {
//     location: {
//       country: "United States",
//       city: "Denver",
//       lat: 39.7645187,
//       lon: -104.9951983,
//     },
//     date: {
//       eventType: "Fixed Session",
//       start: "2022-07-09T00:00:00.000Z",
//       end: "2022-07-16T00:00:00.000Z",
//     },
//     age: { min: null, max: null },
//     contact: {
//       name: "Worldschool Pop-Up Hub",
//       email: "",
//       website: "www.worldschoolpopuphub.com/upcoming-events",
//       fbPage: "",
//     },
//     _id: "62c491f6b28fdd048a73b83f",
//     author: "621e8822e9db09eaf19a4f28",
//     dateSubmitted: "2022-07-05T22:18:19.135Z",
//     name: "Worldschool Pop-Up Hub -- Denver",
//     accomIncluded: false,
//     excursions: [],
//     description:
//       "A week-long gathering for traveling families to explore Denver, Colorado. We plan to visit the Hammond's Candy Factory, Rocky Mountain Arsenal Wildlife Refuge, the Capitol Building, hike at Red Rocks Park and more!",
//     images: [
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1657049456/worldschoolingpopups/wgke9gipeq2gi0g5uskv.png",
//         cloudinary_id: "worldschoolingpopups/wgke9gipeq2gi0g5uskv",
//         _id: "62c491f6b28fdd048a73b840",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     location: {
//       country: "Indonesia",
//       city: "Pejeng, Bali",
//       lat: -8.5174,
//       lon: 115.2916,
//     },
//     date: {
//       eventType: "Fixed Session",
//       start: "2022-07-11T00:00:00.000Z",
//       end: "2022-07-22T00:00:00.000Z",
//     },
//     age: { min: 4, max: 14 },
//     temperature: { high: "29", low: "24" },
//     contact: {
//       name: "Wood School Bali",
//       email: "info@woodschool.com",
//       website: "woodschoolbali.com",
//       fbPage: "",
//     },
//     _id: "621fb0a5f70c920cf454f329",
//     author: "621e8822e9db09eaf19a4f28",
//     name: "Wood School Bali Summer Camp 2022",
//     accomIncluded: false,
//     excursions: [],
//     description:
//       "We will be running programs such as Filmmaking which will include all the kids in their own individual capacities. \nWe plan to incorporate a traditional Indonesian folktale and costumes to bring our short film to life. As always, we will have ongoing yoga, vegan cooking/baking, painting and arts and crafts, including woodworking. The children will be free to swim and play and they will all be provided with our vegan snack and lunch program. We will also introduce them to traditional forms of natural dyeing and batik, so they will be coming home with many special creations. Both weeks will include closing tree planting ceremonies.  The programs will be designed to maximize the experience for the children based on their developmental stages/ages according to the themes. We will integrate Art, Science, Ecology and Joy and Play (and so much more).  \n\nOur hours will be 10-3, Monday- Friday\nJuly 11-15th  and  July 18th-22nd.",
//     images: [
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1646327430/worldschoolingpopups/r4pudnjlqoipjcpbxbib.jpg",
//         cloudinary_id: "worldschoolingpopups/r4pudnjlqoipjcpbxbib",
//         _id: "621fb0a5f70c920cf454f32a",
//       },
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1646327454/worldschoolingpopups/hiisjdhto5lrhu1qkwk6.jpg",
//         cloudinary_id: "worldschoolingpopups/hiisjdhto5lrhu1qkwk6",
//         _id: "621fb0a5f70c920cf454f32b",
//       },
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1646327476/worldschoolingpopups/ts1qe7qvshzacp0cw78z.jpg",
//         cloudinary_id: "worldschoolingpopups/ts1qe7qvshzacp0cw78z",
//         _id: "621fb0a5f70c920cf454f32c",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     location: {
//       country: "Indonesia",
//       city: "Kabupaten Badung, Bali",
//       lat: -8.5668,
//       lon: 115.2136,
//     },
//     date: {
//       eventType: "Fixed Session",
//       start: "2022-07-18T00:00:00.000Z",
//       end: "2022-07-24T00:00:00.000Z",
//     },
//     age: { min: 8, max: 14 },
//     temperature: { high: "29", low: "24" },
//     contact: {
//       name: "Green School Bali",
//       email: "info@greencampbali.com",
//       website: "greenschool.org",
//       fbPage: "",
//     },
//     _id: "621fa9ccf70c920cf454f23b",
//     author: "621e8822e9db09eaf19a4f28",
//     name: "Green Camp Bali",
//     accomIncluded: true,
//     excursions: [],
//     description:
//       "7 days and 6 nights of eco-living and a full itinerary with super fun activities specially designed by green facilitators! See below the most common activities included in our program:\n\nSnorkeling in the Menjagan Island\nHiking in the West Bali National Park\nBBQ dinner & campfire\nMini Permaculture\nNight safari\nPlant-Based Cooking\nTree Planting\nNight reflection and journaling\nCoral Planting\nSDGs – Life Below Water Panel Discussion\nHealthy meals & homemade snacks + free-flow spring water\nActivities to grow green leadership strengths such as problem-solving, collaboration, critical and systematic thinking",
//     images: [
//       {
//         url: '"http://res.cloudinary.com/dnwnw3z4z/image/upload/v1646326387/worldschoolingpopups/geleqfbsrsy27zuwpyyx.jpg"',
//         cloudinary_id: "worldschoolingpopups/geleqfbsrsy27zuwpyyx",
//         _id: "621fa9ccf70c920cf454f23c",
//       },
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1646326402/worldschoolingpopups/quocs59tuvgroilsge7i.jpg",
//         cloudinary_id: "worldschoolingpopups/quocs59tuvgroilsge7i",
//         _id: "621fa9ccf70c920cf454f23d",
//       },
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1646326414/worldschoolingpopups/rkznysv5jfc1kqrfaea8.jpg",
//         cloudinary_id: "worldschoolingpopups/rkznysv5jfc1kqrfaea8",
//         _id: "621fa9ccf70c920cf454f23e",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     location: {
//       country: "United States",
//       city: "Madison",
//       lat: 43.0851588,
//       lon: -89.5408258,
//     },
//     date: {
//       eventType: "Fixed Session",
//       start: "2022-08-13T00:00:00.000Z",
//       end: "2022-08-20T00:00:00.000Z",
//     },
//     age: { min: null, max: null },
//     contact: {
//       name: "Worldschool Pop-Up Hub",
//       email: "",
//       website: "www.worldschoolpopuphub.com/upcoming-events",
//       fbPage: "",
//     },
//     _id: "62c49434b28fdd048a73ba1a",
//     author: "621e8822e9db09eaf19a4f28",
//     dateSubmitted: "2022-07-05T22:18:50.110Z",
//     name: "Worldschool Pop-Up Hub -- Wisconsin",
//     accomIncluded: false,
//     excursions: [],
//     description:
//       "A week-long gathering for traveling families to explore Madison. We plan to visit Henry Vilas zoo, Olbrich Botanical Gardens, Chazen museum of art, the local farmers market and more!",
//     images: [
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1657050018/worldschoolingpopups/ysrr6cvywcu4rxq5liyu.png",
//         cloudinary_id: "worldschoolingpopups/ysrr6cvywcu4rxq5liyu",
//         _id: "62c49434b28fdd048a73ba1b",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     location: {
//       country: "Thailand",
//       city: "Koh Lanta",
//       lat: 7.628,
//       lon: 98.98,
//     },
//     date: {
//       eventType: "Fixed Session",
//       start: "2022-08-14T00:00:00.000Z",
//       end: "2022-08-20T00:00:00.000Z",
//     },
//     age: { min: 8, max: 16 },
//     contact: {
//       name: "The International School of Asia",
//       email: "",
//       website: "www.gvslanta.com/",
//       fbPage:
//         "www.facebook.com/The-International-School-of-Asia-Koh-Lanta-104764755344378/",
//     },
//     _id: "62686d458ff9c780724789f5",
//     author: "621e99c1418fbfd280fdd3d1",
//     name: "The International School of Asia",
//     accomIncluded: true,
//     excursions: [],
//     description:
//       'A week to live as a Global Citizen!\nThe students see not only their classroom but also the world.\n\nAt this summer camp, our students who participated in the project of "Update Koh Lanta" will work to solve the problems for the reconstruction of Koh Lanta, whose economy was hit by the COVID-19.\n\nThe "Academic English Program", encourages students\' communication with the local people. And our business professionals will support each group to plan "the update of Koh Lanta".\n\nA week at GVS spring camp is to learn in the real world, and to become a Global Citizen.',
//     images: [
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1651010400/worldschoolingpopups/twyq3udnevnn51spq3s4.jpg",
//         cloudinary_id: "worldschoolingpopups/twyq3udnevnn51spq3s4",
//         _id: "62686d458ff9c780724789f6",
//       },
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1651010425/worldschoolingpopups/bcvmywbl9oatgsabhxvt.jpg",
//         cloudinary_id: "worldschoolingpopups/bcvmywbl9oatgsabhxvt",
//         _id: "62686d458ff9c780724789f7",
//       },
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1651010444/worldschoolingpopups/lskdu0htt0uvtbjfipj1.jpg",
//         cloudinary_id: "worldschoolingpopups/lskdu0htt0uvtbjfipj1",
//         _id: "62686d458ff9c780724789f8",
//       },
//     ],
//     __v: 0,
//     dateSubmitted: "2022-05-22T20:46:41.770Z",
//   },
//   {
//     location: {
//       country: "Germany",
//       city: "Freiburg",
//       lat: 53.8354295,
//       lon: 9.2176123,
//     },
//     date: {
//       eventType: "Fixed Session",
//       start: "2022-08-24T00:00:00.000Z",
//       end: "2022-08-31T00:00:00.000Z",
//     },
//     age: { min: null, max: null },
//     contact: {
//       name: "Worldschool Pop-Up Hub",
//       email: "",
//       website: "www.worldschoolpopuphub.com/upcoming-events",
//       fbPage: "",
//     },
//     _id: "62c494fab28fdd048a73babc",
//     author: "621e8822e9db09eaf19a4f28",
//     dateSubmitted: "2022-07-05T22:19:28.836Z",
//     name: "Worldschool Pop-Up Hub -- Germany",
//     accomIncluded: false,
//     excursions: [],
//     description:
//       "A week-long gathering for traveling families to explore Freiburg im Breisgau, Germany, and take advantage of the 9-Euro-Ticket which covers a month of all local train and bus transport within Germany.",
//     images: [
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1657050346/worldschoolingpopups/jxzbpnjd8ggqofnjjnwt.png",
//         cloudinary_id: "worldschoolingpopups/jxzbpnjd8ggqofnjjnwt",
//         _id: "62c494fab28fdd048a73babd",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     location: {
//       country: "United States",
//       city: "Chicago",
//       lat: 41.8782201,
//       lon: -87.6998388,
//     },
//     date: {
//       eventType: "Fixed Session",
//       start: "2022-09-03T00:00:00.000Z",
//       end: "2022-09-10T00:00:00.000Z",
//     },
//     age: { min: null, max: null },
//     contact: {
//       name: "Worldschool Pop-Up Hub",
//       email: "",
//       website: "www.worldschoolpopuphub.com/upcoming-events",
//       fbPage: "",
//     },
//     _id: "62c49617b28fdd048a73bbfe",
//     author: "621e8822e9db09eaf19a4f28",
//     dateSubmitted: "2022-07-05T22:20:11.692Z",
//     name: "Worldschool Pop-Up Hub  -- Chicago",
//     accomIncluded: false,
//     excursions: [],
//     description:
//       "A week-long gathering for traveling families to explore the Windy City. We've see fireworks at Navy Pier, Millennium Park, Lincoln Park Zoo, the Riverwalk & Lakefront Trails, Chicago's Jazz Festival, Cultural Center, & Botanic Garden... nature, history, festivals, culture... so much to explore!",
//     images: [
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1657050568/worldschoolingpopups/nypo9cjpueplcgac5lcx.png",
//         cloudinary_id: "worldschoolingpopups/nypo9cjpueplcgac5lcx",
//         _id: "62c49617b28fdd048a73bbff",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     location: { country: "Mexico", city: "Izamal", lat: 20.93, lon: -89.0227 },
//     date: {
//       eventType: "Fixed Session",
//       start: "2022-09-12T00:00:00.000Z",
//       end: "2022-10-12T00:00:00.000Z",
//     },
//     age: { min: 6, max: 12 },
//     temperature: { high: "", low: "" },
//     contact: {
//       name: "Stacey Moellay",
//       email: "",
//       website: "",
//       fbPage: "www.facebook.com/groups/1116534152496094",
//     },
//     _id: "6254803bccbef75dc6d0fd7c",
//     author: "621e8822e9db09eaf19a4f28",
//     name: "Wa'Akun World School Hub",
//     accomIncluded: true,
//     excursions: [],
//     description:
//       "Hub activities Monday and Tuesday 10am-4pm.\nWednesday is excursion day! We will plan our day trips on these days. Expect 10am-5pm.\nThe prices below will include your accommodation for 30 days, kitchen access, hub activities, Wednesday excursions, Spanish lessons, and much much more.\nThese are just some of the themes that families can enjoy at Wa’Akun:\nGlobal Citizenship \nLay of the Land: Cenotes, pyramids, and more\nLa Comida Maya: Experiencing local food and make some too!\nBuilding Together\nLet’s Play ball: Experience the ancient Maya ball game\nThe Maya today \nSpanish lessons: Beginner and Intermediate \nMayan language \nIn addition there will be opportunities to experience the many, many activities available in Merida and surrounding areas as well!\nWe plan to offer experiences that engage families and children of all ages.",
//     images: [
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1649704894/worldschoolingpopups/zi3eqmvhqefqvyp1xvr9.jpg",
//         cloudinary_id: "worldschoolingpopups/zi3eqmvhqefqvyp1xvr9",
//         _id: "6254803bccbef75dc6d0fd7d",
//       },
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1649704921/worldschoolingpopups/cn2upgnuqsiuk12bub8x.jpg",
//         cloudinary_id: "worldschoolingpopups/cn2upgnuqsiuk12bub8x",
//         _id: "6254803bccbef75dc6d0fd7e",
//       },
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1649704939/worldschoolingpopups/rqfyhytgun7toii3a9mm.jpg",
//         cloudinary_id: "worldschoolingpopups/rqfyhytgun7toii3a9mm",
//         _id: "6254803bccbef75dc6d0fd7f",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     location: {
//       country: "United States",
//       city: "New York",
//       lat: 40.6976701,
//       lon: -74.2598764,
//     },
//     date: {
//       eventType: "Fixed Session",
//       start: "2022-09-24T00:00:00.000Z",
//       end: "2022-10-01T00:00:00.000Z",
//     },
//     age: { min: null, max: null },
//     contact: {
//       name: "Worldschool Pop-Up Hub",
//       email: "",
//       website: "www.worldschoolpopuphub.com/upcoming-events",
//       fbPage: "",
//     },
//     _id: "62c4972bb28fdd048a73bf22",
//     author: "621e8822e9db09eaf19a4f28",
//     dateSubmitted: "2022-07-05T22:20:45.468Z",
//     name: "Worldschool Pop-Up Hub -- New York",
//     accomIncluded: false,
//     excursions: [],
//     description:
//       "A week-long gathering for traveling families to explore NYC - we can't hit it all in a week but our highlights include: Central Park, Grand Central Station, street food, FAO Schwarz and Harry Potter New York, ferry ride to Staten Island, plus museums and bridges and monuments...",
//     images: [
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1657050911/worldschoolingpopups/apl1drkt8ngtigovv9xc.png",
//         cloudinary_id: "worldschoolingpopups/apl1drkt8ngtigovv9xc",
//         _id: "62c4972bb28fdd048a73bf23",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     location: {
//       country: "Ecuador",
//       city: "Quito",
//       lat: -0.1862504,
//       lon: -78.5706272,
//     },
//     date: {
//       eventType: "Fixed Session",
//       start: "2022-10-01T00:00:00.000Z",
//       end: "2022-10-08T00:00:00.000Z",
//     },
//     age: { min: null, max: null },
//     contact: {
//       name: "Worldschool Pop-Up Hub",
//       email: "director@worldschoolpopuphub.com",
//       website: "www.worldschoolpopuphub.com",
//       fbPage: "",
//     },
//     _id: "62d99b72c454e867a630bc45",
//     author: "621e8822e9db09eaf19a4f28",
//     dateSubmitted: "2022-07-21T18:31:14.317Z",
//     name: "Worldschool Pop-Up Hub--Ecuador",
//     accomIncluded: false,
//     excursions: [],
//     description:
//       "Come join us in the Quito, Ecuador, for a fun-filled and community-centered worldschooling gathering Oct 1 - 8, 2022.\n\nOur pop-ups provide a super casual, budget-friendly opportunity to gather, connect with other worldschoolers, share your insights, instill new friendships, learn about the local area, and immerse in a friendly, accepting mobile community.\n\nWe've cherry-picked the best low- or no-cost activities that highlight local nature, arts, history, food, and culture... but you'll also have plenty of time to relax, get to know each other, and even stray from the itinerary to add activities that cater to the group's interests (we provide plenty of supplemental ideas to tailor your experience).\n\nPop in for a few days or the full week. Join as many activities as you'd like. It's up to you! We would love to have you come and simply Hang Out with like-minded families while we dive in and explore the local offerings.\n\nOur itinerary will include activities such as the following:\n\n*Mercado Artesanal La Mariscal\n\n*Museo Interactivo de Ciencia\n\n*Zoológico de Quito\n\n*Centro Historico Quito\n\n*Parque La Carolina with its vintage airplane and botanical gardens\n\n*Stroll La Ronda, a pedestrian street with unique restaurants, stores, and experiences (don't forget to taste the chocolate or learn to spin a hand-carved top)\n\n*Climb the spires of Basilica del Voto Nacional and look for animal gargoyles\n\n*Explore Plaza Grande & Plaza de San Francisco (and the shops in the old catacombs below the church)\n\n*Admire the jaw-dropping, gold-gilded, oldest church in Quito: Iglesia de la Compañía de Jesús\n\n*Search for alpacas in Parque Metropolitano Guangüiltagua\n\nAdd-on options include a day trip to Mitad del Mundo (the center of the world where the equator line runs through Ecuador), ride the TeleferiQo (teleferio + Quito) cable car up Pinchincha Mountain, stop to learn about local art at Casa del Alabado Museum of Pre-Colombian Art, a visit to El Panecillo -- the 135-foot-tall winged Virgin Mary statue guarding the city of Quito, enjoy the views at the all-glass Yaku Water Museum with life-sized \"Snakes & Ladders\" game, and more!",
//     images: [
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1658428269/worldschoolingpopups/ps7myysdajygubytvw5d.jpg",
//         cloudinary_id: "worldschoolingpopups/ps7myysdajygubytvw5d",
//         _id: "62d99b72c454e867a630bc46",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     location: {
//       country: "Iceland",
//       city: "Akureyri",
//       lat: 65.6693514,
//       lon: -18.2754786,
//     },
//     date: {
//       eventType: "Fixed Session",
//       start: "2022-10-05T00:00:00.000Z",
//       end: "2022-10-14T00:00:00.000Z",
//     },
//     age: { min: null, max: null },
//     contact: {
//       name: "Worldschool Pop-Up Hub",
//       email: "",
//       website: "www.worldschoolpopuphub.com/upcoming-events",
//       fbPage: "",
//     },
//     _id: "62c49895b28fdd048a73c068",
//     author: "621e8822e9db09eaf19a4f28",
//     dateSubmitted: "2022-07-05T22:21:17.369Z",
//     name: "Worldschool Pop-Up Hub -- Iceland",
//     accomIncluded: false,
//     excursions: [],
//     description:
//       "Join us for a tour of Iceland -- expect to rent a car and stay in three separate areas: Akureyri (North), Borderyri (West), and Hella (South). Waterfalls, hot springs, thermal areas, geysers, amazing scenery, Lava Centre, and more!",
//     images: [
//       {
//         url: "http://res.cloudinary.com/dnwnw3z4z/image/upload/v1657051250/worldschoolingpopups/qyycjwlmlfcnenixedo8.png",
//         cloudinary_id: "worldschoolingpopups/qyycjwlmlfcnenixedo8",
//         _id: "62c49895b28fdd048a73c069",
//       },
//     ],
//     __v: 0,
//   },
// ];

// const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
// );

// const transform = events.map((event) => {
//   return {
//     name: event.name,
//     country: event.location.country,
//     images: event.images,
//     state: event.location.state,
//     city: event.location.city,
//     lat: event.location.lat,
//     lon: event.location.lon,
//     eventType: event.date.eventType,
//     start: event.date.start,
//     end: event.date.end,
//     min: event.age.min,
//     max: event.age.max,
//     description: event.description,
//     email: event.contact.email,
//     website: event.contact.website,
//     fbPage: event.contact.fbPage,
//   };
// });

// export async function addData() {
//   await supabaseAdmin.from("testEvents").insert(transform);
// }
