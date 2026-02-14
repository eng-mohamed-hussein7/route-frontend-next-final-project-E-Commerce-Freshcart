import Link from "next/link";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { NavProps } from "@/types/breadcrumbs.type";

export default function Breadcrumbs({ links }: NavProps) {
  return (
    <nav className="container mx-auto px-0 bg-white flex items-center gap-2 text-sm text-gray-500 my-4">
      <Link className="hover:text-primary-600 transition" href="/">
        Home
      </Link>

      {links.map((link, index) => (
        <Fragment key={index}>
          <FontAwesomeIcon icon={faAngleRight} className="text-gray-400" />
          <Link className="hover:text-primary-600 transition" href={link.href}>
            {link.label}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
