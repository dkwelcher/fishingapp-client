/* Images */
import Section2Image from "../../../assets/blue-catfish.png";
import Section3Image from "../../../assets/pier.png";

const sectionImages = [Section2Image, Section3Image];

/* Alt Texts */
// striped-bass.png
export const STRIPED_BASS_ALT_TEXT =
  "Caught striped bass being held up by a man";

//blue-catfish.png
const BLUE_CATFISH_ALT_TEXT = "Caught blue catfish being held up by a man";

const sectionAltTexts = [STRIPED_BASS_ALT_TEXT, BLUE_CATFISH_ALT_TEXT];

/* Titles */
const SECTION2_TITLE = "Fishing Trip Planner";
const SECTION3_TITLE = "Auto-Generated Input";

const sectionTitles = [SECTION2_TITLE, SECTION3_TITLE];

/* Descriptions */
export const SECTION1_DESCRIPTION =
  "Fishing App's mission is to improve your fishing journeys by providing you with your own secure, personal database. Within the dashboard, you can create and manage your fishing trip history and record your catching successes. The upcoming feature, Trip Planner, will take your personal catch data and the forecasted weather to provide optimal fishing locations and strategies to enhance your fishing experience. Fishing App is your ultimate companion for catching more fish.";

const SECTION2_DESCRIPTION =
  "This upcoming feature will help you catch more fish. Just select the date of your planned fishing trip, and the Fishing Trip Planner will do the rest. By combining your fishing trip history and the forecasted weather on the day of the planned trip, the Fishing Trip Planner algorithm will give you fishing recommendations and strategies to catch more fish.";

const SECTION3_DESCRIPTION =
  "This upcoming feature will make your fishing trips more efficient. All time-, geographic-, & weather-related data will be automatically generated for you, leaving more time for catching your limit.";

const sectionDescriptions = [SECTION2_DESCRIPTION, SECTION3_DESCRIPTION];

/* SubSection Object Array */
export const SUBSECTION_OBJECTS = sectionImages.map((image, index) => ({
  image: image,
  altText: sectionAltTexts[index],
  title: sectionTitles[index],
  description: sectionDescriptions[index],
}));
