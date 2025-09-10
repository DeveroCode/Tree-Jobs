import {
  ClipboardDocumentListIcon, EnvelopeIcon, UserGroupIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function NavRecrutier() {
  return (
    <nav className="space-y-2">
      <Link
        to={"/dashboard/job-listings"}
        className="px-2 py-1 animation_links icon_separation"
      >
        <ClipboardDocumentListIcon className="w-5 h-5" />
        Job listings
      </Link>
       <Link
        to={"/dashboard/messages"}
        className="px-2 py-1 animation_links icon_separation"
      >
        <EnvelopeIcon className="w-5 h-5" />
        Messages
      </Link>
      <Link
        to={"/dashboard/candidates"}
        className="px-2 py-1 animation_links icon_separation"
      >
        <UserGroupIcon className="w-5 h-5" />
        Candidates
      </Link>
    </nav>
  );
}
