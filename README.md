# 💘 HeartSync Dating App - Complete Setup Guide

## 🎯 Tổng Quan Dự Án

**HeartSync** là ứng dụng hẹn hò hoàn chỉnh kiểu Tinder với:

### ✨ Tính Năng Chính:
- 🔥 **Swipe Cards** - Vuốt trái/phải với animation mượt mà
- 💬 **Real-time Chat** - Nhắn tin với matches
- 📞 **Video Call** - Gọi video (UI demo)
- 👤 **Profile Management** - Quản lý hồ sơ cá nhân
- ⚙️ **Filters** - Bộ lọc tìm kiếm nâng cao
- 💎 **Premium Upgrade** - Màn hình nâng cấp tài khoản đẹp
- 🎉 **Match Modal** - Animation khi match
- 🎨 **Modern UI** - Giao diện đẹp, hiện đại
- 📱 **Responsive** - Tương thích mọi kích thước màn hình

### 🛠️ Tech Stack:
- React Native 0.73.2
- TypeScript
- Zustand (State Management)
- React Navigation (Stack + Bottom Tabs)
- React Native Gesture Handler
- React Native Reanimated
- Vector Icons

---

## 📋 Yêu Cầu Hệ Thống

### Bắt buộc:
- Node.js >= 18
- npm hoặc yarn
- JDK 17
- Android SDK
- Genymotion hoặc Android Studio Emulator

### Tùy chọn (cho iOS):
- macOS
- Xcode
- CocoaPods

---

## 🚀 Cài Đặt Chi Tiết

### Bước 1: Khởi tạo Project

```bash
# Option 1: Init từ template
npx react-native@latest init HeartSyncApp --template react-native-template-typescript
cd HeartSyncApp

# Option 2: Hoặc tạo thư mục mới
mkdir HeartSyncApp
cd HeartSyncApp
npm init -y
```

### Bước 2: Copy Files

Sao chép tất cả các file đã tạo vào project:

```
HeartSyncApp/
├── 📱 Main App Entry (1)
│   └── App.tsx                ⚠️  REPLACE with provided
│
├── 📁 src/
│   ├── 🎯 types/
│   │   └── index.ts           ✨ NEW - All TypeScript interfaces
│   │
│   ├── 💾 data/
│   │   └── dummyData.ts       ✨ NEW - Sample users & messages
│   │
│   ├── 🗂️ store/
│   │   └── useStore.ts        ✨ NEW - Zustand state management
│   │
│   ├── 🧩 components/ (2)
│   │   ├── SwipeCard.tsx      ✨ NEW - Swipeable card component
│   │   ├── MatchModal.tsx     ✨ NEW - Match found modal
│   │   └── DrawerMenu.tsx     ✨ NEW - Side drawer menu
│   │
│   └── 📱 screens/ (14)
│       ├── AuthScreen.tsx              ✨ NEW - Landing page
│       ├── LoginScreen.tsx             ✨ NEW - Login form
│       ├── RegisterScreen.tsx          ✨ NEW - Sign up form
│       ├── SwipeScreen.tsx             ✨ NEW - Main swipe
│       ├── MatchesScreen.tsx           ✨ NEW - Matches & chats
│       ├── ChatDetailScreen.tsx        ✨ NEW - Chat messages
│       ├── ProfileScreen.tsx           ✨ NEW - User profile
│       ├── ProfileDetailScreen.tsx     ✨ NEW - View others
│       ├── EditProfileScreen.tsx       ✨ NEW - Edit profile
│       ├── FiltersScreen.tsx           ✨ NEW - Search filters
│       ├── VideoCallScreen.tsx         ✨ NEW - Video call UI
│       ├── UpgradePremiumScreen.tsx    ✨ NEW - Premium plans
│       └── SettingsScreen.tsx          ✨ NEW - App settings

📊 Total: 30+ files to copy/create
```

### Bước 3: Install Dependencies

```bash
# Install all dependencies
npm install

# Hoặc với yarn
yarn install
```

### Bước 4: Link Native Dependencies

```bash
# For Android
npx react-native link

# For iOS (nếu develop trên macOS)
cd ios && pod install && cd ..
```

### Bước 5: Setup Android SDK Path

Tạo file `android/local.properties`:

```properties
# macOS/Linux
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk

# Windows
sdk.dir=C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk
```

---

## 🎮 Chạy Ứng Dụng

### Option 1: Genymotion

```bash
# 1. Khởi động Genymotion và start device
# 2. Kiểm tra device
adb devices

# 3. Start Metro Bundler (Terminal 1)
npm start

# 4. Build và chạy (Terminal 2)
npm run android
```

