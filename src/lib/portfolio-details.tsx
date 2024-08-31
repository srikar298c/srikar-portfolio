import { FaImage } from "react-icons/fa6";
import { MdAnimation, MdGesture } from "react-icons/md";
import { RiAiGenerate } from "react-icons/ri";

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
    videoUrl: "/quick-aperturs.mp4",
  },
  {
    title: "Gesturs",
    content: "Web Developement and Designing Agency",
    website: "https://gesturs.com",
    icon: <MdGesture />,
    videoUrl: "/gesturs.mp4",
  },
  {
    title: "Gesturs UI",
    content: "React UI Animated Components",
    website: "https://ui.gesturs.com",
    icon: <MdAnimation />,
    videoUrl: "/gesturs-ui.mp4",
  },
  {
    title: "Image X",
    content: "Convert tweets to images",
    website: "https://imgx.aperturs.com",
    icon: <FaImage />,
    videoUrl: "/xtoimage.mp4",
  }
];
