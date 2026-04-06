/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: biographies
 * Interface for Biographies
 */
export interface Biographies {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  nameZh?: string;
  /** @wixFieldType text */
  nameEn?: string;
  /** @wixFieldType text */
  descriptionZh?: string;
  /** @wixFieldType text */
  descriptionEn?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  portraitImage?: string;
  /** @wixFieldType rich_text */
  description_zh?: any;
  /** @wixFieldType rich_text */
  description_en?: any;
  /** @wixFieldType text */
  wixImage?: string;
  /** @wixFieldType text */
  name_zh?: string;
  /** @wixFieldType text */
  name_en?: string;
}


/**
 * Collection ID: concerteventseries
 * Interface for ConcertEventSeries
 */
export interface ConcertEventSeries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  nameZh?: string;
  /** @wixFieldType text */
  nameEn?: string;
  /** @wixFieldType text */
  descriptionZh?: string;
  /** @wixFieldType text */
  descriptionEn?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  seriesImage?: string;
}


/**
 * Collection ID: concerts
 * Interface for Concerts
 */
export interface Concerts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  code?: string;
  /** @wixFieldType date */
  date?: Date | string;
  /** @wixFieldType time */
  time?: any;
  /** @wixFieldType text */
  venueZh?: string;
  /** @wixFieldType text */
  venueEn?: string;
  /** @wixFieldType boolean */
  held?: boolean;
  /** @wixFieldType text */
  presentsZh?: string;
  /** @wixFieldType text */
  presentsEn?: string;
  /** @wixFieldType text */
  titleZh?: string;
  /** @wixFieldType text */
  titleEn?: string;
  /** @wixFieldType text */
  subtitleZh?: string;
  /** @wixFieldType text */
  subtitleEn?: string;
  /** @wixFieldType boolean */
  hostByCuc?: boolean;
  /** @wixFieldType text */
  natureZh?: string;
  /** @wixFieldType text */
  natureEn?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  sponsorLogo?: string;
  /** @wixFieldType text */
  priceZh?: string;
  /** @wixFieldType text */
  priceEn?: string;
  /** @wixFieldType text */
  seatingZh?: string;
  /** @wixFieldType text */
  seatingEn?: string;
  /** @wixFieldType rich_text */
  introduction_zh?: any;
  /** @wixFieldType rich_text */
  introduction_en?: any;
  /** @wixFieldType rich_text */
  programme_zh?: any;
  /** @wixFieldType rich_text */
  programme_en?: any;
  /** @wixFieldType document */
  wixDocument?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  wixImage?: string;
  /** @wixFieldType url */
  ticketingUrl?: string;
  /** @wixFieldType url */
  houseProgrammeUrl?: string;
  /** @wixFieldType url */
  youtubeUrl?: string;
  /** @wixFieldType rich_text */
  remark_zh?: any;
  /** @wixFieldType rich_text */
  remark_en?: any;
  /** @wixFieldType reference */
  biographies?: Biographies;
  /** @wixFieldType reference */
  contributors?: Contributors;
  /** @wixFieldType reference */
  mentions?: Mentions;
  /** @wixFieldType reference */
  series?: ConcertEventSeries;
  /** @wixFieldType rich_text */
  concessionDiscount_zh?: any;
  /** @wixFieldType rich_text */
  concessionDiscount_en?: any;
  /** @wixFieldType rich_text */
  enquiry_zh?: any;
  /** @wixFieldType rich_text */
  enquiry_en?: any;
  /** @wixFieldType reference */
  relations?: Relationships;
  /** @wixFieldType rich_text */
  boxOfficeRemark_zh?: any;
  /** @wixFieldType rich_text */
  boxOfficeRemark_en?: any;
}


/**
 * Collection ID: contributors
 * Interface for Contributors
 */
export interface Contributors {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  roleZh?: string;
  /** @wixFieldType text */
  roleEn?: string;
  /** @wixFieldType text */
  namesZh?: string;
  /** @wixFieldType text */
  namesEn?: string;
}


/**
 * Collection ID: donationprograms
 * Interface for DonationPrograms
 */
export interface DonationPrograms {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  programNameEn?: string;
  /** @wixFieldType text */
  programNameZh?: string;
  /** @wixFieldType text */
  descriptionEn?: string;
  /** @wixFieldType text */
  descriptionZh?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  programImage?: string;
}


/**
 * Collection ID: events
 * Interface for Events
 */
