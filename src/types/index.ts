export interface Location {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface PostContent {
  latitude: number;
  longitude: number;
  placeName: string;
  addressName: string;
  roadAddressName: string;
  tags: (string | null)[];
  content: string;
}

export interface PostState {
  images: File[];
  selected: number[];
  currentImageIndex: number;
  postContent: PostContent | null;
}

export interface PostContextType extends PostState {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (idx: number) => void;
  handleAddImage: () => void;
  handlePrevImage: () => void;
  handleNextImage: () => void;
  clearImages: () => void;
  setPostContent: (content: PostContent) => void;
  clearPostContent: () => void;
}
