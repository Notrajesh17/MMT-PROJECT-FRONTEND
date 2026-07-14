export const COLORS = {
  background: '#f9f1f1',
  white: '#fff',
  primary: '#9443d8',
  secondary: '#e91e63',
  textDark: '#333',
  textLight: '#888',
  shadow: '#ddd',
};

export const mockCities = [
  {id: 1, name: 'Kolkata', image: 'https://picsum.photos/200/300'},
  {id: 2, name: 'Mumbai', image: 'https://picsum.photos/200/300'},
  {id: 3, name: 'Chennai', image: 'https://picsum.photos/200/300'},
  {id: 4, name: 'Udaipur', image: 'https://picsum.photos/200/300'},
];

export const hotels = Array(5).fill({
  id: '1',
  title: 'Hilton Goa Resort',
  location: 'Goa • 5 Star',
  price: '15000',
  rating: '4.9',
  description: 'Luxury Suites and Rooms Overlooking Goa River',
  image:
    'https://cdn0.weddingwire.in/article/4626/3_2/960/jpg/92918-taj-aravali-resort-and-spa-the-luxury-collection-hotels.jpg',
  gallery: [
    'https://cdn0.weddingwire.in/article/4626/3_2/960/jpg/92918-taj-aravali-resort-and-spa-the-luxury-collection-hotels.jpg',
    'https://www.exoticgoa.com/images/adventure.jpg',
    'https://static.toiimg.com/thumb/msid-83750861,width-748,height-499,resizemode=4,imgsize-195043/.jpg',
  ],
  videos: [],
  amenities: [
    'Free WiFi',
    'Swimming Pool',
    'Spa',
    'Bar & Grill',
    'Room Service',
    'Deluxe Room',
  ],
  usp: `If you want to live in a world full of luxuries then Hilton Luxury is perfect for you. Escape to a world of relaxation at Hilton’s Luxury Hotel.`,
  propertyFacts: 'Hilton Group',
  locationMap:
    'https://maps.googleapis.com/maps/api/staticmap?center=Goa,India&zoom=14&size=600x300&key=YOUR_API_KEY',
  nearby: [
    {
      name: 'Nai Beau Resort',
      distance: '6 km',
      rating: '5.0',
      location: '48 Bd Colonel Dorosel, America',
    },
  ],
  roomTypes: [
    {type: 'DELUXE', price: 15000},
    {type: 'SUPER DELUXE', price: 20000},
  ],
});
