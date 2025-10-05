import Link from 'next/link';
import React from 'react';
import { FaFingerprint } from 'react-icons/fa';
import { siteDetails } from '@/components/data/siteDetails';
import { footerDetails } from '@/components/data/footer';
import { getPlatformIconByName } from '@/components/data/utils';

const Footer: React.FC = () => {
    return (
        <footer className="bg-hero-background text-foreground py-10">
            <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <FaFingerprint className="min-w-fit w-5 h-5 md:w-7 md:h-7" />
                        <h3 className="manrope text-xl font-semibold cursor-pointer">
                            {siteDetails.siteName}
                        </h3>
                    </Link>
                    <p className="mt-3.5 text-foreground-accent">
                        {footerDetails.subheading}
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="text-foreground-accent">
                        {footerDetails.quickLinks.map(link => (
                            <li key={link.text} className="mb-2">
                                <Link href={link.url} className="hover:text-foreground">{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Detalji</h4>

                    {footerDetails.OIB && <a href={`mailto:${footerDetails.OIB}`}  className="block text-foreground-accent hover:text-foreground">OIB: {footerDetails.OIB}</a>}

                    {footerDetails.Lokacija && <a href={`tel:${footerDetails.Lokacija}`} className="block text-foreground-accent hover:text-foreground">Lokacija: {footerDetails.Lokacija}</a>}

                    {footerDetails.socials && (
                        <div className="mt-5 flex items-center gap-5 flex-wrap">
                            {Object.keys(footerDetails.socials).map(platformName => {
                                if (platformName && footerDetails.socials[platformName]) {
                                    return (
                                        <Link
                                            href={footerDetails.socials[platformName]}
                                            key={platformName}
                                            aria-label={platformName}
                                        >
                                            {getPlatformIconByName(platformName)}
                                        </Link>
                                    )
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8 md:text-center text-foreground-accent px-6">
                <p>Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}. All rights reserved.</p>
                <p className="text-sm mt-2 text-gray-500">Made with &hearts; by <a href="https://home.bedry.app" target="_blank">BeDRY</a></p>
            </div>
        </footer>
    );
};

export default Footer;