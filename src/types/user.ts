import { CustomFile } from 'src/components/upload';

// ----------------------------------------------------------------------

export type IUserTableFilterValue = string | string[];

export type IUserTableFilters = {
  name: string;
  role: string[];
  status: string;
};

// ----------------------------------------------------------------------

export type IUserSocialLink = {
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
};

export type IUserProfileCover = {
  name: string;
  role: string;
  coverUrl: string;
  avatarUrl: string;
};

export type IUserProfile = {
  id: string;
  role: string;
  quote: string;
  email: string;
  school: string;
  country: string;
  company: string;
  // coupon_code: string;
  totalFollowers: number;
  totalFollowing: number;
  socialLinks: IUserSocialLink;
};

export type IUserProfileFollower = {
  id: string;
  name: string;
  country: string;
  avatarUrl: string;
};

export type IUserProfileGallery = {
  id: string;
  title: string;
  imageUrl: string;
  postedAt: Date;
};

export type IUserProfileFriend = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
};

export type IUserProfilePost = {
  id: string;
  media: string;
  message: string;
  createdAt: Date;
  personLikes: {
    name: string;
    avatarUrl: string;
  }[];
  comments: {
    id: string;
    message: string;
    createdAt: Date;
    author: {
      id: string;
      name: string;
      avatarUrl: string;
    };
  }[];
};

export type IUserCard = {
  id: string;
  name: string;
  role: string;
  coverUrl: string;
  avatarUrl: string;
  totalPosts: number;
  totalFollowers: number;
  totalFollowing: number;
};

export type IUserItem = {
  id: string;
  name: string;
  email: string;
  phone: string; // phone can be a string or a number to match the expected type
  couponCode: string; // use string instead of String
  expiryDate: any; // expiryDate can be a string or a Date to match the expected type
  commission: number; // commission can be a string or a number to match the expected type
  discount: number; // discount can be a string or a number to match the expected type
  limit: number;
  city: string;
  role: string;
  state: string;
  status: string;
  address: string;
  country: string;
  zipCode: string;
  company: string;
  avatarUrl: string;
  phoneNumber: string;
  isVerified: boolean; // use boolean instead of boolean | undefined to match the expected type
};



// view of coupon code type

export type CouponCodeItem = {
  id: any;
  commission_amount: any;
  coupon_code: string;
  coupon_code_limit: number;
  created_at: string;
  discounted_amount: any;
  email: string;
  expiry_date: any;
  name: string;
  phone: string;
  coupon_code_redeemed: number;
  coupon_status: string;
};


// create coupon code

export type CouponItem = {
  name: string;
  email: string;
  phone: string; // phone can be a string or a number to match the expected type
  couponCode: string; // use string instead of String
  expiryDate: any; // expiryDate can be a string or a Date to match the expected type
  commission: number; // commission can be a string or a number to match the expected type
  discount: number; // discount can be a string or a number to match the expected type
  limit: number;
  id: number;
  commission_amount: number;
  coupon_code: string;
  coupon_code_limit: number;
  created_at: string;
  discounted_amount: number;
  expiry_date: any;
  coupon_code_redeemed: number;
  coupon_status: string;
};

export type IUserAccount = {
  email: string;
  isPublic: boolean;
  displayName: string;
  city: string | null;
  state: string | null;
  about: string | null;
  country: string | null;
  address: string | null;
  zipCode: string | null;
  phoneNumber: string | null;
  photoURL: CustomFile | string | null;
};

export type IUserAccountBillingHistory = {
  id: string;
  price: number;
  createdAt: Date;
  invoiceNumber: string;
};

export type IUserAccountChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
