import Image from "next/image";
import Link from "next/link";
// from-[#F8E9C9]/60 to-[#FBF0DB]/20
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
        <div className="flex gap-4 max-sm:gap-3 justify-end">
          <Link href={"https://github.com/Nyima-ui/Dogear"} target="_blank">
            <Image
              width={32}
              height={32}
              src={"/svgs/github.svg"}
              alt={"Github icon."}
            />
          </Link>
          <Link href={"mailto:ntenzin492@gmail.com"} target="_blank">
            <Image
              width={32}
              height={32}
              src={"/svgs/mail.svg"}
              alt={"Mail icon."}
            />
          </Link>
        </div>
        <p className="mt-2 text-sm sm:text-base">Created by Tenzin Nyima</p>
      </div>
    </footer>
  );
};

export default Footer;