### Option 2: Android Studio Emulator

```bash
# 1. Mở Android Studio > Device Manager > Create Device
# 2. Start emulator
# 3. Chạy app
npm run android
```

### Option 3: Physical Device

```bash
# 1. Enable USB Debugging trên điện thoại
# 2. Kết nối USB
# 3. Check device
adb devices

# 4. Chạy app
npm run android
```

---

## 📱 Cấu Trúc Project Chi Tiết

```
src/
├── types/              # TypeScript interfaces
│   └── index.ts        # User, Match, Message, Navigation types
│
├── data/               # Dummy data
│   └── dummyData.ts    # Fake users, matches, messages
│
├── store/              # State management
│   └── useStore.ts     # Zustand store
│
├── components/         # Reusable components
│   └── SwipeCard.tsx   # Card component với gesture
│
└── screens/            # All screens
    ├── AuthScreen.tsx          # Login/Register (Image 8)
    ├── SwipeScreen.tsx         # Main swipe (Image 3, 10, 11)
    ├── MatchesScreen.tsx       # Matches list (Image 5, 7)
    ├── ProfileScreen.tsx       # User profile (Image 9)
    ├── ChatDetailScreen.tsx    # Chat detail (Image 4)
    ├── ProfileDetailScreen.tsx # User detail (Image 13)
    ├── EditProfileScreen.tsx   # Edit profile (Image 1)
    ├── FiltersScreen.tsx       # Filters (Image 2)
    └── VideoCallScreen.tsx     # Video call (Image 12)
```

---

## 🎨 Tính Năng Chi Tiết

### 1. 🔐 Authentication (AuthScreen)
- Login với Apple
- Login với Facebook
- Login với số điện thoại
- UI đẹp với gradient và icons

### 2. 🔥 Swipe Cards (SwipeScreen)
- **Gesture Recognition**: Vuốt trái/phải để pass/like
- **Animation**: Xoay card khi vuốt
- **Like/Nope Labels**: Hiện label khi vuốt
- **Photo Navigation**: Tap để xem ảnh tiếp theo
- **Action Buttons**: Pass, Super Like, Like
- **Match Modal**: Popup khi match thành công

### 3. 💬 Matches & Chat (MatchesScreen)
- **Matches Horizontal List**: Scroll ngang xem matches
- **Online Status**: Dot xanh cho người online
- **Chat List**: Danh sách conversations
- **Last Message Preview**: Xem tin nhắn cuối
- **Time Ago**: Hiển thị thời gian

### 4. 💬 Chat Detail (ChatDetailScreen)
- **Message Bubbles**: Bong bóng chat đẹp
- **Send Messages**: Gửi tin nhắn
- **Photo/GIF/Location**: Icons để gửi media
- **Video Call Button**: Gọi video từ chat
- **Game Prompt**: Mời chơi mini-game

### 5. 👤 Profile Detail (ProfileDetailScreen)
- **Full Screen Photos**: Xem ảnh full screen
- **Photo Indicators**: Chấm chỉ ảnh nào
- **About Section**: Bio và thông tin
- **Details Grid**: Chiều cao, hút thuốc, etc
- **Interests Tags**: Sở thích
- **Languages**: Ngôn ngữ giao tiếp
- **Action Buttons**: Like/Pass từ profile

### 6. ✏️ Edit Profile (EditProfileScreen)
- **Photo Upload**: Thêm/xóa ảnh
- **Bio Editor**: Chỉnh sửa giới thiệu
- **Detail Fields**: Occupation, location, etc
- **Interests**: Thêm sở thích
- **Languages**: Chọn ngôn ngữ
- **Social Links**: Link Instagram/Facebook/Twitter
- **Progress Bar**: % hoàn thành profile

### 7. ⚙️ Filters (FiltersScreen)
- **Gender Selection**: Chọn giới tính ưa thích
- **Age Range Slider**: Khoảng tuổi
- **Distance Slider**: Khoảng cách tìm kiếm
- **Show Nearby Toggle**: Hiện người gần khi hết
- **Language Selection**: Chọn ngôn ngữ
- **Apply/Clear Buttons**: Áp dụng hoặc xóa filter

### 8. 📞 Video Call (VideoCallScreen)
- **Caller Avatar**: Ảnh người gọi
- **Calling Status**: "Calling..."
- **Control Buttons**: Mute, Camera switch, End call
- **Beautiful UI**: Blur background

### 9. 🏠 My Profile (ProfileScreen)
- **Profile Card**: Ảnh và info
- **Completion Badge**: % hoàn thành
- **Edit Button**: Chuyển đến edit
- **Verification Card**: Xác minh tài khoản
- **Premium Plans**: Upgrade Premium
- **Feature Comparison**: Free vs Premium table

