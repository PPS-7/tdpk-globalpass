import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const en = {
  common: {
    welcome: 'Welcome',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    search: 'Search',
    loading: 'Loading...',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
  },
  nav: {
    home: 'Home',
    partners: 'Partners',
    perks: 'Perks',
    spaces: 'Spaces',
    billing: 'Billing',
    dashboard: 'Dashboard',
  },
  member: {
    dashboard: 'Member Dashboard',
    status: 'Member Status',
    tier: 'Tier',
    activeUntil: 'Active until',
    subscriptionRequired: 'Subscription Required',
    unlockAccess: 'Subscribe to unlock your QR pass, exclusive perks, and access to partner spaces worldwide.',
    viewPlans: 'View Plans & Subscribe',
    myPass: 'My Pass',
    directory: 'Directory',
    offers: 'Offers',
    manageBilling: 'Manage Billing',
    locked: 'Locked - Subscribe to unlock',
    unlocked: 'View your digital QR membership',
  },
  partner: {
    dashboard: 'Partner Dashboard',
    scanVerify: 'Scan & Verify',
    manualLookup: 'Manual Lookup',
    manageOffers: 'Manage Offers',
    analytics: 'Analytics',
    verifications: 'Verifications',
    redemptions: 'Redemptions',
    activeOffers: 'Active Offers',
  },
  billing: {
    title: 'Billing & Subscriptions',
    activeSubscription: 'Active Subscription',
    choosePlan: 'Choose Your Plan',
    subscribeNow: 'Subscribe Now',
    currentPlan: 'Current Plan',
    manageBilling: 'Manage Billing',
  },
  search: {
    placeholder: 'Search partners and offers...',
    partners: 'Partners',
    offers: 'Offers',
    noResults: 'No results found',
  },
  map: {
    nearMe: 'Near Me',
    filters: 'Filters',
    showMap: 'Show Map',
    showList: 'Show List',
  },
};

// Thai translations
const th = {
  common: {
    welcome: 'ยินดีต้อนรับ',
    signIn: 'เข้าสู่ระบบ',
    signOut: 'ออกจากระบบ',
    search: 'ค้นหา',
    loading: 'กำลังโหลด...',
    close: 'ปิด',
    save: 'บันทึก',
    cancel: 'ยกเลิก',
    submit: 'ส่ง',
  },
  nav: {
    home: 'หน้าหลัก',
    partners: 'พาร์ทเนอร์',
    perks: 'สิทธิพิเศษ',
    spaces: 'พื้นที่ทำงาน',
    billing: 'การชำระเงิน',
    dashboard: 'แดชบอร์ด',
  },
  member: {
    dashboard: 'แดชบอร์ดสมาชิก',
    status: 'สถานะสมาชิก',
    tier: 'ระดับ',
    activeUntil: 'ใช้งานได้ถึง',
    subscriptionRequired: 'ต้องมีการสมัครสมาชิก',
    unlockAccess: 'สมัครสมาชิกเพื่อปลดล็อก QR พาส สิทธิพิเศษ และการเข้าถึงพื้นที่พาร์ทเนอร์ทั่วโลก',
    viewPlans: 'ดูแพ็กเกจ & สมัคร',
    myPass: 'บัตรของฉัน',
    directory: 'รายชื่อ',
    offers: 'ข้อเสนอ',
    manageBilling: 'จัดการการชำระเงิน',
    locked: 'ล็อค - สมัครสมาชิกเพื่อปลดล็อก',
    unlocked: 'ดูบัตรสมาชิก QR ดิจิทัล',
  },
  partner: {
    dashboard: 'แดชบอร์ดพาร์ทเนอร์',
    scanVerify: 'สแกนและตรวจสอบ',
    manualLookup: 'ค้นหาด้วยตนเอง',
    manageOffers: 'จัดการข้อเสนอ',
    analytics: 'การวิเคราะห์',
    verifications: 'การตรวจสอบ',
    redemptions: 'การแลกของรางวัล',
    activeOffers: 'ข้อเสนอที่ใช้งานอยู่',
  },
  billing: {
    title: 'การชำระเงินและการสมัครสมาชิก',
    activeSubscription: 'การสมัครที่ใช้งานอยู่',
    choosePlan: 'เลือกแพ็กเกจของคุณ',
    subscribeNow: 'สมัครตอนนี้',
    currentPlan: 'แพ็กเกจปัจจุบัน',
    manageBilling: 'จัดการการชำระเงิน',
  },
  search: {
    placeholder: 'ค้นหาพาร์ทเนอร์และข้อเสนอ...',
    partners: 'พาร์ทเนอร์',
    offers: 'ข้อเสนอ',
    noResults: 'ไม่พบผลลัพธ์',
  },
  map: {
    nearMe: 'ใกล้ฉัน',
    filters: 'ตัวกรอง',
    showMap: 'แสดงแผนที่',
    showList: 'แสดงรายการ',
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      th: { translation: th },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
