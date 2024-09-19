import Aden from "./filterSamples/Aden-2x.jpg";
import Clarendon from "./filterSamples/Clarendon-2x.jpg";
import Crema from "./filterSamples/Crema-2x.jpg";
import Gingham from "./filterSamples/Gingham-2x.jpg";
import Juno from "./filterSamples/Juno-2x.jpg";
import Lark from "./filterSamples/Lark-2x.jpg";
import Ludwig from "./filterSamples/Ludwig-2x.jpg";
import Moon from "./filterSamples/Moon-2x.jpg";
import Normal from "./filterSamples/Normal-2x.jpg";
import Perpetua from "./filterSamples/Perpetua-2x.jpg";
import Reyes from "./filterSamples/Reyes-2x.jpg";
import Slumber from "./filterSamples/Slumber-2x.jpg";
export const loginPageImage = [
  "/png/screenshot1.png",
  "/png/screenshot2.png",
  "/png/screenshot3.png",
  "/png/screenshot4.png",
];

export const bigScreen = "(min-width: 1024px)";
export const forSideBar = "(min-width: 1205px)";

export const filtersImagesFilters = [
  {
    filterName: "Aden",
    filterSample: Aden,
    filter: "sepia(0.2) brightness(0.9) saturate(1)",
    position: 100,
  },
  {
    filterName: "Clarendon",
    filterSample: Clarendon,
    filter: "sepia(0.15) contrast(1.25) brightness(1.25) hue-rotate(5deg)",
    position: 100,
  },
  {
    filterName: "Crema",
    filterSample: Crema,
    filter:
      "sepia(0.5) contrast(1.25) brightness(1.15) saturate(0.9) hue-rotate(0.1deg)",
    position: 100,
  },
  {
    filterName: "Gingham",
    filterSample: Gingham,
    filter: "contrast(1.1) brightness(1.1)",
    position: 100,
  },
  {
    filterName: "Juno",
    filterSample: Juno,
    filter: "sepia(0.35) contrast(1.15) brightness(1.15) saturate(1.8)",
    position: 100,
  },
  {
    filterName: "Lark",
    filterSample: Lark,
    filter: "sepia(0.25) contrast(1.2) brightness(1.3) saturate(1.25)",
    position: 100,
  },
  {
    filterName: "Ludwig",
    filterSample: Ludwig,
    filter: "sepia(0.25) contrast(1.05) brightness(1.05) saturate(2)",
    position: 100,
  },
  {
    filterName: "Moon",
    filterSample: Moon,
    filter: "brightness(1.4) contrast(0.95) saturate(0) sepia(0.35)",
    position: 100,
  },
  {
    filterName: "Orginal",
    filterSample: Normal,
    filter: "",
  },
  {
    filterName: "Perpetua",
    filterSample: Perpetua,
    filter: "contrast(1.1) brightness(1.25) saturate(1.1)",
    position: 100,
  },
  {
    filterName: "Reyes",
    filterSample: Reyes,
    filter: "sepia(0.75) contrast(0.75) brightness(1.25) saturate(1.4)",
    position: 100,
  },
  {
    filterName: "Slumber",
    filterSample: Slumber,
    filter: "sepia(0.35) contrast(1.25) saturate(1.25)",
    position: 100,
  },
];
export const svgIcons = {
  homeIcon: (
    <svg
      aria-label="Home"
      className=""
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Home</title>
      <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
    </svg>
  ),
  homeIconOutline: (
    <svg
      aria-label="Home"
      className=""
      fill="white"
      height="24"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Home</title>
      <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
    </svg>
  ),
  searchIcon: (
    <svg
      aria-label="Search"
      className=""
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Search</title>
      <path
        d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="16.511"
        x2="22"
        y1="16.511"
        y2="22"
      ></line>
    </svg>
  ),
  boldSearchIcon: (
    <svg
      aria-label="Search"
      className=""
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Search</title>
      <path
        d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      ></path>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        x1="16.511"
        x2="22"
        y1="16.511"
        y2="22"
      ></line>
    </svg>
  ),
  filledMessengerIcon: (
    <svg
      aria-label="Messenger"
      className=""
      fill="white"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Messenger</title>
      <path
        d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z"
        fill="currentColor"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="1.739"
      ></path>
      <path
        d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z"
        fillRule="evenodd"
      ></path>
    </svg>
  ),
  messengerIcon: (
    <svg
      aria-label="Messenger"
      className=""
      fill="black"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Messenger</title>
      <path
        d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z"
        fill="none"
        stroke="black"
        strokeMiterlimit="10"
        strokeWidth="1.739"
      ></path>
      <path
        d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z"
        fillRule="white"
      ></path>
    </svg>
  ),
  notificationIcon: (
    <svg
      aria-label="Notifications"
      className=""
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Notifications</title>
      <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
    </svg>
  ),

  fillnotificationIcon: (
    <svg
      aria-label="Notifications"
      className=""
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Notifications</title>
      <path d="M17.075 1.987a5.852 5.852 0 0 0-5.07 2.66l-.008.012-.01-.014a5.878 5.878 0 0 0-5.062-2.658A6.719 6.719 0 0 0 .5 8.952c0 3.514 2.581 5.757 5.077 7.927.302.262.607.527.91.797l1.089.973c2.112 1.89 3.149 2.813 3.642 3.133a1.438 1.438 0 0 0 1.564 0c.472-.306 1.334-1.07 3.755-3.234l.978-.874c.314-.28.631-.555.945-.827 2.478-2.15 5.04-4.372 5.04-7.895a6.719 6.719 0 0 0-6.425-6.965Z"></path>
    </svg>
  ),
  redfillnotificationIcon: (
    <svg
      aria-label="Notifications"
      className=""
      fill="red"
      stroke="red"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Notifications</title>
      <path d="M17.075 1.987a5.852 5.852 0 0 0-5.07 2.66l-.008.012-.01-.014a5.878 5.878 0 0 0-5.062-2.658A6.719 6.719 0 0 0 .5 8.952c0 3.514 2.581 5.757 5.077 7.927.302.262.607.527.91.797l1.089.973c2.112 1.89 3.149 2.813 3.642 3.133a1.438 1.438 0 0 0 1.564 0c.472-.306 1.334-1.07 3.755-3.234l.978-.874c.314-.28.631-.555.945-.827 2.478-2.15 5.04-4.372 5.04-7.895a6.719 6.719 0 0 0-6.425-6.965Z"></path>
    </svg>
  ),
  createIcon: (
    <svg
      aria-label="New post"
      className=""
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>New post</title>
      <path
        d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="6.545"
        x2="17.455"
        y1="12.001"
        y2="12.001"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="12.003"
        x2="12.003"
        y1="6.545"
        y2="17.455"
      ></line>
    </svg>
  ),
  userIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className=""
      width="24"
      height="24"
    >
      <path
        fillRule="evenodd"
        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  instagramSidebaricon: (
    <svg
      aria-label="Instagram"
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Instagram</title>
      <path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z"></path>
    </svg>
  ),
  threeDot: (
    <svg
      aria-label="More options"
      className=""
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>More options</title>
      <circle cx="12" cy="12" r="1.5"></circle>
      <circle cx="6" cy="12" r="1.5"></circle>
      <circle cx="18" cy="12" r="1.5"></circle>
    </svg>
  ),
  commentIcon: (
    <svg
      aria-label="Comment"
      className="hover:stroke-gray-400 stroke-black"
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Comment</title>
      <path
        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
        fill="none"
        // stroke="hover:stroke-gray-500"
        // className="hover:stroke-gray-500"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  ),
  likeIcon: (
    <svg
      aria-label="Like"
      className="hover:stroke-gray-400 stroke-black"
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Like</title>
      <path
        d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"
        fill="currentColor"
        strokeLinejoin="round"
        strokeWidth=".1"
      ></path>
    </svg>
  ),

  sendGrayIcon: (
    <svg
      aria-label="Share"
      className="hover:text-gray-400"
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Share</title>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="22"
        x2="9.218"
        y1="3"
        y2="10.083"
      ></line>
      <polygon
        fill="none"
        points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polygon>
    </svg>
  ),
  saveIcon: (
    <svg
      aria-label="Save"
      className="hover:text-gray-400"
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Save</title>
      <polygon
        fill="none"
        points="20 21 12 13.44 4 21 4 3 20 3 20 21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polygon>
    </svg>
  ),
  imojiIcon: (
    <svg
      aria-label="Emoji"
      className="hover:text-gray-400"
      fill="currentColor"
      height="13"
      role="img"
      viewBox="0 0 24 24"
      width="13"
    >
      <title>Emoji</title>
      <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
    </svg>
  ),
  whiteXCloseIcon: (
    <svg
      aria-label="Close"
      className=""
      fill="currentColor"
      height="18"
      role="img"
      viewBox="0 0 24 24"
      width="18"
    >
      <title>Close</title>
      <polyline
        fill="none"
        points="20.643 3.357 12 12 3.353 20.647"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      ></polyline>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        x1="20.649"
        x2="3.354"
        y1="20.649"
        y2="3.354"
      ></line>
    </svg>
  ),
  userIconMedium: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="2 2 20 20"
      fill="currentColor"
      // className="w-8 h-8"
      width="32"
      height="32"
    >
      <path
        fillRule="evenodd"
        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  userIconBig: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="2 2 20 20"
      fill="currentColor"
      // className="w-8 h-8"
      width="44"
      height="44"
    >
      <path
        fillRule="evenodd"
        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  userIconfivesix: (
    <svg
      viewBox="2.3 2.3 27 27"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      //   className="w-14 h-14 bg-slate-500"
      width={56}
      height={56}
    >
      <path
        fillRule="evenodd"
        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        clipRule="evenodd"
        transform="scale(1.32)"
      />
    </svg>
  ),
  postUploadModal: (
    <svg
      aria-label="Icon to represent media such as images or videos"
      // classNmae="mx-auto"
      fill="currentColor"
      height="77"
      role="img"
      viewBox="0 0 97.6 77.3"
      width="96"
    >
      <title>Icon to represent media such as images or videos</title>
      <path
        d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
        fill="currentColor"
      ></path>
      <path
        d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
        fill="currentColor"
      ></path>
      <path
        d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  postsIcon: (
    <svg
      aria-label=""
      className=""
      fill="currentColor"
      height="12"
      role="img"
      viewBox="0 0 24 24"
      width="12"
    >
      <title></title>
      <rect
        fill="none"
        height="18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        width="18"
        x="3"
        y="3"
      ></rect>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="9.015"
        x2="9.015"
        y1="3"
        y2="21"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="14.985"
        x2="14.985"
        y1="3"
        y2="21"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="21"
        x2="3"
        y1="9.015"
        y2="9.015"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="21"
        x2="3"
        y1="14.985"
        y2="14.985"
      ></line>
    </svg>
  ),
  savedIcon: (
    <svg
      aria-label=""
      className=""
      fill="currentColor"
      height="12"
      role="img"
      viewBox="0 0 24 24"
      width="12"
    >
      <title></title>
      <polygon
        fill="none"
        points="20 21 12 13.44 4 21 4 3 20 3 20 21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polygon>
    </svg>
  ),
  tagedIcon: (
    <svg
      aria-label=""
      className=""
      fill="currentColor"
      height="12"
      role="img"
      viewBox="0 0 24 24"
      width="12"
    >
      <title></title>
      <path
        d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <path
        d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <circle
        cx="12.072"
        cy="11.075"
        fill="none"
        r="3.556"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></circle>
    </svg>
  ),
  stackIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6 text-gray-200 w-5 h-5 opacity-80 z-50 transform scale-y-[-1] scale-x-[-1]"
    >
      <path d="M16.5 6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v7.5a3 3 0 0 0 3 3v-6A4.5 4.5 0 0 1 10.5 6h6Z" />
      <path d="M18 7.5a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3H18Z" />
    </svg>
  ),
  cropIcon: (
    <svg
      aria-label="Select crop"
      className=""
      fill="currentColor"
      height="16"
      role="img"
      viewBox="0 0 24 24"
      width="16"
    >
      <title>Select crop</title>
      <path d="M10 20H4v-6a1 1 0 0 0-2 0v7a1 1 0 0 0 1 1h7a1 1 0 0 0 0-2ZM20.999 2H14a1 1 0 0 0 0 2h5.999v6a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1Z"></path>
    </svg>
  ),
  zoomIcon: (
    <svg
      aria-label="Select zoom"
      className=""
      fill="currentColor"
      height="16"
      role="img"
      viewBox="0 0 24 24"
      width="16"
    >
      <title>Select zoom</title>
      <path d="m22.707 21.293-4.825-4.825a9.519 9.519 0 1 0-1.414 1.414l4.825 4.825a1 1 0 0 0 1.414-1.414ZM10.5 18.001a7.5 7.5 0 1 1 7.5-7.5 7.509 7.509 0 0 1-7.5 7.5Zm3.5-8.5h-2.5v-2.5a1 1 0 1 0-2 0v2.5H7a1 1 0 1 0 0 2h2.5v2.5a1 1 0 0 0 2 0v-2.5H14a1 1 0 0 0 0-2Z"></path>
    </svg>
  ),
  imageGallery: (
    <svg
      aria-label="Photo outline icon"
      className="x1lliihq x1n2onr6 x1roi4f4"
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Photo outline icon</title>
      <path
        d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z"
        fillRule="evenodd"
      ></path>
      <path
        d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <path
        d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  ),
  cropSquare: (
    <svg
      aria-label="Crop square icon"
      className=""
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Crop square icon</title>
      <path d="M19 23H5a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h14a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM5 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h14a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"></path>
    </svg>
  ),
  cropPortrait: (
    <svg
      aria-label="Crop portrait icon"
      className=""
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Crop portrait icon</title>
      <path d="M16 23H8a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h8a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM8 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h8a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"></path>
    </svg>
  ),
  cropLandscape: (
    <svg
      aria-label="Crop landscape icon"
      className=""
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <title>Crop landscape icon</title>
      <path d="M19 20H5a4.004 4.004 0 0 1-4-4V8a4.004 4.004 0 0 1 4-4h14a4.004 4.004 0 0 1 4 4v8a4.004 4.004 0 0 1-4 4ZM5 6a2.002 2.002 0 0 0-2 2v8a2.002 2.002 0 0 0 2 2h14a2.002 2.002 0 0 0 2-2V8a2.002 2.002 0 0 0-2-2Z"></path>
    </svg>
  ),
  rightArrow: (
    <svg
      aria-label="Right chevron"
      className=""
      fill="currentColor"
      height="16"
      role="img"
      viewBox="0 0 24 24"
      width="16"
    >
      <title>Right chevron</title>
      <polyline
        fill="none"
        points="8 3 17.004 12 8 21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polyline>
    </svg>
  ),
  leftArrow: (
    <svg
      aria-label="Left chevron"
      className=""
      fill="currentColor"
      height="16"
      role="img"
      viewBox="0 0 24 24"
      width="16"
    >
      <title>Left chevron</title>
      <polyline
        fill="none"
        points="16.502 3 7.498 12 16.502 21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polyline>
    </svg>
  ),
  downArrow: (
    <svg
      ariaLabel="Down chevron icon"
      className=""
      fill="currentColor"
      height="16"
      role="img"
      viewBox="0 0 24 24"
      width="16"
    >
      <title>Down chevron icon</title>
      <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
    </svg>
  ),
  locationIcon: (
    <svg
      ariaLabel="Add location"
      className=""
      fill="currentColor"
      height="16"
      role="img"
      viewBox="0 0 24 24"
      width="16"
    >
      <title>Add location</title>
      <path d="M12.053 8.105a1.604 1.604 0 1 0 1.604 1.604 1.604 1.604 0 0 0-1.604-1.604Zm0-7.105a8.684 8.684 0 0 0-8.708 8.66c0 5.699 6.14 11.495 8.108 13.123a.939.939 0 0 0 1.2 0c1.969-1.628 8.109-7.424 8.109-13.123A8.684 8.684 0 0 0 12.053 1Zm0 19.662C9.29 18.198 5.345 13.645 5.345 9.66a6.709 6.709 0 0 1 13.417 0c0 3.985-3.944 8.538-6.709 11.002Z"></path>
    </svg>
  ),
};
