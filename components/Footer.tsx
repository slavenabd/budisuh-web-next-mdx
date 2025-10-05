import React from 'react';
import { siteDetails } from '@/components/data/siteDetails';

const Footer: React.FC = () => {
    return (
        <footer className="bg-hero-background text-foreground py-10">
                <div className="mt-8 md:text-center text-foreground-accent px-6">
                <p>Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}. All rights reserved.</p>
                <p className="text-sm mt-2 text-gray-500">Made with &hearts; by <a href="https://home.bedry.app" target="_blank">BeDRY</a></p>
            </div>
        </footer>
    );
};

export default Footer;