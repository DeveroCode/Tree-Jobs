import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="pt-16 sm:pt-24 lg:pt-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* Logo + description */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-gray-600 leading-relaxed">
              TreeJobs connects job seekers with top companies, helping you
              unlock career opportunities tailored to your skills.
            </p>
          </div>

          {/* Column 1 */}
          <nav aria-label="Company" className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700"
                >
                  Partner Relations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700"
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 2 */}
          <nav aria-label="Resources" className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700"
                >
                  Jobs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700"
                >
                  Job Referrals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700"
                >
                  Help
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 3 */}
          <nav aria-label="Support" className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700"
                >
                  Help & Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700"
                >
                  Affiliate
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 4 */}
          <nav aria-label="Legal" className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-purple-700"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © TreeJobs {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-purple-700"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9..."></path>
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-purple-700"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6..."></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
