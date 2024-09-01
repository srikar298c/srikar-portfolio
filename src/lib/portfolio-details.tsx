import { FaImage } from "react-icons/fa6";
import { MdAnimation, MdGesture } from "react-icons/md";
import { RiAiGenerate } from "react-icons/ri";

const cloudfrontUrl = "https://d21j7ulj5s7ght.cloudfront.net";

export const details = [
  // {
  //   title: "Aperturs Landing Page",
  //   content:
  //     "Adding it here coz its a cool landing page with animations, and I love it. hehe :)",
  //   website: "https://aperturs.com",
  //   icon: <RiAiGenerate />,
  // },
  {
    title: "Aperturs",
    content: "AI and ML Solutions",
    website: "https://aperturs.com",
    icon: <RiAiGenerate />,
    videoUrl: cloudfrontUrl + "/quick-aperturs.mp4",
  },
  {
    title: "Gesturs",
    content: "Web Developement and Designing Agency",
    website: "https://gesturs.com",
    icon: <MdGesture />,
    videoUrl: cloudfrontUrl+ "/gesturs.mp4",
  },
  {
    title: "Gesturs UI",
    content: "React UI Animated Components",
    website: "https://ui.gesturs.com",
    icon: <MdAnimation />,
    videoUrl: cloudfrontUrl +"/gesturs-ui.mp4",
  },
  {
    title: "Image X",
    content: "Convert tweets to images",
    website: "https://imgx.aperturs.com",
    icon: <FaImage />,
    videoUrl: cloudfrontUrl +"/xtoimage.mp4",
  }
];
