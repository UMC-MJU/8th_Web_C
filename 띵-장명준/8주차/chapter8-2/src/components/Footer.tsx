import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-pink-400 bg-black text-xl">
      <div className="container mx-auto text-center text-pink-250">
        <p>&copy;{new Date().getFullYear()} DDingPage. All rights reserved.</p>
        <div className={"flex justify-center space-x-4 mt-4"}>
          <Link to={"#"}>Privacy Policy</Link>
          <Link to={"#"}>Terms of Service</Link>
          <Link to={"#"}>Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
