const PHONE = "(800) 555-0142";
const EMAIL = "hello@familyfriendsmoving.com";

export default function SiteFooter() {
  return (
    <footer className="bg-ffm-navy text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <p className="font-bold text-lg">Family Friends Moving</p>
          <p className="text-white/75 text-sm mt-2">
            Local & long-distance movers serving Southern California families and businesses.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Contact</p>
          <p className="text-sm text-white/80">{PHONE}</p>
          <p className="text-sm text-white/80">{EMAIL}</p>
          <p className="text-sm text-white/80 mt-2">Mon–Sun: 8am – 6pm</p>
        </div>
        <div>
          <p className="font-semibold mb-2">Service areas</p>
          <ul className="text-sm text-white/80 space-y-1">
            <li>Los Angeles County</li>
            <li>Orange County</li>
            <li>San Diego County</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs text-white/60 py-4">
        © {new Date().getFullYear()} Family Friends Moving. All rights reserved.
      </div>
    </footer>
  );
}
