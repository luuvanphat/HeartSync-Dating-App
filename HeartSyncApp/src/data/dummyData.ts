import {User, Match, Message} from '../types';

export const CURRENT_USER: User = {
  id: 'current-user',
  name: 'Lưu Văn Phát',
  age: 21,
  bio: 'Love exploring new places and meeting interesting people. Coffee enthusiast ☕',
  occupation: 'Software Engineer',
  location: 'Hồ Chí Minh City, NV 89104',
  distance: 0,
  photos: [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/men/33.jpg',
    'https://randomuser.me/api/portraits/men/34.jpg',
    'https://randomuser.me/api/portraits/men/35.jpg',
    'https://randomuser.me/api/portraits/men/36.jpg',
    'https://randomuser.me/api/portraits/men/37.jpg',
  ],
  interests: ['Coffee', 'Travel', 'Coding', 'Music'],
  languages: ['English', 'Spanish'],
  details: {
    height: '5\'10"',
    smoking: 'Non-smoker',
    drinking: 'Socially',
    education: 'Master degree',
    gender: 'Male',
  },
  verified: true,
};

export const DUMMY_USERS: User[] = [
  // ========== FEMALE USERS ==========
  {
    id: '1',
    name: 'Ava Jones',
    age: 25,
    bio: 'It would be wonderful to meet someone who appreciates the arts.',
    occupation: 'Business Analyst at Tech',
    location: 'Las Vegas, NV 89104',
    distance: 2.0,
    photos: [
      'https://randomuser.me/api/portraits/women/44.jpg',
      'https://randomuser.me/api/portraits/women/45.jpg',
      'https://randomuser.me/api/portraits/women/46.jpg',
    ],
    interests: ['Classical Music & Art', 'Nature', 'Biking', 'Asian Food'],
    languages: ['English (Native)', 'Spanish (Fluent)'],
    details: {
      height: '5\'6" (168 cm)',
      smoking: 'Non-smoker',
      drinking: 'Cat lover',
      education: 'Master degree',
      gender: 'Female', // ✅ ĐÚNG
    },
    verified: true,
    pronouns: 'she/her/hers',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Rachel Miller',
    age: 27,
    bio: 'Freelance model and adventure seeker.',
    occupation: 'Freelance model',
    location: 'Los Angeles, CA',
    distance: 5.2,
    photos: [
      'https://randomuser.me/api/portraits/women/68.jpg',
      'https://randomuser.me/api/portraits/women/69.jpg',
    ],
    interests: ['Photography', 'Fashion', 'Yoga', 'Travel'],
    languages: ['English', 'French'],
    details: {
      height: '5\'8"',
      smoking: 'Non-smoker',
      drinking: 'Occasionally',
      gender: 'Female', // ✅ ĐÚNG
    },
    verified: true,
    pronouns: 'she/her/hers',
    isOnline: false,
  },
  {
    id: '3',
    name: 'Maria White',
    age: 24,
    bio: 'Foodie, gym enthusiast, and dog lover 🐕',
    occupation: 'Marketing Manager',
    location: 'Las Vegas, NV',
    distance: 1.5,
    photos: [
      'https://randomuser.me/api/portraits/women/12.jpg',
      'https://randomuser.me/api/portraits/women/13.jpg',
    ],
    interests: ['Fitness', 'Cooking', 'Dogs', 'Hiking'],
    languages: ['English', 'Italian'],
    details: {
      height: '5\'5"',
      smoking: 'Non-smoker',
      drinking: 'Socially',
      pets: 'Dog lover',
      gender: 'Female', // ✅ ĐÚNG
    },
    verified: false,
    isOnline: true,
  },
  
  // ========== MALE USERS ==========
  {
    id: '10',
    name: 'Michael Chen',
    age: 28,
    bio: 'Tech entrepreneur and fitness enthusiast 🏃‍♂️',
    occupation: 'Software Developer',
    location: 'Las Vegas, NV',
    distance: 3.5,
    photos: [
      'https://randomuser.me/api/portraits/men/45.jpg',
      'https://randomuser.me/api/portraits/men/46.jpg',
    ],
    interests: ['Gym', 'Hiking', 'Gaming', 'Tech'],
    languages: ['English', 'Chinese'],
    details: {
      height: '6\'0"',
      smoking: 'Non-smoker',
      drinking: 'Socially',
      education: 'Bachelor degree',
      gender: 'Male', // ✅ ĐÚNG
    },
    verified: true,
    pronouns: 'he/him/his',
    isOnline: true,
  },
  {
    id: '11',
    name: 'David Rodriguez',
    age: 32,
    bio: 'Chef and food lover. Let me cook you something special 👨‍🍳',
    occupation: 'Head Chef',
    location: 'Henderson, NV',
    distance: 7.8,
    photos: [
      'https://randomuser.me/api/portraits/men/52.jpg',
      'https://randomuser.me/api/portraits/men/53.jpg',
    ],
    interests: ['Cooking', 'Wine', 'Travel', 'Music'],
    languages: ['English', 'Spanish'],
    details: {
      height: '5\'11"',
      smoking: 'Non-smoker',
      drinking: 'Wine enthusiast',
      education: 'Culinary degree',
      gender: 'Male', // ✅ ĐÚNG
    },
    verified: true,
    isOnline: true,
  },
  {
    id: '12',
    name: 'James Wilson',
    age: 30,
    bio: 'Attorney by day, musician by night 🎸',
    occupation: 'Attorney',
    location: 'Las Vegas, NV',
    distance: 2.3,
    photos: [
      'https://randomuser.me/api/portraits/men/58.jpg',
      'https://randomuser.me/api/portraits/men/59.jpg',
    ],
    interests: ['Music', 'Reading', 'Coffee', 'Art'],
    languages: ['English', 'French'],
    details: {
      height: '6\'1"',
      smoking: 'Non-smoker',
      drinking: 'Occasionally',
      education: 'Law degree',
      gender: 'Male', // ✅ ĐÚNG
    },
    verified: true,
    pronouns: 'he/him/his',
    isOnline: false,
  },
];


export const DUMMY_MATCHES: Match[] = [
  {
    id: 'match-1',
    user: DUMMY_USERS[0],
    matchedAt: new Date(Date.now() - 3600000),
    lastMessage: {
      id: 'msg-1',
      senderId: 'current-user',
      receiverId: '1',
      text: 'Hello!',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
  },
];

export const DUMMY_MESSAGES: {[key: string]: Message[]} = {
  'match-1': [
    {
      id: 'msg-1',
      senderId: '1',
      receiverId: 'current-user',
      text: 'Hi there!',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
    },
    {
      id: 'msg-2',
      senderId: 'current-user',
      receiverId: '1',
      text: 'Hello!',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
  ],
};