import Image from "next/image";

export function InstagramIcon() {
  return <svg className="social-icon" aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle className="social-icon-dot" cx="17.35" cy="6.65" r="1" /></svg>;
}

export function BrocoCredit() {
  return <a className="broco-credit" href="https://www.brocosolutions.com" target="_blank" rel="noreferrer" aria-label="Desarrollo por Broco Solutions"><span>Desarrollo por</span><Image src="/logos/broco/bs-mark-neg.svg" width={18} height={22} alt="Broco Solutions" /><b>Broco Solutions</b></a>;
}
