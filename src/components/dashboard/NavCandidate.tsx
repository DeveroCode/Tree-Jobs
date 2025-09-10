import { BookmarkIcon, ClipboardDocumentListIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function NavCandidate() {
  return (
    <nav className="space-y-2">
      <Link
        to={"/dashboard/my-applications"}
        className="px-2 py-1 animation_links icon_separation"
      >
        <ClipboardDocumentListIcon className="w-5 h-5" />
        Applications
      </Link>
      <Link
        to={"/dashboard/messages"}
        className="px-2 py-1 animation_links icon_separation"
      >
        <EnvelopeIcon className="w-5 h-5" />
        Messages
      </Link>
      <Link
        to={"/dashboard/saved-jobs"}
        className="px-2 py-1 animation_links icon_separation"
      >
        <BookmarkIcon className="w-5 h-5" />
        Saved Jobs
      </Link>
    </nav>
  );
}