export interface Events {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventCode?: string;
  /** @wixFieldType text */
  dateTimeVenueZh?: string;
  /** @wixFieldType text */
  dateTimeVenueEn?: string;
  /** @wixFieldType boolean */
  isHeld?: boolean;
  /** @wixFieldType text */
  presentsZh?: string;
  /** @wixFieldType text */
  presentsEn?: string;
  /** @wixFieldType text */
  titleZh?: string;
  /** @wixFieldType text */
  titleEn?: string;
  /** @wixFieldType text */
  subtitleZh?: string;
  /** @wixFieldType text */
  subtitleEn?: string;
  /** @wixFieldType boolean */
  hostedByCuc?: boolean;
  /** @wixFieldType text */
  coOrganizersZh?: string;
  /** @wixFieldType text */
  coOrganizersEn?: string;
  /** @wixFieldType text */
  natureZh?: string;
  /** @wixFieldType text */
  natureEn?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  sponsorLogos?: string;
  /** @wixFieldType text */
  priceZh?: string;
  /** @wixFieldType text */
  priceEn?: string;
  /** @wixFieldType text */
  deadlineZh?: string;
  /** @wixFieldType text */
  deadlineEn?: string;
  /** @wixFieldType rich_text */
  dateTimeVenue_zh?: any;
  /** @wixFieldType rich_text */
  dateTimeVenue_en?: any;
  /** @wixFieldType rich_text */
  price_zh?: any;
  /** @wixFieldType rich_text */
  price_en?: any;
  /** @wixFieldType rich_text */
  quotaDeadline_en?: any;
  /** @wixFieldType rich_text */
  quotaDeadline_zh?: any;
  /** @wixFieldType rich_text */
  targets_en?: any;
  /** @wixFieldType rich_text */
  targets_zh?: any;
  /** @wixFieldType rich_text */
  introduction_zh?: any;
  /** @wixFieldType rich_text */
  introduction_en?: any;
  /** @wixFieldType rich_text */
  courseContent_zh?: any;
  /** @wixFieldType rich_text */
  courseContent_en?: any;
  /** @wixFieldType rich_text */
  setPieces_zh?: any;
  /** @wixFieldType rich_text */
  setPieces_en?: any;
  /** @wixFieldType url */
  setPiecesPreviewUrl?: string;
  /** @wixFieldType rich_text */
  applicationMethod_zh?: any;
  /** @wixFieldType rich_content */
  applicationMethod_en?: any;
  /** @wixFieldType url */
  registrationUrl?: string;
  /** @wixFieldType document */
  wixDocument?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  wixImage?: string;
  /** @wixFieldType rich_text */
  concessionDiscount_zh?: any;
  /** @wixFieldType rich_text */
  concessionDiscount_en?: any;
  /** @wixFieldType rich_text */
  enquiry_zh?: any;
  /** @wixFieldType rich_text */
  enquiry_en?: any;
  /** @wixFieldType rich_text */
  remark_zh?: any;
  /** @wixFieldType rich_text */
  remark_en?: any;
  /** @wixFieldType reference */
  series?: ConcertEventSeries;
  /** @wixFieldType reference */
  biographies?: Biographies;
  /** @wixFieldType reference */
  contributors?: Contributors;
  /** @wixFieldType reference */
  mentions?: Mentions;
  /** @wixFieldType reference */
  relations?: Relationships;
}


/**
 * Collection ID: excostaffs
 * Interface for ExcoStaffs
 */
export interface ExcoStaffs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  nameZh?: string;
  /** @wixFieldType text */
  nameEn?: string;
  /** @wixFieldType text */
  roleZh?: string;
  /** @wixFieldType text */
  roleEn?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  year?: string;
  /** @wixFieldType text */
  organization_zh?: string;
  /** @wixFieldType text */
  organization_en?: string;
}


/**
 * Collection ID: mediums
 * Interface for RecordingMediums
 */
export interface RecordingMediums {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  mediumZh?: string;
  /** @wixFieldType text */
  mediumEn?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType boolean */
  isPhysical?: boolean;
}


/**
 * Collection ID: members
 * Interface for ChorusMembers
 */
export interface ChorusMembers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  nameZh?: string;
  /** @wixFieldType text */
  nameEn?: string;
  /** @wixFieldType text */
  vocalType?: string;
  /** @wixFieldType boolean */
  isLeader?: boolean;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  yearJoined?: string;
  /** @wixFieldType text */
  year?: string;
}


/**
 * Collection ID: mentions
 * Interface for Mentions
 */
export interface Mentions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType date */
  date?: Date | string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType text */
  source?: string;
  /** @wixFieldType url */
  url?: string;
  /** @wixFieldType text */
  text?: string;
  /** @wixFieldType text */
  recordings_mentions?: string;
}


/**
 * Collection ID: recordings
 * @catalog This collection is an eCommerce catalog
 * Interface for Recordings
 */
