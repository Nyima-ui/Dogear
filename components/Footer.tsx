import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-between px-12.5 pt-20 py-8 items-center max-sm:px-5 bg-linear-to-b from-[#FBF0DB]/20 to-[#F8E9C9]/60">
      <div>
        <Image
          width={130}
          height={40}
          src={"/svgs/dogear-logo-nav.svg"}
          alt={"Dogear logo"}
        />
      </div>

      <div>
        <nav>
          <ul className="flex gap-4 max-sm:gap-3 justify-end">
            <li>
              <Link
                href={"https://github.com/Nyima-ui/Dogear"}
                target="_blank"
                className="opacity-50 hover:opacity-100 transition-opacity duration-50"
              >
                <Image
                  width={24}
                  height={24}
                  src={"/svgs/github.svg"}
                  alt={"Github icon."}
                  rel="noopener noreferrer"
                />
              </Link>
            </li>
            <li>
              <Link
                href={"mailto:ntenzin492@gmail.com"}
                target="_blank"
                className="opacity-50 hover:opacity-100 transition-opacity duration-50"
              >
                <Image
                  width={24}
                  height={24}
                  src={"/svgs/mail.svg"}
                  alt={"Mail icon."}
                  rel="noopener noreferrer"
                />
              </Link>
            </li>
          </ul>
        </nav>
        <p className="mt-5 text-sm">Created by Tenzin Nyima</p>
      </div>
    </footer>
  );
};

export default Footer;
