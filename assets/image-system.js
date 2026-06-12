/**
 * Voyage-Ed Travels — Centralized Image System v2.0
 * ===================================================
 * Provides verified Unsplash CDN images for every destination.
 * Self-executing: runs on DOMContentLoaded, fixes hero/gallery/card images,
 * adds lazy loading, fallbacks, and SEO alt text across all page types.
 *
 * HOW TO ADD A NEW DESTINATION:
 * 1. Add entry to VE_IMAGES below with hero, gallery[], cards[], and alts[].
 * 2. Add slug mapping in VE_SLUG_MAP if folder name differs from key.
 * 3. No other changes needed — system auto-detects from URL.
 */

;(function () {
  'use strict';

  /* =========================================================
   * CENTRALIZED DESTINATION IMAGE REGISTRY
   * All Unsplash direct-CDN URLs — no API key required.
   * hero    : main hero background (1600px wide)
   * gallery : 8 curated gallery images (800px wide)
   * cards   : 4-7 card images used in package listing pages (900px wide)
   * alts    : SEO alt text matching each gallery image
   * cardAlts: SEO alt text for card images
   * ======================================================= */

  var VE_IMAGES = {

    /* ───── DOMESTIC ───── */

    kashmir: {
      hero: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80',
        'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80',
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
        'https://images.unsplash.com/photo-1601423543803-b2e6a6c574c1?w=800&q=80',
        'https://images.unsplash.com/photo-1604131442100-22f0e3e98b1b?w=800&q=80',
        'https://images.unsplash.com/photo-1573096102255-3db25a73d8e0?w=800&q=80',
        'https://images.unsplash.com/photo-1609766418204-94aae0ecfb20?w=800&q=80',
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=900&q=85',
        'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=900&q=85',
        'https://images.unsplash.com/photo-1601423543803-b2e6a6c574c1?w=900&q=85',
        'https://images.unsplash.com/photo-1604131442100-22f0e3e98b1b?w=900&q=85'
      ],
      alts: [
        'Dal Lake Srinagar shikara rides Kashmir',
        'Pahalgam valley Kashmir scenic landscape',
        'Gulmarg snow mountains Kashmir skiing',
        'Dal Lake houseboat stay Kashmir luxury',
        'Sonmarg glacier Kashmir adventure trip',
        'Kashmir valley tulip garden spring',
        'Mughal Gardens Srinagar Kashmir heritage',
        'Kashmir mountain trek Himalayan views'
      ],
      cardAlts: ['Kashmir houseboat Dal Lake package', 'Gulmarg ski resort Kashmir snow', 'Pahalgam valley Kashmir tour', 'Srinagar Mughal Garden Kashmir holiday']
    },

    ladakh: {
      hero: 'https://images.unsplash.com/photo-1626176329831-4cf8ccb8bc45?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1626176329831-4cf8ccb8bc45?w=800&q=80',
        'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80',
        'https://images.unsplash.com/photo-1589308454676-21178b783dc1?w=800&q=80',
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        'https://images.unsplash.com/photo-1554807838-b1c5f7bc17af?w=800&q=80',
        'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
        'https://images.unsplash.com/photo-1569061358754-26a9e0c27e07?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1626176329831-4cf8ccb8bc45?w=900&q=85',
        'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=900&q=85',
        'https://images.unsplash.com/photo-1589308454676-21178b783dc1?w=900&q=85',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85'
      ],
      alts: [
        'Pangong Lake turquoise water Ladakh India',
        'Leh palace monastery Ladakh Himalayan landscape',
        'Nubra Valley sand dunes camel safari Ladakh',
        'Himalayan mountain road Ladakh adventure',
        'High altitude lake Tso Moriri Ladakh',
        'Thiksey Monastery Ladakh Buddhist heritage',
        'Stok Kangri peak Ladakh trekking adventure',
        'Zanskar river gorge Ladakh scenic view'
      ],
      cardAlts: ['Pangong Lake Ladakh luxury package', 'Nubra Valley Ladakh double hump camels', 'Leh monastery Ladakh adventure tour', 'Himalayan passes Ladakh bike trip']
    },

    rajasthan: {
      hero: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
        'https://images.unsplash.com/photo-1599661046827-dacde63e9860?w=800&q=80',
        'https://images.unsplash.com/photo-1580977251946-44e4d3038e5c?w=800&q=80',
        'https://images.unsplash.com/photo-1515874894571-56e8e13c9b85?w=800&q=80',
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
        'https://images.unsplash.com/photo-1585136017836-ae0012b74b00?w=800&q=80',
        'https://images.unsplash.com/photo-1519817650390-64a9db7b0e42?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=900&q=85',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=85',
        'https://images.unsplash.com/photo-1599661046827-dacde63e9860?w=900&q=85',
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=85'
      ],
      alts: [
        'Amber Fort Jaipur Rajasthan heritage palace India',
        'Jaisalmer golden fort desert Rajasthan',
        'Thar Desert camel safari Rajasthan golden dunes',
        'Udaipur City Palace Lake Pichola Rajasthan',
        'Mehrangarh Fort Jodhpur blue city Rajasthan',
        'Lake Palace Udaipur luxury heritage hotel',
        'Holi festival colours Rajasthan India celebration',
        'Pushkar camel fair Rajasthan traditional culture'
      ],
      cardAlts: ['Amber Fort Jaipur Rajasthan royal heritage', 'Jaisalmer desert safari Rajasthan camel ride', 'Udaipur lake palace luxury Rajasthan', 'Blue city Jodhpur Mehrangarh fort tour']
    },

    himachal: {
      hero: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
        'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=800&q=80',
        'https://images.unsplash.com/photo-1572213426852-0e4ed8f69e0f?w=800&q=80',
        'https://images.unsplash.com/photo-1603574670812-d24560880210?w=800&q=80',
        'https://images.unsplash.com/photo-1522010850603-1d7b4f17a71a?w=800&q=80',
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80',
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
        'https://images.unsplash.com/photo-1584555684040-bad3cf11db7b?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&q=85',
        'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=900&q=85',
        'https://images.unsplash.com/photo-1572213426852-0e4ed8f69e0f?w=900&q=85',
        'https://images.unsplash.com/photo-1603574670812-d24560880210?w=900&q=85'
      ],
      alts: [
        'Manali snow mountains Himachal Pradesh India',
        'Shimla Mall Road colonial heritage Himachal',
        'Rohtang Pass snow Himachal Pradesh adventure',
        'Solang Valley skiing Manali Himachal Pradesh',
        'Dharamshala McLeod Ganj Himachal Pradesh',
        'Spiti Valley monasteries Himachal Pradesh',
        'Kullu Valley Himachal Pradesh scenic river',
        'Apple orchards Himachal Pradesh mountains'
      ],
      cardAlts: ['Manali snow mountains Himachal Pradesh tour', 'Shimla colonial architecture Himachal holiday', 'Rohtang Pass snow adventure Himachal', 'Spiti Valley monastery Himachal Pradesh']
    },

    goa: {
      hero: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
        'https://images.unsplash.com/photo-1583294955284-3a9a56b1d427?w=800&q=80',
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
        'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=800&q=80',
        'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80',
        'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
        'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&q=80',
        'https://images.unsplash.com/photo-1548687845-8049e7b3c6e4?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=85',
        'https://images.unsplash.com/photo-1583294955284-3a9a56b1d427?w=900&q=85',
        'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=900&q=85',
        'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=900&q=85'
      ],
      alts: [
        'Goa beach sunset palm trees tropical holiday',
        'Baga beach Goa water sports adventure',
        'Goa nightlife beach shacks party atmosphere',
        'Portuguese heritage church Old Goa heritage',
        'Goa luxury beach resort pool holiday',
        'Calangute beach Goa family holiday India',
        'Goa dolphin cruise boat tour sea',
        'Anjuna flea market Goa culture experience'
      ],
      cardAlts: ['Goa beach sunset luxury holiday', 'Goa water sports adventure beach', 'Old Goa heritage church tour', 'Goa nightlife beach shack party']
    },

    kerala: {
      hero: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
        'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80',
        'https://images.unsplash.com/photo-1590001155093-a3c66f9f85b4?w=800&q=80',
        'https://images.unsplash.com/photo-1607604760190-ec34f8c35cd9?w=800&q=80',
        'https://images.unsplash.com/photo-1552250575-e508473b090f?w=800&q=80',
        'https://images.unsplash.com/photo-1588001400947-6385aef4ab0e?w=800&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&q=85',
        'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=900&q=85',
        'https://images.unsplash.com/photo-1590001155093-a3c66f9f85b4?w=900&q=85',
        'https://images.unsplash.com/photo-1607604760190-ec34f8c35cd9?w=900&q=85'
      ],
      alts: [
        'Kerala backwaters houseboat Alleppey Alappuzha',
        'Munnar tea plantation Kerala green hills',
        'Kerala houseboat cruise sunset backwaters',
        'Kovalam beach Kerala tropical resort',
        'Thekkady wildlife sanctuary Kerala jungle',
        'Kathakali dance performance Kerala culture',
        'Varkala beach cliff Kerala scenic sea',
        'Kerala Ayurveda massage wellness retreat'
      ],
      cardAlts: ['Kerala houseboat backwaters Alleppey', 'Munnar tea gardens Kerala honeymoon', 'Kovalam beach Kerala tropical holiday', 'Thekkady wildlife safari Kerala']
    },

    'tamil-nadu': {
      hero: 'https://images.unsplash.com/photo-1621318104153-4a25bf9e7e43?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1621318104153-4a25bf9e7e43?w=800&q=80',
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
        'https://images.unsplash.com/photo-1597277478408-8df2e6a9a3ce?w=800&q=80',
        'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=80',
        'https://images.unsplash.com/photo-1573074617613-fc8ef27e6a2b?w=800&q=80',
        'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=800&q=80',
        'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
        'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1621318104153-4a25bf9e7e43?w=900&q=85',
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&q=85',
        'https://images.unsplash.com/photo-1597277478408-8df2e6a9a3ce?w=900&q=85',
        'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&q=85'
      ],
      alts: [
        'Meenakshi Temple Madurai Tamil Nadu South India',
        'Brihadeeswara Temple Thanjavur Tamil Nadu heritage',
        'Ooty hill station Nilgiris Tamil Nadu',
        'Marina Beach Chennai Tamil Nadu coastal',
        'Rameshwaram temple Tamil Nadu pilgrimage',
        'Kodaikanal hill station Tamil Nadu nature',
        'Chettinad heritage mansion Tamil Nadu culture',
        'Kanyakumari sunrise ocean Tamil Nadu southernmost'
      ],
      cardAlts: ['Meenakshi Temple Madurai Tamil Nadu tour', 'Ooty hill station Tamil Nadu holiday', 'Marina Beach Chennai Tamil Nadu trip', 'Thanjavur Brihadeeswara temple Tamil Nadu']
    },

    'arunachal-meghalaya': {
      hero: 'https://images.unsplash.com/photo-1606134459088-89b3e2ff3af9?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1606134459088-89b3e2ff3af9?w=800&q=80',
        'https://images.unsplash.com/photo-1571606428253-b7bda8a64a1a?w=800&q=80',
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
        'https://images.unsplash.com/photo-1608501078713-8e445a709b39?w=800&q=80',
        'https://images.unsplash.com/photo-1559541561-e5d5be91b01c?w=800&q=80',
        'https://images.unsplash.com/photo-1580974852861-ac7bd6e0d9c9?w=800&q=80',
        'https://images.unsplash.com/photo-1545408173-9de9f4dbe074?w=800&q=80',
        'https://images.unsplash.com/photo-1593011951104-f30e76c2c4cd?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1606134459088-89b3e2ff3af9?w=900&q=85',
        'https://images.unsplash.com/photo-1571606428253-b7bda8a64a1a?w=900&q=85',
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&q=85',
        'https://images.unsplash.com/photo-1608501078713-8e445a709b39?w=900&q=85'
      ],
      alts: [
        'Meghalaya living root bridge Cherrapunji',
        'Nohkalikai Falls Meghalaya tallest waterfall India',
        'Tawang Monastery Arunachal Pradesh Buddhist temple',
        'Arunachal Pradesh mountain valleys northeast India',
        'Dawki river crystal clear Meghalaya boat ride',
        'Mawsmai cave Cherrapunji Meghalaya limestone',
        'Ziro Valley Arunachal Pradesh paddy fields',
        'Mawlynnong cleanest village Meghalaya India'
      ],
      cardAlts: ['Meghalaya living root bridge nature tour', 'Cherrapunji waterfalls Meghalaya northeast India', 'Tawang Monastery Arunachal Pradesh trip', 'Arunachal mountain valleys northeast holiday']
    },

    uttarakhand: {
      hero: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80',
        'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&q=80',
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
        'https://images.unsplash.com/photo-1554307801-85e42cb17abd?w=800&q=80',
        'https://images.unsplash.com/photo-1598003159734-96cc0cf80a3f?w=800&q=80',
        'https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85',
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&q=85',
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=85',
        'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=900&q=85'
      ],
      alts: [
        'Kedarnath temple Uttarakhand Himalayas pilgrimage',
        'Nainital lake hill station Uttarakhand India',
        'Rishikesh rafting Ganga river adventure',
        'Valley of Flowers Uttarakhand alpine meadow',
        'Badrinath temple Uttarakhand Char Dham pilgrimage',
        'Mussoorie hill station Uttarakhand viewpoint',
        'Jim Corbett National Park Uttarakhand tiger safari',
        'Auli ski resort Uttarakhand snow mountains'
      ],
      cardAlts: ['Kedarnath pilgrimage Uttarakhand tour', 'Rishikesh adventure sports Uttarakhand', 'Nainital lake hill station Uttarakhand', 'Valley of Flowers Uttarakhand trekking']
    },

    /* ───── INTERNATIONAL — ASIA ───── */

    bali: {
      hero: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
        'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=80',
        'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
        'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
        'https://images.unsplash.com/photo-1542897644-e04428948020?w=800&q=80',
        'https://images.unsplash.com/photo-1604542030089-f00f7989d68c?w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85',
        'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=900&q=85',
        'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&q=85',
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=85'
      ],
      alts: [
        'Bali rice terraces Ubud tropical landscape',
        'Tanah Lot temple Bali ocean sunset',
        'Kuta beach Bali surfing waves tropical',
        'Nusa Penida Kelingking Beach Bali cliff view',
        'Bali monkey forest Ubud temple',
        'Seminyak beach resort Bali luxury pool',
        'Bali waterfall hidden jungle green nature',
        'Tegallalang rice terrace Ubud Bali drone aerial'
      ],
      cardAlts: ['Bali Ubud rice terraces luxury tour', 'Kuta beach surfing Bali holiday package', 'Nusa Penida Bali cliff beach adventure', 'Tanah Lot temple Bali honeymoon package']
    },

    thailand: {
      hero: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80',
        'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80',
        'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
        'https://images.unsplash.com/photo-1539651236012-1d05a05f4c7f?w=800&q=80',
        'https://images.unsplash.com/photo-1547558902-c0e053ece5ec?w=800&q=80',
        'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1528181304800-259b08848526?w=900&q=85',
        'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=900&q=85',
        'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=900&q=85',
        'https://images.unsplash.com/photo-1539651236012-1d05a05f4c7f?w=900&q=85'
      ],
      alts: [
        'Bangkok Grand Palace temple gold Thailand',
        'Phuket beach Phi Phi Islands Thailand tropical',
        'Krabi emerald beach Thailand Railay',
        'Chiang Mai temples Thailand elephant sanctuary',
        'Floating market Bangkok Thailand culture',
        'Pattaya sea Thailand beach holiday',
        'Koh Samui luxury beach resort Thailand pool',
        'Phi Phi Islands turquoise water aerial Thailand'
      ],
      cardAlts: ['Bangkok Grand Palace Thailand tour package', 'Phuket beach resort Thailand holiday', 'Phi Phi Islands Krabi Thailand adventure', 'Koh Samui luxury resort Thailand honeymoon']
    },

    maldives: {
      hero: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
        'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80',
        'https://images.unsplash.com/photo-1591389703635-e15a07b842d7?w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800&q=80',
        'https://images.unsplash.com/photo-1505881402582-c5bc11054f91?w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=85',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=85',
        'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=900&q=85',
        'https://images.unsplash.com/photo-1591389703635-e15a07b842d7?w=900&q=85'
      ],
      alts: [
        'Maldives overwater villa turquoise ocean luxury',
        'Maldives aerial view coral reef blue ocean',
        'Maldives beach sunset honeymoon couple',
        'Maldives water villa infinity pool luxury resort',
        'Maldives snorkeling coral reef marine life',
        'Maldives seaplane arrival island paradise',
        'North Malé Atoll Maldives crystal water bungalow',
        'Maldives underwater restaurant dining experience'
      ],
      cardAlts: ['Maldives overwater villa luxury honeymoon', 'Maldives coral reef snorkeling package', 'Maldives all-inclusive resort holiday', 'Maldives premium water villa experience']
    },

    dubai: {
      hero: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
        'https://images.unsplash.com/photo-1546412414-e1885e51cfa5?w=800&q=80',
        'https://images.unsplash.com/photo-1606164481168-ab6a05c2b5a6?w=800&q=80',
        'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&q=80',
        'https://images.unsplash.com/photo-1547435275-0fe80f7de0d7?w=800&q=80',
        'https://images.unsplash.com/photo-1555448248-2571daf6344b?w=800&q=80',
        'https://images.unsplash.com/photo-1583416750470-bcdca58e4c8c?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=85',
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=85',
        'https://images.unsplash.com/photo-1546412414-e1885e51cfa5?w=900&q=85',
        'https://images.unsplash.com/photo-1606164481168-ab6a05c2b5a6?w=900&q=85'
      ],
      alts: [
        'Dubai skyline Burj Khalifa night view luxury',
        'Burj Khalifa tallest tower Dubai UAE',
        'Dubai desert safari dune bashing sunset',
        'Palm Jumeirah Dubai aerial view luxury',
        'Dubai Mall shopping luxury retail experience',
        'Atlantis The Palm Dubai resort pool',
        'Dubai Gold Souk traditional market culture',
        'Abu Dhabi Sheikh Zayed Grand Mosque luxury'
      ],
      cardAlts: ['Dubai Burj Khalifa city tour package', 'Dubai desert safari golden dunes experience', 'Palm Jumeirah Dubai luxury resort holiday', 'Atlantis Dubai family theme park package']
    },

    singapore: {
      hero: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
        'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80',
        'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80',
        'https://images.unsplash.com/photo-1568625369778-2b5e0be4aef9?w=800&q=80',
        'https://images.unsplash.com/photo-1578255818693-d91b6cb33820?w=800&q=80',
        'https://images.unsplash.com/photo-1537253888960-51dd200f6e0c?w=800&q=80',
        'https://images.unsplash.com/photo-1470723572809-df5e61ab9c52?w=800&q=80',
        'https://images.unsplash.com/photo-1589307404025-64eed5e29d59?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=900&q=85',
        'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=900&q=85',
        'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=900&q=85',
        'https://images.unsplash.com/photo-1578255818693-d91b6cb33820?w=900&q=85'
      ],
      alts: [
        'Marina Bay Sands Singapore skyline night reflection',
        'Singapore Gardens by the Bay supertrees light show',
        'Sentosa Island Singapore beach resort luxury',
        'Singapore cable car view Harbourfront',
        'Singapore Little India colorful cultural quarter',
        'Orchard Road Singapore shopping luxury retail',
        'Universal Studios Singapore theme park ride',
        'Jurong Bird Park Singapore wildlife attraction'
      ],
      cardAlts: ['Marina Bay Sands Singapore luxury tour', 'Gardens by the Bay Singapore family trip', 'Sentosa Island Singapore beach holiday', 'Singapore Universal Studios theme park']
    },

    vietnam: {
      hero: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
        'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80',
        'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80',
        'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80',
        'https://images.unsplash.com/photo-1512291313931-d4291048e7b6?w=800&q=80',
        'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80',
        'https://images.unsplash.com/photo-1557554559-8862360ac0e6?w=800&q=80',
        'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=85',
        'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=900&q=85',
        'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=900&q=85',
        'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=900&q=85'
      ],
      alts: [
        'Ha Long Bay emerald water karst limestone Vietnam',
        'Hoi An ancient town lanterns Vietnam heritage',
        'Phu Quoc beach tropical turquoise Vietnam island',
        'Hue Imperial Citadel Vietnam royal heritage',
        'Hanoi Old Quarter street food Vietnam culture',
        'Sapa rice terraces Vietnam mountain tribe',
        'Ho Chi Minh City Ben Thanh Market Vietnam',
        'Mekong Delta boat ride Vietnam countryside'
      ],
      cardAlts: ['Ha Long Bay cruise Vietnam luxury tour', 'Hoi An ancient town Vietnam heritage trip', 'Phu Quoc beach resort Vietnam island holiday', 'Sapa trekking rice terraces Vietnam adventure']
    },

    /* ───── INTERNATIONAL — AFRICA & MIDDLE EAST ───── */

    egypt: {
      hero: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80',
        'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&q=80',
        'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80',
        'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=800&q=80',
        'https://images.unsplash.com/photo-1574020999-0bb1efb37b4d?w=800&q=80',
        'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
        'https://images.unsplash.com/photo-1591711084705-f4e8e97e8e5e?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=85',
        'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=900&q=85',
        'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=900&q=85',
        'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=900&q=85'
      ],
      alts: [
        'Pyramids of Giza Egypt ancient wonder aerial view',
        'Great Sphinx of Giza Egypt pharaoh stone monument',
        'Nile River cruise Egypt Luxor temples sunset',
        'Abu Simbel Temple Egypt Ramesses ancient pharaoh',
        'Valley of the Kings Luxor Egypt hieroglyphics tomb',
        'Cairo Khan el-Khalili bazaar Egypt culture market',
        'Karnak Temple complex Luxor Egypt ancient ruins',
        'Egyptian Museum Cairo Tutankhamun artifacts gold'
      ],
      cardAlts: ['Pyramids of Egypt Giza aerial tour package', 'Nile River cruise Egypt Luxor temples', 'Abu Simbel temple Egypt ancient wonder tour', 'Valley of Kings Luxor Egypt heritage trip']
    },

    'victoria-falls': {
      hero: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
        'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
        'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80',
        'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
        'https://images.unsplash.com/photo-1474314243412-cd4a79f02c6a?w=800&q=80',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900&q=85',
        'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=900&q=85',
        'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=900&q=85',
        'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=85'
      ],
      alts: [
        'Victoria Falls aerial drone view Mosi-oa-Tunya waterfall',
        'Victoria Falls safari Zimbabwe Africa wildlife sunset',
        'Devil\'s Pool Victoria Falls swimming adventure',
        'Victoria Falls bridge Zambia Zimbabwe border',
        'African safari elephant herd Victoria Falls region',
        'Victoria Falls helicopter ride aerial view sunset',
        'Zambezi River sunset cruise Victoria Falls',
        'Bungee jumping Victoria Falls bridge adventure'
      ],
      cardAlts: ['Victoria Falls aerial waterfall tour package', 'African safari Zimbabwe Victoria Falls holiday', 'Devil\'s Pool swim Victoria Falls adventure', 'Victoria Falls luxury lodge African bush stay']
    },

    kenya: {
      hero: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
        'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=800&q=80',
        'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80',
        'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
        'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80',
        'https://images.unsplash.com/photo-1474314243412-cd4a79f02c6a?w=800&q=80',
        'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=85',
        'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=900&q=85',
        'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=900&q=85',
        'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=900&q=85'
      ],
      alts: [
        'Kenya Masai Mara safari lion cheetah wildlife',
        'Amboseli National Park elephant Mount Kilimanjaro Kenya',
        'Masai tribe Kenya traditional culture warrior',
        'Kenya hot air balloon safari sunrise savannah',
        'Nairobi city skyline Kenya modern Africa',
        'Diani Beach Kenya white sand tropical coast',
        'Lake Nakuru flamingo pink Kenya Rift Valley',
        'Samburu National Reserve Kenya desert wildlife'
      ],
      cardAlts: ['Kenya Masai Mara safari luxury tour package', 'Amboseli elephant Kilimanjaro Kenya holiday', 'Kenya hot air balloon safari adventure', 'Masai Mara wildebeest migration Kenya']
    },

    /* ───── INTERNATIONAL — EUROPE ───── */

    'sri-lanka': {
      hero: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
        'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80',
        'https://images.unsplash.com/photo-1621607939668-38eb35c13e46?w=800&q=80',
        'https://images.unsplash.com/photo-1583416750470-bcdca58e4c8c?w=800&q=80',
        'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80',
        'https://images.unsplash.com/photo-1580974852861-ac7bd6e0d9c9?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=900&q=85',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
        'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=900&q=85',
        'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=900&q=85'
      ],
      alts: [
        'Sigiriya Lion Rock fortress Sri Lanka ancient citadel',
        'Sri Lanka tea plantation Nuwara Eliya green hills',
        'Mirissa beach whale watching Sri Lanka tropical',
        'Dambulla cave temple Sri Lanka Buddhist heritage',
        'Sri Lanka train ride Ella Kandy misty mountains',
        'Galle Fort colonial heritage Sri Lanka Dutch architecture',
        'Yala National Park leopard wildlife Sri Lanka safari',
        'Temple of Tooth Relic Kandy Sri Lanka Buddhist'
      ],
      cardAlts: ['Sigiriya rock fortress Sri Lanka heritage tour', 'Sri Lanka tea plantation train ride holiday', 'Mirissa beach Sri Lanka whale watching tour', 'Galle Fort colonial Sri Lanka heritage package']
    },

    georgia: {
      hero: 'https://images.unsplash.com/photo-1626776877737-d5ff85d6d44b?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1626776877737-d5ff85d6d44b?w=800&q=80',
        'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?w=800&q=80',
        'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80',
        'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&q=80',
        'https://images.unsplash.com/photo-1569060368097-06e6c3f01374?w=800&q=80',
        'https://images.unsplash.com/photo-1596401767018-8aad43a11cbb?w=800&q=80',
        'https://images.unsplash.com/photo-1563874257547-d49eed28d2c9?w=800&q=80',
        'https://images.unsplash.com/photo-1607604760190-ec34f8c35cd9?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1626776877737-d5ff85d6d44b?w=900&q=85',
        'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?w=900&q=85',
        'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=900&q=85',
        'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=900&q=85'
      ],
      alts: [
        'Tbilisi old town Narikala fortress Georgia Europe',
        'Kazbegi mountains Gergeti Trinity Church Georgia',
        'Batumi Black Sea coast Georgia modern city',
        'Georgia Caucasus mountain valleys scenic landscape',
        'Tbilisi balconies colorful old town Georgia architecture',
        'Georgia wine cellar Kakheti wine region tour',
        'Mtskheta ancient capital church Georgia UNESCO heritage',
        'Vardzia cave monastery Georgia cliff rock-cut'
      ],
      cardAlts: ['Tbilisi old town Georgia Europe tour package', 'Kazbegi Gergeti Church Georgia mountain tour', 'Georgia wine country Kakheti vineyard holiday', 'Caucasus mountains Georgia scenic adventure']
    },

    armenia: {
      hero: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
        'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80',
        'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&q=80',
        'https://images.unsplash.com/photo-1601900013651-c55c69f3f073?w=800&q=80',
        'https://images.unsplash.com/photo-1601810583574-67a7b5eb8b95?w=800&q=80',
        'https://images.unsplash.com/photo-1474645750408-a5329dc4c1c1?w=800&q=80',
        'https://images.unsplash.com/photo-1541917143-1f1d0c6f5e0f?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=900&q=85',
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=85',
        'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=900&q=85',
        'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=900&q=85'
      ],
      alts: [
        'Yerevan Republic Square Armenia cascade complex',
        'Garni pagan temple Armenia ancient historical site',
        'Geghard monastery Armenia UNESCO mountain heritage',
        'Lake Sevan Armenia turquoise highland lake',
        'Mount Ararat Armenia biblical snow peak',
        'Khor Virap monastery Armenia Ararat view',
        'Noravank monastery Armenia canyon red rock',
        'Tatev monastery Armenia Wings of Tatev cable car'
      ],
      cardAlts: ['Yerevan Armenia city tour package', 'Geghard monastery Armenia heritage trip', 'Lake Sevan Armenia highland landscape tour', 'Garni temple Armenia ancient culture tour']
    },

    azerbaijan: {
      hero: 'https://images.unsplash.com/photo-1601059625985-6da10d56ec22?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1601059625985-6da10d56ec22?w=800&q=80',
        'https://images.unsplash.com/photo-1593011951104-f30e76c2c4cd?w=800&q=80',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca0d31?w=800&q=80',
        'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80',
        'https://images.unsplash.com/photo-1618997260620-da85fcc5e929?w=800&q=80',
        'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=80',
        'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80',
        'https://images.unsplash.com/photo-1596405176028-d3a47d54a339?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1601059625985-6da10d56ec22?w=900&q=85',
        'https://images.unsplash.com/photo-1593011951104-f30e76c2c4cd?w=900&q=85',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca0d31?w=900&q=85',
        'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=900&q=85'
      ],
      alts: [
        'Baku Flame Towers night view Azerbaijan capital skyline',
        'Baku Old City Icheri Sheher Azerbaijan UNESCO heritage',
        'Azerbaijan Caspian Sea Baku seafront boulevard',
        'Heydar Aliyev Centre Baku modern architecture Azerbaijan',
        'Gobustan National Park mud volcanoes Azerbaijan',
        'Sheki Khan Palace silk road Azerbaijan heritage',
        'Azerbaijan Naftalan mud bath mineral health spa',
        'Baku Crystal Hall arena Azerbaijan modern landmark'
      ],
      cardAlts: ['Baku Flame Towers Azerbaijan night city tour', 'Baku old city Azerbaijan UNESCO heritage trip', 'Azerbaijan Caspian Sea Baku tour package', 'Heydar Aliyev Centre Baku modern architecture tour']
    },

    kazakhstan: {
      hero: 'https://images.unsplash.com/photo-1474401941244-3a13d3107b51?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1474401941244-3a13d3107b51?w=800&q=80',
        'https://images.unsplash.com/photo-1596397360628-7b27e25c5cbf?w=800&q=80',
        'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&q=80',
        'https://images.unsplash.com/photo-1507666405895-422eee7d517f?w=800&q=80',
        'https://images.unsplash.com/photo-1583416750470-bcdca58e4c8c?w=800&q=80',
        'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1474401941244-3a13d3107b51?w=900&q=85',
        'https://images.unsplash.com/photo-1596397360628-7b27e25c5cbf?w=900&q=85',
        'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=900&q=85',
        'https://images.unsplash.com/photo-1507666405895-422eee7d517f?w=900&q=85'
      ],
      alts: [
        'Almaty city Kazakhstan modern financial centre',
        'Big Almaty Lake Kazakhstan mountain reflection turquoise',
        'Charyn Canyon Kazakhstan river gorge red rock',
        'Nursultan Astana Kazakhstan futuristic architecture',
        'Kazakhstan steppe grassland nomadic culture yurt',
        'Kolsai Lakes Kazakhstan emerald mountain lake',
        'Kazakhstan Shymbulak ski resort Almaty mountain',
        'Medeu outdoor ice skating rink Almaty Kazakhstan'
      ],
      cardAlts: ['Almaty mountains Kazakhstan nature tour', 'Big Almaty Lake Kazakhstan mountain tour package', 'Charyn Canyon Kazakhstan adventure trip', 'Astana Kazakhstan modern city tour']
    },

    /* ───── CANADA / AUSTRALIA / OCEANIA ───── */

    'rocky-mountaineer': {
      hero: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        'https://images.unsplash.com/photo-1531321293222-7e6cdd9b75bb?w=800&q=80',
        'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80',
        'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&q=80',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=800&q=80',
        'https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85',
        'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=900&q=85',
        'https://images.unsplash.com/photo-1531321293222-7e6cdd9b75bb?w=900&q=85'
      ],
      alts: [
        'Canadian Rockies Banff National Park snow mountains reflection',
        'Rocky Mountaineer luxury glass dome train Canada',
        'Lake Louise Banff blue turquoise water Canadian Rockies',
        'Jasper National Park elk wildlife Canadian Rockies',
        'Rocky Mountains snow peaks Canada panoramic',
        'Vancouver city skyline mountains Canada',
        'Canadian Rockies Icefields Parkway glacier scenic drive',
        'Victoria BC Butchart Gardens Canada floral luxury'
      ],
      cardAlts: ['Rocky Mountaineer glass dome train Canada luxury tour', 'Banff National Park Canada Rockies tour package', 'Lake Louise Canadian Rockies luxury holiday', 'Jasper National Park Canada wildlife tour']
    },

    'eastern-canada': {
      hero: 'https://images.unsplash.com/photo-1548679847-1d4ff48016c9?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1548679847-1d4ff48016c9?w=800&q=80',
        'https://images.unsplash.com/photo-1569161031678-f49d0e38e2be?w=800&q=80',
        'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&q=80',
        'https://images.unsplash.com/photo-1561518776-e76a5e48f731?w=800&q=80',
        'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
        'https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?w=800&q=80',
        'https://images.unsplash.com/photo-1504233529578-6d46baba6d34?w=800&q=80',
        'https://images.unsplash.com/photo-1626776877737-d5ff85d6d44b?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1548679847-1d4ff48016c9?w=900&q=85',
        'https://images.unsplash.com/photo-1569161031678-f49d0e38e2be?w=900&q=85',
        'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=900&q=85',
        'https://images.unsplash.com/photo-1561518776-e76a5e48f731?w=900&q=85'
      ],
      alts: [
        'Toronto CN Tower skyline Canada city',
        'Niagara Falls aerial Canada USA border waterfall',
        'Montreal Old Port Quebec Canada French heritage',
        'Ottawa Parliament Hill Canada capital autumn',
        'Quebec City Old Town Canada winter snow',
        'Prince Edward Island Canada coastline red cliffs',
        'Nova Scotia Peggy\'s Cove lighthouse Canada scenic',
        'Toronto Distillery District Canada urban culture'
      ],
      cardAlts: ['Toronto Niagara Falls Eastern Canada tour', 'Montreal Quebec City Canada heritage tour package', 'Ottawa Parliament Hill Canada capital tour', 'Eastern Canada autumn foliage luxury holiday']
    },

    'western-canada': {
      hero: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
        'https://images.unsplash.com/photo-1505832268823-414c63a48fb4?w=800&q=80',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80',
        'https://images.unsplash.com/photo-1531321293222-7e6cdd9b75bb?w=800&q=80',
        'https://images.unsplash.com/photo-1507666405895-422eee7d517f?w=800&q=80',
        'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=800&q=80',
        'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85',
        'https://images.unsplash.com/photo-1505832268823-414c63a48fb4?w=900&q=85',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85',
        'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=85'
      ],
      alts: [
        'Banff National Park Canada Rockies turquoise lake',
        'Vancouver city skyline mountains ocean Canada',
        'Whistler mountain ski resort British Columbia Canada',
        'Kelowna Okanagan wine valley British Columbia Canada',
        'Canadian Rockies icefields parkway glaciers scenic',
        'Victoria BC flower garden harbour Canada',
        'Tofino Pacific Rim beach British Columbia Canada surf',
        'Calgary Stampede rodeo Alberta Canada culture'
      ],
      cardAlts: ['Banff National Park Western Canada luxury tour', 'Vancouver British Columbia Canada city tour', 'Whistler ski resort Canada winter holiday', 'Canadian Rockies icefields parkway scenic drive']
    },

    'autumn-fall': {
      hero: 'https://images.unsplash.com/photo-1504233529578-6d46baba6d34?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1504233529578-6d46baba6d34?w=800&q=80',
        'https://images.unsplash.com/photo-1548679847-1d4ff48016c9?w=800&q=80',
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
        'https://images.unsplash.com/photo-1530538987395-032d1800fdd4?w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        'https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&q=80',
        'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&q=80',
        'https://images.unsplash.com/photo-1626776877737-d5ff85d6d44b?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1504233529578-6d46baba6d34?w=900&q=85',
        'https://images.unsplash.com/photo-1548679847-1d4ff48016c9?w=900&q=85',
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=900&q=85',
        'https://images.unsplash.com/photo-1530538987395-032d1800fdd4?w=900&q=85'
      ],
      alts: [
        'Canada autumn fall foliage maple red orange leaves',
        'Niagara Falls autumn fall colours Canada tour',
        'Quebec City autumn fall colours Canada cobblestone',
        'Ontario autumn lake reflection Canada fall colours',
        'Canadian Rockies autumn fall Banff golden larches',
        'Montreal autumn fall colours park promenade Canada',
        'Cape Breton autumn fall Nova Scotia Canada scenic',
        'Algonquin Park autumn fall Ontario Canada canoe'
      ],
      cardAlts: ['Canada autumn fall colours luxury tour package', 'Quebec autumn fall foliage Canada heritage tour', 'Niagara Falls Canada autumn colours holiday', 'Banff autumn golden larches Canadian Rockies']
    },

    'australia-great-barrier-reef': {
      hero: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80',
        'https://images.unsplash.com/photo-1559828583-c93b69cf94c4?w=800&q=80',
        'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80',
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
        'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80',
        'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
        'https://images.unsplash.com/photo-1570135460654-e4010cf71600?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=900&q=85',
        'https://images.unsplash.com/photo-1559828583-c93b69cf94c4?w=900&q=85',
        'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=900&q=85',
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=85'
      ],
      alts: [
        'Great Barrier Reef aerial coral reef turquoise Australia',
        'Great Barrier Reef scuba diving coral fish Australia',
        'Whitsunday Islands aerial turquoise Australia Queensland',
        'Great Barrier Reef snorkeling underwater coral paradise',
        'Cairns Queensland Australia Great Barrier Reef boat',
        'Heart Reef aerial drone Great Barrier Reef romantic',
        'Great Barrier Reef turtle swimming underwater Queensland',
        'Australia Queensland coral reef fish tropical underwater'
      ],
      cardAlts: ['Great Barrier Reef aerial coral tour Australia', 'Whitsundays turquoise beach Australia luxury holiday', 'Great Barrier Reef scuba diving Australia package', 'Queensland coral reef snorkeling Australia tour']
    },

    /* ───── DOMESTIC (EXTENDED) ───── */

    'andaman-nicobar': {
      hero: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
        'https://images.unsplash.com/photo-1534710961216-75c88202f43e?w=800&q=80',
        'https://images.unsplash.com/photo-1583212292454-1d6a5b13cca1?w=800&q=80',
        'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
        'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&q=80',
        'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=85',
        'https://images.unsplash.com/photo-1534710961216-75c88202f43e?w=900&q=85',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85',
        'https://images.unsplash.com/photo-1583212292454-1d6a5b13cca1?w=900&q=85'
      ],
      alts: [
        'Radhanagar Beach Havelock Island Andaman crystal water',
        'Neil Island Andaman turquoise beach sunset',
        'Andaman coral reef scuba diving underwater',
        'Ross Island Andaman heritage colonial ruins',
        'Andaman Islands tropical beach palm trees paradise',
        'Baratang Island mangrove Andaman boat trip',
        'Cellular Jail Port Blair Andaman memorial',
        'Andaman sea kayaking tropical adventure'
      ],
      cardAlts: ['Radhanagar Beach Andaman luxury resort package', 'Neil Island Andaman scuba diving holiday', 'Andaman tropical beach family tour package', 'Havelock Island Andaman honeymoon package']
    },

    'delhi-agra-varanasi': {
      hero: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
        'https://images.unsplash.com/photo-1561361513-2d8efce48e9e?w=800&q=80',
        'https://images.unsplash.com/photo-1601199960840-dae1c4b7fd52?w=800&q=80',
        'https://images.unsplash.com/photo-1532264523420-881a47db012d?w=800&q=80',
        'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80',
        'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
        'https://images.unsplash.com/photo-1554931670-4ebfabf46e9a?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&q=85',
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900&q=85',
        'https://images.unsplash.com/photo-1561361513-2d8efce48e9e?w=900&q=85',
        'https://images.unsplash.com/photo-1601199960840-dae1c4b7fd52?w=900&q=85'
      ],
      alts: [
        'Taj Mahal Agra marble mausoleum sunrise golden hour',
        'Red Fort Delhi Mughal heritage monument India',
        'Varanasi Ghats Ganga Aarti evening ceremony',
        'Agra Fort UNESCO heritage India Mughal architecture',
        'Varanasi narrow lanes ancient city India',
        'India Gate Delhi national war memorial',
        'Fatehpur Sikri Agra Mughal ghost city heritage',
        'Varanasi boat ride Ganges river sunrise India'
      ],
      cardAlts: ['Taj Mahal Agra India Golden Triangle tour', 'Red Fort Delhi heritage sightseeing package', 'Varanasi Ghats spiritual India tour', 'Golden Triangle Delhi Agra Varanasi package']
    },

    'sikkim-darjeeling': {
      hero: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
        'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80',
        'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
        'https://images.unsplash.com/photo-1496947850313-7743325fa58c?w=800&q=80',
        'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        'https://images.unsplash.com/photo-1569291104715-fe5b68da8105?w=800&q=80',
        'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=85',
        'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=85',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85',
        'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=900&q=85'
      ],
      alts: [
        'Darjeeling toy train UNESCO heritage mountain railway',
        'Kangchenjunga third highest peak Sikkim Himalaya view',
        'Darjeeling tea garden terraces sunrise mist',
        'Rumtek Monastery Sikkim Buddhist heritage',
        'Darjeeling Mall Road Tiger Hill sunrise',
        'Nathula Pass Sikkim China border high altitude',
        'Teesta River Sikkim valley rafting adventure',
        'Sikkim Pelling mountain snow peak panorama'
      ],
      cardAlts: ['Darjeeling toy train tea garden package', 'Sikkim Kangchenjunga mountain view tour', 'Darjeeling Sikkim hill station holiday', 'Northeast India Sikkim adventure package']
    },

    'gujarat': {
      hero: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
        'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
        'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800&q=80',
        'https://images.unsplash.com/photo-1536625737227-92a4e7d68251?w=800&q=80',
        'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80',
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
        'https://images.unsplash.com/photo-1562183241-840b8af0721e?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
        'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=900&q=85',
        'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=900&q=85',
        'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=900&q=85'
      ],
      alts: [
        'Rann of Kutch white salt desert full moon festival Gujarat',
        'Rani ki Vav Patan stepwell UNESCO heritage Gujarat',
        'Gir National Park Asiatic Lion Gujarat wildlife safari',
        'Somnath Temple coastal Gujarat Saurashtra pilgrimage',
        'Dwarka ancient temple Gujarat pilgrimage heritage',
        'Saputara hill station Gujarat monsoon mist',
        'Sabarmati Ashram Ahmedabad Gandhi heritage Gujarat',
        'Kutch handicraft mirror work artisan Gujarat'
      ],
      cardAlts: ['Rann of Kutch white desert Gujarat festival package', 'Gir Lion safari Gujarat wildlife holiday', 'Gujarat heritage temple circuit tour', 'Kutch handicraft culture Gujarat tour package']
    },

    'karnataka': {
      hero: 'https://images.unsplash.com/photo-1565030606948-e5d7ee4d17f6?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1565030606948-e5d7ee4d17f6?w=800&q=80',
        'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&q=80',
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
        'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80',
        'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&q=80',
        'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
        'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80',
        'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1565030606948-e5d7ee4d17f6?w=900&q=85',
        'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=900&q=85',
        'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=900&q=85',
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&q=85'
      ],
      alts: [
        'Hampi Vijayanagara ruins UNESCO heritage Karnataka boulders',
        'Mysore Palace illuminated Dasara festival Karnataka',
        'Coorg coffee plantation misty Western Ghats Karnataka',
        'Jog Falls highest waterfall Karnataka monsoon cascade',
        'Chikmagalur coffee hills Karnataka misty morning',
        'Badami cave temples rock-cut architecture Karnataka',
        'Kabini forest elephant herd Karnataka wildlife',
        'Bandipur Tiger Reserve Karnataka wildlife safari'
      ],
      cardAlts: ['Hampi heritage ruins Karnataka tour package', 'Mysore Palace Karnataka luxury holiday', 'Coorg coffee plantation stay Karnataka package', 'Karnataka wildlife safari Bandipur holiday']
    },

    'madhya-pradesh': {
      hero: 'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=800&q=80',
        'https://images.unsplash.com/photo-1571126770897-2d612d1f7b89?w=800&q=80',
        'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&q=80',
        'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&q=80',
        'https://images.unsplash.com/photo-1519020508149-b5e9de26f99b?w=800&q=80',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80',
        'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&q=80',
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=900&q=85',
        'https://images.unsplash.com/photo-1571126770897-2d612d1f7b89?w=900&q=85',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=900&q=85',
        'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=900&q=85'
      ],
      alts: [
        'Bengal Tiger Bandhavgarh National Park Madhya Pradesh wildlife',
        'Khajuraho temples UNESCO heritage medieval sculpture MP',
        'Marble Rocks Bhedaghat Jabalpur Narmada river gorge',
        'Sanchi Stupa Buddhist pilgrimage UNESCO heritage MP',
        'Kanha National Park tiger reserve wildlife jeep safari',
        'Orchha temples Betwa river Madhya Pradesh heritage',
        'Maheshwar fort Narmada riverside ghats MP',
        'Pachmarhi hill station waterfalls Madhya Pradesh'
      ],
      cardAlts: ['Bandhavgarh tiger safari Madhya Pradesh wildlife tour', 'Khajuraho temple heritage tour MP package', 'Marble Rocks Jabalpur MP tour package', 'Kanha tiger reserve wildlife safari holiday']
    },

    /* ───── INTERNATIONAL (EXTENDED) ───── */

    'australia-gold-coast': {
      hero: 'https://images.unsplash.com/photo-1524397057410-1e775ed476f3?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1524397057410-1e775ed476f3?w=800&q=80',
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
        'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        'https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=800&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
        'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1524397057410-1e775ed476f3?w=900&q=85',
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=900&q=85',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85',
        'https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=900&q=85'
      ],
      alts: [
        'Gold Coast Surfers Paradise skyline beach Australia',
        'Gold Coast beach waves surfing Australia sunny day',
        'Sea World theme park Gold Coast Australia family fun',
        'Gold Coast hinterland rainforest O Reilly Green Mountains',
        'Gold Coast skyline aerial night lights Australia',
        'Coolangatta beach Gold Coast Queensland surf paradise',
        'Gold Coast luxury resort pool beach Australia holiday',
        'Dreamworld theme park Gold Coast Australia adventure'
      ],
      cardAlts: ['Gold Coast Surfers Paradise Australia holiday package', 'Gold Coast theme parks family tour Australia', 'Gold Coast beach luxury resort package', 'Queensland Gold Coast adventure holiday']
    },

    'australia-sydney-melbourne': {
      hero: 'https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=800&q=80',
        'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80',
        'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=800&q=80',
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
        'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?w=800&q=80',
        'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80',
        'https://images.unsplash.com/photo-1524397057410-1e775ed476f3?w=800&q=80',
        'https://images.unsplash.com/photo-1572301552476-e6e4bf1c4219?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=900&q=85',
        'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=900&q=85',
        'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=900&q=85',
        'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?w=900&q=85'
      ],
      alts: [
        'Sydney Opera House iconic landmark Australia harbour',
        'Sydney Harbour Bridge panoramic aerial view Australia',
        'Melbourne Federation Square arts precinct Australia',
        'Great Ocean Road Twelve Apostles Victoria Australia',
        'Sydney Bondi Beach iconic surf beach Australia',
        'Melbourne CBD trams city streets Australia',
        'Blue Mountains NSW Australia eucalyptus valley view',
        'Sydney skyline night lights harbour view Australia'
      ],
      cardAlts: ['Sydney Opera House Australia holiday package', 'Melbourne Great Ocean Road tour Australia', 'Sydney Harbour luxury tour Australia package', 'Sydney Melbourne dual city Australia holiday']
    },

    'australia-luxury-self-drive': {
      hero: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        'https://images.unsplash.com/photo-1523428096881-5bd79d043006?w=800&q=80',
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
        'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80',
        'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800&q=80',
        'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?w=800&q=80',
        'https://images.unsplash.com/photo-1524397057410-1e775ed476f3?w=800&q=80',
        'https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=85',
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=900&q=85',
        'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?w=900&q=85',
        'https://images.unsplash.com/photo-1524397057410-1e775ed476f3?w=900&q=85'
      ],
      alts: [
        'Australia luxury self-drive road trip coastal highway',
        'Sydney Opera House Australia luxury tour start point',
        'Great Ocean Road self-drive Victoria Australia coastal',
        'Uluru Ayers Rock outback Australia self-drive journey',
        'Australia wine country luxury cellar door self-drive',
        'Melbourne laneways culture food self-drive city stop',
        'Gold Coast beach self-drive Australia luxury holiday',
        'Kangaroo Island wildlife self-drive South Australia'
      ],
      cardAlts: ['Australia luxury self-drive holiday package', 'Great Ocean Road self-drive tour Australia', 'Outback Australia road trip luxury package', 'Sydney to Melbourne self-drive holiday Australia']
    },

    'france-switzerland-italy': {
      hero: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
        'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80',
        'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
        'https://images.unsplash.com/photo-1499856871958-5b9357f14f60?w=800&q=80',
        'https://images.unsplash.com/photo-1533856493584-0c6ca8ca9ce3?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=900&q=85',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85',
        'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&q=85',
        'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=900&q=85'
      ],
      alts: [
        'Eiffel Tower Paris France romantic evening golden hour',
        'Swiss Alps Jungfrau snow peaks Switzerland luxury tour',
        'Colosseum Rome Italy ancient architecture heritage',
        'Interlaken Switzerland adventure paragliding mountains',
        'Venice canals gondola Italy romantic holiday',
        'Zurich lake old town Switzerland luxury travel',
        'Paris Seine river Notre Dame France travel package',
        'Amalfi Coast Italy cliffside luxury holiday'
      ],
      cardAlts: ['Paris Eiffel Tower France holiday package', 'Swiss Alps Jungfrau Switzerland luxury tour', 'Rome Colosseum Italy heritage package', 'France Switzerland Italy grand tour package']
    },

    'germany-austria-hungary': {
      hero: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=80',
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
        'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
        'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
        'https://images.unsplash.com/photo-1533856493584-0c6ca8ca9ce3?w=800&q=80',
        'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800&q=80',
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
        'https://images.unsplash.com/photo-1519923834699-ef0b7cde4712?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=900&q=85',
        'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=900&q=85',
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=900&q=85',
        'https://images.unsplash.com/photo-1533856493584-0c6ca8ca9ce3?w=900&q=85'
      ],
      alts: [
        'Budapest Parliament Hungary Danube River night lights',
        'Neuschwanstein Castle Bavaria Germany fairy-tale palace',
        'Vienna Schoenbrunn Palace Austria imperial heritage',
        'Prague Charles Bridge Bohemia Czech Republic heritage',
        'Budapest Szechenyi thermal bath Hungary luxury',
        'Vienna Opera House classical music Austria',
        'Berlin Brandenburg Gate Germany history landmark',
        'Hallstatt Alpine village Austria lakeside picturesque'
      ],
      cardAlts: ['Budapest Parliament Hungary luxury tour package', 'Neuschwanstein Castle Germany fairy-tale package', 'Vienna Austria imperial heritage holiday', 'Germany Austria Hungary European tour package']
    },

    'greece': {
      hero: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
        'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80',
        'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80',
        'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80',
        'https://images.unsplash.com/photo-1519923834699-ef0b7cde4712?w=800&q=80',
        'https://images.unsplash.com/photo-1548625149-720754c2ebb9?w=800&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=85',
        'https://images.unsplash.com/photo-1555993539-1732b0258235?w=900&q=85',
        'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900&q=85',
        'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900&q=85'
      ],
      alts: [
        'Santorini blue dome church white cliffs Oia Greece sunset',
        'Santorini caldera view Greece luxury honeymoon',
        'Mykonos windmill white village Greece island holiday',
        'Acropolis Athens Parthenon UNESCO Greece ancient ruins',
        'Santorini Fira cliff-side village Greece evening lights',
        'Crete Elafonisi beach pink sand Greece paradise',
        'Greek island hopping Aegean Sea sailing luxury',
        'Athens city view Lycabettus Hill Greece capital'
      ],
      cardAlts: ['Santorini Greece luxury honeymoon package', 'Athens Acropolis Greece heritage tour', 'Greek islands Mykonos holiday package', 'Greece Santorini Mykonos tour package']
    },

    'japan-korea': {
      hero: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80',
        'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80',
        'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
        'https://images.unsplash.com/photo-1543832923-44667a44c804?w=800&q=80',
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
        'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80',
        'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=900&q=85',
        'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=900&q=85',
        'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=85',
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=85'
      ],
      alts: [
        'Mount Fuji cherry blossom Japan iconic spring view',
        'Kyoto Arashiyama bamboo grove Japan serene path',
        'Fushimi Inari torii gates Kyoto Japan red shrine',
        'Tokyo skyline Shibuya crossing Japan modern city',
        'Seoul Gyeongbokgung Palace South Korea traditional',
        'Jeju Island South Korea volcanic landscape',
        'Osaka Dotonbori neon lights Japan food street',
        'Nami Island South Korea birch tree path autumn'
      ],
      cardAlts: ['Mount Fuji Japan cherry blossom tour package', 'Kyoto temples Japan cultural holiday', 'Tokyo Japan modern city holiday package', 'Japan Korea dual country tour package']
    },

    'mauritius': {
      hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
        'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=800&q=80',
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
        'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&q=80',
        'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=85',
        'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=900&q=85',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=85'
      ],
      alts: [
        'Mauritius turquoise lagoon tropical beach luxury resort',
        'Mauritius Le Morne Brabant mountain beach horseback',
        'Mauritius catamaran sailing blue lagoon Indian Ocean',
        'Mauritius underwater waterfall effect illusion aerial',
        'Mauritius luxury beachfront resort infinity pool',
        'Ile aux Cerfs island Mauritius beach picnic excursion',
        'Mauritius Grand Bassin sacred lake Shivratri pilgrimage',
        'Chamarel Seven Colored Earths Mauritius nature wonder'
      ],
      cardAlts: ['Mauritius luxury beach resort honeymoon package', 'Mauritius Le Morne mountain beach holiday', 'Mauritius catamaran island tour package', 'Mauritius Indian Ocean island luxury holiday']
    },

    'norway-finland': {
      hero: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        'https://images.unsplash.com/photo-1484447330491-de89c23be34a?w=800&q=80',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
        'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=800&q=80',
        'https://images.unsplash.com/photo-1517650862521-d580d5348145?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&q=85',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
        'https://images.unsplash.com/photo-1484447330491-de89c23be34a?w=900&q=85',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=85'
      ],
      alts: [
        'Northern Lights Aurora Borealis Norway Finland winter sky',
        'Norwegian Fjords Geirangerfjord dramatic cliffs Norway',
        'Lofoten Islands Norway fishing village red cabins',
        'Finland Rovaniemi Lapland reindeer snow winter holiday',
        'Norway Trolltunga rock cliff hike scenic views',
        'Flam Railway scenic mountain train Norway fjord',
        'Helsinki Finland Cathedral Senate Square winter',
        'Arctic Circle Finland husky sledding snow adventure'
      ],
      cardAlts: ['Northern Lights Norway Finland winter package', 'Norwegian Fjords cruise tour luxury package', 'Lofoten Islands Norway adventure holiday', 'Finland Lapland Aurora reindeer safari package']
    },

    'nz-north-south': {
      hero: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80',
        'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
        'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80',
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80',
        'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=900&q=85',
        'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=900&q=85',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=85',
        'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=900&q=85'
      ],
      alts: [
        'Milford Sound Fjordland New Zealand majestic fjord cruise',
        'Hobbiton Shire movie set Matamata New Zealand tour',
        'Queenstown New Zealand adventure sports bungee jumping',
        'Auckland Sky Tower city view New Zealand harbour',
        'Aoraki Mount Cook New Zealand highest peak glaciers',
        'Rotorua geothermal New Zealand Maori cultural village',
        'Abel Tasman National Park New Zealand golden beach kayak',
        'Lake Tekapo blue water lupins New Zealand scenic'
      ],
      cardAlts: ['Milford Sound New Zealand luxury cruise package', 'Hobbiton Lord of the Rings New Zealand tour', 'Queenstown adventure New Zealand holiday', 'New Zealand North South Island grand tour']
    },

    'nz-queenstown': {
      hero: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80',
        'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
        'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80',
        'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
        'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=85',
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&q=85',
        'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=900&q=85',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85'
      ],
      alts: [
        'Queenstown New Zealand adventure capital bungee jump',
        'Lake Wakatipu Queenstown Remarkables mountains NZ',
        'Milford Sound cruise from Queenstown New Zealand luxury',
        'Wanaka New Zealand lone tree lake reflection iconic',
        'Queenstown gondola Skyline restaurant NZ panoramic',
        'Fiordland National Park helicopter Queenstown NZ',
        'Arrowtown historic gold mining village Queenstown NZ',
        'Cardrona ski field winter Queenstown New Zealand'
      ],
      cardAlts: ['Queenstown adventure holiday New Zealand package', 'Lake Wakatipu Queenstown luxury NZ tour', 'Milford Sound day trip Queenstown New Zealand', 'Queenstown New Zealand adventure sports package']
    },

    'nz-luxury-nature': {
      hero: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
        'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
        'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80',
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80',
        'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
        'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85',
        'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=900&q=85',
        'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=900&q=85',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=85'
      ],
      alts: [
        'New Zealand luxury lodge wilderness nature immersion',
        'Milford Sound Fiordland NZ luxury cruise wilderness',
        'Queenstown NZ luxury adventure exclusive private tour',
        'Auckland luxury harbor New Zealand fine dining cruise',
        'Lake Pukaki turquoise Aoraki Mount Cook NZ luxury',
        'Abel Tasman water taxi NZ luxury eco-lodge nature',
        'Rotorua Hobbiton luxury private tour New Zealand',
        'Wanaka iconic tree reflection New Zealand nature luxury'
      ],
      cardAlts: ['New Zealand luxury nature lodge package', 'Milford Sound luxury cruise New Zealand holiday', 'Queenstown luxury private tour New Zealand', 'New Zealand premium luxury wilderness tour']
    },

    'nz-self-drive': {
      hero: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80',
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80',
        'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80',
        'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=85',
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&q=85',
        'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=900&q=85',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85'
      ],
      alts: [
        'New Zealand self-drive road trip stunning coastal highway',
        'Lake Wanaka NZ self-drive mountain reflection iconic',
        'Coromandel Peninsula NZ self-drive coastal beauty',
        'Wanaka tree New Zealand self-drive road trip stop',
        'Queenstown region NZ self-drive adventure landscape',
        'Canterbury Plains NZ self-drive rural scenic route',
        'South Island NZ self-drive glaciers Franz Josef',
        'Northland NZ self-drive Cape Reinga lighthouse trip'
      ],
      cardAlts: ['New Zealand self-drive holiday campervan package', 'NZ South Island self-drive scenic road trip', 'New Zealand rental car road trip holiday', 'NZ North to South self-drive tour package']
    },

    'orlando': {
      hero: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
        'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800&q=80',
        'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&q=80',
        'https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800&q=80',
        'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
        'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        'https://images.unsplash.com/photo-1519920880815-5b73f77a4f5d?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=900&q=85',
        'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=900&q=85',
        'https://images.unsplash.com/photo-1468413253725-0d5181091126?w=900&q=85',
        'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=900&q=85'
      ],
      alts: [
        'Orlando Florida theme park Walt Disney World family fun',
        'Universal Studios Orlando Florida family holiday USA',
        'Kennedy Space Center Orlando Florida launch pad',
        'Orlando Florida LEGOLAND theme park family tour',
        'SeaWorld Orlando Florida marine life show',
        'International Drive Orlando Florida entertainment',
        'Miami Beach Florida USA tropical holiday',
        'Everglades National Park airboat Florida USA nature'
      ],
      cardAlts: ['Orlando Disney World USA family holiday package', 'Universal Studios Orlando Florida theme park tour', 'Orlando Florida family theme park holiday', 'USA Orlando family vacation package']
    },

    'prague-budapest-poland': {
      hero: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80',
        'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
        'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
        'https://images.unsplash.com/photo-1533856493584-0c6ca8ca9ce3?w=800&q=80',
        'https://images.unsplash.com/photo-1519923834699-ef0b7cde4712?w=800&q=80',
        'https://images.unsplash.com/photo-1481003223506-c0096abe0047?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1541849546-216549ae216d?w=900&q=85',
        'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=900&q=85',
        'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=900&q=85',
        'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=900&q=85'
      ],
      alts: [
        'Prague Old Town Square astronomical clock Czech Republic',
        'Budapest Parliament building Danube River Hungary night',
        'Krakow Wawel Castle Poland historic city centre',
        'Prague Charles Bridge medieval stone towers Czech',
        'Budapest thermal baths Szechenyi Hungary spa luxury',
        'Warsaw Old Town reconstructed Poland heritage',
        'Cesky Krumlov fairy-tale castle Czech Republic village',
        'Wieliczka Salt Mine Krakow Poland UNESCO heritage'
      ],
      cardAlts: ['Prague Old Town Czech Republic heritage package', 'Budapest Hungary Danube luxury tour package', 'Krakow Poland heritage cultural holiday', 'Prague Budapest Poland Eastern Europe tour']
    },

    'russia': {
      hero: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&q=80',
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80',
        'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800&q=80',
        'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80',
        'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
        'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?w=800&q=80',
        'https://images.unsplash.com/photo-1481003223506-c0096abe0047?w=800&q=80',
        'https://images.unsplash.com/photo-1533856493584-0c6ca8ca9ce3?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=900&q=85',
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=85',
        'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=900&q=85',
        'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=900&q=85'
      ],
      alts: [
        'Red Square Moscow Russia St Basil Cathedral colourful',
        'Moscow Kremlin Russian heritage landmark winter snow',
        'Saint Petersburg Winter Palace Hermitage Museum Russia',
        'Trans-Siberian Railway Russia scenic train journey',
        'Lake Baikal Siberia Russia winter frozen ice world',
        'Saint Petersburg White Nights Neva River Russia summer',
        'Moscow Metro ornate station architecture Russia',
        'Golden Ring ancient cities Russia heritage tour'
      ],
      cardAlts: ['Moscow Red Square Russia heritage tour package', 'Saint Petersburg Hermitage Russia luxury holiday', 'Trans-Siberian Railway Russia adventure tour', 'Russia Moscow St Petersburg tour package']
    },

    'seychelles': {
      hero: 'https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?w=800&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
        'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=800&q=80',
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
        'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&q=80',
        'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?w=900&q=85',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=85',
        'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=900&q=85'
      ],
      alts: [
        'Anse Source Argent La Digue Seychelles granite boulder beach',
        'Seychelles turquoise lagoon coral reef tropical paradise',
        'Praslin Anse Lazio beach Seychelles most beautiful',
        'Seychelles luxury overwater bungalow resort Indian Ocean',
        'Aldabra giant tortoise Seychelles endemic wildlife',
        'Mahe island Seychelles luxury villa tropical garden',
        'Seychelles sailing catamaran island hopping Indian Ocean',
        'Vallee de Mai UNESCO Coco de Mer palm Praslin Seychelles'
      ],
      cardAlts: ['Seychelles Anse Source Argent luxury holiday package', 'Seychelles overwater bungalow honeymoon package', 'Seychelles island hopping luxury tour', 'Praslin Mahe Seychelles luxury resort package']
    },

    'south-africa': {
      hero: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&q=80',
        'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
        'https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=800&q=80',
        'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80',
        'https://images.unsplash.com/photo-1508693926297-1d61ee3df82a?w=800&q=80',
        'https://images.unsplash.com/photo-1543965170-e399a2b9b2a4?w=800&q=80',
        'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
        'https://images.unsplash.com/photo-1572301552476-e6e4bf1c4219?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=900&q=85',
        'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=900&q=85',
        'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=900&q=85',
        'https://images.unsplash.com/photo-1508693926297-1d61ee3df82a?w=900&q=85'
      ],
      alts: [
        'Cape Town Table Mountain aerial view South Africa',
        'Kruger National Park Big Five safari South Africa',
        'Cape of Good Hope rugged coastline South Africa',
        'Boulders Beach African penguins Cape Town South Africa',
        'Garden Route South Africa coastal drive scenic',
        'Johannesburg Gold Reef City South Africa heritage',
        'Wine estates Stellenbosch Franschhoek South Africa',
        'Victoria and Alfred Waterfront Cape Town South Africa'
      ],
      cardAlts: ['Cape Town Table Mountain South Africa holiday', 'Kruger Park Big Five safari South Africa tour', 'South Africa luxury safari lodge package', 'Cape Town Garden Route South Africa tour']
    },

    'turkey': {
      hero: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80',
        'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80',
        'https://images.unsplash.com/photo-1502301197179-65228ab57f78?w=800&q=80',
        'https://images.unsplash.com/photo-1527203561188-dae1c4b7fd52?w=800&q=80',
        'https://images.unsplash.com/photo-1564492438-8ce0e4cf5bcd?w=800&q=80',
        'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80',
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
        'https://images.unsplash.com/photo-1519920880815-5b73f77a4f5d?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=900&q=85',
        'https://images.unsplash.com/photo-1545241047-6083a3684587?w=900&q=85',
        'https://images.unsplash.com/photo-1502301197179-65228ab57f78?w=900&q=85',
        'https://images.unsplash.com/photo-1527203561188-dae1c4b7fd52?w=900&q=85'
      ],
      alts: [
        'Cappadocia hot air balloons sunrise fairy chimneys Turkey',
        'Istanbul Hagia Sophia blue mosque Turkey heritage',
        'Pamukkale white travertine terraces thermal pools Turkey',
        'Ephesus ancient ruins Roman heritage Turkey Aegean',
        'Cappadocia underground city cave hotel Turkey luxury',
        'Turkish coast Aegean gulet boat cruise Turkey',
        'Bosphorus strait Istanbul skyline Turkey sunset',
        'Topkapi Palace Istanbul Ottoman heritage Turkey'
      ],
      cardAlts: ['Cappadocia hot air balloon Turkey luxury package', 'Istanbul Turkey heritage city break holiday', 'Turkey Pamukkale Ephesus heritage tour package', 'Cappadocia Istanbul Turkey grand tour package']
    },

    'uk-ireland': {
      hero: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
        'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80',
        'https://images.unsplash.com/photo-1512075135822-67cdd9dd7314?w=800&q=80',
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
        'https://images.unsplash.com/photo-1464740726079-bd0e04e25c8e?w=800&q=80',
        'https://images.unsplash.com/photo-1548913174-6c55d4e0b9eb?w=800&q=80',
        'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80',
        'https://images.unsplash.com/photo-1496947850313-7743325fa58c?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=85',
        'https://images.unsplash.com/photo-1512075135822-67cdd9dd7314?w=900&q=85',
        'https://images.unsplash.com/photo-1464740726079-bd0e04e25c8e?w=900&q=85',
        'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=900&q=85'
      ],
      alts: [
        'London Big Ben Westminster Bridge Thames River UK',
        'Edinburgh Castle Scotland highland UK iconic',
        'Cliffs of Moher Ireland Atlantic coast dramatic',
        'Stonehenge England prehistoric monument UK heritage',
        'Giant Causeway Northern Ireland basalt columns UNESCO',
        'Cotswolds village honey stone cottages England UK',
        'Dublin Trinity College Ireland green campus',
        'Loch Ness Scottish Highlands misty lake UK'
      ],
      cardAlts: ['London UK city break holiday package', 'Edinburgh Castle Scotland heritage tour UK', 'Cliffs of Moher Ireland scenic tour package', 'UK Ireland grand tour holiday package']
    },

    'us-east-coast': {
      hero: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
        'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800&q=80',
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
        'https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800&q=80',
        'https://images.unsplash.com/photo-1519920880815-5b73f77a4f5d?w=800&q=80',
        'https://images.unsplash.com/photo-1457130174514-2b7ac2eeac48?w=800&q=80',
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=900&q=85',
        'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=900&q=85',
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=900&q=85',
        'https://images.unsplash.com/photo-1468413253725-0d5181091126?w=900&q=85'
      ],
      alts: [
        'New York City skyline Manhattan aerial view USA',
        'Washington DC Capitol Building USA government landmark',
        'New York Times Square neon lights night USA',
        'Boston Freedom Trail historic USA New England',
        'Niagara Falls US Canada border waterfall aerial',
        'Miami South Beach Art Deco Florida USA',
        'New York Central Park aerial green urban USA',
        'Philadelphia Liberty Bell historic USA heritage'
      ],
      cardAlts: ['New York City USA east coast holiday package', 'Washington DC USA capital heritage tour', 'New York Miami USA east coast tour package', 'USA East Coast grand tour holiday']
    },

    'us-national-parks': {
      hero: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        'https://images.unsplash.com/photo-1504870712357-65ea720d6078?w=800&q=80',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=900&q=85',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=85',
        'https://images.unsplash.com/photo-1504870712357-65ea720d6078?w=900&q=85',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=900&q=85'
      ],
      alts: [
        'Grand Canyon South Rim sunrise Arizona USA national park',
        'Yosemite Valley Half Dome El Capitan California USA',
        'Yellowstone Old Faithful geyser Wyoming USA nature',
        'Zion National Park Angels Landing Utah USA red canyon',
        'Bryce Canyon orange hoodoos Utah USA national park',
        'Glacier National Park Montana USA mountain lakes',
        'Antelope Canyon slot canyon Arizona USA photography',
        'Rocky Mountain National Park Colorado USA wildflowers'
      ],
      cardAlts: ['Grand Canyon USA national park holiday package', 'Yosemite National Park USA tour package', 'Yellowstone USA road trip national parks tour', 'USA National Parks grand tour holiday package']
    },

    'us-west-coast': {
      hero: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1600&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&q=80',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
        'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800&q=80',
        'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
        'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80',
        'https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800&q=80',
        'https://images.unsplash.com/photo-1427524656954-16297c6b7571?w=800&q=80'
      ],
      cards: [
        'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=900&q=85',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=85',
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=900&q=85',
        'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=900&q=85'
      ],
      alts: [
        'Golden Gate Bridge San Francisco California USA sunset',
        'Pacific Coast Highway California USA scenic road trip',
        'Hollywood Sign Los Angeles California USA iconic',
        'Las Vegas Strip neon lights Nevada USA night',
        'Seattle Space Needle skyline Washington State USA',
        'Grand Canyon South Rim Arizona USA stunning views',
        'Venice Beach boardwalk Los Angeles California USA',
        'Redwood National Park California USA giant trees'
      ],
      cardAlts: ['Golden Gate Bridge San Francisco USA holiday', 'Los Angeles Hollywood USA west coast tour', 'Las Vegas Nevada USA entertainment holiday', 'California USA west coast road trip package']
    }

  };

  /* =========================================================
   * SLUG MAP — maps URL path fragments to registry keys
   * Add entries when folder name != registry key
   * ======================================================= */

  var VE_SLUG_MAP = {
    'kashmir-packages':                   'kashmir',
    'ladakh-packages':                    'ladakh',
    'rajasthan-packages':                 'rajasthan',
    'himachal-packages':                  'himachal',
    'goa-packages':                       'goa',
    'kerala-packages':                    'kerala',
    'tamil-nadu-packages':                'tamil-nadu',
    'arunachal-meghalaya-packages':       'arunachal-meghalaya',
    'uttarakhand-packages':               'uttarakhand',
    'bali-packages':                      'bali',
    'thailand-packages':                  'thailand',
    'maldives-packages':                  'maldives',
    'dubai-abu-dhabi-packages':           'dubai',
    'singapore-malaysia-packages':        'singapore',
    'vietnam-packages':                   'vietnam',
    'egypt-packages':                     'egypt',
    'victoria-falls-packages':            'victoria-falls',
    'kenya-packages':                     'kenya',
    'sri-lanka-packages':                 'sri-lanka',
    'georgia-packages':                   'georgia',
    'armenia-packages':                   'armenia',
    'azerbaijan-packages':                'azerbaijan',
    'kazakhstan-packages':                'kazakhstan',
    'rocky-mountaineer-packages':         'rocky-mountaineer',
    'eastern-canada-packages':            'eastern-canada',
    'western-canada-packages':            'western-canada',
    'autumn-fall-packages':               'autumn-fall',
    'australia-great-barrier-reef-packages': 'australia-great-barrier-reef',
    'andaman-nicobar-packages':           'andaman-nicobar',
    'delhi-agra-varanasi-packages':       'delhi-agra-varanasi',
    'sikkim-darjeeling-packages':         'sikkim-darjeeling',
    'gujarat-packages':                   'gujarat',
    'karnataka-packages':                 'karnataka',
    'madhya-pradesh-packages':            'madhya-pradesh',
    'australia-gold-coast-packages':      'australia-gold-coast',
    'australia-sydney-melbourne-packages':'australia-sydney-melbourne',
    'australia-luxury-self-drive-packages':'australia-luxury-self-drive',
    'france-switzerland-italy-packages':  'france-switzerland-italy',
    'germany-austria-hungary-packages':   'germany-austria-hungary',
    'greece-packages':                    'greece',
    'japan-korea-packages':               'japan-korea',
    'mauritius-packages':                 'mauritius',
    'norway-finland-packages':            'norway-finland',
    'nz-north-south-packages':            'nz-north-south',
    'nz-queenstown-packages':             'nz-queenstown',
    'nz-luxury-nature-packages':          'nz-luxury-nature',
    'nz-self-drive-packages':             'nz-self-drive',
    'orlando-packages':                   'orlando',
    'prague-budapest-poland-packages':    'prague-budapest-poland',
    'russia-packages':                    'russia',
    'seychelles-packages':                'seychelles',
    'south-africa-packages':              'south-africa',
    'turkey-packages':                    'turkey',
    'uk-ireland-packages':                'uk-ireland',
    'us-east-coast-packages':             'us-east-coast',
    'us-national-parks-packages':         'us-national-parks',
    'us-west-coast-packages':             'us-west-coast',
    // Inline names in card system
    'kashmir':             'kashmir',
    'ladakh':              'ladakh',
    'rajasthan':           'rajasthan',
    'himachal':            'himachal',
    'goa':                 'goa',
    'kerala':              'kerala',
    'tamil-nadu':          'tamil-nadu',
    'tamil_nadu':          'tamil-nadu',
    'arunachal-meghalaya': 'arunachal-meghalaya',
    'uttarakhand':         'uttarakhand',
    'bali':                'bali',
    'thailand':            'thailand',
    'maldives':            'maldives',
    'dubai':               'dubai',
    'singapore':           'singapore',
    'vietnam':             'vietnam',
    'egypt':               'egypt',
    'victoria-falls':      'victoria-falls',
    'georgia':             'georgia',
    'armenia':             'armenia',
    'azerbaijan':          'azerbaijan',
    'kazakhstan':          'kazakhstan',
    'rocky-mountaineer':   'rocky-mountaineer',
    'eastern-canada':      'eastern-canada',
    'western-canada':      'western-canada',
    'sri-lanka':           'sri-lanka',
    'kenya':               'kenya',
    'autumn-fall':         'autumn-fall',
    'great-barrier-reef':  'australia-great-barrier-reef',
    'andaman-nicobar':     'andaman-nicobar',
    'delhi-agra-varanasi': 'delhi-agra-varanasi',
    'sikkim-darjeeling':   'sikkim-darjeeling',
    'gujarat':             'gujarat',
    'karnataka':           'karnataka',
    'madhya-pradesh':      'madhya-pradesh',
    'australia-gold-coast':'australia-gold-coast',
    'australia-sydney-melbourne':'australia-sydney-melbourne',
    'australia-luxury-self-drive':'australia-luxury-self-drive',
    'france-switzerland-italy':'france-switzerland-italy',
    'germany-austria-hungary':'germany-austria-hungary',
    'greece':              'greece',
    'japan-korea':         'japan-korea',
    'mauritius':           'mauritius',
    'norway-finland':      'norway-finland',
    'nz-north-south':      'nz-north-south',
    'nz-queenstown':       'nz-queenstown',
    'nz-luxury-nature':    'nz-luxury-nature',
    'nz-self-drive':       'nz-self-drive',
    'orlando':             'orlando',
    'prague-budapest-poland':'prague-budapest-poland',
    'russia':              'russia',
    'seychelles':          'seychelles',
    'south-africa':        'south-africa',
    'turkey':              'turkey',
    'uk-ireland':          'uk-ireland',
    'us-east-coast':       'us-east-coast',
    'us-national-parks':   'us-national-parks',
    'us-west-coast':       'us-west-coast'
  };

  /* Universal fallback */
  var VE_FALLBACK = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=75';

  /* =========================================================
   * UTILITIES
   * ======================================================= */

  function getDestKey() {
    var path = window.location.pathname.toLowerCase();
    var parts = path.split('/').filter(Boolean);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i].replace('.html', '');
      if (VE_SLUG_MAP[p]) return VE_SLUG_MAP[p];
    }
    var h1 = document.querySelector('h1,.dest-title,.pkg-title,.dest-name');
    if (h1) {
      var text = h1.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      if (VE_SLUG_MAP[text]) return VE_SLUG_MAP[text];
    }
    return null;
  }

  function getImages(destKey) {
    return destKey && VE_IMAGES[destKey] ? VE_IMAGES[destKey] : null;
  }

  
  /* ═══ v6 THEME POOLS — multiple candidates per destination, probed in order ═══ */
  var VE_POOLS = {
    beach:    ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80','https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=900&q=80','https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=80','https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=900&q=80'],
    tropical: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80','https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80','https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=900&q=80','https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=900&q=80'],
    mountain: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80','https://images.unsplash.com/photo-1589308454676-21178b78d2b6?w=900&q=80','https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=80','https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=900&q=80'],
    city:     ['https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=900&q=80','https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80','https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=900&q=80','https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&q=80'],
    heritage: ['https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&q=80','https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=80','https://images.unsplash.com/photo-1583416750470-bcdca58e4c8c?w=900&q=80','https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80'],
    europe:   ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80','https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900&q=80','https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=900&q=80','https://images.unsplash.com/photo-1520986606214-8b456906c813?w=900&q=80'],
    safari:   ['https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80','https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80','https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=900&q=80'],
    island:   ['https://images.unsplash.com/photo-1583265627959-fb7042f5133b?w=900&q=80','https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&q=80','https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=80','https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=900&q=80'],
    desert:   ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80','https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80','https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=900&q=80']
  };
  var VE_THEME_MAP = {
    'georgia':'mountain','armenia':'mountain','azerbaijan':'city','kazakhstan':'mountain','almaty':'mountain','baku':'city',
    'sri-lanka':'tropical','srilanka':'tropical','bali':'tropical','thailand':'tropical','vietnam':'tropical','phuket':'beach','maldives':'island','seychelles':'island','mauritius':'beach','andaman':'beach','goa':'beach',
    'dubai':'city','singapore':'city','malaysia':'city','hong-kong':'city','japan':'heritage','korea':'heritage','china':'heritage','turkey':'heritage','egypt':'desert','jordan':'desert','morocco':'desert',
    'europe':'europe','france':'europe','paris':'europe','italy':'europe','switzerland':'mountain','austria':'europe','spain':'europe','greece':'europe','uk':'europe','london':'europe',
    'kashmir':'mountain','ladakh':'mountain','himachal':'mountain','manali':'mountain','shimla':'mountain','uttarakhand':'mountain','sikkim':'mountain','darjeeling':'mountain','nepal':'mountain','bhutan':'mountain',
    'kerala':'tropical','rajasthan':'heritage','agra':'heritage','varanasi':'heritage',
    'kenya':'safari','tanzania':'safari','south-africa':'safari','victoria-falls':'safari','australia':'beach','new-zealand':'mountain','fiji':'island','canada':'mountain','usa':'city','america':'city'
  };
  function getThemePool() {
    var p = location.pathname.toLowerCase();
    var keys = Object.keys(VE_THEME_MAP);
    for (var i = 0; i < keys.length; i++) {
      if (p.indexOf(keys[i]) > -1) return VE_POOLS[VE_THEME_MAP[keys[i]]];
    }
    return null;
  }
  /* Probe a chain of URLs; apply the first that loads */
  function setBgChain(el, urls, idx) {
    idx = idx || 0;
    if (idx >= urls.length) { el.style.backgroundImage = "url('" + VE_FALLBACK + "')"; return; }
    var probe = new Image();
    probe.onload = function() { el.style.backgroundImage = "url('" + urls[idx] + "')"; el.classList.add('ve-img-loaded'); };
    probe.onerror = function() { setBgChain(el, urls, idx + 1); };
    probe.src = urls[idx];
  }

  function setBackgroundImage(el, url) {
    var probe = new Image();
    probe.onload = function() { el.style.backgroundImage = "url('" + url + "')"; el.classList.add('ve-img-loaded'); };
    probe.onerror = function() { el.style.backgroundImage = "url('" + VE_FALLBACK + "')"; };
    probe.src = url;
  }

  function rotate(arr, index) {
    return arr[index % arr.length];
  }

  function addLazyLoadSupport() {
    if (!('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var url = el.getAttribute('data-bg');
          if (url) {
            setBackgroundImage(el, url);
            el.removeAttribute('data-bg');
          }
          observer.unobserve(el);
        }
      });
    }, { rootMargin: '200px' });
    document.querySelectorAll('[data-bg]').forEach(function(el) {
      observer.observe(el);
    });
  }

  function addFallbacks() {
    document.querySelectorAll('img').forEach(function(img) {
      if (!img.getAttribute('data-ve-fb')) {
        img.setAttribute('data-ve-fb', '1');
        img.addEventListener('error', function() {
          if (!this.getAttribute('data-ve-failed')) {
            this.setAttribute('data-ve-failed', '1');
            this.src = VE_FALLBACK;
          }
        });
      }
    });
  }

  function fixGalleryAlt(destKey, images) {
    if (!images || !images.alts) return;
    var galImgs = document.querySelectorAll('.gal-item img, .gallery img, .pkg-gallery img');
    galImgs.forEach(function(img, i) {
      if (!img.alt || img.alt === '') {
        img.alt = images.alts[i % images.alts.length] || (destKey + ' travel photo');
      }
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });
  }

  function applyHero(destKey, images) {
    if (!images || !images.hero) return;
    var hero = document.querySelector('.pkg-hero-bg, .dest-hero-bg');
    if (hero) {
      var currentBg = hero.style.backgroundImage || '';
      if (!currentBg || currentBg === 'none' || currentBg === '') {
        setBackgroundImage(hero, images.hero);
      }
    }
  }

  function fixGallery(destKey, images) {
    if (!images || !images.gallery) return;
    var galItems = document.querySelectorAll('.gal-item img');
    galItems.forEach(function(img, i) {
      img.src = images.gallery[i % images.gallery.length];
      img.srcset = '';
      img.alt = images.alts ? (images.alts[i % images.alts.length] || destKey + ' gallery') : destKey + ' gallery ' + (i + 1);
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
      img.setAttribute('width', '800');
      img.setAttribute('height', '500');
      img.style.objectFit = 'cover';
      img.style.width = '100%';
      img.style.height = '100%';
    });
  }

  function fixPackageCards(destKey, images) {
    var pool = getThemePool();
    var cardImgs = document.querySelectorAll('.pkg-card-img');
    cardImgs.forEach(function(el, i) {
      var chain = [];
      if (pool) { for (var k = 0; k < pool.length; k++) chain.push(pool[(i + k) % pool.length]); }
      if (images && images.hero) chain.push(images.hero.replace('w=1600', 'w=900'));
      chain.push(VE_FALLBACK);
      setBgChain(el, chain);
      el.setAttribute('aria-label', (destKey || 'tour') + ' package');
      var img = el.querySelector('img');
      if (img) { img.style.display = 'none'; }
    });
  }

  function patchBrokenBackgrounds() {
    var bgEls = document.querySelectorAll('.dcard-bg, .ccard-bg, .pkg-card-img, .pkg-hero-bg, .dest-hero-bg');
    bgEls.forEach(function(el) {
      var bg = el.style.backgroundImage;
      if (!bg || bg === 'none' || bg === '') {
        setBackgroundImage(el, VE_FALLBACK);
      }
    });
  }

  function injectBaseStyles() {
    if (document.getElementById('ve-image-system-styles')) return;
    var style = document.createElement('style');
    style.setAttribute('id', 've-image-system-styles');
    style.textContent = [
      '.dcard-bg,.ccard-bg,.pkg-hero-bg,.dest-hero-bg,.pkg-card-img{',
      '  background-size:cover !important;',
      '  background-position:center !important;',
      '  background-repeat:no-repeat !important;',
      '}',
      '.gal-item img{',
      '  width:100% !important;',
      '  height:100% !important;',
      '  object-fit:cover !important;',
      '  display:block !important;',
      '}',
      '.gal-item{overflow:hidden;position:relative;background:#0d1b3e;}',
      '.pkg-card-img{min-height:200px;}',
      '.ve-img-loaded{animation:veFadeIn .4s ease}',
      '@keyframes veFadeIn{from{opacity:0}to{opacity:1}}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function fixListingPageCards() {
    document.querySelectorAll('a.dcard, .dcard').forEach(function(card) {
      var href = card.getAttribute('href') || card.id || '';
      var slug = href.replace('.html', '').replace(/^\//, '').toLowerCase();
      var key = VE_SLUG_MAP[slug] || null;
      if (!key) {
        var id = card.id || card.getAttribute('data-dest') || '';
        key = VE_SLUG_MAP[id.toLowerCase()] || null;
      }
      if (!key) {
        var name = card.querySelector('.dcard-name') || card.querySelector('.ccard-name');
        if (name) {
          var t = name.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          key = VE_SLUG_MAP[t] || null;
        }
      }
      if (key && VE_IMAGES[key]) {
        var bgEl = card.querySelector('.dcard-bg');
        if (bgEl && (!bgEl.style.backgroundImage || bgEl.style.backgroundImage === 'none')) {
          setBackgroundImage(bgEl, VE_IMAGES[key].hero);
        }
      }
    });

    document.querySelectorAll('a.ccard, .ccard').forEach(function(card) {
      var href = card.getAttribute('href') || card.id || '';
      var slug = href.replace('.html', '').replace(/^\//, '').toLowerCase();
      var key = VE_SLUG_MAP[slug] || null;
      if (!key) {
        var name = card.querySelector('.ccard-name');
        if (name) {
          var t = name.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          key = VE_SLUG_MAP[t] || null;
        }
      }
      if (key && VE_IMAGES[key]) {
        var bgEl = card.querySelector('.ccard-bg');
        if (bgEl && (!bgEl.style.backgroundImage || bgEl.style.backgroundImage === 'none')) {
          setBackgroundImage(bgEl, VE_IMAGES[key].hero);
        }
      }
    });
  }

  function globalImageFix() {
    document.querySelectorAll('img:not([loading])').forEach(function(img) {
      if (!img.closest('.nav-logo') && !img.classList.contains('ft-logo-img')) {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      }
    });
    document.querySelectorAll('.pkg-card-img img, .gal-item img').forEach(function(img) {
      img.style.objectFit = 'cover';
      img.style.width = '100%';
      img.style.height = '100%';
    });
  }

  function applyBlogImages() {
    document.querySelectorAll('[data-dest]').forEach(function(el) {
      var key = VE_SLUG_MAP[el.getAttribute('data-dest')] || el.getAttribute('data-dest');
      var imgs = VE_IMAGES[key];
      if (!imgs) return;
      if (el.classList.contains('blog-img-bg') || el.classList.contains('art-img-bg') || el.classList.contains('rel-img-bg')) {
        if (!el.style.backgroundImage) {
          setBackgroundImage(el, imgs.hero);
        }
      }
    });
  }

  window.VoyageEdImages = {
    registry: VE_IMAGES,
    slugMap:  VE_SLUG_MAP,
    get: function(dest) {
      var key = VE_SLUG_MAP[dest] || dest;
      return VE_IMAGES[key] || null;
    },
    getHero: function(dest) {
      var d = this.get(dest);
      return d ? d.hero : VE_FALLBACK;
    },
    getGallery: function(dest) {
      var d = this.get(dest);
      return d ? d.gallery : [VE_FALLBACK];
    },
    fallback: VE_FALLBACK
  };

  function init() {
    injectBaseStyles();
    var destKey = getDestKey();
    var images  = getImages(destKey);
    if (images) {
      applyHero(destKey, images);
      fixGallery(destKey, images);
      fixGalleryAlt(destKey, images);
      fixPackageCards(destKey, images);
    }
    fixListingPageCards();
    patchBrokenBackgrounds();
    globalImageFix();
    applyBlogImages();
    addFallbacks();
    addLazyLoadSupport();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ═══ FOREIGN WIDGET KILLER + IMG SELF-HEAL (v4) ═══ */
  function killForeignWidgets() {
    /* Remove any injected chat widget that is not ours */
    document.querySelectorAll('body > div, body > a').forEach(function(el) {
      if (el.id === 've-trigger' || el.id === 've-overlay' || el.classList.contains('wa-float-clean') || el.id === 've-marquee' || el.id === 've-toast') return;
      var cs = window.getComputedStyle(el);
      if (cs.position !== 'fixed') return;
      var html = (el.innerHTML || '').toLowerCase();
      var txt = (el.textContent || '').trim().toLowerCase();
      if (html.indexOf('wa.me') > -1 || html.indexOf('whatsapp') > -1 || txt === 'chat with us' || txt.indexOf('chat with us') === 0) {
        el.remove();
      }
    });
    /* Also catch deep-injected launchers */
    document.querySelectorAll('[class*="getbutton"],[class*="joinchat"],[id*="whatsapp-widget"],[class*="wa-widget"]').forEach(function(el){ el.remove(); });
  }
  function imgSelfHeal() {
    document.querySelectorAll('img').forEach(function(img) {
      if (img.dataset.veHealed) return;
      img.dataset.veHealed = '1';
      img.addEventListener('error', function() {
        if (img.src !== VE_FALLBACK) img.src = VE_FALLBACK;
      });
      /* already-broken images */
      if (img.complete && img.naturalWidth === 0 && img.src && img.src.indexOf('data:') !== 0) {
        img.src = VE_FALLBACK;
      }
    });
  }
  setTimeout(killForeignWidgets, 800);
  setTimeout(killForeignWidgets, 2500);
  setTimeout(killForeignWidgets, 5000);
  setTimeout(imgSelfHeal, 600);
  setTimeout(imgSelfHeal, 3000);

  /* v5: verify every inline background-image; heal dead ones */
  function bgSelfHeal() {
    document.querySelectorAll('[style*="background-image"]').forEach(function(el) {
      if (el.dataset.veBgHealed) return;
      el.dataset.veBgHealed = '1';
      var m = (el.getAttribute('style') || '').match(/background-image\s*:\s*url\(['"]?([^'")]+)['"]?\)/i);
      if (!m || !m[1] || m[1].indexOf('http') !== 0) return;
      var url = m[1].replace(/&amp;/g, '&');
      var probe = new Image();
      probe.onerror = function() {
        var pool = getThemePool();
        setBgChain(el, pool ? pool.slice() : [VE_FALLBACK]);
      };
      probe.src = url;
    });
  }
  setTimeout(bgSelfHeal, 500);
  setTimeout(bgSelfHeal, 3000);

})();