export interface Recordings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  mediumReference?: string;
  /** @wixFieldType text */
  recordTypeReference?: string;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  cucId?: string;
  /** @wixFieldType text */
  isrc?: string;
  /** @wixFieldType text */
  titleZh?: string;
  /** @wixFieldType text */
  releaseYear?: string;
  /** @wixFieldType text */
  songlistZh?: string;
  /** @wixFieldType text */
  songlistEn?: string;
  /** @wixFieldType text */
  introductionZh?: string;
  /** @wixFieldType text */
  introductionEn?: string;
  /** @wixFieldType text */
  recordingZh?: string;
  /** @wixFieldType text */
  recordingEn?: string;
  /** @wixFieldType text */
  distributorZh?: string;
  /** @wixFieldType text */
  distributorEn?: string;
  /** @wixFieldType text */
  remarksZh?: string;
  /** @wixFieldType text */
  remarksEn?: string;
  /** @wixFieldType url */
  previewUrl?: string;
  /** @wixFieldType url */
  purchaseUrl?: string;
  /** @wixFieldType url */
  spotifyUrl?: string;
  /** @wixFieldType rich_text */
  introduction_zh?: any;
  /** @wixFieldType rich_text */
  introduction_en?: any;
  /** @wixFieldType rich_text */
  songlist_zh?: any;
  /** @wixFieldType rich_text */
  songlist_en?: any;
  /** @wixFieldType rich_text */
  recording_zh?: any;
  /** @wixFieldType rich_text */
  recording_en?: any;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  wixImage?: string;
  /** @wixFieldType url */
  appleMusicUrl?: string;
  /** @wixFieldType url */
  youtubeUrl?: string;
  /** @wixFieldType url */
  kkBoxUrl?: string;
}


/**
 * Collection ID: recordtypes
 * Interface for RecordTypes
 */
export interface RecordTypes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  typeZh?: string;
  /** @wixFieldType text */
  typeEn?: string;
  /** @wixFieldType text */
  descriptionZh?: string;
  /** @wixFieldType text */
  descriptionEn?: string;
}


/**
 * Collection ID: relations
 * Interface for Relationships
 */
export interface Relationships {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  masterTitleZh?: string;
  /** @wixFieldType text */
  masterTitleEn?: string;
  /** @wixFieldType text */
  childTitleZh?: string;
  /** @wixFieldType text */
  childTitleEn?: string;
}


/**
 * Collection ID: scores
 * @catalog This collection is an eCommerce catalog
 * Interface for SheetMusicCatalog
 */
export interface SheetMusicCatalog {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType text */
  songReference?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType url */
  itemUrl?: string;
  /** @wixFieldType text */
  scoreNameZh?: string;
  /** @wixFieldType text */
  voicing?: string;
  /** @wixFieldType text */
  series?: string;
  /** @wixFieldType boolean */
  isHidden?: boolean;
  /** @wixFieldType text */
  languageZh?: string;
  /** @wixFieldType text */
  languageEn?: string;
  /** @wixFieldType text */
  priceChinese?: string;
  /** @wixFieldType text */
  publishYear?: string;
  /** @wixFieldType url */
  demoUrl?: string;
  /** @wixFieldType url */
  previewUrl?: string;
  /** @wixFieldType text */
  scoreId?: string;
}


/**
 * Collection ID: sessions
 * Interface for EventSessions
 */
export interface EventSessions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType date */
  date?: Date | string;
  /** @wixFieldType time */
  time?: any;
  /** @wixFieldType text */
  venueZh?: string;
  /** @wixFieldType text */
  venueEn?: string;
  /** @wixFieldType text */
  descriptionZh?: string;
  /** @wixFieldType text */
  descriptionEn?: string;
}


/**
 * Collection ID: songs
 * Interface for Songs
 */
export interface Songs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  nameZh?: string;
  /** @wixFieldType text */
  nameEn?: string;
  /** @wixFieldType text */
  composerZh?: string;
  /** @wixFieldType text */
  composerEn?: string;
  /** @wixFieldType text */
  lyricistZh?: string;
  /** @wixFieldType text */
  lyricistEn?: string;
  /** @wixFieldType text */
  arrangerZh?: string;
  /** @wixFieldType text */
  arrangerEn?: string;
  /** @wixFieldType text */
  singerZh?: string;
  /** @wixFieldType text */
  singerEn?: string;
  /** @wixFieldType text */
  title?: string;
}


/**
 * Collection ID: staticdescriptions
 * Interface for StaticDescriptions
 */
export interface StaticDescriptions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  page?: string;
  /** @wixFieldType text */
  titleZh?: string;
  /** @wixFieldType text */
  titleEn?: string;
  /** @wixFieldType text */
  descriptionZh?: string;
  /** @wixFieldType text */
  descriptionEn?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  pageImage?: string;
  /** @wixFieldType rich_text */
  description_zh?: any;
  /** @wixFieldType rich_text */
  description_en?: any;
}


/**
 * Collection ID: vocaltypes
 * Interface for VocalTypes
 */
export interface VocalTypes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  typeZh?: string;
  /** @wixFieldType text */
  typeEn?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  abbreviation?: string;
}