---

## 🎯 State Management với Zustand

```typescript
// Store structure
{
  currentUser: User,
  users: User[],
  matches: Match[],
  chats: {[matchId]: Message[]},
  
  // Actions
  login(),
  logout(),
  updateCurrentUser(),
  swipeLeft(userId),
  swipeRight(userId),
  addMatch(user),
  sendMessage(matchId, text),
  getNextUser()
}
```

---

## 🐛 Troubleshooting

### ✅ All Fixed Issues

**useStore.ts**
- ✅ Fixed: Added `allUsers` state for proper filter reset
- ✅ Fixed: Completed `applyFilters()` logic
- ✅ Fixed: All async functions return Promise<boolean>

**EditProfileScreen.tsx**
- ✅ Fixed: Added proper navigation types
- ✅ Fixed: useEffect dependencies complete
- ✅ Fixed: Unsaved changes warning works

**FiltersScreen.tsx**
- ✅ Fixed: Slider component properly imported
- ✅ Fixed: Separate minAge/maxAge state
- ✅ Fixed: Validation for age range

**SettingsScreen.tsx**
- ✅ Fixed: Navigation types added
- ✅ Fixed: All navigation properly typed

### TypeScript Navigation Errors
```bash
npm start -- --reset-cache
```

### Lỗi: App crash khi build
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Lỗi: Vector Icons không hiện
```bash
# Android
npx react-native link react-native-vector-icons

# Rebuild
npm run android
```

### Lỗi: Gesture không hoạt động
Đảm bảo `react-native-gesture-handler` được import trong `index.js`:
```javascript
import 'react-native-gesture-handler';
```

### Lỗi: Cannot connect to development server
```bash
adb reverse tcp:8081 tcp:8081
```

### Lỗi: SDK location not found
Tạo file `android/local.properties` với path SDK của bạn.

---

## 🚀 Phát Triển Tiếp

### Tính năng có thể thêm:

1. **Backend Integration**
   - Firebase/Supabase cho realtime chat
   - User authentication thật
   - Cloud storage cho photos

2. **Advanced Features**
   - Push notifications
   - Location services thật
   - Video call thật với WebRTC
   - In-app purchases cho Premium

3. **Social Features**
   - Stories (như Instagram)
   - Group chats
   - Events/Activities
   - Verification badge

4. **UI Enhancements**
   - Dark mode
   - Themes
   - Custom animations
   - Skeleton loading

5. **Performance**
   - Image optimization
   - Lazy loading
   - Caching strategies
   - Code splitting

---

## 📝 Scripts Hữu Ích

```bash
# Development
npm start              # Start Metro
npm run android        # Run on Android
npm run ios           # Run on iOS (macOS only)

# Build
npm run android -- --variant=release  # Release build Android

# Testing
npm test              # Run tests
npm run lint          # Lint code

# Debugging
npx react-devtools    # Open DevTools
adb logcat           # View Android logs
```

---

## 🎨 Customization

### Thay đổi màu chủ đạo:
Tìm và thay thế `#00BCD4` (cyan) bằng màu bạn muốn trong tất cả file styles.

### Thay đổi fonts:
1. Thêm custom fonts vào `android/app/src/main/assets/fonts/`
2. Link fonts: `npx react-native link`
3. Sử dụng trong styles: `fontFamily: 'YourFont-Regular'`

### Thay đổi logo:
Replace file trong `android/app/src/main/res/` với logo của bạn.

---

## 📱 App Flow

```
Auth Screen (Login)
    ↓
Main Tabs
├── Swipe
│   ├── Swipe Cards
│   ├── Match Modal
│   └── Profile Detail
├── Matches
│   ├── Matches List
│   └── Chat Detail
│       └── Video Call
└── Profile
    ├── Edit Profile
    ├── Filters
    └── Premium Plans
```

---

## 🎉 Kết Luận

Bạn đã có một **Dating App hoàn chỉnh** với:
- ✅ 9 màn hình đầy đủ chức năng
- ✅ State management với Zustand
- ✅ Navigation hoàn chỉnh
- ✅ UI/UX hiện đại
- ✅ TypeScript type-safe
- ✅ Dummy data sẵn sàng
- ✅ Gesture animations
- ✅ Sẵn sàng mở rộng

**Happy Coding! 💘**

---

## 📞 Support

Nếu gặp vấn đề:
1. Check console logs: `adb logcat`
2. Clear cache: `npm start -- --reset-cache`
3. Rebuild: `npm run android`
4. Check React Native docs: https://reactnative.dev

---
