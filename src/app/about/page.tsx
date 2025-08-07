import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import StatCard from '@/components/about-ui/stat-card';
import ExecutiveMemberCard, { ExecutiveMemberCardProps } from '@/components/about-ui/executive-member-card'; // Adjust if your component is named differently
import PartnerCard, { PartnerCardProps } from '@/components/about-ui/partner-card';

const AboutPage = () => {
  const executiveMembers: ExecutiveMemberCardProps[] = [
    {
      imageUrl: '/assets/images/executive_members/Yared_Endale.jpg',
      name: 'Yared Endale',
      title: 'Entrepreneur | UX specialist | Gaming Community Builder',
      linkedinUrl: 'https://www.linkedin.com/in/yared-endale-985263158/',
    },
    {
      imageUrl: '/assets/images/executive_members/Natnael_Alemayehu_Hailu.jpg',
      name: 'Natnael Alemayehu Hailu',
      title: 'Certificated Digital marketer | Event organizer | SoME Manager',
      linkedinUrl: 'https://www.linkedin.com/in/natnael-alemayehu-hailu-8273a9267/',
    },
    {
      imageUrl: '/assets/images/executive_members/tihitina_askal.jpg',
      name: 'Tehetna Askal',
      title: 'Web Developer Lead',
      linkedinUrl: 'https://www.linkedin.com/in/tehetna-askal-768419142/',
    },

  ];
  const whyGamesQuotes = [
    "Games are vessels in which our characters are forged, teaching us resilience, discipline, and the value of continuous growth.",
    "They elevate us beyond our limits, sculpting better human beings out of our previous selves through the fires of determination and the pursuit of excellence.",
    "Games and play are a language that the world can speak, through game you can create, connect and cultivate economy, culture, and values.",
  ];

  const partners: PartnerCardProps[] = [
    {
      logoUrl: '/assets/images/partners/efuye_gela.png',
      name: 'Efuye Gela',
      description: 'Efuye Gela is a solutions company that employs a variety of resources, tools, and frameworks to design and deliver dynamic high-impact solutions that cater to specific ecosystems and audiences.',
    },
    {
      logoUrl: '/assets/images/partners/chewata_awaqi.png',
      name: 'Chewata Awaqi',
      description: 'Chewata Awaqi develop gamified systems, make the learning process feel more natural and consult on processes/system users engagement and experience creation.',
    },
    {
      logoUrl: '/assets/images/partners/busara.webp',
      name: 'Efuye Gela',
      description: 'We exist to enhance the living conditions of African people by creating a gaming ecosystem that represents African culture and reimagines African futures.',
    },
  ];

  return (
    <main className="flex-grow">
      {/* Section 1: Hero / Intro */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            ETHIOPIAN GAMES ASSOCIATION
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            It all started with 5 people who were passionate about bringing all youngsters who share the same interest to one place, and that interest was games and gaming. Then the crowd evolved into gamification companies, game studios, gaming communities, game developers, and gaming events.
          </p>
        </div>
      </section>

      {/* Section 2: Our Mission & Stats */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              “Games and play are a language that the world can speak; through game you can create, connect and cultivate economy, culture, and values.”
            </p>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <StatCard value="1000+" label="Gamers" />
              <StatCard value="5+" label="Founding Members" />
              <StatCard value="2" label="Games" />
            </div>
          
          </div>
          <div className="relative aspect-[4/3] md:aspect-[3/2] bg-muted rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/about/mission-section-image.webp"
              alt="EGA Community Focus"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-24"> {/* Or use bg-background if preferred */}
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 md:mb-12">
            Why Games?
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {whyGamesQuotes.map((quote, index) => (
              <blockquote key={index} className="text-lg md:text-xl italic text-muted-foreground leading-relaxed border-l-4 border-primary pl-6 py-2">
                “{quote}”
              </blockquote>
            ))}
          </div>
          <p className="mt-10 text-2xl font-semibold text-primary">
            #LetThereBeGames
          </p>
        </div>
      </section>

      {/* Section 3: Executive Members */}
      {executiveMembers.length > 0 && (
        <section className="container mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-left">
            Executive Members
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {executiveMembers.map(member => <ExecutiveMemberCard key={member.name} {...member} />)}
          </div>
        </section>
      )}

      {/* Section 4: Our Partners */}
      {partners.length > 0 && (
        <section className="container mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-left">
            Our Partners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {partners.map(partner => <PartnerCard key={partner.name} {...partner} />)}
          </div>
        </section>
      )}

      {/* Section 5: Join Our Mission (CTA) */}
      <section className="bg-card rounded-xl container mx-auto my-16 md:my-24 p-8 md:p-16 text-center shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
          Join Our Mission
        </h2>
        <p className="text-base text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
          Help us shape the future of gaming in Ethiopia. Whether you&apos;re a player, developer, or enthusiast, there&apos;s a place for you in our community.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/membership" passHref legacyBehavior>
            <Button size="lg" variant="default">
              Become a Member
            </Button>
          </Link>
          <Link href="/contact" passHref legacyBehavior>
            <Button
              size="lg"
              variant="outline"
              className="border-muted-foreground/50 text-foreground hover:bg-accent hover:text-accent-foreground hover:border-muted-foreground"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;