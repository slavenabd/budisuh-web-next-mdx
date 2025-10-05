import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Sve o bijegu mokraće",
    quickLinks: [
        {
            text: "Naslovnica",
            url: "/"
        },
        {
            text: "O nama",
            url: "/about"
        },
    ],
    OIB: '77209746705',
    Lokacija: 'Zagreb, Hrvatska',
    socials: {
        github: 'https://github.com/slavenabd/budisuh-web-next-mdx',
    }
}